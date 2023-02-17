🌐 | [English](./README.md) / [漢語](./README-ZH.md)

---

# Send Discord Webhook (GitHub Action)

[`SendDiscordWebhook.GitHubAction`](https://github.com/hugoalh/send-discord-webhook-ghaction)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh/send-discord-webhook-ghaction?label=Stars&logo=github&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh/send-discord-webhook-ghaction/stargazers)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh/send-discord-webhook-ghaction?label=Contributors&logo=github&logoColor=ffffff&style=flat-square "GitHub Contributors")](https://github.com/hugoalh/send-discord-webhook-ghaction/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh/send-discord-webhook-ghaction?label=Issues&logo=github&logoColor=ffffff&style=flat-square "GitHub Issues")](https://github.com/hugoalh/send-discord-webhook-ghaction/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh/send-discord-webhook-ghaction?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square "GitHub Pull Requests")](https://github.com/hugoalh/send-discord-webhook-ghaction/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh/send-discord-webhook-ghaction?label=Discussions&logo=github&logoColor=ffffff&style=flat-square "GitHub Discussions")](https://github.com/hugoalh/send-discord-webhook-ghaction/discussions)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh/send-discord-webhook-ghaction?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh/send-discord-webhook-ghaction)

| **Releases** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh/send-discord-webhook-ghaction?label=&style=flat-square "GitHub Latest Release Date")) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh/send-discord-webhook-ghaction?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh/send-discord-webhook-ghaction/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh/send-discord-webhook-ghaction/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?sort=semver&label=&style=flat-square "GitHub Latest Release Version") | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") |

## 📝 Description

A GitHub Action to send a Discord webhook.

### 🌟 Feature

- Support attachments/files.
- Support thread.

## 📚 Documentation

> **⚠ Important:** This documentation is v5.0.0 based; To view other version's documentation, please visit the [versions list](https://github.com/hugoalh/send-discord-webhook-ghaction/tags) and select the correct version.

### Getting Started

#### Install (For Self Host)

- GitHub Actions Runner >= v2.297.0
  - NodeJS ^ v16.13.0

#### Use

```yml
jobs:
  job_id:
    runs-on: "________" # Any
    steps:
      - uses: "hugoalh/send-discord-webhook-ghaction@<Version>"
```

### 📥 Input

> | **Legend** | **Description** |
> |:-:|:--|
> | 🔐 | Should be an encrypted secret. |

#### `key`

**🔐** `<string>` Key; Both long and short forms are acceptable.

```
https://discord.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL  ⬅Long
                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^  ⬅Short

https://discordapp.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL  ⬅Long (Legacy)
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^  ⬅Short (Legacy)
```

#### `method`

**\[Optional\]** `<string>` Method to send.

- **Default:** Let this action automatically determine the best method.
- **`"form"`:** Use `multipart/form-data`.
- **`"json"`:** Use `application/json`.

When this input is not defined, and input [`files`](#files) is:

- defined, will use `"form"`.
- not defined, will use `"json"`.

When this input is `"json"`, and input [`files`](#files) is defined, will throw an error.

#### `payload`

**\[Optional\]** `<object = {}>` JSON/YAML/YML payload, which restricted format and pattern; At least one of the input [`payload.content`](#content), [`payload.embeds`](#embeds), or [`files`](#files) must be provided. View the JSON payload template in [here](./discord-webhook-payload-template.json).

> **⚠ Important:** Properties which have not listed in here or in the template are not supported.

<details open>

##### `content`

**\[Optional\]** `<string>` Content of the message, up to 2000 characters.

##### `username`

**\[Optional\]** `<string>` Override the default username of the webhook, up to 80 characters; "Clyde" is not allowed.

##### `avatar_url`

**\[Optional\]** `<string>` Source URL of the avatar, only supports HTTP and HTTPS; Override the default avatar of the webhook.

##### `tts`

**\[Optional\]** `<boolean = false>` Whether to use TTS (Text To Speech) for the message.

##### `embeds`

**\[Optional\]** `<object[]>` Embed rich content for the message, up to 10 embeds and 6000 characters for summation of:

- [`embeds[*].title`](#embedstitle)
- [`embeds[*].description`](#embedsdescription)
- [`embeds[*].footer.text`](#embedsfootertext)
- [`embeds[*].author.name`](#embedsauthorname)
- [`embeds[*].fields[*].name`](#embedsfieldsname)
- [`embeds[*].fields[*].value`](#embedsfieldsvalue)

##### `embeds[*].title`

**\[Optional\]** `<string>` Title of the embed, up to 256 characters.

##### `embeds[*].description`

**\[Optional\]** `<string>` Description of the embed, up to 4096 characters.

##### `embeds[*].url`

**\[Optional\]** `<string>` URL of the embed.

##### `embeds[*].timestamp`

**\[Optional\]** `<string>` Timestamp of the embed, by ISO 8601 format (e.g.: `"2011-11-11T11:11:11Z"`).

##### `embeds[*].color`

**\[Optional\]** `<number | string = 2105893>` Color of the embed (i.e.: left border's color of the embed); RGB integer, Hex (with prefix `#` (sharp)), namespaced string, and CSS colors string (e.g.: `"rgb(32, 34, 37)"`) forms are acceptable. Exclusive namespaced strings:

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
> - Namespaced strings are provided by [`meodai/color-names`](https://github.com/meodai/color-names), maybe change and/or remove without any notification, use value instead except you want a random color.

##### `embeds[*].footer`

**\[Optional\]** `<object>` Footer of the embed.

##### `embeds[*].footer.text`

**\[Optional\]** `<string>` Footer text, up to 2048 characters.

##### `embeds[*].footer.icon_url`

**\[Optional\]** `<string>` Source URL of the footer icon, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].image`

**\[Optional\]** `<object>` Image of the embed.

##### `embeds[*].image.url`

**\[Optional\]** `<string>` Source URL of the image, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].thumbnail`

**\[Optional\]** `<object>` Thumbnail of the embed.

##### `embeds[*].thumbnail.url`

**\[Optional\]** `<string>` Source URL of the thumbnail, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].author`

**\[Optional\]** `<object>` Author of the embed.

##### `embeds[*].author.name`

**\[Optional\]** `<string>` Author name, up to 256 characters.

##### `embeds[*].author.url`

**\[Optional\]** `<string>` Author URL.

##### `embeds[*].author.icon_url`

**\[Optional\]** `<string>` Source URL of the author icon, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].fields`

**\[Optional\]** `<object[]>` Fields of the embed, up to 25 fields.

##### `embeds[*].fields[*].name`

**\[Optional\]** `<string>` Field name, up to 256 characters.

##### `embeds[*].fields[*].value`

**\[Optional\]** `<string>` Field value, up to 1024 characters.

##### `embeds[*].fields[*].inline`

**\[Optional\]** `<boolean = false>` Whether the field should display inline.

##### `allowed_mentions`

**\[Optional\]** `<object>` Allowed mentions for the message.

##### `allowed_mentions.parse`

**\[Optional\]** `<string[]>` Allowed mention types to parse from the content.

- **`"roles"`:** Control roles mentions.
- **`"users"`:** Control users mentions.
- **`"everyone"`:** Control `@everyone` and `@here` mentions.

##### `allowed_mentions.roles`

**\[Optional\]** `<string[]>` Allowed roles' IDs to mention, up to 100 IDs.

##### `allowed_mentions.users`

**\[Optional\]** `<string[]>` Allowed users' IDs to mention, up to 100 IDs.

</details>

#### `files`

**\[Optional\]** `<string[] = []>` Files as attachments of the message, which must be relative paths from GitHub Actions workspace, up to 8 MB and 10 files; At least one of the input [`payload.content`](#content), [`payload.embeds`](#embeds), or [`files`](#files) must be provided.

#### `wait`

**\[Optional\]** `<boolean = false>` Whether to wait for Discord confirmation of message send before response, and returns the created message body. When this input is `false`, a message that is not saved does not return an error.

#### `thread_type`

**\[Optional\]** `<string = "none">` Thread type of the message; Send to the specified thread within a webhook's channel.

- **`"none"`:** Not a thread. When this is defined, will ignore input [`thread_value`](#thread_value).
- **`"id"`:** A created thread for message channel, the thread will automatically unarchive. When this is defined, input [`thread_value`](#thread_value) is require.
- **`"name"`:** A new thread for forum channel.

#### `thread_value`

**🔐 \[Optional\]** `<string>` Thread value of the message. When [`thread_type`](#thread_type) is:

- `"none"`, this is ignored.
- `"id"`, this is require the created thread ID.
- `"name"`, this is the new thread name (i.e.: thread title), up to 100 characters; When not defined, the value will fill with the first available value in this order:
  - [`payload.content`](#content)
  - [`payload.embeds[0].title`](#embedstitle) when [`payload.embeds`](#embeds) has only 1 element
  - [`payload.embeds[0].description`](#embedsdescription) when [`payload.embeds`](#embeds) has only 1 element
  - `Send Discord Webhook - {Timestamp}`, `Timestamp` is the current time in ISO 8601 format.

#### `truncate_enable`

**\[Optional\]** `<boolean = true>` Whether to try truncate firstly when inputs are too large.

#### `truncate_ellipsis`

**\[Optional\]** `<string = "...">` Ellipsis mark.

#### `truncate_position`

**\[Optional\]** `<string = "end">` Ellipsis position.

- **`"end"`:** At the end of the string.
- **`"middle"`:** At the middle of the string.
- **`"start"`:** At the start of the string.

### 📤 Output

#### `response`

`<string>` Response content.

#### `status_code`

`<number>` Request status code.

#### `status_ok`

`<boolean>` Whether the request was successful.

#### `status_text`

`<string>` Request status text.

### Example

#### Hello, world!

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
            content: "Hello, world!"
```

#### birdie0

> From [birdie0's Discord Webhooks Guide](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html).

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

![Example birdie0 Result](https://birdie0.github.io/discord-webhooks-guide/img/webhook_example.png "Example birdie0 Result")

### Guide

#### Discord

- [Execute Webhook](https://discord.com/developers/docs/resources/webhook#execute-webhook)
- [Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

#### GitHub Actions

- [Enabling debug logging](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging)
- [Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
