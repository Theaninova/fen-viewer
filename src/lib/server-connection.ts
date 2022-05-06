import type {GameResponse, JoinGameRequest, MakeMoveRequest, PlayerInfo} from "./game"
import {GameType} from "./game"

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export class ServerConnection {
  private readonly websocket: WebSocket

  private lock?: Promise<unknown>

  private response: Promise<unknown>

  private readonly isUp: Promise<void>

  private resolveResponse!: (value: unknown) => void

  constructor(readonly url = "wss://chess.df1ash.de/websockets/game") {
    this.websocket = new WebSocket(url)
    this.isUp = new Promise(resolve => {
      this.websocket.addEventListener("open", () => resolve())
    })

    this.response = new Promise(resolve => {
      this.resolveResponse = resolve
    })

    this.websocket.addEventListener("message", event => {
      this.resolveResponse(JSON.parse(event.data))

      this.response = new Promise(resolve => {
        this.resolveResponse = resolve
      })
    })
  }

  private async request<T>(query: {type: GameType; [key: string]: unknown}): Promise<T> {
    return this.runTask(async () => {
      this.websocket.send(JSON.stringify(query))

      return (await this.response) as T
    })
  }

  /**
   * Run a task that runs asynchronously, but also ensure that only one task is running at a time
   * because the server is really wonky.
   */
  private async runTask<T>(task: () => Promise<T>): Promise<T> {
    await this.isUp
    while (this.lock) await this.lock

    const out = new Promise<T>(resolve => {
      task().then(resolve)
    })
    this.lock = out
    this.lock.then(() => {
      this.lock = undefined
    })

    return out
  }

  async join(info: Omit<JoinGameRequest, "type">): Promise<PlayerInfo> {
    return this.request<PlayerInfo>({
      type: GameType.Join,
      ...info,
    })
  }

  async login(info: Omit<JoinGameRequest, "type">): Promise<PlayerInfo> {
    return this.request<PlayerInfo>({
      type: GameType.Login,
      ...info,
    })
  }

  async getState(): Promise<GameResponse[]> {
    return this.request<GameResponse[]>({
      type: GameType.GetState,
    })
  }

  updateState(delayMs: number, onUpdate: (state: GameResponse[]) => boolean | void) {
    void (async () => {
      let continueLoop = true
      while (continueLoop) {
        continueLoop = onUpdate(await this.getState()) ?? true
        await delay(delayMs)
      }
    })()
  }

  async makeMove(info: Omit<MakeMoveRequest, "type">): Promise<PlayerInfo> {
    return this.request<PlayerInfo>({
      type: GameType.Move,
      ...info,
    })
  }
}
