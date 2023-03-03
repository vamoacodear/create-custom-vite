import { intro, outro } from '@clack/prompts'
import fs from 'fs'
import path from 'path'

import {
  eslintDefaultConfig,
  prettierDefaultConfig,
} from '../config/pckgsConfigs.js'

export const saveFile = (dir, file) => {
  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify(file, null, 2)
  )
}

export const createDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    outro(`✅ El directorio ${directory} no existe. Se creará automáticamente.`)
    fs.mkdirSync(directory, { recursive: true })
    return true
  } else {
    outro(`🥴 El directorio ${directory} ya existe, elegí otro nombre.`)
    return false
  }
}

export const createDefaultConfigurationFiles = (
  directory,
  answers,
  packageJson
) => {
  const packageJsonPath = path.join(directory, 'package.json')

  console.log('respuestas', answers)
  if (answers.includeESLint) {
    intro(
      '📝 Voy a crear el archivo de configuración con valores por defecto para ESLint...'
    )
    const eslintConfigPath = path.resolve(directory, '.eslintrc.json')
    const eslintConfigContent = JSON.stringify(eslintDefaultConfig, null, 2)
    fs.writeFileSync(eslintConfigPath, eslintConfigContent)
  }

  if (answers.includePrettier) {
    intro(
      '📝 Voy a crear el archivo de configuración con valores por defecto para Prettier...'
    )
    const prettierConfigPath = path.resolve(directory, '.prettierrc.json')
    const prettierConfigContent = JSON.stringify(prettierDefaultConfig, null, 2)
    fs.writeFileSync(prettierConfigPath, prettierConfigContent)
  }

  if (answers.includeLintStaged) {
    intro(
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
    intro('📝 Configurando Husky para que use lint-staged...')

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

export const readFile = (path) => {
  if (fs.existsSync(path)) {
    try {
      const content = fs.readFileSync(path, 'utf8')
      return JSON.parse(content)
    } catch (error) {
      outro(`🚨 Error al leer el archivo package.json: ${error.message}`)
      process.exit(1)
    }
  }
}
