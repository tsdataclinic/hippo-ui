module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:typescript-sort-keys/recommended',
    'turbo',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'react-hooks',
    'import',
    'sort-destructure-keys',
    'sort-keys-fix',
    'jsx-a11y',
  ],
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-shadow': 'error',
    camelcase: 'warn',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
    'react/no-unused-prop-types': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'ignore',
          caseInsensitive: true,
        },
        groups: [['builtin', 'external'], 'internal', 'type'],
        'newlines-between': 'never',
      },
    ],
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'sort-destructure-keys/sort-destructure-keys': [
      'error',
      { caseSensitive: false },
    ],
    'sort-keys-fix/sort-keys-fix': ['error', 'asc'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
