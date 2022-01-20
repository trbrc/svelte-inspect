<script context=module>
  export const type = Set;
  export const hasDepthProp = true;
</script>

<script>
  export let depth = 0;
  export let value;

  $: nextDepth = Math.max(0, depth - 1);

  let isOpen = depth > 0;

  import Formatter from '../Formatter.svelte';
  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
  import Echo from '../Echo.svelte';
</script>

<Toggle className=set-toggle bind:isOpen>
  <slot />
  <Echo>
    <span slot=1 class=set>Set(</span>
    <span slot=2 class=size>{value.size}</span>
    <span slot=3 class=set>)</span>
  </Echo>
  &lcub;{#if !isOpen}
    <span class=on-intent>…</span>&rcub;
  {/if}
</Toggle>

{#if isOpen}
  {#each [...value] as entryValue, index (entryValue)}
    <div class=row>
      <pre class=indentation>&nbsp;&nbsp;</pre>
      <span class=item>
        <Formatter depth={nextDepth} value={entryValue}><span class=entry-index>entry {index}</span>: </Formatter>
      </span>
    </div>
  {:else}
    <div class=row>
      <pre class=indentation>&nbsp;&nbsp;</pre>
      <span class=empty>No entries</span>
    </div>
  {/each}
  <PropertyList
    {depth}
    {value}
  >
    No properties
  </PropertyList>
  &rcub;
{/if}

<style>
  .set {
    color: var(--color-black);
  }
  .size {
    color: var(--color-blue);
  }
  .on-intent {
    display: none;
  }
  :global(.set-toggle:hover) > .on-intent,
  :global(.set-toggle:focus) > .on-intent {
    display: inline;
  }
  .entry-index {
    color: var(--color-gray);
  }
  .row {
    display: flex;
  }
  .row:not(:last-child) > .item:after {
    content: ' , ';
    margin-left: -1ex;
    pointer-events: none;
    color: var(--color-black);
  }
  .indentation {
    margin: 0;
    padding: 0;
    display: inline-block;
  }
  .empty {
    color: var(--color-gray);
    font-style: italic;
  }
</style>
