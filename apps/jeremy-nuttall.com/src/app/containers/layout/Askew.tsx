import React, { ReactElement } from 'react';
import {
  Box,
  BoxProps,
  Grid,
  GridProps,
  Card,
  CardProps,
  styled,
} from '@mui/material';
import theme from '../../style/theme';

export const skewAmount = '90pt';

export const CutBottomLeft = styled(Box)`
  position: relative;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% calc(100% - ${skewAmount}));
`;

export const CutLeft = styled(Box)`
  position: relative;
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
  position: relative;
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

export type AskewProps = {
  sx?: BoxProps['sx'];
  skewTop?: boolean;
  skewBottom?: boolean;
  children: ReactElement<{ name: string }>[];
};

const Askew = (props: AskewProps): JSX.Element => {
  const { sx, skewTop, skewBottom, children } = props;

  return (
    <Box sx={sx}>
      {children.map((child, i) => {
        const {
          props: { name },
        } = child;

        if (!skewTop && i === 0) {
          return <CutBottomLeft key={name}>{child}</CutBottomLeft>;
        }

        if (!skewBottom && i === children.length - 1) {
          return <CutTopLeft key={name}>{child}</CutTopLeft>;
        }

        return <CutLeft key={name}>{child}</CutLeft>;
      })}
    </Box>
  );
};

export default Askew;
