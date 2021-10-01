import { Box } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';

const colors: [string, string, string][] = [
  ['rgb(65, 88, 208)', 'rgb(208, 203, 65)', 'rgb(208, 65, 77)'],
  ['rgb(197, 99, 168)', 'rgb(99, 197, 158)', 'rgb(197, 163, 99)'],
  ['rgb(255, 204, 112)', 'rgb(255, 112, 214)', 'rgb(112, 255, 193)'],
];

type LoadingPageProps = {
  color?: string;
  backgroundColor?: string;
};

const LoadingPage = (): JSX.Element => {
  const animatedStyles = useSpring({
    loop: true,
    from: {},
  });
  return (
    <Box sx={{ width: '200px', mt: 10 }}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
      </svg>
    </Box>
  );
};

export default LoadingPage;
