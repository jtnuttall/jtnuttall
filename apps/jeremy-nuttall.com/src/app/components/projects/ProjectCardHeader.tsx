import React, { SyntheticEvent, useState } from 'react';
import { ProjectItemFragment } from '@jtnuttall/apollo-codegen';
import {
  MoreVert as MoreVertIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { CardHeader, IconButton, Menu, MenuItem } from '@mui/material';

type ProjectCardHeaderProps = {
  project: ProjectItemFragment;
};

const ProjectCardHeader = (props: ProjectCardHeaderProps): JSX.Element => {
  const { project } = props;

  const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);
  const open = !!menuAnchorEl;

  const handleClick = (event: SyntheticEvent) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const openUrl = (url?: string | null) => {
    console.log(url);
    handleClose();
  };

  return (
    <>
      <CardHeader
        title={project.name}
        // subheader={project?.}
        action={
          (project.exampleUrl || project.repositoryUrl) && (
            <IconButton onClick={handleClick} aria-label="quick links">
              <MoreVertIcon />
            </IconButton>
          )
        }
      />
      <Menu
        id={`${project?.sys?.id}-menu`}
        anchorEl={menuAnchorEl}
        open={open}
        onClose={handleClose}
      >
        {project?.repositoryUrl && (
          <MenuItem onClick={() => openUrl(project.repositoryUrl)}>
            <LinkIcon sx={{ mr: 1 }} /> Repository
          </MenuItem>
        )}
        {project?.exampleUrl && (
          <MenuItem onClick={() => openUrl(project.exampleUrl)}>
            <LinkIcon sx={{ mr: 1 }} /> Example
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default React.memo(ProjectCardHeader);
