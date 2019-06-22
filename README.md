# Svelte Inspect

Live & interactive object inspector for [Svelte](https://svelte.dev), inspired by DevTools.

```console
npm install --save svelte-inspect
```

In your `.svelte` file:

```html
<script>
  import Todos from './Todos.svelte';

  // You have some data you want to inspect
  let todos = [
    {done: false, text: 'Import svelte-inspect'},
    {done: false, text: 'Pass any number of values to it'},
    {done: false, text: 'See them update live'}
  ];

  // Simply import svelte-inspect…
  import Inspect from 'svelte-inspect';
</script>

<Todos bind:todos={todos} />

<!-- …and add an inspector anywhere on your page -->
<Inspect {todos} />
```

Try the example at [svelte.dev/repl](https://svelte.dev/repl/eb3b3ae5639544d78d7363e126b29896). Use mouse and keyboard to inspect the todos.

## Types

These types have special formatting:

- Arrays (including TypedArrays)
- Objects
- Functions (including async functions)
- Classes
- RegExps
- Dates
- Booleans
- undefined and null
- Numbers (including BigInt)
- Strings
- Symbols
- Errors
- HTML elements

There's support for enumerable and non-enumerable properties, symbol keys, `__proto__`, and getters (click to evaluate). It does not yet have any special support for e.g. iterators, promises.

## Keyboard navigation

You can use your keyboard to move around in the object hierarchy.

Keys | | Action
:--- | :--- | :---
<kbd>⇥</kbd> | Tab | Focus next
<kbd>⇧</kbd><kbd>⇥</kbd> | Shift + Tab | Focus previous
<kbd>⯇</kbd> | Left | Close or step out
<kbd>⯈</kbd> | Right | Open or step in
<kbd>⯅</kbd> | Up | Focus previous
<kbd>⯆</kbd> | Down | Focus next
<kbd>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</kbd> | Space | Toggle
<kbd>↵</kbd> | Enter | Open & step in
<kbd>esc</kbd> | Escape | Step out
<kbd>A</kbd>…<kbd>Z</kbd> <kbd>0</kbd>…<kbd>9</kbd> | Type anything | Jump using fuzzy matching

## API

### `Inspect`

Create one inspector for every value passed in as a prop, with default colors.

```html
<script>
  import Inspect from 'svelte-inspect';
</script>

<Inspect value={'foo'} {value2} {...etc} />
```

### `Inspect.Inverted`

Inspector with color palette suitable for dark backgrounds.

```html
<script>
  import Inspect from 'svelte-inspect';
</script>

<Inspect.Inverted value={'foo'} {value2} {...etc} />
```

### `Inspect[0-10]`

Inspectors pre-configured with `{depth: 0-10}`.

```html
<script>
  import Inspect from 'svelte-inspect';
</script>

<Inspect[2] {document} />
```

### `Inspect.configure(configuration)`

Create an inspect component with custom configuration.

```html
<script context="module">
  import Inspect from 'svelte-inspect';
  const CustomInspect = Inspect.configure({/* configuration */});

  /* You can also use a named import:
  import {configure} from 'svelte-inspect';
  const CustomInspect = configure({/* configuration */});
  */
</script>

<CustomInspect value={'foo'} />
```

Note the use of [`context="module"`](https://svelte.dev/docs#script_context_module), which is required for the Svelte compiler to understand that `CustomInspector` can be used in the template.

The config is WIP. There are currently two options:

#### `{depth: number}`

Set how many levels of the object hierarchy should start in the open state. Defaults to `1`.

```html
<script context="module">
  import Inspect from 'svelte-inspect';
  const CustomInspect = Inspect.configure({depth: 2});
  const object = {
    foo: {
      array: [1, 2, 3]
    }
  };
</script>

<!-- 2 levels deep – will show `foo` and `array` but not `[1, 2, 3]` -->
<CustomInspect {object} />
```

Non-enumerable properties will not be opened.

#### `{palette: {...colors}}`

Create a component with a customized color palette. Values are any valid CSS color, keys are `red`, `blue`, `green`, `purple`, `orange`, `yellow`, `brown`, `pink`, `gray`, `black`, `white` and `selection` (note that not all of these colors are currently used).

*(work in progress; expect to change)*

```html
<script context="module">
  import Inspect from 'svelte-inspect';
  const CustomInspect = Inspect.configure({
    palette: {
      selection: 'hotpink',
      blue: 'dodgerblue'
    }
  });
</script>
```
