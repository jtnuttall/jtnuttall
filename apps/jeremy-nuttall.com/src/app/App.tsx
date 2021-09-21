import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './style/theme';
import HomePage from './pages/HomePage';
import NavigationHeader from './components/navigation/NavigationHeader';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const [dark, setDark] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={dark ? theme.dark : theme.light}>
          <CssBaseline />
          <NavigationHeader />
          <HomePage />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
