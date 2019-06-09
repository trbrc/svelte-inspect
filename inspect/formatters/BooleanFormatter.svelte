<script context=module>
  export const typeOf = 'boolean';
</script>

<script>
  export let value;

  import PrimitiveBase from '../PrimitiveBase.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  <span class=boolean>{String(value)}</span>
</PrimitiveBase>

<style>
  .boolean {
    color: var(--color-blue);
  }
</style>
