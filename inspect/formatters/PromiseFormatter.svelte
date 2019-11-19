<script context=module>
  export const type = Promise;
  export let hasDepthProp = true;
</script>

<script>
  export let depth = 0;
  export let value;

  let isOpen = depth > 0;

  $: promiseState = 'pending';
  $: promiseValue = undefined;
  async function resolve(promise) {
    try {
      promiseValue = await promise;
      promiseState = 'resolved';
    } catch (error) {
      promiseValue = error;
      promiseState = 'rejected';
    }
  };

  resolve(value);

  import Formatter from '../Formatter.svelte';
  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
  import Echo from '../Echo.svelte';
</script>

<Toggle className=promise-toggle bind:isOpen>
  <slot />
  <Echo>
    <span slot=slot class=promise>Promise(</span>
    <span slot=slot class="state {promiseState}">{promiseState}</span>
    <span slot=slot class=promise>)</span>
  </Echo>
  &lcub;{#if !isOpen}
    <span class=on-intent>…</span>&rcub;
  {/if}
</Toggle>

{#if isOpen}
  <div class=row>
    <pre class=indentation>&nbsp;&nbsp;</pre>
    <span class=item><Formatter value={promiseValue}>&lt;{promiseState}&gt;: </Formatter></span>
  </div>
  <PropertyList
    {depth}
    {value}
  >
    No properties
  </PropertyList>
  &rcub;
{/if}

<style>
  .promise {
    color: var(--color-black);
  }
  .state.pending {
    color: var(--color-gray);
  }
  .state.resolved {
    color: var(--color-blue);
  }
  .state.rejected {
    color: var(--color-red);
  }
  .on-intent {
    display: none;
  }
  :global(.promise-toggle:hover) > .on-intent,
  :global(.promise-toggle:focus) > .on-intent {
    display: inline;
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
</style>
