import { Box, AppBar, Toolbar, Button, Fab, Typography } from '@mui/material';
import { Home as HomeIcon, Face as FaceIcon } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import useScroll from '../../hooks/useScroll';

type NavigationHeaderProps = {
  transparentOffset?: number;
};

const NavigationHeader = (props: NavigationHeaderProps): JSX.Element => {
  const { transparentOffset = 15 } = props;

  const appBarRef = useRef<HTMLDivElement>(null);
  const { yOffset } = useScroll(window);
  const [transparentAppBar, setTransparentAppBar] = useState(false);

  useEffect(() => {
    if (!yOffset) return;

    setTransparentAppBar(yOffset > transparentOffset);
  }, [transparentOffset, yOffset]);

  return (
    <AppBar
      ref={appBarRef}
      position="fixed"
      sx={
        transparentAppBar
          ? undefined
          : {
              backgroundColor: 'rgba(75,75,75,0.0)',
              boxShadow: 'none',
            }
      }
    >
      <Toolbar>
        <Fab size="medium" color="secondary" sx={{ mr: 2 }}>
          <HomeIcon />
        </Fab>
        <Typography variant="h5" sx={{ mr: 2 }}>
          Jeremy
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          color={transparentAppBar ? 'secondary' : 'primary'}
        >
          <FaceIcon sx={{ mr: 1 }} /> About Me
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationHeader;
