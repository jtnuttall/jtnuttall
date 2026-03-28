import invariant from 'tiny-invariant';

export interface MoveCursorAction {
  type: 'move-cursor';
  by?: number;
  direction: 'forward' | 'backward';
}

export interface WriteAction {
  type: 'write';
  text: string;
}

export interface PauseAction {
  type: 'pause';
  milliseconds: number;
}

export interface DeleteAction {
  type: 'delete';
  characters?: number;
}

export interface ResetAction {
  type: 'reset';
}

export type TypewriterAction = WriteAction | PauseAction | MoveCursorAction | DeleteAction | ResetAction;

export type TypewriterActionType = TypewriterAction['type'];

export type NonEmpty<T> = readonly [T, ...T[]];

class TypewriterBuilder {
  private readonly actions: TypewriterAction[] = [];

  moveCursorForward(by?: number) {
    this.actions.push({
      type: 'move-cursor',
      by,
      direction: 'forward',
    });
    return this;
  }

  moveCursorBackward(by: number) {
    this.actions.push({
      type: 'move-cursor',
      by,
      direction: 'backward',
    });
    return this;
  }

  write(text: string) {
    this.actions.push({
      type: 'write',
      text,
    });
    return this;
  }

  pause(milliseconds: number) {
    this.actions.push({
      type: 'pause',
      milliseconds,
    });
    return this;
  }

  /**
   * Deletes characters from the end of the current text.
   * With no argument, deletes all characters.
   */
  delete(characters?: number) {
    this.actions.push({
      type: 'delete',
      characters,
    });
    return this;
  }

  reset() {
    this.actions.push({
      type: 'reset',
    });
    return this;
  }

  buildActions(): NonEmpty<TypewriterAction> {
    const [first, ...rest] = this.actions;
    invariant(first, 'TypewriterBuilder: must have at least one action');
    return [first, ...rest];
  }
}

export const typewriterBuilder = () => new TypewriterBuilder();
