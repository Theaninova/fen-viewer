<script>
  export let fontSize = "7px"
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" {...$$props}
  ><text x="5" y="6" font-size={fontSize} fill="currentColor" dominant-baseline="middle" text-anchor="middle">
    <slot /></text
  ></svg
>

<style>
  svg {
    display: flex;
    width: 100%;
    aspect-ratio: 1;
  }
</style>
