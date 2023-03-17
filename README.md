# create-custom-vite

Change lang: [EN](README_EN.md)

CLI en construcción 🚧 para crear proyecto de Vite, que por el momento utiliza como base los templates oficiales: react o react-ts.

Podes elegir entre estas herramientas, algunas tienen opciones de configuración extra:

| Nombre       | Configuración         | Recomendado | Type             |
| ------------ | --------------------- | ----------- | ---------------- |
| ESLint       | Recomendada - Standar | ✅          | Linter/Formatter |
| Prettier     | Default - Ninguna     | ✅          | Formatter        |
| Husky        |                       |             | Git Hooks        |
| Lint Staged  |                       |             | Git Linter       |
| React router |                       |             | Router           |
| Wouter       |                       |             | Router           |

De esta manera no perdes tiempo y podes empezar a codear! 🤓

**NOTA**: Las opciones recomendadas (✅), están tildadas por defecto para que no las tengas que seleccionar. Mejoran tu entorno de desarrollo, ocupandose del formato del código y <span style="text-decoration: underline; text-decoration-skip-ink: auto; text-decoration-color: red;">marcando errores</span>. **Podes destildarlas**

### Configuraciones extra

**ESLint**

| **Recomendada**                                                       | Standar                                                |
| --------------------------------------------------------------------- | ------------------------------------------------------ |
| ✔ How would you like to use ESLint? · **problems**                    | [Info](https://www.npmjs.com/package/standard#install) |
| ✔ What type of modules does your project use? · **esm**               |
| ✔ Which framework does your project use? · **react**                  |
| ✔ Does your project use TypeScript? · **No 🚧** / Yes                 |
| ✔ Where does your code run? · **browser**                             |
| ✔ What format do you want your config file to be in? · **JavaScript** |

**Prettier**

| **Default**                | Ninguna |
| -------------------------- | ------- |
| [Info](PRETTIER_CONFIG.md) | {}      |

## Como usar

1. Ejecuta el siguiente comando para crear tu proyecto:

```bash
 npx create-custom-vite
```

https://user-images.githubusercontent.com/109123029/225988309-1105d2d2-b4aa-4227-90a3-4e3e03f9b0e6.mp4


2. Responde las preguntas con (y/n) o elegiendo una de las opciones.

> 💡 Si la opción esta tildada por defecto, podes utilizar **Enter**

3. Entra a la carpeta de tu nuevo proyecto y en la terminal escribí el comando `npm run dev` para verificar que funcione.

4. Podes dejar las configuraciones por defecto o modificarlas a tu gusto 🥳

## Pedir cambios o avisar de un error

Para esto podes abrir un issue con lo que te gustaría agregar al proyecto, error o configuraciones extras que quisieras que se puedan seleccionar.

## Herramientas en tu nuevo proyecto ✨

Dependiendo del template seleccionado:

- [React](https://reactjs.org/)
- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)

Dependiendo de las respuestas:

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) con:

  - Plugins:
    - [eslint:recommended](https://eslint.org/docs/latest/rules)
    - [plugin:react/recommended](https://github.com/jsx-eslint/eslint-plugin-react#list-of-supported-rules)
  - Reglas:
    - [react-in-jsx-scope](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md)

- [Husky](https://github.com/typicode/husky)
- [Lint Staged](https://github.com/okonet/lint-staged)

Routers:

- [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview)
- [Wouter](https://github.com/molefrog/wouter)

## Autora

👩🏻‍💻 [Noelia Donato](https://www.github.com/nsdonato)

## Feedback

Si tenes algún feedback, escribí a vamoacodear@gmail.com 🤗

## Colaboradorxs

<a href="https://github.com/vamoacodear/create-custom-vite/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vamoacodear/create-custom-vite" />
</a>

## Licencia


[MIT](https://choosealicense.com/licenses/mit/)
