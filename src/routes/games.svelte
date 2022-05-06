<script lang="ts">
  import "../lib/style/style.scss"
  import ChessBoard from "../lib/components/ChessBoard.svelte"
  import {parseGames} from "../lib/game"

  let games = parseGames(
    Array.from({length: 10}).map((_, i) => ({
      id: i,
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    })),
  )
</script>

<main>
  <h1>Ongoing Games</h1>

  <div class="game-container">
    {#each games as game}
      <div class="game">
        <h2>Game {game.id}</h2>
        <ChessBoard chessState={game.state} />
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  main {
    font-family: Roboto, sans-serif;

    // center
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .game-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
