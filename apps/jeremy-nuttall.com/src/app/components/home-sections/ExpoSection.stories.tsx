import { Story, Meta } from '@storybook/react';
import { SectionProps } from './SectionBase';
import ExpoSection from './ExpoSection';

export default {
  component: ExpoSection,
  title: 'ExpoSection',
} as Meta;

const Template: Story<SectionProps> = (args) => <ExpoSection {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
