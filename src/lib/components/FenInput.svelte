<script lang="ts">
  import {isFen, parseFenString, fenValidPattern} from "../fen"
  import {createEventDispatcher} from "svelte"
  import type {ParsedFen} from "../fen"

  export let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

  const dispatch = createEventDispatcher<{change: ParsedFen}>()

  $: if (isFen(fen)) {
    dispatch("change", parseFenString(fen))
  } else {
    console.log("Invalid FEN string")
  }

  let input: HTMLInputElement
</script>

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

<style lang="scss">
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
</style>
