🌐 | [English](./README.md) / [中文](./README-ZHHANT.md)

# 發送Discord網絡鉤手（GitHub Action）

[`SendDiscordWebhook.GitHubAction`](https://github.com/hugoalh/send-discord-webhook-ghaction)
[![GitHub貢獻者](https://img.shields.io/github/contributors/hugoalh/send-discord-webhook-ghaction?label=%E8%B2%A2%E7%8D%BB%E8%80%85&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/graphs/contributors)
[![GitHub議題](https://img.shields.io/github/issues-raw/hugoalh/send-discord-webhook-ghaction?label=%E8%AD%B0%E9%A1%8C&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/issues)
[![GitHub拉取請求](https://img.shields.io/github/issues-pr-raw/hugoalh/send-discord-webhook-ghaction?label=%E6%8B%89%E5%8F%96%E8%AB%8B%E6%B1%82&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/pulls)
[![GitHub討論](https://img.shields.io/github/discussions/hugoalh/send-discord-webhook-ghaction?label=%E8%A8%8E%E8%AB%96&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/discussions)
[![GitHub星](https://img.shields.io/github/stars/hugoalh/send-discord-webhook-ghaction?label=%E6%98%9F&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/stargazers)
[![GitHub分支](https://img.shields.io/github/forks/hugoalh/send-discord-webhook-ghaction?label=%E5%88%86%E6%94%AF&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/network/members)
![GitHub語言](https://img.shields.io/github/languages/count/hugoalh/send-discord-webhook-ghaction?label=%E8%AA%9E%E8%A8%80&logo=github&logoColor=ffffff&style=flat-square)
[![CodeFactor評等](https://img.shields.io/codefactor/grade/github/hugoalh/send-discord-webhook-ghaction?label=%E8%A9%95%E7%AD%89&logo=codefactor&logoColor=ffffff&style=flat-square)](https://www.codefactor.io/repository/github/hugoalh/send-discord-webhook-ghaction)
[![LGTM警報](https://img.shields.io/lgtm/alerts/g/hugoalh/send-discord-webhook-ghaction?label=%E8%AD%A6%E5%A0%B1&logo=lgtm&logoColor=ffffff&style=flat-square)
![LGTM評等](https://img.shields.io/lgtm/grade/javascript/g/hugoalh/send-discord-webhook-ghaction?label=%E8%A9%95%E7%AD%89&logo=lgtm&logoColor=ffffff&style=flat-square)](https://lgtm.com/projects/g/hugoalh/send-discord-webhook-ghaction)
[![授權條款](https://img.shields.io/static/v1?label=%E6%8E%88%E6%AC%8A%E6%A2%9D%E6%AC%BE&message=MIT&color=brightgreen&style=flat-square)](./LICENSE-ZHHANT.md)

| **發佈** | **最新**（![GitHub最新發佈日期](https://img.shields.io/github/release-date/hugoalh/send-discord-webhook-ghaction?label=%20&style=flat-square)） | **預覽**（![GitHub最新預覽日期](https://img.shields.io/github/release-date-pre/hugoalh/send-discord-webhook-ghaction?label=%20&style=flat-square)） |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh/send-discord-webhook-ghaction/releases) ![GitHub總下載](https://img.shields.io/github/downloads/hugoalh/send-discord-webhook-ghaction/total?label=%20&style=flat-square) | ![GitHub最新發佈版本](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?sort=semver&label=%20&style=flat-square) | ![GitHub最新預覽版本](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?include_prereleases&sort=semver&label=%20&style=flat-square) |

## 📝 說明

用於發送Discord網絡鉤手的GitHub Action。

*之前稱為「［GitHub Action］傳送至Discord」。*

## 📚 文檔

> <b>⚠ 重要：</b>此文檔基於v4.0.0-beta.1。如果要查看其他標籤／版本的文檔，瀏覽[標籤／版本列表](https://github.com/hugoalh/send-discord-webhook-ghaction/tags)並選擇正確的標籤／版本。

### 🎯 進入點／目標

#### 預設 (`+default`)

> <b>⚠ 重要：</b>此進入點目前是基於<kbd>Docker (`+docker`)</kbd>，基底可能在沒有通知的情況下變更以確保正常運作。

```yml
jobs:
  job_id:
    runs-on: # 取決於基底要求，推薦"ubuntu-________"
    steps:
      - uses: "hugoalh/send-discord-webhook-ghaction@<tag/version>"
```

##### 需要軟體

*取決於基底要求。*

#### Docker (`+docker`)

```yml
jobs:
  job_id:
    runs-on: "ubuntu-________"
    steps:
      - uses: "hugoalh/send-discord-webhook-ghaction/use-docker@<tag/version>"
```

##### 需要軟體

- Docker

#### NodeJS (`+nodejs`)

> <b>⚠ 重要：</b>此進入點可能需要額外的步驟來手動設置NodeJS版本。

```yml
jobs:
  job_id:
    runs-on: *any*
    steps:
      - uses: "hugoalh/send-discord-webhook-ghaction/use-nodejs@<tag/version>"
```

##### 需要軟體

- NodeJS (>= v14.15.0) + NPM (>= v6.14.8)

### 📥 輸入

> | **圖解** | **說明** |
> |:-:|:--|
> | 🔐 | 應該是已加密的秘密。 |

#### `key`

**🔐** `<字串>` 密鑰；長格式和短格式都可以接受。

```
https://discord.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  長
                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^  短

https://discordapp.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  長（舊）
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^  短（舊）
```

#### `method`

<b>［選擇性］</b>`<字串 = "">` Method to send.

- **Default:** Let this action automatically determine the best method.
- **`"form"`:** Use `multipart/form-data`.
- **`"json"`:** Use `application/json`.

When this input is not defined, and input `files` is:

- defined, will use `"form"`.
- not defined, will use `"json"`.

When this input is `"json"`, and input `files` is defined, will throw an error.

#### `payload`

<b>［選擇性］</b>`<物件 = {}>` JSON payload, which restricted format and pattern; At least one of the input `payload.content`, `payload.embeds`, or `files` must be provided. *[View the JSON payload template in here.](./discord-webhook-payload-template.json)*

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

- `embeds[*].title`
- `embeds[*].description`
- `embeds[*].footer.text`
- `embeds[*].author.name`
- `embeds[*].fields[*].name`
- `embeds[*].fields[*].value`

##### `embeds[*].title`

<b>［選擇性］</b>`<字串>` Title of embed, up to 256 characters.

##### `embeds[*].description`

<b>［選擇性］</b>`<字串>` Description of embed, up to 4096 characters.

##### `embeds[*].url`

<b>［選擇性］</b>`<字串>` URL of embed.

##### `embeds[*].timestamp`

<b>［選擇性］</b>`<字串>` Timestamp of embed, with format ISO 8601 (e.g.: `"2011-11-11T11:11:11Z"`).

##### `embeds[*].color`

<b>［選擇性］</b>`<(數字 | 字串) = 2105893>` Color of the embed (i.e.: left border's color of embed); Decimal (integer / RGB integer), Hex (6 digits, with prefix `#` (sharp)), namespaced string, and RGB string (split with `,` (comma)) forms are acceptable.

|  |  | **Decimal** | **Hex** | **Namespace** | **RGB** |
|:-:|:-:|:-:|:-:|:-:|:-:|
| <img src="https://www.colorhexa.com/000000.png" height="16px" width="16px" /> | **Black** | `0` | `"#000000"` | `"black"` | `"0,0,0"` |
| <img src="https://www.colorhexa.com/202225.png" height="16px" width="16px" /> | **Default** | `2105893` | `"#202225"` | `"default"` | `"32,34,37"` |
| <img src="https://www.colorhexa.com/23272A.png" height="16px" width="16px" /> | **Discord Black** | `2303786` | `"#23272A"` | `"discordblack"` | `"35,39,42"` |
| <img src="https://www.colorhexa.com/2C2F33.png" height="16px" width="16px" /> | **Discord Dark** | `2895667` | `"#2C2F33"` | `"discorddark"` | `"44,47,51"` |
| <img src="https://www.colorhexa.com/2F3136.png" height="16px" width="16px" /> | **Embed Background (Dark Mode)** | `3092790` | `"#2F3136"` | `"embeddark"` | `"47,49,54"` |
| <img src="https://www.colorhexa.com/7289DA.png" height="16px" width="16px" /> | **Discord Blue Purple** | `7506394` | `"#7289DA"` | `"discordblurple"` | `"114,137,218"` |
| <img src="https://www.colorhexa.com/99AAB5.png" height="16px" width="16px" /> | **Discord Gray/Grey Purple** | `10070709` | `"#99AAB5"` | `"discordgrayple"` / `"discordgreyple"` | `"153,170,181"` |
| <img src="https://www.colorhexa.com/FFFFFF.png" height="16px" width="16px" /> | **White** | `16777215` | `"#FFFFFF"` | `"white"` | `"255,255,255"` |
|  | **Random** |  |  | `"random"` |  |

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

<b>［選擇性］</b>`<字串[] = []>` Files as attachment, which must be relative paths from and inside GitHub Actions runner workspace, up to 8 MB; At least one of the input `payload.content`, `payload.embeds`, or `files` must be provided.

#### `threadid`

<b>🔐 ［選擇性］</b>`<字串>` Thread ID; Send to the specified thread within a webhook's channel, the thread will automatically be unarchived.

#### `wait`

<b>［選擇性］</b>`<布爾值 = false>` Wait for Discord confirmation of message send before response, and returns the created message body. When this input is `false`, a message that is not saved does not return an error.

#### `truncate_enable`

<b>［選擇性］</b>`<布爾值 = true>` When input `payload` is too large, try to prune/trim/truncate first.

#### `truncate_ellipsis`

<b>［選擇性］</b>`<字串 = "...">` Ellipsis.

#### `truncate_position`

<b>［選擇性］</b>`<字串 = "end">` Ellipsis position.

- **`"end"`:** At the end of the string.
- **`"middle"`:** At the middle of the string.
- **`"start"`:** At the start of the string.

#### `dryrun`

<b>［選擇性］</b>`<布爾值 = false>` 試運行；供調試使用。

### 📤 輸出

*不適用*

### 例子

#### 你好，世界！

```yml
jobs:
  job_id:
    name: "Send Discord Webhook"
    runs-on: "ubuntu-latest"
    steps:
      - uses: "hugoalh/send-discord-webhook-ghaction@v4.0.0"
        with:
          key: "${{secrets.DISCORD_WEBHOOK_KEY}}"
          payload: |
            {
              "content": "你好，世界！"
            }
```

#### birdie0

> 來自[birdie0's Discord Webhooks Guide（英文）](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)。

```yml
jobs:
  job_id:
    name: "Send Discord Webhook"
    runs-on: "ubuntu-latest"
    steps:
      - uses: "hugoalh/send-discord-webhook-ghaction@v4.0.0"
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

![例子birdie0結果](https://birdie0.github.io/discord-webhooks-guide/img/webhook_example.png)

### 指南

#### Discord

- [Execute Webhook](https://discord.com/developers/docs/resources/webhook#execute-webhook)
- [Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

#### GitHub Actions

- [啟用調試日誌記錄（英文）](https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging)
- [已加密的秘密（英文）](https://docs.github.com/en/actions/reference/encrypted-secrets)
