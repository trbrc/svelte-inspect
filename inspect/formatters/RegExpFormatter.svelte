<script context=module>
  export const type = RegExp;
</script>

<script>
  export let value;

  $: source = value.source;
  $: flags = value.flags;

  import Echo from '../Echo.svelte';
  import PrimitiveBase from '../PrimitiveBase.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  <span class=regexp>
    <Echo>
      <span slot=slot class=slash>/</span>
      <span slot=slot class=source>{source}</span>
      <span slot=slot class=slash>/</span>
      <span slot=slot class=flags>{flags}</span>
    </Echo>
  </span>
</PrimitiveBase>

<style>
  .slash {
    color: var(--color-black);
  }
  .source {
    color: var(--color-red);
  }
  .flags {
    color: var(--color-pink);
  }
</style>
