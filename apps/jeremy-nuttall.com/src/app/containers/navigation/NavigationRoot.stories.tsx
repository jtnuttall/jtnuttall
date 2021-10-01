import { Story, Meta } from '@storybook/react';
import NavigationRoot from './NavigationRoot';

export default {
  component: NavigationRoot,
  title: 'NavigationRoot',
} as Meta;

const Template: Story = (args) => <NavigationRoot {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
