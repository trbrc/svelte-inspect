<script context=module>
  export const check = value => value !== null && typeof value === 'object';
</script>

<script>
  import {getObjectTypeString} from '../utilities.js';

  export let value;

  const typeDescription = getObjectTypeString(value);

  let isOpen = false;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
</script>

<Toggle className=object-toggle bind:isOpen>
  <slot />
  <span class=object>{typeDescription}</span>
  &lcub;{#if !isOpen}
    <span class=on-intent>…</span>&rcub;
  {/if}
</Toggle>

{#if isOpen}
  <PropertyList
    {value}
  />
  &rcub;
{/if}

<style>
  .object {
    color: var(--color-purple);
  }
  .on-intent {
    display: none;
  }
  :global(.object-toggle:hover) > .on-intent,
  :global(.object-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
