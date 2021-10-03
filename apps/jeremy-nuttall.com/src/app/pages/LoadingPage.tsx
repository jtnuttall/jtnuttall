import { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import { animated, useSpring, useTransition } from '@react-spring/web';

const colors = [
  ['rgb(65, 88, 208)', 'rgb(208, 203, 65)', 'rgb(208, 65, 77)'],
  ['rgb(197, 99, 168)', 'rgb(99, 197, 158)', 'rgb(197, 163, 99)'],
  ['rgb(255, 204, 112)', 'rgb(255, 112, 214)', 'rgb(112, 255, 193)'],
] as const;

const FullScreenBase = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
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
          <svg
            width="200px"
            style={{ width: '200px', marginTop: 10, marginBottom: 10 }}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="100" rx="20" />
            <g aria-label="J" fill="#FFFFFF">
              <path d="m 45.65206,82.800688 c 13.152,0 20.256,-7.488 20.256,-21.504 v -39.744 h 7.296 v -7.296 h -27.168 v 7.296 h 11.808 v 39.744 c 0,8.448 -3.36,14.112 -12.288,14.112 -8.832,0 -13.248,-5.664 -13.248,-14.112 v -5.184 h -7.968 v 5.184 c 0,13.92 8.16,21.504 21.312,21.504 z" />
            </g>
            {/* <text
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
            </text> */}
          </svg>
        </FullScreen>
      ),
  );
};

export default LoadingPage;
