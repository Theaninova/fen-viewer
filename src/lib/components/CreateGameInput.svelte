<script lang="ts">
  import type {ServerConnection} from "../server-connection.js"

  export let serverConnection: ServerConnection
</script>

<div>
  <svg on:click={serverConnection.createGame()} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
</div>

<style lang="scss">
  svg {
    width: 48px;
    aspect-ratio: 1;

    border-radius: 16px;
    color: #d7acac;
    border: dashed 1px #d7acac;

    transition: all 0.2s ease-in-out;

    padding: 30px;
  }
  svg:hover {
    cursor: pointer;
    background: #d7acac;
    color: #4b221f;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
