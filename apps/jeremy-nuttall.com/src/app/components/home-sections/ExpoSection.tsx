import {
  useProjectsExpoQuery,
  useProjectsQuery,
} from '@jtnuttall/apollo-codegen';
import { Card, Grid, styled, Typography } from '@mui/material';
import { useEffect } from 'react';
import { SectionBox, SectionProps } from './SectionBase';

const Item = styled(Card)`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const ExpoSection = (props: SectionProps) => {
  const { data, error, loading } = useProjectsExpoQuery();

  return (
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
};

export default ExpoSection;
