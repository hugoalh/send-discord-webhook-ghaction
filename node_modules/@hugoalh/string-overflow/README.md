# String Overflow (NodeJS)

[⚖️ MIT](./LICENSE.md)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/string-overflow-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/string-overflow-nodejs)

|  | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/string-overflow-nodejs) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/string-overflow-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/string-overflow-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/string-overflow-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/string-overflow-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/string-overflow) | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/string-overflow/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/string-overflow/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

A NodeJS module to truncate the string with the specify length; Safe with the emojis, URLs, and words.

## 🔰 Begin

### Bun

> **🧪 Experimental:** Bun is still under development.

- **Target Version:** ^ v1.0.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/string-overflow)
    ```sh
    bun add @hugoalh/string-overflow[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/string-overflow[@<Tag>]";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

### NodeJS

- **Target Version:** >= v20.9.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/string-overflow)
    ```sh
    npm install @hugoalh/string-overflow[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/string-overflow";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

## 🧩 API

- ```ts
  class StringTruncator {
    constructor(maximumLength: number, options: StringTruncatorOptions = {}): StringTruncator;
    truncate(item: string, maximumLengthOverride?: number): string;
    static truncate(item: string, maximumLength: number, options: StringTruncatorOptions = {}): string;
  }
  ```
- ```ts
  function stringTruncate(item: string, maximumLength: number, options: StringTruncatorOptions = {}): string;
  ```
- ```ts
  interface StringTruncatorOptions extends StringDissectorOptions {
    /**
    * Ellipsis mark of the target string.
    * @default "..."
    */
    ellipsisMark?: string;
    /**
    * Ellipsis position at the target string.
    * @default "end"
    */
    ellipsisPosition?: StringTruncateEllipsisPosition | StringTruncateEllipsisPositionStringify;
  }
  ```

> **ℹ️ Notice:** Documentation is included inside the script file.

## ✍️ Example

- ```js
  import { stringTruncate, StringTruncator } from "@hugoalh/string-overflow";
  const text = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores sit. Duo iriure vel dolore illum diam. Ea vero diam diam tincidunt molestie elitr te sed nisl ut vulputate tincidunt accusam sit sed. Amet sea dolore rebum amet accusam labore dolor no sadipscing labore. Sit erat sit sed voluptua tempor sit ea dolor et.";

  /* Either */
  new StringTruncator(100).truncate(text);
  stringTruncate(text, 100);
  //=> "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores ..."

  /* Either */
  new StringTruncator(100, { safeWords: false }).truncate(text);
  stringTruncate(text, 100, { safeWords: false });
  //=> "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores si..."
  ```
