import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationHeader from '../../components/navigation/NavigationHeader';
import ProjectsPage from '../../pages/ProjectsPage';
import HomePage from '../../pages/HomePage';

const NavigationRoot = (): JSX.Element => (
  <BrowserRouter>
    <NavigationHeader opaqueOffset={500} />
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
