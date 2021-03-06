import { FC, useEffect, useRef, useState } from 'react';
import { track } from 'insights-js';
import { Box, styled, Typography } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { BaseSectionFragment } from '@jtnuttall/apollo-codegen';
import useIntersection, {
  ScrollingDirection,
} from '../../hooks/useIntersection';
import { CutLeftCard } from '../../containers/layout/Askew';

export const SectionBoxBase = styled(Box)`
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const AnimatedSectionBoxBase = animated(SectionBoxBase);

export type SectionBoxProps = Omit<
  Parameters<typeof AnimatedSectionBoxBase>[0],
  'css'
> & {
  name?: string;
  headerTitle?: string;
  animationDirection?: 'left' | 'right';
  intersectionThreshold?: number;
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

const IntersectionCanary = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export type SectionProps = Pick<
  SectionBoxProps,
  'name' | 'sx' | 'style' | 'animationDirection' | 'headerTitle'
> & {
  section: Omit<BaseSectionFragment, 'contentfulMetadata'>;
};

export const SectionBox: FC<SectionBoxProps> = ({
  name,
  style,
  ref,
  children,
  headerTitle,
  animationDirection = 'right',
  intersectionThreshold = 0.085,
  ...rest
}) => {
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

  const intersectionRef = useRef<HTMLDivElement>(null);

  const { intersecting, scrollingDirection } = useIntersection(
    intersectionRef,
    {
      threshold: intersectionThreshold,
    },
  );

  useEffect(() => {
    if (intersecting) {
      track({
        id: 'section-loaded',
        parameters: {
          name: name ?? 'unknown',
          headerTitle: headerTitle ?? 'none',
        },
      });
    }
  }, [headerTitle, intersecting, name]);

  useEffect(() => {
    if (intersecting || scrollingDirection === ScrollingDirection.None) {
      setSlideIn(true);
    } else if (scrollingDirection === ScrollingDirection.LeaveUp) {
      setSlideIn(false);
    }
  }, [intersecting]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <IntersectionCanary ref={intersectionRef} key={`${name}-intersector`} />
      <AnimatedSectionBoxBase
        {...rest}
        key={name}
        style={{ ...style, ...animatedStyles }}
      >
        <>
          {headerTitle && (
            <SectionHeaderBox sx={{ position: 'absolute', top: 0, left: 0 }}>
              <Typography variant="h4">{headerTitle}</Typography>
            </SectionHeaderBox>
          )}
          {children}
        </>
      </AnimatedSectionBoxBase>
    </>
  );
};

export const SectionContentCard = styled(CutLeftCard)`
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: -7.5pt;
  min-height: 100%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-left: 7%;
    margin-right: 7%;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    margin-left: 10.5%;
    margin-right: 10.5%;
  }
`;
