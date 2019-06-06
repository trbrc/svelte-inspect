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
  import {onTick} from './utilities.js';
  import {target, focusPrev, focusNext, exitFocusScope, enterFocusScope, focusBySearch} from './focus-actions.js';

  export let className = '';
  export let value;
  export let isOpen = false;
  const toggle = (bool = !isOpen) => {isOpen = bool};

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
          onTick(enterFocusScope);
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

  let button;

  import PropertyList from './PropertyList.svelte';
</script>

<button
  bind:this={button}
  use:target
  on:click={event => {
    if (event.detail === 1) {
      toggle();
      onTick(() => button.focus());
    } else if (isOpen && event.detail === 2) {
      enterFocusScope();
    }
  }}
  on:keydown={onKeyDown}
  class:toggle={true}
  class={className}
>
  <slot />
</button>

<style>
  .toggle {
    all: initial;
    font: inherit;
    cursor: pointer;
  }
  .toggle:focus {
    outline: -webkit-focus-ring-color 5px auto;
  }
</style>
