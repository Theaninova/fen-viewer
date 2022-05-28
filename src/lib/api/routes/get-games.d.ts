import {ClientRequest, RequestType} from "../request"
import {GameInfo, ServerResponse} from "../response"
export declare type GetGamesRequest = ClientRequest<RequestType.GET_GAMES>
export interface GetGamesResponse extends ServerResponse<RequestType.GET_GAMES> {
  games: GameInfo[]
}
export declare function getGamesRoute(_request: GetGamesRequest): GetGamesResponse
