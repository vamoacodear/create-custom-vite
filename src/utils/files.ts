import fs from 'fs'
import path from 'path'

import {
  eslintDefaultConfig,
  prettierDefaultConfig,
} from '../config/pckgsConfigs.js'

export const saveFile = (dir: string, file: unknown) => {
  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify(file, null, 2)
  )
}

export const createDirectory = (directory: fs.PathLike) => {
  try {
    if (!fs.existsSync(directory)) {
      console.log(
        `✅ El directorio ${directory} no existe. Se creará automáticamente.`
      )
      fs.mkdirSync(directory, { recursive: true })
    } else {
      console.log(`🫠  El directorio ${directory} ya existe.`)
      process.exit(1)
    }
  } catch (error: any) {
    console.error(`🚨 Error al crear el directorio: ${error.message}`)
    process.exit(1)
  }
}

export const createDefaultConfigurationFiles = (
  directory: string,
  answers: {
    includeESLint: any
    includePrettier: any
    includeLintStaged: any
    includeHusky: any
  },
  packageJson: { scripts: { [x: string]: string } }
) => {
  const packageJsonPath = path.join(directory, 'package.json')

  if (answers.includeESLint) {
    console.log(
      '📝 Voy a crear el archivo de configuración con valores por defecto para ESLint...'
    )
    const eslintConfigPath = path.resolve(directory, '.eslintrc.json')
    const eslintConfigContent = JSON.stringify(eslintDefaultConfig, null, 2)
    fs.writeFileSync(eslintConfigPath, eslintConfigContent)
  }

  if (answers.includePrettier) {
    console.log(
      '📝 Voy a crear el archivo de configuración con valores por defecto para Prettier...'
    )
    const prettierConfigPath = path.resolve(directory, '.prettierrc.json')
    const prettierConfigContent = JSON.stringify(prettierDefaultConfig, null, 2)
    fs.writeFileSync(prettierConfigPath, prettierConfigContent)
  }

  if (answers.includeLintStaged) {
    console.log(
      '📝 Voy a crear el archivo de configuración con valores por defecto para lint-staged...'
    )
    const lintStagedConfigPath = path.resolve(directory, '.lintstagedrc.json')
    const lintStagedConfigContent = JSON.stringify(
      {
        './*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
        './*.{json,css,md}': ['prettier --write'],
      },
      null,
      2
    )
    fs.writeFileSync(lintStagedConfigPath, lintStagedConfigContent)
  }

  if (answers.includeHusky) {
    console.log('📝 Voy a configurar Husky para que use lint-staged...')

    if (!packageJson.scripts) {
      packageJson.scripts = {}
    }
    packageJson.scripts['lint-staged'] = 'lint-staged'
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

    const huskyDirectory = path.resolve(directory, '.husky')
    if (!fs.existsSync(huskyDirectory)) {
      fs.mkdirSync(huskyDirectory)
    }

    const huskyConfigPath = path.resolve(directory, '.husky', 'pre-commit')
    const huskyConfigContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged`
    fs.writeFileSync(huskyConfigPath, huskyConfigContent)
  }
}

export const readFile = (path: fs.PathLike) => {
  if (fs.existsSync(path)) {
    try {
      const content = fs.readFileSync(path, 'utf8')
      return JSON.parse(content)
    } catch (error: any) {
      console.error(
        `🚨 Error al leer el archivo package.json: ${error.message}`
      )
      process.exit(1)
    }
  }
}
