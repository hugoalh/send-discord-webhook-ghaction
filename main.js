import { accessSync as fileSystemAccessSync, constants as fileSystemConstants, createReadStream as fileSystemCreateReadStream, readFileSync as fileSystemReadFileSync } from "fs";
import { basename as pathFileName, dirname as pathDirectoryName, join as pathJoin } from "path";
import { debug as ghactionDebug, error as ghactionError, getInput as ghactionGetInput, info as ghactionInformation, setSecret as ghactionSetSecret, warning as ghactionWarning } from "@actions/core";
import { fileURLToPath, URLSearchParams } from "url";
import { isArray as adIsArray, isJSON as adIsJSON, isString as adIsString } from "@hugoalh/advanced-determine";
import { stringOverflow as mmStringOverflow, stringParse as mmStringParse } from "@hugoalh/more-method";
import Ajv2020 from "ajv/dist/2020.js";
import ajvFormat from "ajv-formats";
import ajvFormatsDraft2019 from "ajv-formats-draft2019";
import nodeFetch from "node-fetch";
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
		error: ghactionError,
		log: ghactionInformation,
		warn: ghactionWarning
	},
	strictSchema: "log",
	timestamp: "string",
	useDefaults: false,
	validateSchema: true
});
ajvFormat(ajv);
ajvFormatsDraft2019(ajv);
const discordWebhookQuery = new URLSearchParams();
const ghactionActionDirectory = pathDirectoryName(fileURLToPath(import.meta.url));
const ghactionUserAgent = "SendDiscordWebhook.GitHubAction/4.0.0";
const ghactionWorkspaceDirectory = process.env.GITHUB_WORKSPACE;
const jsonSchemaValidator = ajv.compile(JSON.parse(fileSystemReadFileSync(
	pathJoin(ghactionActionDirectory, "discord-webhook-payload-custom.schema.json"),
	{
		encoding: "utf8",
		flag: "r"
	}
)));
const reColorHex = /^#[\dA-F]{6}$/gu;
const reColorNamespace = new Map([
	[/^black$/giu, 0],
	[/^default$/giu, 2105893],
	[/^discord-?black$/giu, 2303786],
	[/^discord-?blue?-?(?:pu)?rple$/giu, 7506394],
	[/^discord-?dark$/giu, 2895667],
	[/^discord-?gr[ae]y-?(?:pur)?ple$/giu, 10070709],
	[/^embed-?dark$/giu, 3092790],
	[/^white$/giu, 16777215]
]);
const reColorRandom = /^random$/giu;
const reColorRGB = /^(?:2(?:5[0-5]|[0-4]\\d)|1\\d{2}|[1-9]\\d|\\d)(?:, ?(?:2(?:5[0-5]|[0-4]\\d)|1\\d{2}|[1-9]\\d|\\d)){2}$/gu;
const reDiscordWebhookURL = /^https:\/\/(?:canary\.)?discord(?:app)?\.com\/api\/webhooks\/(?<key>\d+\/[\da-zA-Z_-]+)$/gu;
/**
 * @private
 * @function $importInput
 * @param {string} key
 * @returns {string}
 */
function $importInput(key) {
	ghactionDebug(`Import input \`${key}\`.`);
	return ghactionGetInput(key);
};
(async () => {
	ghactionInformation(`Import inputs.`);
	let dryRun = mmStringParse($importInput("dryrun"));
	if (typeof dryRun !== "boolean") {
		throw new TypeError(`Input \`dryrun\` must be type of boolean!`);
	};
	let key = $importInput("key");
	if (adIsString(key, { pattern: /^(?:https:\/\/(?:canary\.)?discord(?:app)?\.com\/api\/webhooks\/)?\d+\/[\da-zA-Z_-]+$/gu }) !== true) {
		throw new TypeError(`Input \`key\` must be type of string (non-nullable)!`);
	};
	if (key.search(reDiscordWebhookURL) === 0) {
		key = key.replace(reDiscordWebhookURL, "$<key>");
	};
	ghactionSetSecret(key);
	let threadID = $importInput("threadid");
	if (threadID.search(/^\d+$/gu) === 0) {
		ghactionSetSecret(threadID);
		discordWebhookQuery.set("thread_id", threadID);
	};
	let wait = mmStringParse($importInput("wait"));
	if (typeof wait !== "boolean") {
		throw new TypeError(`Input \`wait\` must be type of boolean!`);
	};
	if (wait === true) {
		discordWebhookQuery.set("wait", "true");
	};
	let truncateEnable = mmStringParse($importInput("truncate_enable"));
	if (typeof truncateEnable !== "boolean") {
		throw new TypeError(`Input \`truncate_enable\` must be type of boolean!`);
	};
	let stringOverflowOption = {
		ellipsis: $importInput("truncate_ellipsis"),
		position: $importInput("truncate_position")
	};
	let method = $importInput("method");
	if (adIsString(method, { singleLine: true }) === false) {
		throw new TypeError(`Input \`method\` must be type of string!`);
	};
	let payload = mmStringParse($importInput("payload"));
	if (adIsJSON(payload, { arrayRoot: false }) === false) {
		throw new TypeError(`Input \`payload\` must be type of JSON (non-array-root)!`);
	};
	if (jsonSchemaValidator(payload) === false) {
		for (let error of jsonSchemaValidator.errors) {
			ghactionError(error.message);
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
			if (truncateEnable === false) {
				throw new Error(`Input \`payload.content\` is too large!`);
			};
			payload.content = mmStringOverflow(payload.content, 2000, stringOverflowOption);
		};
	};
	if (typeof payload.username === "string") {
		if (payload.username.length === 0) {
			delete payload.username;
		} else if (payload.username.length > 80) {
			if (truncateEnable === false) {
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
	if (Array.isArray(payload.embeds) === true) {
		for (let embedsIndex = 0; embedsIndex < payload.embeds.length; embedsIndex++) {
			if (typeof payload.embeds[embedsIndex].title === "string") {
				if (payload.embeds[embedsIndex].title.length === 0) {
					delete payload.embeds[embedsIndex].title;
				} else if (payload.embeds[embedsIndex].title.length > 256) {
					if (truncateEnable === false) {
						throw new Error(`Input \`payload.embeds[${embedsIndex}].title\` is too large!`);
					};
					payload.embeds[embedsIndex].title = mmStringOverflow(payload.embeds[embedsIndex].title, 256, stringOverflowOption);
				};
			};
			if (typeof payload.embeds[embedsIndex].description === "string") {
				if (payload.embeds[embedsIndex].description.length === 0) {
					delete payload.embeds[embedsIndex].description;
				} else if (payload.embeds[embedsIndex].description.length > 4096) {
					if (truncateEnable === false) {
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
				if (payload.embeds[embedsIndex].color.search(reColorHex) === 0) {
					payload.embeds[embedsIndex].color = Number(payload.embeds[embedsIndex].color.replace("#", "0x"));
				} else if (payload.embeds[embedsIndex].color.search(reColorRGB) === 0) {
					let [R, G, B] = payload.embeds[embedsIndex].color.split(/, ?/gu);
					payload.embeds[embedsIndex].color = R * 65536 + G * 256 + B;
				} else if (payload.embeds[embedsIndex].color.search(reColorRandom) === 0) {
					payload.embeds[embedsIndex].color = Math.floor(Math.random() * 256) * 65536 + Math.floor(Math.random() * 256) * 256 + Math.floor(Math.random() * 256);
				} else {
					for (let [re, value] of reColorNamespace) {
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
						if (truncateEnable === false) {
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
						if (truncateEnable === false) {
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
			if (Array.isArray(payload.embeds[embedsIndex].fields) === true) {
				for (let fieldsIndex = 0; fieldsIndex < payload.embeds[embedsIndex].fields.length; fieldsIndex++) {
					if (typeof payload.embeds[embedsIndex].fields[fieldsIndex].name === "string") {
						if (payload.embeds[embedsIndex].fields[fieldsIndex].name.length > 256) {
							if (truncateEnable === false) {
								throw new Error(`Input \`payload.embeds[${embedsIndex}].fields[${fieldsIndex}].name\` is too large!`);
							};
							payload.embeds[embedsIndex].fields[fieldsIndex].name = mmStringOverflow(payload.embeds[embedsIndex].fields[fieldsIndex].name, 256, stringOverflowOption);
						};
					};
					if (typeof payload.embeds[embedsIndex].fields[fieldsIndex].value === "string") {
						if (payload.embeds[embedsIndex].fields[fieldsIndex].value.length > 1024) {
							if (truncateEnable === false) {
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
	let files = mmStringParse($importInput("files"));
	/* Bug #mmsp1 Bypass - Start (See https://github.com/hugoalh-studio/more-method-nodejs/issues/96) */
	if (typeof files === "string" && files.search(/^\s*\[\s*\]\s*$/gu) === 0) {
		files = [];
	};
	/* Bug #mmsp1 Bypass - End */
	if (adIsArray(files, {
		checkElements: (element) => {
			return (adIsString(element) === true);
		}
	}) === false) {
		throw new TypeError(`Input \`files\` must be type of array (string (non-nullable))!`);
	};
	for (let file of files) {
		try {
			fileSystemAccessSync(pathJoin(ghactionWorkspaceDirectory, file), fileSystemConstants.R_OK);
		} catch {
			throw new Error(`File \`${file}\` does not assessible, exist, or readable!`);
		};
	};
	if (typeof payload.content === "undefined" && typeof payload.embeds === "undefined" && files.length === 0) {
		throw new Error(`At least one of the input \`payload.content\`, \`payload.embeds\`, or \`files\` must be provided!`);
	};
	if (files.length > 0) {
		if (method.length === 0) {
			method = "form";
		};
	} else {
		if (method.length === 0) {
			method = "json";
		};
	};
	if (method !== "form" && method !== "json") {
		throw new SyntaxError(`Input \`method\`'s value is not in the list!`);
	};
	if (method === "json" && files.length > 0) {
		throw new Error(`Invalid content type!`);
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
				let fileFullPath = pathJoin(ghactionWorkspaceDirectory, files[filesIndex]);
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
			"User-Agent": ghactionUserAgent,
			...requestBody.getHeaders()
		};
	} else {
		requestBody = payloadStringify;
		requestBodyInspect = payloadStringify;
		requestHeader = {
			"Content-Type": "application/json",
			"User-Agent": ghactionUserAgent
		};
	};
	if (dryRun === true) {
		ghactionInformation(`Payload Content: ${requestBodyInspect}`);
		let payloadFakeStringify = JSON.stringify({
			body: "bar",
			title: "foo",
			userId: 1
		});
		ghactionInformation(`Post network request to test service.`);
		let response = await nodeFetch(
			`https://jsonplaceholder.typicode.com/posts`,
			{
				body: payloadFakeStringify,
				follow: 5,
				headers: {
					"Content-Type": "application/json",
					"User-Agent": ghactionUserAgent
				},
				method: "POST",
				redirect: "follow"
			}
		);
		let responseText = await response.text();
		if (response.ok === true) {
			ghactionInformation(`Status Code: ${response.status}\nResponse: ${responseText}`);
		} else {
			throw new Error(`Status Code: ${response.status}\nResponse: ${responseText}`);
		};
	} else {
		ghactionDebug(`Payload Content: ${requestBodyInspect}`);
		ghactionInformation(`Post network request to Discord.`);
		let response = await nodeFetch(
			`https://discord.com/api/webhooks/${key}${(requestQuery.length > 0) ? `?${requestQuery}` : ""}`,
			{
				body: requestBody,
				follow: 5,
				headers: requestHeader,
				method: "POST",
				redirect: "follow"
			}
		);
		let responseText = await response.text();
		if (response.ok === true) {
			ghactionDebug(`Status Code: ${response.status}\nResponse: ${responseText}`);
		} else {
			throw new Error(`Status Code: ${response.status}\nResponse: ${responseText}`);
		};
	};
})().catch((reason) => {
	ghactionError(reason);
	process.exit(1);
});
