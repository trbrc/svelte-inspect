<script>
  export let descriptor = {};
  export let context = {};
  let getterValue;
  let hasGottenResult = false;

  let getterError;
  let hasError = false;

  import {onTick} from './utilities.js';
  import {focusPrev, focusNext} from './focus-actions.js';
  import Formatter from './Formatter.svelte';
  import Toggle from './Toggle.svelte';
</script>

{#if hasGottenResult}
  <Formatter value={getterValue}>
    <span class=prefix>get</span>
    <slot />
  </Formatter>
{:else}
  <Toggle
    className=getter-toggle
    on:open={
      () => {
        try {
          getterValue = descriptor.get.call(context);
          hasGottenResult = true;
          focusPrev();
          onTick(focusNext);
        } catch (error) {
          getterError = error;
          hasError = true;
        }
      }
    }
  >
    <span class=prefix>get</span>
    <slot />
    {#if hasError}
      <span class=error>{getterError}</span>
    {:else}
      (<span class=on-intent>…</span>)
    {/if}
  </Toggle>
{/if}

<style>
  .prefix {
    color: var(--color-gray);
    font-style: italic;
  }
  .error {
    color: var(--color-red);
    font-style: italic;
  }
  .on-intent {
    display: none;
  }
  :global(.getter-toggle:hover) > .on-intent,
  :global(.getter-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
