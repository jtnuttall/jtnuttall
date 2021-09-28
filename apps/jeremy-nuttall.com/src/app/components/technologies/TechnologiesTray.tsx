import React from 'react';
import { TechnologyItemFragment } from '@jtnuttall/apollo-codegen';
import { Grid } from '@mui/material';
import TechnologyButton from './TechnologyButton';

type TechnologiesTrayProps = {
  technologies: TechnologyItemFragment[];
};

const TechnologiesTray = (props: TechnologiesTrayProps): JSX.Element => {
  const { technologies } = props;

  return (
    <Grid container spacing={1} columns={4}>
      {technologies.map((technology) => (
        <Grid item key={technology.sys?.id}>
          <TechnologyButton technology={technology} />
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(TechnologiesTray);
