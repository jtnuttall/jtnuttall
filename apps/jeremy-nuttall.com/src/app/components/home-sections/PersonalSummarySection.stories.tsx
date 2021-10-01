import { Story, Meta } from '@storybook/react';
import { SectionProps } from './SectionBase';
import PersonalSummarySection from './PersonalSummarySection';

export default {
  component: PersonalSummarySection,
  title: 'PersonalSummarySection',
} as Meta;

const Template: Story<SectionProps> = (args) => (
  <PersonalSummarySection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
