**🌐** [English](./README.md) / [漢語](./README-ZH.md)

---

# 發送 Discord 網絡鉤手（GitHub Action）

[**⚖️** MIT](./LICENSE-ZH.md)

[![GitHub: hugoalh/send-discord-webhook-ghaction](https://img.shields.io/github/v/release/hugoalh/send-discord-webhook-ghaction?label=hugoalh/send-discord-webhook-ghaction&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/send-discord-webhook-ghaction")](https://github.com/hugoalh/send-discord-webhook-ghaction)

用於發送 Discord 網絡鉤手的 GitHub Action。

> **⚠️ 重要**
>
> 此文檔基於 v6.0.0；如果要查看其他版本的文檔，請瀏覽[版本列表](https://github.com/hugoalh/send-discord-webhook-ghaction/tags)並選擇正確的版本。

## 🌟 特點

- 支持附件／檔案。
- 支持討論串。

## 🔰 開始

### 🎯 目標

|  | **GitHub** |
|:--|:--|
| **[GitHub Actions Runner - GitHub Hosted Linux](https://github.com/actions/runner)** **💽** | [✔️](https://docs.github.com/en/actions) |
| **[GitHub Actions Runner - GitHub Hosted macOS](https://github.com/actions/runner)** **💽** | [✔️](https://docs.github.com/en/actions) |
| **[GitHub Actions Runner - GitHub Hosted Windows](https://github.com/actions/runner)** **💽** | [✔️](https://docs.github.com/en/actions) |
| **[GitHub Actions Runner - Self Hosted Linux](https://github.com/actions/runner)** **💽** | [✔️](https://docs.github.com/en/actions) |
| **[GitHub Actions Runner - Self Hosted macOS](https://github.com/actions/runner)** **💽** | [✔️](https://docs.github.com/en/actions) |
| **[GitHub Actions Runner - Self Hosted Windows](https://github.com/actions/runner)** **💽** | [✔️](https://docs.github.com/en/actions) |

> **💽 軟體**
>
> - NodeJS ^ v20.9.0

> **ℹ️ 資訊**
>
> 可以透過此處未列出的其他方法／方式使用此 Action，但並未得到官方支援。

### #️⃣ 註冊表識別碼

- **GitHub：**
  ```
  hugoalh/send-discord-webhook-ghaction
  ```

> **ℹ️ 資訊**
>
> 建議將此 Action 與標籤一起使用以確保不變性。

### 🛡️ 權限

*此 Action 不需要任何權限。*

## 🧩 輸入

> | **圖解** | **說明** |
> |:-:|:--|
> | 🔐 | 應該是已加密的秘密。 |

### `key`

**🔐** `<字串>` 密鑰；長格式和短格式都可以接受。

```
https://discord.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL  ⬅長
                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^  ⬅短

https://discordapp.com/api/webhooks/70971114/ueyzeWxB_8bb1zMhL  ⬅長（舊）
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^  ⬅短（舊）
```

### `content`

**［選擇性］** `<字串>` 訊息內容，最多 2000 個字元；支援 Discord Markdown。

> **⚠️ 重要**
>
> 至少必須提供 [`content`](#content)、[`embeds`](#embeds) 或 [`files`](#files) 輸入。

### `content_links_no_embed`

**［選擇性］** `<規律表達式[]>` 指定在 [`content`](#content) 中的鏈結以防止 Discord 解析並嵌入在訊息下方，只支援 HTTP 和 HTTPS，以每行分隔每個值。

- <b>所有：</b>`.+`
- <b>`.png` 圖像：</b>`\.png(?:\?|#|$)`
- <b>`.webp` 圖像：</b>`\.webp(?:\?|#|$)`
- <b>Twitch：</b>`twitch\.tv`

### `username`

**［選擇性］** `<字串>` 覆蓋網絡鉤手的預設用戶名，最多 80 個字元；「Clyde」是不被允許的。

### `avatar_url`

**［選擇性］** `<字串>` 覆蓋網絡鉤手的預設頭像，使用來源鏈結，只支援 HTTP 和 HTTPS。

### `tts`

**［選擇性］** `<布林值 = false>` 是否對訊息使用文字轉語音。

### `embeds`

**［選擇性］** `<物件[]>` 嵌入豐富的訊息內容，使用具有受限格式和模式的 JSON 或 YAML，最多 10 個嵌入和基於下列輸入總和 6000 個字元：

- [`embeds[*].title`](#embedstitle)
- [`embeds[*].description`](#embedsdescription)
- [`embeds[*].footer.text`](#embedsfootertext)
- [`embeds[*].author.name`](#embedsauthorname)
- [`embeds[*].fields[*].name`](#embedsfieldsname)
- [`embeds[*].fields[*].value`](#embedsfieldsvalue)

> **⚠️ 重要**
>
> 至少必須提供 [`content`](#content)、[`embeds`](#embeds) 或 [`files`](#files) 輸入。

#### `embeds[*].title`

**［選擇性］** `<字串>` 嵌入的標題，最多 256 個字元；支援 Discord Markdown。

#### `embeds[*].description`

**［選擇性］** `<字串>` 嵌入的描述，最多 4096 個字元；支援 Discord Markdown。

#### `embeds[*].url`

**［選擇性］** `<字串>` 嵌入的鏈結。

#### `embeds[*].timestamp`

**［選擇性］** `<字串>` 嵌入的時間戳，採用 ISO 8601 格式（例如：`2011-11-11T11:11:11Z`）。

#### `embeds[*].color`

**［選擇性］** `<數值 | 字串 = 2105893>` 嵌入的顏色（即是：嵌入的左邊框顏色）；RGB 整數、十六進位（帶有前綴「`#`」）、命名空間和 CSS 顏色（例如：`rgb(32, 34, 37)`）形式都可以接受。

專屬命名空間：

|  | **命名空間** | **值** | **說明** |
|:-:|:-:|:-:|:--|
| <img src="https://www.colorhexa.com/202225.png" height="16px" width="16px" /> | `"Default"` |  `"#202225"` / `"rgb(32, 34, 37)"` | 預設。 |
| 🍭 | `"Random"` |  | 隨機。 |
| <img src="https://www.colorhexa.com/5865F2.png" height="16px" width="16px" /> | `"Discord Blurple"` | `"#5865F2"` / `"rgb(88, 101, 242)"` | Discord 紫藍。 |
| <img src="https://www.colorhexa.com/EB459E.png" height="16px" width="16px" /> | `"Discord Fuchsia"` | `"#EB459E"` / `"rgb(254, 231, 92)"` | Discord 紫紅。 |
| <img src="https://www.colorhexa.com/57F287.png" height="16px" width="16px" /> | `"Discord Green"` | `"#57F287"` / `"rgb(87, 242, 135)"` | Discord 綠。 |
| <img src="https://www.colorhexa.com/ED4245.png" height="16px" width="16px" /> | `"Discord Red"` | `"#ED4245"` / `"rgb(237, 66, 69)"` | Discord 紅。 |
| <img src="https://www.colorhexa.com/FEE75C.png" height="16px" width="16px" /> | `"Discord Yellow"` | `"#FEE75C"` / `"rgb(254, 231, 92)"` | Discord 黃。 |
| <img src="https://www.colorhexa.com/2F3136.png" height="16px" width="16px" /> | `"Embed Background Dark"` | `"#2F3136"` / `"rgb(47, 49, 54)"` | 在深色模式下的嵌入的背景。 |

> **⚠️ 重要**
>
> - 不支援不透明度。
> - 一般命名空間由 [`meodai/color-names`](https://github.com/meodai/color-names) 提供，可能會在沒有任何通知的情況下更改和／或刪除，建議使用數值代替，除非您想要隨機顏色。

#### `embeds[*].footer`

**［選擇性］** `<物件>` 嵌入的頁腳。

#### `embeds[*].footer.text`

**［選擇性］** `<字串>` 頁腳內容，最多 2048 個字元；支援 Discord Markdown。

#### `embeds[*].footer.icon_url`

**［選擇性］** `<字串>` 頁腳圖示的來源鏈結，只支援 HTTP、HTTPS 和附件。

#### `embeds[*].image`

**［選擇性］** `<物件>` 嵌入的圖像。

#### `embeds[*].image.url`

**［選擇性］** `<字串>` 圖像的來源鏈結，只支援 HTTP、HTTPS 和附件。

#### `embeds[*].thumbnail`

**［選擇性］** `<物件>` 嵌入的縮圖。

#### `embeds[*].thumbnail.url`

**［選擇性］** `<字串>` 縮圖的來源鏈結，只支援 HTTP、HTTPS 和附件。

#### `embeds[*].author`

**［選擇性］** `<物件>` 嵌入的作者。

#### `embeds[*].author.name`

**［選擇性］** `<字串>` 作者的姓名，最多 256 個字元。

#### `embeds[*].author.url`

**［選擇性］** `<字串>` 作者的網址。

#### `embeds[*].author.icon_url`

**［選擇性］** `<字串>` 作者的圖示的來源鏈結，只支援 HTTP、HTTPS 和附件。

#### `embeds[*].fields`

**［選擇性］** `<物件[]>` 嵌入的欄位，最多 25 個欄位。

#### `embeds[*].fields[*].name`

**［選擇性］** `<字串>` 欄位的名稱，最多 256 個字元；支援 Discord Markdown。

#### `embeds[*].fields[*].value`

**［選擇性］** `<字串>` 欄位的值，最多 1024 個字元；支援 Discord Markdown。

#### `embeds[*].fields[*].inline`

**［選擇性］** `<布林值 = false>` 欄位是否可以並列顯示。

### `allowed_mentions_parse`

**［選擇性］** `<字串[] = "roles,users,everyone">` 允許從訊息中解析的提及類型，以半形逗號 (`,`)、半形垂直線 (`|`)、半形分號 (`;`)、半形空格或每行分隔每個值。

- **`"roles"`:** 控制身份組提及。
- **`"users"`:** 控制使用者提及。
- **`"everyone"`:** 控制 `@everyone` 和 `@here` 提及。

### `allowed_mentions_roles`

**［選擇性］** `<字串[]>` 允許提及身份組的 ID，以半形逗號 (`,`)、半形垂直線 (`|`)、半形分號 (`;`)、半形空格或每行分隔每個值，最多 100 個 ID。

### `allowed_mentions_users`

**［選擇性］** `<字串[]>` 允許提及使用者的 ID，以半形逗號 (`,`)、半形垂直線 (`|`)、半形分號 (`;`)、半形空格或每行分隔每個值，最多 100 個 ID。

### `files`

**［選擇性］** `<字串[]>` 作為訊息附件的文件，以每行分隔每個值，最多 8 MB 和 10 個文件。

> **⚠️ 重要**
>
> 至少必須提供 [`content`](#content)、[`embeds`](#embeds) 或 [`files`](#files) 輸入。

### `wait`

**［選擇性］** `<布林值 = true>` 是否等待 Discord 確認訊息發送後再回應，並傳回建立的訊息體。當此輸入為 `false` 時，未儲存的訊息不會傳回錯誤。

### `thread_id`

**［選擇性］** `<字串>` 文字頻道的討論串 ID。當定義此輸入時，訊息將會發送到指定的討論串，該討論串將會自動取消歸檔。

> **⚠️ 重要**
>
> 只能提供 [`thread_id`](#thread_id) 或 [`thread_name`](#thread_name) 輸入。

### `thread_name`

**［選擇性］** `<字串>` 論壇頻道的主題名稱，最多 100 個字元。當定義此輸入時，訊息將會建立一個具有該名稱的新討論串。

> **⚠️ 重要**
>
> 只能提供 [`thread_id`](#thread_id) 或 [`thread_name`](#thread_name) 輸入。

### `truncate_enable`

**［選擇性］** `<布爾值 = true>` 輸入太大時是否先嘗試截斷。

### `truncate_ellipsis`

**［選擇性］** `<字串 = "...">` 省略號標記。

### `truncate_position`

**［選擇性］** `<字串 = "end">` 省略號位置。

- **`"end"`:** 在字串的末尾。
- **`"middle"`:** 在字串的中間。
- **`"start"`:** 在字串的開頭。

## 🧩 輸出

### `response`

`<字串>` 響應內容。

### `status_code`

`<數值>` 請求狀態代碼。

### `status_ok`

`<布爾值>` 請求是否成功。

### `status_text`

`<字串>` 請求狀態文本。

## ✍️ 例子

- 你好，世界！
  ```yml
  jobs:
    job_id:
      name: "Send Discord Webhook"
      runs-on: "ubuntu-latest"
      steps:
        - uses: "hugoalh/send-discord-webhook-ghaction@v6.0.0"
          with:
            key: "${{secrets.DISCORD_WEBHOOK_KEY}}"
            content: "你好，世界！"
  ```
- birdie0（來自 [birdie0's Discord Webhooks Guide（英文）](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)）
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
  ![例子 birdie0 結果](https://birdie0.github.io/discord-webhooks-guide/img/webhook_example.png "例子 birdie0 結果")

## 📚 指南

- Discord
  - [Execute Webhook](https://discord.com/developers/docs/resources/webhook#execute-webhook)
  - [Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- GitHub Actions
  - [啟用調試日誌記錄（英文）](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging)
  - [已加密的秘密（英文）](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
