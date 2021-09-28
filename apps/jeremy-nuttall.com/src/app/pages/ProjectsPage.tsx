import { Box, Typography } from '@mui/material';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import Askew from '../containers/layout/Askew';

const ProjectsPage = (): JSX.Element => (
  <Box sx={{ mt: '65px' }}>
    <ProjectsGrid />
  </Box>
);

export default ProjectsPage;
