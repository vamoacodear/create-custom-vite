import * as p from '@clack/prompts'
import colors from 'picocolors'

import * as m from './messages.js'
import * as o from './options.js'

export const getProjectName = async () =>
  await p.text({
    message: colors.cyan(m.PROJECT_NAME_OP),
    validate: (value) => {
      if (value.length === 0) {
        return colors.red(m.PROJECT_EMPTY_NAME)
      }
    },
  })

export const getTemplate = async () =>
  await p.select({
    message: m.TEMPLATE_OP,
    options: o.viteTemplateOptions,
    required: true,
    initialValue: 'react',
    defaultValue: 'react',
  })

export const getPackageManager = async () =>
  await p.select({
    message: m.PCKG_MNG_OP,
    options: o.packageManagerOptions,
    required: true,
    initialValue: 'yarn',
    defaultValue: 'yarn',
  })

export const getTools = async (onCancel) => {
  return await p.group(
    {
      tools: () =>
        p.multiselect({
          message: m.OPTIONAL_TOOLS_OP,
          initialValues: ['eslint', 'prettier'],
          options: o.toolsOptions,
          required: false,
        }),
      eslintConfigType: ({ results }) => {
        if (!results.includeEslint) {
          return p.select({
            message: m.ESLINT_CONFIG_OP,
            options: o.eslintOptions,
            required: false,
          })
        }
      },
      prettierConfigType: ({ results }) => {
        if (!results.includePrettier) {
          return p.select({
            message: m.PRETTIER_CONFIG_OP,
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
