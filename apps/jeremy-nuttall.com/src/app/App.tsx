import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './style/theme';
import NavigationHeader from './components/navigation/NavigationHeader';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const [dark, setDark] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={dark ? theme.dark : theme.light}>
        <CssBaseline />
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
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
