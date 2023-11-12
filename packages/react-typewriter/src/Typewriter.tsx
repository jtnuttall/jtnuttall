import { useInterval } from '@jtnuttall/shared/hooks';
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { TypewriterAction, TypewriterActionType } from './actions';

interface MoveCursorOnceAction {
  type: 'move-cursor-once';
}

interface WriteCharacterAction {
  type: 'write-char';
}

interface DeleteCharacterAction {
  type: 'delete-char';
}

type TypewriterInternalAction =
  | MoveCursorOnceAction
  | WriteCharacterAction
  | DeleteCharacterAction;

interface TypewriterState {
  text: string;
  writeIndex: number;
  moveDirection?: 'forward' | 'backward';
  color?: string;
  targetIndex: number;
  targetText?: string;
  actionCompleted: boolean;
}

const typewriterInitialState: TypewriterState = {
  text: '',
  writeIndex: 0,
  targetIndex: 0,
  actionCompleted: true,
};

const typewriterReducer = (
  state = typewriterInitialState,
  action: TypewriterAction | TypewriterInternalAction,
): TypewriterState => {
  switch (action.type) {
    case 'write': {
      const { text } = action;

      return {
        ...state,
        targetIndex: 0,
        targetText: text,
        actionCompleted: false,
      };
    }
    case 'delete': {
      const { text } = state;
      const { characters = text.length } = action;

      return {
        ...state,
        targetText: text.slice(0, -characters),
        actionCompleted: false,
      };
    }
    case 'move-cursor': {
      const { text, writeIndex } = state;
      const { by, direction } = action;

      const moveBy = direction === 'forward' ? by ?? text.length : by ?? 0;

      return {
        ...state,
        targetIndex: clamp(
          direction === 'forward' ? writeIndex + moveBy : writeIndex - moveBy,
          0,
          text.length - 1,
        ),
        actionCompleted: false,
        moveDirection: direction,
      };
    }
    case 'reset': {
      return {
        ...typewriterInitialState,
      };
    }
    case 'pause': {
      return {
        ...state,
        actionCompleted: true,
      };
    }
    case 'write-char': {
      const { text, targetText, writeIndex, targetIndex } = state;

      if (!targetText || targetIndex >= targetText.length) {
        return {
          ...state,
          actionCompleted: true,
        };
      }

      return {
        ...state,
        text:
          text.slice(0, writeIndex) +
          targetText[targetIndex] +
          text.slice(writeIndex, text.length),
        targetIndex: targetIndex + 1,
        writeIndex: writeIndex + 1,
      };
    }
    case 'delete-char': {
      const { text, targetText = '', writeIndex } = state;

      if (!text || targetText.length >= text.length) {
        return {
          ...state,
          actionCompleted: true,
        };
      }

      const deleteIndex = clamp(writeIndex - 1, 0, text.length);

      return {
        ...state,
        text:
          text.slice(0, deleteIndex) + text.slice(deleteIndex + 1, text.length),
        writeIndex: writeIndex - 1 > 0 ? writeIndex - 1 : 0,
      };
    }
    case 'move-cursor-once': {
      const { moveDirection, writeIndex, targetIndex } = state;

      const end =
        !moveDirection ||
        (moveDirection === 'forward'
          ? writeIndex > targetIndex
          : writeIndex <= targetIndex);

      if (end) {
        return {
          ...state,
          actionCompleted: true,
          moveDirection: undefined,
        };
      }

      return {
        ...state,
        writeIndex:
          moveDirection === 'forward' ? writeIndex + 1 : writeIndex - 1,
      };
    }
  }
};

const cpmToMillis = (cpm: number) => 60_000 / cpm;

const hzToMillis = (hz: number) => 1_000 / hz;

const internalActionsMap: Partial<
  Record<TypewriterActionType, TypewriterInternalAction>
> = {
  'move-cursor': {
    type: 'move-cursor-once',
  },
  write: {
    type: 'write-char',
  },
  delete: {
    type: 'delete-char',
  },
};

export type CursorType = 'block' | 'underscore' | 'ibeam';

const cursorMap: Record<
  CursorType,
  { cursorActive: string; cursorInactive: string }
> = {
  underscore: {
    cursorActive: '_',
    cursorInactive: '\u00A0',
  },
  block: {
    cursorActive: '\u2588',
    cursorInactive: '\u00A0',
  },
  ibeam: {
    cursorActive: '\u258F',
    cursorInactive: '\u00A0',
  },
};

export type TypewriterProps = {
  actions: TypewriterAction[];
  prompt?: string;
  cpm?: number;
  cursorAnimation?: 'always' | 'onWrite' | 'none';
  cursorBlinkFrequency?: number;
  cursorType?: CursorType;
  render: (text: string) => ReactNode;
};

const renderTypewriter = (
  cursor: string,
  { text, writeIndex }: TypewriterState,
): string =>
  text.slice(0, writeIndex) + cursor + text.slice(writeIndex, text.length);

/**
 * Component that mimicks a typewriter effect.
 *
 * Note that, strictly speaking, there is no extremely performant way to do this (in JS, at least),
 * since each character write/delete requires DOM manipulation (virtual DOM and text-only manipulation
 * should help, but not too much).
 *
 * Nonetheless, this is close to an optimal implementation in React, performing n operations for
 * each operation provided by the actions array, plus m operations for the number of characters in
 * each write or delete operation.
 *
 * On a high level, this happens in three steps:
 *
 * 1. On first render, initialize a pointer into the actions array and the necessary state to
 * operate the reducer.
 * 2. Fire the "major" action (i.e., publically available action) at the pointer location in the
 * actions array.
 * 3. If this action hasn't completed, fire an interval that dispatches the next "minor" (internal)
 * action until the reducer reports that the operation is complete.
 *
 * Repeat 2-3.
 *
 * This should minimize unnecessary rerenders and keep the memory usage very low (since the bulk of
 * reducer state transformation actions are purely transient)
 */
export const Typewriter: FC<TypewriterProps> = ({
  actions,
  prompt = '',
  cpm = 425,
  cursorAnimation = 'blink',
  cursorBlinkFrequency = 5,
  cursorType = 'underscore',
  render,
}) => {
  const cpmDelay = useMemo(() => cpmToMillis(cpm), [cpm]);
  const blinkDelay = useMemo(
    () => hzToMillis(cursorBlinkFrequency),
    [cursorBlinkFrequency],
  );
  const { cursorActive, cursorInactive } = useMemo(
    () => cursorMap[cursorType],
    [cursorType],
  );

  const [cursor, setCursor] = useState(cursorActive);

  const [actionPtr, setActionPtr] = useState(0);
  const [runInternal, setRunInternal] = useState(false);
  const internalActionRef = useRef<TypewriterInternalAction>();

  const [typewriterState, dispatch] = useReducer(
    typewriterReducer,
    typewriterInitialState,
  );

  const { actionCompleted } = typewriterState;

  useInterval(
    () => {
      const internalAction = internalActionRef.current;

      if (internalAction && !actionCompleted) {
        dispatch(internalAction);
      } else {
        setRunInternal(false);
      }
    },
    runInternal ? cpmDelay : undefined,
  );

  const setMajorAction = useCallback(() => {
    const action = actions[actionPtr];
    internalActionRef.current = internalActionsMap[action.type];

    return setTimeout(
      () => {
        dispatch(action);
        setRunInternal(true);
        setActionPtr((actionPtr + 1) % actions.length);
      },
      action.type === 'pause' ? action.milliseconds : 0,
    );
  }, [actionPtr, actions]);

  useEffect(() => {
    if (actionCompleted) {
      const id = setMajorAction();
      return () => clearTimeout(id);
    }
    return () => {};
  }, [actionCompleted, setMajorAction]);

  useInterval(
    () => {
      setCursor(cursor === cursorActive ? cursorInactive : cursorActive);
    },
    cursorAnimation !== 'none' && !runInternal ? blinkDelay : undefined,
  );

  useEffect(() => {
    if (runInternal && cursorAnimation !== 'always') {
      setCursor(cursorActive);
    }
  }, [runInternal, cursorActive, cursorAnimation]);

  return render(`${prompt}${renderTypewriter(cursor, typewriterState)}`);
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
