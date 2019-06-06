<script context=module>
  export const typeOf = 'number';
</script>

<script>
  export let value;

  const stringified = Object.is(value, -0) ? '-0' : Number.prototype.toString.call(value, 10);

  let isOpen = false;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
</script>

<Toggle {value} className=number-toggle bind:isOpen>
  <slot />
  {#each stringified.split(/(\d+)/) as group, index}
    {#if group.length}
      <span class:digits={index % 2} class:punctuation={!(index % 2)}>{group}</span>
    {/if}
  {/each}
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
  .digits {
    color: var(--color-blue);
  }
  .punctuation {
    color: var(--color-black);
  }
  .on-intent {
    display: none;
  }
  :global(.number-toggle:hover) > .on-intent,
  :global(.number-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
