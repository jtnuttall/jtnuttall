import type { SchemaTypeDefinition } from 'sanity';

const CVEntry: SchemaTypeDefinition = {
  name: 'cvEntry',
  title: 'CV Entry',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (rule) => rule.required(),
    },
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
      options: {
        default: 'Remote',
      },
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
      name: 'description',
      title: 'Description',
      type: 'text',
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
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (rule) => rule.required(),
    },
    {
      name: 'url',
      title: 'Website',
      type: 'url',
    },
  ],
};

export default CVEntry;
