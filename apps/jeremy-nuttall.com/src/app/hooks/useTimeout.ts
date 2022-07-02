import { useEffect, useRef } from 'react';

const useTimeout = (callback: () => void, delay?: number) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const tick = () => {
      savedCallback.current?.();
    };

    if (delay) {
      const id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }

    return () => {};
  }, [delay]);
};

export default useTimeout;
