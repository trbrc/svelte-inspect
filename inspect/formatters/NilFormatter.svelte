<script context=module>
  export const check = value => value === null || value === undefined;
</script>

<script>
  export let value;

  let isOpen = false;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
</script>

<Toggle {value} className=nil-toggle bind:isOpen>
  <slot />
  <span class=nil>{String(value)}</span>
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
  .nil {
    color: var(--color-gray);
  }
  .on-intent {
    display: none;
  }
  :global(.nil-toggle:hover) > .on-intent,
  :global(.nil-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
