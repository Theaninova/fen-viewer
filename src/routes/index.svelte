<script lang="ts">
  import "../lib/style/style.scss"
  import {isFen, parseFenString, fenValidPattern, isWhitePieceRegex} from "../lib/fen"

  let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  let parsed = parseFenString(fen)

  $: if (isFen(fen)) {
    parsed = parseFenString(fen)
  } else {
    console.log("Invalid FEN string")
  }

  let input: HTMLInputElement
</script>

<main>
  <h1>FEN-Viewer</h1>
  <div class="inputContainer">
    <input
      bind:this={input}
      on:change|preventDefault={() => (fen = input.value)}
      on:submit|preventDefault={() => (fen = input.value)}
      pattern={fenValidPattern}
      type="text"
      spellcheck="false"
      name="fen"
      placeholder="FEN String"
      value={fen}
    />
    <div />
  </div>

  <table>
    <tr>
      <th />
      {#each Array.from({length: 8}).map((_, i) => String.fromCodePoint(i + 65)) as piece}
        <th>{piece}</th>
      {/each}
    </tr>
    {#each parsed.board as row, i}
      <tr>
        <th>{i}</th>
        {#each row as piece}
          <td class:white={isWhitePieceRegex.test(piece)}>{piece ? piece : ""}</td>
        {/each}
        <th>{i}</th>
      </tr>
    {/each}
    <tr>
      <th />
      {#each Array.from({length: 8}).map((_, i) => String.fromCodePoint(i + 65)) as piece}
        <th>{piece}</th>
      {/each}
    </tr>
  </table>
</main>

<style lang="scss">
  main {
    font-family: Roboto, sans-serif;

    // center
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .inputContainer {
    width: min(10vw * 8, 8vh * 8);

    // horizontal
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  input {
    width: 100%;
    height: 40px;

    box-sizing: border-box;
    background: #e0bebd;
    color: black;
    padding: 8px;
    border-radius: 6px 0 0 6px;
    border: none;
    transition: all 0.2s ease-in-out;

    text-decoration: none;
  }

  .inputContainer > div {
    height: 40px;
    width: 40px;
    border-radius: 0 6px 6px 0;
    background: #4b221f;
    color: white;
  }
  .inputContainer > div:after {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  }

  input:focus {
    outline: none;
    background: #ffffff;
  }

  input:invalid + *:after {
    content: "✖";
  }
  input + *:after {
    content: "✔";
  }

  // no border
  table {
    border-collapse: collapse;
  }

  td,
  th {
    width: min(10vw, 8vh);
    height: min(10vw, 8vh);
  }

  th {
    font-size: min(3vw, 3vh);
  }

  td {
    background: #d7acac;
    color: #000;
    text-align: center;
    font-size: min(5vw, 5vh);
    text-shadow: #757575 0 0 10px;
  }

  .white {
    color: #fff !important;
    text-shadow: black 0 0 10px;
  }

  tr:nth-child(even) {
    td:nth-child(odd) {
      background: #be8b89;
    }
  }

  tr:nth-child(odd) {
    td:nth-child(even) {
      background: #be8b89;
    }
  }
</style>
