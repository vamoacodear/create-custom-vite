import { exec } from 'child_process'
import inquirer from 'inquirer'

import answersOptions from './config/answers.js'
import {
  createDefaultConfigurationFiles,
  createDirectory,
  saveFile,
} from './utils/files.js'
import { createViteTemplate, setExtraDependencies } from './utils/utils.js'

console.log(`Hola 🤗 vamo' a customizar Vite!
`)

export async function run() {
  const answers = await inquirer.prompt(answersOptions)

  console.log(`🚀 Iniciando el proceso del proyecto ${answers.name}`)

  await exec('nvm use')

  const directory = answers.directory || answers.name

  createDirectory(directory)

  await createViteTemplate(directory, answers)

  const packageJson = await setExtraDependencies(directory, answers)

  createDefaultConfigurationFiles(directory, answers, packageJson)

  console.log('⏳ Guardando cambios en package.json')

  await saveFile(directory, packageJson)

  try {
    console.log('⏳ Instalando paquetes... puede tardar unos segundos!')

    exec(
      `cd ${directory} && ${answers.manager} install`,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error, stdout, stderr) => {
        if (error) {
          console.error(`🚨 Error al instalar paquetes: ${error}`)
          return
        }
        console.info(stdout)

        console.log(
          `🥳 Ya podes entrar al directorio ${answers.name} para comenzar tu proyecto 🚀`
        )
      }
    )
  } catch (error) {
    console.error(`🚨 Error al instalar paquetes: ${error}`)
    process.exit(1)
  }
}

// eslint-disable-next-line @typescript-eslint/no-extra-semi
;(async () => {
  try {
    await run()
  } catch (e) {
    console.error(e)
  }
})()
