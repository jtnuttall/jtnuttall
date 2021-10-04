import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@jtnuttall/apollo-codegen';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);

export default Providers;
