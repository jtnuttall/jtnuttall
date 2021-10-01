import { Story, Meta } from '@storybook/react';
import ProjectsPage from './ProjectsPage';

export default {
  component: ProjectsPage,
  title: 'ProjectsPage',
} as Meta;

const Template: Story = (args) => <ProjectsPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
