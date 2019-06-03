<script>
  export let value;

  $: typeDescription = `Array(${value.length})`;

  import Toggle from '../inspect/Toggle.svelte';
</script>

<Toggle {value}>
  <span slot="prefix"><span class=array>{typeDescription}</span> [</span>
  <span slot="suffix">]</span>
</Toggle>

<style>
  .array {
    color: var(--color-purple);
  }
</style>
