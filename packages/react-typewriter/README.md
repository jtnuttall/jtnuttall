# @jtnuttall/react-typewriter

A typewriter effect component for React. Renders text character-by-character with cursor animation, pauses, deletions, and cursor movement — driven by a declarative action sequence.

No dependencies beyond [tiny-invariant](https://github.com/alexreardon/tiny-invariant). Pauses automatically when the document is hidden.

## Install

```sh
pnpm add @jtnuttall/react-typewriter
```

## Usage

```tsx
import Typewriter, { typewriterBuilder } from '@jtnuttall/react-typewriter';

const actions = typewriterBuilder()
  .write('Hello, world.')
  .pause(500)
  .delete()
  .write('Goodbye, world.')
  .pause(2000)
  .delete()
  .buildActions();

function App() {
  return <Typewriter actions={actions} cpm={600} render={(text) => <pre>{text}</pre>} />;
}
```

The `render` prop receives the current text (including the cursor character) on every frame. You control how it's displayed.

## Builder

`typewriterBuilder()` returns a chainable builder. Call `.buildActions()` at the end to produce the actions array.

| Method                   | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `.write(text)`           | Type out `text` at the current cursor position.                         |
| `.delete(n?)`            | Delete `n` characters before the cursor. Omit `n` to delete everything. |
| `.pause(ms)`             | Wait `ms` milliseconds before the next action.                          |
| `.moveCursorForward(n?)` | Move the cursor forward `n` characters. Omit `n` to jump to end.        |
| `.moveCursorBackward(n)` | Move the cursor backward `n` characters.                                |
| `.reset()`               | Clear all text and reset the cursor to position 0.                      |

Actions loop indefinitely — after the last action completes, the sequence restarts from the beginning.

## Props

| Prop                   | Type                                 | Default        | Description                                                                                             |
| ---------------------- | ------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------- |
| `actions`              | `NonEmpty<TypewriterAction>`         | —              | Action sequence from the builder. Compared by reference; changing the reference restarts the animation. |
| `render`               | `(text: string) => ReactNode`        | —              | Render function. Called with the full text including cursor.                                            |
| `prompt`               | `string`                             | `''`           | Static text prepended to the output (not affected by typing).                                           |
| `cpm`                  | `number`                             | `425`          | Characters per minute. Controls typing and deletion speed.                                              |
| `paused`               | `boolean`                            | `false`        | Pause the animation.                                                                                    |
| `cursorType`           | `'underscore' \| 'block' \| 'ibeam'` | `'underscore'` | Cursor character style.                                                                                 |
| `cursorAnimation`      | `'always' \| 'onWrite' \| 'none'`    | `'onWrite'`    | When to animate the cursor blink. `'onWrite'` blinks only while idle.                                   |
| `cursorBlinkFrequency` | `number`                             | `5`            | Blink rate in Hz.                                                                                       |

## License

[Apache-2.0](../../LICENSE)
