import type { SchemaTypeDefinition } from 'sanity';

const CVEntry: SchemaTypeDefinition = {
  name: 'cvEntry',
  title: 'CV Entry',
  type: 'document',
  fields: [
    {
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Remote'],
      validation: (rule) => rule.required(),
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (rule) => rule.required(),
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (rule) => rule.required(),
    },
  ],
};

export default CVEntry;
