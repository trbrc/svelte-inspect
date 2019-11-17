import SvelteInspect from './inspect/Inspect.svelte';

function configure(configuration) {
  return class ConfiguredInspect extends SvelteInspect {
    constructor(options) {
      const props = options.props || {};
      super({
        ...options,
        props: {
          ...props,
          [Symbol.for('configuration')]: configuration
        }
      });
    }
  };
};

const invertedPalette = {
  red: 'red',
  blue: 'dodgerblue',
  green: 'yellowgreen',
  purple: 'violet',
  gray: '#808080',
  black: '#d0d0d0',
  white: '#202020',
  selection: 'darkblue'
};

const Inverted = configure({
  palette: invertedPalette
});

const Value = configure({
  valueOnly: true
});

SvelteInspect.configure = configure;
SvelteInspect.Inverted = Inverted;
SvelteInspect.Value = Value;

for (let i = 0; i <= 10; i++) {
  SvelteInspect[i] = configure({depth: i});
  SvelteInspect.Inverted[i] = configure({depth: i, palette: invertedPalette});
}

export default SvelteInspect;

export {configure, Inverted, Value};
