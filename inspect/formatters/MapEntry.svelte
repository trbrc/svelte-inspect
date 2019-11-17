<script>
  export let depth = 0;
  export let key;
  export let value;

  $: propertyListValue = Object.assign(Object.create(null), {key, value});

  let isOpen = depth > 0;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
</script>

<Toggle className=map-entry-toggle bind:isOpen>
  <slot />
  {#if !isOpen}
    {String(key)} => {String(value)} <span class=on-intent>…</span>
  {/if}
</Toggle>

{#if isOpen}
  &lcub;
  <PropertyList
    {depth}
    value={propertyListValue}
  />
  &rcub;
{/if}

<style>
  .map-entry {
    color: var(--color-purple);
  }
  .on-intent {
    display: none;
  }
  :global(.map-entry-toggle:hover) > .on-intent,
  :global(.map-entry-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
