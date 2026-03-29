import { cleanup, render, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { typewriterBuilder } from '../actions';
import { Typewriter, type TypewriterProps } from '../Typewriter';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  cleanup();
});

const UNDERSCORE_CURSOR = '_';
const BLOCK_CURSOR = '\u2588';
const IBEAM_CURSOR = '\u258F';
const NBSP = '\u00A0';

const renderTypewriter = (props: Partial<TypewriterProps> & { actions: TypewriterProps['actions'] }) => {
  let lastText = '';
  const result = render(
    <Typewriter
      render={(text) => {
        lastText = text;
        return <span data-testid="output">{text}</span>;
      }}
      {...props}
    />,
  );
  return {
    ...result,
    getText: () => lastText,
  };
};

/**
 * Advance past the initial setTimeout(0) that dispatches the first major action,
 * then tick the interval n times for character-level operations.
 */
const tickChars = (n: number, cpm = 425) => {
  const interval = 60_000 / cpm;
  for (let i = 0; i < n; i++) {
    act(() => {
      vi.advanceTimersByTime(interval);
    });
  }
};

const flushInitialAction = () => {
  act(() => {
    vi.advanceTimersByTime(0);
  });
};

describe('Typewriter', () => {
  describe('rendering', () => {
    it('renders with default underscore cursor', () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions });

      flushInitialAction();

      expect(getText()).toBe(UNDERSCORE_CURSOR);
    });

    it('renders with block cursor', () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cursorType: 'block' });

      flushInitialAction();

      expect(getText()).toBe(BLOCK_CURSOR);
    });

    it('renders with ibeam cursor', () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cursorType: 'ibeam' });

      flushInitialAction();

      expect(getText()).toBe(IBEAM_CURSOR);
    });

    it('prepends the prompt', () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, prompt: '$ ' });

      flushInitialAction();

      expect(getText()).toMatch(/^\$ /);
    });
  });

  describe('write action', () => {
    it('types text character by character', () => {
      const actions = typewriterBuilder().write('abc').pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      flushInitialAction();
      tickChars(1, 600);
      expect(getText()).toBe(`a${UNDERSCORE_CURSOR}`);

      tickChars(1, 600);
      expect(getText()).toBe(`ab${UNDERSCORE_CURSOR}`);

      tickChars(1, 600);
      expect(getText()).toBe(`abc${UNDERSCORE_CURSOR}`);
    });

    it('writes text with prompt', () => {
      const actions = typewriterBuilder().write('hi').pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, prompt: '> ', cpm: 600 });

      flushInitialAction();
      tickChars(2, 600);

      expect(getText()).toBe(`> hi${UNDERSCORE_CURSOR}`);
    });
  });

  describe('delete action', () => {
    it('deletes all text when no count specified', () => {
      const actions = typewriterBuilder().write('abc').delete().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      // write 'abc'
      flushInitialAction();
      tickChars(3, 600);

      // the write-char tick that marks actionCompleted triggers the next major action
      tickChars(1, 600);

      // delete completes when text is empty — dispatches delete-char 3 times + 1 completion
      flushInitialAction();
      tickChars(4, 600);

      expect(getText()).toBe(UNDERSCORE_CURSOR);
    });

    it('deletes a specific number of characters', () => {
      const actions = typewriterBuilder().write('abcde').delete(2).pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      // write
      flushInitialAction();
      tickChars(5, 600);
      tickChars(1, 600);

      // delete 2
      flushInitialAction();
      tickChars(3, 600);

      expect(getText()).toBe(`abc${UNDERSCORE_CURSOR}`);
    });
  });

  describe('cursor movement', () => {
    it('moves cursor backward and writes insert text at position', () => {
      const actions = typewriterBuilder().write('ac').moveCursorBackward(1).write('b').pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      // write 'ac'
      flushInitialAction();
      tickChars(2, 600);
      tickChars(1, 600);

      // move cursor back 1
      flushInitialAction();
      tickChars(2, 600);

      // write 'b' at cursor position (between a and c)
      flushInitialAction();
      tickChars(1, 600);
      tickChars(1, 600);

      // the cursor should be after 'b', with 'c' following
      expect(getText()).toBe(`ab${UNDERSCORE_CURSOR}c`);
    });
  });

  describe('reset action', () => {
    it('clears all text', () => {
      const actions = typewriterBuilder().write('hello').reset().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      // write 'hello'
      flushInitialAction();
      tickChars(5, 600);
      tickChars(1, 600);

      // reset
      flushInitialAction();
      tickChars(1, 600);

      expect(getText()).toBe(UNDERSCORE_CURSOR);
    });
  });

  describe('cursor blinking', () => {
    it('blinks the cursor when idle', () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cursorBlinkFrequency: 2 });

      flushInitialAction();

      const initial = getText();
      expect(initial).toBe(UNDERSCORE_CURSOR);

      // at 2 Hz, blink interval is 500ms
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(getText()).toBe(NBSP);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(getText()).toBe(UNDERSCORE_CURSOR);
    });

    it('does not blink when cursorAnimation is none', () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cursorAnimation: 'none', cursorBlinkFrequency: 2 });

      flushInitialAction();

      expect(getText()).toBe(UNDERSCORE_CURSOR);

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // should still be active cursor, no blinking
      expect(getText()).toBe(UNDERSCORE_CURSOR);
    });
  });

  describe('action looping', () => {
    it('loops back to the first action after completing all actions', () => {
      const actions = typewriterBuilder().write('ab').delete().buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      // first pass: write 'ab'
      flushInitialAction();
      tickChars(2, 600);
      tickChars(1, 600);

      // first pass: delete all
      flushInitialAction();
      tickChars(3, 600);

      // actionPtr has wrapped to 0 — the write action fires again
      flushInitialAction();
      tickChars(1, 600);

      // first character of the second loop's write
      expect(getText()).toBe(`a${UNDERSCORE_CURSOR}`);
    });
  });

  describe('pause action', () => {
    it('waits the specified duration before advancing', () => {
      const actions = typewriterBuilder().pause(500).write('x').pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      // pause dispatches immediately with a setTimeout of 500ms
      flushInitialAction();

      // before the pause elapses, still just cursor
      expect(getText()).toBe(UNDERSCORE_CURSOR);

      // advance past the pause
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // write 'x'
      flushInitialAction();
      tickChars(1, 600);

      expect(getText()).toBe(`x${UNDERSCORE_CURSOR}`);
    });
  });

  describe('paused prop', () => {
    it('freezes the typewriter when paused', () => {
      const actions = typewriterBuilder().write('abc').pause(10_000).buildActions();
      const { getText, rerender } = renderTypewriter({ actions, cpm: 600 });

      // write one character
      flushInitialAction();
      tickChars(1, 600);
      expect(getText()).toBe(`a${UNDERSCORE_CURSOR}`);

      // pause the typewriter
      rerender(<Typewriter actions={actions} cpm={600} paused={true} render={(text) => <span>{text}</span>} />);

      // advance time — nothing should change
      tickChars(5, 600);
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // re-capture text after rerender
      let pausedText = '';
      rerender(
        <Typewriter
          actions={actions}
          cpm={600}
          paused={true}
          render={(text) => {
            pausedText = text;
            return <span>{text}</span>;
          }}
        />,
      );

      // text should still have only 'a'
      expect(pausedText).toContain('a');
      expect(pausedText).not.toContain('b');
    });
  });

  describe('moveCursorForward', () => {
    it('moves cursor forward to end when no count specified', () => {
      const actions = typewriterBuilder()
        .write('abc')
        .moveCursorBackward(3)
        .moveCursorForward()
        .delete(1)
        .pause(10_000)
        .buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      // write 'abc'
      flushInitialAction();
      tickChars(3, 600);
      tickChars(1, 600);

      // move cursor back 3 (to position 0)
      flushInitialAction();
      tickChars(4, 600);

      // move cursor forward to end (no count = move to end)
      flushInitialAction();
      tickChars(4, 600);

      // delete 1 from end
      flushInitialAction();
      tickChars(2, 600);

      expect(getText()).toBe(`ab${UNDERSCORE_CURSOR}`);
    });
  });
});
