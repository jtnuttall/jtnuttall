import React, { useEffect, useState } from 'react';
import { Message } from '@jtnuttall/api-interfaces';
import { Button, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import theme from './style/theme';

export const App = () => {
  const [dark, setDark] = useState(true);
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage)
      .catch((e) => console.log(e));
  }, []);

  return (
    <ThemeProvider theme={dark ? theme.dark : theme.light}>
      <CssBaseline />
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h1">Welcome to jeremy-nuttall.com</Typography>
      </div>
      <Typography variant="h2">{m.message}</Typography>
      <Typography variant="body1" paragraph>
        hello there, yellow blue Greeen Black
      </Typography>
      <Button variant="contained">Press me</Button>
    </ThemeProvider>
  );
};

export default App;
