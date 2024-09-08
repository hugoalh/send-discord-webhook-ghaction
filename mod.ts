import {
	ExFetch,
	userAgentDefault
} from "EXFETCH";
import {
	addSecretMask,
	writeDebug,
	writeError
} from "GHACTIONS/log";
import { setOutput } from "GHACTIONS/parameter";
import type {
	JSONArray,
	JSONObject,
} from "ISJSON";
import { parse as yamlParse } from "STD/yaml/parse";
import { StringTruncator } from "STRINGOVERFLOW";
import {
	getInput,
	getInputBoolean,
	getInputNumber
} from "./_parameter.ts";
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
const exfetch: ExFetch = new ExFetch({
	userAgent: `${userAgentDefault} SendDiscordWebhook.GitHubAction/7.0.0`
});
const splitterNewLine = /\r?\n/g;
const splitterCommonDelimiter = /,|\r?\n/g;
writeDebug(`Environment Variables:\n\t${Object.entries(Deno.env.toObject()).map(([key, value]: [string, string]): string => {
	return `${key} = ${value}`;
}).join("\n\t")}`);
console.log("Parse input.");
try {
	const truncateEnable: boolean = getInputBoolean("truncate_enable", { defaultValue: true });
	const stringTruncator: StringTruncator | undefined = truncateEnable ? new StringTruncator(128, {
		ellipsisMark: getInput("truncate_ellipsis", { defaultValue: "..." }),
		//@ts-ignore Validate by package.
		ellipsisPosition: getInput("truncate_position", { defaultValue: "end" })
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
		allowMultiSelect: getInputBoolean("poll_allow_multiselect", { defaultValue: false }),
		answers: yamlParse(getInput("poll_answers")),
		duration: getInputNumber("poll_duration", { defaultValue: -1 }),
		question: getInput("poll_question")
	});
	const files: FormData | undefined = await resolveFiles(getInput("files").split(splitterNewLine).map((file: string) => {
		return file.trim();
	}).filter((file: string): boolean => {
		return (file.length > 0);
	}), getInputBoolean("files_glob", { defaultValue: true }));
	const allowedMentions: JSONObject = resolveMentions({
		parseEveryone: getInputBoolean("allowed_mentions_parse_everyone", { defaultValue: true }),
		parseRoles: getInputBoolean("allowed_mentions_parse_roles", { defaultValue: true }),
		parseUsers: getInputBoolean("allowed_mentions_parse_users", { defaultValue: true }),
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
	const notification: boolean = getInputBoolean("notification", { defaultValue: true });
	const wait: boolean = getInputBoolean("wait", { defaultValue: true });
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
	const requestBody: BodyInit = ((): BodyInit => {
		if (
			methodForm ||
			typeof files !== "undefined"
		) {
			requestHeaders.set("Content-Type", "multipart/form-data");
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
	const response: Response = await exfetch.fetch(`https://discord.com/api/webhooks/${key}${(discordWebhookUrlParameters.size > 0) ? `?${discordWebhookUrlParameters.toString()}` : ""}`, {
		body: requestBody,
		headers: requestHeaders,
		method: "POST",
		redirect: "follow"
	}).catch((reason: Error): never => {
		throw new Error(`Unexpected web request issue: ${reason?.message ?? reason}`);
	});
	const responseText = await response.text();
	setOutput("response", responseText);
	setOutput("status_code", String(response.status));
	setOutput("status_ok", String(response.ok));
	setOutput("status_text", response.statusText);
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
