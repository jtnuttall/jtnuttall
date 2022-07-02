import { useProjectsExpoQuery } from '@jtnuttall/apollo-codegen';
import { Card, Grid, styled, Typography } from '@mui/material';
import { SectionBox, SectionProps } from './SectionBase';

const Item = styled(Card)`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const ExpoSection = (props: SectionProps) => {
  const { data } = useProjectsExpoQuery();

  return (
    <SectionBox {...props}>
      <Grid container spacing="5rem">
        {data?.projectCollection?.items?.map((item) => (
          <Grid item xs={6}>
            <Item>
              <Typography variant="h6">{item?.name}</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </SectionBox>
  );
};

export default ExpoSection;
