<script context=module>
  export const typeOf = 'function';
</script>

<script>
  import {groupByRegexes} from '../utilities.js';
  const grouper = groupByRegexes({
    'function-keyword': /(ƒ|function|\=\>)/,
    'async-keyword': /(async|await)/,
    'class-keyword': /(class|extends)/,
    identifier: /(\d|\w|_|\$)+/,
  });

  export let value;

  $: functionString = Function.prototype.toString.call(value).split('\n')[0].replace(/^function/, 'ƒ');

  import PrimitiveBase from '../PrimitiveBase.svelte';
</script>

<PrimitiveBase {value}>
  <slot />
  <span>
    {#each grouper(functionString) as {key, match}}
      <span class={key || 'default'}>{match}</span>
    {/each}
  </span>
</PrimitiveBase>

<style>
  .default {
    color: var(--color-gray);
  }
  .function-keyword {
    color: var(--color-black);
  }
  .async-keyword {
    color: var(--color-green);
  }
  .class-keyword {
    color: var(--color-purple);
  }
  .identifier {
    color: var(--color-blue);
  }
</style>
