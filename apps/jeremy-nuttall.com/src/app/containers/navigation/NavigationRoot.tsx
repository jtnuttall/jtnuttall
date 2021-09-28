import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopNavigationBar from '../../components/navigation/TopNavigationBar';
import LoadingPage from '../../pages/LoadingPage';

const HomePage = React.lazy(() => import('../../pages/HomePage'));
const ProjectsPage = React.lazy(() => import('../../pages/ProjectsPage'));

const NavigationRoot = (): JSX.Element => (
  <BrowserRouter>
    <TopNavigationBar opaqueOffset={500} />
    <Switch>
      <Route path="/projects">
        <ProjectsPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default NavigationRoot;
