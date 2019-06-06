<script context=module>
  export const typeOf = 'string';
</script>

<script>
  import {stringEscapeGroups, isEscapeGroup} from '../utilities.js';

  export let value;

  const groups = stringEscapeGroups(value);

  let isOpen = false;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
</script>

<Toggle {value} className=string-toggle bind:isOpen>
  <slot />
  <span class=string>
    {#each groups as group}
      <span
        class=chars
        class:escape={isEscapeGroup(group)}
      >{group}</span>
    {/each}
  </span>
  {#if !isOpen}
    <span class=on-intent>…</span>
  {:else}
    &lcub;
  {/if}
</Toggle>

{#if isOpen}
  <PropertyList
    {value}
  />
  &rcub;
{/if}

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
  .on-intent {
    display: none;
  }
  :global(.string-toggle:hover) > .on-intent,
  :global(.string-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
