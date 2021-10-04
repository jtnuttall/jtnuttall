import React, { Suspense } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './style/theme';
import LoadingPage from './pages/LoadingPage';

const NavigationRoot = React.lazy(
  () => import('./containers/navigation/NavigationRoot'),
);
const Providers = React.lazy(() => import('./store/Providers'));

const App = (): JSX.Element => (
  <Suspense fallback={<LoadingPage />}>
    <ThemeProvider theme={theme.dark}>
      <Providers>
        <CssBaseline />
        <NavigationRoot />
      </Providers>
    </ThemeProvider>
  </Suspense>
);

export default App;
