import React, { FC } from 'react';
import { TechnologyShortItemFragment } from '@jtnuttall/apollo-codegen';
import { IconButton } from '@mui/material';

type TechnologyButtonProps = {
  technology: TechnologyShortItemFragment;
  height?: number;
};

const TechnologyButton: FC<TechnologyButtonProps> = ({
  technology,
  height = 30,
}) => {
  const { name = '', icon = { url: '' } } = technology;

  return (
    <IconButton title={name ?? ''}>
      <img
        draggable={false}
        height={height}
        src={icon?.url ?? ''}
        alt={name ?? ''}
      />
    </IconButton>
  );
};

export default React.memo(TechnologyButton);
