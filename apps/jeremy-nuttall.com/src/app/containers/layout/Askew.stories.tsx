import { Story, Meta } from '@storybook/react';
import Askew, { AskewProps } from './Askew';

export default {
  component: Askew,
  title: 'Askew',
} as Meta;

const Template: Story<AskewProps> = (args) => <Askew {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
