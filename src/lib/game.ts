import type {ParsedFen} from "./fen"
import {parseFenString} from "./fen"

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
