module.exports = {
  '*.{json,md,yml,yaml}': 'oxfmt --write',
  '*.{ts,js,tsx,jsx}': [() => 'turbo typecheck', () => 'turbo lint', () => 'turbo test', 'oxfmt --write'],
};
