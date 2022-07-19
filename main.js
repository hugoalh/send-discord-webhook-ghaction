import { accessSync as fileSystemAccessSync, constants as fileSystemConstants, createReadStream as fileSystemCreateReadStream, readFileSync as fileSystemReadFileSync } from "fs";
import { basename as pathFileName, dirname as pathDirectoryName, join as pathJoin } from "path";
import { Chalk } from "chalk";
import { endGroup as ghactionsEndGroup, error as ghactionsError, getBooleanInput as ghactionsGetBooleanInput, getInput as ghactionsGetInput, info as ghactionsInformation, setSecret as ghactionsSetSecret, startGroup as ghactionsStartGroup, warning as ghactionsWarning } from "@actions/core";
import { fileURLToPath, URLSearchParams } from "url";
import { isArray as adIsArray, isJSON as adIsJSON, isString as adIsString } from "@hugoalh/advanced-determine";
import { stringOverflow as mmStringOverflow } from "@hugoalh/more-method";
import Ajv2020 from "ajv/dist/2020.js";
import ajvFormat from "ajv-formats";
import ajvFormatsDraft2019 from "ajv-formats-draft2019";
import nodeFetch from "node-fetch";
import yaml from "yaml";
const ghactionsChalk = new Chalk({ level: 3 });
const ajv = new Ajv2020({
	$comment: false,
	$data: false,
	allErrors: true,
	allowMatchingProperties: true,
	allowUnionTypes: true,
	code: {
		es5: false,
		lines: true
	},
	coerceTypes: false,
	logger: {
		error: ghactionsError,
		log: ghactionsInformation,
		warn: ghactionsWarning
	},
	strictSchema: "log",
	timestamp: "string",
	useDefaults: false,
	validateSchema: true
});
ajvFormat(ajv);
ajvFormatsDraft2019(ajv);
const actionUserAgent = `NodeJS/${process.versions.node} SendDiscordWebhook.GitHubAction/4.2.2`;
const colourHexRegExp = /^#[\dA-F]{6}$/gu;
const colourNamespaceRegExpMap = new Map([
	[/^black$/giu, 0],
	[/^default$/giu, 2105893],
	[/^discord-?black$/giu, 2303786],
	[/^discord-?blue?-?(?:pu)?rple$/giu, 7506394],
	[/^discord-?dark$/giu, 2895667],
	[/^discord-?gr[ae]y-?(?:pur)?ple$/giu, 10070709],
	[/^embed-?dark$/giu, 3092790],
	[/^white$/giu, 16777215]
]);
const colourRandomRegExp = /^random$/giu;
const colourRGBRegExp = /^(?:2(?:5[0-5]|[0-4]\d)|1\d{2}|[1-9]\d|\d)(?:, ?(?:2(?:5[0-5]|[0-4]\d)|1\d{2}|[1-9]\d|\d)){2}$/gu;
const discordWebhookQuery = new URLSearchParams();
const discordWebhookURLRegExp = /^https:\/\/(?:canary\.)?discord(?:app)?\.com\/api\/webhooks\/(?<key>\d+\/[\da-zA-Z_-]+)$/gu;
const ghactionsActionDirectory = pathDirectoryName(fileURLToPath(import.meta.url));
const ghactionsWorkspaceDirectory = process.env.GITHUB_WORKSPACE;
const jsonSchemaValidator = ajv.compile(JSON.parse(fileSystemReadFileSync(pathJoin(ghactionsActionDirectory, "discord-webhook-payload-custom.schema.json"), { encoding: "utf8" })));
(async () => {
	ghactionsStartGroup(`Import inputs.`);
	let key = ghactionsGetInput("key");
	if (!adIsString(key, { pattern: /^(?:https:\/\/(?:canary\.)?discord(?:app)?\.com\/api\/webhooks\/)?\d+\/[\da-zA-Z_-]+$/gu })) {
		throw new TypeError(`Input \`key\` must be type of string (non-empty)!`);
	};
	if (key.search(discordWebhookURLRegExp) === 0) {
		key = key.replace(discordWebhookURLRegExp, "$<key>");
	};
	ghactionsSetSecret(key);
	let threadID = ghactionsGetInput("threadid");
	if (adIsString(threadID, { pattern: /^\d+$/gu })) {
		ghactionsSetSecret(threadID);
		discordWebhookQuery.set("thread_id", threadID);
	};
	let wait = ghactionsGetBooleanInput("wait");
	if (typeof wait !== "boolean") {
		throw new TypeError(`Input \`wait\` must be type of boolean!`);
	};
	if (wait) {
		discordWebhookQuery.set("wait", "true");
	};
	ghactionsInformation(`${ghactionsChalk.bold("Wait:")} ${wait}`);
	let truncateEnable = ghactionsGetBooleanInput("truncate_enable");
	if (typeof truncateEnable !== "boolean") {
		throw new TypeError(`Input \`truncate_enable\` must be type of boolean!`);
	};
	ghactionsInformation(`${ghactionsChalk.bold("Truncate Enable:")} ${truncateEnable}`);
	let stringOverflowOption = {
		ellipsis: ghactionsGetInput("truncate_ellipsis"),
		position: ghactionsGetInput("truncate_position")
	};
	ghactionsInformation(`${ghactionsChalk.bold("Truncate Option:")} ${JSON.stringify(stringOverflowOption)}`);
	let payload = yaml.parse(ghactionsGetInput("payload"));
	if (!adIsJSON(payload, { arrayRoot: false })) {
		throw new TypeError(`\`${payload}\` is not a valid Discord webhook JSON/YAML/YML payload!`);
	};
	if (jsonSchemaValidator(payload) === false) {
		for (let error of jsonSchemaValidator.errors) {
			ghactionsError(error.message);
		};
		throw JSON.stringify(jsonSchemaValidator.errors);
	};
	if (typeof payload.$schema !== "undefined") {
		delete payload.$schema;
	};
	if (typeof payload.content === "string") {
		if (payload.content.length === 0) {
			delete payload.content;
		} else if (payload.content.length > 2000) {
			if (!truncateEnable) {
				throw new Error(`Input \`payload.content\` is too large!`);
			};
			payload.content = mmStringOverflow(payload.content, 2000, stringOverflowOption);
		};
	};
	if (typeof payload.username === "string") {
		if (payload.username.length === 0) {
			delete payload.username;
		} else if (payload.username.length > 80) {
			if (!truncateEnable) {
				throw new Error(`Input \`payload.username\` is too large!`);
			};
			payload.username = mmStringOverflow(payload.username, 80, stringOverflowOption);
		};
	};
	if (typeof payload.avatar_url === "string") {
		if (payload.avatar_url.length === 0) {
			delete payload.avatar_url;
		};
	};
	if (Array.isArray(payload.embeds)) {
		for (let embedsIndex = 0; embedsIndex < payload.embeds.length; embedsIndex++) {
			if (typeof payload.embeds[embedsIndex].title === "string") {
				if (payload.embeds[embedsIndex].title.length === 0) {
					delete payload.embeds[embedsIndex].title;
				} else if (payload.embeds[embedsIndex].title.length > 256) {
					if (!truncateEnable) {
						throw new Error(`Input \`payload.embeds[${embedsIndex}].title\` is too large!`);
					};
					payload.embeds[embedsIndex].title = mmStringOverflow(payload.embeds[embedsIndex].title, 256, stringOverflowOption);
				};
			};
			if (typeof payload.embeds[embedsIndex].description === "string") {
				if (payload.embeds[embedsIndex].description.length === 0) {
					delete payload.embeds[embedsIndex].description;
				} else if (payload.embeds[embedsIndex].description.length > 4096) {
					if (!truncateEnable) {
						throw new Error(`Input \`payload.embeds[${embedsIndex}].description\` is too large!`);
					};
					payload.embeds[embedsIndex].description = mmStringOverflow(payload.embeds[embedsIndex].description, 4096, stringOverflowOption);
				};
			};
			if (typeof payload.embeds[embedsIndex].url === "string") {
				if (payload.embeds[embedsIndex].url.length === 0) {
					delete payload.embeds[embedsIndex].url;
				};
			};
			if (typeof payload.embeds[embedsIndex].color === "string") {
				if (payload.embeds[embedsIndex].color.search(colourHexRegExp) === 0) {
					payload.embeds[embedsIndex].color = Number(payload.embeds[embedsIndex].color.replace("#", "0x"));
				} else if (payload.embeds[embedsIndex].color.search(colourRGBRegExp) === 0) {
					let [R, G, B] = payload.embeds[embedsIndex].color.split(/, ?/gu);
					payload.embeds[embedsIndex].color = Number(R) * 65536 + Number(G) * 256 + Number(B);
				} else if (payload.embeds[embedsIndex].color.search(colourRandomRegExp) === 0) {
					payload.embeds[embedsIndex].color = Math.floor(Math.random() * 256) * 65536 + Math.floor(Math.random() * 256) * 256 + Math.floor(Math.random() * 256);
				} else {
					for (let [re, value] of colourNamespaceRegExpMap) {
						if (payload.embeds[embedsIndex].color.search(re) === 0) {
							payload.embeds[embedsIndex].color = value;
							break;
						};
					};
				};
			};
			if (typeof payload.embeds[embedsIndex].footer !== "undefined") {
				if (typeof payload.embeds[embedsIndex].footer.text === "string") {
					if (payload.embeds[embedsIndex].footer.text.length === 0) {
						delete payload.embeds[embedsIndex].footer.text;
					} else if (payload.embeds[embedsIndex].footer.text.length > 2048) {
						if (!truncateEnable) {
							throw new Error(`Input \`payload.embeds[${embedsIndex}].footer.text\` is too large!`);
						};
						payload.embeds[embedsIndex].footer.text = mmStringOverflow(payload.embeds[embedsIndex].footer.text, 2048, stringOverflowOption);
					};
				};
				if (typeof payload.embeds[embedsIndex].footer.icon_url === "string") {
					if (payload.embeds[embedsIndex].footer.icon_url.length === 0) {
						delete payload.embeds[embedsIndex].footer.icon_url;
					};
				};
			};
			if (typeof payload.embeds[embedsIndex].image !== "undefined") {
				if (typeof payload.embeds[embedsIndex].image.url === "string") {
					if (payload.embeds[embedsIndex].image.url.length === 0) {
						delete payload.embeds[embedsIndex].image.url;
					};
				};
			};
			if (typeof payload.embeds[embedsIndex].thumbnail !== "undefined") {
				if (typeof payload.embeds[embedsIndex].thumbnail.url === "string") {
					if (payload.embeds[embedsIndex].thumbnail.url.length === 0) {
						delete payload.embeds[embedsIndex].thumbnail.url;
					};
				};
			};
			if (typeof payload.embeds[embedsIndex].author !== "undefined") {
				if (typeof payload.embeds[embedsIndex].author.name === "string") {
					if (payload.embeds[embedsIndex].author.name.length === 0) {
						delete payload.embeds[embedsIndex].author.name;
					} else if (payload.embeds[embedsIndex].author.name.length > 256) {
						if (!truncateEnable) {
							throw new Error(`Input \`payload.embeds[${embedsIndex}].author.name\` is too large!`);
						};
						payload.embeds[embedsIndex].author.name = mmStringOverflow(payload.embeds[embedsIndex].author.name, 256, stringOverflowOption);
					};
				};
				if (typeof payload.embeds[embedsIndex].author.url === "string") {
					if (payload.embeds[embedsIndex].author.url.length === 0) {
						delete payload.embeds[embedsIndex].author.url;
					};
				};
				if (typeof payload.embeds[embedsIndex].author.icon_url === "string") {
					if (payload.embeds[embedsIndex].author.icon_url.length === 0) {
						delete payload.embeds[embedsIndex].author.icon_url;
					};
				};
			};
			if (Array.isArray(payload.embeds[embedsIndex].fields)) {
				for (let fieldsIndex = 0; fieldsIndex < payload.embeds[embedsIndex].fields.length; fieldsIndex++) {
					if (typeof payload.embeds[embedsIndex].fields[fieldsIndex].name === "string") {
						if (payload.embeds[embedsIndex].fields[fieldsIndex].name.length > 256) {
							if (!truncateEnable) {
								throw new Error(`Input \`payload.embeds[${embedsIndex}].fields[${fieldsIndex}].name\` is too large!`);
							};
							payload.embeds[embedsIndex].fields[fieldsIndex].name = mmStringOverflow(payload.embeds[embedsIndex].fields[fieldsIndex].name, 256, stringOverflowOption);
						};
					};
					if (typeof payload.embeds[embedsIndex].fields[fieldsIndex].value === "string") {
						if (payload.embeds[embedsIndex].fields[fieldsIndex].value.length > 1024) {
							if (!truncateEnable) {
								throw new Error(`Input \`payload.embeds[${embedsIndex}].fields[${fieldsIndex}].value\` is too large!`);
							};
							payload.embeds[embedsIndex].fields[fieldsIndex].value = mmStringOverflow(payload.embeds[embedsIndex].fields[fieldsIndex].value, 1024, stringOverflowOption);
						};
					};
				};
				if (payload.embeds[embedsIndex].fields.length === 0) {
					delete payload.embeds[embedsIndex].fields;
				};
			};
		};
		if (payload.embeds.length === 0) {
			delete payload.embeds;
		};
	};
	let files = yaml.parse(ghactionsGetInput("files"));
	if (!adIsArray(files, {
		maximumLength: 10,
		super: true,
		unique: true
	})) {
		throw new TypeError(`Input \`files\` must be type of array (unique) and maximum 10 elements!`);
	};
	for (let file of files) {
		if (!adIsString(file, { empty: false })) {
			throw new TypeError(`Input \`files[*]\` must be type of strings (non-empty)!`);
		};
		try {
			fileSystemAccessSync(pathJoin(ghactionsWorkspaceDirectory, file), fileSystemConstants.R_OK);
		} catch {
			throw new Error(`File \`${file}\` does not assessible, exist, or readable!`);
		};
	};
	if (typeof payload.content === "undefined" && typeof payload.embeds === "undefined" && files.length === 0) {
		throw new Error(`At least one of the input \`payload.content\`, \`payload.embeds\`, or \`files\` must be provided!`);
	};
	let method = ghactionsGetInput("method").toLowerCase();
	if (files.length > 0) {
		if (method.length === 0) {
			method = "form";
		};
	} else {
		if (method.length === 0) {
			method = "json";
		};
	};
	if (
		(method !== "form" && method !== "json") ||
		(method === "json" && files.length > 0)
	) {
		throw new Error(`Input \`method\`'s value \`${method}\` is not a valid content type!`);
	};
	let payloadStringify = JSON.stringify(payload);
	let requestBody;
	let requestBodyInspect;
	let requestHeader;
	let requestQuery = discordWebhookQuery.toString();
	if (method === "form") {
		const FormData = (await import("form-data")).default;
		const utility = (await import("util")).default;
		requestBody = new FormData();
		if (files.length > 0) {
			payload.attachments = [];
			for (let filesIndex = 0; filesIndex < files.length; filesIndex++) {
				let fileFullPath = pathJoin(ghactionsWorkspaceDirectory, files[filesIndex]);
				let fileName = pathFileName(fileFullPath);
				payload.attachments.push({
					"id": filesIndex,
					"filename": fileName
				});
				requestBody.append(`files[${filesIndex}]`, fileSystemCreateReadStream(fileFullPath));
			};
		};
		requestBody.append("payload_json", JSON.stringify(payload));
		requestBodyInspect = utility.inspect(
			requestBody,
			{
				breakLength: Infinity,
				colors: true,
				compact: false,
				depth: Infinity,
				maxArrayLength: Infinity,
				showHidden: false
			}
		);
		requestHeader = {
			...requestBody.getHeaders(),
			"User-Agent": actionUserAgent
		};
	} else {
		requestBody = payloadStringify;
		requestBodyInspect = payloadStringify;
		requestHeader = {
			"Content-Type": "application/json",
			"User-Agent": actionUserAgent
		};
	};
	ghactionsInformation(`${ghactionsChalk.bold("Payload:")} ${requestBodyInspect}`);
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
	let result = `${ghactionsChalk.bold("Status Code:")} ${response.status}\n${ghactionsChalk.bold("Response:")} ${responseText}`;
	if (!response.ok) {
		throw new Error(result);
	};
	ghactionsInformation(result);
	ghactionsEndGroup();
})().catch((reason) => {
	ghactionsError(reason);
	ghactionsEndGroup();
	process.exit(1);
});
