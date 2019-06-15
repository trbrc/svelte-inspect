<script context=module>
  export const typeOf = 'number';
</script>

<script>
  export let value;

  $: stringified = Object.is(value, -0) ? '-0' : Number.prototype.toString.call(value, 10);

  import PrimitiveBase from '../PrimitiveBase.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  {#each stringified.split(/(\d+)/) as group, index}
    {#if group.length}
      <span class:digits={index % 2} class:punctuation={!(index % 2)}>{group}</span>
    {/if}
  {/each}
</PrimitiveBase>

<style>
  .digits {
    color: var(--color-blue);
  }
  .punctuation {
    color: var(--color-black);
  }
</style>
