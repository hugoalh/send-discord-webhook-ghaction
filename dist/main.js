import { randomInt } from "node:crypto";
import { createReadStream as fsCreateReadStream } from "node:fs";
import { access as fsAccess, constants as fsConstants } from "node:fs/promises";
import { basename as pathBaseName } from "node:path";
import { debug as ghactionsDebug, error as ghactionsError, getBooleanInput as ghactionsGetBooleanInput, getInput as ghactionsGetInput, setOutput as ghactionsSetOutput, setSecret as ghactionsSetSecret } from "@actions/core";
import { create as ghactionsGlob } from "@actions/glob";
import { isJSON } from "@hugoalh/advanced-determine";
import { StringTruncator } from "@hugoalh/string-overflow";
import Color from "color";
//@ts-expect-error Package `color-name-list` is JSON.
import colorNameList from "color-name-list" assert { type: "json" };
import FormDataAlt from "form-data";
import yaml from "yaml";
console.log("Initialize.");
const colorNamespaceList = new Map();
for (const { name, hex } of colorNameList) {
    colorNamespaceList.set(name, hex);
}
colorNamespaceList.set("Default", "#202225");
colorNamespaceList.set("Discord Blurple", "#5865F2");
colorNamespaceList.set("Discord Fuchsia", "#EB459E");
colorNamespaceList.set("Discord Green", "#57F287");
colorNamespaceList.set("Discord Red", "#ED4245");
colorNamespaceList.set("Discord Yellow", "#FEE75C");
colorNamespaceList.set("Embed Background Dark", "#2F3136");
const regexpDiscordWebhookURL = /^(?:https:\/\/(?:canary\.)?discord(?:app)?\.com\/api\/webhooks\/)?(?<key>\d+\/(?:[\dA-Za-z][\dA-Za-z_-]*)?[\dA-Za-z])$/u;
const regexpISO8601 = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ$/u;
const regexpSnowflake = /^\d+$/u;
const splitterNewLine = /\r?\n/gu;
const splitterCommonDelimiter = /,|;|\||\r?\n/gu;
const discordWebhookURLQuery = new URLSearchParams();
try {
    const truncateEnable = ghactionsGetBooleanInput("truncate_enable", { required: true });
    const stringTruncator = new StringTruncator(128, {
        ellipsisMark: ghactionsGetInput("truncate_ellipsis", { required: true }),
        //@ts-ignore Validate by package.
        ellipsisPosition: ghactionsGetInput("truncate_position", { required: true })
    });
    const key = (() => {
        const keyRaw = ghactionsGetInput("key", { required: true });
        if (!regexpDiscordWebhookURL.test(keyRaw)) {
            throw new TypeError(`Input \`key\` is not a valid Discord webhook key!`);
        }
        return keyRaw.match(regexpDiscordWebhookURL).groups.key;
    })();
    ghactionsSetSecret(key);
    const content = (() => {
        let contentRaw = ghactionsGetInput("content");
        const contentLinksNoEmbed = ghactionsGetInput("content_links_no_embed");
        if (contentLinksNoEmbed.length > 0 && contentRaw.length > 0) {
            const contentLinksNoEmbedRegExp = new RegExp(contentLinksNoEmbed.split(splitterNewLine).join("|"), "gu");
            contentRaw = contentRaw.split(/ /gu).map((value) => {
                return ((URL.canParse(value) && /^https?:\/\//u.test(value) && contentLinksNoEmbedRegExp.test(value)) ? `<${value}>` : value);
            }).join(" ");
        }
        if (contentRaw.length > 2000) {
            if (truncateEnable) {
                contentRaw = stringTruncator.truncate(contentRaw, 2000);
            }
        }
        return contentRaw;
    })();
    const username = (() => {
        let usernameRaw = ghactionsGetInput("username");
        if (usernameRaw.length > 0) {
            if (usernameRaw.toLowerCase() === "clyde") {
                throw new Error(`"${usernameRaw}" is not allowed to use as the username of the webhook!`);
            }
            if (usernameRaw.length > 80 && truncateEnable) {
                usernameRaw = stringTruncator.truncate(usernameRaw, 80);
            }
        }
        return usernameRaw;
    })();
    const avatarURL = ghactionsGetInput("avatar_url");
    const tts = ghactionsGetBooleanInput("tts", { required: true });
    let embeds = (() => {
        const embedsRaw = yaml.parse(ghactionsGetInput("embeds"));
        if (!(isJSON(embedsRaw) && Array.isArray(embedsRaw))) {
            throw new TypeError(`Input \`embeds\` is not a valid Discord embeds!`);
        }
        return embedsRaw;
    })();
    if (embeds.length > 0) {
        embeds = embeds.map((embed, embedsIndex) => {
            if (!(typeof embed === "object" && !Array.isArray(embed) && embed !== null)) {
                throw new TypeError(`Input \`embeds[${embedsIndex}]\` is not a valid Discord embed!`);
            }
            for (const embedKey of Object.keys(embed)) {
                switch (embedKey) {
                    case "title":
                        if (typeof embed.title !== "string") {
                            throw new TypeError(`Unknown input \`embeds[${embedsIndex}].title\`!`);
                        }
                        if (embed.title.length === 0) {
                            delete embed.title;
                            break;
                        }
                        if (embed.title.length > 256 && truncateEnable) {
                            embed.title = stringTruncator.truncate(embed.title, 256);
                        }
                        break;
                    case "description":
                        if (typeof embed.description !== "string") {
                            throw new TypeError(`Unknown input \`embeds[${embedsIndex}].description\`!`);
                        }
                        if (embed.description.length === 0) {
                            delete embed.description;
                            break;
                        }
                        if (embed.description.length > 4096 && truncateEnable) {
                            embed.description = stringTruncator.truncate(embed.description, 4096);
                        }
                        break;
                    case "url":
                        if (typeof embed.url !== "string") {
                            throw new TypeError(`Unknown input \`embeds[${embedsIndex}].url\`!`);
                        }
                        if (embed.url.length === 0) {
                            delete embed.url;
                            break;
                        }
                        break;
                    case "timestamp":
                        if (typeof embed.timestamp !== "string") {
                            throw new TypeError(`Unknown input \`embeds[${embedsIndex}].timestamp\`!`);
                        }
                        if (embed.timestamp.length === 0) {
                            delete embed.timestamp;
                            break;
                        }
                        if (!(regexpISO8601.test(embed.timestamp) && new Date(embed.timestamp))) {
                            throw new SyntaxError(`${embed.timestamp} (input \`embeds[${embedsIndex}].timestamp\`) is not a valid ISO 8601 timestamp!`);
                        }
                        break;
                    case "color":
                        if (typeof embed.color === "number") {
                            if (!(Number.isSafeInteger(embed.color) && embed.color >= 0 && embed.color <= 16777215)) {
                                throw new RangeError(`${embed.color} (input \`embeds[${embedsIndex}].color\`) is not a valid RGB integer!`);
                            }
                        }
                        else if (typeof embed.color === "string") {
                            if (embed.color.length === 0) {
                                delete embed.color;
                                break;
                            }
                            if (embed.color === "Random") {
                                embed.color = (randomInt(0, 256) * 65536) + (randomInt(0, 256) * 256) + randomInt(0, 256);
                            }
                            else if (colorNamespaceList.has(embed.color)) {
                                embed.color = Color(colorNamespaceList.get(embed.color), "hex").rgbNumber();
                            }
                            else {
                                try {
                                    embed.color = Color(embed.color).rgbNumber();
                                }
                                catch (error) {
                                    throw new SyntaxError(`${embed.color} (input \`embeds[${embedsIndex}].color\`) is not a valid CSS color: ${error}`);
                                }
                            }
                        }
                        else {
                            throw new TypeError(`Unknown input \`embeds[${embedsIndex}].color\`!`);
                        }
                        break;
                    case "footer":
                        if (!(typeof embed.footer === "object" && !Array.isArray(embed.footer) && embed.footer !== null)) {
                            throw new TypeError(`Unknown input \`embeds[${embedsIndex}].footer\`!`);
                        }
                        for (const embedFooterKey of Object.keys(embed.footer)) {
                            switch (embedFooterKey) {
                                case "text":
                                    if (typeof embed.footer.text !== "string") {
                                        throw new TypeError(`Unknown input \`embeds[${embedsIndex}].footer.text\`!`);
                                    }
                                    if (embed.footer.text.length === 0) {
                                        delete embed.footer.text;
                                        break;
                                    }
                                    if (embed.footer.text.length > 2048 && truncateEnable) {
                                        embed.footer.text = stringTruncator.truncate(embed.footer.text, 2048);
                                    }
                                    break;
                                case "icon_url":
                                    if (typeof embed.footer.icon_url !== "string") {
                                        throw new TypeError(`Unknown input \`embeds[${embedsIndex}].footer.icon_url\`!`);
                                    }
                                    if (embed.footer.icon_url.length === 0) {
                                        delete embed.footer.icon_url;
                                        break;
                                    }
                                    break;
                                default:
                                    throw new SyntaxError(`Unknown input \`embeds[${embedsIndex}].footer.${embedFooterKey}\`!`);
                            }
                        }
                        if (Object.keys(embed.footer).length === 0) {
                            delete embed.footer;
                            break;
                        }
                        break;
                    case "image":
                        if (!(typeof embed.image === "object" && !Array.isArray(embed.image) && embed.image !== null)) {
                            throw new TypeError(`Unknown input \`embeds[${embedsIndex}].image\`!`);
                        }
                        for (const embedImageKey of Object.keys(embed.image)) {
                            switch (embedImageKey) {
                                case "url":
                                    if (typeof embed.image.url !== "string") {
                                        throw new TypeError(`Unknown input \`embeds[${embedsIndex}].image.url\`!`);
                                    }
                                    if (embed.image.url.length === 0) {
                                        delete embed.image.url;
                                        break;
                                    }
                                    break;
                                default:
                                    throw new SyntaxError(`Unknown input \`embeds[${embedsIndex}].image.${embedImageKey}\`!`);
                            }
                        }
                        if (Object.keys(embed.image).length === 0) {
                            delete embed.image;
                            break;
                        }
                        break;
                    case "thumbnail":
                        if (!(typeof embed.thumbnail === "object" && !Array.isArray(embed.thumbnail) && embed.thumbnail !== null)) {
                            throw new TypeError(`Unknown input \`embeds[${embedsIndex}].thumbnail\`!`);
                        }
                        for (const embedThumbnailKey of Object.keys(embed.thumbnail)) {
                            switch (embedThumbnailKey) {
                                case "url":
                                    if (typeof embed.thumbnail.url !== "string") {
                                        throw new TypeError(`Unknown input \`embeds[${embedsIndex}].thumbnail.url\`!`);
                                    }
                                    if (embed.thumbnail.url.length === 0) {
                                        delete embed.thumbnail.url;
                                        break;
                                    }
                                    break;
                                default:
                                    throw new SyntaxError(`Unknown input \`embeds[${embedsIndex}].thumbnail.${embedThumbnailKey}\`!`);
                            }
                        }
                        if (Object.keys(embed.thumbnail).length === 0) {
                            delete embed.thumbnail;
                            break;
                        }
                        break;
                    case "author":
                        if (!(typeof embed.author === "object" && !Array.isArray(embed.author) && embed.author !== null)) {
                            throw new TypeError(`Unknown input \`embeds[${embedsIndex}].author\`!`);
                        }
                        for (const embedAuthorKey of Object.keys(embed.author)) {
                            switch (embedAuthorKey) {
                                case "name":
                                    if (typeof embed.author.name !== "string") {
                                        throw new TypeError(`Unknown input \`embeds[${embedsIndex}].author.name\`!`);
                                    }
                                    if (embed.author.name.length === 0) {
                                        delete embed.author.name;
                                        break;
                                    }
                                    if (embed.author.name.length > 256 && truncateEnable) {
                                        embed.author.name = stringTruncator.truncate(embed.author.name, 256);
                                    }
                                    break;
                                case "url":
                                    if (typeof embed.author.url !== "string") {
                                        throw new TypeError(`Unknown input \`embeds[${embedsIndex}].author.url\`!`);
                                    }
                                    if (embed.author.url.length === 0) {
                                        delete embed.author.url;
                                        break;
                                    }
                                    break;
                                case "icon_url":
                                    if (typeof embed.author.icon_url !== "string") {
                                        throw new TypeError(`Unknown input \`embeds[${embedsIndex}].author.icon_url\`!`);
                                    }
                                    if (embed.author.icon_url.length === 0) {
                                        delete embed.author.icon_url;
                                        break;
                                    }
                                    break;
                                default:
                                    throw new SyntaxError(`Unknown input \`embeds[${embedsIndex}].author.${embedAuthorKey}\`!`);
                            }
                        }
                        if (Object.keys(embed.author).length === 0) {
                            delete embed.author;
                            break;
                        }
                        break;
                    case "fields":
                        if (!(isJSON(embed.fields) && Array.isArray(embed.fields))) {
                            throw new TypeError(`Input \`embed[${embedsIndex}].fields\` is not a valid Discord embed fields!`);
                        }
                        if (embed.fields.length > 0) {
                            embed.fields = embed.fields.map((field, fieldsIndex) => {
                                if (!(typeof field === "object" && !Array.isArray(field) && field !== null)) {
                                    throw new TypeError(`Unknown input \`embeds[${embedsIndex}].fields[${fieldsIndex}]\`!`);
                                }
                                for (const embedFieldKey of Object.keys(field)) {
                                    switch (embedFieldKey) {
                                        case "name":
                                            if (typeof field.name !== "string") {
                                                throw new TypeError(`Unknown input \`embeds[${embedsIndex}].fields[${fieldsIndex}].name\`!`);
                                            }
                                            if (field.name.length > 256 && truncateEnable) {
                                                field.name = stringTruncator.truncate(field.name, 256);
                                            }
                                            break;
                                        case "value":
                                            if (typeof field.value !== "string") {
                                                throw new TypeError(`Unknown input \`embeds[${embedsIndex}].fields[${fieldsIndex}].value\`!`);
                                            }
                                            if (field.value.length > 1024 && truncateEnable) {
                                                field.value = stringTruncator.truncate(field.value, 1024);
                                            }
                                            break;
                                        case "inline":
                                            if (typeof field.inline !== "boolean") {
                                                throw new TypeError(`Unknown input \`embeds[${embedsIndex}].fields[${fieldsIndex}].inline\`!`);
                                            }
                                            break;
                                        default:
                                            throw new SyntaxError(`Unknown input \`embeds[${embedsIndex}].fields[${fieldsIndex}].${embedFieldKey}\`!`);
                                    }
                                }
                                return field;
                            }).filter((field) => {
                                return (field.name.length > 0 ||
                                    field.value.length > 0);
                            });
                        }
                        if (embed.fields.length > 25) {
                            throw new SyntaxError(`Input \`embeds[${embedsIndex}].fields\` has more than 25 elements (current ${embed.fields.length})!`);
                        }
                        if (embed.fields.length === 0) {
                            delete embed.fields;
                            break;
                        }
                        break;
                    default:
                        throw new SyntaxError(`Unknown input \`embeds[${embedsIndex}].${embedKey}\`!`);
                }
            }
            return embed;
        }).filter((embed) => {
            return (Object.keys(embed).length > 0);
        });
    }
    if (embeds.length > 10) {
        throw new SyntaxError(`Input \`embeds\` has more than 10 elements (current ${embeds.length})!`);
    }
    const allowedMentionsParse = Array.from(new Set(ghactionsGetInput("allowed_mentions_parse").split(splitterCommonDelimiter).map((value) => {
        return value.trim();
    }).filter((value) => {
        return (value.length > 0);
    })));
    for (const element of allowedMentionsParse) {
        if (!["roles", "users", "everyone"].includes(element)) {
            throw new SyntaxError(`\`${element}\` is not a valid Discord allowed mention type!`);
        }
    }
    const allowedMentionsRoles = Array.from(new Set(ghactionsGetInput("allowed_mentions_roles").split(splitterCommonDelimiter).map((value) => {
        return value.trim();
    }).filter((value) => {
        return (value.length > 0);
    })));
    for (const allowedMentionsRole of allowedMentionsRoles) {
        if (!regexpSnowflake.test(allowedMentionsRole)) {
            throw new SyntaxError(`${allowedMentionsRole} (input \`allowed_mentions_roles[*]\`) is not a valid snowflake!`);
        }
    }
    if (allowedMentionsRoles.length > 100) {
        throw new RangeError(`Input \`allowed_mentions_roles\` has more than 100 elements (current ${allowedMentionsRoles.length})!`);
    }
    const allowedMentionsUsers = Array.from(new Set(ghactionsGetInput("allowed_mentions_users").split(splitterCommonDelimiter).map((value) => {
        return value.trim();
    }).filter((value) => {
        return (value.length > 0);
    })));
    for (const allowedMentionsUser of allowedMentionsUsers) {
        if (!regexpSnowflake.test(allowedMentionsUser)) {
            throw new SyntaxError(`${allowedMentionsUser} (input \`allowed_mentions_users[*]\`) is not a valid snowflake!`);
        }
    }
    if (allowedMentionsUsers.length > 100) {
        throw new RangeError(`Input \`allowed_mentions_users\` has more than 100 elements (current ${allowedMentionsUsers.length})!`);
    }
    const filesRaw = Array.from(new Set(ghactionsGetInput("files").split(splitterNewLine).map((value) => {
        return value.trim();
    }).filter((value) => {
        return (value.length > 0);
    })));
    const files = (filesRaw.length > 0) ? await (await ghactionsGlob(filesRaw.join("\n"), {
        followSymbolicLinks: false,
        matchDirectories: false,
        omitBrokenSymbolicLinks: false
    })).glob() : [];
    if (files.length > 10) {
        throw new RangeError(`Input \`files\` has more than 10 elements (current ${files.length})!`);
    }
    for (const file of files) {
        try {
            await fsAccess(file, fsConstants.R_OK);
        }
        catch {
            throw new Error(`File \`${file}\` is not accessible, exist, and/or readable!`);
        }
    }
    if (content.length === 0 && embeds.length === 0 && files.length === 0) {
        throw new Error(`At least either inputs of \`content\`, \`embeds\`, or \`files\` must be provided!`);
    }
    const wait = ghactionsGetBooleanInput("wait", { required: true });
    if (wait) {
        discordWebhookURLQuery.set("wait", "true");
    }
    const threadID = ghactionsGetInput("thread_id");
    if (threadID.length > 0) {
        if (!regexpSnowflake.test(threadID)) {
            throw new SyntaxError(`${threadID} (input \`thread_id\`) is not a valid snowflake!`);
        }
        discordWebhookURLQuery.set("thread_id", threadID);
    }
    const threadName = ghactionsGetInput("thread_name");
    if (threadID.length > 0 && threadName.length > 0) {
        throw new Error(`Only either inputs of \`thread_id\` or \`thread_name\` can be provided!`);
    }
    const method = (() => {
        const methodRaw = ghactionsGetInput("method").toLowerCase();
        if (methodRaw.length === 0) {
            return ((files.length > 0) ? "form" : "json");
        }
        return methodRaw;
    })();
    let requestHeaders = {
        "User-Agent": `NodeJS/${process.versions.node}-${process.platform}-${process.arch} SendDiscordWebhook.GitHubAction/6.0.1`
    };
    const requestPayload = {
        tts,
        allowed_mentions: {
            parse: allowedMentionsParse
        }
    };
    if (content.length > 0) {
        requestPayload.content = content;
    }
    if (username.length > 0) {
        requestPayload.username = username;
    }
    if (avatarURL.length > 0) {
        requestPayload.avatar_url = avatarURL;
    }
    if (embeds.length > 0) {
        requestPayload.embeds = embeds;
    }
    if (allowedMentionsRoles.length > 0) {
        //@ts-ignore Lazy type.
        requestPayload.allowed_mentions.roles = allowedMentionsRoles;
    }
    if (allowedMentionsUsers.length > 0) {
        //@ts-ignore Lazy type.
        requestPayload.allowed_mentions.users = allowedMentionsUsers;
    }
    if (threadName.length > 0) {
        requestPayload.thread_name = threadName;
    }
    const requestPayloadStringify = JSON.stringify(requestPayload);
    ghactionsDebug(`Payload: ${requestPayloadStringify}`);
    const requestQuery = discordWebhookURLQuery.toString();
    const attachments = [];
    const requestBody = (() => {
        switch (method) {
            case "form": {
                const requestForm = new FormDataAlt();
                requestHeaders = {
                    ...requestForm.getHeaders(),
                    ...requestHeaders
                };
                for (let index = 0; index < files.length; index += 1) {
                    attachments.push({
                        filename: pathBaseName(files[index]),
                        id: index
                    });
                    requestForm.append(`files[${index}]`, fsCreateReadStream(files[index]), { filename: pathBaseName(files[index]) });
                }
                requestForm.append("attachments", JSON.stringify(attachments));
                requestForm.append("payload_json", requestPayloadStringify);
                return requestForm;
            }
            case "json":
                requestHeaders["Content-Type"] = "application/json";
                return requestPayloadStringify;
            default:
                throw new Error(`\`${method}\` is not a valid method!`);
        }
    })();
    console.log(`Post network request to Discord.`);
    const response = await fetch(`https://discord.com/api/webhooks/${key}${(requestQuery.length > 0) ? `?${requestQuery}` : ""}`, {
        body: requestBody,
        headers: requestHeaders,
        method: "POST",
        redirect: "follow"
    }).catch((reason) => {
        throw new Error(`Unexpected web request issue: ${reason?.message ?? reason}`);
    });
    const responseText = await response.text();
    ghactionsSetOutput("response", responseText);
    ghactionsSetOutput("status_code", response.status);
    ghactionsSetOutput("status_ok", response.ok);
    ghactionsSetOutput("status_text", response.statusText);
    if (!response.ok) {
        throw new Error(`Unexpected response status \`${response.status} ${response.statusText}\`: ${responseText}`);
    }
    console.log(`Response Status: ${response.status} ${response.statusText}`);
    console.log(`Response Content: ${responseText}`);
}
catch (error) {
    ghactionsError((typeof error?.name !== "undefined" && typeof error?.message !== "undefined") ? `${error.name}: ${error.message}${(typeof error?.stack === "undefined") ? "" : `\n${error.stack}`}` : error);
    process.exit(1);
}
