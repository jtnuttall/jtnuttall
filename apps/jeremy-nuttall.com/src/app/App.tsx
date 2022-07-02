import { lazy, Suspense, useEffect } from 'react';
import { init, trackPages } from 'insights-js';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './style/theme';
import LoadingPage from './pages/LoadingPage';
import Providers from './store/Providers';

const NavigationRoot = lazy(
  () => import('./containers/navigation/NavigationRoot'),
);

const App = (): JSX.Element => {
  useEffect(() => {
    const insightsId = process.env.NX_INSIGHTS_ID;

    if (insightsId) {
      init(insightsId);
      trackPages();
    }
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <ThemeProvider theme={theme.dark}>
        <Providers>
          <CssBaseline />
          <NavigationRoot />
        </Providers>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
