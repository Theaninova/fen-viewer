import type {GameResponse, JoinGameRequest, LoginRequest, MakeMoveRequest, PlayerInfo} from "./game"
import {GameType, randomString} from "./game"

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export class ServerConnection {
  private readonly websocket: WebSocket

  private lock?: Promise<unknown>

  private response: Promise<unknown>

  private readonly isUp: Promise<void>

  private playerName!: string

  readonly session: Promise<PlayerInfo>

  private resolveResponse!: (value: unknown) => void

  constructor(readonly url = "wss://chess.df1ash.de/websockets/game", session: Partial<PlayerInfo>) {
    this.websocket = new WebSocket(url)
    this.isUp = new Promise(resolve => {
      this.websocket.addEventListener("open", () => resolve())
    })

    this.response = new Promise(resolve => {
      this.resolveResponse = resolve
    })

    this.websocket.addEventListener("message", event => {
      this.resolveResponse(event.data)

      this.response = new Promise(resolve => {
        this.resolveResponse = resolve
      })
    })

    this.session =
      !session.playerName || !session.playerID
        ? this.getState().then(() => {
            return this.register({
              username: session.playerName ?? randomString(20),
            })
          })
        : Promise.resolve(session as PlayerInfo)

    this.session.then(session => {
      this.playerName = session.playerName

      void this.login({
        username: session.playerName,
        playerID: session.playerID,
      })
    })
  }

  private async request<T>(query: {type: GameType; [key: string]: unknown}): Promise<T> {
    return this.runTask(async () => {
      this.websocket.send(JSON.stringify(query))

      const result = await this.response

      try {
        return JSON.parse(result as string)
      } catch {
        console.error(result)
        return
      }
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

  async join(info: Pick<JoinGameRequest, "gameID">): Promise<PlayerInfo> {
    return this.request<PlayerInfo>({
      type: GameType.Join,
      username: (await this.session).playerName,
      playerID: (await this.session).playerID,
      joinAsPlayer: 1,
      ...info,
    })
  }

  isSelf(userName: string): boolean {
    return this.playerName === userName
  }

  private async register(info: Omit<LoginRequest, "type" | "playerID">): Promise<PlayerInfo> {
    return this.request<PlayerInfo>({
      ...info,
      type: GameType.Login,
      username: info.username,
    })
  }

  private async login(info: Omit<LoginRequest, "type">): Promise<PlayerInfo> {
    return this.request<PlayerInfo>({
      type: GameType.Login,
      ...info,
    })
  }

  async createGame(): Promise<PlayerInfo> {
    return this.request<PlayerInfo>({
      type: GameType.CreateGame,
      gameName: "KingOfTheHill",
      username: (await this.session).playerName,
      playerID: (await this.session).playerID,
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

  async makeMove(info: Pick<MakeMoveRequest, "gameID" | "move">): Promise<PlayerInfo> {
    return this.request<PlayerInfo>({
      type: GameType.Move,
      username: (await this.session).playerName,
      playerID: (await this.session).playerID,
      ...info,
    })
  }
}
