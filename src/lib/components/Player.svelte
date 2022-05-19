<script lang="ts">
  import type {ParsedGame} from "../game"
  import {ServerConnection} from "../server-connection"
  import MoveInput from "./MoveInput.svelte"
  import JoinGameInput from "./JoinGameInput.svelte"

  export let index: number
  export let game: ParsedGame
  export let serverConnection: ServerConnection

  $: player = game.activePlayerList[index]
  $: firstPlayer = game.activePlayerList[0]
  $: otherPlayer = game.activePlayerList[Number(!index)]

  let joined: Promise<boolean> = Promise.resolve(false)

  function join() {
    joined = serverConnection
      .join({
        gameID: game.ID,
      })
      .then(() => true)
  }

  function move(move: CustomEvent<string>) {
    serverConnection.makeMove({
      gameID: game.ID,
      move: move.detail,
    })
  }
</script>

<div>
  {#await joined}
    loading...
  {:then joined}
    {#if player}
      {#if serverConnection.isSelf(player.playerName)}
        <MoveInput on:move={move} />
      {:else}
        {player.playerName}
      {/if}
    {:else}
      <JoinGameInput on:join={join} disabled={index === 1 && !firstPlayer} />
    {/if}
  {/await}
</div>

<style lang="scss">
  div:first-child {
    text-align: end;
  }

  div:last-child {
    text-align: start;
  }

  div {
    overflow-x: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    width: 100%;
  }
</style>
