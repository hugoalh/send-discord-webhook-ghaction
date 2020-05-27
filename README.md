# <div align="center">[GitHub Action] Send To Discord</div>

<div align="center">
  <code>hugoalh/GitHubAction.SendToDiscord</code><br />
  <img src="https://img.shields.io/github/languages/count/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github" />
  <img src="https://img.shields.io/github/languages/top/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github" />
  <img src="https://img.shields.io/github/repo-size/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github" />
  <img src="https://img.shields.io/github/watchers/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github" />
  <img src="https://img.shields.io/github/stars/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github" />
  <img src="https://img.shields.io/github/forks/hugoalh/GitHubAction.SendToDiscord?style=flat-square&logo=github" />
</div>

<table>
  <tr>
    <td align="center">
      <b>Author & Contributor</b><br />
      <img src="https://img.shields.io/github/contributors/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20" />
    </td>
    <td><a href="https://github.com/hugoalh">hugoalh</a></td>
  </tr>
  <tr>
    <td align="center"><b>License</b></td>
    <td>MIT</td>
  </tr>
  <tr>
    <td align="center"><b>Release</b></td>
    <td>
      <b>Stable: </b><img src="https://img.shields.io/github/release/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20" /> (<img src="https://img.shields.io/github/release-date/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20" />); <b>Latest: </b><img src="https://img.shields.io/github/release/hugoalh/GitHubAction.SendToDiscord?include_prereleases&style=flat-square&color=000000&label=%20" /> (<img src="https://img.shields.io/github/release-date-pre/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20" />)
    </td>
  </tr>
  <tr>
    <td align="center"><b>Issue</b></td>
    <td>
      <b>Open: </b><img src="https://img.shields.io/github/issues-raw/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20" />; <b>Closed: </b><img src="https://img.shields.io/github/issues-closed-raw/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Pull Request</b></td>
    <td>
      <b>Open: </b><img src="https://img.shields.io/github/issues-pr-raw/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20" />; <b>Closed: </b><img src="https://img.shields.io/github/issues-pr-closed-raw/hugoalh/GitHubAction.SendToDiscord?style=flat-square&color=000000&label=%20" />
    </td>
  </tr>
</table>

## 📜 Description

Send message to Discord via webhook, support variables.

### 📥 Input

#### Not support variable

| **Key** | **Require? / Require Condition?** | <div align="center">**Type**</div> | <div align="center">**Description**</div> |
|:---:|:---:|:----|:----|
| `Webhook_ID` | ✔ | Secret String | Webhook ID. If the webhook url is `https://discordapp.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL`, then the webhook ID will be `70971114`. |
| `Webhook_Token` | ✔ | Secret String | Webhook token. If the webhook url is `https://discordapp.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL`, then the webhook token will be `ueyzeWxB_8bb1zMhL`. |
| `Message_UseTextToSpeech` |  | Stringified Boolean | Use text to speech for this message. Default: `false`. |
| `Message_Embed_Colour` | When have embed | String | Left border's colour of the embed, support `RANDOM`, `INVISIBLE` (default), `DISCORDBLURPLE`, `WHITE`, `BLACK`, `DISCORDGREYPLE`, `DISCORDDARK`, `DISCORDBLACK`, or RGB split with `,` (example: `256,128,64`). |
| `Message_Embed_FieldSplit` |  | String | Charactor(s) to split in the fields. Default: `-;-`. |
| `Message_Embed_Field_<Number>_IsInline` |  | Stringified Boolean | Use inline for this embed field. Number start at `0`, maximum 25 fields. Default: `false`. |
| `Variable_List_<Number>_Name` |  | String | Namespace for this variable list. Only use when having multiple variable lists. Number start at `0`, maximum 10 variable lists. |
| `Variable_List_<Number>_Data` | When have `Variable_List_<Number>_Name` | Stringified JSON | Variable list that will use in the message. Number start at `0`, maximum 10 variable lists. |
| `Variable_Prefix` |  | String | Variable prefix. Default: `%`. |
| `Variable_Suffix` |  | String | Variable suffix. Default: `%`. |
| `Variable_Join` |  | String | Variable join if having multiple variable lists, and/or variable list has depth. Default: `_`. |

#### Support variable (& optional)

| **Key<br />(Require Condition?)** | <div align="center">**Type**</div> | <div align="center">**Description**</div> |
|:---:|:----|:----|
| `Webhook_Name` | String, 2 \~ 32 charactors | Webhook display name (i.e.: the sender's name), this can override the default username of the webhook. Automatically ignore when not between 2 and 32 charactors. |
| `Webhook_AvatarUrl` | String | Webhook avatar url (i.e.: the sender's avatar), this can override the default avatar of the webhook. The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation. |
| `Message_Text` | String, <= 2000 charactors | Text. Automatically crop when more than 2000 charactors.|
| `Message_Embed_AuthorName`<br />(When have `Message_Embed_AuthorUrl`) | String, 2 \~ 32 charactors | Embed author name. Automatically ignore when not between 2 and 32 charactors. |
| `Message_Embed_AuthorUrl` | String | Embed author url. |
| `Message_Embed_AuthorAvatarUrl` | String | Embed author avatar url. The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation. |
| `Message_Embed_Title`<br />(When have `Message_Embed_TitleUrl`) | String, <= 256 charactors | Embed title. Automatically crop when more than 256 charactors. |
| `Message_Embed_TitleUrl` | String | Embed title url. |
| `Message_Embed_Description` | String, <= 2048 charactors | Embed description. Automatically crop when more than 2048 charactors. |
| `Message_Embed_ThumbnailUrl` | String | Embed thumbnail url. The url of the image must be in format of JPEG/JPG, PNG, or GIF. |
| `Message_Embed_ImageUrl` | String | Embed image url. The url of the image must be in format of JPEG/JPG, PNG, or GIF. |
| `Message_Embed_VideoUrl` | String | Embed video url. Support YouTube only! |
| `Message_Embed_Field_<Number>_Key`<br />(When have `Message_Embed_Field_<Number>_Value`) | String, <= 256 charactors | Key for this embed field. Number start at `0`, maximum 25 fields. Automatically crop when more than 256 charactors. |
| `Message_Embed_Field_<Number>_Value`<br />(When have `Message_Embed_Field_<Number>_Key`) | String, <= 1024 charactors | Value for this embed field. Number start at `0`, maximum 25 fields. Automatically crop when more than 1024 charactors. |
| `Message_Embed_FooterIconUrl`<br />(When have `Message_Embed_FooterText`) | String | Embed footer icon url. The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation. |
| `Message_Embed_FooterText` | String, <= 2048 charactors | Embed footer text. Automatically crop when more than 2048 charactors. |

### 📓 Guide

- [Discord Webhook: Creating a webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- [Discord Webhook: API](https://discord.com/developers/docs/resources/webhook#execute-webhook)
- [GitHub Actions: Creating and storing encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)

## 🐛 Issue

Found any issue in this project? Submit the issue via [GitHub](https://github.com/hugoalh/GitHubAction.SendToDiscord/issues).
