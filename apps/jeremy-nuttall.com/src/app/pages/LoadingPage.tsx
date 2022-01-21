import { useEffect, useState } from 'react';
import { styled } from '@mui/material';

const FullScreen = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

const LoadingPage = (): JSX.Element => {
  return (
    <FullScreen style={{ backgroundColor: 'rgb(255, 204, 112)' }}>
      <svg
        width="200px"
        style={{ width: '200px' }}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="20" fill="rgb(65, 88, 208)" />
        <g aria-label="J" fill="#FFF">
          <path d="m 45.65206,82.800688 c 13.152,0 20.256,-7.488 20.256,-21.504 v -39.744 h 7.296 v -7.296 h -27.168 v 7.296 h 11.808 v 39.744 c 0,8.448 -3.36,14.112 -12.288,14.112 -8.832,0 -13.248,-5.664 -13.248,-14.112 v -5.184 h -7.968 v 5.184 c 0,13.92 8.16,21.504 21.312,21.504 z" />
        </g>
      </svg>
    </FullScreen>
  );
};

export default LoadingPage;
