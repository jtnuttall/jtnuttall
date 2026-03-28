import { describe, expect, it } from 'vitest';

import { typewriterBuilder } from '../actions';

describe('TypewriterBuilder', () => {
  it('builds a write action', () => {
    const actions = typewriterBuilder().write('hello').buildActions();

    expect(actions).toEqual([{ type: 'write', text: 'hello' }]);
  });

  it('builds a pause action', () => {
    const actions = typewriterBuilder().pause(500).buildActions();

    expect(actions).toEqual([{ type: 'pause', milliseconds: 500 }]);
  });

  it('builds a delete-all action when called with no arguments', () => {
    const actions = typewriterBuilder().delete().buildActions();

    expect(actions).toEqual([{ type: 'delete', characters: undefined }]);
  });

  it('builds a no-op delete action when called with 0', () => {
    const actions = typewriterBuilder().delete(0).buildActions();

    expect(actions).toEqual([{ type: 'delete', characters: 0 }]);
  });

  it('builds a partial delete action', () => {
    const actions = typewriterBuilder().delete(5).buildActions();

    expect(actions).toEqual([{ type: 'delete', characters: 5 }]);
  });

  it('builds a move-cursor-forward action', () => {
    const actions = typewriterBuilder().moveCursorForward(3).buildActions();

    expect(actions).toEqual([{ type: 'move-cursor', direction: 'forward', by: 3 }]);
  });

  it('builds a move-cursor-forward action without explicit count', () => {
    const actions = typewriterBuilder().moveCursorForward().buildActions();

    expect(actions).toEqual([{ type: 'move-cursor', direction: 'forward', by: undefined }]);
  });

  it('builds a move-cursor-backward action', () => {
    const actions = typewriterBuilder().moveCursorBackward(2).buildActions();

    expect(actions).toEqual([{ type: 'move-cursor', direction: 'backward', by: 2 }]);
  });

  it('builds a reset action', () => {
    const actions = typewriterBuilder().reset().buildActions();

    expect(actions).toEqual([{ type: 'reset' }]);
  });

  it('chains multiple actions in order', () => {
    const actions = typewriterBuilder()
      .write('hello')
      .pause(100)
      .delete(3)
      .write('world')
      .buildActions();

    expect(actions).toEqual([
      { type: 'write', text: 'hello' },
      { type: 'pause', milliseconds: 100 },
      { type: 'delete', characters: 3 },
      { type: 'write', text: 'world' },
    ]);
  });

  it('produces independent action arrays per builder instance', () => {
    const a = typewriterBuilder().write('a').buildActions();
    const b = typewriterBuilder().write('b').buildActions();

    expect(a).toEqual([{ type: 'write', text: 'a' }]);
    expect(b).toEqual([{ type: 'write', text: 'b' }]);
  });
});
