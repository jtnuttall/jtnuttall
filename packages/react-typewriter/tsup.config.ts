import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: {
    compilerOptions: {
      // tsup's dts plugin injects baseUrl, which is deprecated in TS 7+
      ignoreDeprecations: '6.0',
    },
  },
  clean: true,
  external: ['react', 'react-dom'],
});
