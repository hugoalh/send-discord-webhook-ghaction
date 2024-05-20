# String Dissect (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/string-dissect-es](https://img.shields.io/github/v/release/hugoalh-studio/string-dissect-es?label=hugoalh-studio/string-dissect-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/string-dissect-es")](https://github.com/hugoalh-studio/string-dissect-es)
[![JSR: @hugoalh/string-dissect](https://img.shields.io/jsr/v/@hugoalh/string-dissect?label=JSR%20@hugoalh/string-dissect&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/string-dissect")](https://jsr.io/@hugoalh/string-dissect)
[![NPM: @hugoalh/string-dissect](https://img.shields.io/npm/v/@hugoalh/string-dissect?label=@hugoalh/string-dissect&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/string-dissect")](https://www.npmjs.com/package/@hugoalh/string-dissect)

An ES (JavaScript & TypeScript) module to dissect the string; Safe with the emojis, URLs, and words.

## 🔰 Begin

### 🎯 Targets

|  | **Registry - JSR** | **Registry - NPM** | **Remote Import** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | [✔️ `node_modules`](https://jsr.io/docs/npm-compatibility) | [✔️ Specifier `npm:`](https://bun.sh/docs/runtime/autoimport) | ❌ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | [✔️ `node_modules`](https://jsr.io/docs/with/cloudflare-workers) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |
| **[Deno](https://deno.land/)** >= v1.42.0 | [✔️ Specifier `jsr:`](https://jsr.io/docs/with/deno) | [✔️ Specifier `npm:`](https://docs.deno.com/runtime/manual/node/npm_specifiers) | [✔️](https://docs.deno.com/runtime/manual/basics/modules/#remote-import) |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | [✔️ `node_modules`](https://jsr.io/docs/with/node) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |

> **ℹ️ Note**
>
> It is possible to use this module in other methods/ways which not listed in here, however it is not officially supported.

### #️⃣ Registries Identifier

- **JSR:**
  ```
  @hugoalh/string-dissect
  ```
- **NPM:**
  ```
  @hugoalh/string-dissect
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to use this module with tag for immutability.

### #️⃣ Remote Import Paths

- **GitHub Raw:** (Require Tag)
  ```
  https://raw.githubusercontent.com/hugoalh-studio/string-dissect-es/${Tag}/mod.ts
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - Although there have 3rd party services which provide enhanced, equal, or similar methods/ways to remote import the module, beware these services maybe inject unrelated elements and thus affect the security.

### 🛡️ Permissions

*This module does not require any permission.*

## 🧩 APIs

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
  function dissectString(item: string, options: StringDissectorOptions = {}): Generator<StringSegmentDescriptor>;
  ```
- ```ts
  function dissectStringExtend(item: string, options: StringDissectorOptions = {}): Generator<StringSegmentDescriptorExtend>;
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
- ```ts
  interface StringSegmentDescriptor {
    type: `${StringSegmentType}`;
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
  type StringDissectorLocales = ConstructorParameters<typeof Intl.Segmenter>[0];
  ```

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [JSR](https://jsr.io/@hugoalh/string-dissect)

## ✍️ Examples

- ```ts
  const sample1 = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut.";

  /* Either */
  Array.from(new StringDissector().dissect(sample1));
  Array.from(dissectString(sample1));
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
  Array.from(dissectString(sample1, { safeWords: false }));
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
- ```ts
  /* Either */
  Array.from(new StringDissector().dissect("GitHub homepage is https://github.com."));
  Array.from(dissectString("GitHub homepage is https://github.com."));
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
- ```ts
  /* Either */
  Array.from(new StringDissector().dissect("🤝💑💏👪👨‍👩‍👧‍👦👩‍👦👩‍👧‍👦🧑‍🤝‍🧑")).map((element) => { return element.value; });
  Array.from(dissectString("🤝💑💏👪👨‍👩‍👧‍👦👩‍👦👩‍👧‍👦🧑‍🤝‍🧑")).map((element) => { return element.value; });
  //=> [ "🤝", "💑", "💏", "👪", "👨‍👩‍👧‍👦", "👩‍👦", "👩‍👧‍👦", "🧑‍🤝‍🧑" ]
  ```
