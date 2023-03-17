import { spinner } from '@clack/prompts'
import fs from 'fs'
import os from 'os'
import path from 'path'

import { messages } from '../config/lang.js'
import * as pc from '../config/packageConfig.js'
import * as u from '../utils/utils.js'

const PACKAGE_JSON = 'package.json'
const s = spinner()

const saveFile = (dir, file) => {
  fs.writeFileSync(path.join(dir, PACKAGE_JSON), JSON.stringify(file, null, 2))
}

export const deleteDirectory = (directory, cb) => {
  if (fs.existsSync(directory)) {
    fs.rmdirSync(directory, { recursive: true })
    cb()
  }
}

export const createDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
    return true
  }
  return false
}

export const getContentFile = (dir, file) => {
  const pathFile = path.join(dir, file)
  return readFile(pathFile)
}

export const saveContent = (dir, config, file) => {
  const pathFile = path.resolve(dir, file)
  const pathContent = JSON.stringify(config, null, 2)
  fs.writeFileSync(pathFile, pathContent)
}

export const setConfigurations = (directory, answers, manager) => {
  const lang = getConfig()
  const m = messages[lang]
  const {
    tools: [includeESLint, includePrettier, includeHusky, includeLintStaged],
    eslintConfigType,
    prettierConfigType,
  } = answers

  const packageJson = getContentFile(directory, PACKAGE_JSON)

  if (includeESLint) {
    s.start(m.config_eslint_sp)

    if (eslintConfigType === 'default') {
      saveContent(directory, pc.ESLINT_DEFAULT, '.eslintrc')
    } else {
      packageJson.eslintConfig = {
        extends: 'standard',
      }
    }
    s.stop(m.config_eslint_ok)
  }

  if (includePrettier) {
    s.start(m.config_prettier_sp)

    const prettierConfig =
      prettierConfigType === 'default' ? pc.PRETTIER_DEFAULT : pc.PRETTIER_NONE

    saveContent(directory, prettierConfig, '.prettierrc')

    s.stop(m.config_prettier_ok)
  }

  if (includeLintStaged) {
    s.start(m.config_lintstg_sp)

    packageJson.scripts['lint-staged'] = 'lint-staged'

    packageJson['lint-staged'] = pc.LINTSTG_DEFAULT

    s.stop(m.config_lintstg_ok)
  }

  if (includeHusky) {
    s.start(m.config_husky_sp)

    const huskyDirectory = path.resolve(directory, '.husky')
    createDirectory(huskyDirectory)

    const huskyConfigPath = path.resolve(directory, '.husky', 'pre-commit')
    const huskyConfigContent = pc.HUSKY_DEFAULT
    fs.writeFileSync(huskyConfigPath, huskyConfigContent)

    s.stop(m.config_husky_ok)
  }

  s.start(m.saving_changes_pjson)
  if (manager === 'yarn') packageJson['license'] = 'UNLICENSED'
  saveFile(directory, packageJson)
  s.stop(m.saved_changes_pjson)
}

export const readFile = (path) => {
  const lang = getConfig()
  const m = messages[lang]
  if (fs.existsSync(path)) {
    try {
      const content = fs.readFileSync(path, 'utf8')
      return JSON.parse(content)
    } catch (error) {
      s.stop('👇🏻')
      u.onCancel(
        path,
        1,
        m.read_file_err.replace('_path_', path).replace('_msg_', error.message)
      )
    }
  }
}

export const setConfig = () => {
  const args = process.argv.slice(2)

  let language = 'es'

  if (args.includes('--en')) {
    language = 'en'
  }

  const configDir = path.join(os.homedir(), '.create-custom-vite')
  const configFile = path.join(configDir, 'config.json')

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir)
  }

  if (!fs.existsSync(configFile)) {
    fs.writeFileSync(configFile, JSON.stringify({ language: language }))
  } else {
    const currentConfig = JSON.parse(fs.readFileSync(configFile))
    const newConfig = { language: language }
    const updatedConfig = { ...currentConfig, ...newConfig }
    fs.writeFileSync(configFile, JSON.stringify(updatedConfig))
  }
}

export default function getConfig() {
  const configDir = path.join(os.homedir(), '.create-custom-vite')
  const configFile = path.join(configDir, 'config.json')
  const config = JSON.parse(fs.readFileSync(configFile))
  return config.language
}
