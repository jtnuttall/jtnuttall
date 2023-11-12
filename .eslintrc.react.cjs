module.exports = {
  extends: [
    './.eslintrc.cjs',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'vite.config.ts',
    'testSetup.tsx',
    'tailwind.config.js',
    'postcss.config.js',
    'gql-codegen.ts',
  ],
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
    'react/prop-types': 'off', // bad behavior for typescript types
    'import/no-unresolved': 'off',
    'react/display-name': ['off'],
  },
};
