<script>
  $: propKeys = Object.keys($$props);
</script>

{#each propKeys as key}
  <pre class=inspect>{key} = {Object.prototype.toString.call($$props[key])};</pre>
{/each}

<style>
  .inspect {
    font-family:
      Menlo,
      Consolas,
      Lucida Console,
      Courier New,
      Dejavu Sans Mono,
      monospace;
    font-size: 11px;
    line-height: 1.35;
  }
</style>
