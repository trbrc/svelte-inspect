<script>
  import {keyIsIndex} from './utilities.js';

  export let key;
  export let descriptor = {};
  export let separator = ': ';

  $: enumerable = descriptor.enumerable;
  $: value = descriptor.value;

  import Value from './Value.svelte';
</script>

<span class=key class:enumerable class:index={keyIsIndex(key)}>
  {String(key)}<span class=separator>{separator}</span>
</span>
<Value {value} />

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
