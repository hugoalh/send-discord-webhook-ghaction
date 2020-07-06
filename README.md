# [GitHub Action] Send To Discord

[`hugoalh/GitHubAction.SendToDiscord`](https://github.com/hugoalh/GitHubAction.SendToDiscord)

[![](https://img.shields.io/github/contributors/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github)](https://github.com/hugoalh/GitHubAction.SendToDiscord/graphs/contributors)
[![](https://img.shields.io/github/license/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github)](https://github.com/hugoalh/GitHubAction.SendToDiscord/blob/master/LICENSE.md)
![](https://img.shields.io/github/languages/count/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github)
![](https://img.shields.io/github/languages/top/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github)
![](https://img.shields.io/github/repo-size/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github)
![](https://img.shields.io/github/languages/code-size/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github)
![](https://img.shields.io/github/watchers/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github)
![](https://img.shields.io/github/stars/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github)
![](https://img.shields.io/github/forks/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github)
[![](https://img.shields.io/lgtm/alerts/g/hugoalh/GitHubAction.SendToDiscord.svg?style=flat-square&logo=lgtm&label=%20)](https://lgtm.com/projects/g/hugoalh/GitHubAction.SendToDiscord/alerts)
[![](https://img.shields.io/lgtm/grade/javascript/g/hugoalh/GitHubAction.SendToDiscord.svg?style=flat-square&logo=lgtm)](https://lgtm.com/projects/g/hugoalh/GitHubAction.SendToDiscord/context:javascript)

| **[Release](https://github.com/hugoalh/GitHubAction.SendToDiscord/releases)** ![](https://img.shields.io/github/downloads/hugoalh/GitHubAction.SendToDiscord/total?style=flat-square&color=000000&label=%20) | **[Issue](https://github.com/hugoalh/GitHubAction.SendToDiscord/issues?q=is%3Aissue)** | **[Pull Request](https://github.com/hugoalh/GitHubAction.SendToDiscord/pulls?q=is%3Apr)** |
|:----|:----|:----|
| **Latest:** ![](https://img.shields.io/github/release/hugoalh/GitHubAction.SendToDiscord?sort=semver&style=flat-square&color=000000&label=%20) (![](https://img.shields.io/github/release-date/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20))<br />**Pre:** ![](https://img.shields.io/github/release/hugoalh/GitHubAction.SendToDiscord?include_prereleases&sort=semver&style=flat-square&color=000000&label=%20) (![](https://img.shields.io/github/release-date-pre/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20)) | **Open:** ![](https://img.shields.io/github/issues-raw/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20)<br />**Closed:** ![](https://img.shields.io/github/issues-closed-raw/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20) | **Open:** ![](https://img.shields.io/github/issues-pr-raw/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20)<br />**Closed:** ![](https://img.shields.io/github/issues-pr-closed-raw/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20) |

## 📜 Description

Send message to Discord via webhook, support variables.

## 🛠 Configuration

### 📥 Input

**Not support variable:**

| **Key** | **Require? / Require Condition?** | **Type** | **Description** |
|:----|:----|:----|:----|
| `webhook_id` | ✔ | Secret String | Webhook ID. If the webhook url is `https://discordapp.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL`, then the webhook ID will be `70971114`. |
| `webhook_token` | ✔ | Secret String | Webhook token. If the webhook url is `https://discordapp.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL`, then the webhook token will be `ueyzeWxB_8bb1zMhL`. |
| `message_usetexttospeech` |  | Stringified Boolean | Use text to speech for this message. Default: `false`. |
| `message_embed_colour` | When have embed | String | Left border's colour of the embed, support `RANDOM`, `INVISIBLE` (default), `DISCORDBLURPLE`, `WHITE`, `BLACK`, `DISCORDGREYPLE`, `DISCORDDARK`, `DISCORDBLACK`, or RGB split with `,` (example: `256,128,64`). |
| `message_embed_field_<Number>_isinline` |  | Stringified Boolean | Use inline for this embed field. Number start at `0`, maximum 25 fields. Default: `false`. |
| `variable_list_<Number>_name` |  | String | Namespace for this variable list. Only use when having multiple variable lists. Number start at `0`, maximum 10 variable lists. |
| `variable_list_<Number>_data` | When have `variable_list_<Number>_name` | Stringified JSON | Variable list that will use in the message. Number start at `0`, maximum 10 variable lists. |
| `variable_prefix` |  | String | Variable prefix. Default: `%`. |
| `variable_suffix` |  | String | Variable suffix. Default: `%`. |
| `variable_join` |  | String | Variable join if having multiple variable lists, and/or variable list has depth. Default: `_`. |

**Support variable (& optional):**

| **Key** | **Require Condition?** | **Type** | **Description** |
|:----|:----|:----|:----|
| `webhook_name` |  | String, 2 \~ 32 characters | Webhook display name (i.e.: the sender's name), this can override the default username of the webhook. Automatically ignore when not between 2 and 32 characters. |
| `webhook_avatarurl` |  | String | Webhook avatar url (i.e.: the sender's avatar), this can override the default avatar of the webhook. The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation. |
| `message_text` |  | String, <= 2000 characters | Text. Automatically crop when more than 2000 characters.|
| `message_embed_authorname` | When have `message_embed_authorurl` | String, <= 256 characters | Embed author name. Automatically crop when more than 256 characters. |
| `message_embed_authorurl` |  | String | Embed author url. |
| `message_embed_authoravatarurl` |  | String | Embed author avatar url. The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation. |
| `message_embed_title` | When have `message_embed_titleurl` | String, <= 256 characters | Embed title. Automatically crop when more than 256 characters. |
| `message_embed_titleurl` |  | String | Embed title url. |
| `message_embed_description` |  | String, <= 2048 characters | Embed description. Automatically crop when more than 2048 characters. |
| `message_embed_thumbnailurl` |  | String | Embed thumbnail url. The url of the image must be in format of JPEG/JPG, PNG, or GIF. |
| `message_embed_imageurl` |  | String | Embed image url. The url of the image must be in format of JPEG/JPG, PNG, or GIF. |
| `message_embed_videourl` |  | String | Embed video url. Support YouTube only! |
| `message_embed_field_<Number>_key` | When have `message_embed_field_<Number>_value` | String, <= 256 characters | Key for this embed field. Number start at `0`, maximum 25 fields. Automatically crop when more than 256 characters. |
| `message_embed_field_<Number>_value` | When have `message_embed_field_<Number>_key` | String, <= 1024 characters | Value for this embed field. Number start at `0`, maximum 25 fields. Automatically crop when more than 1024 characters. |
| `message_embed_footericonurl` | When have `message_embed_footertext` | String | Embed footer icon url. The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation. |
| `message_embed_footertext` |  | String, <= 2048 characters | Embed footer text. Automatically crop when more than 2048 characters. |

### 📤 Output

*N/A*.

### Example

*See [workflow_example.yml](./workflow_example.yml)*.

### 📚 Guide

- [Discord Webhook: Creating a webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- [Discord Webhook: API](https://discord.com/developers/docs/resources/webhook#execute-webhook)
- [GitHub Actions: Creating and storing encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)
