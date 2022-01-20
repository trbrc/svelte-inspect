<script context=module>
  export const type = Array;
  export const hasDepthProp = true;
</script>

<script>
  export let depth = 0;
  export let value;

  let isOpen = depth > 0;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
  import Echo from '../Echo.svelte';
</script>

<Toggle className=array-toggle bind:isOpen>
  <slot />
  <Echo>
    <span slot=1 class=array>Array(</span>
    <span slot=2 class=length>{value.length}</span>
    <span slot=3 class=array>)</span>
  </Echo>
  [{#if !isOpen}
    <span class=on-intent>…</span>]
  {/if}
</Toggle>

{#if isOpen}
  <PropertyList
    {depth}
    {value}
  >
    Empty array
  </PropertyList>
  ]
{/if}

<style>
  .array {
    color: var(--color-black);
  }
  .length {
    color: var(--color-blue);
  }
  .on-intent {
    display: none;
  }
  :global(.array-toggle:hover) > .on-intent,
  :global(.array-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
