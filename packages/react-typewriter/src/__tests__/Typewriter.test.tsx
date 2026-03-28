import { cleanup, render, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Typewriter, type TypewriterProps } from '../Typewriter';
import { typewriterBuilder } from '../actions';

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
const tickChars = async (n: number, cpm = 425) => {
  const interval = 60_000 / cpm;
  for (let i = 0; i < n; i++) {
    await act(async () => {
      vi.advanceTimersByTime(interval);
    });
  }
};

const flushInitialAction = async () => {
  await act(async () => {
    vi.advanceTimersByTime(0);
  });
};

describe('Typewriter', () => {
  describe('rendering', () => {
    it('renders with default underscore cursor', async () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions });

      await flushInitialAction();

      expect(getText()).toBe(UNDERSCORE_CURSOR);
    });

    it('renders with block cursor', async () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cursorType: 'block' });

      await flushInitialAction();

      expect(getText()).toBe(BLOCK_CURSOR);
    });

    it('renders with ibeam cursor', async () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cursorType: 'ibeam' });

      await flushInitialAction();

      expect(getText()).toBe(IBEAM_CURSOR);
    });

    it('prepends the prompt', async () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, prompt: '$ ' });

      await flushInitialAction();

      expect(getText()).toMatch(/^\$ /);
    });
  });

  describe('write action', () => {
    it('types text character by character', async () => {
      const actions = typewriterBuilder().write('abc').pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      await flushInitialAction();
      await tickChars(1, 600);
      expect(getText()).toBe(`a${UNDERSCORE_CURSOR}`);

      await tickChars(1, 600);
      expect(getText()).toBe(`ab${UNDERSCORE_CURSOR}`);

      await tickChars(1, 600);
      expect(getText()).toBe(`abc${UNDERSCORE_CURSOR}`);
    });

    it('writes text with prompt', async () => {
      const actions = typewriterBuilder().write('hi').pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, prompt: '> ', cpm: 600 });

      await flushInitialAction();
      await tickChars(2, 600);

      expect(getText()).toBe(`> hi${UNDERSCORE_CURSOR}`);
    });
  });

  describe('delete action', () => {
    it('deletes all text when no count specified', async () => {
      const actions = typewriterBuilder().write('abc').delete().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      // write 'abc'
      await flushInitialAction();
      await tickChars(3, 600);

      // the write-char tick that marks actionCompleted triggers the next major action
      await tickChars(1, 600);

      // delete completes when text is empty — dispatches delete-char 3 times + 1 completion
      await flushInitialAction();
      await tickChars(4, 600);

      expect(getText()).toBe(UNDERSCORE_CURSOR);
    });

    it('deletes a specific number of characters', async () => {
      const actions = typewriterBuilder().write('abcde').delete(2).pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      // write
      await flushInitialAction();
      await tickChars(5, 600);
      await tickChars(1, 600);

      // delete 2
      await flushInitialAction();
      await tickChars(3, 600);

      expect(getText()).toBe(`abc${UNDERSCORE_CURSOR}`);
    });
  });

  describe('cursor movement', () => {
    it('moves cursor backward and writes insert text at position', async () => {
      const actions = typewriterBuilder()
        .write('ac')
        .moveCursorBackward(1)
        .write('b')
        .pause(10_000)
        .buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      // write 'ac'
      await flushInitialAction();
      await tickChars(2, 600);
      await tickChars(1, 600);

      // move cursor back 1
      await flushInitialAction();
      await tickChars(2, 600);

      // write 'b' at cursor position (between a and c)
      await flushInitialAction();
      await tickChars(1, 600);
      await tickChars(1, 600);

      // the cursor should be after 'b', with 'c' following
      expect(getText()).toBe(`ab${UNDERSCORE_CURSOR}c`);
    });
  });

  describe('reset action', () => {
    it('clears all text', async () => {
      const actions = typewriterBuilder().write('hello').reset().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cpm: 600 });

      // write 'hello'
      await flushInitialAction();
      await tickChars(5, 600);
      await tickChars(1, 600);

      // reset
      await flushInitialAction();
      await tickChars(1, 600);

      expect(getText()).toBe(UNDERSCORE_CURSOR);
    });
  });

  describe('cursor blinking', () => {
    it('blinks the cursor when idle', async () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cursorBlinkFrequency: 2 });

      await flushInitialAction();

      const initial = getText();
      expect(initial).toBe(UNDERSCORE_CURSOR);

      // at 2 Hz, blink interval is 500ms
      await act(async () => {
        vi.advanceTimersByTime(500);
      });

      expect(getText()).toBe(NBSP);

      await act(async () => {
        vi.advanceTimersByTime(500);
      });

      expect(getText()).toBe(UNDERSCORE_CURSOR);
    });

    it('does not blink when cursorAnimation is none', async () => {
      const actions = typewriterBuilder().pause(10_000).buildActions();
      const { getText } = renderTypewriter({ actions, cursorAnimation: 'none', cursorBlinkFrequency: 2 });

      await flushInitialAction();

      expect(getText()).toBe(UNDERSCORE_CURSOR);

      await act(async () => {
        vi.advanceTimersByTime(2000);
      });

      // should still be active cursor, no blinking
      expect(getText()).toBe(UNDERSCORE_CURSOR);
    });
  });
});
