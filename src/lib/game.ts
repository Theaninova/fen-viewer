import type {ParsedFen} from "./fen"
import {parseFenString} from "./fen"

export enum GameType {
  Login = 0,
  GetState = 1,
  CreateGame = 2,
  Join = 3,
  Move = 4,
  TournamentState = 5,
  JoinTournament = 6,
  OpenTournament = 7,
  CloseTournament = 8,
}

export type TournamentTree = Array<GameResponse | undefined | TournamentTree>

export interface TournamentStateResponse {
  players: Array<{
    name: string
    rating: number
  }>
  games: TournamentTree
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
    .sort((a, b) => b.id - a.id)
    .map(game => ({
      id: game.id,
      name: game.name,
      players: game.players,
      state: parseFenString(game.state.state.fen),
    }))
}

export function randomString(length: number): string {
  return Array.from({length}, () => Math.random().toString(36)[2]).join("")
}
