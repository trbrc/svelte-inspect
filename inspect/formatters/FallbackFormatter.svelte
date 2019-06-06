<script context=module>
  export const check = value => true;
</script>

<script>
  export let value;

  let isOpen = false;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
</script>

<Toggle {value} className=fallback-toggle bind:isOpen>
  <slot />
  <span class=fallback>{String(value)}</span>
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
  .fallback {
    color: var(--color-black);
  }
  .on-intent {
    display: none;
  }
  :global(.fallback-toggle:hover) > .on-intent,
  :global(.fallback-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
