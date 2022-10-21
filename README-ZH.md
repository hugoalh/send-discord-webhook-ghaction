🌐 | [English](./README.md) / [漢語](./README-ZH.md)

---

# 發送Discord網絡鉤手（GitHub Action）

[`SendDiscordWebhook.GitHubAction`](https://github.com/hugoalh/send-discord-webhook-ghaction)

![GitHub Action](https://img.shields.io/badge/GitHub%20Action-2088FF?logo=github-actions&logoColor=ffffff&style=flat-square "GitHub Action")
![授權條款](https://img.shields.io/static/v1?label=%E6%8E%88%E6%AC%8A%E6%A2%9D%E6%AC%BE&message=MIT&style=flat-square "授權條款")
[![GitHub星](https://img.shields.io/github/stars/hugoalh/send-discord-webhook-ghaction?label=%E6%98%9F&logo=github&logoColor=ffffff&style=flat-square "GitHub星")](https://github.com/hugoalh/send-discord-webhook-ghaction/stargazers)
[![GitHub貢獻者](https://img.shields.io/github/contributors/hugoalh/send-discord-webhook-ghaction?label=%E8%B2%A2%E7%8D%BB%E8%80%85&logo=github&logoColor=ffffff&style=flat-square "GitHub貢獻者")](https://github.com/hugoalh/send-discord-webhook-ghaction/graphs/contributors)
[![GitHub議題](https://img.shields.io/github/issues-raw/hugoalh/send-discord-webhook-ghaction?label=%E8%AD%B0%E9%A1%8C&logo=github&logoColor=ffffff&style=flat-square "GitHub議題")](https://github.com/hugoalh/send-discord-webhook-ghaction/issues)
[![GitHub拉取請求](https://img.shields.io/github/issues-pr-raw/hugoalh/send-discord-webhook-ghaction?label=%E6%8B%89%E5%8F%96%E8%AB%8B%E6%B1%82&logo=github&logoColor=ffffff&style=flat-square "GitHub拉取請求")](https://github.com/hugoalh/send-discord-webhook-ghaction/pulls)
[![GitHub討論](https://img.shields.io/github/discussions/hugoalh/send-discord-webhook-ghaction?label=%E8%A8%8E%E8%AB%96&logo=github&logoColor=ffffff&style=flat-square "GitHub討論")](https://github.com/hugoalh/send-discord-webhook-ghaction/discussions)
[![CodeFactor評等](https://img.shields.io/codefactor/grade/github/hugoalh/send-discord-webhook-ghaction?label=%E8%A9%95%E7%AD%89&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor評等")](https://www.codefactor.io/repository/github/hugoalh/send-discord-webhook-ghaction)

| **發佈** | **最新**（![GitHub最新發佈日期](https://img.shields.io/github/release-date/hugoalh/send-discord-webhook-ghaction?label=%20&style=flat-square "GitHub最新發佈日期")） | **預覽**（![GitHub最新預覽發佈日期](https://img.shields.io/github/release-date-pre/hugoalh/send-discord-webhook-ghaction?label=%20&style=flat-square "GitHub最新預覽發佈日期")） |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh/send-discord-webhook-ghaction/releases) ![GitHub總下載](https://img.shields.io/github/downloads/hugoalh/send-discord-webhook-ghaction/total?label=%20&style=flat-square "GitHub總下載") | ![GitHub最新發佈版本](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?sort=semver&label=%20&style=flat-square "GitHub最新發佈版本") | ![GitHub最新預覽發佈版本](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?include_prereleases&sort=semver&label=%20&style=flat-square "GitHub最新預覽發佈版本") |

## 📝 說明

用於發送Discord網絡鉤手的GitHub Action。

### 🌟 特點

- 支持附件／檔案。
- 支持討論串。

## 📚 文檔

> <b>⚠ 重要：</b>此文檔基於v5.0.0；如果要查看其他發佈／標籤／版本的文檔，請瀏覽[發佈／標籤／版本列表](https://github.com/hugoalh/send-discord-webhook-ghaction/tags)並選擇正確的發佈／標籤／版本。

### 開始

#### 安裝（適用於自行架設）

- GitHub Actions Runner >= v2.297.0
  - NodeJS ^ v16.13.0

#### 使用

```yml
jobs:
  job_id:
    runs-on: "________" # 任何
    steps:
      - uses: "hugoalh/send-discord-webhook-ghaction@<tag/version>"
```

### 📥 輸入

> | **圖解** | **說明** |
> |:-:|:--|
> | 🔐 | 應該是已加密的秘密。 |

#### `key`

**🔐** `<字串>` 密鑰；長格式和短格式都可以接受。

```
https://discord.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL  ⬅長
                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^  ⬅短

https://discordapp.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL  ⬅長（舊）
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^  ⬅短（舊）
```

#### `method`

<b>［選擇性］</b>`<字串>` Method to send.

- **Default:** Let this action automatically determine the best method.
- **`"form"`:** Use `multipart/form-data`.
- **`"json"`:** Use `application/json`.

When this input is not defined, and input `files` is:

- defined, will use `"form"`.
- not defined, will use `"json"`.

When this input is `"json"`, and input `files` is defined, will throw an error.

#### `payload`

<b>［選擇性］</b>`<物件 = {}>` JSON/YAML/YML payload, which restricted format and pattern; At least one of the input [`payload.content`](#content), [`payload.embeds`](#embeds), or [`files`](#files) must be provided. View the JSON payload template in [here](./discord-webhook-payload-template.json).

> <b>⚠ 重要：</b>Properties which have not listed in here or in the template are not supported.

<details open>

##### `content`

<b>［選擇性］</b>`<字串>` The message contents, up to 2000 characters.

##### `username`

<b>［選擇性］</b>`<字串>` Override the default username of the webhook, up to 80 characters; "Clyde" is not allowed.

##### `avatar_url`

<b>［選擇性］</b>`<字串>` Override the default avatar of the webhook.

##### `tts`

<b>［選擇性］</b>`<布爾值 = false>` Use TTS (Text To Speech).

##### `embeds`

<b>［選擇性］</b>`<物件[]>` Embed rich content, up to 10 embeds, and up to 6000 characters for summation of:

- [`embeds[*].title`](#embedstitle)
- [`embeds[*].description`](#embedsdescription)
- [`embeds[*].footer.text`](#embedsfootertext)
- [`embeds[*].author.name`](#embedsauthorname)
- [`embeds[*].fields[*].name`](#embedsfieldsname)
- [`embeds[*].fields[*].value`](#embedsfieldsvalue)

##### `embeds[*].title`

<b>［選擇性］</b>`<字串>` Title of embed, up to 256 characters.

##### `embeds[*].description`

<b>［選擇性］</b>`<字串>` Description of embed, up to 4096 characters.

##### `embeds[*].url`

<b>［選擇性］</b>`<字串>` URL of embed.

##### `embeds[*].timestamp`

<b>［選擇性］</b>`<字串>` Timestamp of embed, with format ISO 8601 (e.g.: `"2011-11-11T11:11:11Z"`).

##### `embeds[*].color`

<b>［選擇性］</b>`<數字 | 字串 = 2105893>` Color of embed (i.e.: left border's color of embed); RGB integer, Hex (with prefix `#` (sharp)), namespaced string, and CSS colors string (e.g.: `"rgb(32, 34, 37)"`) forms are acceptable. Exclusive namespaced strings:

|  | **Namespace** | **Value** | **Description** |
|:-:|:-:|:-:|:--|
| <img src="https://www.colorhexa.com/202225.png" height="16px" width="16px" /> | `"Default"` |  `"#202225"` / `"rgb(32, 34, 37)"` | Default. |
| 🍭 | `"Random"` |  | Random. |
| <img src="https://www.colorhexa.com/5865F2.png" height="16px" width="16px" /> | `"Discord Blurple"` | `"#5865F2"` / `"rgb(88, 101, 242)"` | Discord blurple. |
| <img src="https://www.colorhexa.com/EB459E.png" height="16px" width="16px" /> | `"Discord Fuchsia"` | `"#EB459E"` / `"rgb(254, 231, 92)"` | Discord fuchsia. |
| <img src="https://www.colorhexa.com/57F287.png" height="16px" width="16px" /> | `"Discord Green"` | `"#57F287"` / `"rgb(87, 242, 135)"` | Discord green. |
| <img src="https://www.colorhexa.com/ED4245.png" height="16px" width="16px" /> | `"Discord Red"` | `"#ED4245"` / `"rgb(237, 66, 69)"` | Discord red. |
| <img src="https://www.colorhexa.com/FEE75C.png" height="16px" width="16px" /> | `"Discord Yellow"` | `"#FEE75C"` / `"rgb(254, 231, 92)"` | Discord yellow. |
| <img src="https://www.colorhexa.com/2F3136.png" height="16px" width="16px" /> | `"Embed Background Dark"` | `"#2F3136"` / `"rgb(47, 49, 54)"` | Embed background in dark mode. |

> **💡 Hint:**
>
> - Alpha channel is not supported.
> - Namespaced string maybe change and/or remove without any notification, use value instead except you want it random.

##### `embeds[*].footer`

<b>［選擇性］</b>`<物件>` Footer of embed.

##### `embeds[*].footer.text`

<b>［選擇性］</b>`<字串>` Footer text, up to 2048 characters.

##### `embeds[*].footer.icon_url`

<b>［選擇性］</b>`<字串>` URL of footer icon, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].image`

<b>［選擇性］</b>`<物件>` Image of embed.

##### `embeds[*].image.url`

<b>［選擇性］</b>`<字串>` Source URL of image, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].thumbnail`

<b>［選擇性］</b>`<物件>` Thumbnail of embed.

##### `embeds[*].thumbnail.url`

<b>［選擇性］</b>`<字串>` Source URL of thumbnail, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].author`

<b>［選擇性］</b>`<物件>` Author of embed.

##### `embeds[*].author.name`

<b>［選擇性］</b>`<字串>` Name of author, up to 256 characters.

##### `embeds[*].author.url`

<b>［選擇性］</b>`<字串>` URL of author.

##### `embeds[*].author.icon_url`

<b>［選擇性］</b>`<字串>` URL of author icon, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].fields`

<b>［選擇性］</b>`<物件[]>` Fields of embed, up to 25 fields.

##### `embeds[*].fields[*].name`

<b>［選擇性］</b>`<字串>` Name of field, up to 256 characters.

##### `embeds[*].fields[*].value`

<b>［選擇性］</b>`<字串>` Value of field, up to 1024 characters.

##### `embeds[*].fields[*].inline`

<b>［選擇性］</b>`<布爾值 = false>` Field should display inline or not.

##### `allowed_mentions`

<b>［選擇性］</b>`<物件>` Allowed mentions for the message.

##### `allowed_mentions.parse`

<b>［選擇性］</b>`<字串[]>` Allowed mention types to parse from the content.

- **`"roles"`:** Controls role mentions.
- **`"users"`:** Controls user mentions.
- **`"everyone"`:** Controls `@everyone` and `@here` mentions.

##### `allowed_mentions.roles`

<b>［選擇性］</b>`<字串[]>` Roles ID to mention, up to 100 IDs.

##### `allowed_mentions.users`

<b>［選擇性］</b>`<字串[]>` Users ID to mention, up to 100 IDs.

</details>

#### `files`

<b>［選擇性］</b>`<字串[] = []>` Files as attachments, which must be relative paths from GitHub Actions workspace, up to 8 MB and 10 files; At least one of the input [`payload.content`](#content), [`payload.embeds`](#embeds), or [`files`](#files) must be provided.

#### `wait`

<b>［選擇性］</b>`<布爾值 = false>` Whether to wait for Discord confirmation of message send before response, and returns the created message body. When this input is `false`, a message that is not saved does not return an error.

#### `thread_type`

<b>［選擇性］</b>`<字串 = "none">` Thread type; Send to the specified thread within a webhook's channel.

- **`"none"`:** Not a thread. When this is defined, will ignore input [`thread_value`](#thread_value).
- **`"id"`:** A created thread for message channel, the thread will automatically unarchive. When this is defined, input [`thread_value`](#thread_value) is require.
- **`"name"`:** A new thread for forum channel.

#### `thread_value`

<b>🔐［選擇性］</b>`<字串>` Thread value. When [`thread_type`](#thread_type) is:

- `"none"`, this is ignored.
- `"id"`, this is require the created thread ID.
- `"name"`, this is the new thread name (i.e.: thread title), up to 100 characters; When not defined, the value will fill with the first available value in this order:
  - [`payload.content`](#content)
  - [`payload.embeds[0].title`](#embedstitle) when [`payload.embeds`](#embeds) has only 1 element
  - [`payload.embeds[0].description`](#embedsdescription) when [`payload.embeds`](#embeds) has only 1 element
  - `Send Discord Webhook - {Timestamp}`, `Timestamp` is the current time in ISO 8601 format.

#### `truncate_enable`

<b>［選擇性］</b>`<布爾值 = true>` Whether to try truncate firstly when inputs are too large.

#### `truncate_ellipsis`

<b>［選擇性］</b>`<字串 = "...">` Ellipsis.

#### `truncate_position`

<b>［選擇性］</b>`<字串 = "end">` Ellipsis position.

- **`"end"`:** At the end of the string.
- **`"middle"`:** At the middle of the string.
- **`"start"`:** At the start of the string.

### 📤 輸出

#### `response`

`<字串>` 響應內容。

#### `status_code`

`<數字>` 請求狀態代碼。

#### `status_ok`

`<布爾值>` 請求是否成功。

#### `status_text`

`<字串>` 請求狀態文本。

### 例子

#### 你好，世界！

```yml
jobs:
  job_id:
    name: "Send Discord Webhook"
    runs-on: "ubuntu-latest"
    steps:
      - uses: "hugoalh/send-discord-webhook-ghaction@v5.0.0"
        with:
          key: "${{secrets.DISCORD_WEBHOOK_KEY}}"
          payload: |
            content: "你好，世界！"
```

#### birdie0

> 來自[birdie0's Discord Webhooks Guide（英文）](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)。

```yml
jobs:
  job_id:
    name: "Send Discord Webhook"
    runs-on: "ubuntu-latest"
    steps:
      - uses: "hugoalh/send-discord-webhook-ghaction@v5.0.0"
        with:
          key: "${{secrets.DISCORD_WEBHOOK_KEY}}"
          payload: |
            {
              "username": "Webhook",
              "avatar_url": "https://i.imgur.com/4M34hi2.png",
              "content": "Text message. Up to 2000 characters.",
              "embeds": [
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
            }
```

![例子birdie0結果](https://birdie0.github.io/discord-webhooks-guide/img/webhook_example.png "例子birdie0結果")

### 指南

#### Discord

- [Execute Webhook](https://discord.com/developers/docs/resources/webhook#execute-webhook)
- [Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

#### GitHub Actions

- [啟用調試日誌記錄（英文）](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging)
- [已加密的秘密（英文）](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
