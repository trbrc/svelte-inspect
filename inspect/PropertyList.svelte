<script>
  import {isNil, getAllProperties} from './utilities.js';

  export let value;

  const properties = isNil(value) ? [] : getAllProperties(value);

  import Property from './Property.svelte';
  import {scope} from './focus-actions.js';
</script>

<span use:scope>
  {#each properties as property, index (property)}
    <div class=row>
      <pre class=indentation>&nbsp;&nbsp;</pre>
      <span class=item>
        <Property
          key={property}
          descriptor={Object.getOwnPropertyDescriptor(value, property) || {value: value[property]}}
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
