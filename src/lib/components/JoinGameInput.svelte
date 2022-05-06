<script lang="ts">
  import {createEventDispatcher} from "svelte"

  let dispatch = createEventDispatcher<{join: undefined}>()
  export let disabled = false
</script>

<form on:submit|preventDefault={() => dispatch("join")}>
  <!--<input
    {disabled}
    bind:this={username}
    type="text"
    name="name"
    placeholder="Username"
    pattern="[a-zA-Z0-9]*"
    autocomplete="off"
    minlength="3"
    maxlength="15"
    required
  />-->
  <input {disabled} type="submit" value="Join" />
</form>

<style lang="scss">
  form {
    display: inline-block;
  }

  input[type="text"] {
    width: 100px;
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
    width: 40px;
    height: 32px;
    border: none;
    border-radius: 6px;
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
