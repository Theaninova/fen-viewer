<script lang="ts">
  import "../lib/style/style.scss"
  import {parseGames} from "../lib/game"
  import {onMount} from "svelte"
  import {ServerConnection} from "../lib/server-connection"
  import Game from "../lib/components/Game.svelte"
  import CreateGameInput from "../lib/components/CreateGameInput.svelte"
  import type {GameInfo} from "../lib/api/response"

  let response: GameInfo[] = []

  let serverConnection: ServerConnection

  $: games = parseGames(response)

  onMount(() => {
    serverConnection = new ServerConnection("ws://localhost:8025")

    serverConnection.updateState(500, state => {
      response = state.games
    })
  })
</script>

<main>
  <h1>Ongoing Games</h1>

  <div class="game-container">
    {#each games as game}
      <Game {game} {serverConnection} />
    {/each}
    <CreateGameInput {serverConnection} />
  </div>
</main>

<style lang="scss">
  .game-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
</style>
