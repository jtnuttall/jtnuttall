import { ReactNode } from 'react';
import { Block, Inline } from '@contentful/rich-text-types';
import { Box } from '@mui/material';

const documentNodeRenderer = (
  node: Inline | Block,
  children: ReactNode,
): JSX.Element => <Box>{children}</Box>;

export default documentNodeRenderer;
