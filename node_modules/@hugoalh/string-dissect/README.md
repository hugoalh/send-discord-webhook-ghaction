# String Dissect (NodeJS)

[⚖️ MIT](./LICENSE.md)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/string-dissect-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/string-dissect-nodejs)

|  | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/string-dissect-nodejs) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/string-dissect-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/string-dissect-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/string-dissect-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/string-dissect-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/string-dissect) | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/string-dissect/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/string-dissect/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

A NodeJS module to dissect the string; Safe with the emojis, URLs, and words.

## 🔰 Begin

### Bun

> **🧪 Experimental:** Bun is still under development.

- **Target Version:** ^ v1.0.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/string-dissect)
    ```sh
    bun add @hugoalh/string-dissect[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/string-dissect[@<Tag>]";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

### NodeJS

- **Target Version:** >= v20.9.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/string-dissect)
    ```sh
    npm install @hugoalh/string-dissect[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/string-dissect";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

## 🧩 API

- ```ts
  class StringDissector {
    constructor(options: StringDissectorOptions = {}): StringDissector;
    dissect(item: string, optionsOverride: StringDissectorOptions = {}): Generator<StringSegmentDescriptor>;
    dissectExtend(item: string, optionsOverride: StringDissectorOptions = {}): Generator<StringSegmentDescriptorExtend>;
    static dissect(item: string, options: StringDissectorOptions = {}): Generator<StringSegmentDescriptor>;
    static dissectExtend(item: string, options: StringDissectorOptions = {}): Generator<StringSegmentDescriptorExtend>;
  }
  ```
- ```ts
  function stringDissect(item: string, options: StringDissectorOptions = {}): Generator<StringSegmentDescriptor>;
  ```
- ```ts
  function stringDissectExtend(item: string, options: StringDissectorOptions = {}): Generator<StringSegmentDescriptorExtend>;
  ```
- ```ts
  enum StringSegmentType {
    ansi = "ansi",
    ANSI = "ansi",
    character = "character",
    Character = "character",
    emoji = "emoji",
    Emoji = "emoji",
    url = "url",
    Url = "url",
    URL = "url",
    word = "word",
    Word = "word"
  }
  ```
- ```ts
  interface StringSegmentDescriptor {
    type: StringSegmentType;
    value: string;
  }
  ```
- ```ts
  interface StringSegmentDescriptorExtend extends StringSegmentDescriptor {
    indexEnd: number;
    indexStart: number;
  }
  ```
- ```ts
  interface StringDissectorOptions {
    /**
     * The locale(s) to use in the operation; The JavaScript implementation examines locales, and then computes a locale it understands that comes closest to satisfying the expressed preference. By default, the implementation's default locale will be used. For more information, please visit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument.
     * @default undefined
     */
    locales?: StringDissectorLocales;
    /**
     * Whether to remove ANSI escape codes.
     * @default false
     */
    removeANSI?: boolean;
    /**
     * Whether to prevent URLs get splitted.
     * @default true
     */
    safeURLs?: boolean;
    /**
     * Whether to prevent words get splitted.
     * @default true
     */
    safeWords?: boolean;
  }
  ```

> **ℹ️ Notice:** Documentation is included inside the script file.

## ✍️ Example

- ```js
  import { stringDissect, StringDissector } from "@hugoalh/string-dissect";
  const sample1 = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut.";

  /* Either */
  Array.from(new StringDissector().dissect(sample1));
  Array.from(stringDissect(sample1));
  /*=>
  [
    { value: "Vel", type: "word" },
    { value: " ", type: "character" },
    { value: "ex", type: "word" },
    { value: " ", type: "character" },
    { value: "sit", type: "word" },
    { value: " ", type: "character" },
    { value: "est", type: "word" },
    { value: " ", type: "character" },
    ... +20
  ]
  */

  /* Either */
  Array.from(new StringDissector({ safeWords: false }).dissect(sample1));
  Array.from(stringDissect(sample1, { safeWords: false }));
  /*=>
  [
    { value: "V", type: "character" },
    { value: "e", type: "character" },
    { value: "l", type: "character" },
    { value: " ", type: "character" },
    { value: "e", type: "character" },
    { value: "x", type: "character" },
    { value: " ", type: "character" },
    { value: "s", type: "character" },
    ... +73
  ]
  */
  ```
- ```js
  import { stringDissect, StringDissector } from "@hugoalh/string-dissect";

  /* Either */
  Array.from(new StringDissector().dissect("GitHub homepage is https://github.com."));
  Array.from(stringDissect("GitHub homepage is https://github.com."));
  /*=>
  [
    { value: "GitHub", type: "word" },
    { value: " ", type: "character" },
    { value: "homepage", type: "word" },
    { value: " ", type: "character" },
    { value: "is", type: "word" },
    { value: " ", type: "character" },
    { value: "https://github.com", type: "url" },
    { value: ".", type: "character" }
  ]
  */
  ```
- ```js
  import { stringDissect, StringDissector } from "@hugoalh/string-dissect";

  /* Either */
  Array.from(new StringDissector().dissect("🤝💑💏👪👨‍👩‍👧‍👦👩‍👦👩‍👧‍👦🧑‍🤝‍🧑")).map((element) => { return element.value; });
  Array.from(stringDissect("🤝💑💏👪👨‍👩‍👧‍👦👩‍👦👩‍👧‍👦🧑‍🤝‍🧑")).map((element) => { return element.value; });
  //=> [ "🤝", "💑", "💏", "👪", "👨‍👩‍👧‍👦", "👩‍👦", "👩‍👧‍👦", "🧑‍🤝‍🧑" ]
  ```
