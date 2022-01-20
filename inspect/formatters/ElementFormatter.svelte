<script context=module>
  export const check = value => {
    if (!(value instanceof HTMLElement)) {
      return false;
    }
    try {
      return !!value.tagName;
    } catch (error) {}
    return false;
  };
</script>

<script>
  import {getObjectTypeString} from '../utilities.js';

  export let value;

  import Echo from '../Echo.svelte';
  import PrimitiveBase from '../PrimitiveBase.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  <Echo>
    <span slot=1 class=punctuation>&lt;</span>
    <span slot=2 class=tag-name>{value.tagName.toLowerCase()}</span>
    <span slot=3>
      {#each value.attributes as attribute}
        {' '}
        {#if attribute.value}
          <Echo>
            <span slot=1 class=attribute-name>{attribute.name}</span>
            <span slot=2 class=punctuation>="</span>
            <span slot=3 class=attribute-value>{attribute.value}</span>
            <span slot=4 class=punctuation>"</span>
          </Echo>
        {:else}
          <Echo>
            <span slot=1 class=attribute-name>{attribute.name}</span>
          </Echo>
        {/if}
      {/each}
    </span>
    <span slot=4 class=punctuation>&gt;</span>
  </Echo>
</PrimitiveBase>

<style>
  .tag-name {
    color: var(--color-green);
  }
  .punctuation {
    color: var(--color-black);
  }
  .attribute-name {
    color: var(--color-brown);
  }
  .attribute-value {
    white-space: pre-wrap;
    color: var(--color-red);
  }
</style>
