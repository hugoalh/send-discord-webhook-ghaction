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

| **Key** | **Required?** | **Type** | **Description** | **Support Variables?** |
|:----|:---:|:----|:----|:---:|
| `discord_webhook_url` | ✔ | Secret String | Discord webhook url; Do not add `/github` at the back! |  |
| `discord_webhook_name` |  | String, 2 \~ 32 charactors | Discord webhook display name (i.e.: the sender's name), this can override the default username of the webhook. Must between 2 and 32 charactors, otherwise will ignore. | ✔ |
| `discord_webhook_avatarurl` |  | String | Discord webhook avatar url (i.e.: the sender's avatar), this can override the default avatar of the webhook. The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation. | ✔ |
| `message_tts` |  | Stringified Boolean | Text to speech on this message. `true` to enable, `false` to disable (default). |  |
| `message_text` |  | String, <= 2000 charactors | Text message. Must less than 2000 charactors, otherwise will crop.| ✔ |
| `message_embed_colour` | When have embed content | String | Colour that display at the left border of the embed message, support `RANDOM`, `INVISIBLE` (default), or RGB split with `,` (e.g.: `256,128,64`). |  |
| `message_embed_author_name` | When have "message_embed_author_url" | String, 2 \~ 32 charactors | Author name of the embed message. Must between 2 and 32 charactors, otherwise will ignore. | ✔ |
| `message_embed_author_url` |  | String | Url on the author name of the embed message. | ✔ |
| `message_embed_author_avatarurl` |  | String | Author avatar url of the embed message. The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation. | ✔ |
| `message_embed_title` | When have "message_embed_titleurl" | String, <= 256 charactors | Embed message title. Must less than 256 charactors, otherwise will crop. | ✔ |
| `message_embed_titleurl` |  | String | Url on the title of the embed message. | ✔ |
| `message_embed_description` |  | String, <= 2048 charactors | Embed message description. Must less than 2048 charactors, otherwise will crop. | ✔ |
| `message_embed_thumbnailurl` |  | String | Embed message thumbnail. The url of the image must be in format of JPEG/JPG, PNG, or GIF. | ✔ |
| `message_embed_imageurl` |  | String | Embed message image url. The url of the image must be in format of JPEG/JPG, PNG, or GIF. | ✔ |
| `message_embed_videourl` |  | String | Embed message video url. Support YouTube only! | ✔ |
| `message_embed_fields` |  | Stringified Array | Embed message fields. | ✔ |
| `message_embed_footer_iconurl` |  | String | Embed message footer icon url, required "message_embed_footer_text". The url of the image must be in format of JPEG/JPG, or PNG. GIF is not supported due to the Discord limitation. | ✔ |
| `message_embed_footer_text` |  | String, <= 2048 charactors | Embed message footer text. Must less than 2048 charactors, otherwise will crop. | ✔ |
| `message_variables_list` |  | Stringified JSON | Variables list that use in the message content. Can import data from other places. | N/A |
| `message_variables_prefix` |  | String | Prefix of the variables. Default to `%`. | N/A |
| `message_variables_suffix` |  | String | Suffix of the variables. Default to `%`. | N/A |
| `message_variables_join` |  | String | Join of the variables if the variables list has depth. Default to `.`. | N/A |

### 📓 Guide

- [Discord Webhook: Creating a webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- [Discord Webhook: API](https://discord.com/developers/docs/resources/webhook#execute-webhook)
- [GitHub Actions: Creating and storing encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)

#### Relationship between `message_variables_list`, `message_variables_prefix`, `message_variables_suffix`, and `message_variables_join`

Example of `message_variables_list`:

```yml
- message_variables_list: '{"snippet":{"world":"Hello, world!"},"test":"Say hi to me!"}'
```

By default: 

```
message_variables_prefix = "%"
message_variables_suffix = "%"
message_variables_join = "."
```

So the example of `message_variables_list` will convert to:

```json
{
  "snippet.world": "Hello, world!",
  "test": "Say hi to me!"
}
```

And to use it:

```
Some text, %snippet.world% %test% => Some text, Hello, world! Say hi to me!
```

## 🐛 Issue

Found any issue in this project? Submit the issue via [GitHub](https://github.com/hugoalh/GitHubAction.SendToDiscord/issues).
