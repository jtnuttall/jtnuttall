module.exports = {
  '*.{json,md,ya?ml}': 'prettier --write',
  '*.{ts,js}x?': [
    () => 'pnpm -r typecheck',
    () => 'pnpm -r lint',
    'prettier --write',
  ],
};
