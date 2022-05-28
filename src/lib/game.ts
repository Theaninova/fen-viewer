import type {ParsedFen} from "./fen"
import {parseFenString} from "./fen"
import type {GameInfo} from "./api/response"

export interface ParsedGame extends GameInfo {
  state: ParsedFen
}

export function parseGames(games: GameInfo[]): ParsedGame[] {
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
