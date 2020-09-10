/*==================
[GitHub Action] Send To Discord
	Language:
		NodeJS 14
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine");
const githubAction = {
	core: require("@actions/core"),
	github: require("@actions/github")
};
const https = require("https");
const internalService = require("./internalservice.js");
const jsonFlatten = require("flat").flatten;
let inputCannotVariable = {
	messageEmbedColour: githubAction.core.getInput("message_embed_colour"),
	messageUseTextToSpeech: githubAction.core.getInput("message_usetexttospeech"),
	variableJoin: githubAction.core.getInput("variable_join"),
	variablePrefix: githubAction.core.getInput("variable_prefix"),
	variableSuffix: githubAction.core.getInput("variable_suffix"),
	webhookID: githubAction.core.getInput("webhook_id"),
	webhookToken: githubAction.core.getInput("webhook_token")
};
let inputCanVariable = {
	messageEmbedAuthorAvatarUrl: githubAction.core.getInput("message_embed_authoravatarurl"),
	messageEmbedAuthorName: githubAction.core.getInput("message_embed_authorname"),
	messageEmbedAuthorUrl: githubAction.core.getInput("message_embed_authorurl"),
	messageEmbedDescription: githubAction.core.getInput("message_embed_description"),
	messageEmbedFooterIconUrl: githubAction.core.getInput("message_embed_footericonurl"),
	messageEmbedFooterText: githubAction.core.getInput("message_embed_footertext"),
	messageEmbedImageUrl: githubAction.core.getInput("message_embed_imageurl"),
	messageEmbedThumbnailUrl: githubAction.core.getInput("message_embed_thumbnailurl"),
	messageEmbedTitle: githubAction.core.getInput("message_embed_title"),
	messageEmbedTitleUrl: githubAction.core.getInput("message_embed_titleurl"),
	messageEmbedVideoUrl: githubAction.core.getInput("message_embed_videourl"),
	messageText: githubAction.core.getInput("message_text"),
	webhookAvatarUrl: githubAction.core.getInput("webhook_avatarurl"),
	webhookName: githubAction.core.getInput("webhook_name")
};
if (advancedDetermine.isString(inputCannotVariable.variableJoin) != true) {
	internalService.prefabTypeError("variable_join", "string");
};
if (advancedDetermine.isString(inputCannotVariable.variablePrefix) != true) {
	internalService.prefabTypeError("variable_prefix", "string");
};
if (advancedDetermine.isString(inputCannotVariable.variableSuffix) != true) {
	internalService.prefabTypeError("variable_suffix", "string");
};
if (advancedDetermine.isString(inputCannotVariable.webhookID) != true) {
	internalService.prefabTypeError("webhook_id", "string");
};
if (advancedDetermine.isString(inputCanVariable.webhookToken) != true) {
	internalService.prefabTypeError("webhook_token", "string");
};
let inputMessageEmbedFields = [];
for (let index = 0; index < 25; index++) {
	let key = githubAction.core.getInput(`message_embed_field_${index}_key`),
		value = githubAction.core.getInput(`message_embed_field_${index}_value`),
		isInline = githubAction.core.getInput(`message_embed_field_${index}_isinline`);
	if (advancedDetermine.isString(key) != true && advancedDetermine.isString(value) != true) {
		githubAction.core.info(`Message embed field #${index} is null, ignore remains.`);
		break;
	};
	if (advancedDetermine.isBoolean(isInline, { allowStringify: true }) != true) {
		internalService.prefabTypeError(`message_embed_field_${index}_isinline`, "boolean");
	};
	isInline = (isInline === "true");
	inputMessageEmbedFields.push(
		{
			name: key,
			value: value,
			inline: isInline
		}
	);
};
let inputVariableListPayload = githubAction.github.context.payload;
let inputVariableListExternal = githubAction.core.getInput(`variable_list_external`);
switch (advancedDetermine.isString(inputVariableListExternal)) {
	case false:
		internalService.prefabTypeError("variable_list_external", "object.json");
		break;
	case null:
		githubAction.core.info(`External variable list is null.`);
		inputVariableListExternal = {};
		break;
	case true:
		if (advancedDetermine.isStringifyJSON(inputVariableListExternal) == false) {
			internalService.prefabTypeError("variable_list_external", "object.json");
		};
		try {
			inputVariableListExternal = JSON.parse(inputVariableListExternal);
		} catch (error) {
			throw new Error(error);
		};
		break;
	// No default case!
};
try {
	inputVariableListPayload = jsonFlatten(
		inputVariableListPayload,
		{
			delimiter: inputCannotVariable.variableJoin
		}
	);
} catch (error) {
	throw new Error(error);
};
try {
	inputVariableListExternal = jsonFlatten(
		inputVariableListExternal,
		{
			delimiter: inputCannotVariable.variableJoin
		}
	);
} catch (error) {
	throw new Error(error);
};
Object.keys(inputVariableListPayload).forEach((key) => {
	Object.keys(inputCanVariable).forEach((element) => {
		inputCanVariable[element] = inputCanVariable[element].replace(
			new RegExp(`${inputCannotVariable.variablePrefix}payload${inputCannotVariable.variableJoin}${key}${inputCannotVariable.variableSuffix}`, "gu"),
			inputVariableListPayload[key]
		);
	});
	inputMessageEmbedFields.forEach((field, index) => {
		inputMessageEmbedFields[index].name = inputMessageEmbedFields[index].name.replace(
			new RegExp(`${inputCannotVariable.variablePrefix}payload${inputCannotVariable.variableJoin}${key}${inputCannotVariable.variableSuffix}`, "gu"),
			inputVariableListPayload[key]
		);
		inputMessageEmbedFields[index].value = inputMessageEmbedFields[index].value.replace(
			new RegExp(`${inputCannotVariable.variablePrefix}payload${inputCannotVariable.variableJoin}${key}${inputCannotVariable.variableSuffix}`, "gu"),
			inputVariableListPayload[key]
		);
	});
});
Object.keys(inputVariableListExternal).forEach((key) => {
	Object.keys(inputCanVariable).forEach((element) => {
		inputCanVariable[element] = inputCanVariable[element].replace(
			new RegExp(`${inputCannotVariable.variablePrefix}external${inputCannotVariable.variableJoin}${key}${inputCannotVariable.variableSuffix}`, "gu"),
			inputVariableListExternal[key]
		);
	});
	inputMessageEmbedFields.forEach((field, index) => {
		inputMessageEmbedFields[index].name = inputMessageEmbedFields[index].name.replace(
			new RegExp(`${inputCannotVariable.variablePrefix}external${inputCannotVariable.variableJoin}${key}${inputCannotVariable.variableSuffix}`, "gu"),
			inputVariableListExternal[key]
		);
		inputMessageEmbedFields[index].value = inputMessageEmbedFields[index].value.replace(
			new RegExp(`${inputCannotVariable.variablePrefix}external${inputCannotVariable.variableJoin}${key}${inputCannotVariable.variableSuffix}`, "gu"),
			inputVariableListExternal[key]
		);
	});
});
let output = {
	allowed_mentions: {
		parse: [
			"roles",
			"users",
			"everyone"
		]
	}
};
if (advancedDetermine.isBoolean(inputCannotVariable.messageUseTextToSpeech, { allowStringify: true }) != true) {
	internalService.prefabTypeError(`message_usetexttospeech`, "boolean");
};
output.tts = (inputCannotVariable.messageUseTextToSpeech === "true");
if (advancedDetermine.isString(inputCanVariable.webhookName) == true && inputCanVariable.webhookName.length >= 2 && inputCanVariable.webhookName.length <= 32) {
	output.username = inputCanVariable.webhookName;
};
if (advancedDetermine.isString(inputCanVariable.webhookAvatarUrl) == true) {
	output.avatar_url = inputCanVariable.webhookAvatarUrl;
};
if (advancedDetermine.isString(inputCanVariable.messageText) == true) {
	if (inputCanVariable.messageText.length > 2000) {
		inputCanVariable.messageText = `${inputCanVariable.messageText.slice(0, 1996)}...`;
	};
	output.content = inputCanVariable.messageText;
};
if (advancedDetermine.isString(inputCanVariable.messageEmbedAuthorName) == true ||
	advancedDetermine.isString(inputCanVariable.messageEmbedTitle) == true ||
	advancedDetermine.isString(inputCanVariable.messageEmbedDescription) == true ||
	advancedDetermine.isString(inputCanVariable.messageEmbedThumbnailUrl) == true ||
	advancedDetermine.isString(inputCanVariable.messageEmbedImageUrl) == true ||
	advancedDetermine.isString(inputCanVariable.messageEmbedVideoUrl) == true ||
	advancedDetermine.isString(inputMessageEmbedFields) == true ||
	advancedDetermine.isString(inputCanVariable.messageEmbedFooterText) == true
) {
	output.embeds = [];
	if (advancedDetermine.isString(inputCannotVariable.messageEmbedColour) != true) {
		internalService.prefabTypeError("message_embed_colour", "string");
	};
	inputCannotVariable.messageEmbedColour = inputCannotVariable.messageEmbedColour.toUpperCase();
	let colourRGB = [];
	switch (inputCannotVariable.messageEmbedColour) {
		case "RANDOM":
			colourRGB = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
			break;
		case "DISCORDBLURPLE":
			colourRGB = [114, 137, 218];
			break;
		case "WHITE":
			colourRGB = [255, 255, 255];
			break;
		case "BLACK":
			colourRGB = [0, 0, 0];
			break;
		case "DISCORDGREYPLE":
			colourRGB = [153, 170, 181];
			break;
		case "DISCORDDARK":
			colourRGB = [44, 47, 51];
			break;
		case "DISCORDBLACK":
			colourRGB = [35, 39, 42];
			break;
		default:
			if (inputCannotVariable.messageEmbedColour.search(/^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/u) != -1) {
				internalService.prefabReferenceError(`message_embed_colour`, "Unexpected colour scheme.");
			};
			inputCannotVariable.messageEmbedColour = inputCannotVariable.messageEmbedColour.split(",");
			colourRGB = [
				Number(inputCannotVariable.messageEmbedColour[0]),
				Number(inputCannotVariable.messageEmbedColour[1]),
				Number(inputCannotVariable.messageEmbedColour[2])
			];
			colourRGB.forEach((element) => {
				if (
					advancedDetermine.isNumberPositiveInteger(element) != true ||
					element > 255
				) {
					internalService.prefabReferenceError(`message_embed_colour`, "R/G/B value must between 0 and 255.");
				};
			});
			break;
	};
	output.embeds[0].color = colourRGB[0] * 65536 + colourRGB[1] * 256 + colourRGB[2];
	if (advancedDetermine.isString(inputCanVariable.messageEmbedAuthorName) == true) {
		if (inputCanVariable.messageEmbedAuthorName.length > 256) {
			inputCanVariable.messageEmbedAuthorName = `${inputCanVariable.messageEmbedAuthorName.slice(0, 252)}...`;
		};
		output.embeds[0].author = {
			name: inputCanVariable.messageEmbedAuthorName
		};
		if (advancedDetermine.isString(inputCanVariable.messageEmbedAuthorAvatarUrl) == true) {
			output.embeds[0].author.icon_url = inputCanVariable.messageEmbedAuthorAvatarUrl;
		};
		if (advancedDetermine.isString(inputCanVariable.messageEmbedAuthorUrl) == true) {
			output.embeds[0].author.url = inputCanVariable.messageEmbedAuthorUrl;
		};
	};
	if (advancedDetermine.isString(inputCanVariable.messageEmbedTitle) == true) {
		if (inputCanVariable.messageEmbedTitle.length > 256) {
			inputCanVariable.messageEmbedTitle = `${inputCanVariable.messageEmbedTitle.slice(0, 252)}...`;
		};
		output.embeds[0].title = inputCanVariable.messageEmbedTitle;
		if (advancedDetermine.isString(inputCanVariable.messageEmbedTitleUrl) == true) {
			output.embeds[0].url = inputCanVariable.messageEmbedTitleUrl;
		};
	};
	if (advancedDetermine.isString(inputCanVariable.messageEmbedDescription) == true) {
		if (inputCanVariable.messageEmbedDescription.length > 2048) {
			inputCanVariable.messageEmbedDescription = `${inputCanVariable.messageEmbedDescription.slice(0, 2044)}...`;
		};
		output.embeds[0].description = inputCanVariable.messageEmbedDescription;
	};
	if (advancedDetermine.isString(inputCanVariable.messageEmbedFooterText) == true) {
		if (inputCanVariable.messageEmbedFooterText.length > 2048) {
			inputCanVariable.messageEmbedFooterText = `${inputCanVariable.messageEmbedFooterText.slice(0, 2044)}...`;
		};
		output.embeds[0].footer = {
			text: inputCanVariable.messageEmbedFooterText
		};
		if (advancedDetermine.isString(inputCanVariable.messageEmbedFooterIconUrl) == true) {
			output.embeds[0].footer.icon_url = inputCanVariable.messageEmbedFooterIconUrl;
		};
	};
	if (advancedDetermine.isString(inputCanVariable.messageEmbedImageUrl) == true) {
		output.embeds[0].image = {
			url: inputCanVariable.messageEmbedImageUrl
		};
	};
	if (advancedDetermine.isString(inputCanVariable.messageEmbedThumbnailUrl) == true) {
		output.embeds[0].thumbnail = {
			url: inputCanVariable.messageEmbedThumbnailUrl
		};
	};
	if (advancedDetermine.isString(inputCanVariable.messageEmbedVideoUrl) == true) {
		output.embeds[0].video = {
			url: inputCanVariable.messageEmbedVideoUrl
		};
	};
	inputMessageEmbedFields.forEach((field, index) => {
		if (advancedDetermine.isString(field.name) == true) {
			if (field.name.length > 256) {
				inputMessageEmbedFields[index].name = `${field.name.slice(0, 252)}...`;
			};
		} else {
			inputMessageEmbedFields[index].name = "-";
		};
		if (advancedDetermine.isString(field.value) == true) {
			if (field.value.length > 1024) {
				inputMessageEmbedFields[index].value = `${field.value.slice(0, 1020)}...`;
			};
		} else {
			inputMessageEmbedFields[index].value = "-";
		};
	});
	output.embeds[0].fields = inputMessageEmbedFields;
};
const requestPayload = JSON.stringify(output);
const requestNode = https.request(
	`https://discord.com/api/webhooks/${inputCannotVariable.webhookID}/${inputCannotVariable.webhookToken}`,
	{
		port: 443,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Content-Length": requestPayload.length,
			"User-Agent": internalService.preset.header.userAgent
		}
	},
	(result) => {
		console.log(`Status Code: ${result.statusCode}`);
		result.on(
			"data",
			(delta) => {
				process.stdout.write(delta);
			}
		);
	}
);
requestNode.write(requestPayload);
requestNode.on(
	"error",
	(error) => {
		throw new Error(error);
	}
);
requestNode.end();
