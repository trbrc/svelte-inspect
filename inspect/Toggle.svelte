<script context=module>
  let typingBuffer = '';
  let hasSearchBufferTimeout = false;
  let clearBufferTimeout;
  function type(char) {
    typingBuffer += char;
    if (!hasSearchBufferTimeout) {
      hasSearchBufferTimeout = true;
      setTimeout(() => {
        hasSearchBufferTimeout = false;
        focusBySearch(typingBuffer);
      }, 100);
    }
    clearTimeout(clearBufferTimeout);
    clearBufferTimeout = setTimeout(() => {
      typingBuffer = '';
    }, 600);
  }
</script>

<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  import {onTick} from './utilities.js';
  import {target, focusPrev, focusNext, exitFocusScope, enterFocusScope, focusBySearch} from './focus-actions.js';

  export let className = '';
  export let isOpen = false;
  const toggle = (bool = !isOpen) => {
    isOpen = bool;
    dispatch('open', bool);
  };

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
      case 'Enter': {
        if (!isOpen) {
          toggle(true);
          focusPrev();
          onTick(focusNext).then(enterFocusScope);
        } else {
          const didFocus = enterFocusScope();
          if (!didFocus) {
            toggle(false);
          }
        }
        break;
      }
      case 'ArrowRight': {
        if (!isOpen) {
          toggle(true);
        } else {
          enterFocusScope();
        }
        break;
      }
      default: {
        if (keydownEvent.key.length === 1) {
          type(keydownEvent.key);
        }
        shouldPreventDefault = false;
      }
    }
    if (shouldPreventDefault) {
      keydownEvent.preventDefault();
    }
  };

  import PropertyList from './PropertyList.svelte';
</script>

<span
  role=button
  use:target
  on:click={event => {
    if (event.detail === 1) {
      toggle();
    } else if (isOpen && event.detail === 2) {
      enterFocusScope();
    }
  }}
  on:keydown={onKeyDown}
  class:toggle={true}
  class={className}
>
  <slot />
</span>

<style>
  .toggle {
    cursor: pointer;
  }
  .toggle:focus {
    outline-color: var(--color-selection);
    box-shadow:
      inset 0 0 0 1em var(--color-selection),
      0 0 0 2px var(--color-selection);
    border-radius: 1px;
  }
</style>
