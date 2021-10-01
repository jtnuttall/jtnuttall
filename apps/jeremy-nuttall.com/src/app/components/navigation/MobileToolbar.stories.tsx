import { Story, Meta } from '@storybook/react';
import { ToolbarProps } from './types';
import MobileToolbarContents from './MobileToolbar';

export default {
  component: MobileToolbarContents,
  title: 'MobileToolbarContents',
} as Meta;

const Template: Story<ToolbarProps> = (args) => (
  <MobileToolbarContents {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
