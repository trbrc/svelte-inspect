<script>
  import Property from './Property.svelte';

  const getConfiguration = props => {
    const userConfiguration = props[Symbol.for('configuration')] || {};
    return {
      depth: 0,
      palette: {},
      ...userConfiguration
    };
  };

  let {depth, palette} = getConfiguration($$props);

  $: colors = Object.keys(palette);
  $: style = colors.map(color => `--color-${color}: ${palette[color]};`).join('');

  $: propKeys = Object.keys($$props);
  $: block = propKeys.length > 1;
  $: inline = !block;
</script>

{#each propKeys as key}
  <span class=inspect class:block class:inline {style}>
    <Property
      depth={depth}
      key={key}
      context={null}
      descriptor={Object.getOwnPropertyDescriptor($$props, key)}
      separator=" = "
    />
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
    --color-brown: darkgoldenrod;
    --color-pink: hotpink;
    --color-gray: gray;
    --color-black: #222222;
    --color-white: whitesmoke;

    --color-selection: lightskyblue;
  }
  .inspect:after {
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
