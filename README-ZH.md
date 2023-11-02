🌐 | [English](./README.md) / [漢語](./README-ZH.md)

---

# 發送 Discord 網絡鉤手（GitHub Action）

[⚖️ MIT](./LICENSE-ZH.md)
[![CodeFactor 評等](https://img.shields.io/codefactor/grade/github/hugoalh/send-discord-webhook-ghaction?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor 評等")](https://www.codefactor.io/repository/github/hugoalh/send-discord-webhook-ghaction)

|  | **熱度** | **發佈—最新** | **發佈—預覽** |
|:-:|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh/send-discord-webhook-ghaction) | [![GitHub 星](https://img.shields.io/github/stars/hugoalh/send-discord-webhook-ghaction?label=&logoColor=ffffff&style=flat-square "GitHub 星")](https://github.com/hugoalh/send-discord-webhook-ghaction/stargazers) ｜ ![GitHub 總下載](https://img.shields.io/github/downloads/hugoalh/send-discord-webhook-ghaction/total?label=&style=flat-square "GitHub 總下載") | ![GitHub 最新發佈版本](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?sort=semver&label=&style=flat-square "GitHub 最新發佈版本") （![GitHub 最新發佈日期](https://img.shields.io/github/release-date/hugoalh/send-discord-webhook-ghaction?label=&style=flat-square "GitHub 最新發佈日期")） | ![GitHub 最新預覽發佈版本](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?include_prereleases&sort=semver&label=&style=flat-square "GitHub 最新預覽發佈版本") （![GitHub 最新預覽發佈日期](https://img.shields.io/github/release-date-pre/hugoalh/send-discord-webhook-ghaction?label=&style=flat-square "GitHub 最新預覽發佈日期")） |

用於發送 Discord 網絡鉤手的 GitHub Action。

> <b>⚠️ 重要：</b>此文檔基於 v6.0.0；如果要查看其他版本的文檔，請瀏覽[版本列表](https://github.com/hugoalh/send-discord-webhook-ghaction/tags)並選擇正確的版本。

## 🌟 特點

- 支持附件／檔案。
- 支持討論串。

## 🔰 開始

### GitHub Actions

- <b>目標版本：</b>Runner >= v2.310.0，及：
  - NodeJS ^ v20.9.0
- <b>需要許可：</b>*不適用*

```yml
jobs:
  job_id:
    runs-on: "________" # 任何
    steps:
      - uses: "hugoalh/send-discord-webhook-ghaction@<Tag>"
```

## 🧩 輸入

> | **圖解** | **說明** |
> |:-:|:--|
> | 🔐 | 應該是已加密的秘密。 |

### `key`

**🔐** `<字串>` 密鑰；長格式和短格式都可以接受。

```
https://discord.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL  ⬅長
                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^  ⬅短

https://discordapp.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL  ⬅長（舊）
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^  ⬅短（舊）
```

### `content`

**［選擇性］** `<字串>` 訊息內容，最多 2000 個字元；支援 Discord Markdown。

> **⚠️ Important:** At least either inputs of [`content`](#content), [`embeds`](#embeds), or [`files`](#files) must be provided.

### `content_links_no_embed`

**［選擇性］** `<RegExp[]>` Specify links in the [content](#content) to prevent Discord resolve and display as embed under the message, only supports HTTP and HTTPS, separate each value per line.

- **All:** `.+`
- **`.png` Image:** `\.png(?:\?|#|$)`
- **`.webp` Image:** `\.webp(?:\?|#|$)`
- **Twitch:** `twitch\.tv`

### `username`

**［選擇性］** `<字串>` 覆蓋網絡鉤手的預設用戶名，最多 80 個字元；「Clyde」是不被允許的。

### `avatar_url`

**［選擇性］** `<字串>` 覆蓋網絡鉤手的預設頭像，使用來源鏈結，只支援 HTTP 和 HTTPS。

### `tts`

**［選擇性］** `<布林值 = false>` 是否對訊息使用文字轉語音。

### `embeds`

**［選擇性］** `<物件[]>` 嵌入豐富的訊息內容，使用具有受限格式和模式的 JSON 或 YAML，最多 10 個嵌入和基於下列輸入總和 6000 個字元：

- [`embeds[*].title`](#embedstitle)
- [`embeds[*].description`](#embedsdescription)
- [`embeds[*].footer.text`](#embedsfootertext)
- [`embeds[*].author.name`](#embedsauthorname)
- [`embeds[*].fields[*].name`](#embedsfieldsname)
- [`embeds[*].fields[*].value`](#embedsfieldsvalue)

> **⚠️ Important:** At least either inputs of [`content`](#content), [`embeds`](#embeds), or [`files`](#files) must be provided.

#### `embeds[*].title`

**［選擇性］** `<字串>` 嵌入的標題，最多 256 個字元；支援 Discord Markdown。

#### `embeds[*].description`

**［選擇性］** `<字串>` 嵌入的描述，最多 4096 個字元；支援 Discord Markdown。

#### `embeds[*].url`

**［選擇性］** `<字串>` 嵌入的鏈結。

#### `embeds[*].timestamp`

**［選擇性］** `<字串>` 嵌入的時間戳，採用 ISO 8601 格式（例如：`2011-11-11T11:11:11Z`）。

#### `embeds[*].color`

**［選擇性］** `<數值 | 字串 = 2105893>` 嵌入的顏色（即是：嵌入的左邊框顏色）；RGB 整數、十六進位（帶有前綴「`#`」）、命名空間和 CSS 顏色（例如：`rgb(32, 34, 37)`）形式都可以接受。

專屬命名空間：

|  | **命名空間** | **值** | **說明** |
|:-:|:-:|:-:|:--|
| <img src="https://www.colorhexa.com/202225.png" height="16px" width="16px" /> | `"Default"` |  `"#202225"` / `"rgb(32, 34, 37)"` | Default. |
| 🍭 | `"Random"` |  | Random. |
| <img src="https://www.colorhexa.com/5865F2.png" height="16px" width="16px" /> | `"Discord Blurple"` | `"#5865F2"` / `"rgb(88, 101, 242)"` | Discord blurple. |
| <img src="https://www.colorhexa.com/EB459E.png" height="16px" width="16px" /> | `"Discord Fuchsia"` | `"#EB459E"` / `"rgb(254, 231, 92)"` | Discord fuchsia. |
| <img src="https://www.colorhexa.com/57F287.png" height="16px" width="16px" /> | `"Discord Green"` | `"#57F287"` / `"rgb(87, 242, 135)"` | Discord green. |
| <img src="https://www.colorhexa.com/ED4245.png" height="16px" width="16px" /> | `"Discord Red"` | `"#ED4245"` / `"rgb(237, 66, 69)"` | Discord red. |
| <img src="https://www.colorhexa.com/FEE75C.png" height="16px" width="16px" /> | `"Discord Yellow"` | `"#FEE75C"` / `"rgb(254, 231, 92)"` | Discord yellow. |
| <img src="https://www.colorhexa.com/2F3136.png" height="16px" width="16px" /> | `"Embed Background Dark"` | `"#2F3136"` / `"rgb(47, 49, 54)"` | Embed background in dark mode. |

> **⚠️ Important:**
>
> - Alpha channel is not supported.
> - General namespace are provided by [`meodai/color-names`](https://github.com/meodai/color-names), maybe change and/or remove without any notification, it is recommended to use value instead except you want a random color.

#### `embeds[*].footer`

**［選擇性］** `<物件>` Footer of the embed.

#### `embeds[*].footer.text`

**［選擇性］** `<字串>` Footer text, up to 2048 characters; Support Discord Markdown.

#### `embeds[*].footer.icon_url`

**［選擇性］** `<字串>` Source URL of the footer icon, only supports HTTP, HTTPS, and attachments.

#### `embeds[*].image`

**［選擇性］** `<物件>` Image of the embed.

#### `embeds[*].image.url`

**［選擇性］** `<字串>` Source URL of the image, only supports HTTP, HTTPS, and attachments.

#### `embeds[*].thumbnail`

**［選擇性］** `<物件>` Thumbnail of the embed.

#### `embeds[*].thumbnail.url`

**［選擇性］** `<字串>` Source URL of the thumbnail, only supports HTTP, HTTPS, and attachments.

#### `embeds[*].author`

**［選擇性］** `<物件>` Author of the embed.

#### `embeds[*].author.name`

**［選擇性］** `<字串>` Author name, up to 256 characters.

#### `embeds[*].author.url`

**［選擇性］** `<字串>` Author URL.

#### `embeds[*].author.icon_url`

**［選擇性］** `<字串>` Source URL of the author icon, only supports HTTP, HTTPS, and attachments.

#### `embeds[*].fields`

**［選擇性］** `<物件[]>` Fields of the embed, up to 25 fields.

#### `embeds[*].fields[*].name`

**［選擇性］** `<字串>` Field name, up to 256 characters; Support Discord Markdown.

#### `embeds[*].fields[*].value`

**［選擇性］** `<字串>` Field value, up to 1024 characters; Support Discord Markdown.

#### `embeds[*].fields[*].inline`

**［選擇性］** `<布林值 = false>` Whether the field should display inline.

### `allowed_mentions_parse`

**［選擇性］** `<字串[] = "roles,users,everyone">` Allowed mention types to parse from the content, separate each value with comma (`,`), vertical bar (`|`), semi-colon (`;`), whitespace, or per line.

- **`"roles"`:** Control roles mentions.
- **`"users"`:** Control users mentions.
- **`"everyone"`:** Control `@everyone` and `@here` mentions.

### `allowed_mentions_roles`

**［選擇性］** `<字串[]>` Allowed roles' IDs to mention, separate each value with comma (`,`), vertical bar (`|`), semi-colon (`;`), whitespace, or per line, up to 100 IDs.

### `allowed_mentions_users`

**［選擇性］** `<字串[]>` Allowed users' IDs to mention, separate each value with comma (`,`), vertical bar (`|`), semi-colon (`;`), whitespace, or per line, up to 100 IDs.

### `files`

**［選擇性］** `<字串[]>` Files as attachments of the message, which must be relative paths from GitHub Actions workspace (i.e.: `GITHUB_WORKSPACE`), separate each value per line, up to 8 MB and 10 files.

> **⚠️ Important:** At least either inputs of [`content`](#content), [`embeds`](#embeds), or [`files`](#files) must be provided.

### `wait`

**［選擇性］** `<布林值 = true>` Whether to wait for Discord confirmation of message send before response, and returns the created message body. When this input is `false`, a message that is not saved does not return an error.

### `thread_id`

**［選擇性］** `<字串>` Thread ID for the message channel. When this input is defined, the message will send to the specify thread, the thread will automatically unarchive.

> **⚠️ Important:** Only either inputs of [`thread_id`](#thread_id) or [`thread_name`](#thread_name) can be provided.

### `thread_name`

**［選擇性］** `<字串>` Thread name for the forum channel, up to 100 characters. When this input is defined, the message will create a new thread with the name.

> **⚠️ Important:** Only either inputs of [`thread_id`](#thread_id) or [`thread_name`](#thread_name) can be provided.

### `truncate_enable`

**［選擇性］** `<布爾值 = true>` Whether to try truncate firstly when inputs are too large.

### `truncate_ellipsis`

**［選擇性］** `<字串 = "...">` Ellipsis mark.

### `truncate_position`

**［選擇性］** `<字串 = "end">` Ellipsis position.

- **`"end"`:** At the end of the string.
- **`"middle"`:** At the middle of the string.
- **`"start"`:** At the start of the string.

## 🧩 輸出

### `response`

`<字串>` 響應內容。

### `status_code`

`<數值>` 請求狀態代碼。

### `status_ok`

`<布爾值>` 請求是否成功。

### `status_text`

`<字串>` 請求狀態文本。

## ✍️ 例子

- 你好，世界！
  ```yml
  jobs:
    job_id:
      name: "Send Discord Webhook"
      runs-on: "ubuntu-latest"
      steps:
        - uses: "hugoalh/send-discord-webhook-ghaction@v6.0.0"
          with:
            key: "${{secrets.DISCORD_WEBHOOK_KEY}}"
            content: "你好，世界！"
  ```
- birdie0
  > 來自 [birdie0's Discord Webhooks Guide（英文）](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)。
  ```yml
  jobs:
    job_id:
      name: "Send Discord Webhook"
      runs-on: "ubuntu-latest"
      steps:
        - uses: "hugoalh/send-discord-webhook-ghaction@v6.0.0"
          with:
            key: "${{secrets.DISCORD_WEBHOOK_KEY}}"
            content: "Text message. Up to 2000 characters."
            username: "Webhook"
            avatar_url: "https://i.imgur.com/4M34hi2.png"
            embeds: |
              [
                {
                  "author": {
                    "name": "Birdie♫",
                    "url": "https://www.reddit.com/r/cats/",
                    "icon_url": "https://i.imgur.com/R66g1Pe.jpg"
                  },
                  "title": "Title",
                  "url": "https://google.com/",
                  "description": "Text message. You can use Markdown here. *Italic* **bold** __underline__ ~~strikeout~~ [hyperlink](https://google.com) `code`",
                  "color": 15258703,
                  "fields": [
                    {
                      "name": "Text",
                      "value": "More text",
                      "inline": true
                    },
                    {
                      "name": "Even more text",
                      "value": "Yup",
                      "inline": true
                    },
                    {
                      "name": "Use `\"inline\": true` parameter, if you want to display fields in the same line.",
                      "value": "okay..."
                    },
                    {
                      "name": "Thanks!",
                      "value": "You're welcome :wink:"
                    }
                  ],
                  "thumbnail": {
                    "url": "https://upload.wikimedia.org/wikipedia/commons/3/38/4-Nature-Wallpapers-2014-1_ukaavUI.jpg"
                  },
                  "image": {
                    "url": "https://upload.wikimedia.org/wikipedia/commons/5/5a/A_picture_from_China_every_day_108.jpg"
                  },
                  "footer": {
                    "text": "Woah! So cool! :smirk:",
                    "icon_url": "https://i.imgur.com/fKL31aD.jpg"
                  }
                }
              ]
  ```
  ![例子 birdie0 結果](https://birdie0.github.io/discord-webhooks-guide/img/webhook_example.png "例子 birdie0 結果")

## 📚 指南

- Discord
  - [Execute Webhook](https://discord.com/developers/docs/resources/webhook#execute-webhook)
  - [Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- GitHub Actions
  - [啟用調試日誌記錄（英文）](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging)
  - [已加密的秘密（英文）](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
