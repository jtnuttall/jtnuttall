import { Story, Meta } from '@storybook/react';
import { NavigationBarProps } from './types';
import TopNavigationBar from './TopNavigationBar';

export default {
  component: TopNavigationBar,
  title: 'TopNavigationBar',
} as Meta;

const Template: Story<NavigationBarProps> = (args) => (
  <TopNavigationBar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
