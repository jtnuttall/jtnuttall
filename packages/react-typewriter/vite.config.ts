/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'react-typewriter',
      fileName: 'react-typewriter',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
