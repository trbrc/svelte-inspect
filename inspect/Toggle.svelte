<script>
  import {target, focusPrev, focusNext, exitFocusScope, enterFocusScope} from './focus-actions.js';

  export let value;

  let isOpen = false;
  let toggle = (bool = !isOpen) => {isOpen = bool};

  const onKeyDown = keydownEvent => {
    let shouldPreventDefault = true;
    switch (keydownEvent.code) {
      case 'Space': {
        toggle();
        break;
      }
      case 'ArrowUp': {
        focusPrev();
        break;
      }
      case 'ArrowDown': {
        focusNext();
        break;
      }
      case 'Escape': {
        exitFocusScope();
        break;
      }
      case 'ArrowLeft': {
        if (isOpen) {
          toggle(false);
        } else {
          exitFocusScope();
        }
        break;
      }
      case 'Enter':
      case 'ArrowRight': {
        if (!isOpen) {
          toggle(true);
        } else {
          enterFocusScope();
        }
        break;
      }
      default: {
        shouldPreventDefault = false;
      }
    }
    if (shouldPreventDefault) {
      keydownEvent.preventDefault();
    }
  };

  import PropertyList from './PropertyList.svelte';
</script>

<button
  use:target
  on:click={event => {
    toggle();
    console.log(event.target);
    event.target.focus();
    console.log(document.activeElement);
  }}
  on:keydown={onKeyDown}
  class=prefix
>
  <slot name=prefix/>
</button>
{#if isOpen}
  <PropertyList
    {value}
  >
    <div class=empty>&nbsp;&nbsp;No properties</div>
  </PropertyList>
{/if}<slot name=suffix />

<style>
  .prefix {
    all: initial;
    font: inherit;
    cursor: pointer;
  }
  .prefix:focus {
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 5px;
  }
  .empty {
    color: var(--color-gray);
    font-style: italic;
  }
</style>
