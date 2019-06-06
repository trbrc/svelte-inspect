<script context=module>
  export const typeOf = 'function';
</script>

<script>
  export let value;

  const isClass = Function.prototype.toString.call(value).startsWith('class');
  const functionString = Function.prototype.toString.call(value);

  let isOpen = false;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
</script>

<Toggle {value} className=function-toggle bind:isOpen>
  <slot />
  <span class=function class:class={isClass}>
    {Function.prototype.toString.call(value).split('\n')[0]}
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
  .function {
    color: var(--color-black);
  }
  .class {
    color: var(--color-purple);
  }
  .on-intent {
    display: none;
  }
  :global(.function-toggle:hover) > .on-intent,
  :global(.function-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
