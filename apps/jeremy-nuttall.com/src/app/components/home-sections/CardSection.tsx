import { FC, lazy } from 'react';
import { SectionBox, SectionContentCard, SectionProps } from './SectionBase';

const RichText = lazy(() => import('../contentful/RichText'));

const CardSection: FC<SectionProps> = ({ section, headerTitle, ...rest }) => (
  <SectionBox {...rest} headerTitle={section?.title ?? headerTitle}>
    <SectionContentCard>
      <RichText document={section?.content?.json} />
    </SectionContentCard>
  </SectionBox>
);

export default CardSection;
