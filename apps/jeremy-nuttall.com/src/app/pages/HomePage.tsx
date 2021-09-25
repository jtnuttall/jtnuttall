import { useTheme } from '@mui/material';
import Askew from '../containers/layout/Askew';
import HomeHero from '../components/heroes/HomeHero';
import PersonalSummarySection from '../components/home-sections/PersonalSummarySection';
import ExpoSection from '../components/home-sections/ExpoSection';
import FooterSection from '../components/home-sections/FooterSection';

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
