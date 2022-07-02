import {
  FC,
  forwardRef,
  memo,
  ReactNode,
  SyntheticEvent,
  useState,
} from 'react';
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

const MenuLink = forwardRef<HTMLLIElement, MenuLinkProps>(
  ({ href, onClick, children }, ref) => (
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
  ),
);

type ProjectCardHeaderProps = {
  project: ProjectItemFragment;
};

const ProjectCardHeader: FC<ProjectCardHeaderProps> = ({
  project,
}: ProjectCardHeaderProps) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);
  const open = !!menuAnchorEl;

  const handleClick = (event: SyntheticEvent) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <CardHeader
        title={project.name}
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

export default memo(ProjectCardHeader);
