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

export type TypewriterAction =
  | WriteAction
  | PauseAction
  | MoveCursorAction
  | DeleteAction
  | ResetAction;

export type TypewriterActionType = TypewriterAction['type'];

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

  moveCursorBackward(by?: number) {
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
   * Deletes all characters if number is undefined or <= 0
   *
   * @param characters
   */
  delete(characters = 0) {
    this.actions.push({
      type: 'delete',
      characters: characters > 0 ? characters : undefined,
    });
    return this;
  }

  reset() {
    this.actions.push({
      type: 'reset',
    });
    return this;
  }

  buildActions() {
    return this.actions;
  }
}

export const typewriterBuilder = () => new TypewriterBuilder();
