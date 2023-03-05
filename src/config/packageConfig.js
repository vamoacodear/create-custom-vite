export const ESLINT_DEFAULT = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
}

export const PRETTIER_DEFAULT = {
  semi: false,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
}

export const PRETTIER_NONE = {}

export const LINTSTG_DEFAULT = {
  './src/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
}

export const HUSKY_DEFAULT = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged`
