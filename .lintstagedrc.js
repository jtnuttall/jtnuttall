module.exports = {
  '*.{json,md,yml,yaml}': 'oxfmt --write',
  '*.{ts,js,tsx,jsx}': [() => 'pnpm -r typecheck', () => 'pnpm -r lint', 'oxfmt --write'],
};
