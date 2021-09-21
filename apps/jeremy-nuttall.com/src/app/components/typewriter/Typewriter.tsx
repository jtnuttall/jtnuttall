import {
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { Typography, TypographyVariant } from '@mui/material';
import useInterval from '../../hooks/useInterval';
import { TypewriterAction, TypewriterActions } from './types';

export { TypewriterActions, TypewriterAction };

const enum TypewriterInternalAction {
  WriteCharacter = 'typewriter/internal/write-char',
  DeleteCharacter = 'typewriter/internal/delete-char',
}

type TypewriterInternalActionData<
  T extends TypewriterAction | TypewriterInternalAction,
> = {
  type: T;
};

type WriteCharacterAction =
  TypewriterInternalActionData<TypewriterInternalAction.WriteCharacter>;

type DeleteCharacterAction =
  TypewriterInternalActionData<TypewriterInternalAction.DeleteCharacter>;

type TypewriterInternalActions = WriteCharacterAction | DeleteCharacterAction;

type TypewriterCombinedActions = TypewriterActions | TypewriterInternalActions;

type TypewriterState = {
  text: string;
  color?: string;
  targetIndex: number;
  targetText?: string;
  actionCompleted: boolean;
};

const typewriterInitialState: TypewriterState = {
  text: '',
  targetIndex: 0,
  actionCompleted: true,
};

const typewriterReducer = (
  state = typewriterInitialState,
  action: TypewriterCombinedActions,
): TypewriterState => {
  switch (action.type) {
    case TypewriterAction.Write: {
      const { text, color } = action;

      return {
        ...state,
        color,
        targetIndex: 0,
        targetText: text,
        actionCompleted: false,
      };
    }
    case TypewriterAction.Delete: {
      const { text } = state;
      const { characters = text.length } = action;

      return {
        ...state,
        targetText: text.slice(0, -characters),
        actionCompleted: false,
      };
    }
    case TypewriterAction.Reset: {
      return {
        ...typewriterInitialState,
      };
    }
    case TypewriterInternalAction.WriteCharacter: {
      const { text, targetText, targetIndex } = state;

      if (!targetText || targetIndex >= targetText.length) {
        return {
          ...state,
          actionCompleted: true,
        };
      }

      return {
        ...state,
        text: text + targetText[targetIndex],
        targetIndex: targetIndex + 1,
      };
    }
    case TypewriterInternalAction.DeleteCharacter: {
      const { text, targetText = '' } = state;

      if (!text || targetText.length > text.length) {
        return {
          ...state,
          actionCompleted: true,
        };
      }

      return {
        ...state,
        text: text.slice(0, -1),
      };
    }
    default: {
      return {
        ...state,
        actionCompleted: true,
      };
    }
  }
};

const cpmToMillis = (cpm: number) => 60_000 / cpm;

const hzToMillis = (hz: number) => 1_000 / hz;

const internalActionsMap: {
  [key in TypewriterAction & string]?: TypewriterInternalActions;
} = {
  [TypewriterAction.Write]: { type: TypewriterInternalAction.WriteCharacter },
  [TypewriterAction.Delete]: { type: TypewriterInternalAction.DeleteCharacter },
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

type TypewriterProps = {
  actions: TypewriterActions[];
  prompt?: string;
  cpm?: number;
  cursorAnimation?: 'always' | 'onWrite' | 'none';
  cursorBlinkFrequency?: number;
  cursorType?: CursorType;
  variant?: TypographyVariant;
  fontFamily?: string;
};

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
const Typewriter = (props: TypewriterProps): JSX.Element => {
  const {
    actions,
    prompt = '',
    cpm = 425,
    cursorAnimation = 'blink',
    cursorBlinkFrequency = 5,
    cursorType = 'underscore',
    variant = 'h4',
    fontFamily,
  } = props;

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
  const internalActionRef = useRef<TypewriterInternalActions>();

  const [typewriterState, dispatch] = useReducer(
    typewriterReducer,
    typewriterInitialState,
  );

  const { actionCompleted, color, text } = typewriterState;

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
      action.type === TypewriterAction.Pause ? action.milliseconds : 0,
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

  return (
    <Typography variant={variant} color={color} fontFamily={fontFamily}>
      {prompt}
      {text}
      {cursor}
    </Typography>
  );
};

export default Typewriter;
