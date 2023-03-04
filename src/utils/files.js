import { intro, outro, spinner } from '@clack/prompts'
import fs from 'fs'
import path from 'path'

import {
  eslint_default,
  prettier_default,
  prettier_none,
} from '../config/pckgsConfigs.js'

const PACKAGE_JSON = 'package.json'

const saveFile = (dir, file) => {
  fs.writeFileSync(path.join(dir, PACKAGE_JSON), JSON.stringify(file, null, 2))
}

export const deleteDirectory = (directory, cb) => {
  if (fs.existsSync(directory)) {
    fs.rm(directory, () => cb())
  }
}

export const createDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    // outro(`✅ El directorio ${directory} no existe. Se creará automáticamente.`)
    fs.mkdirSync(directory, { recursive: true })
    return true
  } else {
    outro(`🥴 El directorio ${directory} ya existe, elegí otro nombre.`)
    return false
  }
}

export const getFile = (dir, file) => {
  const pathFile = path.join(dir, file)
  return readFile(pathFile)
}

export const saveContent = (dir, config, file) => {
  const pathFile = path.resolve(dir, file)
  const pathContent = JSON.stringify(config, null, 2)
  fs.writeFileSync(pathFile, pathContent)
}

export const setConfigurations = async (directory, answers) => {
  const s = spinner()

  const {
    tools: [includeESLint, includePrettier, includeHusky, includeLintStaged],
    eslintConfigType,
    prettierConfigType,
  } = answers

  const packageJson = getFile(directory, PACKAGE_JSON)

  if (includeESLint) {
    s.start('⏳ Configurando ESLint...')

    if (eslintConfigType === 'default') {
      saveContent(directory, eslint_default, '.eslintrc')
    } else {
      packageJson.eslintConfig = {
        extends: 'standard',
      }
    }
    s.stop('✅ Configuración de ESLint finalizada...')
  }

  if (includePrettier) {
    s.start('⏳ Configurando Prettier')

    const prettierConfig =
      prettierConfigType === 'default' ? prettier_default : prettier_none

    saveContent(directory, prettierConfig, '.prettierrc')

    s.stop('✅ Configuración de Prettier finalizada!')
  }

  if (includeLintStaged) {
    s.start('⏳ Configurando lint-staged en package.json')

    if (!packageJson.scripts) {
      packageJson.scripts = {}
    }

    packageJson.scripts['lint-staged'] = 'lint-staged'

    packageJson['lint-staged'] = {
      './*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
      './*.{json,css,md}': ['prettier --write'],
    }

    s.stop('✅ Lint Staged configurado!')
  }

  if (includeHusky) {
    s.start('⏳ Configurando Husky para que corra lint-staged')

    const huskyDirectory = path.resolve(directory, '.husky')
    createDirectory(huskyDirectory)

    const huskyConfigPath = path.resolve(directory, '.husky', 'pre-commit')
    const huskyConfigContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged`
    fs.writeFileSync(huskyConfigPath, huskyConfigContent)

    s.stop('✅ Husky configurado!')
  }

  s.start('⏳ Guardando cambios en package.json')
  saveFile(directory, packageJson)
  s.stop('✅ Cambios guardado en package.json')
}

export const readFile = (path) => {
  if (fs.existsSync(path)) {
    try {
      const content = fs.readFileSync(path, 'utf8')
      return JSON.parse(content)
    } catch (error) {
      outro(`🚨 ${error.message}`)
      process.exit(1)
    }
  }
}
