<script lang="ts">
  import "../lib/style/style.scss"
  import FenInput from "../lib/components/FenInput.svelte"
  import type {ParsedFen} from "../lib/fen"
  import ChessBoard from "../lib/components/ChessBoard.svelte"

  let state: ParsedFen

  function handleFenChange(event: CustomEvent<ParsedFen>) {
    console.log(event)
    state = event.detail
  }
</script>

<main>
  <h1>FEN-Viewer</h1>

  <FenInput on:change={handleFenChange} />

  <ChessBoard style="width: min(100vw, 80vh); height: min(100vw, 80vh);" chessState={state} />
</main>

<style lang="scss">
  main {
    font-family: Roboto, sans-serif;

    // center
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
