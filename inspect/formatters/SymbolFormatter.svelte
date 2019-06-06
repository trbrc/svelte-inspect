<script context=module>
  export const typeOf = 'symbol';
</script>

<script>
  export let value;

  let isOpen = false;

  let key = Symbol.keyFor(value);
  const isWellKnown = key !== undefined;
  if (!isWellKnown) {
    key = String(value).slice(7, -1);
  }
  const prefix = isWellKnown ? 'Symbol.for(' : 'Symbol(';

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
  import Echo from '../Echo.svelte';
</script>

<Toggle {value} className=symbol-toggle bind:isOpen>
  <slot />
  <Echo>
    <span slot=slot class=affix>{prefix}</span>
    <span slot=slot class=key>{key}</span>
    <span slot=slot class=affix>)</span>
  </Echo>
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
  .key {
    color: var(--color-red);
  }
  .affix {
    color: var(--color-pink);
  }
  .on-intent {
    display: none;
  }
  :global(.symbol-toggle:hover) > .on-intent,
  :global(.symbol-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
