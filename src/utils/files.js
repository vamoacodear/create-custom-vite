import { spinner } from '@clack/prompts'
import fs from 'fs'
import path from 'path'

import * as m from '../config/messages.js'
import * as pc from '../config/packageConfig.js'
import { onCancel } from '../utils/utils.js'

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
  const {
    tools: [includeESLint, includePrettier, includeHusky, includeLintStaged],
    eslintConfigType,
    prettierConfigType,
  } = answers

  const packageJson = getContentFile(directory, PACKAGE_JSON)

  if (includeESLint) {
    s.start(m.CONFIG_ESLINT_SP)

    if (eslintConfigType === 'default') {
      saveContent(directory, pc.ESLINT_DEFAULT, '.eslintrc')
    } else {
      packageJson.eslintConfig = {
        extends: 'standard',
      }
    }
    s.stop(m.CONFIG_ESLINT_OK)
  }

  if (includePrettier) {
    s.start(m.CONFIG_PRETTIER_SP)

    const prettierConfig =
      prettierConfigType === 'default' ? pc.PRETTIER_DEFAULT : pc.PRETTIER_NONE

    saveContent(directory, prettierConfig, '.prettierrc')

    s.stop(m.CONFIG_ESLINT_OK)
  }

  if (includeLintStaged) {
    s.start(m.CONFIG_LINTSTG_SP)

    packageJson.scripts['lint-staged'] = 'lint-staged'

    packageJson['lint-staged'] = pc.LINTSTG_DEFAULT

    s.stop(m.CONFIG_LINTSTG_OK)
  }

  if (includeHusky) {
    s.start(m.CONFIG_HUSKY_SP)

    const huskyDirectory = path.resolve(directory, '.husky')
    createDirectory(huskyDirectory)

    const huskyConfigPath = path.resolve(directory, '.husky', 'pre-commit')
    const huskyConfigContent = pc.HUSKY_DEFAULT
    fs.writeFileSync(huskyConfigPath, huskyConfigContent)

    s.stop(m.CONFIG_HUSKY_OK)
  }

  s.start(m.SAVE_CHANGES_PJSON)
  if (manager === 'yarn') packageJson['license'] = 'UNLICENSED'
  saveFile(directory, packageJson)
  s.stop(m.SAVED_CHANGES_PJSON)
}

export const readFile = (path) => {
  if (fs.existsSync(path)) {
    try {
      const content = fs.readFileSync(path, 'utf8')
      return JSON.parse(content)
    } catch (error) {
      s.stop('👇🏻')
      onCancel(
        path,
        1,
        m.READ_FILE_ERR.replace('_path_', path).replace('_msg_', error.message)
      )
    }
  }
}
