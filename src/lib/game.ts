import type {ParsedFen} from "./fen"
import {parseFenString} from "./fen"

export interface Game {
  id: number
  fen: string
}

export interface ParsedGame {
  id: number
  fen: ParsedFen
}

export function parseGames(games: Game[]): ParsedGame[] {
  return games.map(game => ({
    id: game.id,
    fen: parseFenString(game.fen),
  }))
}
