import { FC, ReactNode } from 'react';
import { Box, CardMedia, styled } from '@mui/material';

type LinearGradientProps = {
  linearGradient?: string[];
  children: ReactNode;
};

const LinearGradient: FC<LinearGradientProps> = ({
  linearGradient,
  children,
}) => {
  if (linearGradient) {
    return (
      <Box sx={{ background: `linear-gradient(${linearGradient.join(',')})` }}>
        {children}
      </Box>
    );
  }

  return <>{children}</>;
};

const HeroCardMedia = styled(CardMedia)`
  display: flex;
  flex-direction: column;
  min-height: 115vh;
  padding-bottom: 15vh;
  background-size: auto;
  background-repeat: repeat;
  align-items: center;
  justify-content: center;
`;

export type HeroCardProps = Parameters<typeof HeroCardMedia>[0] &
  LinearGradientProps;

const HeroCard: FC<HeroCardProps> = ({ linearGradient, ...cardMediaProps }) => (
  <LinearGradient linearGradient={linearGradient}>
    <HeroCardMedia {...cardMediaProps} />
  </LinearGradient>
);

export default HeroCard;
