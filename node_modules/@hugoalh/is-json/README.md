# Is JSON (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/is-json-es](https://img.shields.io/github/v/release/hugoalh-studio/is-json-es?label=hugoalh-studio/is-json-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/is-json-es")](https://github.com/hugoalh-studio/is-json-es)
[![JSR: @hugoalh/is-json](https://img.shields.io/jsr/v/@hugoalh/is-json?label=JSR%20@hugoalh/is-json&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/is-json")](https://jsr.io/@hugoalh/is-json)
[![NPM: @hugoalh/is-json](https://img.shields.io/npm/v/@hugoalh/is-json?label=@hugoalh/is-json&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/is-json")](https://www.npmjs.com/package/@hugoalh/is-json)

An ES (JavaScript & TypeScript) module to determine whether the item is a JSON.

## 🔰 Begin

### 🎯 Targets

|  | **Registry - JSR** | **Registry - NPM** | **Remote Import** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | [✔️ `node_modules`](https://jsr.io/docs/npm-compatibility) | [✔️ Specifier `npm:`](https://bun.sh/docs/runtime/autoimport) | ❌ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | [✔️ `node_modules`](https://jsr.io/docs/with/cloudflare-workers) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |
| **[Deno](https://deno.land/)** >= v1.42.0 | [✔️ Specifier `jsr:`](https://jsr.io/docs/with/deno) | [✔️ Specifier `npm:`](https://docs.deno.com/runtime/manual/node/npm_specifiers) | [✔️](https://docs.deno.com/runtime/manual/basics/modules/#remote-import) |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | [✔️ `node_modules`](https://jsr.io/docs/with/node) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |

> **ℹ️ Note**
>
> It is possible to use this module in other methods/ways which not listed in here, however it is not officially supported.

### #️⃣ Registries Identifier

- **JSR:**
  ```
  @hugoalh/is-json
  ```
- **NPM:**
  ```
  @hugoalh/is-json
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to use this module with tag for immutability.

### #️⃣ Remote Import Paths

- **GitHub Raw:** (Require Tag)
  ```
  https://raw.githubusercontent.com/hugoalh-studio/is-json-es/${Tag}/mod.ts
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
  function isJSON(item: unknown): item is JSONValue;
  ```
- ```ts
  function isJSONArray(item: unknown): item is JSONArray;
  ```
- ```ts
  function isJSONObject(item: unknown): item is JSONObject;
  ```
- ```ts
  function isJSONPrimitive(item: unknown): item is JSONPrimitive;
  ```
- ```ts
  type JSONArray = JSONValue[];
  ```
- ```ts
  type JSONArrayExtend = JSONValueExtend[] | readonly JSONValueExtend[];
  ```
- ```ts
  type JSONObject = { [key: string]: JSONValue; };
  ```
- ```ts
  type JSONObjectExtend = { [key: string]: JSONValueExtend; };
  ```
- ```ts
  type JSONPrimitive = boolean | number | string | null;
  ```
- ```ts
  type JSONValue = JSONArray | JSONObject | JSONPrimitive;
  ```
- ```ts
  type JSONValueExtend = JSONArrayExtend | JSONObjectExtend | JSONPrimitive | undefined;
  ```

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [JSR](https://jsr.io/@hugoalh/is-json)

## ✍️ Examples

- ```ts
  isJSON({
    a: 1,
    b: 2,
    c: 3,
    d: () => { }
  });
  //=> false
  ```
- ```ts
  isJSON({
    a: 1,
    b: 2,
    c: 3,
    d: new Map()
  });
  //=> false
  ```
- ```ts
  isJSON(NaN);
  //=> false
  ```
- ```ts
  isJSON(void 0);
  //=> false
  ```
- ```ts
  isJSON({
    a: 1,
    b: 2,
    c: 3
  });
  //=> true
  ```
- ```ts
  isJSON([1, 2, 3]);
  //=> true
  ```
