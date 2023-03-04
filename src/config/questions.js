import * as p from '@clack/prompts'
import colors from 'picocolors'

import {
  eslintOptions,
  prettierOptions,
  toolsOptions,
  viteTemplateOptions,
} from './options.js'

export const getProjectName = async () =>
  p.text({
    message: colors.cyan('1️⃣  Ponele nombre a tu proyecto:'),
    validate: (value) => {
      if (value.length === 0) {
        return colors.red('⚠️ El mensaje no puede estar vacío')
      }

      if (value.length > 50) {
        return colors.red('⚠️  El mensaje no puede tener más de 50 caracteres')
      }
    },
  })

export const getTemplate = async () =>
  await p.select({
    message: '2️⃣  Seleccioná el template de Vite a utilizar:',
    options: viteTemplateOptions,
    required: true,
    initialValue: 'react',
    defaultValue: 'react',
  })

export const getPackageManager = async () =>
  await p.text({
    message: '3️⃣  Seleccioná el manejador de paquetes a utilizar:',
    required: true,
    initialValue: 'npm',
    defaultValue: 'npm',
  })

export const getTools = async () => {
  return await p.group({
    tools: ({ results }) =>
      p.multiselect({
        message: `💡¿Agregamos otras herramientas?`,
        initialValues: ['eslint-recommended', 'prettier-recommended'],
        options: toolsOptions,
        required: false,
      }),
    eslintConfigType: ({ results }) => {
      if (!results.includeEslint) {
        return p.select({
          message: '¿Que tipo de configuración queres para ESLint?',
          options: eslintOptions,
          required: true,
        })
      }
    },
    prettierConfigType: ({ results }) => {
      if (!results.includePrettier) {
        return p.select({
          message: `¿Que tipo de configuración queres para Prettier?`,
          options: prettierOptions,
          required: true,
        })
      }
    },
  })
}
