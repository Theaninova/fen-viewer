import {ClientRequest, RequestType} from "../request"
import {ErrorResponse, PlayerInfoResponse} from "../response"
export interface LoginRequest extends ClientRequest<RequestType.LOGIN> {
  username: string
  playerID?: number
}
export declare type LoginResponse = PlayerInfoResponse<RequestType.LOGIN>
export declare function loginRoute(request: LoginRequest): LoginResponse | ErrorResponse
