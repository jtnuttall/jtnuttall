export const enum TypewriterAction {
  Write = 'typewriter/write',
  Pause = 'typewriter/pause',
  Delete = 'typewriter/delete',
  Reset = 'typewriter/reset',
}

export type TypewriterActionData<T extends TypewriterAction> = {
  type: T;
};

export type WriteAction = TypewriterActionData<TypewriterAction.Write> & {
  text: string;
  color?: string;
};

export type PauseAction = TypewriterActionData<TypewriterAction.Pause> & {
  milliseconds: number;
};

export type DeleteAction = TypewriterActionData<TypewriterAction.Delete> & {
  characters?: number;
};

export type ResetAction = TypewriterActionData<TypewriterAction.Reset>;

export type TypewriterActions =
  | WriteAction
  | PauseAction
  | DeleteAction
  | ResetAction;
