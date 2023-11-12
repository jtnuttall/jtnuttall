import { MutableRefObject, useEffect, useState } from 'react';

type UseScrollReturn = {
  xOffset: number | null;
  yOffset: number | null;
};

const useScroll = (
  targetElement: Window | Document | MutableRefObject<HTMLElement | null>,
): UseScrollReturn => {
  const target =
    'current' in targetElement ? targetElement.current : targetElement;

  const [xOffset, setXOffset] = useState<number | null>(null);
  const [yOffset, setYOffset] = useState<number | null>(null);

  const handleScroll = () => {
    setYOffset(window.scrollY);
    setXOffset(window.scrollX);
  };

  useEffect(() => {
    target?.addEventListener('scroll', handleScroll);

    return () => {
      target?.removeEventListener('scroll', handleScroll);
    };
  }, [target]);

  return {
    xOffset,
    yOffset,
  };
};

export default useScroll;
