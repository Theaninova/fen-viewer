import type {GameResponse, PlayerInfo} from "./game"

export class ServerConnection {
  private readonly websocket: WebSocket

  private lock?: Promise<unknown>

  private response: Promise<unknown>

  private resolveResponse!: (value: unknown) => void

  constructor(
    readonly url = "wss://chess.df1ash.de/websockets/game",
    public onUpdate?: (data: GameResponse[]) => void,
  ) {
    this.websocket = new WebSocket(url)
    this.websocket.addEventListener("open", () => {
      setInterval(() => {
        this.websocket.send(JSON.stringify({type: 1}))
      }, 500)
    })

    this.response = new Promise(resolve => {
      this.resolveResponse = resolve
    })
    this.websocket.addEventListener("message", event => {
      const parsed = JSON.parse(event.data)

      if (Array.isArray(parsed) && this.onUpdate) {
        this.onUpdate(parsed)
      } else if (!Array.isArray(parsed)) {
        this.resolveResponse(parsed)

        this.response = new Promise(resolve => {
          this.resolveResponse = resolve
        })
      }
    })
  }

  /**
   * Run a task that runs asynchronously, but also ensure that only one task is running at a time
   * because the server is really wonky.
   */
  private async runTask<T>(task: () => Promise<T>): Promise<T> {
    while (this.lock) await this.lock

    const out = new Promise<T>(resolve => {
      task().then(resolve)
    })
    this.lock = out

    return out
  }

  async makeMove(userName: string, playerId: number, gameId: number, move: string): Promise<PlayerInfo> {
    return this.runTask(async () => {
      this.websocket.send(
        JSON.stringify({
          type: 4,
          username: userName,
          playerid: playerId,
          gameid: gameId,
          move: move,
        }),
      )

      return (await this.response) as PlayerInfo
    })
  }
}
