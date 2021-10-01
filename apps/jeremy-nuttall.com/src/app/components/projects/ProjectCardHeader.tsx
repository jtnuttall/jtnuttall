import React, { ReactNode, SyntheticEvent, useState } from 'react';
import { ProjectItemFragment } from '@jtnuttall/apollo-codegen';
import {
  MoreVert as MoreVertIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { CardHeader, IconButton, Link, Menu, MenuItem } from '@mui/material';

type MenuLinkProps = {
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
};

const MenuLink = React.forwardRef<HTMLLIElement, MenuLinkProps>(
  (props, ref) => {
    const { href, onClick, children } = props;

    return (
      <Link
        color="inherit"
        underline="none"
        onClick={onClick}
        href={href}
        target="_blank"
        rel="noopener"
      >
        <MenuItem ref={ref}>{children}</MenuItem>
      </Link>
    );
  },
);

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
          <MenuLink href={project.repositoryUrl} onClick={() => handleClose()}>
            <LinkIcon sx={{ mr: 1 }} />
            Repository
          </MenuLink>
        )}
        {project?.exampleUrl && (
          <MenuLink href={project.exampleUrl} onClick={() => handleClose()}>
            <LinkIcon sx={{ mr: 1 }} />
            Example
          </MenuLink>
        )}
      </Menu>
    </>
  );
};

export default React.memo(ProjectCardHeader);
