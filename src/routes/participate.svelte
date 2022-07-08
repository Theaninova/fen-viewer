<script lang="ts">
  import "../lib/style/style.scss"
  import {parseGames} from "../lib/game"
  import {onMount} from "svelte"
  import {ServerConnection} from "../lib/server-connection"
  import Game from "../lib/components/Game.svelte"
  import CreateGameInput from "../lib/components/CreateGameInput.svelte"
  import {page} from "$app/stores"
  import {goto} from "$app/navigation"
  import type {GameInfo} from "../lib/api/response"

  let response: GameInfo[] = []

  let serverConnection: ServerConnection

  $: games = parseGames(response)

  onMount(() => {
    serverConnection = new ServerConnection(process.env.SERVER_URL || "ws://localhost:8025", {
      playerName: $page.url.searchParams.get("playerName"),
      playerID: Number($page.url.searchParams.get("playerID")),
    })

    serverConnection.session.then(session => {
      console.log("session:", session)
      $page.url.searchParams.set("playerName", session.playerName)
      $page.url.searchParams.set("playerID", session.playerID.toString())
      goto(`?${$page.url.searchParams.toString()}`)
    })

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
