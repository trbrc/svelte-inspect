<script context=module>
  export const typeOf = 'boolean';
</script>

<script>
  export let value;

  let isOpen = false;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
</script>

<Toggle {value} className=boolean-toggle bind:isOpen>
  <slot />
  <span class=boolean>{String(value)}</span>
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
  .boolean {
    color: var(--color-blue);
  }
  .on-intent {
    display: none;
  }
  :global(.boolean-toggle:hover) > .on-intent,
  :global(.boolean-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
