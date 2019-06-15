<script context=module>
  export const typeOf = 'string';
</script>

<script>
  import {stringEscapeGroups, isEscapeGroup} from '../utilities.js';

  export let value;

  $: groups = stringEscapeGroups(value);

  import PrimitiveBase from '../PrimitiveBase.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  <span class=string>
    {#each groups as group}
      <span
        class=chars
        class:escape={isEscapeGroup(group)}
      >{group}</span>
    {/each}
  </span>
</PrimitiveBase>

<style>
  .string:after,
  .string:before {
    content: '"';
    color: var(--color-black);
  }
  .chars {
    color: var(--color-red);
  }
  .chars.escape {
    color: var(--color-pink);
  }
</style>
