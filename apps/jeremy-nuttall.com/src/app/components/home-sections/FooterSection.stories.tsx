import { Story, Meta } from '@storybook/react';
import { SectionProps } from './SectionBase';
import FooterSection from './FooterSection';

export default {
  component: FooterSection,
  title: 'FooterSection',
} as Meta;

const Template: Story<SectionProps> = (args) => <FooterSection {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
