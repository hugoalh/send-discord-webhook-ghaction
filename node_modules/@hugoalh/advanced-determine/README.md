# \[NodeJS\] Advanced Determine

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

| **[Release](https://github.com/hugoalh/NodeJS.AdvancedDetermine/releases)** ![](https://img.shields.io/github/downloads/hugoalh/NodeJS.AdvancedDetermine/total?style=flat-square&color=000000&label=%20) | **[Issue](https://github.com/hugoalh/NodeJS.AdvancedDetermine/issues?q=is%3Aissue)** | **[Pull Request](https://github.com/hugoalh/NodeJS.AdvancedDetermine/pulls?q=is%3Apr)** |
|:----|:----|:----|
| **Latest:** ![](https://img.shields.io/github/release/hugoalh/NodeJS.AdvancedDetermine?sort=semver&style=flat-square&color=000000&label=%20) (![](https://img.shields.io/github/release-date/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20))<br />**Pre:** ![](https://img.shields.io/github/release/hugoalh/NodeJS.AdvancedDetermine?include_prereleases&sort=semver&style=flat-square&color=000000&label=%20) (![](https://img.shields.io/github/release-date-pre/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20))<br />[![](https://img.shields.io/npm/v/@hugoalh/advanced-determine?style=flat-square&logo=npm)](https://www.npmjs.com/package/@hugoalh/advanced-determine) | **Open:** ![](https://img.shields.io/github/issues-raw/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20)<br />**Closed:** ![](https://img.shields.io/github/issues-closed-raw/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20) | **Open:** ![](https://img.shields.io/github/issues-pr-raw/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20)<br />**Closed:** ![](https://img.shields.io/github/issues-pr-closed-raw/hugoalh/NodeJS.AdvancedDetermine?style=flat-square&color=000000&label=%20) |

## 📜 Description

A module/library to provide a better and more accurate way to determine item type.

[Click here to view the official documentation online.](https://github.com/hugoalh/NodeJS.AdvancedDetermine/wiki)

## 📄 Documentation (Excerpt)

### Getting Started

NodeJS (v8+) & NPMJS (v6+):

```powershell
> npm install @hugoalh/advanced-determine
```

### API

- `isNull(item, configuration?)`
- `isArray(item)`
- `isBuffer(item)`
- `isDate(item)`
- `isJSON(item)`
- `isNumber(item)`
- `isRegularExpression(item)`
- `isString(item, configuration?)`
- `isStringLowerCase(item)`
- `isStringUpperCase(item)`
- `isStringASCII(item)`
- `isStringifyJSON(item)`
- `isUndefined(item, configuration?)`

### Example

```javascript
const advancedDetermine = require("@hugoalh/advanced-determine");

console.log(advancedDetermine.isString(""));// null
console.log(advancedDetermine.isString("null", { fuzzyMode: false }));// true
console.log(advancedDetermine.isString("null", { fuzzyMode: true }));// null
console.log(advancedDetermine.isNull(""));// true
console.log(advancedDetermine.isArray([]));// null
console.log(advancedDetermine.isStringLowerCase("Test word."));// false
console.log(advancedDetermine.isStringLowerCase("word"));// true
console.log(advancedDetermine.isStringUpperCase("NO"));// true
console.log(advancedDetermine.isNumberFloat(-8.31));// true
console.log(advancedDetermine.isNumberFloat(51));// false
```
