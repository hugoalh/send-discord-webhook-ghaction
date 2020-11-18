# \[GitHub Action\] Send To Discord

<details>
  <summary><a href="https://github.com/hugoalh/GitHubAction.SendToDiscord"><code>hugoalh/GitHubAction.SendToDiscord</code></a></summary>
  <img align="center" alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/hugoalh/GitHubAction.SendToDiscord?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Top Langauge" src="https://img.shields.io/github/languages/top/hugoalh/GitHubAction.SendToDiscord?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Repo Size" src="https://img.shields.io/github/repo-size/hugoalh/GitHubAction.SendToDiscord?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Code Size" src="https://img.shields.io/github/languages/code-size/hugoalh/GitHubAction.SendToDiscord?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Watcher" src="https://img.shields.io/github/watchers/hugoalh/GitHubAction.SendToDiscord?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Star" src="https://img.shields.io/github/stars/hugoalh/GitHubAction.SendToDiscord?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Fork" src="https://img.shields.io/github/forks/hugoalh/GitHubAction.SendToDiscord?logo=github&logoColor=ffffff&style=flat-square" />
</details>

A GitHub action to send message to Discord via webhook.

<table>
  <tr>
    <td><a href="./LICENSE.md"><b>License</b></a></td>
    <td>MIT</td>
  </tr>
  <tr>
    <td><a href="https://github.com/hugoalh/GitHubAction.SendToDiscord/releases"><b>Release</b></a> <img align="center" src="https://img.shields.io/github/downloads/hugoalh/GitHubAction.SendToDiscord/total?label=%20&style=flat-square" /></td>
    <td>
      <b>Latest:</b> <img align="center" src="https://img.shields.io/github/release/hugoalh/GitHubAction.SendToDiscord?sort=semver&label=%20&style=flat-square" /> (<img align="center" src="https://img.shields.io/github/release-date/hugoalh/GitHubAction.SendToDiscord?label=%20&style=flat-square" />)<br />
      <b>Pre:</b> <img align="center" src="https://img.shields.io/github/release/hugoalh/GitHubAction.SendToDiscord?include_prereleases&sort=semver&label=%20&style=flat-square" /> (<img align="center" src="https://img.shields.io/github/release-date-pre/hugoalh/GitHubAction.SendToDiscord?label=%20&style=flat-square" />)
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/hugoalh/GitHubAction.SendToDiscord/graphs/contributors"><b>Contributor</b></a> <img align="center" src="https://img.shields.io/github/contributors/hugoalh/GitHubAction.SendToDiscord?label=%20&style=flat-square" /></td>
    <td><ul>
        <li><a href="https://github.com/hugoalh">hugoalh</a></li>
        <li><a href="https://github.com/hugoalh-studio">hugoalh Studio</a></li>
    </ul></td>
  </tr>
  <tr>
    <td><a href="https://github.com/hugoalh/GitHubAction.SendToDiscord/issues?q=is%3Aissue"><b>Issue</b></a></td>
    <td><img align="center" src="https://img.shields.io/github/issues-raw/hugoalh/GitHubAction.SendToDiscord?label=%20&style=flat-square" /> : <img align="center" src="https://img.shields.io/github/issues-closed-raw/hugoalh/GitHubAction.SendToDiscord?label=%20&style=flat-square" /></td>
  </tr>
  <tr>
    <td><a href="https://github.com/hugoalh/GitHubAction.SendToDiscord/pulls?q=is%3Apr"><b>Pull Request</b></a></td>
    <td><img align="center" src="https://img.shields.io/github/issues-pr-raw/hugoalh/GitHubAction.SendToDiscord?label=%20&style=flat-square" /> : <img align="center" src="https://img.shields.io/github/issues-pr-closed-raw/hugoalh/GitHubAction.SendToDiscord?label=%20&style=flat-square" /></td>
  </tr>
  <tr>
    <td><b>Code Quality</b></td>
    <td>
      <a href="https://www.codefactor.io/repository/github/hugoalh/githubaction.sendtodiscord"><img align="center" alt="CodeFactor Grade" src="https://img.shields.io/codefactor/grade/github/hugoalh/GitHubAction.SendToDiscord?logo=codefactor&logoColor=ffffff&style=flat-square" /></a>
      <a href="https://lgtm.com/projects/g/hugoalh/GitHubAction.SendToDiscord/alerts"><img align="center" alt="LGTM Alert" src="https://img.shields.io/lgtm/alerts/g/hugoalh/GitHubAction.SendToDiscord?label=%20&logo=lgtm&logoColor=ffffff&style=flat-square" /></a>
      <a href="https://lgtm.com/projects/g/hugoalh/GitHubAction.SendToDiscord/context:javascript"><img align="center" alt="LGTM Grade" src="https://img.shields.io/lgtm/grade/javascript/g/hugoalh/GitHubAction.SendToDiscord?logo=lgtm&logoColor=ffffff&style=flat-square" /></a>
    </td>
  </tr>
</table>

## 📜 Description

### 🌟 Feature

- Simple setup.
- Support variable to create dynamic/rich content.

## 🛠 Configuration

### 🏗 Environment

#### Operating System

Any

#### Software

- NodeJS (>= v12.13)
- NPM (>= v6.12)

### 📥 Input

| **Legend** | **Description** |
|:---:|:----|
| \[C\] | Configuration argument (>= v3). |
| \[V\] | Support variable. |
| \[W\] | Workflow argument. |

To use variable in the supported argument, follow the pattern:

| **Category** | **Workflow File (Parse Via GitHub Machine/Runner)** | **Workflow File (Parse Via Action)** |
|:---:|:---:|:---:|
| External | *(N/A)* | `"<variable_prefix>external<variable_join><namespace><variable_suffix>"` |
| GitHub Event Webhook Payload | `"${{github.event.<namespace>}}"` | `"<variable_prefix>payload<variable_join><namespace><variable_suffix>"` |

#### \[W\] `configuration`

**(>= v3) \[Optional\]** `<(string|object.json) = "false">` Select to use workflow argument or configuration argument.
- **Enable Externally:** A relative JSON, JSONC, YAML, or YML file path (end with `.json`, `.jsonc`, `.yaml`, or `.yml`) which in the same repository, file size must smaller than 1 MB (restricted by GitHub). Workflow argument will ignore when configuration argument is available.
- **Enable Locally:** A stringify JSON paste in here. Workflow argument will ignore when configuration argument is available.
- **Disable:** Use workflow argument.

#### \[W\] `github_token`

**(>= v3) \[Optional\]** `<string.secret = "${{github.token}}">` GitHub personal access token, only use when need to fetch the configuration file specify in the [`configuration`](#W-configuration).

#### \[W\] `webhook_id`

`<string.secret>` Discord webhook ID. If the webhook url is `https://discord.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL`, then the webhook ID will be `70971114`.

#### \[W\] `webhook_token`

`<string.secret>` Discord webhook token. If the webhook url is `https://discord.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL`, then the webhook token will be `ueyzeWxB_8bb1zMhL`.

#### \[W\] `variable_join`

**\[Optional\]** `<string = "_">` Variable join if the variable list has depth.

#### \[W\] `variable_list_external`

**\[Optional\]** `<object.json>` External variable list that will use in the data. Can import from other actions' output.

#### \[W\] `variable_prefix`

**\[Optional\]** `<string = "%">` Variable prefix.

#### \[W\] `variable_suffix`

**\[Optional\]** `<string = "%">` Variable suffix.

#### \[C\] `content`
#### \[W\] `message_text`

**\[Optional\] \[V\]** `<string>` Text. Automatically crop when more than 2000 characters.

#### \[C\] `username`
#### \[W\] `webhook_name`

**\[Optional\] \[V\]** `<string>` Webhook display name (i.e.: the sender's name), this can override the default username of the webhook. Automatically ignore when not between 2 and 32 characters.

#### \[C\] `avatar_url`
#### \[W\] `webhook_avatarurl`

**\[Optional\] \[V\]** `<string>` Webhook avatar url (i.e.: the sender's avatar), this can override the default avatar of the webhook. The image url must be in format of JPEG/JPG, or PNG. GIF is not supported due to restricted by Discord.

#### \[C\] `tts`
#### \[W\] `message_usetexttospeech`

**\[Optional\]** `<boolean = false>` Use text to speech for this message.

#### \[C\] `embeds.<Array>`
#### \[W\] `message_embed`

Embed(s) for this message. For configuration argument, number start at `0`, maximum 10 embeds per message; For workflow argument, maximum 1 embed per message.

#### [C] `embeds.<Array>.title`
#### [W] `message_embed_title`

**\[Optional unless have [`embeds.<Array>.url`](#C-embedsArrayurl)\] \[V\]** Embed title. Automatically crop when more than 256 characters.

#### \[C\] `embeds.<Array>.description`
#### \[W\] `message_embed_description`

**\[Optional\] \[V\]** `<string>` Embed description. Automatically crop when more than 2048 characters.

#### \[C\] `embeds.<Array>.url`
#### \[W\] `message_embed_titleurl`

**\[Optional\] \[V\]** `<string>` Embed title url.

#### \[C\] `embeds.<Array>.color`

**\[Optional\]** `<(string|number.positiveInteger) = "black">` Left border's colour of this embed.
- `"black"`
- `"discordblack"`
- `"discordblurple"`
- `"discorddark"`
- `"discordgreyple"`
- `"random"`
- `"white"`
- RGB split with comma (`,`) (example: `256,128,64`)

#### \[W\] `message_embed_colour`

**\[Optional\]** `<string = "black">` Left border's colour of this embed.
- `"black"`
- `"discordblack"`
- `"discordblurple"`
- `"discorddark"`
- `"discordgreyple"`
- `"random"`
- `"white"`
- RGB split with comma (`,`) (example: `256,128,64`)

#### \[C\] `embeds.<Array>.footer.text`
#### \[W\] `message_embed_footertext`

**\[Optional\] \[V\]** `<string>` Embed footer text. Automatically crop when more than 2048 characters.

#### \[C\] `embeds.<Array>.footer.icon_url`
#### \[W\] `message_embed_footericonurl`

**\[Optional\] \[V\]** `<string>` Embed footer icon url. The image url must be in format of JPEG/JPG, or PNG. GIF is not supported due to restricted by Discord.

#### \[C\] `embeds.<Array>.image.url`
#### \[W\] `message_embed_imageurl`

**\[Optional\] \[V\]** `<string>` Embed image url. The image url must be in format of JPEG/JPG, PNG, or GIF.

#### \[C\] `embeds.<Array>.thumbnail.url`
#### \[W\] `message_embed_thumbnailurl`

**\[Optional\] \[V\]** `<string>` Embed thumbnail url. The image url must be in format of JPEG/JPG, PNG, or GIF.

#### \[C\] `embeds.<Array>.video.url`
#### \[W\] `message_embed_videourl`

**\[Optional\] \[V\]** `<string>` Embed video url.

[C] `embeds.<Array>.author.name`
[W] `message_embed_authorname`

**\[Optional unless have [`embeds.<Array>.author.url`](#C-embedsArrayauthorurl)\] \[V\]** `<string>` Embed author name. Automatically crop when more than 256 characters.

#### \[C\] `embeds.<Array>.author.url`
#### \[W\] `message_embed_authorurl`

**\[Optional\] \[V\]** `<string>` Embed author url.

#### \[C\] `embeds.<Array>.author.icon_url`
#### \[W\] `message_embed_authoravatarurl`

**\[Optional\] \[V\]** `<string>` Embed author avatar url. The image url must be in format of JPEG/JPG, or PNG. GIF is not supported due to restricted by Discord.

#### \[C\] `embeds.<Array>.fields.<Array>`
#### \[W\] `message_embed_field_<Number>`

Field(s) for this embed. Number start at `0`, maximum 25 fields per embed.

#### \[C\] `embeds.<Array>.fields.<Array>.name`
#### \[W\] `message_embed_field_<Number>_key`

**\[Optional unless have [`embeds.<Array>.fields.<Array>.value`](#C-embedsArrayfieldsArrayvalue)\] \[V\]** `<string>` Key for this embed field. Automatically crop when more than 256 characters.

#### \[C\] `embeds.<Array>.fields.<Array>.value`
#### \[W\] `message_embed_field_<Number>_value`

**\[Optional unless have [`embeds.<Array>.fields.<Array>.key`](#C-embedsArrayfieldsArraykey)\] \[V\]** `<string>` Value for this embed field. Automatically crop when more than 1024 characters.

#### \[C\] `embeds.<Array>.fields.<Array>.inline`
#### \[W\] `message_embed_field_<Number>_isinline`

**\[Optional\] \[V\]** `<boolean = false>` Use inline for this embed field.

### 📤 Output

*(N/A)*

### Example

#### Workflow Argument (>= v2)

```yml
jobs:
  send-to-discord:
    name: "Send To Discord"
    runs-on: "ubuntu-latest"
    steps:
      - id: "send-to-discord-main"
        uses: "hugoalh/GitHubAction.SendToDiscord@v2.0.0"
        with:
          webhook_id: "${{secrets.DISCORD_WEBHOOK_ID}}"
          webhook_token: "${{secrets.DISCORD_WEBHOOK_TOKEN}}"
          variable_join: "."
          # variable_list_external:
          variable_prefix: "%"
          variable_suffix: "%"
          message_text: "Hello, world!"
          # webhook_name:
          # webhook_avatarurl:
          message_usetexttospeech: "false"
          # message_embed_title:
          # message_embed_description:
          # message_embed_titleurl:
          # message_embed_colour:
          # message_embed_footertext:
          # message_embed_footericonurl:
          # message_embed_imageurl:
          # message_embed_thumbnailurl:
          # message_embed_videourl:
          # message_embed_authorname:
          # message_embed_authorurl:
          # message_embed_authoravatarurl:
          # message_embed_field_0_key:
          # message_embed_field_0_value:
          # message_embed_field_0_isinline:
          # message_embed_field_1_key:
          # message_embed_field_1_value:
          # message_embed_field_1_isinline:
          # message_embed_field_2_key:
          # message_embed_field_2_value:
          # message_embed_field_2_isinline:
          # message_embed_field_3_key:
          # message_embed_field_3_value:
          # message_embed_field_3_isinline:
          # message_embed_field_4_key:
          # message_embed_field_4_value:
          # message_embed_field_4_isinline:
          # message_embed_field_5_key:
          # message_embed_field_5_value:
          # message_embed_field_5_isinline:
          # message_embed_field_6_key:
          # message_embed_field_6_value:
          # message_embed_field_6_isinline:
          # message_embed_field_7_key:
          # message_embed_field_7_value:
          # message_embed_field_7_isinline:
          # message_embed_field_8_key:
          # message_embed_field_8_value:
          # message_embed_field_8_isinline:
          # message_embed_field_9_key:
          # message_embed_field_9_value:
          # message_embed_field_9_isinline:
          # message_embed_field_10_key:
          # message_embed_field_10_value:
          # message_embed_field_10_isinline:
          # message_embed_field_11_key:
          # message_embed_field_11_value:
          # message_embed_field_11_isinline:
          # message_embed_field_12_key:
          # message_embed_field_12_value:
          # message_embed_field_12_isinline:
          # message_embed_field_13_key:
          # message_embed_field_13_value:
          # message_embed_field_13_isinline:
          # message_embed_field_14_key:
          # message_embed_field_14_value:
          # message_embed_field_14_isinline:
          # message_embed_field_15_key:
          # message_embed_field_15_value:
          # message_embed_field_15_isinline:
          # message_embed_field_16_key:
          # message_embed_field_16_value:
          # message_embed_field_16_isinline:
          # message_embed_field_17_key:
          # message_embed_field_17_value:
          # message_embed_field_17_isinline:
          # message_embed_field_18_key:
          # message_embed_field_18_value:
          # message_embed_field_18_isinline:
          # message_embed_field_19_key:
          # message_embed_field_19_value:
          # message_embed_field_19_isinline:
          # message_embed_field_20_key:
          # message_embed_field_20_value:
          # message_embed_field_20_isinline:
          # message_embed_field_21_key:
          # message_embed_field_21_value:
          # message_embed_field_21_isinline:
          # message_embed_field_22_key:
          # message_embed_field_22_value:
          # message_embed_field_22_isinline:
          # message_embed_field_23_key:
          # message_embed_field_23_value:
          # message_embed_field_23_isinline:
          # message_embed_field_24_key:
          # message_embed_field_24_value:
          # message_embed_field_24_isinline:
```

#### Configuration Argument (>= v3)

```yml
# Workflow file
jobs:
  send-to-discord:
    name: "Send To Discord"
    runs-on: "ubuntu-latest"
    steps:
      - id: "send-to-discord-main"
        uses: "hugoalh/GitHubAction.SendToDiscord@v3.0.0"
        with:
          configuration: ".github/workflows_configuration/send-to-discord.json"
          webhook_id: "${{secrets.DISCORD_WEBHOOK_ID}}"
          webhook_token: "${{secrets.DISCORD_WEBHOOK_TOKEN}}"
          variable_join: "."
          # variable_list_external:
          variable_prefix: "%"
          variable_suffix: "%"
```

```jsonc
// Configutation file (.github/workflows_configuration/send-to-discord.json)
{
  "content": "Hello, world!",
  "username": "A Webhook Guy",
  "avatar_url": "https://imgur.com/webhook-avatar.png",
  "tts": false,
  "embeds": [
    {
      "title": "1st Embed",
      "description": "Yes!",
      "url": "https://github.com/hugoalh/GitHubAction.SendToDiscord",
      "color": 0,
      "footer": {
        "text": "1st Embed Footer",
        "icon_url": "https://imgur.com/first-footer-icon.png"
      },
      "image": {
        "url": "https://imgur.com/first-big-image.png"
      },
      "thumbnail": {
        "url": "https://imgur.com/first-small-image.png"
      },
      "video": {
        "url": "https://youtube.com/first-video"
      },
      "author": {
        "name": "A Embed Guy",
        "url": "https://handsome.io",
        "icon_url": "https://imgur.com/handsome-avatar.png"
      },
      "fields": [
        {
          "name": "1st Field",
          "value": "Foo",
          "inline": true
        },
        {
          "name": "2nd Field",
          "value": "Bar",
          "inline": true
        },
        ...
      ]
    },
    {
      "title": "2nd Embed",
      "description": "Yee!",
      "url": "https://github.com/hugoalh/GitHubAction.SendToDiscord",
      "color": 0,
      "footer": {
        "text": "2nd Embed Footer",
        "icon_url": "https://imgur.com/second-footer-icon.png"
      },
      "image": {
        "url": "https://imgur.com/second-big-image.png"
      },
      "thumbnail": {
        "url": "https://imgur.com/second-small-image.png"
      },
      "video": {
        "url": "https://youtube.com/second-video"
      },
      "author": {
        "name": "Another Embed Guy",
        "url": "https://goodlook.io",
        "icon_url": "https://imgur.com/good-look-avatar.png"
      },
      "fields": [
        {
          "name": "1st Field",
          "value": "Lol",
          "inline": false
        },
        {
          "name": "2nd Field",
          "value": "Arm",
          "inline": false
        },
        ...
      ]
    },
    ...
  ]
}
```

### 📚 Guide

- [Discord Developer Portal: Webhook - Execute](https://discord.com/developers/docs/resources/webhook#execute-webhook)
- [Discord: Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- [GitHub Actions: Enabling debug logging](https://docs.github.com/en/free-pro-team@latest/actions/managing-workflow-runs/enabling-debug-logging)
- [GitHub Actions: Encrypted secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)
- [GitHub: Webhook events and payloads](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/webhook-events-and-payloads)
