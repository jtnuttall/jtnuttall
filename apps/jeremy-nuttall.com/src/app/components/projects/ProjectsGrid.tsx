import React, { FC } from 'react';
import { useProjectsQuery } from '@jtnuttall/apollo-codegen';
import { Masonry } from 'masonic';
import _ from 'lodash';

import useBreakpoints from '../../hooks/useBreakpoints';
import ProjectCard from './ProjectCard';

const ProjectsGrid: FC = () => {
  const { data } = useProjectsQuery();

  const columns = useBreakpoints({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
  });

  const projects = _.compact(data?.projectCollection?.items ?? []);

  return (
    <Masonry
      items={projects}
      itemKey={(item) => item.sys.id}
      columnCount={columns ?? 1}
      columnGutter={8}
      render={(item) => <ProjectCard project={item.data} />}
    />
  );
};

export default ProjectsGrid;
