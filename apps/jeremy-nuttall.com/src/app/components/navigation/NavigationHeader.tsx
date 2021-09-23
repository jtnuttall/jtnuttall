import { Link } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Hidden,
  ButtonGroup,
  Button,
  Fab,
  Typography,
} from '@mui/material';
import {
  Code as CodeIcon,
  Home as HomeIcon,
  GitHub as GitHubIcon,
  MenuOpen as MenuOpenIcon,
} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import useScroll from '../../hooks/useScroll';

type ToolbarContentsProps = {
  opaqueAppBar: boolean;
};

const DesktopToolbarContents = (props: ToolbarContentsProps): JSX.Element => {
  const { opaqueAppBar } = props;

  return (
    <>
      <Fab
        size="medium"
        color="secondary"
        sx={{ mr: 2 }}
        component={Link}
        to="/"
      >
        <HomeIcon />
      </Fab>
      <Typography variant="h5" sx={{ mr: 2 }}>
        Jeremy
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <ButtonGroup
        variant="contained"
        color={opaqueAppBar ? 'secondary' : 'primary'}
      >
        <Button component={Link} to="/projects">
          <CodeIcon sx={{ mr: 1 }} /> Projects
        </Button>
        <Button
          href="https://github.com/jtnuttall/jtnuttall"
          target="_blank"
          rel="noopener"
        >
          <GitHubIcon sx={{ mr: 1 }} /> GitHub
        </Button>
      </ButtonGroup>
    </>
  );
};

const MobileToolbarContents = (props: ToolbarContentsProps): JSX.Element => {
  const { opaqueAppBar } = props;

  return (
    <>
      <Fab size="medium" color="secondary" sx={{ mr: 2 }}>
        <MenuOpenIcon />
      </Fab>
    </>
  );
};

type NavigationHeaderProps = {
  opaqueOffset?: number;
};

const NavigationHeader = (props: NavigationHeaderProps): JSX.Element => {
  const { opaqueOffset = null } = props;

  const appBarRef = useRef<HTMLDivElement>(null);
  const { yOffset } = useScroll(window);
  const [opaqueAppBar, setOpaqueAppBar] = useState(!opaqueOffset);

  useEffect(() => {
    if (yOffset === null || opaqueOffset === null) return;

    setOpaqueAppBar(yOffset >= opaqueOffset);
  }, [opaqueOffset, yOffset]);

  return (
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
      <Toolbar>
        <Hidden smDown>
          <DesktopToolbarContents opaqueAppBar={opaqueAppBar} />
        </Hidden>
        <Hidden mdUp>
          <MobileToolbarContents opaqueAppBar={opaqueAppBar} />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationHeader;
