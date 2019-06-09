<script context=module>
  export const check = value => {
    switch (Object.getPrototypeOf(value)) {
      case Int8Array.prototype:
      case Uint8Array.prototype:
      case Uint8ClampedArray.prototype:
      case Int16Array.prototype:
      case Uint16Array.prototype:
      case Int32Array.prototype:
      case Uint32Array.prototype:
      case Float32Array.prototype:
      case Float64Array.prototype:
      case BigInt64Array.prototype:
      case BigUint64Array.prototype: {
        return true;
      }
    }
    return false;
  };
</script>

<script>
  import {getObjectTypeString} from '../utilities.js';

  export let value;

  const typeDescription = getObjectTypeString(value);

  let isOpen = false;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
  import Echo from '../Echo.svelte';
</script>

<Toggle {value} className=typed-array-toggle bind:isOpen>
  <slot />
  <Echo>
    <span slot=slot class=typed-array>{typeDescription}(</span>
    <span slot=slot class=length>{value.length}</span>
    <span slot=slot class=typed-array>)</span>
  </Echo>
  [{#if !isOpen}
    <span class=on-intent>…</span>]
  {/if}
</Toggle>

{#if isOpen}
  <PropertyList
    {value}
  >
    Empty array
  </PropertyList>
  ]
{/if}

<style>
  .typed-array {
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
