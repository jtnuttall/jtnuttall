import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { animated, useSpring, useTransition } from '@react-spring/web';

const colors = [
  ['rgb(65, 88, 208)', 'rgb(208, 203, 65)', 'rgb(208, 65, 77)'],
  ['rgb(197, 99, 168)', 'rgb(99, 197, 158)', 'rgb(197, 163, 99)'],
  ['rgb(255, 204, 112)', 'rgb(255, 112, 214)', 'rgb(112, 255, 193)'],
] as const;

const FullScreenBase = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100%;
  align-items: center;
  justify-content: center;
`;

const FullScreen = animated(FullScreenBase);

const LoadingPage = (): JSX.Element => {
  const [show, setShow] = useState(false);

  const transitions = useTransition(show, {
    from: {
      scaleX: 0,
      borderRadius: '100%',
    },
    enter: {
      scaleX: 1,
      borderRadius: '0%',
    },
    leave: {
      scaleX: 0,
      borderRadius: '100%',
    },
    reset: show,
    reverse: show,
    delay: 200,
  });

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);

  return transitions(
    (styles, item) =>
      item && (
        <FullScreen style={{ ...styles, backgroundColor: colors[2][0] }}>
          <animated.svg
            width="200px"
            style={{ width: '200px', marginTop: 10, marginBottom: 10 }}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="100" rx="20" />
            <text
              style={{
                fontSize: '96px',
                lineHeight: 1.25,
                userSelect: 'none',
              }}
              x="20.40406"
              y="81.456688"
            >
              <tspan
                x="20.40406"
                y="81.456688"
                style={{ fontSize: '96px', fill: '#ffffff' }}
              >
                J
              </tspan>
            </text>
          </animated.svg>
        </FullScreen>
      ),
  );
};

export default LoadingPage;
