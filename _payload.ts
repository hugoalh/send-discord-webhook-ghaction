import Color from "COLOR";
import {
	walk,
	type FSWalkEntry
} from "FS/walk";
import { addSecretMask } from "GHACTIONS/log";
import {
	getInput,
	getInputBoolean
} from "GHACTIONS/parameter";
import { getRunnerWorkspacePath } from "GHACTIONS/runner";
import {
	isJSONArray,
	isJSONObject,
	type JSONArray,
	type JSONObject,
	type JSONValue,
} from "ISJSON";
import { globToRegExp } from "STD/path/glob-to-regexp";
import { parse as parseYAML } from "STD/yaml/parse";
import {
	StringDissector,
	type StringSegmentDescriptor
} from "STRINGDISSECT";
import {
	StringTruncator,
	type StringTruncateEllipsisPosition
} from "STRINGOVERFLOW";
import * as zod from "ZOD";
import {
	basename as getPathBasename,
	isAbsolute as isPathAbsolute,
	join as joinPath
} from "node:path";
import { colorNamespaceList } from "./_color_namespace_list.ts";
const regexpDiscordWebhookURL = /^(?:https:\/\/(?:canary\.)?discord(?:app)?\.com\/api\/webhooks\/)?(?<key>\d+\/(?:[\dA-Za-z][\dA-Za-z_-]*)?[\dA-Za-z])$/u;
const regexpDiscordSnowflake = /^\d+$/;
const splitterNewLine = /\r?\n/g;
const splitterCommonDelimiter = /,|\r?\n/g;
const thresholdFiles = 10;
const thresholdMentionsRole = 100;
const thresholdMentionsUser = 100;
const thresholdPollAnswer = 55;
const thresholdPollDuration = 768;
const thresholdPollQuestion = 300;
const urlPatternProtocolHTTP = new URLPattern({
	protocol: "http{s}?"
});
const zodDiscordProtocolAttachment = zod.stringFormat("discord-protocol-attachment", /^attachment:\/\/.+$/);
const zodURL = zod.url({
	normalize: true
});
const zodURLHTTP = zod.url({
	normalize: true,
	protocol: /^https?:$/
});
const zodDiscordEmbedImageURL = zod.union([
	zodDiscordProtocolAttachment,
	zodURLHTTP
]);
const zodDiscordPollAnswers = zod.array(zod.object({
	emoji: zod.optional(zod.union([
		zod.object({
			name: zod.string().trim().min(1)
		}),
		zod.object({
			id: zod.string().trim().min(1)
		})
	])),
	text: zod.string().trim().max(55)
})).max(10);
const zodDiscordThreadTags = zod.array(zod.stringFormat("discord-snowflake", regexpDiscordSnowflake)).max(5).transform((input) => {
	return Array.from(new Set(input).values());
});
function randomInteger(range: number, offset: number = 0): number {
	if (!(Number.isSafeInteger(range) && range >= 2)) {
		throw new TypeError(`Parameter \`range\` is not a number which is integer, safe, and >= 2!`);
	}
	if (!Number.isSafeInteger(offset)) {
		throw new TypeError(`Parameter \`offset\` is not a number which is integer and safe!`);
	}
	return (Math.floor(Math.random() * range) + offset);
}




export function getAvatarURL(input: string = getInput("avatar_url") ?? ""): string | undefined {
	if (input.length === 0) {
		return;
	}
	return zodURLHTTP.parse(input);
}
export function getContent(truncator: StringTruncator | undefined, inputContent: string = getInput("content") ?? "", inputContentLinksNoEmbed: string = getInput("content_links_no_embed") ?? ""): string | undefined {
	const contentLinksNoEmbed: string[] = inputContentLinksNoEmbed.split(splitterNewLine).filter((value: string): boolean => {
		return (value.length > 0);
	});
	if (inputContent.length > 0 && contentLinksNoEmbed.length > 0) {
		const contentLinksNoEmbedRegExp: RegExp = new RegExp(contentLinksNoEmbed.join("|"), "u");
		inputContent = Array.from(new StringDissector().dissect(inputContent), ({
			type,
			value
		}: StringSegmentDescriptor): string => {
			return (type === "url" && URL.canParse(value) && urlPatternProtocolHTTP.test(value) && contentLinksNoEmbedRegExp.test(value)) ? `<${value}>` : value;
		}).join("");
	}
	return (truncator?.truncate(inputContent, 2000) ?? inputContent);
}
export function getEmbeds(truncator: StringTruncator | undefined, inputEmbeds: string = getInput("embeds") ?? ""): JSONArray | undefined {
	const embeds = parseYAML(inputEmbeds);
	if (embeds === null) {
		return;
	}
	const zodDiscordEmbeds = zod.array(zod.object({
		title: zod.optional(zod.string().trim().transform((input: string): string | undefined => {
			if (input.length === 0) {
				return;
			}
			return (truncator?.truncate(input, 256) ?? input);
		})),
		description: zod.optional(zod.string().trim().transform((input: string): string | undefined => {
			if (input.length === 0) {
				return;
			}
			return (truncator?.truncate(input, 4096) ?? input);
		})),
		url: zod.optional(zodURL),
		timestamp: zod.optional(zod.iso.datetime({ offset: true })),
		color: zod.optional(zod.union([
			zod.int().lte(16777215).gte(0),
			zod.string().trim().transform((input: string, ctx): number => {
				if (input === "Random") {
					return ((randomInteger(256) * 65536) + (randomInteger(256) * 256) + randomInteger(256));
				}
				if (colorNamespaceList.has(input)) {
					return Color(colorNamespaceList.get(input)!, "hex").rgbNumber();
				}
				try {
					return Color(input).rgbNumber();
				} catch (error) {
					ctx.addIssue({
						code: "custom",
						message: (error as Error).message
					});
				}
				return zod.NEVER;
			})
		])).default(2105893),
		footer: zod.optional(zod.object({
			text: zod.optional(zod.string().trim().transform((input: string): string | undefined => {
				if (input.length === 0) {
					return;
				}
				return (truncator?.truncate(input, 2048) ?? input);
			})),
			icon_url: zod.optional(zodDiscordEmbedImageURL)
		}).transform((input) => {
			const values = Object.values(input);
			return ((
				values.length === 0 ||
				values.every((value) => {
					return (typeof value === "undefined");
				})
			) ? undefined : input);
		})),
		image: zod.optional(zod.object({
			url: zod.optional(zodDiscordEmbedImageURL)
		}).transform((input) => {
			const values = Object.values(input);
			return ((
				values.length === 0 ||
				values.every((value) => {
					return (typeof value === "undefined");
				})
			) ? undefined : input);
		})),
		thumbnail: zod.optional(zod.object({
			url: zod.optional(zodDiscordEmbedImageURL)
		}).transform((input) => {
			const values = Object.values(input);
			return ((
				values.length === 0 ||
				values.every((value) => {
					return (typeof value === "undefined");
				})
			) ? undefined : input);
		})),
		author: zod.optional(zod.object({
			name: zod.optional(zod.string().trim().transform((input: string): string | undefined => {
				if (input.length === 0) {
					return;
				}
				return (truncator?.truncate(input, 256) ?? input);
			})),
			url: zod.optional(zodURL),
			icon_url: zod.optional(zodDiscordEmbedImageURL)
		}).transform((input) => {
			const values = Object.values(input);
			return ((
				values.length === 0 ||
				values.every((value) => {
					return (typeof value === "undefined");
				})
			) ? undefined : input);
		})),
		fields: zod.optional(zod.array(zod.object({
			name: zod.optional(zod.string().trim().transform((input: string): string | undefined => {
				if (input.length === 0) {
					return;
				}
				return (truncator?.truncate(input, 256) ?? input);
			})),
			value: zod.optional(zod.string().trim().transform((input: string): string | undefined => {
				if (input.length === 0) {
					return;
				}
				return (truncator?.truncate(input, 1024) ?? input);
			})),
			inline: zod.optional(zod.boolean()).default(false)
		}).transform((input) => {
			const name: string = input.name ?? "";
			const value: string = input.value ?? "";
			if (name.length === 0 && value.length === 0) {
				return;
			}
			return {
				name: (name.length === 0) ? "\u200B" : name,
				value: (value.length === 0) ? "\u200B" : value,
				inline: input.inline
			};
		})).max(25).transform((input) => {
			const result = input.filter((element) => {
				return (typeof element !== "undefined");
			});
			return ((result.length === 0) ? undefined : result);
		}))
	}).transform((input) => {
		const {
			color: _color,
			...inputRest
		} = input;
		const values = Object.values(inputRest);
		return ((
			values.length === 0 ||
			values.every((value) => {
				return (typeof value === "undefined");
			})
		) ? undefined : input);
	})).max(10).transform((input) => {
		const result = input.filter((element) => {
			return (typeof element !== "undefined");
		});
		return ((result.length === 0) ? undefined : result);
	});
	return zodDiscordEmbeds.parse(embeds) as JSONArray | undefined;
}
export function getKey(input: string = getInput("key", { require: true })): string {
	const key: string | undefined = input.match(regexpDiscordWebhookURL)?.groups?.key;
	if (typeof key === "undefined") {
		throw new TypeError(`Input \`key\` is not a valid Discord webhook key!`);
	}
	for (const secret of key.split("/")) {
		addSecretMask(secret);
	}
	return key;
}
export function getStringTruncator(): StringTruncator | undefined {
	if (getInputBoolean("truncate_enable") ?? true) {
		return new StringTruncator(128, {
			ellipsisMark: getInput("truncate_ellipsis"),
			ellipsisPosition: getInput("truncate_position") as StringTruncateEllipsisPosition | undefined
		});
	}
}
export function getThreadID(input: string = getInput("thread_id") ?? ""): string | undefined {
	if (input.length === 0) {
		return;
	}
	if (!regexpDiscordSnowflake.test(input)) {
		throw new SyntaxError(`\`${input}\` is not a valid Discord thread ID!`);
	}
	return input;
}
export function getThreadName(truncator: StringTruncator | undefined, input: string = getInput("thread_name") ?? ""): string | undefined {
	if (input.length === 0) {
		return;
	}
	return (truncator?.truncate(input, 100) ?? input);
}
export function getThreadTags(input: string = getInput("thread_tags") ?? ""): string[] | undefined {
	const threadTags: string[] = input.split(splitterCommonDelimiter).map((value: string): string => {
		return value.trim();
	}).filter((value: string): boolean => {
		return (value.length > 0);
	});
	if (threadTags.length === 0) {
		return;
	}
	return zodDiscordThreadTags.parse(threadTags);
}
export function getUsername(truncator: StringTruncator | undefined, input: string = getInput("username") ?? ""): string | undefined {
	if (input.length === 0) {
		return;
	}
	if (input.toLowerCase() === "clyde") {
		throw new Error(`\`${input}\` is forbidden to use as the Discord webhook username!`);
	}
	return (truncator?.truncate(input, 80) ?? input);
}




















async function resolveFilesFormData(workspace: string, filesPath: string[]): Promise<FormData> {
	if (filesPath.length > thresholdFiles) {
		throw new Error(`Input \`files\` must not have more than ${thresholdFiles} files (current ${filesPath.length})!`);
	}
	const formData: FormData = new FormData();
	for (let index: number = 0; index < filesPath.length; index += 1) {
		const filePath: string = filesPath[index];
		using file: Deno.FsFile = await Deno.open(joinPath(workspace, filePath));
		formData.append(`files[${index}]`, await new Response(file.readable).blob(), getPathBasename(filePath));
	}
	return formData;
}
export async function getFiles(files: string[], glob: boolean): Promise<FormData | undefined> {
	const workspace: string = getRunnerWorkspacePath();
	const workspaceStatL: Deno.FileInfo = await Deno.lstat(workspace);
	if (!workspaceStatL.isDirectory) {
		throw new Deno.errors.NotADirectory(`Workspace \`${workspace}\` is not a directory!`);
	}
	if (files.length === 0) {
		return;
	}
	if (glob) {
		const filesFmt: string[] = await Array.fromAsync(await walk(workspace, {
			includeDirectories: false,
			includeSymlinkDirectories: false,
			includeSymlinkFiles: false,
			matches: files.map((file: string): RegExp => {
				return globToRegExp(file, { caseInsensitive: true });
			})
		}), ({ pathRelative }: FSWalkEntry): string => {
			return pathRelative;
		});
		if (filesFmt.length === 0) {
			return;
		}
		return resolveFilesFormData(workspace, filesFmt);
	}
	const filesStatRejected: unknown[] = (await Promise.allSettled(files.map(async (file: string): Promise<void> => {
		if (isPathAbsolute(file)) {
			throw new Error(`\`${file}\` is not a relative file path!`);
		}
		const fileStatL: Deno.FileInfo = await Deno.lstat(joinPath(workspace, file));
		if (!fileStatL.isFile) {
			throw new Error(`\`${file}\` is not a file!`);
		}
	}))).map((fileStat: PromiseSettledResult<void>): unknown => {
		return ((fileStat.status === "rejected") ? fileStat.reason : undefined);
	}).filter((reason: unknown): boolean => {
		return (typeof reason !== "undefined");
	});
	if (filesStatRejected.length > 0) {
		throw new AggregateError(filesStatRejected, `Unable to process files!`);
	}
	return resolveFilesFormData(workspace, files);
}
export interface ResolveMentionsParameters {
	parseEveryone: boolean;
	parseRoles: boolean;
	parseUsers: boolean;
	roles: string[];
	users: string[];
}
export function getMentions({
	parseEveryone,
	parseRoles,
	parseUsers,
	roles,
	users
}: ResolveMentionsParameters): JSONObject {
	const parse: string[] = [];
	if (parseEveryone) {
		parse.push("everyone");
	}
	if (parseRoles) {
		parse.push("roles");
	}
	if (parseUsers) {
		parse.push("users");
	}
	for (const role of roles) {
		if (!regexpDiscordSnowflake.test(role)) {
			throw new SyntaxError(`\`${role}\` is not a valid Discord role snowflake!`);
		}
	}
	const rolesFmt: string[] = Array.from(new Set<string>(roles).values());
	if (rolesFmt.length > 0 && parseRoles) {
		throw new Error(`Inputs \`allowed_mentions.parse.roles\` and \`allowed_mentions.roles\` are mutually exclusive!`);
	}
	if (rolesFmt.length > thresholdMentionsRole) {
		throw new Error(`Input \`allowed_mentions.roles\` must not have more than ${thresholdMentionsRole} mentions (current ${rolesFmt.length})!`);
	}
	for (const user of users) {
		if (!regexpDiscordSnowflake.test(user)) {
			throw new SyntaxError(`\`${user}\` is not a valid Discord user snowflake!`);
		}
	}
	const usersFmt: string[] = Array.from(new Set<string>(users).values());
	if (usersFmt.length > 0 && parseUsers) {
		throw new Error(`Inputs \`allowed_mentions.parse.users\` and \`allowed_mentions.users\` are mutually exclusive!`);
	}
	if (usersFmt.length > thresholdMentionsUser) {
		throw new Error(`Input \`allowed_mentions.users\` must not have more than ${thresholdMentionsUser} mentions (current ${usersFmt.length})!`);
	}
	const result: JSONObject = {
		parse
	};
	if (rolesFmt.length > 0) {
		result.roles = rolesFmt;
	}
	if (usersFmt.length > 0) {
		result.users = usersFmt;
	}
	return result;
}
export interface ResolvePollParameters {
	allowMultiSelect: boolean;
	answers: unknown;
	duration: number;
	question: string;
}
export function getPoll({
	allowMultiSelect,
	answers,
	duration,
	question
}: ResolvePollParameters): JSONObject | undefined {
	if (answers === null && question.length === 0) {
		return;
	}
	if (
		!isJSONArray(answers) ||
		answers.length === 0
	) {
		throw new TypeError(`Input \`poll.answers\` is not a valid Discord poll answers!`);
	}
	const answersFmt: JSONObject[] = answers.map((answer: JSONValue, answerIndex: number): JSONObject => {
		if (!isJSONObject(answer)) {
			throw new TypeError(`Input \`poll.answers[${answerIndex}]\` is not a valid Discord poll answer!`);
		}
		for (const pollAnswerKey of Object.keys(answer)) {
			switch (pollAnswerKey) {
				case "emoji":
					if (!isJSONObject(answer.emoji)) {
						throw new TypeError(`Input \`poll.answers[${answerIndex}].emoji\` is not a valid Discord poll answer emoji!`);
					}
					for (const pollAnswerEmojiKey of Object.keys(answer.emoji)) {
						switch (pollAnswerEmojiKey) {
							case "id":
								if (typeof answer.emoji.id !== "string") {
									throw new TypeError(`Input \`poll.answers[${answerIndex}].emoji.id\` is not a string!`);
								}
								if (answer.emoji.id.length === 0) {
									delete answer.emoji.id;
									break;
								}
								break;
							case "name":
								if (typeof answer.emoji.name !== "string") {
									throw new TypeError(`Input \`poll.answers[${answerIndex}].emoji.name\` is not a string!`);
								}
								if (answer.emoji.name.length === 0) {
									delete answer.emoji.name;
									break;
								}
								break;
							default:
								throw new SyntaxError(`Unknown input \`poll.answers[${answerIndex}].emoji.${pollAnswerEmojiKey}\`!`);
						}
					}
					if (typeof answer.emoji.id === "string" && typeof answer.emoji.name === "string") {
						throw new TypeError(`Input \`poll.answers[${answerIndex}].emoji\` is not a valid Discord poll answer emoji!`);
					}
					if (Object.keys(answer.emoji).length === 0) {
						delete answer.emoji;
						break;
					}
					break;
				case "text":
					if (
						typeof answer.text !== "string" ||
						answer.text.length === 0
					) {
						throw new TypeError(`Input \`poll.answers[${answerIndex}].text\` is not a string (non-empty)!`);
					}
					if (answer.text.length > thresholdPollAnswer) {
						throw new SyntaxError(`Input \`poll.answers[${answerIndex}].text\` must not longer than ${thresholdPollAnswer} characters (current ${answer.text.length})!`);
					}
					break;
				default:
					throw new SyntaxError(`Unknown input \`poll.answers[${answerIndex}].${pollAnswerKey}\`!`);
			}
		}
		return { poll_media: answer };
	});
	if (question.length === 0) {
		throw new TypeError(`Input \`poll.question.text\` is not a string (non-empty)!`);
	}
	if (question.length > thresholdPollQuestion) {
		throw new SyntaxError(`Input \`poll.question.text\` must not longer than ${thresholdPollQuestion} characters (current ${question.length})!`);
	}
	if (duration !== -1 && !(Number.isSafeInteger(duration) && duration >= 1 && duration <= thresholdPollDuration)) {
		throw new TypeError(`Input \`poll.duration\` is not a number which is integer and between 1 and ${thresholdPollDuration}!`);
	}
	const result: JSONObject = {
		question: { text: question },
		answers: answersFmt,
		allow_multiselect: allowMultiSelect
	};
	if (duration !== -1) {
		result.duration = duration;
	}
	return result;
}

