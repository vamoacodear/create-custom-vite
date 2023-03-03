import * as p from '@clack/prompts'
import colors from 'picocolors'

import { viteTemplateOptions } from './options.js'

export const getProjectName = async () =>
  p.text({
    message: colors.cyan('1️⃣  Ponele nombre a tu proyecto:'),
    validate: (value) => {
      if (value.length === 0) {
        return colors.red('El mensaje no puede estar vacío')
      }

      if (value.length > 50) {
        return colors.red('El mensaje no puede tener más de 50 caracteres')
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

export const getEslintConfig = async () =>
  await p.confirm({
    message: '4️⃣  ¿Queres tener ESLint? 📝 Si? Creamos config por defecto...',
  })

export const getPrettiertConfig = async () =>
  await p.confirm({
    message: '5️⃣  ¿Queres tener Prettier? 📝 Si? Creamos config por defecto...',
  })

export const getHuskyConfig = async () =>
  p.confirm({
    message: '6️⃣  ¿Queres tener Husky? 📝 Si? Creamos config por defecto...',
  })

export const getLintStagedConfig = async () =>
  await p.confirm({
    message:
      '7️⃣   ¿Queres tener Lint Staged? 📝 Si? Creamos config por defecto...',
  })

export const getRouter = async () =>
  await p.confirm({
    message: '8️⃣   ¿Queres tener React Router?',
  })
