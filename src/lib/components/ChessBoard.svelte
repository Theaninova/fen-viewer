<script lang="ts">
  import type {ParsedFen} from "../fen"
  import {isWhitePieceRegex} from "../fen"

  export let chessState: ParsedFen
</script>

<!-- TODO: make the whole board an svg graphic -->

{#if chessState}
  <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 100 100">
    <defs>
      <pattern id="checkerboard" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#d7acac" />
        <rect width="10" height="10" fill="#d7acac" y="10" x="10" />
      </pattern>
    </defs>

    <rect x="10" y="10" width="80" height="80" fill="#be8b89" />
    <rect x="10" y="10" width="80" height="80" fill="url(#checkerboard)" />

    {#each [5, 95] as x}
      {#each Array.from({length: 8}).map((_, i) => i) as y}
        <text
          {x}
          y={y * 10 + 15}
          font-size="5px"
          fill="currentColor"
          text-anchor="middle"
          alignment-baseline="central"
        >
          {8 - y}
        </text>

        <text
          y={x}
          x={y * 10 + 15}
          font-size="5px"
          fill="currentColor"
          text-anchor="middle"
          alignment-baseline="central"
        >
          {String.fromCodePoint(y + 65)}
        </text>
      {/each}
    {/each}

    {#each chessState.board as row, x}
      {#each row as piece, y}
        {#if piece}
          <text
            y={x * 10 + 15}
            x={y * 10 + 15}
            font-size="7px"
            draggable="true"
            class:white={isWhitePieceRegex.test(piece)}
            class:black={!isWhitePieceRegex.test(piece)}
            fill="currentColor"
            text-anchor="middle"
            alignment-baseline="central"
          >
            {piece}
          </text>
        {/if}
      {/each}
    {/each}
  </svg>
{/if}

<style lang="scss">
  svg {
    height: 100%;
    width: 100%;
  }

  text[draggable] {
    cursor: move;
    user-select: none;
  }

  .black {
    color: #000;
    text-shadow: #757575 0 0 10px;
  }

  .white {
    color: #fff;
    text-shadow: black 0 0 10px;
  }
</style>
