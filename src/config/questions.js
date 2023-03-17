import * as p from '@clack/prompts'
import colors from 'picocolors'

import getConfig from '../utils/files.js'
import { messages } from './lang.js'
import * as o from './options.js'

export async function getProjectName() {
  const lang = getConfig()
  const m = messages[lang]
  return await p.text({
    message: colors.cyan(m.project_name_op),
    validate: (value) => {
      if (value.length === 0) {
        return colors.red(m.project_empty_name)
      }
    },
  })
}

export const getTemplate = async () => {
  const lang = getConfig()
  const m = messages[lang]
  return await p.select({
    message: m.template_op,
    options: o.viteTemplateOptions,
    required: true,
    initialValue: 'react',
    defaultValue: 'react',
  })
}

export const getPackageManager = async () => {
  const lang = getConfig()
  const m = messages[lang]
  return await p.select({
    message: m.pckg_mng_op,
    options: o.packageManagerOptions,
    required: true,
    initialValue: 'pnpm',
    defaultValue: 'pnpm',
  })
}

export const getTools = async (onCancel) => {
  const lang = getConfig()
  const m = messages[lang]
  return await p.group(
    {
      tools: () =>
        p.multiselect({
          message: m.optional_tools_op,
          initialValues: ['eslint', 'prettier'],
          options: o.toolsOptions,
          required: false,
        }),
      eslintConfigType: ({ results }) => {
        if (!results.includeEslint) {
          return p.select({
            message: m.eslint_config_op,
            options: o.eslintOptions,
            required: false,
          })
        }
      },
      prettierConfigType: ({ results }) => {
        if (!results.includePrettier) {
          return p.select({
            message: m.prettier_config_op,
            options: o.prettierOptions,
            required: false,
          })
        }
      },
    },
    {
      onCancel,
    }
  )
}
