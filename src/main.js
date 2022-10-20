import { access as fsAccess, constants as fsConstants, readFile } from "node:fs/promises";
import { basename as pathBasename, dirname, join as pathJoin } from "node:path";
import { Chalk } from "chalk";
import { createReadStream } from "node:fs";
import { endGroup as ghactionsEndGroup, error as ghactionsError, getBooleanInput as ghactionsGetBooleanInput, getInput as ghactionsGetInput, setSecret as ghactionsSetSecret, setOutput as ghactionsSetOutput, startGroup as ghactionsStartGroup, warning as ghactionsWarning } from "@actions/core";
import { fileURLToPath, URLSearchParams } from "node:url";
import { isArray as adIsArray, isJSON as adIsJSON, isString as adIsString, isStringifyJSON as adIsStringifyJSON } from "@hugoalh/advanced-determine";
import { randomInt } from "node:crypto";
import { stringOverflow } from "@hugoalh/more-method";
import Ajv2020 from "ajv/dist/2020.js";
import ajvFormats from "ajv-formats";
import ajvFormatsDraft2019 from "ajv-formats-draft2019";
import Color from "color";
import colorNamespaceList from "color-name-list";
import FormData from "form-data";
import nodeFetch from "node-fetch";
import yaml from "yaml";
try {
	const ghactionsActionDirectory = pathJoin(dirname(fileURLToPath(import.meta.url)), "../");
	const ghactionsWorkspaceDirectory = process.env.GITHUB_WORKSPACE;
	const chalk = new Chalk({ level: 3 });
	const requestUserAgent = `SendDiscordWebhook.GitHubAction/5.0.0 NodeJS/${process.versions.node}`;
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
	const jsonSchemaValidator = ajv.compile(JSON.parse((await readFile(pathJoin(ghactionsActionDirectory, "discord-webhook-payload-custom.schema.json"))).toString()));
	const exclusiveColorNamespaceList = JSON.parse((await readFile(pathJoin(ghactionsActionDirectory, "exclusive-color-namespace.json"))).toString());
	ghactionsStartGroup(`Import inputs.`);
	let keyRaw = ghactionsGetInput("key");
	if (!adIsString(keyRaw, { pattern: discordWebhookURLRegExp })) {
		throw new TypeError(`Input \`key\` must be type of string (non-empty); Or this is not a valid Discord key!`);
	}
	let key = keyRaw.match(discordWebhookURLRegExp).groups.key;
	ghactionsSetSecret(key);
	let truncateEnable = ghactionsGetBooleanInput("truncate_enable");
	if (typeof truncateEnable !== "boolean") {
		throw new TypeError(`Input \`truncate_enable\` must be type of boolean!`);
	}
	console.log(`${chalk.bold("Truncate Enable:")} ${truncateEnable}`);
	let truncateEllipsis = ghactionsGetInput("truncate_ellipsis");
	console.log(`${chalk.bold("Truncate Ellipsis:")} ${truncateEllipsis}`);
	let truncatePosition = ghactionsGetInput("truncate_position");
	console.log(`${chalk.bold("Truncate Position:")} ${truncatePosition}`);
	let stringOverflowOption = {
		ellipsis: truncateEllipsis,
		position: truncatePosition
	};
	let payloadRaw = ghactionsGetInput("payload");
	let payload = adIsStringifyJSON(payloadRaw, { arrayRoot: false }) ? JSON.parse(payloadRaw) : yaml.parse(payloadRaw);
	if (!adIsJSON(payload, { arrayRoot: false })) {
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
			payload.content = stringOverflow(payload.content, 2000, stringOverflowOption);
		}
	}
	if (typeof payload.username === "string") {
		if (payload.username.length === 0) {
			delete payload.username;
		} else if (payload.username.length > 80) {
			if (!truncateEnable) {
				throw new Error(`Input \`payload.username\` is too large!`);
			}
			payload.username = stringOverflow(payload.username, 80, stringOverflowOption);
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
					payload.embeds[embedsIndex].title = stringOverflow(payload.embeds[embedsIndex].title, 256, stringOverflowOption);
				}
			}
			if (typeof payload.embeds[embedsIndex].description === "string") {
				if (payload.embeds[embedsIndex].description.length === 0) {
					delete payload.embeds[embedsIndex].description;
				} else if (payload.embeds[embedsIndex].description.length > 4096) {
					if (!truncateEnable) {
						throw new Error(`Input \`payload.embeds[${embedsIndex}].description\` is too large!`);
					}
					payload.embeds[embedsIndex].description = stringOverflow(payload.embeds[embedsIndex].description, 4096, stringOverflowOption);
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
						payload.embeds[embedsIndex].footer.text = stringOverflow(payload.embeds[embedsIndex].footer.text, 2048, stringOverflowOption);
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
						payload.embeds[embedsIndex].author.name = stringOverflow(payload.embeds[embedsIndex].author.name, 256, stringOverflowOption);
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
							payload.embeds[embedsIndex].fields[fieldsIndex].name = stringOverflow(payload.embeds[embedsIndex].fields[fieldsIndex].name, 256, stringOverflowOption);
						}
					}
					if (typeof payload.embeds[embedsIndex].fields[fieldsIndex].value === "string") {
						if (payload.embeds[embedsIndex].fields[fieldsIndex].value.length > 1024) {
							if (!truncateEnable) {
								throw new Error(`Input \`payload.embeds[${embedsIndex}].fields[${fieldsIndex}].value\` is too large!`);
							}
							payload.embeds[embedsIndex].fields[fieldsIndex].value = stringOverflow(payload.embeds[embedsIndex].fields[fieldsIndex].value, 1024, stringOverflowOption);
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
			ghactionsError(error?.message);
		}
		throw JSON.stringify(jsonSchemaValidator.errors);
	}
	let payloadStringify = JSON.stringify(payload);
	console.log(`${chalk.bold("Payload:")} ${payloadStringify}`);
	let files = yaml.parse(ghactionsGetInput("files"));
	if (
		!adIsArray(files, {
			maximumLength: 10,
			strict: true,
			unique: true
		}) ||
		files.some((file) => {
			return !adIsString(file, { empty: false });
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
	console.log(`${chalk.bold("Files:")} ${files}`);
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
	console.log(`${chalk.bold("Wait:")} ${wait}`);
	let threadID = ghactionsGetInput("threadid");
	let threadType = ghactionsGetInput("thread_type").toLowerCase();
	let threadValue = ghactionsGetInput("thread_value");
	if (threadID.length === 0) {
		if (threadType === "id") {
			if (!adIsString(threadValue, { pattern: /^\d+$/u })) {
				throw new TypeError(`Input \`thread_value\` must be type of string; Or this is not a valid thread ID!`);
			}
			ghactionsSetSecret(threadValue);
			discordWebhookQuery.set("thread_id", threadValue);
		} else if (threadType === "name") {
			if (threadValue.length === 0) {
				if (adIsString(payload.content, {
					empty: false,
					preTrim: true
				})) {
					threadValue = stringOverflow(payload.content.trim().replace(/\r?\n/gu, " "), 100, stringOverflowOption);
				} else if (adIsArray(payload.embeds, {
					maximumLength: 1,
					minimumLength: 1
				}) && adIsString(payload.embeds[0].title, {
					empty: false,
					preTrim: true
				})) {
					threadValue = stringOverflow(payload.embeds[0].title.trim().replace(/\r?\n/gu, " "), 100, stringOverflowOption);
				} else if (adIsArray(payload.embeds, {
					maximumLength: 1,
					minimumLength: 1
				}) && adIsString(payload.embeds[0].description, {
					empty: false,
					preTrim: true
				})) {
					threadValue = stringOverflow(payload.embeds[0].description.trim().replace(/\r?\n/gu, " "), 100, stringOverflowOption);
				} else {
					threadValue = `Send Discord Webhook - ${new Date().toISOString().replace(/\.000Z$/gu, "Z")}`;
				}
			} else if (threadValue.length > 100) {
				if (!truncateEnable) {
					throw new Error(`Input \`thread_value\` is too large!`);
				}
				threadValue = stringOverflow(threadValue, 100, stringOverflowOption);
			}
			payload.thread_name = threadValue;
			console.log(`${chalk.bold("Thread Name:")} ${threadValue}`);
		} else if (threadType !== "none") {
			throw new TypeError(`\`${threadType}\` is not a valid thread type!`);
		}
	} else {
		if (!adIsString(threadID, { pattern: /^\d+$/u })) {
			throw new TypeError(`Input \`threadid\` must be type of string or undefined; Or this is not a valid thread ID!`);
		}
		ghactionsSetSecret(threadID);
		discordWebhookQuery.set("thread_id", threadID);
	}
	let requestBody;
	let requestHeader;
	let requestQuery = discordWebhookQuery.toString();
	if (method === "form") {
		requestBody = new FormData();
		if (files.length > 0) {
			payload.attachments = [];
			for (let filesIndex = 0; filesIndex < files.length; filesIndex++) {
				let fileFullPath = pathJoin(ghactionsWorkspaceDirectory, files[filesIndex]);
				let fileName = pathBasename(fileFullPath);
				payload.attachments.push({
					"filename": fileName,
					"id": filesIndex
				});
				requestBody.append(`files[${filesIndex}]`, createReadStream(fileFullPath));
			}
		}
		requestBody.append("payload_json", JSON.stringify(payload));
		requestHeader = {
			...requestBody.getHeaders(),
			"User-Agent": requestUserAgent
		};
	} else {
		requestBody = payloadStringify;
		requestHeader = {
			"Content-Type": "application/json",
			"User-Agent": requestUserAgent
		};
	}
	ghactionsEndGroup();
	ghactionsStartGroup(`Post network request to Discord.`);
	let response = await nodeFetch(
		`https://discord.com/api/webhooks/${key}${(requestQuery.length > 0) ? `?${requestQuery}` : ""}`,
		{
			body: requestBody,
			follow: 1,
			headers: requestHeader,
			method: "POST",
			redirect: "follow"
		}
	);
	let responseText = await response.text();
	ghactionsSetOutput("response", responseText);
	ghactionsSetOutput("status_code", response.status);
	ghactionsSetOutput("status_ok", response.ok);
	ghactionsSetOutput("status_text", response.statusText);
	if (!response.ok) {
		throw new Error(`Unexpected response status \`${response.status} ${response.statusText}\`: ${responseText}`);
	}
	console.log(`${chalk.bold("Response Status:")} ${response.status} ${response.statusText}`);
	console.log(`${chalk.bold("Response Content:")} ${responseText}`);
	ghactionsEndGroup();
} catch (error) {
	ghactionsError(error?.message);
	ghactionsEndGroup();
	process.exit(1);
}
