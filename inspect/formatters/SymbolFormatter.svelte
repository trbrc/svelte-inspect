<script context=module>
  export const typeOf = 'symbol';
</script>

<script>
  export let value;

  $: isWellKnown = Symbol.keyFor(value) !== undefined;
  $: key = isWellKnown ? Symbol.keyFor(value) : String(value).slice(7, -1);
  $: prefix = isWellKnown ? 'Symbol.for(' : 'Symbol(';

  import Echo from '../Echo.svelte';
  import PrimitiveBase from '../PrimitiveBase.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  <Echo>
    <span slot=slot class=affix>{prefix}</span>
    <span slot=slot class=key>{key}</span>
    <span slot=slot class=affix>)</span>
  </Echo>
</PrimitiveBase>

<style>
  .key {
    color: var(--color-red);
  }
  .affix {
    color: var(--color-pink);
  }
</style>
