import type { SchemaTypeDefinition } from 'sanity';

const Project: SchemaTypeDefinition = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'contributionType',
      title: 'Contribution Type',
      type: 'string',
      options: {
        list: [
          { title: 'Open Source Project', value: 'open-source' },
          { title: 'Job Contribution', value: 'job' },
          { title: 'Personal', value: 'personal' },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      options: {
        default: -1,
      },
      validation: (rule) => rule.integer().min(-1).max(10),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short hook, e.g. "Near-C++ noise generation, in pure Haskell"',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Featured projects get a larger, richer card treatment',
      initialValue: false,
    },
    {
      name: 'keyMetric',
      title: 'Key Metric',
      type: 'string',
      description: 'A standout number, e.g. "~160M values/sec"',
    },
    {
      name: 'keyContribution',
      title: 'Key Contribution',
      type: 'string',
      description: 'Your specific contribution, e.g. "Ported and optimized from C++ FastNoiseLite"',
    },
    {
      name: 'repository',
      title: 'Repository',
      type: 'url',
    },
    {
      name: 'job',
      title: 'Job',
      type: 'reference',
      to: [{ type: 'cvEntry' }],
    },
    {
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url',
    },
    {
      name: 'pullRequests',
      title: 'Pull Requests',
      type: 'array',
      of: [{ type: 'url' }],
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'technology' }],
        },
      ],
    },
  ],
};

export default Project;
