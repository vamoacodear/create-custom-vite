/* eslint-disable no-prototype-builtins */
import { cancel, outro, spinner } from '@clack/prompts'
import { exec } from 'child_process'
import { promisify } from 'node:util'

import { messages } from '../config/lang.js'
import { toolsOptions } from '../config/options.js'
import getConfig, { deleteDirectory } from '../utils/files.js'

const execAsync = promisify(exec)
const s = spinner()

const lang = getConfig()
const m = messages[lang]

export const installDependencies = async (directory, manager, packages) => {
  const lang = getConfig()
  const m = messages[lang]
  s.start(m.intalling_pckgs_sp.replace('_manager_', manager))

  let command = manager === 'yarn' ? 'add' : 'install'
  const { stdout, stderr } = await execAsync(
    `cd ${directory} && ${manager} ${command} ${packages}`
  )

  if (stdout) {
    s.stop(m.intalling_pckgs_ok)
  }

  if (stderr) {
    s.stop('👇🏻')
    onCancel(directory, 1, m.installing_err.replace('_stderr_', stderr))
  }
}

export const createViteTemplate = async (directory, answers) => {
  const lang = getConfig()
  const m = messages[lang]
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

  s.start(m.vite_creating_sp.replace('_directory_', directory))

  const { stdout, stderr } = await execAsync(`${manager} ${viteCreate}`)

  if (stdout) {
    s.stop(m.vite_creating_ok.replace('_directory_', directory))
  }

  if (stderr) {
    s.stop('👇🏻')
    onCancel(directory, 1, m.vite_err.replace('_stderr_', stderr))
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

export const onCancel = (name, code = 0, msg = m.cancel_op) => {
  const lang = getConfig()
  const m = messages[lang]
  const cb = () => {
    outro(m.deleted_folder.replace('_name_', name))
  }
  name && deleteDirectory(name, cb)
  cancel(msg)
  process.exit(code)
}
