<script>
  export let value;

  import InspectArray from '../types/Array.svelte';
  import InspectFallback from '../types/Fallback.svelte';

  let component = InspectFallback;

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      component = InspectArray;
    }
  }
</script>

<svelte:component this={component} {value} />
