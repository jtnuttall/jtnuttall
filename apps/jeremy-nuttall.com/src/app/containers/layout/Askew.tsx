import { Children, ReactChildren, ReactNode } from 'react';
import { Box, styled } from '@mui/material';

export const skewAmount = '75pt';

export const SkewBottomLeft = styled(Box)`
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% calc(100% - ${skewAmount}));
`;

export const SkewLeft = styled(Box)`
  clip-path: polygon(
    0% 0%,
    100% ${skewAmount},
    100% 100%,
    0% calc(100% - ${skewAmount})
  );

  & > * {
    margin-top: -${skewAmount} !important;
    padding-top: calc(${skewAmount} + 3rem) !important;
    padding-bottom: calc(${skewAmount} + 3rem) !important;
  }
`;

type AskewProps = {
  children: ReactNode;
};

const Askew = (props: AskewProps): JSX.Element => {
  const { children } = props;

  return (
    <>
      {Children.toArray(children).map((child, i) =>
        i === 0 ? (
          <SkewBottomLeft>{child}</SkewBottomLeft>
        ) : (
          <SkewLeft>{child}</SkewLeft>
        ),
      )}
    </>
  );
};

export default Askew;
