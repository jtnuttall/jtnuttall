import { Box, Card, Grid, styled, Typography } from '@mui/material';
import { SectionBox, SectionContentCard, SectionProps } from './SectionBase';

const Item = styled(Card)`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const ExpoSection = (props: SectionProps) => (
  <SectionBox {...props}>
    <Grid container spacing="5rem">
      <Grid item xs={6}>
        <Item>
          <Typography variant="h6">This is 1</Typography>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>
          <Typography variant="h6">This is 2</Typography>
        </Item>
      </Grid>
    </Grid>
  </SectionBox>
);

export default ExpoSection;
