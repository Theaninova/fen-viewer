import {ClientRequest, RequestType} from "../request"
import {GameResponse, UnauthorizedResponse} from "../response"
export interface CreateGameRequest extends ClientRequest<RequestType.CREATE_GAME> {
  username: string
  playerID: number
}
export declare type CreateGameResponse = GameResponse<RequestType.CREATE_GAME>
export declare function createGameRoute(request: CreateGameRequest): CreateGameResponse | UnauthorizedResponse
