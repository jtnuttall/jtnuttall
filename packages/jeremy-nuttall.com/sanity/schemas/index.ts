import type { SchemaTypeDefinition } from 'sanity';

import CVEntry from './cv-entry';
import CVEntryGroup from './cv-entry-group';
import Project from './project';
import Technology from './technology';

export const schema = {
  types: [CVEntry, CVEntryGroup, Technology, Project] satisfies SchemaTypeDefinition[],
};
