<script>
  import {onTick, isNil, getAllProperties, getPropertyDescriptor} from './utilities.js';

  export let value;

  const properties = isNil(value) ? [] : getAllProperties(value);

  const paging = 100;
  let maxCount = paging;

  import {scope, focusPrev, focusNext} from './focus-actions.js';
  import Property from './Property.svelte';
  import Toggle from './Toggle.svelte';
</script>

<span use:scope>
  {#each properties.slice(0, maxCount) as property, index (index)}
    <div class=row>
      <pre class=indentation>&nbsp;&nbsp;</pre>
      <span class=item>
        <Property
          key={property}
          context={value}
          descriptor={getPropertyDescriptor(value, property)}
          separator=': '
        />
      </span>
    </div>
  {:else}
    <div class=row>
      <pre class=indentation>&nbsp;&nbsp;</pre>
      <span class=empty><slot>No properties</slot></span>
    </div>
  {/each}
  {#if maxCount < properties.length}
    <div class=row>
      <pre class=indentation>&nbsp;&nbsp;</pre>
      <Toggle
        on:open={() => {
          maxCount += paging;
          focusPrev();
          onTick(focusNext);
        }}
      >
        Show {maxCount} … {Math.min(properties.length, maxCount + paging - 1)} of {properties.length} properties
      </Toggle>
    </div>
  {/if}
</span>

<style>
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
