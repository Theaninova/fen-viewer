<script lang="ts">
  import type {ParsedGame} from "../game"
  import {fenUnicodeChessPieceMap} from "../fen"

  export let game: ParsedGame

  $: state = game.state
</script>

<div>
  <p>⭮ {state.turn === "w" ? "White" : "Black"}</p>
  <p class="castling">
    {#if state.castling}
      {#each state.castling as piece}
        <span class={piece.toUpperCase() === piece ? "white" : "black"}>{fenUnicodeChessPieceMap[piece]}</span
        >
      {/each}
    {/if}
  </p>
  {#if state.enPassant}
    <p>{state.enPassant.toUpperCase()}</p>
  {/if}
  <p>{state.fullMoves}<sub>F</sub></p>
  <p>{state.halfMoves}<sub>H</sub></p>
</div>

<style lang="scss">
  div {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 1rem;
    align-items: center;
    justify-items: center;
  }

  .black,
  .white {
    padding-inline: 2px;
    padding-block: 4px;
  }
  .black:first-child,
  .white:first-child {
    border-radius: 6px 0 0 6px;
  }
  .black:last-child,
  .white:last-child {
    border-radius: 0 6px 6px 0;
  }

  .white {
    background: #673432;
    color: white;
  }
  .black {
    background: #bb8b8a;
    color: black;
  }
</style>
