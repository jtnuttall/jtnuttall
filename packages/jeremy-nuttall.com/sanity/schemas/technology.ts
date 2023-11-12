import type { SchemaTypeDefinition } from 'sanity';

const Technology: SchemaTypeDefinition = {
  name: 'technology',
  title: 'Technology',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
    },
    {
      name: 'aliases',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};

export default Technology;
