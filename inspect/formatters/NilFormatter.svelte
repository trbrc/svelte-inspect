<script context=module>
  export const check = value => value === null || value === undefined;
</script>

<script>
  export let value;

  import PrimitiveBase from '../PrimitiveBase.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  <span class=nil>{String(value)}</span>
</PrimitiveBase>

<style>
  .nil {
    color: var(--color-gray);
  }
</style>
