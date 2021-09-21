import axios from 'axios';
import { useQuery } from 'react-query';
import { Button, Typography } from '@mui/material';
import { Message } from '@jtnuttall/api-interfaces';
import HomeHero from '../components/heroes/HomeHero';

const HomePage = (): JSX.Element => {
  const { data, isLoading, error } = useQuery('api-message', () =>
    axios.get<Message>('/api').then((response) => response.data),
  );

  return (
    <>
      <HomeHero />
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
