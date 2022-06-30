import { track } from 'insights-js';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import TopNavigationBar from '../../components/navigation/TopNavigationBar';
import LoadingPage from '../../pages/LoadingPage';

const HomePage = React.lazy(() => import('../../pages/HomePage'));
const ProjectsPage = React.lazy(() => import('../../pages/ProjectsPage'));

const TrackedRoutes = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    track({
      id: 'page-view',
      parameters: {
        path: location.pathname,
      },
    });
  }, [location]);

  return (
    <Routes>
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

const NavigationRoot = (): JSX.Element => (
  <BrowserRouter>
    <TopNavigationBar />
    <TrackedRoutes />
  </BrowserRouter>
);

export default NavigationRoot;
