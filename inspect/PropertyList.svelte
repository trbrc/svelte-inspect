<script>
  import {isNil} from './utilities.js';

  export let value;

  const properties = isNil(value) ? [] : Object.keys(value);

  import Property from './Property.svelte';
  import {scope} from './focus-actions.js';
</script>

<span use:scope>
  {#each properties as property, index (property)}
    <div class=row>
      <pre class=indentation>&nbsp;&nbsp;</pre>
      <div class=item>
        <Property
          key={property}
          descriptor={Object.getOwnPropertyDescriptor(value, property)}
        />
      </div>
    </div>
  {:else}
    <slot />
  {/each}
</span>

<style>
  .row {
    display: flex;
  }
  .row:not(:last-child) > .item:after {
    content: ', ';
    color: var(--color-black);
  }
  .indentation {
    margin: 0;
    padding: 0;
    display: inline-block;
  }
</style>
