import Color from "COLOR";
import {
	walk,
	type FSWalkEntry
} from "FS/walk.ts";
import {
	isJSONArray,
	isJSONObject,
	type JSONArray,
	type JSONObject,
	type JSONValue,
} from "ISJSON/mod.ts";
import { getRunnerWorkspacePath } from "GHACTIONS/runner.ts";
import getRegExpURL from "REGEXPURL";
import { basename as pathBasename } from "STD/path/basename";
import { isAbsolute as pathIsAbsolute } from "STD/path/is-absolute";
import { globToRegExp } from "STD/path/glob-to-regexp";
import { join as pathJoin } from "STD/path/join";
import type { StringTruncator } from "STRINGOVERFLOW/mod.ts";
import { colorNamespaceList } from "./_color_namespace_list.ts";
const thresholdContent = 2000;
const thresholdEmbeds = 10;
const thresholdEmbedAuthorName = 256;
const thresholdEmbedDescription = 4096;
const thresholdEmbedFields = 25;
const thresholdEmbedFieldName = 256;
const thresholdEmbedFieldValue = 1024;
const thresholdEmbedFooterText = 2048;
const thresholdEmbedTitle = 256;
const thresholdFiles = 10;
const thresholdMentionsRole = 100;
const thresholdMentionsUser = 100;
const thresholdPollAnswer = 55;
const thresholdPollDuration = 768;
const thresholdPollQuestion = 300;
const thresholdThreadName = 100;
const thresholdThreadTags = 5;
const thresholdUsername = 80;
const regexpDiscordWebhookURL = /^(?:https:\/\/(?:canary\.)?discord(?:app)?\.com\/api\/webhooks\/)?(?<key>\d+\/(?:[\dA-Za-z][\dA-Za-z_-]*)?[\dA-Za-z])$/u;
const regexpISO8601 = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ$/;
const regexpSnowflake = /^\d+$/;
function generateRandomInteger(range: number, offset: number = 0): number {
	if (!(Number.isSafeInteger(range) && range >= 2)) {
		throw new TypeError(`Parameter \`range\` is not a number which is integer, safe, and >= 2!`);
	}
	if (!Number.isSafeInteger(offset)) {
		throw new TypeError(`Parameter \`offset\` is not a number which is integer and safe!`);
	}
	return (Math.floor(Math.random() * range) + offset);
}
//deno-lint-ignore default-param-last
export function resolveContent(content: string, contentLinksNoEmbed: string[] = [], truncator?: StringTruncator): string | undefined {
	const contentLinksNoEmbedRegExp: RegExp | undefined = (contentLinksNoEmbed.length > 0) ? new RegExp(contentLinksNoEmbed.join("|"), "u") : undefined;
	if (content.length === 0) {
		return undefined;
	}
	const contentFmt: string = (typeof contentLinksNoEmbedRegExp === "undefined") ? content : content.replace(getRegExpURL({
		apostrophes: false,
		auth: true,
		exact: false,
		ipv4: true,
		ipv6: true,
		localhost: false,
		parens: false,
		//@ts-ignore `re2` is exist but not public.
		re2: false,
		returnString: false,
		strict: false,
		trailingPeriod: false
	}), (value: string): string => {
		return ((URL.canParse(value) && /^https?:\/\//u.test(value) && contentLinksNoEmbedRegExp.test(value)) ? `<${value}>` : value);
	});
	if (typeof truncator !== "undefined" && contentFmt.length > thresholdContent) {
		return truncator.truncate(contentFmt, thresholdContent);
	}
	return contentFmt;
}
export function resolveEmbeds(embeds: unknown, truncator?: StringTruncator): JSONArray | undefined {
	if (embeds === null) {
		return undefined;
	}
	if (!isJSONArray(embeds)) {
		throw new TypeError(`Input \`embeds\` is not a valid Discord embeds!`);
	}
	const embedsFmt: JSONArray = embeds.map((embed: JSONValue, embedsIndex: number): JSONObject => {
		if (!isJSONObject(embed)) {
			throw new TypeError(`Input \`embeds[${embedsIndex}]\` is not a valid Discord embed!`);
		}
		for (const embedKey of Object.keys(embed)) {
			switch (embedKey) {
				case "title":
					if (typeof embed.title !== "string") {
						throw new TypeError(`Input \`embeds[${embedsIndex}].title\` is not a string!`);
					}
					if (embed.title.length === 0) {
						delete embed.title;
						break;
					}
					if (typeof truncator !== "undefined" && embed.title.length > thresholdEmbedTitle) {
						embed.title = truncator.truncate(embed.title, thresholdEmbedTitle);
					}
					break;
				case "description":
					if (typeof embed.description !== "string") {
						throw new TypeError(`Input \`embeds[${embedsIndex}].description\` is not a string!`);
					}
					if (embed.description.length === 0) {
						delete embed.description;
						break;
					}
					if (typeof truncator !== "undefined" && embed.description.length > thresholdEmbedDescription) {
						embed.description = truncator.truncate(embed.description, thresholdEmbedDescription);
					}
					break;
				case "url":
					if (typeof embed.url !== "string") {
						throw new TypeError(`Input \`embeds[${embedsIndex}].url\` is not a string!`);
					}
					if (embed.url.length === 0) {
						delete embed.url;
						break;
					}
					break;
				case "timestamp":
					if (typeof embed.timestamp !== "string") {
						throw new TypeError(`Input \`embeds[${embedsIndex}].timestamp\` is not a string!`);
					}
					if (embed.timestamp.length === 0) {
						delete embed.timestamp;
						break;
					}
					if (!(regexpISO8601.test(embed.timestamp) && new Date(embed.timestamp))) {
						throw new SyntaxError(`\`${embed.timestamp}\` (input \`embeds[${embedsIndex}].timestamp\`) is not a valid ISO 8601 timestamp!`);
					}
					break;
				case "color":
					if (typeof embed.color === "number") {
						if (!(Number.isSafeInteger(embed.color) && embed.color >= 0 && embed.color <= 16777215)) {
							throw new RangeError(`\`${embed.color}\` (input \`embeds[${embedsIndex}].color\`) is not a valid RGB integer!`);
						}
					} else if (typeof embed.color === "string") {
						if (embed.color.length === 0) {
							delete embed.color;
							break;
						}
						if (embed.color === "Random") {
							embed.color = (generateRandomInteger(256) * 65536) + (generateRandomInteger(256) * 256) + generateRandomInteger(256);
						} else if (colorNamespaceList.has(embed.color)) {
							embed.color = Color(colorNamespaceList.get(embed.color)!, "hex").rgbNumber();
						} else {
							try {
								embed.color = Color(embed.color).rgbNumber();
							} catch (error) {
								throw new SyntaxError(`\`${embed.color}\` (input \`embeds[${embedsIndex}].color\`) is not a valid CSS colour: ${error}`);
							}
						}
					} else {
						throw new TypeError(`Input \`embeds[${embedsIndex}].color\` is not a valid CSS colour or RGB integer!`);
					}
					break;
				case "footer":
					if (!isJSONObject(embed.footer)) {
						throw new TypeError(`Input \`embeds[${embedsIndex}].footer\` is not a valid Discord footer!`);
					}
					for (const embedFooterKey of Object.keys(embed.footer)) {
						switch (embedFooterKey) {
							case "text":
								if (typeof embed.footer.text !== "string") {
									throw new TypeError(`Input \`embeds[${embedsIndex}].footer.text\` is not a string!`);
								}
								if (embed.footer.text.length === 0) {
									delete embed.footer.text;
									break;
								}
								if (typeof truncator !== "undefined" && embed.footer.text.length > thresholdEmbedFooterText) {
									embed.footer.text = truncator.truncate(embed.footer.text, thresholdEmbedFooterText);
								}
								break;
							case "icon_url":
								if (typeof embed.footer.icon_url !== "string") {
									throw new TypeError(`Input \`embeds[${embedsIndex}].footer.icon_url\` is not a string!`);
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
					if (!isJSONObject(embed.image)) {
						throw new TypeError(`Input \`embeds[${embedsIndex}].image\` is not a valid Discord image!`);
					}
					for (const embedImageKey of Object.keys(embed.image)) {
						switch (embedImageKey) {
							case "url":
								if (typeof embed.image.url !== "string") {
									throw new TypeError(`Input \`embeds[${embedsIndex}].image.url\` is not a string!`);
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
					if (!isJSONObject(embed.thumbnail)) {
						throw new TypeError(`Input \`embeds[${embedsIndex}].thumbnail\` is not a valid Discord thumbnail!`);
					}
					for (const embedThumbnailKey of Object.keys(embed.thumbnail)) {
						switch (embedThumbnailKey) {
							case "url":
								if (typeof embed.thumbnail.url !== "string") {
									throw new TypeError(`Input \`embeds[${embedsIndex}].thumbnail.url\` is not a string!`);
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
					if (!isJSONObject(embed.author)) {
						throw new TypeError(`Input \`embeds[${embedsIndex}].author\` is not a valid Discord author!`);
					}
					for (const embedAuthorKey of Object.keys(embed.author)) {
						switch (embedAuthorKey) {
							case "name":
								if (typeof embed.author.name !== "string") {
									throw new TypeError(`Input \`embeds[${embedsIndex}].author.name\` is not a string!`);
								}
								if (embed.author.name.length === 0) {
									delete embed.author.name;
									break;
								}
								if (typeof truncator !== "undefined" && embed.author.name.length > thresholdEmbedAuthorName) {
									embed.author.name = truncator.truncate(embed.author.name, thresholdEmbedAuthorName);
								}
								break;
							case "url":
								if (typeof embed.author.url !== "string") {
									throw new TypeError(`Input \`embeds[${embedsIndex}].author.url\` is not a string!`);
								}
								if (embed.author.url.length === 0) {
									delete embed.author.url;
									break;
								}
								break;
							case "icon_url":
								if (typeof embed.author.icon_url !== "string") {
									throw new TypeError(`Input \`embeds[${embedsIndex}].author.icon_url\` is not a string!`);
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
					if (!isJSONArray(embed.fields)) {
						throw new TypeError(`Input \`embed[${embedsIndex}].fields\` is not a valid Discord embed fields!`);
					}
					if (embed.fields.length > 0) {
						embed.fields = embed.fields.map((field: JSONValue, fieldsIndex: number): JSONObject => {
							if (!isJSONObject(field)) {
								throw new TypeError(`Input \`embeds[${embedsIndex}].fields[${fieldsIndex}]\` is not a valid Discord embed field!`);
							}
							for (const embedFieldKey of Object.keys(field)) {
								switch (embedFieldKey) {
									case "name":
										if (typeof field.name !== "string") {
											throw new TypeError(`Input \`embeds[${embedsIndex}].fields[${fieldsIndex}].name\` is not a string!`);
										}
										if (typeof truncator !== "undefined" && field.name.length > thresholdEmbedFieldName) {
											field.name = truncator.truncate(field.name, thresholdEmbedFieldName);
										}
										break;
									case "value":
										if (typeof field.value !== "string") {
											throw new TypeError(`Input \`embeds[${embedsIndex}].fields[${fieldsIndex}].value\` is not a string!`);
										}
										if (typeof truncator !== "undefined" && field.value.length > thresholdEmbedFieldValue) {
											field.value = truncator.truncate(field.value, thresholdEmbedFieldValue);
										}
										break;
									case "inline":
										if (typeof field.inline !== "boolean") {
											throw new TypeError(`Input \`embeds[${embedsIndex}].fields[${fieldsIndex}].inline\` is not a boolean!`);
										}
										break;
									default:
										throw new SyntaxError(`Unknown input \`embeds[${embedsIndex}].fields[${fieldsIndex}].${embedFieldKey}\`!`);
								}
							}
							return field;
						}).filter((field: JSONObject): boolean => {
							return (
								(field.name as string).length > 0 ||
								(field.value as string).length > 0
							);
						});
					}
					if (embed.fields.length > thresholdEmbedFields) {
						throw new SyntaxError(`Input \`embeds[${embedsIndex}].fields\` must not have more than ${thresholdEmbedFields} fields (current ${embed.fields.length})!`);
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
	}).filter((embed: JSONObject): boolean => {
		return (Object.keys(embed).length > 0);
	});
	if (embedsFmt.length === 0) {
		return undefined;
	}
	if (embedsFmt.length > thresholdEmbeds) {
		throw new SyntaxError(`Input \`embeds\` must not have more than ${thresholdEmbeds} embeds (current ${embedsFmt.length})!`);
	}
	return embedsFmt;
}
async function resolveFilesFormData(workspace: string, filesPath: string[]): Promise<FormData> {
	if (filesPath.length > thresholdFiles) {
		throw new Error(`Input \`files\` must not have more than ${thresholdFiles} files (current ${filesPath.length})!`);
	}
	const formData: FormData = new FormData();
	for (let index: number = 0; index < filesPath.length; index += 1) {
		const filePath: string = filesPath[index];
		using file: Deno.FsFile = await Deno.open(pathJoin(workspace, filePath));
		formData.append(`files[${index}]`, await new Response(file.readable).blob(), pathBasename(filePath));
	}
	return formData;
}
export async function resolveFiles(files: string[], glob: boolean): Promise<FormData | undefined> {
	const workspace: string = getRunnerWorkspacePath();
	const workspaceStatL: Deno.FileInfo = await Deno.lstat(workspace);
	if (!workspaceStatL.isDirectory) {
		throw new Deno.errors.NotADirectory(`Workspace \`${workspace}\` is not a directory!`);
	}
	if (files.length === 0) {
		return undefined;
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
			return undefined;
		}
		return resolveFilesFormData(workspace, filesFmt);
	}
	const filesStatRejected: unknown[] = (await Promise.allSettled(files.map(async (file: string): Promise<void> => {
		if (pathIsAbsolute(file)) {
			throw new Error(`\`${file}\` is not a relative file path!`);
		}
		const fileStatL: Deno.FileInfo = await Deno.lstat(pathJoin(workspace, file));
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
export function resolveKey(key: string): string {
	if (!regexpDiscordWebhookURL.test(key)) {
		throw new TypeError(`Input \`key\` is not a valid Discord webhook key!`);
	}
	return key.match(regexpDiscordWebhookURL)?.groups?.key as string;
}
export interface ResolveMentionsParameters {
	parseEveryone: boolean;
	parseRoles: boolean;
	parseUsers: boolean;
	roles: string[];
	users: string[];
}
export function resolveMentions({
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
		if (!regexpSnowflake.test(role)) {
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
		if (!regexpSnowflake.test(user)) {
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
export function resolvePoll({
	allowMultiSelect,
	answers,
	duration,
	question
}: ResolvePollParameters): JSONObject | undefined {
	if (answers === null && question.length === 0) {
		return undefined;
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
export function resolveThreadID(threadID: string): string | undefined {
	if (threadID.length === 0) {
		return undefined;
	}
	if (!regexpSnowflake.test(threadID)) {
		throw new SyntaxError(`\`${threadID}\` is not a valid Discord thread ID!`);
	}
	return threadID;
}
export function resolveThreadName(threadName: string, truncator?: StringTruncator): string | undefined {
	if (threadName.length === 0) {
		return undefined;
	}
	if (typeof truncator !== "undefined" && threadName.length > thresholdThreadName) {
		return truncator.truncate(threadName, thresholdThreadName);
	}
	return threadName;
}
export function resolveThreadTags(threadTags: string[]): string[] | undefined {
	if (threadTags.length === 0) {
		return undefined;
	}
	for (const threadTag of threadTags) {
		if (!regexpSnowflake.test(threadTag)) {
			throw new SyntaxError(`\`${threadTag}\` is not a valid Discord thread tag snowflake!`);
		}
	}
	const threadTagsFmt: string[] = Array.from(new Set<string>(threadTags).values());
	if (threadTagsFmt.length > thresholdThreadTags) {
		throw new Error(`Input \`applied_tags\` must not have more than ${thresholdThreadTags} tags (current ${threadTagsFmt.length})!`);
	}
	return threadTagsFmt;
}
export function resolveUsername(username: string, truncator?: StringTruncator): string | undefined {
	if (username.length === 0) {
		return undefined;
	}
	if (username.toLowerCase() === "clyde") {
		throw new Error(`\`${username}\` is forbid to use as the Discord webhook username!`);
	}
	if (typeof truncator !== "undefined" && username.length > thresholdUsername) {
		return truncator.truncate(username, thresholdUsername);
	}
	return username;
}
