import React, { FC } from 'react';
import { TechnologyItemFragment } from '@jtnuttall/apollo-codegen';
import { Grid } from '@mui/material';
import TechnologyButton from './TechnologyButton';

type TechnologiesTrayProps = {
  technologies: TechnologyItemFragment[];
};

const TechnologiesTray: FC<TechnologiesTrayProps> = ({ technologies }) => (
  <Grid container spacing={1} columns={4}>
    {technologies.map((technology) => (
      <Grid item key={technology.sys?.id}>
        <TechnologyButton technology={technology} />
      </Grid>
    ))}
  </Grid>
);

export default React.memo(TechnologiesTray);
