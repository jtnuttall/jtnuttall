import { ReactNode } from 'react';
import { Block, Inline } from '@contentful/rich-text-types';
import { Typography, TypographyProps } from '@mui/material';
import _ from 'lodash';

const textNodeRenderer = _.curry(
  (
    variant: TypographyProps['variant'],
    node: Inline | Block,
    children: ReactNode,
  ): JSX.Element => <Typography variant={variant}>{children}</Typography>,
);

export default textNodeRenderer;
