import type {ParsedFen} from "./fen"
import {parseFenString} from "./fen"

export enum GameType {
  Login = 0,
  GetState = 1,
  CreateGame = 2,
  Join = 3,
  Move = 4,
}

export interface GameResponse {
  activePlayerList: string[]
  ID: number
  moveHistory: string[]
  currentPlayer: PlayerInfo
  fen: string
  over: boolean
  draw: boolean
}

export interface ParsedGame extends GameResponse {
  state: ParsedFen
}

export interface PlayerInfo {
  playerName: string
  playerID: number
}

export interface GameRequest<T extends GameType> {
  type: T
}

export interface CreateGameRequest extends GameRequest<GameType.CreateGame> {
  username: "creator"
  // Why this is required?
  // "Ask Alexander Schmitz. The creator"
  playerID: number
  gameName: "KingOfTheHill"
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
    .sort((a, b) => b.ID - a.ID)
    .map(game => ({
      ...game,
      state: parseFenString(game.fen),
    }))
}

export function randomString(length: number): string {
  return Array.from({length}, () => Math.random().toString(36)[2]).join("")
}
