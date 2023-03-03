import { trytm } from '@bdsqqq/try'
import { intro, outro, spinner } from '@clack/prompts'
import * as p from '@clack/prompts'
import colors from 'picocolors'

import * as q from './config/questions.js'
import * as f from './utils/files.js'
import * as u from './utils/utils.js'

intro(`Hola 🤗 vamo' a crear un proyecto Vite personalizado!`)

let created = false
let name

do {
  name = await q.getProjectName()
  if (p.isCancel(name)) u.exitProgram()
  created = f.createDirectory(name)
} while (!created)

const template = await q.getTemplate()
if (p.isCancel(template)) u.exitProgram()

const manager = await q.getPackageManager()
if (p.isCancel(manager)) u.exitProgram()

const { stdout, stderr, s } = await u.createViteTemplate(name, {
  name,
  template,
  manager,
})

if (stdout) {
  s.stop(`✅ Proyecto ${name} creado exitosamente`)
}

if (stderr) {
  s.stop(`🚨 Error al crear el proyecto: ${error.message}`)
  process.exit(1)
}

const includeESLint = await q.getEslintConfig()
if (p.isCancel(includeESLint)) u.exitProgram()

const includePrettier = await q.getPrettiertConfig()
if (p.isCancel(includePrettier)) u.exitProgram()

const includeHusky = await q.getHuskyConfig()
if (p.isCancel(includeHusky)) u.exitProgram()

const includeLintStaged = await q.getLintStagedConfig()
if (p.isCancel(includeLintStaged)) u.exitProgram()

const includeReactRouter = await q.getRouter()
if (p.isCancel(includeReactRouter)) u.exitProgram()

const installPackages = await p.confirm({
  message: '🪄  ¿Instalamos los paquetes?',
})
if (p.isCancel(installPackages)) u.exitProgram()

const answers = {
  includeESLint,
  includePrettier,
  includeHusky,
  includeLintStaged,
  includeReactRouter,
}

const packageJson = u.setExtraDependencies(name, answers)

f.createDefaultConfigurationFiles(name, answers, packageJson)

intro('⏳ Guardando cambios en package.json')
await f.saveFile(name, packageJson)

if (installPackages) {
  const s = spinner()
  s.start(
    `⏳ Instalando paquetes via ${manager}... puede tardar unos segundos!`
  )
  const [installDeps, errorInstallDeps] = await trytm(
    u.installDependencies(name, manager)
  )

  if (installDeps) {
    s.stop('✅ Instalación finalizada')
  }

  if (errorInstallDeps) {
    s.stop(`🚨 Error al instalar paquetes: ${errorInstallDeps}`)
    process.exit(1)
  }
}

let nextSteps = `cd ${name}        \n${
  installPackages ? '' : `${manager} install\n`
}npm run dev`

p.note(nextSteps, 'Proximos pasos')

outro(
  colors.inverse(
    `🥳 Entrá al directorio ${name} y ${colors.magenta('@vamoacodear 👩🏻‍💻')} `
  )
)
