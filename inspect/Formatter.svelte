<script>
  export let depth = 0;
  export let value;

  import * as NilFormatter from './formatters/NilFormatter.svelte';
  import * as BooleanFormatter from './formatters/BooleanFormatter.svelte';
  import * as SymbolFormatter from './formatters/SymbolFormatter.svelte';
  import * as NumberFormatter from './formatters/NumberFormatter.svelte';
  import * as BigIntFormatter from './formatters/BigIntFormatter.svelte';
  import * as StringFormatter from './formatters/StringFormatter.svelte';
  import * as FunctionFormatter from './formatters/FunctionFormatter.svelte';
  import * as RegExpFormatter from './formatters/RegExpFormatter.svelte';
  import * as DateFormatter from './formatters/DateFormatter.svelte';
  import * as ErrorFormatter from './formatters/ErrorFormatter.svelte';
  import * as ArrayFormatter from './formatters/ArrayFormatter.svelte';
  import * as TypedArrayFormatter from './formatters/TypedArrayFormatter.svelte';
  import * as ElementFormatter from './formatters/ElementFormatter.svelte';
  import * as MapFormatter from './formatters/MapFormatter.svelte';
  import * as SetFormatter from './formatters/SetFormatter.svelte';
  import * as ObjectFormatter from './formatters/ObjectFormatter.svelte';
  import * as FallbackFormatter from './formatters/FallbackFormatter.svelte';

  const formatterModules = [
    NilFormatter,
    BooleanFormatter,
    SymbolFormatter,
    NumberFormatter,
    BigIntFormatter,
    StringFormatter,
    FunctionFormatter,
    RegExpFormatter,
    DateFormatter,
    ErrorFormatter,
    ArrayFormatter,
    TypedArrayFormatter,
    ElementFormatter,
    MapFormatter,
    SetFormatter,
    ObjectFormatter,
    FallbackFormatter,
  ];

  let component;
  let spread = {};

  $: valueTypeOf = typeof value;
  $: valuePrototype = value ? Object.getPrototypeOf(value) : undefined;

  $: for (const formatterModule of formatterModules) {
    let match = false;
    if (formatterModule.check) {
      match = formatterModule.check(value);
    } else if (formatterModule.typeOf) {
      match = valueTypeOf === formatterModule.typeOf;
    } else if (formatterModule.type) {
      match = valuePrototype === formatterModule.type.prototype;
    }
    if (match) {
      component = formatterModule.default;
      if (formatterModule.hasDepthProp) {
        spread = {depth};
      }
      break;
    }
  }
</script>

<svelte:component this={component} {value} {...spread}><slot /></svelte:component>
