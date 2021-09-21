import { MutableRefObject, useEffect, useRef, useState } from 'react';

type UseIntersectionProps = {
  elementRef: MutableRefObject<HTMLElement | null>;
  options?: Omit<IntersectionObserverInit, 'root'>;
};

type UseIntersectionReturn = {
  anyIntersection: boolean | null;
  entries: IntersectionObserverEntry[];
};

const useIntersection = (
  props: UseIntersectionProps,
): UseIntersectionReturn => {
  const { elementRef, options } = props;

  const lastElementRef = elementRef.current;
  const [anyIntersection, setAnyIntersection] = useState<boolean | null>(null);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const intersectionObserverRef = useRef<IntersectionObserver>();

  const handleIntersection: IntersectionObserverCallback = (newEntries) => {
    setEntries(newEntries);
    setAnyIntersection(newEntries.some((entry) => entry.isIntersecting));
  };

  useEffect(() => {
    if (elementRef.current) {
      intersectionObserverRef.current = new IntersectionObserver(
        handleIntersection,
        options,
      );
      intersectionObserverRef.current?.observe(elementRef.current);
    }

    return () => {
      if (lastElementRef) {
        intersectionObserverRef.current?.unobserve(lastElementRef);
      }
      intersectionObserverRef.current?.disconnect();
    };
  }, [elementRef, lastElementRef, options]);

  return {
    entries,
    anyIntersection,
  };
};

export default useIntersection;
