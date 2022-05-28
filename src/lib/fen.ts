// noinspection NonAsciiCharacters

export type BlackPiece = "♜" | "♞" | "♝" | "♛" | "♚" | "♟"
export type WhitePiece = "♖" | "♘" | "♗" | "♕" | "♔" | "♙"
export type BoardPiece = BlackPiece | WhitePiece | undefined
export type TargetSquare = `${string}${number}`
export type Black = "b"
export type White = "w"
export type Color = Black | White
export type Castling = "K" | "Q" | "k" | "q"

export const fenValidPattern =
  "^(([rnbqkpRNBQKP]|\\d)+\\/){7}([rnbqkpRNBQKP]|\\d)+ [wb] (-|[kqKQ]{1,4}) (-|[a-h][1-8]) \\d+ \\d+$"
export const fenValidRegex = new RegExp(fenValidPattern)
export const isWhitePieceRegex = new RegExp("[♙♖♘♗♕♔]")

export const fenUnicodeChessPieceMap: Record<string, string> = {
  p: "♟",
  n: "♞",
  b: "♝",
  r: "♜",
  q: "♛",
  k: "♚",
  P: "♙",
  N: "♘",
  B: "♗",
  R: "♖",
  Q: "♕",
  K: "♔",
}

export const unicodeChessPieceFenMap: Record<string, string> = {
  "♟": "p",
  "♞": "n",
  "♝": "b",
  "♜": "r",
  "♛": "q",
  "♚": "k",
  "♙": "P",
  "♘": "N",
  "♗": "B",
  "♖": "R",
  "♕": "Q",
  "♔": "K",
}

export interface ParsedFen {
  board: BoardPiece[][]
  turn: Color
  castling?: Castling[]
  enPassant?: TargetSquare
  halfMoves: number
  fullMoves: number
}

export function isFen(fen: string): boolean {
  return fenValidRegex.test(fen)
}

export function parseFenString(fen: string): ParsedFen {
  const [positions, turn, castling, enPassant, halfMoves, fullMoves] = fen.split(" ")

  return {
    board: positions
      .split("/")
      .map(
        it =>
          [...it].flatMap(field =>
            Number(field) ? Array.from<undefined>({length: Number(field)}) : [fenUnicodeChessPieceMap[field]],
          ) as BoardPiece[],
      ),
    turn: turn as Color,
    castling: castling === "-" ? undefined : ([...castling] as Castling[]),
    enPassant: enPassant === "-" ? undefined : (enPassant as TargetSquare),
    halfMoves: Number(halfMoves),
    fullMoves: Number(fullMoves),
  }
}

export function toFenString(parsed: ParsedFen): string {
  return [
    parsed.board
      .map(it => it.map(field => (field ? unicodeChessPieceFenMap[field] : " ")).join(""))
      .join("/")
      .replace(/ +/g, match => `${match.length}`),
    parsed.turn,
    parsed.castling ? parsed.castling.join("") : "-",
    parsed.enPassant ? parsed.enPassant : "-",
    parsed.halfMoves,
    parsed.fullMoves,
  ].join(" ")
}
