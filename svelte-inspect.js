import SvelteInspect from './inspect/Inspect.svelte';

function configure(configuration) {
  return class ConfiguratedInspect extends SvelteInspect {
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

export default SvelteInspect;

export {configure};
