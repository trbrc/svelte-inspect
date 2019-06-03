<script>
  export let value;

  $: typeDescription = String(value);

  import Toggle from '../inspect/Toggle.svelte';
</script>

<Toggle {value}>
  <span slot="prefix"><span class=fallback>{typeDescription}</span> &lcub;</span>
  <span slot="suffix">&rcub;</span>
</Toggle>

<style>
  .fallback {
    color: var(--color-green);
  }
</style>
