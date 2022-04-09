🌐 | [English](./README.md) / [中文](./README-ZHHANT.md)

# Send Discord Webhook (GitHub Action)

[`SendDiscordWebhook.GitHubAction`](https://github.com/hugoalh/send-discord-webhook-ghaction)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh/send-discord-webhook-ghaction?label=Contributors&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh/send-discord-webhook-ghaction?label=Issues&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh/send-discord-webhook-ghaction?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh/send-discord-webhook-ghaction?label=Discussions&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/discussions)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh/send-discord-webhook-ghaction?label=Stars&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hugoalh/send-discord-webhook-ghaction?label=Forks&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/send-discord-webhook-ghaction/network/members)
![GitHub Languages](https://img.shields.io/github/languages/count/hugoalh/send-discord-webhook-ghaction?label=Languages&logo=github&logoColor=ffffff&style=flat-square)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh/send-discord-webhook-ghaction?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square)](https://www.codefactor.io/repository/github/hugoalh/send-discord-webhook-ghaction)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/g/hugoalh/send-discord-webhook-ghaction?label=Alerts&logo=lgtm&logoColor=ffffff&style=flat-square)
![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/g/hugoalh/send-discord-webhook-ghaction?label=Grade&logo=lgtm&logoColor=ffffff&style=flat-square)](https://lgtm.com/projects/g/hugoalh/send-discord-webhook-ghaction)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=brightgreen&style=flat-square)](./LICENSE.md)

| **Release** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh/send-discord-webhook-ghaction?label=%20&style=flat-square)) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh/send-discord-webhook-ghaction?label=%20&style=flat-square)) |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh/send-discord-webhook-ghaction/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh/send-discord-webhook-ghaction/total?label=%20&style=flat-square) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?sort=semver&label=%20&style=flat-square) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh/send-discord-webhook-ghaction?include_prereleases&sort=semver&label=%20&style=flat-square) |

## 📝 Description

A GitHub Action to send a Discord webhook.

*Previous named "\[GitHub Action\] Send To Discord".*

### 🌟 Feature

- Support attachments/files.
- Support thread.

## 📚 Documentation

> **⚠ Important:** This documentation is v4.2.0 based; To view other tag's/version's documentation, please visit the [tag/version list](https://github.com/hugoalh/send-discord-webhook-ghaction/tags) and select the correct tag/version.

### 🎯 Entrypoint / Target

```yml
jobs:
  job_id:
    runs-on:
    steps:
      - uses:
```

|  | **`jobs.job_id.runs-on`** | **`jobs.job_id.steps[*].uses`** | **Require Software** |
|:-:|:-:|:-:|:-:|
| **Default (`+default`)** | `"ubuntu-________"` | `"hugoalh/send-discord-webhook-ghaction@<tag/version>"` | Docker |
| **Docker (`+docker`)** | `"ubuntu-________"` | `"hugoalh/send-discord-webhook-ghaction/use-docker@<tag/version>"` | Docker |
| **NodeJS (`+nodejs`)** | Any | `"hugoalh/send-discord-webhook-ghaction/use-nodejs@<tag/version>"` | NodeJS (>= v14.15.0) + NPM (>= v6.14.8) |

> **⚠ Important:**
> 
> - Default entrypoint is currently based to Docker (`+docker`), base can be changed between versions without announcement to ensure the stability.
> - NodeJS entrypoint maybe need extra steps to manually setup NodeJS version.

### 📥 Input

> | **Legend** | **Description** |
> |:-:|:--|
> | 🔐 | Should be an encrypted secret. |

#### `key`

**🔐** `<string>` Key; Both long and short forms are acceptable.

```
https://discord.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Long
                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^  Short

https://discordapp.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Long (Old)
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^  Short (Old)
```

#### `method`

**\[Optional\]** `<string = "">` Method to send.

- **Default:** Let this action automatically determine the best method.
- **`"form"`:** Use `multipart/form-data`.
- **`"json"`:** Use `application/json`.

When this input is not defined, and input `files` is:

- defined, will use `"form"`.
- not defined, will use `"json"`.

When this input is `"json"`, and input `files` is defined, will throw an error.

#### `payload`

**\[Optional\]** `<object = {}>` JSON/YAML/YML payload, which restricted format and pattern; At least one of the input `payload.content`, `payload.embeds`, or `files` must be provided. *[View the JSON payload template in here.](./discord-webhook-payload-template.json)*

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

- `embeds[*].title`
- `embeds[*].description`
- `embeds[*].footer.text`
- `embeds[*].author.name`
- `embeds[*].fields[*].name`
- `embeds[*].fields[*].value`

##### `embeds[*].title`

**\[Optional\]** `<string>` Title of embed, up to 256 characters.

##### `embeds[*].description`

**\[Optional\]** `<string>` Description of embed, up to 4096 characters.

##### `embeds[*].url`

**\[Optional\]** `<string>` URL of embed.

##### `embeds[*].timestamp`

**\[Optional\]** `<string>` Timestamp of embed, with format ISO 8601 (e.g.: `"2011-11-11T11:11:11Z"`).

##### `embeds[*].color`

**\[Optional\]** `<(number | string) = 2105893>` Color of the embed (i.e.: left border's color of embed); Decimal (integer / RGB integer), Hex (6 digits, with prefix `#` (sharp)), namespaced string, and RGB string (split with `,` (comma)) forms are acceptable.

|  | **Decimal** | **Hex** | **Namespace** | **RGB** |
|:-:|:-:|:-:|:-:|:-:|
| <img src="https://www.colorhexa.com/000000.png" height="16px" width="16px" /> **Black** | `0` | `"#000000"` | `"black"` | `"0,0,0"` |
| <img src="https://www.colorhexa.com/202225.png" height="16px" width="16px" /> **Default** | `2105893` | `"#202225"` | `"default"` | `"32,34,37"` |
| <img src="https://www.colorhexa.com/23272A.png" height="16px" width="16px" /> **Discord Black** | `2303786` | `"#23272A"` | `"discordblack"` | `"35,39,42"` |
| <img src="https://www.colorhexa.com/2C2F33.png" height="16px" width="16px" /> **Discord Dark** | `2895667` | `"#2C2F33"` | `"discorddark"` | `"44,47,51"` |
| <img src="https://www.colorhexa.com/2F3136.png" height="16px" width="16px" /> **Embed Background (Dark Mode)** | `3092790` | `"#2F3136"` | `"embeddark"` | `"47,49,54"` |
| <img src="https://www.colorhexa.com/7289DA.png" height="16px" width="16px" /> **Discord Blue Purple** | `7506394` | `"#7289DA"` | `"discordblurple"` | `"114,137,218"` |
| <img src="https://www.colorhexa.com/99AAB5.png" height="16px" width="16px" /> **Discord Gray/Grey Purple** | `10070709` | `"#99AAB5"` | `"discordgrayple"` / `"discordgreyple"` | `"153,170,181"` |
| <img src="https://www.colorhexa.com/FFFFFF.png" height="16px" width="16px" /> **White** | `16777215` | `"#FFFFFF"` | `"white"` | `"255,255,255"` |
| **Random** |  |  | `"random"` |  |

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

**\[Optional\]** `<string[] = []>` Files as attachment, which must be relative paths from and inside GitHub Actions workspace, up to 8 MB and 10 files; At least one of the input `payload.content`, `payload.embeds`, or `files` must be provided.

#### `threadid`

**🔐 \[Optional\]** `<string>` Thread ID; Send to the specified thread within a webhook's channel, the thread will automatically be unarchived.

#### `wait`

**\[Optional\]** `<boolean = false>` Wait for Discord confirmation of message send before response, and returns the created message body. When this input is `false`, a message that is not saved does not return an error.

#### `truncate_enable`

**\[Optional\]** `<boolean = true>` When input `payload` is too large, try to prune/trim/truncate first.

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
      - uses: "hugoalh/send-discord-webhook-ghaction@v4.0.0"
        with:
          key: "${{secrets.DISCORD_WEBHOOK_KEY}}"
          payload: |
            {
              "content": "Hello, world!"
            }
```

#### birdie0

> From [birdie0's Discord Webhooks Guide](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html).

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

![Example birdie0 Result](https://birdie0.github.io/discord-webhooks-guide/img/webhook_example.png)

### Guide

#### Discord

- [Execute Webhook](https://discord.com/developers/docs/resources/webhook#execute-webhook)
- [Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

#### GitHub Actions

- [Enabling debug logging](https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging)
- [Encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets)
