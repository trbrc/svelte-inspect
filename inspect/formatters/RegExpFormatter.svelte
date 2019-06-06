<script context=module>
  export const type = RegExp;
</script>

<script>
  export let value;

  const source = value.source;
  const flags = value.flags;

  let isOpen = false;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
  import Echo from '../Echo.svelte';
</script>

<Toggle {value} className=regexp-toggle bind:isOpen>
  <slot />
  <span class=regexp>
    <Echo>
      <span slot=slot class=slash>/</span>
      <span slot=slot class=source>{source}</span>
      <span slot=slot class=slash>/</span>
      <span slot=slot class=flags>{flags}</span>
    </Echo>
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
  .slash {
    color: var(--color-black);
  }
  .source {
    color: var(--color-red);
  }
  .flags {
    color: var(--color-pink);
  }
  .on-intent {
    display: none;
  }
  :global(.regexp-toggle:hover) > .on-intent,
  :global(.regexp-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
