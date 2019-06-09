<script context=module>
  export const check = value => value instanceof Error;
</script>

<script>
  export let value;

  import PrimitiveBase from '../PrimitiveBase.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  <span class=error>{String(value)}</span>
</PrimitiveBase>

<style>
  .error {
    color: var(--color-red);
  }
</style>
