import nextPlugin from '@next/eslint-plugin-next';

import { baseConfig } from '@jtnuttall/eslint-config';

export default [
  { ignores: ['.next/**', 'sanity.types.ts'] },
  ...baseConfig,
  {
    plugins: { '@next/next': nextPlugin },
    rules: { ...nextPlugin.configs.recommended.rules },
  },
];
