import {setContext, getContext} from 'svelte';

export const configKey = Symbol.for('svelte-inspect/config');

export const configure = configurator => {
  let configuration;
  if (typeof configurator === 'function') {
    const returnValue = configurator(newConfiguration => {
      configuration = newConfiguration;
    });
    if (!configuration) {
      configuration = returnValue;
    }
  } else {
    configuration = configurator;
  }
  setContext(configKey, () => configuration);
};

const fallback = () => ({
  depth: 0,
  palette: {}
});

export const configuration = () => {
  return getContext(configKey) || fallback;
};
