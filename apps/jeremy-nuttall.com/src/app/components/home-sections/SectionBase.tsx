import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import useIntersection, {
  ScrollingDirection,
} from '../../hooks/useIntersection';
import { CutLeftCard } from '../../containers/layout/Askew';

export const SectionBoxBase = styled(Box)`
  position: relative;
  height: 0;
  min-height: 110vh;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const AnimatedSectionBoxBase = animated(SectionBoxBase);

export type SectionBoxProps = Parameters<typeof AnimatedSectionBoxBase>[0] & {
  headerTitle?: string;
  animationDirection?: 'left' | 'right';
};

export const SectionHeaderBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  padding-left: inherit;
  padding-top: 1.5rem;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding-top: 3rem;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding-top: 4.5rem;
  }
`;

export type SectionProps = Pick<
  SectionBoxProps,
  'sx' | 'style' | 'animationDirection' | 'headerTitle'
>;

export const SectionBox = (props: SectionBoxProps): JSX.Element => {
  const {
    style,
    ref,
    children,
    animationDirection = 'right',
    headerTitle,
    ...rest
  } = props;

  const [slideIn, setSlideIn] = useState(true);

  const out = animationDirection === 'left' ? '100%' : '-100%';

  const animatedStyles = useSpring({
    loop: false,
    from: {
      translateX: slideIn ? out : '0%',
    },
    to: {
      translateX: slideIn ? '0%' : out,
    },
    config: {
      tension: 210,
      friction: 20,
      mass: 1,
      precision: 0.01,
      velocity: 0,
      clamp: true,
    },
  });

  const topRef = useRef<HTMLSpanElement>(null);

  const { intersecting, scrollingDirection } = useIntersection(topRef, {
    threshold: 1,
  });

  useEffect(() => {
    let id: NodeJS.Timeout | null = null;

    if (intersecting) {
      id = setTimeout(() => {
        setSlideIn(true);
      }, 325);
    } else if (scrollingDirection === ScrollingDirection.None) {
      setSlideIn(true);
    } else if (scrollingDirection === ScrollingDirection.LeaveUp) {
      setSlideIn(false);
    }

    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [intersecting]);

  return (
    <>
      <span ref={topRef} />
      <AnimatedSectionBoxBase {...rest} style={{ ...style, ...animatedStyles }}>
        {headerTitle && (
          <SectionHeaderBox sx={{ position: 'absolute', top: 0, left: 0 }}>
            <Typography variant="h4">{headerTitle}</Typography>
          </SectionHeaderBox>
        )}
        {children}
      </AnimatedSectionBoxBase>
    </>
  );
};

export const SectionContentCard = styled(CutLeftCard)`
  flex-grow: 1;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: -7.5pt;
  height: 100%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-left: 7.5%;
    margin-right: 7.5%;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    margin-left: 12.5%;
    margin-right: 12.5%;
  }
`;
