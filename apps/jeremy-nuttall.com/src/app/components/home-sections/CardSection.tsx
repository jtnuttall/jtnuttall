import React from 'react';
import { SectionBox, SectionContentCard, SectionProps } from './SectionBase';

const RichText = React.lazy(() => import('../contentful/RichText'));

const CardSection = (props: SectionProps): JSX.Element => {
  const { section, headerTitle, ...rest } = props;

  return (
    <SectionBox {...rest} headerTitle={section?.title ?? headerTitle}>
      <SectionContentCard>
        <RichText document={section?.content?.json} />
      </SectionContentCard>
    </SectionBox>
  );
};

export default CardSection;
