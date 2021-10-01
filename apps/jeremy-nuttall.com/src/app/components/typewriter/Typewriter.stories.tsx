import { Story, Meta } from '@storybook/react';
import Typewriter, { TypewriterProps } from './Typewriter';

export default {
  component: Typewriter,
  title: 'Typewriter',
} as Meta;

const Template: Story<TypewriterProps> = (args) => <Typewriter {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
