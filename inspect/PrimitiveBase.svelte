<!-- Base for "non-object" values -->

<script>
  export let value;

  let isOpen = false;

  import Toggle from './Toggle.svelte';
  import PropertyList from './PropertyList.svelte';
</script>

<Toggle className=toggle bind:isOpen>
  <slot {isOpen} />
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
  .on-intent {
    display: none;
  }
  :global(.toggle:hover) > .on-intent,
  :global(.toggle:focus) > .on-intent {
    display: inline;
  }
</style>
