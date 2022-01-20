<script context=module>
  export const type = Date;
</script>

<script>
  import {groupByRegexes} from '../utilities.js';
  const grouper = groupByRegexes({
    'number': /[0-9]+/
  });

  export let value;

  $: ISOString = Date.prototype.toISOString.call(value);
  $: date = ISOString.slice(0, 10);
  $: time = ISOString.slice(10);

  import PrimitiveBase from '../PrimitiveBase.svelte';
  import Echo from '../Echo.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  <Echo>
    <span slot=1>Date(</span>
    <span slot=2 class=date>
      {#each grouper(date) as {key, match}}
        <span class={key || 'default'}>{match}</span>
      {/each}
    </span>
    <span slot=3 class=time>
      {#each grouper(time) as {key, match}}
        <span class={key || 'default'}>{match}</span>
      {/each}
    </span>
    <span slot=4>)</span>
  </Echo>
</PrimitiveBase>

<style>
  .default {
    color: var(--color-gray);
  }
  .date .number {
    color: var(--color-blue);
  }
  .time .number {
    color: var(--color-purple);
  }
</style>
