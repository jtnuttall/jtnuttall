import React, { useState } from 'react';
import {
  Code as CodeIcon,
  GitHub as GitHubIcon,
  Home as HomeIcon,
  MenuOpen as MenuOpenIcon,
} from '@mui/icons-material';
import { ButtonGroup, Fab, SwipeableDrawer, Toolbar } from '@mui/material';

import NavigationButton from './NavigationButton';
import { ToolbarProps } from './types';

const MobileToolbarContents = React.forwardRef<HTMLDivElement, ToolbarProps>(
  (_props, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <Toolbar ref={ref}>
        <Fab
          size="small"
          color="secondary"
          onClick={() => setOpen(true)}
          sx={{ mr: 2 }}
        >
          <MenuOpenIcon />
        </Fab>

        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          PaperProps={{
            sx: { minWidth: '70vw' },
          }}
        >
          <ButtonGroup orientation="vertical" variant="text">
            <NavigationButton
              buttonType="grouped"
              displayType="mobile"
              icon={<HomeIcon />}
              to="/"
              label="Jeremy"
            />
            <NavigationButton
              buttonType="grouped"
              displayType="mobile"
              to="/projects"
              icon={<CodeIcon />}
              label="Projects"
            />
            <NavigationButton
              buttonType="grouped"
              displayType="mobile"
              link="https://github.com/jtnuttall/jtnuttall"
              icon={<GitHubIcon />}
              label="GitHub"
            />
          </ButtonGroup>
        </SwipeableDrawer>
      </Toolbar>
    );
  },
);

export default MobileToolbarContents;
