import type { SchemaTypeDefinition } from 'sanity';

const CVEntryGroup: SchemaTypeDefinition = {
  name: 'cvEntryGroup',
  title: 'CV Entry Group',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'url',
      title: 'Website',
      type: 'url',
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
      name: 'cvEntries',
      title: 'CV Entries',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'cvEntry' }],
        },
      ],
      validation: (rule) => rule.required().min(1),
    },
  ],
};

export default CVEntryGroup;
