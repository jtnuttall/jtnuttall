import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@jtnuttall/apollo-codegen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './style/theme';
import NavigationRoot from './containers/navigation/NavigationRoot';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const [dark, setDark] = useState(true);

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={dark ? theme.dark : theme.light}>
          <CssBaseline />
          <NavigationRoot />
        </ThemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default App;
