import {ClientRequest, RequestType} from "../request"
import {ErrorResponse, GameResponse, IllegalMoveResponse, UnauthorizedResponse} from "../response"
export interface MoveRequest extends ClientRequest<RequestType.MOVE> {
  username: string
  playerID: number
  gameID: number
  move: string
}
export declare type MoveResponse = GameResponse<RequestType.MOVE>
export declare function moveRoute(
  request: MoveRequest,
): MoveResponse | ErrorResponse | UnauthorizedResponse | IllegalMoveResponse
