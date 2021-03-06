import { FC, forwardRef, memo, useEffect, useState } from 'react';
import { track } from 'insights-js';
import { ProjectItemFragment } from '@jtnuttall/apollo-codegen';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardProps,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { animated, useSpring } from '@react-spring/web';
import _ from 'lodash';
import TechnologiesTray from '../technologies/TechnologiesTray';
import ProjectCardHeader from './ProjectCardHeader';
import ProjectDescription from './ProjectDescription';

const AnimatedIconButton = animated(IconButton);

type ExpandButtonProps = {
  expanded: boolean;
  onClick?: () => void;
};

const ExpandButton: FC<ExpandButtonProps> = ({ expanded, onClick }) => {
  const animatedStyles = useSpring({
    loop: false,
    from: {
      rotateX: expanded ? '0deg' : '180deg',
    },
    to: {
      rotateX: expanded ? '180deg' : '0deg',
    },
    config: {
      tension: 185,
      friction: 15,
      mass: 2,
      precision: 0.01,
      velocity: 0,
    },
  });

  return (
    <AnimatedIconButton onClick={onClick} style={{ ...animatedStyles }}>
      <ExpandMoreIcon />
    </AnimatedIconButton>
  );
};

const StyledCard = styled(Card)``;

type ProjectCardProps = {
  sx?: CardProps['sx'];
  project: ProjectItemFragment;
};

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, sx }, ref) => {
    const technologies = _.compact(project?.technologies?.items ?? []);

    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
      setExpanded(!expanded);
    };

    useEffect(() => {
      if (expanded) {
        track({
          id: 'project-expand',
          parameters: {
            name: project.name ? project.name : 'unknown',
          },
        });
      }
    }, [expanded, project]);

    return (
      <StyledCard raised ref={ref} sx={sx}>
        <ProjectCardHeader project={project} />
        <CardMedia
          component="img"
          width="100%"
          sx={{ aspectRatio: '16/9' }}
          src={
            project?.preview?.url ??
            'https://dummyimage.com/400x225/000/ffffff.png'
          }
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body2">{project?.blurb}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <TechnologiesTray technologies={technologies} />
          {project?.description?.json && (
            <ExpandButton expanded={expanded} onClick={handleExpand} />
          )}
        </CardActions>
        {project?.description?.json && (
          <ProjectDescription
            expanded={expanded}
            document={project?.description?.json}
          />
        )}
      </StyledCard>
    );
  },
);

export default memo(ProjectCard);
