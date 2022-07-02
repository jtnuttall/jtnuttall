import { FC } from 'react';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import PageWrapper from '../containers/layout/PageWrapper';

const ProjectsPage: FC = () => (
  <PageWrapper>
    <ProjectsGrid />
  </PageWrapper>
);

export default ProjectsPage;
