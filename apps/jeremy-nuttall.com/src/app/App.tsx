import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './style/theme';
import HomePage from './pages/HomePage';

const queryClient = new QueryClient();

export const App = () => {
  const [dark, setDark] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={dark ? theme.dark : theme.light}>
        <CssBaseline />
        <HomePage />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
