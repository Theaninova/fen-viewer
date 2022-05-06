<script lang="ts">
  import "../lib/style/style.scss"
  import ChessBoard from "../lib/components/ChessBoard.svelte"
  import {parseGames} from "../lib/game"
  import type {GameResponse} from "../lib/game"
  import {onMount} from "svelte"
  import {ServerConnection} from "../lib/server-connection"

  let response: GameResponse[] = []

  $: games = parseGames(response)

  onMount(async () => {
    const connection = new ServerConnection("wss://chess.df1ash.de/websockets/game")

    connection.updateState(500, state => {
      response = state
    })
  })
</script>

<main>
  <h1>Ongoing Games</h1>

  <div class="game-container">
    {#each games as game}
      <div class="game">
        <h2>{game.name} {game.id}</h2>
        <p>{game.players.join(" vs ")}</p>
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 85vh;
  }

  .game > p {
    height: 19px;
  }
</style>
