<script>
  import Property from './Property.svelte';
  import Formatter from './Formatter.svelte';

  const getConfiguration = props => {
    const userConfiguration = props[Symbol.for('configuration')] || {};
    return {
      depth: 1,
      palette: {},
      ...userConfiguration
    };
  };

  let {depth, palette, valueOnly} = getConfiguration($$props);

  $: colors = Object.keys(palette);
  $: style = colors.map(color => `--color-${color}: ${palette[color]};`).join('');

  $: propKeys = Object.keys($$props);
  $: block = propKeys.length > 1;
  $: inline = valueOnly || !block;
  $: semicolon = !valueOnly;
</script>

{#if valueOnly}
  <span class=inspect class:inline {style}>
    <Formatter
      depth={$$props.depth || depth}
      value={$$props.value}
    />
  </span>
{:else}
  {#each propKeys as key}
    <span class=inspect class:block class:inline class:semicolon {style}>
      <Property
        depth={depth}
        key={key}
        context={null}
        descriptor={Object.getOwnPropertyDescriptor($$props, key)}
        separator=" = "
      />
    </span>
  {/each}
{/if}

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
    --color-brown: darkgoldenrod;
    --color-pink: hotpink;
    --color-gray: #a0a0a0;
    --color-black: #202020;
    --color-white: #f0f0f0;

    --color-selection: lightskyblue;
  }
  .semicolon:after {
    content: ' ; ';
    margin-left: -1ex;
    pointer-events: none;
    color: var(--color-black);
  }
  .block {
    display: block;
  }
  .inline {
    display: inline;
  }
</style>
