import colors from 'picocolors'

const PROJECT_NAME_OP = '1️⃣  Ponele nombre a tu proyecto:'
const PROJECT_EMPTY_NAME = '⚠️ El mensaje no puede estar vacío'

const CANCEL_OP = '🫢   Cancelaste la operación.'
const TEMPLATE_OP = '2️⃣  Seleccioná el template de Vite:'
const PCKG_MNG_OP = '3️⃣  Seleccioná el manejador de paquetes:'
const INSTALL_PCKGS_OP = '🪄  ¿Instalamos los paquetes?'
const OPTIONAL_TOOLS_OP = `💡¿Agregamos otras herramientas?`
const ESLINT_CONFIG_OP = '🤔 ¿Que tipo de configuración queres para ESLint?'
const PRETTIER_CONFIG_OP = `🤔 ¿Que tipo de configuración queres para Prettier?`

const CONFIG_ESLINT_SP = '⏳ Configurando ESLint...'
const CONFIG_ESLINT_OK = '✅ ESLint configurado!'

const CONFIG_PRETTIER_SP = '⏳ Configurando Prettier...'
const CONFIG_PRETTIER_OK = '✅ Prettier configurado!'

const CONFIG_LINTSTG_SP = '⏳ Configurando Lint Staged...'
const CONFIG_LINTSTG_OK = '✅ Lint Staged configurado!'

const CONFIG_HUSKY_SP = '⏳ Configurando Husky'
const CONFIG_HUSKY_OK = '✅ Husky configurado!'

const INTALLING_PCKGS_SP = `⏳ Instalando paquetes via _manager_... puede tardar unos segundos!`
const INTALLING_PCKGS_OK = '✅ Instalación finalizada'
const INSTALLING_ERR = `🚨 Error instalando dependencias: _stderr_`

const EXIST_DIR = `🥴 El directorio _name_ ya existe, elegí otro nombre.`
const SAVING_CHANGES_PJSON = '⏳ Guardando cambios en package.json'
const SAVED_CHANGES_PJSON = '✅ Cambios guardados en package.json'
const READ_FILE_ERR = `🚨 Error leyendo el archivo _path_: _msg`
const DELETED_FOLDER = `🗑️ El directorio _name_ se borró con exito.`

const VITE_CREATING_SP = `⏳ Ejecutando la creación del proyecto: _directory_ `
const VITE_CREATING_OK = `✅ Proyecto _directory_ creado exitosamente`
const VITE_ERR = `🚨 Error creando el template de Vite: _stderr_`

const WELCOME = `Hola 🤗 vamo' a crear tu nuevo proyecto Vite personalizado!...`
const FINISH = '🥳 Tu proyecto está listo para usar! Seguí estos pasos'
const THANKS = `Si te sirvió el proyecto, dejale una ⭐️ al repo https://github.com/vamoacodear/create-custom-vite
Gracias 💜 ${colors.magenta(`@vamoacodear`)}`

export {
  PROJECT_EMPTY_NAME,
  PROJECT_NAME_OP,
  CANCEL_OP,
  TEMPLATE_OP,
  PCKG_MNG_OP,
  INSTALL_PCKGS_OP,
  OPTIONAL_TOOLS_OP,
  ESLINT_CONFIG_OP,
  PRETTIER_CONFIG_OP,
  CONFIG_ESLINT_SP,
  CONFIG_ESLINT_OK,
  CONFIG_PRETTIER_SP,
  CONFIG_PRETTIER_OK,
  CONFIG_LINTSTG_SP,
  CONFIG_LINTSTG_OK,
  CONFIG_HUSKY_SP,
  CONFIG_HUSKY_OK,
  INTALLING_PCKGS_SP,
  INTALLING_PCKGS_OK,
  INSTALLING_ERR,
  EXIST_DIR,
  SAVING_CHANGES_PJSON,
  SAVED_CHANGES_PJSON,
  READ_FILE_ERR,
  DELETED_FOLDER,
  VITE_CREATING_SP,
  VITE_CREATING_OK,
  VITE_ERR,
  WELCOME,
  FINISH,
  THANKS,
}
