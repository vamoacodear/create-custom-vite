# create-custom-vite

Es un CLI que utiliza como base los templates de Vite oficiales: react o react-ts

te configura un proyecto Vite nuevo (react/react-ts) con herramientas como eslint, prettier, husky, lint-staged, etc. Con archivos de configuración _por defecto_ para que no pierdas tiempo y comiences a codear! 🤓

**Nota**: El proyecto es un mvp 🚧 , si bien es funcional se irá mejorando con su feedback 💜.

## Como usar

1. Ejecuta el siguiente comando para crear tu proyecto:

```bash
 npx create-custom-vite
```

2. Responde las preguntas con (y/n) o elegiendo una de las opciones.

> 💡 Podes presionar _Enter_ en vez de _y_

3. Entra a la carpeta de tu nuevo proyecto y en la terminal escribí el comando `npm run dev` para verificar que funcione.

4. Podes dejar las configuraciones por defecto o modificarlas a tu gusto 🥳

## Pedir cambios o avisar de un error

Para esto podes abrir un issue con lo que te gustaría agregar al proyecto, error o configuraciones extras que quisieras que se pudan seleccionar.

## Herramientas en tu nuevo proyecto ✨

Dependiendo del template seleccionado:

- [React](https://reactjs.org/) solo o con [TypeScript](https://www.typescriptlang.org/)

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
