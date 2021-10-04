import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@jtnuttall/apollo-codegen';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../style/theme';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme.dark}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </ApolloProvider>
);

export default Providers;
