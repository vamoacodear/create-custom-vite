import { outro, spinner } from '@clack/prompts'
import { exec } from 'child_process'
import { promisify } from 'node:util'
import path from 'path'

import versions from '../config/versions.js'
import { readFile } from './files.js'

const execAsync = promisify(exec)

export const installDependencies = async (directory, manager) => {
  const { stdout, stderr } = await execAsync(
    `cd ${directory} && ${manager} install`
  )

  return { stdout, stderr }
}

export const createViteTemplate = async (directory, answers) => {
  const { template, manager } = answers

  let viteCreate = `create vite ${directory}`

  // Crear el proyecto con el package manager seleccionado, para npm cambia.
  // Por ahora solo instalamos con npm
  if (answers.manager === 'npm') {
    viteCreate = `create vite@latest ${directory} --`
  }

  if (answers.template) {
    viteCreate += ` --template ${template}`
  }

  const s = spinner()
  s.start(`⏳ Ejecutando la creación del proyecto: ${directory} `)

  const { stdout, stderr } = await execAsync(`${manager} ${viteCreate}`)

  return { stdout, stderr, s }
}

export const setExtraDependencies = (directory, answers) => {
  const packageJsonPath = path.join(directory, 'package.json')

  let packageJson = readFile(packageJsonPath)

  if (answers.includeESLint) {
    packageJson.devDependencies['eslint'] = versions.eslintVersion
    packageJson.devDependencies['eslint-plugin-react'] =
      versions.eslintReactVersion
  }

  if (answers.includePrettier) {
    packageJson.devDependencies['prettier'] = versions.prettierVersion
    packageJson.devDependencies['eslint-config-prettier'] =
      versions.eslintPrettierVersion
    packageJson.devDependencies['eslint-plugin-prettier'] =
      versions.eslintPluginPrettierVersion
  }

  if (answers.includeHusky) {
    packageJson.devDependencies['husky'] = versions.huskyVersion
  }

  if (answers.includeLintStaged) {
    packageJson.devDependencies['lint-staged'] = versions.lintStagedVersion
  }

  if (answers.includeReactRouter) {
    packageJson.devDependencies['react-router-dom'] = versions.routerVersion
    packageJson.devDependencies['localforage'] = versions.routerVersion
    packageJson.devDependencies['match-sorter'] = versions.routerVersion
    packageJson.devDependencies['sort-by'] = versions.routerVersion
  }

  return packageJson
}

export function exitProgram({
  code = 0,
  message = '🏁 Cancelaste la operación.',
} = {}) {
  outro(colors.yellow(message))
  process.exit(code)
}
