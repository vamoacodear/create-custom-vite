import * as p from '@clack/prompts'
import colors from 'picocolors'

import { messages } from './config/lang.js'
import * as q from './config/questions.js'
import getConfig, * as f from './utils/files.js'
import * as u from './utils/utils.js'

async function run() {
  const lang = getConfig()
  const m = messages[lang]
  p.intro(m.welcome)

  const name = await q.getProjectName()
  if (p.isCancel(name)) u.onCancel()

  const template = await q.getTemplate()
  if (p.isCancel(template)) u.onCancel()

  const manager = await q.getPackageManager()
  if (p.isCancel(manager)) u.onCancel()

  await u.createViteTemplate(name, {
    template,
    manager,
  })

  const answers = await q.getTools(() => u.onCancel(name))

  f.setConfigurations(name, answers, manager)
  const packages = u.getPackagesToInstall(answers)

  const installPackages = await p.confirm({
    message: m.install_pckgs_op,
  })
  if (p.isCancel(installPackages)) u.onCancel(name)

  if (installPackages) {
    await u.installDependencies(name, manager, packages)
  }

  const cmdNpm = 'run'

  let nextSteps = `cd ${name}        \n${
    installPackages ? '' : `${manager} install\n`
  }${manager} ${cmdNpm} dev`

  p.note(nextSteps, m.finish)

  p.outro(m.thanks.replace('_vamoacodear_', colors.magenta('@vamoacodear')))
}

;(async () => {
  f.setConfig()
  await run()
})()
