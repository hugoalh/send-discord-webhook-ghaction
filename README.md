🌐 | [English](./README.md) / [漢語](./README-ZH.md)

---

# Send Discord Webhook (GitHub Action)

[⚖️ MIT](./LICENSE.md)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh/send-discord-webhook-ghaction?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh/send-discord-webhook-ghaction)

|  | **Heat** | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh/send-discord-webhook-ghaction) | [![GitHub Stars](https://img.shields.io/github/stars/hugoalh/send-discord-webhook-ghaction?label=&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh/send-discord-webhook-ghaction/stargazers) \| ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh/send-discord-webhook-ghaction/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh/send-discord-webhook-ghaction?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh/send-discord-webhook-ghaction?label=&style=flat-square "GitHub Latest Pre-Release Date")) |

A GitHub Action to send a Discord webhook.

> **⚠️ Important:** This documentation is v6.0.0 based; To view other version's documentation, please visit the [versions list](https://github.com/hugoalh/send-discord-webhook-ghaction/tags) and select the correct version.

## 🌟 Feature

- Support attachments/files.
- Support thread.

## 🔰 Begin

### GitHub Actions

- **Target Version:** Runner >= v2.310.0, &:
  - NodeJS ^ v20.9.0
- **Require Permission:** *N/A*

```yml
jobs:
  job_id:
    runs-on: "________" # Any
    steps:
      - uses: "hugoalh/send-discord-webhook-ghaction@<Tag>"
```

## 🧩 Input

> | **Legend** | **Description** |
> |:-:|:--|
> | 🔐 | Should be an encrypted secret. |

### `key`

**🔐** `<string>` Key; Both long and short forms are acceptable.

```
https://discord.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL  ⬅Long
                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^  ⬅Short

https://discordapp.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL  ⬅Long (Legacy)
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^  ⬅Short (Legacy)
```

### `content`

**\[Optional\]** `<string>` Content of the message, up to 2000 characters; Support Discord Markdown.

> **⚠️ Important:** At least either inputs of [`content`](#content), [`embeds`](#embeds), or [`files`](#files) must be provided.

### `content_links_no_embed`

**\[Optional\]** `<RegExp[]>` Specify links in the [content](#content) to prevent Discord resolve and display as embed under the message, only supports HTTP and HTTPS, separate each value per line.

- **All:** `.+`
- **`.png` Image:** `\.png(?:\?|#|$)`
- **`.webp` Image:** `\.webp(?:\?|#|$)`
- **Twitch:** `twitch\.tv`

### `username`

**\[Optional\]** `<string>` Override the default username of the webhook, up to 80 characters; "Clyde" is not allowed.

### `avatar_url`

**\[Optional\]** `<string>` Override the default avatar of the webhook with source URL of the avatar, only supports HTTP and HTTPS.

### `tts`

**\[Optional\]** `<boolean = false>` Whether to use TTS (Text To Speech) for the message.

### `embeds`

**\[Optional\]** `<object[]>` Embed rich content for the message, by JSON/YAML with restricted format and pattern, up to 10 embeds and 6000 characters for summation of:

- [`embeds[*].title`](#embedstitle)
- [`embeds[*].description`](#embedsdescription)
- [`embeds[*].footer.text`](#embedsfootertext)
- [`embeds[*].author.name`](#embedsauthorname)
- [`embeds[*].fields[*].name`](#embedsfieldsname)
- [`embeds[*].fields[*].value`](#embedsfieldsvalue)

> **⚠️ Important:** At least either inputs of [`content`](#content), [`embeds`](#embeds), or [`files`](#files) must be provided.

#### `embeds[*].title`

**\[Optional\]** `<string>` Title of the embed, up to 256 characters; Support Discord Markdown.

#### `embeds[*].description`

**\[Optional\]** `<string>` Description of the embed, up to 4096 characters; Support Discord Markdown.

#### `embeds[*].url`

**\[Optional\]** `<string>` URL of the embed.

#### `embeds[*].timestamp`

**\[Optional\]** `<string>` Timestamp of the embed, by ISO 8601 format (e.g.: `"2011-11-11T11:11:11Z"`).

#### `embeds[*].color`

**\[Optional\]** `<number | string = 2105893>` Color of the embed (i.e.: left border's color of the embed); RGB integer, Hex (with prefix `#` (sharp)), namespace, and CSS colors (e.g.: `"rgb(32, 34, 37)"`) forms are acceptable.

Exclusive namespace:

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

> **⚠️ Important:**
>
> - Alpha channel is not supported.
> - General namespace are provided by [`meodai/color-names`](https://github.com/meodai/color-names), maybe change and/or remove without any notification, it is recommended to use value instead except you want a random color.

#### `embeds[*].footer`

**\[Optional\]** `<object>` Footer of the embed.

#### `embeds[*].footer.text`

**\[Optional\]** `<string>` Footer text, up to 2048 characters; Support Discord Markdown.

#### `embeds[*].footer.icon_url`

**\[Optional\]** `<string>` Source URL of the footer icon, only supports HTTP, HTTPS, and attachments.

#### `embeds[*].image`

**\[Optional\]** `<object>` Image of the embed.

#### `embeds[*].image.url`

**\[Optional\]** `<string>` Source URL of the image, only supports HTTP, HTTPS, and attachments.

#### `embeds[*].thumbnail`

**\[Optional\]** `<object>` Thumbnail of the embed.

#### `embeds[*].thumbnail.url`

**\[Optional\]** `<string>` Source URL of the thumbnail, only supports HTTP, HTTPS, and attachments.

#### `embeds[*].author`

**\[Optional\]** `<object>` Author of the embed.

#### `embeds[*].author.name`

**\[Optional\]** `<string>` Author name, up to 256 characters.

#### `embeds[*].author.url`

**\[Optional\]** `<string>` Author URL.

#### `embeds[*].author.icon_url`

**\[Optional\]** `<string>` Source URL of the author icon, only supports HTTP, HTTPS, and attachments.

#### `embeds[*].fields`

**\[Optional\]** `<object[]>` Fields of the embed, up to 25 fields.

#### `embeds[*].fields[*].name`

**\[Optional\]** `<string>` Field name, up to 256 characters; Support Discord Markdown.

#### `embeds[*].fields[*].value`

**\[Optional\]** `<string>` Field value, up to 1024 characters; Support Discord Markdown.

#### `embeds[*].fields[*].inline`

**\[Optional\]** `<boolean = false>` Whether the field should display inline.

### `allowed_mentions_parse`

**\[Optional\]** `<string[] = "roles,users,everyone">` Allowed mention types to parse from the content, separate each value with comma (`,`), vertical bar (`|`), semi-colon (`;`), whitespace, or per line.

- **`"roles"`:** Control roles mentions.
- **`"users"`:** Control users mentions.
- **`"everyone"`:** Control `@everyone` and `@here` mentions.

### `allowed_mentions_roles`

**\[Optional\]** `<string[]>` Allowed roles' IDs to mention, separate each value with comma (`,`), vertical bar (`|`), semi-colon (`;`), whitespace, or per line, up to 100 IDs.

### `allowed_mentions_users`

**\[Optional\]** `<string[]>` Allowed users' IDs to mention, separate each value with comma (`,`), vertical bar (`|`), semi-colon (`;`), whitespace, or per line, up to 100 IDs.

### `files`

**\[Optional\]** `<string[]>` Files as attachments of the message, which must be relative paths from GitHub Actions workspace (i.e.: `GITHUB_WORKSPACE`), separate each value per line, up to 8 MB and 10 files.

> **⚠️ Important:** At least either inputs of [`content`](#content), [`embeds`](#embeds), or [`files`](#files) must be provided.

### `wait`

**\[Optional\]** `<boolean = true>` Whether to wait for Discord confirmation of message send before response, and returns the created message body. When this input is `false`, a message that is not saved does not return an error.

### `thread_id`

**\[Optional\]** `<string>` Thread ID for the message channel. When this input is defined, the message will send to the specify thread, the thread will automatically unarchive.

> **⚠️ Important:** Only either inputs of [`thread_id`](#thread_id) or [`thread_name`](#thread_name) can be provided.

### `thread_name`

**\[Optional\]** `<string>` Thread name for the forum channel, up to 100 characters. When this input is defined, the message will create a new thread with the name.

> **⚠️ Important:** Only either inputs of [`thread_id`](#thread_id) or [`thread_name`](#thread_name) can be provided.

### `truncate_enable`

**\[Optional\]** `<boolean = true>` Whether to try truncate firstly when inputs are too large.

### `truncate_ellipsis`

**\[Optional\]** `<string = "...">` Ellipsis mark.

### `truncate_position`

**\[Optional\]** `<string = "end">` Ellipsis position.

- **`"end"`:** At the end of the string.
- **`"middle"`:** At the middle of the string.
- **`"start"`:** At the start of the string.

## 🧩 Output

### `response`

`<string>` Response content.

### `status_code`

`<number>` Request status code.

### `status_ok`

`<boolean>` Whether the request was successful.

### `status_text`

`<string>` Request status text.

## ✍️ Example

- Hello, world!
  ```yml
  jobs:
    job_id:
      name: "Send Discord Webhook"
      runs-on: "ubuntu-latest"
      steps:
        - uses: "hugoalh/send-discord-webhook-ghaction@v6.0.0"
          with:
            key: "${{secrets.DISCORD_WEBHOOK_KEY}}"
            content: "Hello, world!"
  ```
- birdie0
  > From [birdie0's Discord Webhooks Guide](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html).
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
  ![Example birdie0 Result](https://birdie0.github.io/discord-webhooks-guide/img/webhook_example.png "Example birdie0 Result")

## 📚 Guide

- Discord
  - [Execute Webhook](https://discord.com/developers/docs/resources/webhook#execute-webhook)
  - [Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- GitHub Actions
  - [Enabling debug logging](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging)
  - [Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
