import { useEffect, useState } from 'react';

const getDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(getDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

export default useWindowDimensions;
