import type { SchemaTypeDefinition } from 'sanity';
import CVEntry from './cv-entry';
import Project from './project';
import Technology from './technology';

export const schema = {
  types: [CVEntry, Technology, Project] satisfies SchemaTypeDefinition[],
};
