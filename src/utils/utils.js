import { cancel, outro, spinner } from '@clack/prompts'
import { exec } from 'child_process'
import { promisify } from 'node:util'

import { toolsOptions } from '../config/options.js'
import { deleteDirectory } from '../utils/files.js'

const execAsync = promisify(exec)
const s = spinner()

export const installDependencies = async (directory, manager, packages) => {
  s.start(
    `⏳ Instalando paquetes via ${manager}... puede tardar unos segundos!`
  )

  const { stdout, stderr } = await execAsync(
    `cd ${directory} && ${manager} install ${packages}`
  )

  if (stdout) {
    s.stop('✅ Instalación finalizada')
  }

  if (stderr) {
    s.stop(`🚨 ${stderr}`)
    process.exit(1)
  }
}

export const createViteTemplate = async (directory, answers) => {
  const { template, manager } = answers

  let viteCreate = `create vite ${directory}`

  // Crear el proyecto con el package manager seleccionado, para npm cambia.
  // Por ahora solo instalamos con npm
  if (manager === 'npm') {
    viteCreate = `create vite@latest ${directory} --`
  }

  if (template) {
    viteCreate += ` --template ${template}`
  }

  s.start(`⏳ Ejecutando la creación del proyecto: ${directory} `)

  const { stdout, stderr } = await execAsync(`${manager} ${viteCreate}`)

  if (stdout) {
    s.stop(`✅ Proyecto ${directory} creado exitosamente`)
  }

  if (stderr) {
    s.stop(`🚨 ${stderr}`)
    await exitProgram({ name: directory })
  }
}

export const getPackagesToInstall = (answers) => {
  const { tools } = answers
  let packages = []

  toolsOptions.forEach((tool) => {
    Object.values(tools).forEach((key) => {
      let configType = 'default'

      let pckg
      if (tool.value === key) {
        if (
          answers.hasOwnProperty('eslintConfigType') &&
          key.includes('eslint')
        ) {
          configType = answers['eslintConfigType']
        }
        if (
          answers.hasOwnProperty('prettierConfigType') &&
          key.includes('prettier')
        ) {
          configType = answers['prettierConfigType']
        }
        pckg = tool.config[configType]
        packages.push(pckg)
      }
      return
    })
  })
  return packages.join(' ').trim()
}

export function exitProgram({
  name = '',
  code = 0,
  message = '💔 Cancelaste la operación.',
} = {}) {
  cancel(message)
  const cb = () => {
    outro(`🗑️ El directorio ${name} se borró con exito.`)
  }
  name && deleteDirectory(name, cb)
  process.exit(code)
}
