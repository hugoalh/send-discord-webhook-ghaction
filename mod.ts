import {
	exFetch,
	type ExFetchEventRetryPayload
} from "EXFETCH";
import {
	writeDebug,
	writeError
} from "GHACTIONS/log";
import {
	getInput,
	getInputBoolean,
	getInputNumber,
	setOutput
} from "GHACTIONS/parameter";
import type {
	JSONArray,
	JSONObject,
	JSONValue,
} from "ISJSON";
import { parse as yamlParse } from "STD/yaml/parse";
import type { StringTruncator } from "STRINGOVERFLOW";
import * as payload from "./_payload.ts";
console.log("Initialize.");
const splitterNewLine = /\r?\n/g;
const splitterCommonDelimiter = /,|\r?\n/g;
const userAgent = `SendDiscordWebhook.GitHubAction/7`;
console.log("Parse input.");
try {
	const stringTruncator: StringTruncator | undefined = payload.getStringTruncator();
	const key: string = payload.getKey();
	const username: string | undefined = payload.getUsername(stringTruncator);
	const avatarURL: string | undefined = payload.getAvatarURL();
	const content: string | undefined = payload.getContent(stringTruncator);
	const embeds: JSONArray | undefined = payload.getEmbeds(stringTruncator);
	const poll: JSONObject | undefined = payload.getPoll({
		allowMultiSelect: getInputBoolean("poll_allow_multiselect"),
		answers: yamlParse(getInput("poll_answers")),
		duration: getInputNumber("poll_duration") ?? -1,
		question: getInput("poll_question")
	});
	const files: FormData | undefined = await payload.getFiles(getInput("files").split(splitterNewLine).map((file: string): string => {
		return file.trim();
	}).filter((file: string): boolean => {
		return (file.length > 0);
	}), getInputBoolean("files_glob") ?? true);
	const allowedMentions: JSONObject = payload.getMentions({
		parseEveryone: getInputBoolean("allowed_mentions_parse_everyone") ?? true,
		parseRoles: getInputBoolean("allowed_mentions_parse_roles") ?? true,
		parseUsers: getInputBoolean("allowed_mentions_parse_users") ?? true,
		roles: (getInput("allowed_mentions_roles") ?? "").split(splitterCommonDelimiter).map((value: string): string => {
			return value.trim();
		}).filter((value: string): boolean => {
			return (value.length > 0);
		}),
		users: (getInput("allowed_mentions_users") ?? "").split(splitterCommonDelimiter).map((value: string): string => {
			return value.trim();
		}).filter((value: string): boolean => {
			return (value.length > 0);
		})
	});
	const tts: boolean = getInputBoolean("tts") ?? false;
	const threadID: string | undefined = payload.getThreadID();
	const threadName: string | undefined = payload.getThreadName(stringTruncator);
	const threadTags: string[] | undefined = payload.getThreadTags();
	const notification: boolean = getInputBoolean("notification") ?? true;
	const wait: boolean = getInputBoolean("wait") ?? true;
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
	const methodForm: boolean = getInputBoolean("method_form") ?? false;
	const discordWebhookUrlParameters: URLSearchParams = new URLSearchParams();
	if (typeof threadID !== "undefined") {
		discordWebhookUrlParameters.set("thread_id", threadID);
	}
	if (wait) {
		discordWebhookUrlParameters.set("wait", "true");
	}
	const requestPayload: Record<string, JSONValue | undefined> = {
		tts,
		allowed_mentions: allowedMentions,
		content,
		username,
		avatar_url: avatarURL,
		embeds,
		thread_name: threadName,
		applied_tags: threadTags,
		poll
	};
	if (!notification) {
		requestPayload.flags = 1 << 12;
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
				console.log(`Last network request failed with status \`${statusCode} ${statusText}\`. Retry #${countCurrent}/${countMaximum} after ${timeWait / 1000} seconds.`);
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
