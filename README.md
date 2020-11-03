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

A GitHub action to send message to Discord via webhook, support variables.

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
- Support variables to create dynamic/rich content.

## 🛠 Configuration

### 🏗 Environment

#### Operating System

Any

#### Software

- NodeJS (>= v12.13)
- NPM (>= v6.12)

### 📥 Input

#### Not Support Variable

- **`webhook_id`:** `<string.secret>` Discord webhook ID. If the webhook url is `https://discord.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL`, then the webhook ID will be `70971114`.
- **`webhook_token`:** `<string.secret>` Discord webhook token. If the webhook url is `https://discord.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL`, then the webhook token will be `ueyzeWxB_8bb1zMhL`.
- **`message_usetexttospeech` \[Optional\]:** `<boolean = false>` Use text to speech for this message.
- **`message_embed_colour` \[Optional / When have embed\]:** `<string = "INVISIBLE">` Left border's colour of the embed, support `RANDOM`, `INVISIBLE`, `DISCORDBLURPLE`, `WHITE`, `BLACK`, `DISCORDGREYPLE`, `DISCORDDARK`, `DISCORDBLACK`, or RGB split with `,` (example: `256,128,64`).
- **`message_embed_field_<Number>_isinline` \[Optional\]:** `<boolean = false>` Use inline for this embed field. Number start at `0`, maximum 25 fields.
- **`variable_list_external` \[Optional\]:** `<object.json>` Variable list that will use in the data.
- **`variable_prefix` \[Optional\]:** `<string = "%">` Variable prefix.
- **`variable_suffix` \[Optional\]:** `<string = "%">` Variable suffix.
- **`variable_join` \[Optional\]:** `<string = "_">` Variable join if the variable list has depth.

#### Support Variable

- **`webhook_name` \[Optional\]:** `<string>` Webhook display name (i.e.: the sender's name), this can override the default username of the webhook. Automatically ignore when not between 2 and 32 characters.
- **`webhook_avatarurl` \[Optional\]:** `<string>` Webhook avatar url (i.e.: the sender's avatar), this can override the default avatar of the webhook. The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation.
- **`message_text` \[Optional\]:** `<string>` Text. Automatically crop when more than 2000 characters.
- **`message_embed_authorname` \[Optional / When have `message_embed_authorurl`\]:** `<string>` Embed author name. Automatically crop when more than 256 characters.
- **`message_embed_authorurl` \[Optional\]:** `<string>` Embed author url.
- **`message_embed_authoravatarurl` \[Optional\]:** `<string>` Embed author avatar url. The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation.
- **`message_embed_title` \[Optional / When have `message_embed_titleurl`\]:** `<string>` Embed title. Automatically crop when more than 256 characters.
- **`message_embed_titleurl` \[Optional\]:** `<string>` Embed title url.
- **`message_embed_description` \[Optional\]:** `<string>` Embed description. Automatically crop when more than 2048 characters.
- **`message_embed_thumbnailurl` \[Optional\]:** `<string>` Embed thumbnail url. The url of the image must be in format of JPEG/JPG, PNG, or GIF.
- **`message_embed_imageurl` \[Optional\]:** `<string>` Embed image url. The url of the image must be in format of JPEG/JPG, PNG, or GIF.
- **`message_embed_videourl` \[Optional\]:** `<string>` Embed video url. Support YouTube only!
- **`message_embed_field_<Number>_key` \[Optional / When have `message_embed_field_<Number>_value`\]:** `<string>` Key for this embed field. Number start at `0`, maximum 25 fields. Automatically crop when more than 256 characters.
- **`message_embed_field_<Number>_value` \[Optional / When have `message_embed_field_<Number>_key`\]:** `<string>` Value for this embed field. Number start at `0`, maximum 25 fields. Automatically crop when more than 1024 characters.
- **`message_embed_footericonurl` \[Optional / When have `message_embed_footertext`\]:** `<string>` Embed footer icon url. The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation.
- **`message_embed_footertext` \[Optional\]:** `<string>` Embed footer text. Automatically crop when more than 2048 characters.

To use GitHub Action context variable list, use placeholder `"${{github.event.<namespace>}}"` in the workflow file (parse by GitHub Action), or use placeholder `"<variable_prefix>payload<variable_join><namespace><variable_suffix>"` in the workflow file which marked "Support Variable" (parse by this action).

To use external variable list, use placeholder `"<variable_prefix>external<variable_join><namespace><variable_suffix>"` in the workflow file which marked "Support Variable" (parse by this action).

### 📤 Output

*(N/A)*

### Example

```yaml
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
          message_usetexttospeech: "false"
          message_text: "Hello, world!"
          # message_embed_colour:
          # message_embed_authorname:
          # message_embed_authorurl:
          # message_embed_authoravatarurl:
          # message_embed_title:
          # message_embed_titleurl:
          # message_embed_description:
          # message_embed_thumbnailurl:
          # message_embed_imageurl:
          # message_embed_videourl:
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
          # message_embed_footericonurl:
          # message_embed_footertext:
          # variable_list_external:
          variable_prefix: "%"
          variable_suffix: "%"
          variable_join: "."
```

### 📚 Guide

- [Discord Webhook: Creating a webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- [Discord Webhook: API](https://discord.com/developers/docs/resources/webhook#execute-webhook)
- [GitHub: Webhook event payloads](https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads)
- [GitHub Actions: Creating and storing encrypted secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)
