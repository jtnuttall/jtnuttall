module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/strict-type-checked',
    'prettier',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    '.eslintrc.react.cjs',
    'jest.config.js',
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-confusing-void-expression': 'off',
  },
};
