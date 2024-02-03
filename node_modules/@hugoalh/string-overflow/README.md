# String Overflow (NodeJS)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Repository](https://img.shields.io/badge/Repository-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub Repository")](https://github.com/hugoalh-studio/string-overflow-nodejs)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/string-overflow-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/string-overflow-nodejs/stargazers)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/string-overflow-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square "GitHub Contributors")](https://github.com/hugoalh-studio/string-overflow-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/string-overflow-nodejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square "GitHub Issues")](https://github.com/hugoalh-studio/string-overflow-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/string-overflow-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square "GitHub Pull Requests")](https://github.com/hugoalh-studio/string-overflow-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/string-overflow-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square "GitHub Discussions")](https://github.com/hugoalh-studio/string-overflow-nodejs/discussions)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/string-overflow-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/string-overflow-nodejs)

| **Releases** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/string-overflow-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/string-overflow-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/string-overflow-nodejs/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/string-overflow-nodejs/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/string-overflow-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/string-overflow-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/string-overflow) ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/string-overflow?label=&style=flat-square "NPM Total Downloads") | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/string-overflow/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/string-overflow/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

## 📝 Description

A NodeJS module to truncate the string with the specify length; Safe with the emojis, URLs, and words.

## 📚 Documentation

### Getting Started

- NodeJS ^ v12.20.0 || ^ v14.15.0 || >= v16.13.0

```sh
npm install @hugoalh/string-overflow
```

```js
/* Either */
import { ... } from "@hugoalh/string-overflow";// Named Import
import * as stringOverflow from "@hugoalh/string-overflow";// Namespace Import
```

### API

#### Class

- ```ts
  new StringOverflowTruncator(maximumLength: number, options: StringOverflowTruncatorOptions = {}): StringOverflowTruncator;
    .truncate(
      item: string,
      maximumLengthOverride?: number// Override the preset maximum length of the target string.
    ): string;
  
  StringOverflowTruncator.truncate(item: string, maximumLength: number, options: StringOverflowTruncatorOptions = {}): string;
  ```

#### Function

- ```ts
  stringOverflow(item: string, maximumLength: number, options: StringOverflowTruncatorOptions = {}): string;
  ```

#### Interface / Type

- ```ts
  interface StringOverflowTruncatorOptions {
    ellipsisMark: string = "...";// Ellipsis mark of the target string.
    ellipsisPosition: string = "End";// Ellipsis position at the target string (Selection: Start, Middle, End).
    safeURLs: boolean = true;// Whether to prevent URLs get truncated at the target string thus cause issues.
    safeWords: boolean = true;// Whether to prevent words get truncated at the target string.
  };
  ```

### Example

```js
let text = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores sit. Duo iriure vel dolore illum diam. Ea vero diam diam tincidunt molestie elitr te sed nisl ut vulputate tincidunt accusam sit sed. Amet sea dolore rebum amet accusam labore dolor no sadipscing labore. Sit erat sit sed voluptua tempor sit ea dolor et.";

/* Class */new StringOverflowTruncator(100).truncate(text);
/* Func. */stringOverflow(text, 100);
//=> "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores ..."

/* Class */new StringOverflowTruncator(100, { safeWords: false }).truncate(text);
/* Func. */stringOverflow(text, 100, { safeWords: false });
//=> "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores si..."
```
