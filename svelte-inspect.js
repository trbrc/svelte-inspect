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

SvelteInspect.configure = configure;

for (let i = 0; i <= 10; i++) {
  SvelteInspect[i] = configure({depth: i});
}

export default SvelteInspect;

export {configure};
