import {fenValidRegex, parseFenString, toFenString} from "./fen"
import type {ParsedFen} from "./fen"

const testCases: (string | [string, ParsedFen])[] = [
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "8/rnbqkbnr/pppppppp/8/8/PPPPPPPP/RNBQKBNR/8 w - - 0 1",
  "4r3/p1pp4/R1nb1n1q/1pBpPP1p/rPBNPQPN/1bKpRp2/P5PP/2k5 w - - 0 1",
  "8/6k1/8/8/8/8/8/R3K3 w Q - 0 1",
  "b1r1r1k1/1n1b1q1n/p1p1p1p1/1p1p1p2/P1P1P1P1/1P1P1P1P/N1Q1B1N1/1K1R1R1B b - - 0 1",
  "8/8/8/2K5/5k2/8/8/8 w - - 0 1",
  [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    {
      board: [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        Array.from({length: 8}),
        Array.from({length: 8}),
        Array.from({length: 8}),
        Array.from({length: 8}),
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
      ],
      turn: "w",
      castling: ["K", "Q", "k", "q"],
      enPassant: undefined,
      halfMoves: 0,
      fullMoves: 1,
    },
  ],
]

const antiCases: string[] = [
  "",
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 1",
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0",
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - 0 1",
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR KQkq - 0 1",
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR KQkq - -0 1",
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR KQkq - 0 -1",
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP w KQkq - 0 1",
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR/ w KQkq - 0 1 1",
  "rnbqkbnr/pppppppp/8/8/8/8/8/PPPPPPPP[NNBBRRQK] w - - 0 1",
  "rnbqkbnr/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "rnbqkbnr/pppppppp/8/8//8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
]

const widthDependentAntiCases: string[] = ["rnbqkbnr/pppppppp/8/8/7/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]

describe("FEN", function () {
  describe("Regex", function () {
    describe("test cases", function () {
      for (const testCase of testCases.map(it => (Array.isArray(it) ? it[0] : it))) {
        it(testCase, function () {
          expect(fenValidRegex.test(testCase)).toBe(true)
        })
      }
    })

    describe("anti cases", function () {
      for (const antiCase of antiCases) {
        it(antiCase, function () {
          expect(fenValidRegex.test(antiCase)).toBe(false)
        })
      }
    })
  })

  describe("Parse FEN", function () {
    it("should parse a FEN string", function () {
      for (const [fen, parsed] of testCases.filter(it => Array.isArray(it))) {
        expect(parseFenString(fen as string)).toEqual(parsed)
      }
    })
  })

  describe("To FEN", function () {
    it("should convert to a FEN string", function () {
      for (const [fen, parsed] of testCases.filter(it => Array.isArray(it))) {
        expect(toFenString(parsed as ParsedFen)).toEqual(fen)
      }
    })
  })
})
