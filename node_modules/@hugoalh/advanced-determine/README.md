# [NodeJS] Advanced Determine

[`hugoalh/NodeJS.AdvancedDetermine`](https://github.com/hugoalh/NodeJS.AdvancedDetermine)

[![](https://img.shields.io/github/contributors/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&logo=github)](https://github.com/hugoalh/NodeJS.AdvancedDetermine/graphs/contributors)
[![](https://img.shields.io/github/license/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&logo=github)](https://github.com/hugoalh/NodeJS.AdvancedDetermine/blob/master/LICENSE.md)
![](https://img.shields.io/github/languages/count/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&logo=github)
![](https://img.shields.io/github/languages/top/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&logo=github)
![](https://img.shields.io/github/repo-size/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&logo=github)
![](https://img.shields.io/github/languages/code-size/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&logo=github)
![](https://img.shields.io/github/watchers/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&logo=github)
![](https://img.shields.io/github/stars/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&logo=github)
![](https://img.shields.io/github/forks/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&logo=github)
[![](https://img.shields.io/lgtm/alerts/g/hugoalh/NodeJS.AdvancedDetermine.svg?style=flat-square&logo=lgtm&label=%20)](https://lgtm.com/projects/g/hugoalh/NodeJS.AdvancedDetermine/alerts)
[![](https://img.shields.io/lgtm/grade/javascript/g/hugoalh/NodeJS.AdvancedDetermine.svg?style=flat-square&logo=lgtm)](https://lgtm.com/projects/g/hugoalh/NodeJS.AdvancedDetermine/context:javascript)

| **[Release](https://github.com/hugoalh/NodeJS.AdvancedDetermine/releases)** ![](https://img.shields.io/github/downloads/hugoalh/NodeJS.AdvancedDetermine/total?style=flat-square&color=000000&label=%20) | **Outside Download**  | **[Issue](https://github.com/hugoalh/NodeJS.AdvancedDetermine/issues?q=is%3Aissue)** | **[Pull Request](https://github.com/hugoalh/NodeJS.AdvancedDetermine/pulls?q=is%3Apr)** |
|:----|:----|:----|:----|
| **Stable:** ![](https://img.shields.io/github/release/hugoalh/NodeJS.AdvancedDetermine?sort=semver&style=flat-square&color=000000&label=%20) (![](https://img.shields.io/github/release-date/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20))<br />**Latest:** ![](https://img.shields.io/github/release/hugoalh/NodeJS.AdvancedDetermine?include_prereleases&sort=semver&style=flat-square&color=000000&label=%20) (![](https://img.shields.io/github/release-date-pre/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20)) | [NPMJS](https://www.npmjs.com/package/@hugoalh/advanced-determine) | **Open:** ![](https://img.shields.io/github/issues-raw/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20)<br />**Closed:** ![](https://img.shields.io/github/issues-closed-raw/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20) | **Open:** ![](https://img.shields.io/github/issues-pr-raw/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20)<br />**Closed:** ![](https://img.shields.io/github/issues-pr-closed-raw/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20) |

## 📜 Description

A library to provide a better and more accuracy way to determine item's type.

## 💽 Installation

- NodeJS 8+
- NPMJS 6+
  ```powershell
  > npm install @hugoalh/advanced-determine
  ```

## ✍ Guide

### API

|  | **Description** |
|:----|:----|
| `allIs(type/option, ...items)` | **type {string.lowerCase}:** Type to determine, e.g.: `"regexp"`, `"stringifyjson"`.<br />**option {array[string.lowerCase, boolean = false]}:** Type to determine with fuzzy mode options, e.g.: `["string", false]`.<br />**...items {\*}:** Support infinity arguments.<br /><br />Return `true` when items are all meet the `true` determine requirement; Return `false` otherwise. |
| `isNull(item, fuzzyMode?)` | ***fuzzyMode {boolean = false}:*** Enable fuzzy mode.<br /><br />Return `true` when item is `null`, `""`, `[]`, `{}`, or `"null"` (only in fuzzy mode); Return `false` otherwise. |
| `isArray(item)` | Return `true` when item is array and has length (i.e.: > 0); Return `null` when item is array but no length (i.e.: = 0); Return `false` otherwise. |
| `isBuffer(item)` |  |
| `isDate(item)` |  |
| `isJSON(item)` | Return `true` when item is JSON and has length (i.e.: > 0); Return `null` when item is JSON but no length (i.e.: = 0); Return `false` otherwise. |
| `isNumber(item)` | Return `false` when item is type of bigint, or `NaN`. |
| `isRegExp(item)` |  |
| `isString(item, fuzzyMode?)` | ***fuzzyMode {boolean = false}:*** Enable fuzzy mode.<br /><br />Return `true` when item is string and has length (i.e.: > 0); Return `null` when item is string but no length (i.e.: = 0), or item is `"null"` (only in fuzzy mode); Return `false` otherwise. |
| `isStringAllLowerCase(item)` |  |
| `isStringAllUpperCase(item)` |  |
| `isStringifyJSON(item)` | Return `true` when item is stringify JSON and has length (i.e.: > 0); Return `null` when item is stringify JSON but no length (i.e.: = 0); Return `false` otherwise. |

### Example

```javascript
const determine = require("@hugoalh/advanced-determine");

console.log(determine.version);// 1.2.1

console.log(determine.isString(""));// null
console.log(determine.isString("", false));// null
console.log(determine.isString("null", false));// true
console.log(determine.isString("null", true));// null
console.log(determine.isNull(""));// true
console.log(determine.isArray([]));// null
console.log(determine.allIs("null", "", [], {}));// true
console.log(determine.allIs("string", "Hello, world!", 10, [8, 31]));// false
console.log(determine.isStringAllLowerCase("Test word."));// false
console.log(determine.isStringAllUpperCase("NO"));// true
```
