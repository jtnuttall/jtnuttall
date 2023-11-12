import { MutableRefObject, useEffect, useRef, useState } from 'react';

export type ScrollingDirection =
  | 'none'
  | 'enter:down'
  | 'enter:up'
  | 'leave:down'
  | 'leave:up';

type BoundingRectMeta = {
  y: number;
  ratio: number;
};

type UseIntersectionReturn = {
  intersecting: boolean | null;
  scrollingDirection: ScrollingDirection;
};

const getIntersectionDirection = (
  isIntersecting: boolean,
  previous: BoundingRectMeta,
  current: BoundingRectMeta,
): ScrollingDirection => {
  if (current.y < previous.y) {
    return current.ratio > previous.ratio && isIntersecting
      ? 'enter:down'
      : 'leave:down';
  }

  if (current.y > previous.y) {
    return current.ratio > previous.ratio && isIntersecting
      ? 'enter:up'
      : 'leave:up';
  }

  return 'none';
};

const useIntersection = (
  elementRef: MutableRefObject<HTMLElement | null>,
  options?: IntersectionObserverInit,
): UseIntersectionReturn => {
  const lastElementRef = elementRef.current;
  const intersectionObserverRef = useRef<IntersectionObserver>();
  const previousRect = useRef<BoundingRectMeta>({ y: 0, ratio: 0 });

  const [intersecting, setIntersecting] = useState<boolean | null>(null);
  const [scrollingDirection, setIntersectionDirection] =
    useState<ScrollingDirection>('none');

  const handleIntersection: IntersectionObserverCallback = (newEntries) => {
    let isIntersecting = false;

    newEntries.forEach((entry) => {
      const currentRect = {
        y: entry.boundingClientRect.y,
        ratio: entry.intersectionRatio,
      };

      setIntersectionDirection(
        getIntersectionDirection(
          entry.isIntersecting,
          previousRect.current,
          currentRect,
        ),
      );

      isIntersecting ||= entry.isIntersecting;
      previousRect.current = currentRect;
    });

    setIntersecting(isIntersecting);
  };

  useEffect(() => {
    if (elementRef.current) {
      intersectionObserverRef.current = new IntersectionObserver(
        handleIntersection,
        options,
      );
      intersectionObserverRef.current.observe(elementRef.current);
    }

    return () => {
      if (lastElementRef) {
        intersectionObserverRef.current?.unobserve(lastElementRef);
      }
      intersectionObserverRef.current?.disconnect();
    };
  }, [elementRef, lastElementRef, options]);

  return {
    intersecting,
    scrollingDirection,
  };
};

export default useIntersection;
