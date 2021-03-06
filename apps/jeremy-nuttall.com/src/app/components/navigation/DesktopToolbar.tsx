import React from 'react';
import {
  Code as CodeIcon,
  GitHub as GitHubIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { Box, ButtonGroup, Toolbar } from '@mui/material';
import { ToolbarProps } from './types';
import NavigationButton from './NavigationButton';

const DesktopToolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  (_props, ref): JSX.Element => (
    <Toolbar ref={ref}>
      <NavigationButton
        buttonType="fab"
        displayType="desktop"
        icon={<HomeIcon />}
        to="/"
        label="Jeremy"
      />
      <Box sx={{ flexGrow: 1 }} />
      <ButtonGroup variant="contained">
        <NavigationButton
          buttonType="grouped"
          displayType="desktop"
          to="/projects"
          icon={<CodeIcon />}
          label="Projects"
        />
        <NavigationButton
          buttonType="grouped"
          displayType="desktop"
          link="https://github.com/jtnuttall/jtnuttall"
          icon={<GitHubIcon />}
          label="GitHub"
        />
      </ButtonGroup>
    </Toolbar>
  ),
);

export default DesktopToolbar;
