import { Story, Meta } from '@storybook/react';
import { ToolbarProps } from './types';
import DesktopToolbar from './DesktopToolbar';

export default {
  component: DesktopToolbar,
  title: 'DesktopToolbar',
} as Meta;

const Template: Story<ToolbarProps> = (args) => <DesktopToolbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
