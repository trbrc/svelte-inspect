<script context=module>
  export const check = value => true;
</script>

<script>
  export let value;

  import PrimitiveBase from '../PrimitiveBase.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  <span class=fallback>{String(value)}</span>
</PrimitiveBase>

<style>
  .fallback {
    color: var(--color-black);
  }
</style>
