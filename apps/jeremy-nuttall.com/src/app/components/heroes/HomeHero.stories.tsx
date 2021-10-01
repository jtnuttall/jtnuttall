import { Story, Meta } from '@storybook/react';
import HomeHero, { HomeHeroProps } from './HomeHero';

export default {
  component: HomeHero,
  title: 'HomeHero',
} as Meta;

const Template: Story<HomeHeroProps> = (args) => <HomeHero {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
