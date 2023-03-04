export const toolsOptions = [
  {
    config: {
      default: 'default',
      special: 'standard',
    },
    value: 'eslint-recommended',
    label: 'ESLint',
    hint: 'recomendado',
  },
  {
    config: {
      default: 'prettier eslint-config-prettier eslint-plugin-prettier',
    },
    value: 'prettier-recommended',
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

export const packageManagerOptions = ['npm']

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
