import { createGroqBuilderWithZod } from 'groqd';
import type {
  AllSanitySchemaTypes,
  internalGroqTypeReferenceTo,
} from '@/../sanity.types';

type SchemaConfig = {
  schemaTypes: AllSanitySchemaTypes;
  referenceSymbol: typeof internalGroqTypeReferenceTo;
};

export const q = createGroqBuilderWithZod<SchemaConfig>();
