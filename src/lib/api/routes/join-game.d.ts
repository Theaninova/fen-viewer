import { ClientRequest, RequestType } from "../request";
import { GameResponse, ServerResponse, UnauthorizedResponse } from "../response";
export declare enum JoinType {
    PLAYER = 1
}
export interface JoinGameRequest extends ClientRequest<RequestType.JOIN_GAME> {
    username: string;
    playerID: number;
    joinAsPlayer: JoinType;
    gameID: number;
}
export declare type JoinGameResponse = GameResponse<RequestType.JOIN_GAME>;
export interface GameFullError extends ServerResponse<RequestType.FULL> {
    message: string;
}
export interface GameNotFoundError extends ServerResponse<RequestType.NOT_FOUND> {
    message: string;
}
export declare function joinGameRoute(request: JoinGameRequest): JoinGameResponse | GameFullError | GameNotFoundError | UnauthorizedResponse;
