import { intro, outro, spinner } from '@clack/prompts'
import * as p from '@clack/prompts'
import colors from 'picocolors'

import * as q from './config/questions.js'
import * as f from './utils/files.js'
import * as u from './utils/utils.js'

const s = spinner()
intro(`Hola 🤗 vamo' a crear tu nuevo proyecto Vite personalizado!...`)

let created = false
let name

do {
  name = await q.getProjectName()
  if (p.isCancel(name)) u.exitProgram()
  created = f.createDirectory(name)
} while (!created)

const template = await q.getTemplate()
if (p.isCancel(template)) u.exitProgram({ name })

const manager = await q.getPackageManager()
if (p.isCancel(manager)) u.exitProgram({ name })

await u.createViteTemplate(name, {
  template,
  manager,
})

const answers = await q.getTools()
if (p.isCancel(answers)) u.exitProgram({ name })

f.setConfigurations(name, answers)
const packages = u.getPackagesToInstall(answers)

const installPackages = await p.confirm({
  message: '🪄  ¿Instalamos los paquetes?',
})
if (p.isCancel(installPackages)) u.exitProgram({ name })

if (installPackages) {
  await u.installDependencies(name, manager, packages)
}

let nextSteps = `cd ${name}        \n${
  installPackages ? '' : `${manager} install\n`
}npm run dev`

p.note(nextSteps, '🥳 Tu proyecto está listo para usar! Seguí estos pasos')

outro(
  `Si te sirvió el proyecto, dejale una ⭐️ al repo https://github.com/vamoacodear/create-custom-vite
   Gracias 💜 ${colors.magenta(`@vamoacodear`)}`
)
