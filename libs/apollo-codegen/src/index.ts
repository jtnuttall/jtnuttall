import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export * from './generated';

const {
  NX_CONTENTFUL_URL: URL,
  NX_CONTENTFUL_SPACE_ID: SPACE_ID,
  NX_CONTENTFUL_API_KEY: API_KEY,
} = process.env;

const link = createHttpLink({
  uri: `${URL}/${SPACE_ID}`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
