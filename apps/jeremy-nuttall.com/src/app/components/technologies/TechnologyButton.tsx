import React from 'react';
import { TechnologyShortItemFragment } from '@jtnuttall/apollo-codegen';
import { IconButton } from '@mui/material';

type TechnologyButtonProps = {
  technology: TechnologyShortItemFragment;
  height?: number;
};

const TechnologyButton = (props: TechnologyButtonProps): JSX.Element => {
  const { technology, height = 30 } = props;

  return (
    <IconButton>
      <img
        draggable={false}
        height={height}
        src={technology?.icon?.url ?? ''}
        alt={technology?.name ?? 'Tech'}
      />
    </IconButton>
  );
};

export default React.memo(TechnologyButton);
