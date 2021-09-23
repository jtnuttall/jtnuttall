import { useTheme } from '@mui/material';
import Askew from '../containers/layout/Askew';
import HomeHero from '../components/heroes/HomeHero';
import PersonalSummarySection from '../components/home-sections/PersonalSummarySection';
import ExpoSection from '../components/home-sections/ExpoSection';
import FooterSection from '../components/home-sections/FooterSection';

const HomePage = (): JSX.Element => (
  <Askew sx={{ overflowX: 'hidden' }}>
    <HomeHero key="homepage-hero" />
    <PersonalSummarySection
      headerTitle="About Me"
      key="homepage-personal-summary-section"
      sx={{ backgroundColor: '#E3E2DF', color: '#2c2e35' }}
    />
    <ExpoSection
      headerTitle="Expo"
      key="homepage-expo-section"
      sx={{ backgroundColor: '#2c2e35' }}
    />
    <FooterSection headerTitle="You might like:" key="homepage-footer" />
  </Askew>
);

export default HomePage;
