import {randomString} from "./game"
import {RequestType} from "./api/request"
import type {Player as PlayerInfo} from "./api/player"
import type {JoinGameRequest, JoinGameResponse} from "./api/routes/join-game"
import type {LoginRequest, LoginResponse} from "./api/routes/login"
import type {GetGamesRequest, GetGamesResponse} from "./api/routes/get-games"
import type {CreateGameRequest, CreateGameResponse} from "./api/routes/create-game"
import type {MoveRequest, MoveResponse} from "./api/routes/move"

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export class ServerConnection {
  private readonly websocket: WebSocket

  private readonly resolveResponses: Record<number, (value: unknown) => void> = {}

  private readonly isUp: Promise<void>

  private playerName!: string

  readonly session: Promise<PlayerInfo>

  constructor(readonly url = "wss://chess.df1ash.de/websockets/game", session: Partial<PlayerInfo>) {
    this.websocket = new WebSocket(url)
    this.isUp = new Promise(resolve => {
      this.websocket.addEventListener("open", () => resolve())
    })

    this.websocket.addEventListener("message", event => {
      try {
        const response = JSON.parse(event.data)
        // TODO: game update pushes
        this.resolveResponses[response.stamp]?.(response)
      } catch {
        console.error("Invalid Response", event.data)
      }
    })

    this.session =
      !session.playerName || !session.playerID
        ? this.getState().then(() => {
            return this.register({
              username: session.playerName ?? randomString(20),
            })
          })
        : Promise.resolve(session as LoginResponse)

    this.session.then(session => {
      this.playerName = session.playerName

      void this.login({
        username: session.playerName,
        playerID: session.playerID,
      })
    })
  }

  private async request<G, T>(query: G): Promise<T> {
    await this.isUp

    const stamp = performance.now()
    const response = new Promise<T>(resolve => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.resolveResponses[stamp] = resolve as any
    })

    this.websocket.send(JSON.stringify({...query, stamp}))

    const result = await response
    delete this.resolveResponses[stamp]

    if ((result as unknown as {type: number}).type < 0) {
      console.error(result)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((result as any).type !== 1) {
      console.log(query, result)
    }
    return result
  }

  async join(info: Pick<JoinGameRequest, "gameID">): Promise<JoinGameResponse> {
    return this.request<JoinGameRequest, JoinGameResponse>({
      type: RequestType.JOIN_GAME,
      username: (await this.session).playerName,
      playerID: (await this.session).playerID,
      joinAsPlayer: 1,
      ...info,
    })
  }

  isSelf(userName: string): boolean {
    return this.playerName === userName
  }

  private async register(info: Omit<LoginRequest, "type" | "playerID">): Promise<LoginResponse> {
    return this.request<LoginRequest, LoginResponse>({
      ...info,
      type: RequestType.LOGIN,
      username: info.username,
    })
  }

  private async login(info: Omit<LoginRequest, "type">): Promise<LoginResponse> {
    return this.request<LoginRequest, LoginResponse>({
      type: RequestType.LOGIN,
      ...info,
    })
  }

  async createGame(): Promise<CreateGameResponse> {
    return this.request<CreateGameRequest, CreateGameResponse>({
      type: RequestType.CREATE_GAME,
      username: (await this.session).playerName,
      playerID: (await this.session).playerID,
    })
  }

  async getState(): Promise<GetGamesResponse> {
    return this.request<GetGamesRequest, GetGamesResponse>({
      type: RequestType.GET_GAMES,
    })
  }

  updateState(delayMs: number, onUpdate: (state: GetGamesResponse) => boolean | void) {
    void (async () => {
      let continueLoop = true
      while (continueLoop) {
        continueLoop = onUpdate(await this.getState()) ?? true
        await delay(delayMs)
      }
    })()
  }

  async makeMove(info: Pick<MoveRequest, "gameID" | "move">): Promise<MoveResponse> {
    return this.request<MoveRequest, MoveResponse>({
      type: RequestType.MOVE,
      username: (await this.session).playerName,
      playerID: (await this.session).playerID,
      ...info,
    })
  }
}
