import { randomInt } from "node:crypto";
import { createReadStream as fsCreateReadStream } from "node:fs";
import { access as fsAccess, constants as fsConstants, readFile as fsReadFile } from "node:fs/promises";
import { basename as pathBaseName, dirname as pathDirName, join as pathJoin } from "node:path";
import { fileURLToPath, URLSearchParams } from "node:url";
import { endGroup as ghactionsEndGroup, error as ghactionsError, getBooleanInput as ghactionsGetBooleanInput, getInput as ghactionsGetInput, setOutput as ghactionsSetOutput, setSecret as ghactionsSetSecret, startGroup as ghactionsStartGroup, warning as ghactionsWarning } from "@actions/core";
import { ArrayItemFilter, isArray, isJSON, isString, isStringifyJSON, StringItemFilter } from "@hugoalh/advanced-determine";
import { StringOverflowTruncator } from "@hugoalh/string-overflow";
import Ajv2020 from "ajv/dist/2020.js";
import ajvFormats from "ajv-formats";
import ajvFormatsDraft2019 from "ajv-formats-draft2019";
import Color from "color";
import colorNamespaceList from "color-name-list";
import FormData from "form-data";
import nodeFetch from "node-fetch";
import yaml from "yaml";
const ghactionsActionDirectory = pathJoin(pathDirName(fileURLToPath(import.meta.url)), "../");
const ghactionsWorkspaceDirectory = process.env.GITHUB_WORKSPACE;
const discordWebhookQuery = new URLSearchParams();
const discordWebhookURLRegExp = /^(?:https:\/\/(?:canary\.)?discord(?:app)?\.com\/api\/webhooks\/)?(?<key>\d+\/(?:[\da-zA-Z][\da-zA-Z_-]*)?[\da-zA-Z])$/u;
const ajv = new Ajv2020({
	$comment: false,
	$data: false,
	allErrors: true,
	allowMatchingProperties: true,
	allowUnionTypes: true,
	code: {
		es5: false,
		esm: true,
		lines: false,
		optimize: true,
		source: false
	},
	coerceTypes: false,
	logger: {
		error: ghactionsError,
		log: console.log,
		warn: ghactionsWarning
	},
	strictSchema: "log",
	timestamp: "string",
	useDefaults: false,
	validateSchema: true
});
ajvFormats(ajv);
ajvFormatsDraft2019(ajv);
const jsonSchemaValidator = ajv.compile(JSON.parse((await fsReadFile(pathJoin(ghactionsActionDirectory, "discord-webhook-payload-custom.schema.json"))).toString()));
const exclusiveColorNamespaceList = JSON.parse((await fsReadFile(pathJoin(ghactionsActionDirectory, "exclusive-color-namespace.json"))).toString());
try {
	ghactionsStartGroup(`Import inputs.`);
	let keyRaw = ghactionsGetInput("key");
	if (!isString(keyRaw, { pattern: discordWebhookURLRegExp })) {
		throw new TypeError(`Input \`key\` is not a valid Discord webhook key!`);
	}
	let key = keyRaw.match(discordWebhookURLRegExp).groups.key;
	ghactionsSetSecret(key);
	let truncateEnable = ghactionsGetBooleanInput("truncate_enable");
	if (typeof truncateEnable !== "boolean") {
		throw new TypeError(`Input \`truncate_enable\` must be type of boolean!`);
	}
	console.log(`Truncate Enable: ${truncateEnable}`);
	let truncateEllipsis = ghactionsGetInput("truncate_ellipsis");
	console.log(`Truncate Ellipsis: ${truncateEllipsis}`);
	let truncatePosition = ghactionsGetInput("truncate_position");
	console.log(`Truncate Position: ${truncatePosition}`);
	let stringOverflowTruncatorOptions = {
		ellipsisMark: truncateEllipsis,
		ellipsisPosition: truncatePosition
	};
	const stringTruncator = new StringOverflowTruncator(128, stringOverflowTruncatorOptions);
	let payloadRaw = ghactionsGetInput("payload");
	let payload = isStringifyJSON(payloadRaw, {
		allowEmpty: true,
		arrayRoot: false
	}) ? JSON.parse(payloadRaw) : yaml.parse(payloadRaw);
	if (!isJSON(payload, {
		allowEmpty: true,
		arrayRoot: false
	})) {
		throw new TypeError(`\`${payload}\` is not a valid Discord webhook JSON/YAML/YML payload!`);
	}
	if (typeof payload.$schema !== "undefined") {
		delete payload.$schema;
	}
	if (typeof payload.content === "string") {
		if (payload.content.length === 0) {
			delete payload.content;
		} else if (payload.content.length > 2000) {
			if (!truncateEnable) {
				throw new Error(`Input \`payload.content\` is too large!`);
			}
			payload.content = stringTruncator.truncate(payload.content, 2000);
		}
	}
	if (typeof payload.username === "string") {
		if (payload.username.length === 0) {
			delete payload.username;
		} else if (payload.username.length > 80) {
			if (!truncateEnable) {
				throw new Error(`Input \`payload.username\` is too large!`);
			}
			payload.username = stringTruncator.truncate(payload.username, 80);
		}
	}
	if (typeof payload.avatar_url === "string") {
		if (payload.avatar_url.length === 0) {
			delete payload.avatar_url;
		}
	}
	if (Array.isArray(payload.embeds)) {
		for (let embedsIndex = 0; embedsIndex < payload.embeds.length; embedsIndex++) {
			if (typeof payload.embeds[embedsIndex].title === "string") {
				if (payload.embeds[embedsIndex].title.length === 0) {
					delete payload.embeds[embedsIndex].title;
				} else if (payload.embeds[embedsIndex].title.length > 256) {
					if (!truncateEnable) {
						throw new Error(`Input \`payload.embeds[${embedsIndex}].title\` is too large!`);
					}
					payload.embeds[embedsIndex].title = stringTruncator.truncate(payload.embeds[embedsIndex].title, 256);
				}
			}
			if (typeof payload.embeds[embedsIndex].description === "string") {
				if (payload.embeds[embedsIndex].description.length === 0) {
					delete payload.embeds[embedsIndex].description;
				} else if (payload.embeds[embedsIndex].description.length > 4096) {
					if (!truncateEnable) {
						throw new Error(`Input \`payload.embeds[${embedsIndex}].description\` is too large!`);
					}
					payload.embeds[embedsIndex].description = stringTruncator.truncate(payload.embeds[embedsIndex].description, 4096);
				}
			}
			if (typeof payload.embeds[embedsIndex].url === "string") {
				if (payload.embeds[embedsIndex].url.length === 0) {
					delete payload.embeds[embedsIndex].url;
				}
			}
			if (typeof payload.embeds[embedsIndex].color === "string") {
				if (payload.embeds[embedsIndex].color.toLowerCase() === "random") {
					payload.embeds[embedsIndex].color = randomInt(0, 256) * 65536 + randomInt(0, 256) * 256 + randomInt(0, 256);
				} else if (exclusiveColorNamespaceList.map((value) => {
					return value.name.toLowerCase();
				}).includes(payload.embeds[embedsIndex].color.toLowerCase())) {
					payload.embeds[embedsIndex].color = Color(exclusiveColorNamespaceList[exclusiveColorNamespaceList.findIndex((value) => {
						return (value.name.toLowerCase() === payload.embeds[embedsIndex].color.toLowerCase());
					})].hex, "hex").rgbNumber();
				} else if (colorNamespaceList.map((value) => {
					return value.name.toLowerCase();
				}).includes(payload.embeds[embedsIndex].color.toLowerCase())) {
					payload.embeds[embedsIndex].color = Color(colorNamespaceList[colorNamespaceList.findIndex((value) => {
						return (value.name.toLowerCase() === payload.embeds[embedsIndex].color.toLowerCase());
					})].hex, "hex").rgbNumber();
				} else {
					try {
						payload.embeds[embedsIndex].color = Color(payload.embeds[embedsIndex].color).rgbNumber();
					} catch { }
				}
			}
			if (typeof payload.embeds[embedsIndex].footer !== "undefined") {
				if (typeof payload.embeds[embedsIndex].footer.text === "string") {
					if (payload.embeds[embedsIndex].footer.text.length === 0) {
						delete payload.embeds[embedsIndex].footer.text;
					} else if (payload.embeds[embedsIndex].footer.text.length > 2048) {
						if (!truncateEnable) {
							throw new Error(`Input \`payload.embeds[${embedsIndex}].footer.text\` is too large!`);
						}
						payload.embeds[embedsIndex].footer.text = stringTruncator.truncate(payload.embeds[embedsIndex].footer.text, 2048);
					}
				}
				if (typeof payload.embeds[embedsIndex].footer.icon_url === "string") {
					if (payload.embeds[embedsIndex].footer.icon_url.length === 0) {
						delete payload.embeds[embedsIndex].footer.icon_url;
					}
				}
			}
			if (typeof payload.embeds[embedsIndex].image !== "undefined") {
				if (typeof payload.embeds[embedsIndex].image.url === "string") {
					if (payload.embeds[embedsIndex].image.url.length === 0) {
						delete payload.embeds[embedsIndex].image.url;
					}
				}
			}
			if (typeof payload.embeds[embedsIndex].thumbnail !== "undefined") {
				if (typeof payload.embeds[embedsIndex].thumbnail.url === "string") {
					if (payload.embeds[embedsIndex].thumbnail.url.length === 0) {
						delete payload.embeds[embedsIndex].thumbnail.url;
					}
				}
			}
			if (typeof payload.embeds[embedsIndex].author !== "undefined") {
				if (typeof payload.embeds[embedsIndex].author.name === "string") {
					if (payload.embeds[embedsIndex].author.name.length === 0) {
						delete payload.embeds[embedsIndex].author.name;
					} else if (payload.embeds[embedsIndex].author.name.length > 256) {
						if (!truncateEnable) {
							throw new Error(`Input \`payload.embeds[${embedsIndex}].author.name\` is too large!`);
						}
						payload.embeds[embedsIndex].author.name = stringTruncator.truncate(payload.embeds[embedsIndex].author.name, 256);
					}
				}
				if (typeof payload.embeds[embedsIndex].author.url === "string") {
					if (payload.embeds[embedsIndex].author.url.length === 0) {
						delete payload.embeds[embedsIndex].author.url;
					}
				}
				if (typeof payload.embeds[embedsIndex].author.icon_url === "string") {
					if (payload.embeds[embedsIndex].author.icon_url.length === 0) {
						delete payload.embeds[embedsIndex].author.icon_url;
					}
				}
			}
			if (Array.isArray(payload.embeds[embedsIndex].fields)) {
				for (let fieldsIndex = 0; fieldsIndex < payload.embeds[embedsIndex].fields.length; fieldsIndex++) {
					if (typeof payload.embeds[embedsIndex].fields[fieldsIndex].name === "string") {
						if (payload.embeds[embedsIndex].fields[fieldsIndex].name.length > 256) {
							if (!truncateEnable) {
								throw new Error(`Input \`payload.embeds[${embedsIndex}].fields[${fieldsIndex}].name\` is too large!`);
							}
							payload.embeds[embedsIndex].fields[fieldsIndex].name = stringTruncator.truncate(payload.embeds[embedsIndex].fields[fieldsIndex].name, 256);
						}
					}
					if (typeof payload.embeds[embedsIndex].fields[fieldsIndex].value === "string") {
						if (payload.embeds[embedsIndex].fields[fieldsIndex].value.length > 1024) {
							if (!truncateEnable) {
								throw new Error(`Input \`payload.embeds[${embedsIndex}].fields[${fieldsIndex}].value\` is too large!`);
							}
							payload.embeds[embedsIndex].fields[fieldsIndex].value = stringTruncator.truncate(payload.embeds[embedsIndex].fields[fieldsIndex].value, 1024);
						}
					}
				}
				if (payload.embeds[embedsIndex].fields.length === 0) {
					delete payload.embeds[embedsIndex].fields;
				}
			}
		}
		payload.embeds = payload.embeds.filter((value) => {
			return (Object.keys(value).length > 0);
		});
		if (payload.embeds.length === 0) {
			delete payload.embeds;
		}
	}
	if (jsonSchemaValidator(payload) === false) {
		for (let error of jsonSchemaValidator.errors) {
			ghactionsError(error?.message ?? error);
		}
		throw JSON.stringify(jsonSchemaValidator.errors);
	}
	let payloadStringify = JSON.stringify(payload);
	console.log(`Payload: ${payloadStringify}`);
	let files = yaml.parse(ghactionsGetInput("files"));
	if (
		!isArray(files, {
			allowEmpty: true,
			lengthMaximum: 10,
			strict: true,
			unique: true
		}) ||
		files.some((file) => {
			return !isString(file);
		})
	) {
		throw new TypeError(`Input \`files\` must be type of strings-array (unique) and maximum 10 elements!`);
	}
	for (let file of files) {
		try {
			await fsAccess(pathJoin(ghactionsWorkspaceDirectory, file), fsConstants.R_OK);
		} catch {
			throw new Error(`File \`${file}\` is not accessible, exist, and/or readable!`);
		}
	}
	console.log(`Files: ${files}`);
	if (typeof payload.content === "undefined" && typeof payload.embeds === "undefined" && files.length === 0) {
		throw new Error(`At least one of the input \`payload.content\`, \`payload.embeds\`, or \`files\` must be provided!`);
	}
	let method = ghactionsGetInput("method").toLowerCase();
	if (method.length === 0) {
		method = (files.length > 0) ? "form" : "json";
	}
	if (
		(method !== "form" && method !== "json") ||
		(method === "json" && files.length > 0)
	) {
		throw new Error(`\`${method}\` is not a valid method!`);
	}
	let wait = ghactionsGetBooleanInput("wait");
	if (typeof wait !== "boolean") {
		throw new TypeError(`Input \`wait\` must be type of boolean!`);
	}
	if (wait) {
		discordWebhookQuery.set("wait", "true");
	}
	console.log(`Wait: ${wait}`);
	let threadID = ghactionsGetInput("threadid");
	let threadType = ghactionsGetInput("thread_type").toLowerCase();
	let threadValue = ghactionsGetInput("thread_value");
	if (threadID.length === 0) {
		if (threadType === "id") {
			if (!isString(threadValue, { pattern: /^\d+$/u })) {
				throw new TypeError(`Input \`thread_value\` is not a valid thread ID!`);
			}
			ghactionsSetSecret(threadValue);
			discordWebhookQuery.set("thread_id", threadValue);
		} else if (threadType === "name") {
			if (threadValue.length === 0) {
				const arrayAloneFilter = new ArrayItemFilter({ length: 1 });
				const stringTFilter = new StringItemFilter({ preTrim: true });
				if (stringTFilter.test(payload.content)) {
					threadValue = stringTruncator.truncate(payload.content.trim().replace(/\r?\n/gu, " "), 100);
				} else if (arrayAloneFilter.test(payload.embeds) && stringTFilter.test(payload.embeds[0].title)) {
					threadValue = stringTruncator.truncate(payload.embeds[0].title.trim().replace(/\r?\n/gu, " "), 100);
				} else if (arrayAloneFilter.test(payload.embeds) && stringTFilter.test(payload.embeds[0].description)) {
					threadValue = stringTruncator.truncate(payload.embeds[0].description.trim().replace(/\r?\n/gu, " "), 100);
				} else {
					threadValue = `Send Discord Webhook - ${new Date().toISOString().replace(/\.000Z$/gu, "Z")}`;
				}
			} else if (threadValue.length > 100) {
				if (!truncateEnable) {
					throw new Error(`Input \`thread_value\` is too large!`);
				}
				threadValue = stringTruncator.truncate(threadValue, 100);
			}
			payload.thread_name = threadValue;
			console.log(`Thread Name: ${threadValue}`);
		} else if (threadType !== "none") {
			throw new TypeError(`\`${threadType}\` is not a valid thread type!`);
		}
	} else {
		if (!isString(threadID, { pattern: /^\d+$/u })) {
			throw new TypeError(`Input \`threadid\` is not a valid thread ID!`);
		}
		ghactionsSetSecret(threadID);
		discordWebhookQuery.set("thread_id", threadID);
	}
	ghactionsEndGroup();
	ghactionsStartGroup(`Post network request to Discord.`);
	let requestBody;
	let requestHeaders = {
		"User-Agent": `SendDiscordWebhook.GitHubAction/5.0.3 NodeJS/${process.versions.node}-${process.platform}-${process.arch}`
	};
	let requestQuery = discordWebhookQuery.toString();
	if (method === "form") {
		requestBody = new FormData();
		if (files.length > 0) {
			payload.attachments = [];
			for (let filesIndex = 0; filesIndex < files.length; filesIndex++) {
				let fileFullPath = pathJoin(ghactionsWorkspaceDirectory, files[filesIndex]);
				let fileName = pathBaseName(fileFullPath);
				payload.attachments.push({
					"filename": fileName,
					"id": filesIndex
				});
				requestBody.append(`files[${filesIndex}]`, fsCreateReadStream(fileFullPath));
			}
		}
		requestBody.append("payload_json", JSON.stringify(payload));
		requestHeaders = {
			...requestBody.getHeaders(),
			...requestHeaders
		};
	} else {
		requestBody = payloadStringify;
		requestHeaders = {
			"Content-Type": "application/json",
			...requestHeaders
		};
	}
	let response = await nodeFetch(`https://discord.com/api/webhooks/${key}${(requestQuery.length > 0) ? `?${requestQuery}` : ""}`, {
		body: requestBody,
		follow: 1,
		headers: requestHeaders,
		method: "POST",
		redirect: "follow"
	}).catch((reason) => {
		throw new Error(`Unexpected web request issue: ${reason?.message ?? reason}`);
	});
	let responseText = await response.text();
	ghactionsSetOutput("response", responseText);
	ghactionsSetOutput("status_code", response.status);
	ghactionsSetOutput("status_ok", response.ok);
	ghactionsSetOutput("status_text", response.statusText);
	if (!response.ok) {
		throw new Error(`Unexpected response status \`${response.status} ${response.statusText}\`: ${responseText}`);
	}
	console.log(`Response Status: ${response.status} ${response.statusText}`);
	console.log(`Response Content: ${responseText}`);
	ghactionsEndGroup();
} catch (error) {
	ghactionsError(error?.message ?? error);
	ghactionsEndGroup();
	process.exit(1);
}
