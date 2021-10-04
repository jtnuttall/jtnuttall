import React from 'react';
import { useTheme } from '@mui/material';
import Askew from '../containers/layout/Askew';
import HomeHero from '../components/heroes/HomeHero';

const PersonalSummarySection = React.lazy(
  () => import('../components/home-sections/PersonalSummarySection'),
);
const ExpoSection = React.lazy(
  () => import('../components/home-sections/ExpoSection'),
);
const FooterSection = React.lazy(
  () => import('../components/home-sections/FooterSection'),
);

const HomePage = (): JSX.Element => {
  const { palette } = useTheme();

  return (
    <Askew sx={{ overflowX: 'hidden' }}>
      <HomeHero name="homepage-hero" />
      <PersonalSummarySection
        headerTitle="About Me"
        name="homepage-personal-summary-section"
        sx={{ backgroundColor: '#E3E2DF', color: '#2c2e35' }}
      />
      <ExpoSection
        headerTitle="Expo"
        name="homepage-expo-section"
        sx={{ backgroundColor: palette.primary.dark }}
      />
      <FooterSection headerTitle="You might like" name="homepage-footer" />
    </Askew>
  );
};

export default HomePage;
