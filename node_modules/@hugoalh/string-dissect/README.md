# String Dissect (NodeJS)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Repository](https://img.shields.io/badge/Repository-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub Repository")](https://github.com/hugoalh-studio/string-dissect-nodejs)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/string-dissect-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/string-dissect-nodejs/stargazers)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/string-dissect-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square "GitHub Contributors")](https://github.com/hugoalh-studio/string-dissect-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/string-dissect-nodejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square "GitHub Issues")](https://github.com/hugoalh-studio/string-dissect-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/string-dissect-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square "GitHub Pull Requests")](https://github.com/hugoalh-studio/string-dissect-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/string-dissect-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square "GitHub Discussions")](https://github.com/hugoalh-studio/string-dissect-nodejs/discussions)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/string-dissect-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/string-dissect-nodejs)

| **Releases** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/string-dissect-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/string-dissect-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/string-dissect-nodejs/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/string-dissect-nodejs/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/string-dissect-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/string-dissect-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/string-dissect) ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/string-dissect?label=&style=flat-square "NPM Total Downloads") | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/string-dissect/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/string-dissect/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

## 📝 Description

A NodeJS module to dissect the string; Safe with the emojis, URLs, and words.

## 📚 Documentation

### Getting Started

- NodeJS ^ v12.20.0 || ^ v14.15.0 || >= v16.13.0

```sh
npm install @hugoalh/string-dissect
```

```js
/* Either */
import { ... } from "@hugoalh/string-dissect";// Named Import
import * as stringDissect from "@hugoalh/string-dissect";// Namespace Import
```

### API

#### Class

- ```ts
  new StringDissector(options: StringDissectorOptions = {}): StringDissector;
    .dissect(item: string): StringDescriptor[];
  
  StringDissector.dissect(item: string, options: StringDissectorOptions = {}): StringDescriptor[];
  ```

#### Function

- ```ts
  stringDissect(item: string, options: StringDissectorOptions = {}): StringDescriptor[];
  ```

#### Interface / Type

- ```ts
  interface StringDissectorOptions {
    /* Whether to prevent URLs get splitted. [Default: `true`] */
    safeURLs?: boolean;
    /* Whether to prevent words get splitted. [Default: `true`] */
    safeWords?: boolean;
  };
  ```
- ```ts
  type StringDissectType = "ANSI" | "Character" | "Emoji" | "Url" | "Word";
  ```
- ```ts
  type StringDescriptor = {
    value: string;
    type: StringDissectType;
    typeANSI: boolean;
    typeCharacter: boolean;
    typeEmoji: boolean;
    typeUrl: boolean;
    typeWord: boolean;
  };
  ```

### Example

```js
let textNormal = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut.";

/* Class */new StringDissector().dissect(textNormal);
/* Func. */stringDissect(textNormal);
/*=>
[
  { value: "Vel", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
  { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: "ex", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
  { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: "sit", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
  { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: "est", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
  { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  ... +20
]
*/

/* Class */new StringDissector({ safeWords: false }).dissect(textNormal);
/* Func. */stringDissect(textNormal, { safeWords: false });
/*=>
[
  { value: "V", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: "e", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: "l", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: "e", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: "x", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: "s", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  ... +73
]
*/

/* Class */new StringDissector().dissect("GitHub homepage is https://github.com.");
/* Func. */stringDissect("GitHub homepage is https://github.com.");
/*=>
[
  { value: "GitHub", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
  { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: "homepage", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
  { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: "is", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
  { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
  { value: "https://github.com", type: "Url", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: true, typeWord: false },
  { value: ".", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false }
]
*/

/* Class */new StringDissector().dissect("🤝💑💏👪👨‍👩‍👧‍👦👩‍👦👩‍👧‍👦🧑‍🤝‍🧑").map((element) => { return element.value; });
/* Func. */stringDissect("🤝💑💏👪👨‍👩‍👧‍👦👩‍👦👩‍👧‍👦🧑‍🤝‍🧑").map((element) => { return element.value; });
//=> [ "🤝", "💑", "💏", "👪", "👨‍👩‍👧‍👦", "👩‍👦", "👩‍👧‍👦", "🧑‍🤝‍🧑" ]
```
