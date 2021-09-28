import { ReactNode } from 'react';
import { Block, Inline } from '@contentful/rich-text-types';
import { Typography } from '@mui/material';

const paragraphNodeRenderer = (
  node: Inline | Block,
  children: ReactNode,
): JSX.Element => (
  <Typography variant="body1" paragraph>
    {children}
  </Typography>
);

export default paragraphNodeRenderer;
