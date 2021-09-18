import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Button, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { Message } from '@jtnuttall/api-interfaces';

const HomePage = (): JSX.Element => {
  const { data, isLoading, error } = useQuery('api-message', () =>
    axios.get<Message>('/api').then(({ data }) => data)
  );

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h1">Welcome to jeremy-nuttall.com</Typography>
      </div>
      <Typography variant="h2">{data?.message}</Typography>
      <Typography variant="body1" paragraph>
        hello there, yellow blue Greeen Black
      </Typography>
      <Button variant="contained">Press me</Button>
    </>
  );
};

export default HomePage;
