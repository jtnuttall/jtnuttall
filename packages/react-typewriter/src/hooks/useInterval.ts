import { useRef, useEffect, useSyncExternalStore } from 'react';
import invariant from 'tiny-invariant';

const subscribe = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback);
  return () => {
    document.removeEventListener('visibilitychange', callback);
  };
};

const getSnapshot = () => document.visibilityState === 'visible';
const getServerSnapshot = () => true;

const useDocumentVisible = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

const useInterval = (callback: () => void, delay?: number): void => {
  invariant(delay === undefined || delay > 0, 'useInterval: delay must be > 0 or undefined');

  const savedCallback = useRef<(() => void) | undefined>(undefined);
  const visible = useDocumentVisible();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current?.();
    };

    if (delay && visible) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay, visible]);
};

export default useInterval;
