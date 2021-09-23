import React, { Children, ReactNode, useMemo } from 'react';
import { Box, BoxProps, Card, CardProps, styled } from '@mui/material';
import { v4 as uuid } from 'uuid';
import theme from '../../style/theme';

export const skewAmount = '90pt';

export const CutBottomLeft = styled(Box)`
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% calc(100% - ${skewAmount}));
`;

export const CutLeft = styled(Box)`
  clip-path: polygon(
    0% 0%,
    100% ${skewAmount},
    100% 100%,
    0% calc(100% - ${skewAmount})
  );

  & > * {
    margin-top: -${skewAmount};
    padding-top: calc(${skewAmount} + 1.5rem) !important;
    padding-bottom: calc(${skewAmount} + 1.5rem) !important;
  }
`;

export const CutTopLeft = styled(Box)`
  clip-path: polygon(0% 0%, 100% ${skewAmount}, 100% 100%, 0% 100%);

  & > * {
    margin-top: -${skewAmount};
    padding-top: calc(${skewAmount} + 1.5rem) !important;
    padding-bottom: 1.5rem !important;
  }
`;

export const CutLeftCard = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const { raised, ...rest } = props;

    return (
      <Box
        sx={{
          height: '100%',
          filter: raised ? theme.css.filters.raisedDropShadow : undefined,
        }}
      >
        <CutLeft sx={{ height: '100%' }}>
          <Card ref={ref} raised={raised} {...rest} />
        </CutLeft>
      </Box>
    );
  },
);

type AskewProps = {
  sx?: BoxProps['sx'];
  skewTop?: boolean;
  skewBottom?: boolean;
  children: ReactNode;
};

const Askew = (props: AskewProps): JSX.Element => {
  const { sx, skewTop, skewBottom, children } = props;

  const childArray = useMemo(() => Children.toArray(children), [children]);

  return (
    <Box sx={sx}>
      {childArray.map((child, i) => {
        if (!skewTop && i === 0) {
          return <CutBottomLeft>{child}</CutBottomLeft>;
        }

        if (!skewBottom && i === childArray.length - 1) {
          return <CutTopLeft>{child}</CutTopLeft>;
        }

        return <CutLeft>{child}</CutLeft>;
      })}
    </Box>
  );
};

export default Askew;
