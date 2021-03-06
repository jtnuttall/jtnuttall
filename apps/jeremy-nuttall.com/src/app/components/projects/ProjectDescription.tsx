import React, { FC, useRef } from 'react';
import { Document } from '@contentful/rich-text-types';
import { CardContent } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';

import RichText from '../contentful/RichText';

type ProjectDescriptionProps = {
  expanded: boolean;
  document: Document;
};

const ProjectDescription: FC<ProjectDescriptionProps> = ({
  expanded,
  document,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const expandedHeight = contentRef.current?.clientHeight ?? 0;

  const animatedStyles = useSpring({
    loop: false,
    from: {
      height: expanded ? '10px' : `${expandedHeight}px`,
    },
    to: {
      height: expanded ? `${expandedHeight}px` : '10px',
    },
    config: {
      tension: 195,
      friction: 25,
      mass: 2,
      precision: 0.01,
      velocity: 0,
      clamp: !expanded,
    },
  });

  return (
    <animated.div style={{ ...animatedStyles }}>
      <CardContent ref={contentRef}>
        <RichText document={document} />
      </CardContent>
    </animated.div>
  );
};

export default React.memo(ProjectDescription);
