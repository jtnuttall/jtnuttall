import React, { ReactElement } from 'react';
import { useTheme } from '@mui/material';
import _ from 'lodash';
import {
  BaseSectionFragment,
  useSectionsQuery,
} from '@jtnuttall/apollo-codegen';
import Askew, { AskewList } from '../containers/layout/Askew';
import { SectionProps } from '../components/home-sections/SectionBase';

const HomeHero = React.lazy(() => import('../components/heroes/HomeHero'));
const CardSection = React.lazy(
  () => import('../components/home-sections/CardSection'),
);
const FooterSection = React.lazy(
  () => import('../components/home-sections/FooterSection'),
);

type SectionFactoryReturn = React.LazyExoticComponent<
  (props: SectionProps) => JSX.Element
>;

const sectionFactory = (type?: string | null): SectionFactoryReturn => {
  switch (type) {
    case 'home':
      return HomeHero;
    case 'footer':
      return FooterSection;
    default:
      return CardSection;
  }
};

const HomePage = (): JSX.Element => {
  const { palette } = useTheme();

  const { data, loading, error } = useSectionsQuery();

  const sections: BaseSectionFragment[] = [
    { sys: { id: 'homepage-hero' }, type: 'home' },
    ..._.compact(data?.homeSectionCollection?.items ?? []),
    { sys: { id: 'footer-section' }, type: 'footer' },
  ];

  const evenStyles = {
    backgroundColor: palette.primary.dark,
  };

  const oddStyles = {
    backgroundColor: '#E3E2DF',
    color: '#2C2E35',
  };

  return (
    <AskewList
      sx={{ overflowX: 'hidden' }}
      items={sections}
      keyExtractor={(item) => item?.sys?.id}
      renderItem={(item, i) => {
        const Section = sectionFactory(item?.type);
        const styles = i > 0 && i % 2 === 0 ? evenStyles : oddStyles;
        return <Section section={item} sx={{ ...styles }} />;
      }}
    />
  );
};

export default HomePage;
