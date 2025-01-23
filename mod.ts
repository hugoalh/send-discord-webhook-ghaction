import {
	exFetch,
	type ExFetchEventRetryPayload
} from "EXFETCH/mod.ts";
import {
	addSecretMask,
	writeDebug,
	writeError
} from "GHACTIONS/log.ts";
import {
	getInput,
	getInputBoolean,
	getInputNumber,
	setOutput
} from "GHACTIONS/parameter.ts";
import type {
	JSONArray,
	JSONObject,
} from "ISJSON/mod.ts";
import { parse as yamlParse } from "STD/yaml/parse";
import { StringTruncator } from "STRINGOVERFLOW/mod.ts";
import {
	resolveContent,
	resolveEmbeds,
	resolveFiles,
	resolveKey,
	resolveMentions,
	resolvePoll,
	resolveThreadID,
	resolveThreadName,
	resolveThreadTags,
	resolveUsername
} from "./_payload.ts";
console.log("Initialize.");
const splitterNewLine = /\r?\n/g;
const splitterCommonDelimiter = /,|\r?\n/g;
const userAgent = `SendDiscordWebhook.GitHubAction/7.0.4`;
writeDebug(`Environment Variables:\n\t${Object.entries(Deno.env.toObject()).map(([key, value]: [string, string]): string => {
	return `${key} = ${value}`;
}).join("\n\t")}`);
console.log("Parse input.");
try {
	const truncateEnable: boolean = getInputBoolean("truncate_enable", { fallback: false }) ?? true;
	const stringTruncator: StringTruncator | undefined = truncateEnable ? new StringTruncator(128, {
		ellipsisMark: getInput("truncate_ellipsis", { fallback: false }),
		//@ts-ignore Validate by the module.
		ellipsisPosition: getInput("truncate_position", { fallback: false })
	}) : undefined;
	const key: string = resolveKey(getInput("key", { require: true }));
	addSecretMask(key);
	const username: string | undefined = resolveUsername(getInput("username"), stringTruncator);
	const avatarURL: string = getInput("avatar_url");
	const content: string | undefined = resolveContent(getInput("content"), getInput("content_links_no_embed").split(splitterNewLine).filter((value: string): boolean => {
		return (value.length > 0);
	}), stringTruncator);
	const embeds: JSONArray | undefined = resolveEmbeds(yamlParse(getInput("embeds")), stringTruncator);
	const poll: JSONObject | undefined = resolvePoll({
		allowMultiSelect: getInputBoolean("poll_allow_multiselect"),
		answers: yamlParse(getInput("poll_answers")),
		duration: getInputNumber("poll_duration", { fallback: false }) ?? -1,
		question: getInput("poll_question")
	});
	const files: FormData | undefined = await resolveFiles(getInput("files").split(splitterNewLine).map((file: string): string => {
		return file.trim();
	}).filter((file: string): boolean => {
		return (file.length > 0);
	}), getInputBoolean("files_glob", { fallback: false }) ?? true);
	const allowedMentions: JSONObject = resolveMentions({
		parseEveryone: getInputBoolean("allowed_mentions_parse_everyone", { fallback: false }) ?? true,
		parseRoles: getInputBoolean("allowed_mentions_parse_roles", { fallback: false }) ?? true,
		parseUsers: getInputBoolean("allowed_mentions_parse_users", { fallback: false }) ?? true,
		roles: getInput("allowed_mentions_roles").split(splitterCommonDelimiter).map((value: string): string => {
			return value.trim();
		}).filter((value: string): boolean => {
			return (value.length > 0);
		}),
		users: getInput("allowed_mentions_users").split(splitterCommonDelimiter).map((value: string): string => {
			return value.trim();
		}).filter((value: string): boolean => {
			return (value.length > 0);
		})
	});
	const tts: boolean = getInputBoolean("tts");
	const threadID: string | undefined = resolveThreadID(getInput("thread_id"));
	const threadName: string | undefined = resolveThreadName(getInput("thread_name"), stringTruncator);
	const threadTags: string[] | undefined = resolveThreadTags(getInput("thread_tags").split(splitterCommonDelimiter).map((value: string): string => {
		return value.trim();
	}).filter((value: string): boolean => {
		return (value.length > 0);
	}));
	const notification: boolean = getInputBoolean("notification", { fallback: false }) ?? true;
	const wait: boolean = getInputBoolean("wait", { fallback: false }) ?? true;
	if (
		(typeof content === "undefined" && typeof embeds === "undefined" && typeof files === "undefined" && typeof poll === "undefined") ||
		((
			typeof content !== "undefined" ||
			typeof embeds !== "undefined" ||
			typeof files !== "undefined"
		) && typeof poll !== "undefined")
	) {
		throw new Error(`Only one of the group of inputs must be defined: \`content\`, \`embeds\`, and/or \`files\`; \`poll\`!`);
	}
	if (typeof threadID !== "undefined" && typeof threadName !== "undefined") {
		throw new Error(`Only one of the group of inputs can be defined: \`thread_id\`; \`thread_name\` and \`thread_tags\` (Optional)!`);
	}
	const methodForm: boolean = getInputBoolean("method_form");
	const discordWebhookUrlParameters: URLSearchParams = new URLSearchParams();
	if (typeof threadID !== "undefined") {
		discordWebhookUrlParameters.set("thread_id", threadID);
	}
	if (wait) {
		discordWebhookUrlParameters.set("wait", "true");
	}
	const requestPayload: JSONObject = {
		tts,
		allowed_mentions: allowedMentions
	};
	if (typeof content !== "undefined") {
		requestPayload.content = content;
	}
	if (typeof username !== "undefined") {
		requestPayload.username = username;
	}
	if (avatarURL.length > 0) {
		requestPayload.avatar_url = avatarURL;
	}
	if (typeof embeds !== "undefined") {
		requestPayload.embeds = embeds;
	}
	if (!notification) {
		requestPayload.flags = 1 << 12;
	}
	if (typeof threadName !== "undefined") {
		requestPayload.thread_name = threadName;
	}
	if (typeof threadTags !== "undefined") {
		requestPayload.applied_tags = threadTags;
	}
	if (typeof poll !== "undefined") {
		requestPayload.poll = poll;
	}
	const requestPayloadStringify: string = JSON.stringify(requestPayload);
	const requestHeaders: Headers = new Headers();
	const requestBody: string | FormData = ((): string | FormData => {
		if (
			methodForm ||
			typeof files !== "undefined"
		) {
			// IMPORTANT: Do not set the request header `Content-Type`, `fetch` automatically set this when use `FormData`.
			const result: FormData = (typeof files === "undefined") ? new FormData() : files;
			result.append("payload_json", requestPayloadStringify);
			writeDebug(`Body:\n\t${Array.from(result.entries(), ([key, value]: [string, FormDataEntryValue]): string => {
				return `${key} = ${value}`;
			}).join("\n\t")}`);
			return result;
		}
		requestHeaders.set("Content-Type", "application/json");
		writeDebug(`Body: ${requestPayloadStringify}`);
		return requestPayloadStringify;
	})();
	console.log(`Post network request to Discord.`);
	const response: Response = await exFetch(`https://discord.com/api/webhooks/${key}${(discordWebhookUrlParameters.size > 0) ? `?${discordWebhookUrlParameters.toString()}` : ""}`, {
		body: requestBody,
		headers: requestHeaders,
		method: "POST",
		redirect: "follow"
	}, {
		retry: {
			onRetry({
				countCurrent,
				countMaximum,
				statusCode,
				statusText,
				timeWait
			}: ExFetchEventRetryPayload): void {
				console.log(`Last network request failed with status \`${statusCode} ${statusText}. Retry #${countCurrent}/${countMaximum} after ${timeWait / 1000} seconds\`.`);
			},
			timeWait: {
				maximum: 120000,
				minimum: 10000
			}
		},
		userAgent
	}).catch((reason: Error): never => {
		throw new Error(`Unexpected web request issue: ${reason?.message ?? reason}`);
	});
	const responseText: string = await response.text();
	setOutput({
		response: responseText,
		status_code: response.status,
		status_ok: response.ok,
		status_text: response.statusText
	});
	if (!response.ok) {
		throw new Error(`Unexpected response status \`${response.status} ${response.statusText}\`: ${responseText}`);
	}
	console.log(`Response Status: ${response.status} ${response.statusText}`);
	console.log(`Response Content: ${responseText}`);
} catch (error) {
	if (error instanceof AggregateError) {
		writeError(`${error.name}: ${error.message}\n\t${error.errors.join("\n\t")}`);
	} else if (error instanceof Error) {
		writeError(`${error.name}: ${error.message}`);
	} else {
		writeError(String(error));
	}
	Deno.exit(1);
}
