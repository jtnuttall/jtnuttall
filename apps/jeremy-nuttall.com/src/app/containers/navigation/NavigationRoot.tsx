import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopNavigationBar from '../../components/navigation/TopNavigationBar';
import LoadingPage from '../../pages/LoadingPage';

const HomePage = React.lazy(() => import('../../pages/HomePage'));
const ProjectsPage = React.lazy(() => import('../../pages/ProjectsPage'));

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
