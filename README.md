# Send Discord Webhook (GitHub Action)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/send-discord-webhook-ghaction](https://img.shields.io/github/v/release/hugoalh/send-discord-webhook-ghaction?label=hugoalh/send-discord-webhook-ghaction&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/send-discord-webhook-ghaction")](https://github.com/hugoalh/send-discord-webhook-ghaction)

A GitHub Action to send Discord webhook.

> [!IMPORTANT]
> - This documentation is v7.0.0 based; To view other version's documentation, please visit the [versions list](https://github.com/hugoalh/send-discord-webhook-ghaction/tags) and select the correct version.

## 🌟 Features

- Support attachments/files.
- Support poll.
- Support thread.

## 🔰 Begin

### 🎯 Targets

|  | **GitHub** |
|:--|:--|
| **[GitHub Actions Runner](https://github.com/actions/runner)** | [✔️ Docker](https://docs.github.com/en/actions) |

> [!NOTE]
> - It is possible to use this action in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **GitHub:**
  ```
  hugoalh/send-discord-webhook-ghaction[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to use this action with tag for immutability.

### 🛡️ Require GitHub Token Permissions

*This action does not require any GitHub token permission.*

## 🧩 Inputs

Almost all of the inputs are optional, but these groups of inputs must be defined:

- [`key`](#key)
- One of:
  - [`content`](#content), [`embeds`](#embeds), and/or [`files`](#files)
  - [`poll_question`](#poll_question) and [`poll_answers`](#poll_answers)
- One of:
  - *None*
  - [`thread_id`](#thread_id)
  - [`thread_name`](#thread_name) and optional [`thread_tags`](#thread_tags)

> | **Legend** | **Description** |
> |:-:|:--|
> | 🔐 | Should be an encrypted secret. |

### `key`

**🔐** `<string>` Discord webhook key; These syntaxes are acceptable:

- **Webhook ID & Token:** `{webhook.id}/{webhook.token}`
- **URL:** `https://discord.com/api/webhooks/{webhook.id}/{webhook.token}`
- **URL (Legacy):** `https://discordapp.com/api/webhooks/{webhook.id}/{webhook.token}`

### `username`

`<string>` Override the default webhook username, maximum 80 characters; "Clyde" is not allowed.

### `avatar_url`

`<string>` Override the default webhook avatar, only support URL of HTTP and HTTPS.

### `content`

`<string>` Message content, maximum 2000 characters; Support Discord Markdown.

### `content_links_no_embed`

`<RegExp[]>` Links' regular expressions to prevent Discord resolve and display matches links in the [`content`](#content) as embed under the message, only support URL of HTTP and HTTPS, separate each value per line.

Examples:

- **All:** `.+`
- **`.png` Image:** `\.png(?:\?|#|$)`
- **`.webp` Image:** `\.webp(?:\?|#|$)`
- **Twitch:** `twitch\.tv`

### `embeds`

`<object[]>` Message embed rich content, by JSON or YAML with restricted syntaxes, maximum 10 embeds, and maximum 6000 characters for summation from inputs:

- [`embeds[*].title`](#embedstitle)
- [`embeds[*].description`](#embedsdescription)
- [`embeds[*].footer.text`](#embedsfootertext)
- [`embeds[*].author.name`](#embedsauthorname)
- [`embeds[*].fields[*].name`](#embedsfieldsname)
- [`embeds[*].fields[*].value`](#embedsfieldsvalue)

#### `embeds[*].title`

`<string>` Message embed title, maximum 256 characters; Support Discord Markdown.

#### `embeds[*].description`

`<string>` Message embed description, maximum 4096 characters; Support Discord Markdown.

#### `embeds[*].url`

`<string>` Message embed URL.

#### `embeds[*].timestamp`

`<string>` Message embed timestamp, by ISO 8601 format (e.g.: `"2011-11-11T11:11:11Z"`).

#### `embeds[*].color`

`<number | string = 2105893>` Message embed colour (i.e.: left border's colour of the embed); These syntax are acceptable:

- **RGB Integer:** `{number}` (e.g.: `2105893`)
- **Hex:** `#{hex}{hex}{hex}` / `#{hex}{hex}{hex}{hex}{hex}{hex}` (e.g.: `#0063B1`)
- **Namespace:** (e.g.: `Blue`)
- **CSS:** (e.g.: `rgb(32, 34, 37)`)
- **Random:** `Random`
- **Special:**
  - <img src="https://www.colorhexa.com/202225.png" height="16px" width="16px" /> `Discord Embed Default` / `#202225` / `rgb(32, 34, 37)`
  - <img src="https://www.colorhexa.com/2F3136.png" height="16px" width="16px" /> `Discord Embed Background Dark` / `#2F3136` / `rgb(47, 49, 54)`
  - <img src="https://www.colorhexa.com/5865F2.png" height="16px" width="16px" /> `Discord Blurple` / `#5865F2` / `rgb(88, 101, 242)`
  - <img src="https://www.colorhexa.com/EB459E.png" height="16px" width="16px" /> `Discord Fuchsia` / `#EB459E` / `rgb(254, 231, 92)`
  - <img src="https://www.colorhexa.com/57F287.png" height="16px" width="16px" /> `Discord Green` / `#57F287` / `rgb(87, 242, 135)`
  - <img src="https://www.colorhexa.com/ED4245.png" height="16px" width="16px" /> `Discord Red` / `#ED4245` / `rgb(237, 66, 69)`
  - <img src="https://www.colorhexa.com/FEE75C.png" height="16px" width="16px" /> `Discord Yellow` / `#FEE75C` / `rgb(254, 231, 92)`

> [!NOTE]
> - Alpha channel is not supported.
> - General namespace are provided by NPM package [`color-name-list`](https://www.npmjs.com/package/color-name-list), list maybe change or remove without any notification, it is recommended to use value instead.

#### `embeds[*].footer`

`<object>` Message embed footer.

#### `embeds[*].footer.text`

`<string>` Message embed footer text, maximum 2048 characters; Support Discord Markdown.

#### `embeds[*].footer.icon_url`

`<string>` Message embed footer icon, only support URL of HTTP, HTTPS, and attachments.

#### `embeds[*].image`

`<object>` Message embed image.

#### `embeds[*].image.url`

`<string>` Message embed image URL, only support URL of HTTP, HTTPS, and attachments.

#### `embeds[*].thumbnail`

`<object>` Message embed thumbnail.

#### `embeds[*].thumbnail.url`

`<string>` Message embed thumbnail URL, only support URL of HTTP, HTTPS, and attachments.

#### `embeds[*].author`

`<object>` Message embed author.

#### `embeds[*].author.name`

`<string>` Message embed author name, maximum 256 characters.

#### `embeds[*].author.url`

`<string>` Message embed author URL.

#### `embeds[*].author.icon_url`

`<string>` Message embed author icon, only support URL of HTTP, HTTPS, and attachments.

#### `embeds[*].fields`

`<object[]>` Message embed fields, maximum 25 fields.

#### `embeds[*].fields[*].name`

`<string>` Message embed field name, maximum 256 characters; Support Discord Markdown.

#### `embeds[*].fields[*].value`

`<string>` Message embed field value, maximum 1024 characters; Support Discord Markdown.

#### `embeds[*].fields[*].inline`

`<boolean = false>` Whether the message embed field should display inline.

### `poll_question`

`<string>` Message poll question, maximum 300 characters.

### `poll_answers`

`<object[]>` Message poll answers, by JSON or YAML with restricted syntaxes, maximum 10 answers, and maximum 55 characters per answer text.

Poll answer can either text only, or append emoji with either custom emoji (`id`) or default emoji (`name`).

Example:

```yml
- emoji: # Default
    name: "🐈"
  text: "Cat"
- emoji: # Default
    name: "🐕"
  text: "Dog"
- emoji: # Custom
    id: "1"
  text: "Me"
- text: "Other"
```

### `poll_duration`

`<number = 24>` Message poll duration, by hours, maximum 32 days (i.e.: 768 hours).

### `poll_allow_multiselect`

`<boolean = false>` Whether the message poll allow multiple select answers.

### `files`

`<string[]>` Message attachments/files, by Glob path or literal path (select by input [`files_glob`](#files_glob)) under the workspace, separate each value per line, maximum 8 MB and 10 files.

### `files_glob`

`<boolean = true>` Whether input [files](#files) should accept Glob path instead of literal path.

### `allowed_mentions_parse_everyone`

`<boolean = true>` Whether the message allowed `@everyone` and `@here` mentions.

### `allowed_mentions_parse_roles`

`<boolean = true>` Whether the message allowed roles mentions.

### `allowed_mentions_parse_users`

`<boolean = true>` Whether the message allowed users mentions.

### `allowed_mentions_roles`

`<string[]>` Message allowed mention roles, by role ID, separate each value with comma (`,`) or per line, maximum 100 roles.

### `allowed_mentions_users`

`<string[]>` Message allowed mention users, by user ID, separate each value with comma (`,`) or per line, maximum 100 users.

### `tts`

`<boolean = false>` Whether the message use TTS (Text To Speech).

### `thread_id`

`<string>` Message channel thread ID. When this input is defined, the message will send to the specify thread, the thread will automatically unarchive.

### `thread_name`

`<string>` Forum channel thread name, maximum 100 characters. When this input is defined, the message will create a new thread with the name.

### `thread_tags`

`<string[]>` Forum channel thread tags, by thread tag ID, separate each value with comma (`,`) or per line, maximum 5 tags.

### `notification`

`<boolean = true>` Whether the message trigger push and desktop notifications.

### `truncate_enable`

`<boolean = true>` Whether to try truncate firstly when inputs are too large. Truncate will not work on inputs:

- [`poll_question`](#poll_question)
- [`poll_answers`](#poll_answers)

### `truncate_ellipsis`

`<string = "...">` Ellipsis mark.

### `truncate_position`

`<string = "end">` Ellipsis position.

- **`"end"`:** At the end of the string.
- **`"middle"`:** At the middle of the string.
- **`"start"`:** At the start of the string.

### `wait`

`<boolean = true>` Whether to wait for Discord confirmation of message send before response, and returns the created message body. When this input is `false`, a message that is not saved does not return an error.

## 🧩 Outputs

### `response`

`<string>` Response content.

### `status_code`

`<number>` Request status code.

### `status_ok`

`<boolean>` Whether the request was successful.

### `status_text`

`<string>` Request status text.

## ✍️ Examples

- Hello, world!
  ```yml
  jobs:
    job_id:
      name: "Send Discord Webhook"
      runs-on: "ubuntu-latest"
      steps:
        - uses: "hugoalh/send-discord-webhook-ghaction@v7.0.0"
          with:
            key: "${{secrets.DISCORD_WEBHOOK_KEY}}"
            content: "Hello, world!"
  ```
- birdie0 (from [birdie0's Discord Webhooks Guide](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html))
  ```yml
  jobs:
    job_id:
      name: "Send Discord Webhook"
      runs-on: "ubuntu-latest"
      steps:
        - uses: "hugoalh/send-discord-webhook-ghaction@v7.0.0"
          with:
            key: "${{secrets.DISCORD_WEBHOOK_KEY}}"
            username: "Webhook"
            avatar_url: "https://i.imgur.com/4M34hi2.png"
            content: "Text message. Up to 2000 characters."
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

## 📚 Guides

- Discord
  - [Execute Webhook](https://discord.com/developers/docs/resources/webhook#execute-webhook)
  - [Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- GitHub Actions
  - [Enabling debug logging](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging)
  - [Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
