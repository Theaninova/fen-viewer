<script lang="ts">
  import {createEventDispatcher} from "svelte"

  let dispatch = createEventDispatcher<{move: string}>()
  export let disabled = false

  let move: HTMLTextAreaElement
</script>

<form on:submit|preventDefault={() => dispatch("move", move.value)}>
  <input
    {disabled}
    bind:this={move}
    type="text"
    name="name"
    placeholder="a1 a2"
    pattern="[a-h][1-8] [a-h][1-8]"
    autocomplete="off"
    minlength="5"
    maxlength="5"
    required
  />
  <input {disabled} type="submit" value="Move" />
</form>

<style lang="scss">
  form {
    display: inline-block;
  }

  input[type="text"] {
    width: 48px;
    height: 32px;

    box-sizing: border-box;
    background: #e0bebd;
    color: black;
    padding: 8px;
    border-radius: 6px 0 0 6px;
    border: none;
    transition: all ease 0.2s;

    text-decoration: none;
  }
  input[type="submit"] {
    width: 48px;
    height: 32px;
    border: none;
    border-radius: 0 6px 6px 0;
    background: #4b221f;
    cursor: pointer;
    transition: all ease 0.2s;
    color: white;
  }
  input[type="submit"]:hover {
    background: #e0bebd;
    color: black;
  }
  input:focus {
    outline: none;
    color: black;
    background: #ffffff;
  }

  input[disabled],
  input[disabled]:hover {
    background: #cccbcb;
    color: #494747;
    cursor: not-allowed;
  }
</style>
