import { Story, Meta } from '@storybook/react';
import HeroCard, { HeroCardProps } from './HeroCard';

export default {
  component: HeroCard,
  title: 'HeroCard',
} as Meta;

const Template: Story<HeroCardProps> = (args) => <HeroCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
