import * as p from '@clack/prompts'

import * as m from './config/messages.js'
import * as q from './config/questions.js'
import * as f from './utils/files.js'
import * as u from './utils/utils.js'

p.intro(m.WELCOME)

let name

name = await q.getProjectName()
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
  message: m.INSTALL_PCKGS_OP,
})
if (p.isCancel(installPackages)) u.onCancel(name)

if (installPackages) {
  await u.installDependencies(name, manager, packages)
}

const cmdNpm = 'run'

let nextSteps = `cd ${name}        \n${
  installPackages ? '' : `${manager} install\n`
}${manager} ${cmdNpm} dev`

p.note(nextSteps, m.FINISH)

p.outro(m.THANKS)
