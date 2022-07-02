import { FC } from 'react';
import { Typography } from '@mui/material';
import { SectionBox, SectionContentCard, SectionProps } from './SectionBase';

const PersonalSummarySection: FC<SectionProps> = (props) => (
  <SectionBox {...props}>
    <SectionContentCard raised>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Hello visiting human!
      </Typography>
      <Typography variant="h5" paragraph>
        I&apos;m Jeremy, a software engineer based out of Southern California.
      </Typography>
      <Typography variant="h5">
        Welcome to my personal website and portfolio.
      </Typography>
    </SectionContentCard>
  </SectionBox>
);

export default PersonalSummarySection;
