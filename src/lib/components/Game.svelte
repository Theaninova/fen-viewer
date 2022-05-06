<script lang="ts">
  import type {ParsedGame} from "../game"
  import ChessBoard from "./ChessBoard.svelte"
  import {ServerConnection} from "../server-connection"
  import Player from "./Player.svelte"

  export let game: ParsedGame
  export let serverConnection: ServerConnection
</script>

<div class="game">
  <h2>{game.name} {game.id}</h2>
  <div class="vs-note">
    <Player index={0} {game} {serverConnection} />
    <em>vs</em>
    <Player index={1} {game} {serverConnection} />
  </div>
  <ChessBoard chessState={game.state} />
</div>

<style lang="scss">
  .empty-slot {
    color: #ccc;
  }

  .vs-note {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-gap: 1rem;
    align-items: center;
    justify-items: center;

    width: calc(100% - 16px);
    height: 48px;
    min-width: 0;
    min-height: 0;
  }

  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 85vh;
  }
</style>
