import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopNavigationBar from '../../components/navigation/TopNavigationBar';

const HomePage = lazy(() => import('../../pages/HomePage'));
const ProjectsPage = lazy(() => import('../../pages/ProjectsPage'));

const NavigationRoot = (): JSX.Element => (
  <BrowserRouter>
    <TopNavigationBar />
    <Routes>
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default NavigationRoot;
