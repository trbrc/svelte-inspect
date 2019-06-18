<script>
  import {configure} from './config.js';
  export let depth = 0;
  export let palette = {};
  $: configure({depth, palette});
</script>

<slot />
