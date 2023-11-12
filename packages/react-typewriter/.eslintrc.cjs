module.exports = {
  extends: [
    '../../.eslintrc.cjs',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['vite.config.ts'],
  env: {
    browser: true,
    es2020: true,
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/prop-types': 'off', // bad behavior for certain TypeScript types
    'import/no-unresolved': 'off', // TypeScript gives better info
    'react/display-name': ['off'],
  },
};
