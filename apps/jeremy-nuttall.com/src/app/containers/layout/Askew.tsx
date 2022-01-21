import React, { ReactElement, useRef } from 'react';
import {
  Box,
  BoxProps,
  Grid,
  GridProps,
  Card,
  CardProps,
  styled,
} from '@mui/material';
import _ from 'lodash';
import theme from '../../style/theme';

export const skewAmount = '90pt';

export const CutBottomLeft = styled(Box)`
  position: relative;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% calc(100% - ${skewAmount}));
  shape-outside: polygon(
    0% 0%,
    100% 0%,
    100% 100%,
    0% calc(100% - ${skewAmount})
  );
  shape-margin: 20px;
`;

export const CutLeft = styled(Box)`
  position: relative;
  clip-path: polygon(
    0% 0%,
    100% ${skewAmount},
    100% 100%,
    0% calc(100% - ${skewAmount})
  );
  shape-outside: polygon(
    0% 0%,
    100% ${skewAmount},
    100% 100%,
    0% calc(100% - ${skewAmount})
  );
  shape-margin: 20px;

  & > * {
    margin-top: -${skewAmount};
    padding-top: calc(${skewAmount} + 1.5rem) !important;
    padding-bottom: calc(${skewAmount} + 1.5rem) !important;
  }
`;

export const CutTopLeft = styled(Box)`
  position: relative;
  clip-path: polygon(0% 0%, 100% ${skewAmount}, 100% 100%, 0% 100%);
  shape-outside: polygon(0% 0%, 100% ${skewAmount}, 100% 100%, 0% 100%);
  shape-margin: 20px;

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
          filter: raised ? theme.css.filters.raisedDropShadow : undefined,
        }}
      >
        <CutLeft>
          <Card ref={ref} raised={raised} {...rest} />
        </CutLeft>
      </Box>
    );
  },
);

export type AskewListItem = {
  [K: string]: unknown;
};

export type AskewListProps<T extends AskewListItem> = {
  sx?: BoxProps['sx'];
  skewTop?: boolean;
  skewBottom?: boolean;
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  keyExtractor?: (item: T, index: number) => React.Key & T[keyof T];
};

export const AskewList = <T extends AskewListItem>(
  props: AskewListProps<T>,
): JSX.Element => {
  const { sx, skewTop, skewBottom, items, renderItem, keyExtractor } = props;

  return (
    <Box sx={sx}>
      {items.map((item, i) => {
        const key = (keyExtractor?.(item, i) ?? i) as React.Key;

        if (!skewTop && i === 0) {
          return <CutBottomLeft key={key}>{renderItem(item, i)}</CutBottomLeft>;
        }

        if (!skewBottom && i === items.length - 1) {
          return <CutTopLeft key={key}>{renderItem(item, i)}</CutTopLeft>;
        }

        return <CutLeft key={key}>{renderItem(item, i)}</CutLeft>;
      })}
    </Box>
  );
};

export type AskewProps = {
  sx?: BoxProps['sx'];
  skewTop?: boolean;
  skewBottom?: boolean;
  children: (ReactElement<{ name: string }> | undefined)[];
};

const Askew = (props: AskewProps): JSX.Element => {
  const { sx, skewTop, skewBottom, children } = props;

  return (
    <Box sx={sx}>
      {children.map((child, i) => {
        if (!child) return undefined;

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
