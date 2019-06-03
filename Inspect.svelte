<script>
  import Property from './inspect/Property.svelte';

  $: propKeys = Object.keys($$props);
</script>

{#each propKeys as key}
  <span class=inspect>
    <Property
      key={key}
      descriptor={Object.getOwnPropertyDescriptor($$props, key)}
      separator=" = "
    />;
  </span>
{/each}

<style>
  .inspect {
    font-family:
      Menlo,
      Consolas,
      Lucida Console,
      Courier New,
      Dejavu Sans Mono,
      monospace;
    font-size: 11px;
    line-height: 1.35;
    color: var(--color-black);

    --color-red: darkred;
    --color-blue: darkblue;
    --color-green: darkgreen;
    --color-purple: purple;
    --color-orange: darkorange;
    --color-yellow: gold;
    --color-brown: chocolate;
    --color-pink: hotpink;
    --color-gray: gray;
    --color-black: #222222;
    --color-white: whitesmoke;
  }
</style>
