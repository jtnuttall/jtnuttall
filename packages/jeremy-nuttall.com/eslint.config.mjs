import { baseConfig } from '@jtnuttall/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  { ignores: ['.next/**', 'sanity.types.ts'] },
  ...baseConfig,
  {
    plugins: { '@next/next': nextPlugin },
    rules: { ...nextPlugin.configs.recommended.rules },
  },
];
