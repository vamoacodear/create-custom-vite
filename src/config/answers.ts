import { packageManagerOptions, viteTemplateOptions } from './options.js'

export default [
  {
    type: 'input',
    name: 'name',
    message: `1️⃣  Ponele nombre a tu proyecto:
    `,
  },
  {
    type: 'list',
    name: 'template',
    message: `2️⃣  Seleccioná el template de Vite a utilizar:
    `,
    choices: viteTemplateOptions,
    default: 'react',
  },
  {
    type: 'list',
    name: 'manager',
    message: `3️⃣  Seleccioná el manejador de paquetes a utilizar:
    `,
    choices: packageManagerOptions,
    default: 'npm',
  },
  {
    type: 'confirm',
    name: 'includeESLint',
    message: `4️⃣  ¿Queres tener ESLint? 📝 Voy a crear la configuración por defecto.
    `,
    default: true,
  },
  {
    type: 'confirm',
    name: 'includePrettier',
    message: `5️⃣  ¿Queres tener Prettier? 📝 Voy a crear la configuración por defecto.
    `,
    default: true,
  },
  {
    type: 'confirm',
    name: 'includeHusky',
    message: `6️⃣  ¿Queres tener Husky? 📝 Voy a crear la configuración por defecto.
    `,
    default: true,
  },
  {
    type: 'confirm',
    name: 'includeLintStaged',
    message: `7️⃣   ¿Queres tener Lint Staged? 📝 Voy a crear la configuración por defecto.
    `,
    default: true,
  },
  {
    type: 'confirm',
    name: 'includeReactRouter',
    message: `8️⃣   ¿Queres tener React Router?
    `,
    default: false,
  },
  {
    type: 'confirm',
    name: 'installPackages',
    message: `🪄  ¿Instalamos los paquetes?
    `,
  },
]
