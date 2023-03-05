/* eslint-disable no-prototype-builtins */
import { cancel, outro, spinner } from '@clack/prompts'
import { exec } from 'child_process'
import { promisify } from 'node:util'

import * as m from '../config/messages.js'
import { toolsOptions } from '../config/options.js'
import { deleteDirectory } from '../utils/files.js'

const execAsync = promisify(exec)
const s = spinner()

export const installDependencies = async (directory, manager, packages) => {
  s.start(m.INTALLING_PCKGS_SP.replace('_manager_', manager))

  let command = manager === 'yarn' ? 'add' : 'install'
  const { stdout, stderr } = await execAsync(
    `cd ${directory} && ${manager} ${command} ${packages}`
  )

  if (stdout) {
    s.stop(m.INTALLING_PCKGS_OK)
  }

  if (stderr) {
    s.stop('👇🏻')
    onCancel(directory, 1, m.INSTALLING_ERR.replace('_stderr_', stderr))
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

  s.start(m.VITE_CREATING_SP.replace('_directory_', directory))

  const { stdout, stderr } = await execAsync(`${manager} ${viteCreate}`)

  if (stdout) {
    s.stop(m.VITE_CREATING_OK.replace('_directory_', directory))
  }

  if (stderr) {
    s.stop('👇🏻')
    onCancel(directory, 1, m.VITE_ERR.replace('_stderr_', stderr))
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

export const onCancel = (name, code = 0, msg = m.CANCEL_OP) => {
  const cb = () => {
    outro(m.DELETED_FOLDER.replace('_name_', name))
  }
  name && deleteDirectory(name, cb)
  cancel(msg)
  process.exit(code)
}
