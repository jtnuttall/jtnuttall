import React from 'react';
import {
  Code as CodeIcon,
  GitHub as GitHubIcon,
  Home as HomeIcon,
  MenuOpen as MenuOpenIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  Fab,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ToolbarProps } from './types';

const MobileToolbarContents = React.forwardRef<HTMLDivElement, ToolbarProps>(
  (props, ref) => {
    const { opaqueAppBar } = props;

    return (
      <Toolbar ref={ref}>
        <Fab size="small" color="secondary" sx={{ mr: 2 }}>
          <MenuOpenIcon />
        </Fab>
      </Toolbar>
    );
  },
);

export default MobileToolbarContents;
