🌐 | [English](./README.md) / [漢語](./README-ZH.md)

---

# Send Discord Webhook (GitHub Action)

[`SendDiscordWebhook.GitHubAction`](https://github.com/hugoalh/send-discord-webhook-ghaction)

![GitHub Action](https://img.shields.io/badge/GitHub%20Action-2088FF?logo=github-actions&logoColor=ffffff&style=flat-square "GitHub Action")
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

> **⚠ Important:** This documentation is v5.0.0 based; To view other release's/tag's/version's documentation, please visit the [releases/tags/versions list](https://github.com/hugoalh/send-discord-webhook-ghaction/tags) and select the correct release/tag/version.

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
      - uses: "hugoalh/send-discord-webhook-ghaction@<tag/version>"
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

**\[Optional\]** `<string>` The message contents, up to 2000 characters.

##### `username`

**\[Optional\]** `<string>` Override the default username of the webhook, up to 80 characters; "Clyde" is not allowed.

##### `avatar_url`

**\[Optional\]** `<string>` Override the default avatar of the webhook.

##### `tts`

**\[Optional\]** `<boolean = false>` Use TTS (Text To Speech).

##### `embeds`

**\[Optional\]** `<object[]>` Embed rich content, up to 10 embeds, and up to 6000 characters for summation of:

- [`embeds[*].title`](#embedstitle)
- [`embeds[*].description`](#embedsdescription)
- [`embeds[*].footer.text`](#embedsfootertext)
- [`embeds[*].author.name`](#embedsauthorname)
- [`embeds[*].fields[*].name`](#embedsfieldsname)
- [`embeds[*].fields[*].value`](#embedsfieldsvalue)

##### `embeds[*].title`

**\[Optional\]** `<string>` Title of embed, up to 256 characters.

##### `embeds[*].description`

**\[Optional\]** `<string>` Description of embed, up to 4096 characters.

##### `embeds[*].url`

**\[Optional\]** `<string>` URL of embed.

##### `embeds[*].timestamp`

**\[Optional\]** `<string>` Timestamp of embed, with format ISO 8601 (e.g.: `"2011-11-11T11:11:11Z"`).

##### `embeds[*].color`

**\[Optional\]** `<number | string = 2105893>` Color of embed (i.e.: left border's color of embed); Decimal (RGB integer), Hex (with prefix `#` (sharp)), namespaced string, and RGB string (split with `,` (comma)) forms are acceptable. Exclusive namespaced strings:

|  | **Namespace** | **Hex** | **RGB** | **Description** |
|:-:|:-:|:-:|:-:|:--|
| <img src="https://www.colorhexa.com/202225.png" height="16px" width="16px" /> | `"Default"` |  `"#202225"` |`"32,34,37"` | Default. |
| 🍭 | `"Random"` |  |  | Random. |
| <img src="https://www.colorhexa.com/5865F2.png" height="16px" width="16px" /> | `"Discord Blurple"` | `"#5865F2"` | `"88,101,242"` | Discord blurple. |
| <img src="https://www.colorhexa.com/EB459E.png" height="16px" width="16px" /> | `"Discord Fuchsia"` | `"#EB459E"` | `"254,231,92"` | Discord fuchsia. |
| <img src="https://www.colorhexa.com/57F287.png" height="16px" width="16px" /> | `"Discord Green"` | `"#57F287"` | `"87,242,135"` | Discord green. |
| <img src="https://www.colorhexa.com/ED4245.png" height="16px" width="16px" /> | `"Discord Red"` | `"#ED4245"` | `"237,66,69"` | Discord red. |
| <img src="https://www.colorhexa.com/FEE75C.png" height="16px" width="16px" /> | `"Discord Yellow"` | `"#FEE75C"` | `"254,231,92"` | Discord yellow. |
| <img src="https://www.colorhexa.com/2F3136.png" height="16px" width="16px" /> | `"Embed Background Dark"` | `"#2F3136"` | `"47,49,54"` | Embed background in dark mode. |

##### `embeds[*].footer`

**\[Optional\]** `<object>` Footer of embed.

##### `embeds[*].footer.text`

**\[Optional\]** `<string>` Footer text, up to 2048 characters.

##### `embeds[*].footer.icon_url`

**\[Optional\]** `<string>` URL of footer icon, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].image`

**\[Optional\]** `<object>` Image of embed.

##### `embeds[*].image.url`

**\[Optional\]** `<string>` Source URL of image, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].thumbnail`

**\[Optional\]** `<object>` Thumbnail of embed.

##### `embeds[*].thumbnail.url`

**\[Optional\]** `<string>` Source URL of thumbnail, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].author`

**\[Optional\]** `<object>` Author of embed.

##### `embeds[*].author.name`

**\[Optional\]** `<string>` Name of author, up to 256 characters.

##### `embeds[*].author.url`

**\[Optional\]** `<string>` URL of author.

##### `embeds[*].author.icon_url`

**\[Optional\]** `<string>` URL of author icon, only supports HTTP, HTTPS, and attachments.

##### `embeds[*].fields`

**\[Optional\]** `<object[]>` Fields of embed, up to 25 fields.

##### `embeds[*].fields[*].name`

**\[Optional\]** `<string>` Name of field, up to 256 characters.

##### `embeds[*].fields[*].value`

**\[Optional\]** `<string>` Value of field, up to 1024 characters.

##### `embeds[*].fields[*].inline`

**\[Optional\]** `<boolean = false>` Field should display inline or not.

##### `allowed_mentions`

**\[Optional\]** `<object>` Allowed mentions for the message.

##### `allowed_mentions.parse`

**\[Optional\]** `<string[]>` Allowed mention types to parse from the content.

- **`"roles"`:** Controls role mentions.
- **`"users"`:** Controls user mentions.
- **`"everyone"`:** Controls `@everyone` and `@here` mentions.

##### `allowed_mentions.roles`

**\[Optional\]** `<string[]>` Roles ID to mention, up to 100 IDs.

##### `allowed_mentions.users`

**\[Optional\]** `<string[]>` Users ID to mention, up to 100 IDs.

</details>

#### `files`

**\[Optional\]** `<string[]>` Files as attachments, which must be relative paths from and inside GitHub Actions workspace, up to 8 MB and 10 files; At least one of the input [`payload.content`](#content), [`payload.embeds`](#embeds), or [`files`](#files) must be provided.

#### `threadid`

**🔐 \[Optional\]** `<string>` Thread ID; Send to the specified thread within a webhook's channel, the thread will automatically be unarchived.

#### `wait`

**\[Optional\]** `<boolean = false>` Whether to wait for Discord confirmation of message send before response, and returns the created message body. When this input is `false`, a message that is not saved does not return an error.

#### `truncate_enable`

**\[Optional\]** `<boolean = true>` Whether to try truncate firstly when input [`payload`](#payload) is too large.

#### `truncate_ellipsis`

**\[Optional\]** `<string = "...">` Ellipsis.

#### `truncate_position`

**\[Optional\]** `<string = "end">` Ellipsis position.

- **`"end"`:** At the end of the string.
- **`"middle"`:** At the middle of the string.
- **`"start"`:** At the start of the string.

### 📤 Output

*N/A*

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

- [Enabling debug logging](https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging)
- [Encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets)
