import { Story, Meta } from '@storybook/react';
import LoadingPage from './LoadingPage';

export default {
  component: LoadingPage,
  title: 'LoadingPage',
} as Meta;

const Template: Story = (args) => <LoadingPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
