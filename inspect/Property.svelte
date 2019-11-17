<script>
  import {keyIsIndex} from './utilities.js';

  export let depth = 0;
  export let key;
  export let context;
  export let descriptor = {};
  export let separator;

  $: enumerable = descriptor.enumerable;
  $: getter = descriptor.get;
  $: value = descriptor.value;

  import Formatter from './Formatter.svelte';
  import Getter from './Getter.svelte';
</script>

<svelte:component
  this={getter ? Getter : Formatter}
  {...(getter ? {descriptor, context} : {value, depth: enumerable ? depth : 0})}
>
  <span class=key class:enumerable class:index={keyIsIndex(key)}>
    <span class=pre>{String(key)}</span><span class=separator>{separator}</span>
  </span>
</svelte:component>

<style>
  .pre {
    white-space: pre-wrap;
  }
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
