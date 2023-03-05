export const toolsOptions = [
  {
    config: {
      default: 'eslint eslint-plugin-react',
      special: 'standard',
    },
    value: 'eslint',
    label: 'ESLint',
    hint: 'recomendado',
  },
  {
    config: {
      default: 'prettier eslint-config-prettier eslint-plugin-prettier',
    },
    value: 'prettier',
    label: 'Prettier',
    hint: 'recomendado',
  },
  {
    config: {
      default: 'husky',
    },
    value: 'husky',
    label: 'Husky',
  },
  {
    config: {
      default: 'lint-staged',
    },
    value: 'lint-staged',
    label: 'Lint Staged',
  },
  {
    config: {
      default: 'react-router-dom localforage match-sorter sort-by',
    },
    value: 'router',
    label: 'React Router',
  },
]

export const packageManagerOptions = [
  {
    value: 'npm',
    label: 'npm',
    hint: 'recomendado',
  },
  {
    value: 'pnpm',
    label: 'pnpm',
  },
  {
    value: 'yarn',
    label: 'yarn',
  },
]

export const viteTemplateOptions = [
  { value: 'react', label: 'react' },
  { value: 'react-ts', label: 'react-ts' },
]

export const eslintOptions = [
  {
    value: 'default',
    label: 'Recommended',
  },
  {
    value: 'special',
    label: 'Standar',
  },
]

export const prettierOptions = [
  {
    value: 'default',
    label: 'Por defecto',
  },
  { value: 'special', label: 'Ninguna' },
]

export const stateManagerOptions = ['redux toolkit', 'react-query', 'zustand']
export const routersOptions = ['react-router-dom', 'wouter']
