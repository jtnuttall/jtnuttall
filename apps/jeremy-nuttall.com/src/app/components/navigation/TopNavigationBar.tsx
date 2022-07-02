import { FC, lazy, useEffect, useRef, useState } from 'react';
import { AppBar, Hidden } from '@mui/material';
import useScroll from '../../hooks/useScroll';
import { NavigationBarProps } from './types';

const DesktopToolbar = lazy(() => import('./DesktopToolbar'));
const MobileToolbar = lazy(() => import('./MobileToolbar'));

const TopNavigationBar: FC<NavigationBarProps> = ({ opaqueOffset = null }) => {
  const appBarRef = useRef<HTMLDivElement>(null);
  const { yOffset } = useScroll(window);
  const [opaqueAppBar, setOpaqueAppBar] = useState(!opaqueOffset);

  useEffect(() => {
    if (yOffset === null || opaqueOffset === null) return;

    setOpaqueAppBar(yOffset >= opaqueOffset);
  }, [opaqueOffset, yOffset]);

  return (
    <>
      <AppBar
        ref={appBarRef}
        position="fixed"
        sx={
          opaqueAppBar
            ? undefined
            : {
                backgroundColor: 'rgba(75,75,75,0.0)',
                backdropFilter: 'blur(3px)',
              }
        }
      >
        <Hidden smDown>
          <DesktopToolbar opaqueAppBar={opaqueAppBar} />
        </Hidden>
        <Hidden mdUp>
          <MobileToolbar opaqueAppBar={opaqueAppBar} />
        </Hidden>
      </AppBar>
    </>
  );
};

export default TopNavigationBar;
