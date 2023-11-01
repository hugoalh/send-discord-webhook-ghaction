import { randomInt } from "node:crypto";
import { createReadStream as fsCreateReadStream } from "node:fs";
import { access as fsAccess, constants as fsConstants, readFile as fsReadFile } from "node:fs/promises";
import { basename as pathBaseName, join as pathJoin } from "node:path";
import { debug as ghactionsDebug, error as ghactionsError, getBooleanInput as ghactionsGetBooleanInput, getInput as ghactionsGetInput, setOutput as ghactionsSetOutput, setSecret as ghactionsSetSecret } from "@actions/core";
import { create as ghactionsGlob } from "@actions/glob";
import { isJSON } from "@hugoalh/advanced-determine";
import { StringOverflowTruncator } from "@hugoalh/string-overflow";
import { underscorePath } from "@hugoalh/underscore-path";
import Color from "color";
import colorNamespaceList from "color-name-list";
import yaml from "yaml";
console.log("Initialize.");
const splitterNewLine = /\r?\n/gu;
const splitterCommonDelimiter = /,|;|\||\r?\n/gu;
const ghactionsActionDirectory = pathJoin(underscorePath(import.meta.url).__dirname, "../");
const exclusiveColorNamespaceFilePath = pathJoin(ghactionsActionDirectory, "exclusive-color-namespace.json");
const ghactionsWorkspaceDirectory = process.env.GITHUB_WORKSPACE ?? "";
if (!(ghactionsWorkspaceDirectory.length > 0)) {
	ghactionsError(`Environment variable \`GITHUB_WORKSPACE\` is not defined!`);
	process.exit(1);
}
const discordWebhookQuery = new URLSearchParams();
const discordWebhookURLRegExp = /^(?:https:\/\/(?:canary\.)?discord(?:app)?\.com\/api\/webhooks\/)?(?<key>\d+\/(?:[\dA-Za-z][\dA-Za-z_-]*)?[\dA-Za-z])$/u;
const exclusiveColorNamespaceList = JSON.parse(await fsReadFile(exclusiveColorNamespaceFilePath, { encoding: "utf8" }));
try {
	const truncateEnable = ghactionsGetBooleanInput("truncate_enable", { required: true });
	const stringTruncator = new StringOverflowTruncator(128, {
		ellipsisMark: ghactionsGetInput("truncate_ellipsis", { required: true }),
		ellipsisPosition: ghactionsGetInput("truncate_position", { required: true })
	});
	const keyRaw = ghactionsGetInput("key", { required: true });
	if (!discordWebhookURLRegExp.test(keyRaw)) {
		throw new TypeError(`Input \`key\` is not a valid Discord webhook key!`);
	}
	const key = keyRaw.match(discordWebhookURLRegExp).groups.key;
	ghactionsSetSecret(key);
	let content = ghactionsGetInput("content");
	if (content.length > 2000) {
		if (truncateEnable) {
			content = stringTruncator.truncate(content, 2000);
		}
	}
	let username = ghactionsGetInput("username");
	if (username.length > 0) {
		if (username.toLowerCase() === "clyde") {
			throw new Error(`"Clyde" is not allowed to use as the username of the webhook!`);
		}
		if (username.length > 80 && truncateEnable) {
			username = stringTruncator.truncate(username, 80);
		}
	}
	const avatarURL = ghactionsGetInput("avatar_url");
	const tts = ghactionsGetBooleanInput("tts", { required: true });
	let embeds = yaml.parse(ghactionsGetInput("embeds")) ?? [];
	if (!(isJSON(embeds) && Array.isArray(embeds))) {
		throw new TypeError(`Input \`embeds\` is not a valid Discord embeds!`);
	}
	if (embeds.length > 0) {
		embeds = embeds.map((embed, embedsIndex) => {
			if (!(typeof embed === "object" && !Array.isArray(embed) && embed !== null)) {
				throw new TypeError(`Unknown input \`embeds[${embedsIndex}]\`!`);
			}
			for (const embedKey of Object.keys(embed)) {
				switch (embedKey) {
					case "title":
						embed.title = embed.title?.toString() ?? embed.title;
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
						embed.description = embed.description?.toString() ?? embed.description;
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
						embed.url = embed.url?.toString() ?? embed.url;
						if (typeof embed.url !== "string") {
							throw new TypeError(`Unknown input \`embeds[${embedsIndex}].url\`!`);
						}
						if (embed.url.length === 0) {
							delete embed.url;
							break;
						}
						break;
					case "color":
						if (typeof embed.color === "number") {
							if (!(Number.isSafeInteger(embed.color) && embed.color >= 0 && embed.color <= 16777215)) {
								throw new RangeError(`Input \`embeds[${embedsIndex}].color\` is not a valid RGB integer!`);
							}
						} else if (typeof embed.color === "string") {
							if (embed.color.length === 0) {
								delete embed.color;
								break;
							}
							if (embed.color.toLowerCase() === "random") {
								embed.color = randomInt(0, 256) * 65536 + randomInt(0, 256) * 256 + randomInt(0, 256);
							} else if (exclusiveColorNamespaceList.map((value) => {
								return value.name.toLowerCase();
							}).includes(embed.color.toLowerCase())) {
								embed.color = Color(exclusiveColorNamespaceList[exclusiveColorNamespaceList.findIndex((value) => {
									return (value.name.toLowerCase() === embed.color.toLowerCase());
								})].hex, "hex").rgbNumber();
							} else if (colorNamespaceList.map((value) => {
								return value.name.toLowerCase();
							}).includes(embed.color.toLowerCase())) {
								embed.color = Color(colorNamespaceList[colorNamespaceList.findIndex((value) => {
									return (value.name.toLowerCase() === embed.color.toLowerCase());
								})].hex, "hex").rgbNumber();
							} else {
								try {
									embed.color = Color(embed.color).rgbNumber();
								} catch (error) {
									throw new SyntaxError(`Input \`embeds[${embedsIndex}].color\` is not a valid CSS color: ${error}`);
								}
							}
						} else {
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
									embed.footer.text = embed.footer.text?.toString() ?? embed.footer.text;
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
									embed.footer.icon_url = embed.footer.icon_url?.toString() ?? embed.footer.icon_url;
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
									embed.image.url = embed.image.url?.toString() ?? embed.image.url;
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
									embed.thumbnail.url = embed.thumbnail.url?.toString() ?? embed.thumbnail.url;
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
									embed.author.name = embed.author.name?.toString() ?? embed.author.name;
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
									embed.author.url = embed.author.url?.toString() ?? embed.author.url;
									if (typeof embed.author.url !== "string") {
										throw new TypeError(`Unknown input \`embeds[${embedsIndex}].author.url\`!`);
									}
									if (embed.author.url.length === 0) {
										delete embed.author.url;
										break;
									}
									break;
								case "icon_url":
									embed.author.icon_url = embed.author.icon_url?.toString() ?? embed.author.icon_url;
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
											field.name = field.name?.toString() ?? field.name;
											if (typeof field.name !== "string") {
												throw new TypeError(`Unknown input \`embeds[${embedsIndex}].fields[${fieldsIndex}].name\`!`);
											}
											if (field.name.length > 256 && truncateEnable) {
												field.name = stringTruncator.truncate(field.name, 256);
											}
											break;
										case "value":
											field.value = field.value?.toString() ?? field.value;
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
								return (
									field.name.length > 0 ||
									field.value.length > 0
								);
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
	if (allowedMentionsRoles.length > 100) {
		throw new RangeError(`Input \`allowed_mentions_roles\` has more than 100 elements (current ${allowedMentionsRoles.length})!`);
	}
	const allowedMentionsUsers = Array.from(new Set(ghactionsGetInput("allowed_mentions_users").split(splitterCommonDelimiter).map((value) => {
		return value.trim();
	}).filter((value) => {
		return (value.length > 0);
	})));
	if (allowedMentionsUsers.length > 100) {
		throw new RangeError(`Input \`allowed_mentions_users\` has more than 100 elements (current ${allowedMentionsUsers.length})!`);
	}
	const filesRaw = Array.from(new Set(ghactionsGetInput("files").split(splitterNewLine).map((value) => {
		return value.trim();
	}).filter((value) => {
		return (value.length > 0);
	})));
	const files = [];
	if (filesRaw.length > 0) {
		files.push(...(await (await ghactionsGlob(filesRaw.join("\n"), {
			followSymbolicLinks: false,
			matchDirectories: false,
			omitBrokenSymbolicLinks: false
		})).glob()));
	}
	if (files.length > 10) {
		throw new RangeError(`Input \`files\` has more than 10 elements (current ${files.length})!`);
	}
	for (const file of files) {
		try {
			await fsAccess(pathJoin(ghactionsWorkspaceDirectory, file), fsConstants.R_OK);
		} catch {
			throw new Error(`File \`${file}\` is not accessible, exist, and/or readable!`);
		}
	}
	if (content.length === 0 && embeds.length === 0 && files.length === 0) {
		throw new Error(`At least either inputs of \`content\`, \`embeds\`, or \`files\` must be provided!`);
	}
	const wait = ghactionsGetBooleanInput("wait", { required: true });
	if (wait) {
		discordWebhookQuery.set("wait", "true");
	}
	const threadID = ghactionsGetInput("thread_id");
	if (threadID.length > 0) {
		if (!/^\d+$/u.test(threadID)) {
			throw new SyntaxError(`Input \`thread_id\` is not a valid Discord thread ID!`);
		}
		discordWebhookQuery.set("thread_id", threadID);
	}
	const threadName = ghactionsGetInput("thread_name");
	if (threadID.length > 0 && threadName.length > 0) {
		throw new Error(`Only either inputs of \`thread_id\` or \`thread_name\` can be provided!`);
	}
	let method = ghactionsGetInput("method").toLowerCase();
	if (method.length === 0) {
		method = (files.length > 0) ? "form" : "json";
	}
	const requestHeaders = new Headers({
		"User-Agent": `NodeJS/${process.versions.node}-${process.platform}-${process.arch} SendDiscordWebhook.GitHubAction/6.0.0`
	});
	const requestPayload = {
		tts,
		allowed_mentions: {
			parse: allowedMentionsParse,
			roles: allowedMentionsRoles,
			users: allowedMentionsUsers
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
	if (threadName.length > 0) {
		requestPayload.thread_name = threadName;
	}
	const requestPayloadStringify = JSON.stringify(requestPayload);
	ghactionsDebug(`Payload: ${requestPayloadStringify}`);
	const requestQuery = discordWebhookQuery.toString();
	let requestBody;
	const attachments = [];
	switch (method) {
		case "form":
			requestBody = new FormData();
			requestHeaders.append("Content-Type", "multipart/form-data");
			files.forEach((file, filesIndex) => {
				const fileFullPath = pathJoin(ghactionsWorkspaceDirectory, file);
				attachments.push({
					"filename": pathBaseName(fileFullPath),
					"id": filesIndex
				});
				requestBody.append(`files[${filesIndex}]`, fsCreateReadStream(fileFullPath));
			});
			requestBody.append("attachments", JSON.stringify(attachments));
			requestBody.append("payload_json", requestPayloadStringify);
			break;
		case "json":
			requestBody = requestPayloadStringify;
			requestHeaders.append("Content-Type", "application/json");
			break;
		default:
			throw new Error();
	}
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
} catch (error) {
	ghactionsError(error?.message ?? error);
	process.exit(1);
}
