<script context=module>
  export const check = value => value instanceof HTMLElement;
</script>

<script>
  import {getObjectTypeString} from '../utilities.js';

  export let value;

  let tagName;
  let hasTagName = false;
  try {
    tagName = value.tagName;
    hasTagName = true;
  } catch (error) {}

  const attributes = [];
  if (hasTagName) for (let i = 0; i < value.attributes.length; i++) {
    const attribute = value.attributes[i];
    attributes.push(` ${attribute.name}="${attribute.value}"`);
  }

  const typeDescription = tagName ? `<${tagName.toLowerCase()}${attributes.join('')}>` : getObjectTypeString(value);

  let isOpen = false;

  import Toggle from '../Toggle.svelte';
  import PropertyList from '../PropertyList.svelte';
</script>

<Toggle {value} className=object-toggle bind:isOpen>
  <slot />
  <span class=object class:element={hasTagName}>{typeDescription}</span>
  &lcub;{#if !isOpen}
    <span class=on-intent>…</span>&rcub;
  {/if}
</Toggle>

{#if isOpen}
  <PropertyList
    {value}
  />
  &rcub;
{/if}

<style>
  .object {
    color: var(--color-purple);
  }
  .element {
    color: var(--color-green);
  }
  .on-intent {
    display: none;
  }
  :global(.object-toggle:hover) > .on-intent,
  :global(.object-toggle:focus) > .on-intent {
    display: inline;
  }
</style>
