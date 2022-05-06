import type {ParsedFen} from "./fen"
import {parseFenString} from "./fen"

export enum GameType {
  Login = 0,
  GetState = 1,
  Join = 3,
  Move = 4,
}

export interface GameResponse {
  name: string
  players: string[]
  id: number
  state: {state: {fen: string}}
}

export interface ParsedGame {
  id: number
  name: string
  players: string[]
  state: ParsedFen
}

export interface PlayerInfo {
  playerName: string
  playerId: number
}

export interface GameRequest<T extends GameType> {
  type: T
}

export interface JoinGameRequest extends GameRequest<GameType.Join> {
  username: string
  gameID: number
  joinAsPlayer: number
  playerID: number
}

export interface MakeMoveRequest extends GameRequest<GameType.Move> {
  username: string
  playerID: number
  gameID: number
  move: string
}

export interface LoginRequest extends GameRequest<GameType.Login> {
  username: string
  playerID: number
}

export type GetStateRequest = GameRequest<GameType.GetState>

export function parseGames(games: GameResponse[]): ParsedGame[] {
  return games
    .sort((a, b) => b.id - a.id)
    .map(game => ({
      id: game.id,
      name: game.name,
      players: game.players,
      state: parseFenString(game.state.state.fen),
    }))
}
