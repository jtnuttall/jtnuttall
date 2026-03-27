import type { AllSanitySchemaTypes, internalGroqTypeReferenceTo } from '@/../sanity.types';
import { createGroqBuilderWithZod } from 'groqd';

type SchemaConfig = {
  schemaTypes: AllSanitySchemaTypes;
  referenceSymbol: typeof internalGroqTypeReferenceTo;
};

export const q = createGroqBuilderWithZod<SchemaConfig>();
