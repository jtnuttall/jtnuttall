module.exports = {
  '*.{json,md,yml,yaml}': 'prettier --write',
  '*.{ts,js,tsx,jsx}': [
    () => 'pnpm -r typecheck',
    () => 'pnpm -r lint',
    'prettier --write',
  ],
};
