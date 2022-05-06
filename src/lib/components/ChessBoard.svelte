<script lang="ts">
  import type {ParsedFen} from "../fen"
  import {isWhitePieceRegex} from "../fen"
  import FixedFont from "./FixedFont.svelte"

  export let chessState: ParsedFen

  const headerRows = ["", ...Array.from({length: 8}).map((_, i) => String.fromCodePoint(i + 65)), ""]
</script>

{#if chessState}
  <table {...$$props}>
    <tr>
      {#each headerRows as piece}
        <th><FixedFont fontSize="4px">{piece}</FixedFont></th>
      {/each}
    </tr>
    {#each chessState.board as row, i}
      <tr>
        <th><FixedFont fontSize="4px">{i}</FixedFont></th>
        {#each row as piece}
          <td class:white={isWhitePieceRegex.test(piece)}>
            <FixedFont fontSize="7px">{piece ? piece : ""}</FixedFont>
          </td>
        {/each}
        <th><FixedFont fontSize="4px">{i}</FixedFont></th>
      </tr>
    {/each}
    <tr>
      {#each headerRows as piece}
        <th><FixedFont fontSize="4px">{piece}</FixedFont></th>
      {/each}
    </tr>
  </table>
{/if}

<style lang="scss">
  table {
    border-collapse: collapse;
  }

  table,
  tr,
  td,
  th {
    padding: 0;
    margin: 0;
  }

  td,
  th {
    width: calc(100% / (8 + 2));
    height: calc(100% / (8 + 2));
  }

  td {
    background: #d7acac;
    color: #000;
    text-shadow: #757575 0 0 10px;
  }

  .white {
    color: #fff;
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
