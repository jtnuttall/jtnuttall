import { Suspense } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@jtnuttall/apollo-codegen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './style/theme';
import NavigationRoot from './containers/navigation/NavigationRoot';
import LoadingPage from './pages/LoadingPage';

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <Suspense fallback={<LoadingPage />}>
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme.dark}>
          <CssBaseline />
          <NavigationRoot />
        </ThemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  </Suspense>
);

export default App;
