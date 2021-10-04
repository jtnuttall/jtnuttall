import React, { Suspense } from 'react';
import LoadingPage from './pages/LoadingPage';

const NavigationRoot = React.lazy(
  () => import('./containers/navigation/NavigationRoot'),
);
const Providers = React.lazy(() => import('./store/Providers'));

const App = (): JSX.Element => (
  <Suspense fallback={<LoadingPage />}>
    <Providers>
      <NavigationRoot />
    </Providers>
  </Suspense>
);

export default App;
