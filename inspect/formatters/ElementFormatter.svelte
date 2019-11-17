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
    <span slot=slot class=punctuation>&lt;</span>
    <span slot=slot class=tag-name>{value.tagName.toLowerCase()}</span>
    <span slot=slot>
      {#each value.attributes as attribute}
        {' '}
        {#if attribute.value}
          <Echo>
            <span slot=slot class=attribute-name>{attribute.name}</span>
            <span slot=slot class=punctuation>="</span>
            <span slot=slot class=attribute-value>{attribute.value}</span>
            <span slot=slot class=punctuation>"</span>
          </Echo>
        {:else}
          <Echo>
            <span slot=slot class=attribute-name>{attribute.name}</span>
          </Echo>
        {/if}
      {/each}
    </span>
    <span slot=slot class=punctuation>&gt;</span>
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
