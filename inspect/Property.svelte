<script>
  import {keyIsIndex} from './utilities.js';

  export let key;
  export let descriptor = {};
  export let separator;

  $: enumerable = descriptor.enumerable;
  $: value = descriptor.value;

  import Formatter from './Formatter.svelte';
</script>

<Formatter {value}>
  <span class=key class:enumerable class:index={keyIsIndex(key)}>
    {String(key)}<span class=separator>{separator}</span>
  </span>
</Formatter>

<style>
  .key {
    color: var(--color-purple);
  }
  .key.index {
    color: var(--color-gray);
  }
  .key:not(.enumerable) {
    opacity: 0.5;
  }
  .separator {
    color: var(--color-black);
  }
</style>
