import { exec } from 'child_process'
import path from 'path'

import versions from '../config/versions.js'
import { readFile } from './files.js'

export const createViteTemplate = async (directory, answers) => {
  const { template, manager, name } = answers

  let viteCreate = `create vite ${directory}`

  // Crear el proyecto con el package manager seleccionado, para npm cambia
  if (answers.manager === 'npm') {
    viteCreate = `create vite@latest ${directory} --`
  }

  if (answers.template) {
    viteCreate += ` --template ${template}`
  }

  try {
    await exec(`${manager} ${viteCreate}`)

    console.log(`✅ Proyecto ${name} creado exitosamente`)
  } catch (error) {
    console.error(`🚨 Error al crear el proyecto: ${error.message}`)
    process.exit(1)
  }

  console.log(`✅ Instalación de ${name} completada 🚀`)
}

export const setExtraDependencies = async (directory, answers) => {
  const packageJsonPath = path.join(directory, 'package.json')

  let packageJson

  do {
    packageJson = readFile(packageJsonPath)
  } while (packageJson === undefined)

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
