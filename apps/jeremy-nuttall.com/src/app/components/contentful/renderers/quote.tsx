import { ReactNode } from 'react';
import { Block, Inline } from '@contentful/rich-text-types';
import { Box, Typography } from '@mui/material';

const quoteRenderer = (
  node: Inline | Block,
  children: ReactNode,
): JSX.Element => (
  <Box
    position="relative"
    marginBottom="0"
    fontWeight="300"
    lineHeight="1.7"
    fontSize="0.95rem"
    sx={{
      backgroundColor: 'rgba(0, 0, 0, 0.075)',
      p: '1.5rem',
      pt: '2.25rem',
      pl: '4rem',
    }}
  >
    <Typography
      component="span"
      variant="h1"
      display="inline"
      sx={{
        position: 'absolute',
        left: '0.75rem',
        top: 0,
        userSelect: 'none',
        opacity: 0.25,
      }}
    >
      &ldquo;
    </Typography>
    {children}
  </Box>
);

export default quoteRenderer;
