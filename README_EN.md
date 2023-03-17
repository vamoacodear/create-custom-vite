# create-custom-vite

Cambia el lenguaje: [ES](README.md)

CLI under construction 🚧 to create Vite project, that for the moment uses as base the official templates: react or react-ts.

You can choose between these tools, some of them have extra configuration options:

| Name         | Configuration         | Recommended | Type             |
| ------------ | --------------------- | ----------- | ---------------- |
| ESLint       | Recommended - Standar | ✅          | Linter/Formatter |
| Prettier     | Default - None        | ✅          | Formatter        |
| Husky        |                       |             | Git Hooks        |
| Lint Staged  |                       |             | Git Linter       |
| React router |                       |             | Router           |
| Wouter       |                       |             | Router           |

This way you don't waste any time and you can start coding! 🤓

**NOTE**: The recommended options (✅), are checked by default so you don't have to select them. They improve your development environment, taking care of code formatting and <span style="text-decoration: underline; text-decoration-skip-ink: auto; text-decoration-color: red;">checking errors</span>. \*\*You can unpick them

### Extra settings

**ESLint**

| Recommended\*\* **Recommended**                                       | Standard                                               |
| --------------------------------------------------------------------- | ------------------------------------------------------ |
| How would you like to use ESLint? - **problems**                      | [Info](https://www.npmjs.com/package/standard#install) |
| ✔ What type of modules does your project use? - **esm**               |                                                        |
| ✔ Which framework does your project use? - **react**                  |                                                        |
| Does your project use TypeScript? - **No 🚧** / Yes                   |                                                        |
| ✔ Where does your code run? - **browser**                             |                                                        |
| ✔ What format do you want your config file to be in? - **JavaScript** |                                                        |

**Prettier**

| **Default**                | None |
| -------------------------- | ---- | --- |
| [Info](PRETTIER_CONFIG.md) | {}   |     |

## How to use

1. Run the following command to create your project:

```bash
 npx create-custom-vite --en
```

2. Answer the questions with (y/n) or by choosing one of the options.

> 💡 If the option is checked by default, you can use **Enter**.

3. Enter your new project folder and in the terminal type the command `npm run dev` to verify that it works.

4. You can leave the default settings or modify them to your liking 🥳

## Ask for changes or report an error

For this you can open an issue with what you would like to add to the project, bug or extra settings you would like to be selectable.

## Tools in your new project ✨

Depending on the template selected:

- [React](https://reactjs.org/)
- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)

Depending on the responses:

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with:

  - Plugins:
    - [eslint:recommended](https://eslint.org/docs/latest/rules)
    - [plugin:react/recommended](https://github.com/jsx-eslint/eslint-plugin-react#list-of-supported-rules)
  - Rules:
    - [react-in-jsx-scope](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md)

- [Husky](https://github.com/typicode/husky)
- [Lint Staged](https://github.com/okonet/lint-staged)

Routers:

- [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview)
- [Wouter](https://github.com/molefrog/wouter)

## Author

👩🏻‍💻 [Noelia Donato](https://www.github.com/nsdonato)

## Feedback

If you have any feedback, please write to vamoacodear@gmail.com 🤗

## Contributors

<a href="https://github.com/vamoacodear/create-custom-vite/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vamoacodear/create-custom-vite" />
</a>

## License

[MIT](https://choosealicense.com/licenses/mit/)
