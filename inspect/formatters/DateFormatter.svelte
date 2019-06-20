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
  $: [date, time] = ISOString.split(/(T.*)/);

  import PrimitiveBase from '../PrimitiveBase.svelte';
  import Echo from '../Echo.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  <Echo>
    <span slot=slot>Date(</span>
    <span slot=slot class=date>
      {#each grouper(date) as {key, match}}
        <span class={key || 'default'}>{match}</span>
      {/each}
    </span>
    <span slot=slot class=time>
      {#each grouper(time) as {key, match}}
        <span class={key || 'default'}>{match}</span>
      {/each}
    </span>
    <span slot=slot>)</span>
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
