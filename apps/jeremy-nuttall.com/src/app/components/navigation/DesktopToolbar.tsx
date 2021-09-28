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
  (props, ref): JSX.Element => {
    const { opaqueAppBar } = props;

    return (
      <Toolbar ref={ref}>
        <NavigationButton
          buttonType="fab"
          displayType="desktop"
          icon={<HomeIcon />}
          route="/"
          label="Jeremy"
        />
        <Box sx={{ flexGrow: 1 }} />
        <ButtonGroup variant="contained">
          <NavigationButton
            buttonType="grouped"
            displayType="desktop"
            route="/projects"
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
    );
  },
);

export default DesktopToolbar;
