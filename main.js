/*==================
[GitHub Action] Send To Discord
	Language:
		NodeJS 14
==================*/
const https = require("https");
const githubAction = {
	core: require("@actions/core")
};
const customNullDetermine = require("./customnulldetermine.js");
const jsonFlatten = require("flat").flatten;
let inputCannotVariable = {
	webhookID: githubAction.core.getInput("webhook_id"),
	webhookToken: githubAction.core.getInput("webhook_token"),
	messageUseTextToSpeech: githubAction.core.getInput("message_usetexttospeech"),
	messageEmbedColour: githubAction.core.getInput("message_embed_colour"),
	variablePrefix: githubAction.core.getInput("variable_prefix"),
	variableSuffix: githubAction.core.getInput("variable_suffix"),
	variableJoin: githubAction.core.getInput("variable_join")
};
let inputCanVariable = {
	webhookName: githubAction.core.getInput("webhook_name"),
	webhookAvatarUrl: githubAction.core.getInput("webhook_avatarurl"),
	messageText: githubAction.core.getInput("message_text"),
	messageEmbedAuthorName: githubAction.core.getInput("message_embed_authorname"),
	messageEmbedAuthorUrl: githubAction.core.getInput("message_embed_authorurl"),
	messageEmbedAuthorAvatarUrl: githubAction.core.getInput("message_embed_authoravatarurl"),
	messageEmbedTitle: githubAction.core.getInput("message_embed_title"),
	messageEmbedTitleUrl: githubAction.core.getInput("message_embed_titleurl"),
	messageEmbedDescription: githubAction.core.getInput("message_embed_description"),
	messageEmbedThumbnailUrl: githubAction.core.getInput("message_embed_thumbnailurl"),
	messageEmbedImageUrl: githubAction.core.getInput("message_embed_imageurl"),
	messageEmbedVideoUrl: githubAction.core.getInput("message_embed_videourl"),
	messageEmbedFooterIconUrl: githubAction.core.getInput("message_embed_footericonurl"),
	messageEmbedFooterText: githubAction.core.getInput("message_embed_footertext")
};
if (customNullDetermine(inputCannotVariable.webhookID) == false && customNullDetermine(inputCannotVariable.webhookToken) == false) {
	inputCannotVariable.webhookUrl = `https://discord.com/api/webhooks/${inputCannotVariable.webhookID}/${inputCannotVariable.webhookToken}`;
} else {
	githubAction.core.setFailed(`Invalid type of "webhook_id" or "webhook_token"! Require type of string.`);
};
let inputMessageEmbedFields = [];
for (let index = 0; index < 25; index++) {
	let key = githubAction.core.getInput(`message_embed_field_${index}_key`),
		value = githubAction.core.getInput(`message_embed_field_${index}_value`),
		isInline = githubAction.core.getInput(`message_embed_field_${index}_isinline`);
	if (customNullDetermine(key) == false && customNullDetermine(value) == false) {
		if (isInline == true || isInline == "true") {
			isInline = true;
		} else {
			isInline = false;
		};
		inputMessageEmbedFields.push(
			{
				name: key,
				value: value,
				inline: isInline
			}
		);
	} else {
		githubAction.core.info(`Message embed field #${index} is null, ignore remains.`);
		break;
	};
};
let inputVariableLists = {};
for (let index = 0; index < 10; index++) {
	let name = githubAction.core.getInput(`variable_list_${index}_name`),
		data = githubAction.core.getInput(`variable_list_${index}_data`);
	if (customNullDetermine(data) == false) {
		try {
			if (typeof data != "object") {
				data = JSON.parse(data);
			};
		} catch (error) {
			githubAction.core.setFailed(`Fail to parse variable list #${index}: ${error}`);
		};
		if (customNullDetermine(name) == false) {
			inputVariableLists[name] = data;
		} else {
			inputVariableLists[index] = data;
		};
	} else {
		githubAction.core.info(`Variable list #${index} is null, ignore remains.`);
		break;
	};
};
if (customNullDetermine(inputCannotVariable.variableJoin) == true) {
	inputCannotVariable.variableJoin = "_";
};
if (customNullDetermine(inputCannotVariable.variablePrefix) == true) {
	inputCannotVariable.variablePrefix = "%";
};
if (customNullDetermine(inputCannotVariable.variableSuffix) == true) {
	inputCannotVariable.variableSuffix = "%";
};
if (customNullDetermine(inputVariableLists) == false) {
	if (Object.keys(inputVariableLists).length == 1) {
		inputVariableLists = Object.values(inputVariableLists)[0];
	};
	try {
		inputVariableLists = jsonFlatten(
			inputVariableLists,
			{
				delimiter: inputCannotVariable.variableJoin,
				overwrite: true
			}
		);
	} catch (error) {
		githubAction.core.setFailed(`Fail to flatten variable list: ${error}`);
	};
	Promise.allSettled(
		Object.keys(inputCanVariable).map((item, index) => {
			new Promise((resolve, reject) => {
				Object.keys(inputVariableLists).forEach((key, index) => {
					inputCanVariable[item] = inputCanVariable[item].replace(
						new RegExp(`${inputCannotVariable.variablePrefix}${key}${inputCannotVariable.variableSuffix}`, "gu"),
						inputVariableLists[key]
					);
				});
			}).catch((error) => { });
		})
	);
	Promise.allSettled(
		inputMessageEmbedFields.map((field, index_0) => {
			new Promise((resolve, reject) => {
				Object.keys(inputVariableLists).forEach((key, index_1) => {
					[
						"name",
						"value"
					].forEach((subKey, index_2) => {
						inputMessageEmbedFields[index_0][subKey] = inputMessageEmbedFields[index_0][subKey].replace(
							new RegExp(`${inputCannotVariable.variablePrefix}${key}${inputCannotVariable.variableSuffix}`, "gu"),
							inputVariableLists[key]
						);
					});
				});
			}).catch((error) => { });
		})
	);
};
let output = {
	allowed_mentions: {
		parse: [
			"roles",
			"users",
			"everyone"
		]
	}
};
Promise.allSettled([
	new Promise((resolve, reject) => {
		if (inputCannotVariable.messageUseTextToSpeech == true || inputCannotVariable.messageUseTextToSpeech == "true") {
			output.tts = true;
		} else {
			output.tts = false;
		};
	}).catch((error) => { }),
	new Promise((resolve, reject) => {
		if (customNullDetermine(inputCanVariable.webhookName) == false && inputCanVariable.webhookName.length >= 2 && inputCanVariable.webhookName.length <= 32) {
			output.username = inputCanVariable.webhookName;
		};
		if (customNullDetermine(inputCanVariable.webhookAvatarUrl) == false) {
			output.avatar_url = inputCanVariable.webhookAvatarUrl;
		};
		if (customNullDetermine(inputCanVariable.messageText) == false) {
			if (inputCanVariable.messageText.length > 2000) {
				inputCanVariable.messageText = `${inputCanVariable.messageText.slice(0, 1996)}...`;
			};
			output.content = inputCanVariable.messageText;
		};
	}).catch((error) => { }),
	new Promise((resolve, reject) => {
		if (customNullDetermine(inputCanVariable.messageEmbedAuthorName) == false ||
			customNullDetermine(inputCanVariable.messageEmbedTitle) == false ||
			customNullDetermine(inputCanVariable.messageEmbedDescription) == false ||
			customNullDetermine(inputCanVariable.messageEmbedThumbnailUrl) == false ||
			customNullDetermine(inputCanVariable.messageEmbedImageUrl) == false ||
			customNullDetermine(inputCanVariable.messageEmbedVideoUrl) == false ||
			customNullDetermine(inputMessageEmbedFields) == false ||
			customNullDetermine(inputCanVariable.messageEmbedFooterText) == false
		) {
			output.embeds = [
				{
					color: 0
				}
			];
			Promise.allSettled([
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputCannotVariable.messageEmbedColour) == false) {
						inputCannotVariable.messageEmbedColour = inputCannotVariable.messageEmbedColour.toUpperCase();
						let colour = {};
						switch (inputCannotVariable.messageEmbedColour) {
							case "RANDOM":
								colour = {
									R: Math.floor(Math.random() * 256),
									G: Math.floor(Math.random() * 256),
									B: Math.floor(Math.random() * 256)
								};
								break;
							case "DISCORDBLURPLE":
								colour = {
									R: 114,
									G: 137,
									B: 218
								};
								break;
							case "WHITE":
								colour = {
									R: 255,
									G: 255,
									B: 255
								};
								break;
							case "BLACK":
								colour = {
									R: 0,
									G: 0,
									B: 0
								};
								break;
							case "DISCORDGREYPLE":
								colour = {
									R: 153,
									G: 170,
									B: 181
								};
								break;
							case "DISCORDDARK":
								colour = {
									R: 44,
									G: 47,
									B: 51
								};
								break;
							case "DISCORDBLACK":
								colour = {
									R: 35,
									G: 39,
									B: 42
								};
								break;
							default:
								if (inputCannotVariable.messageEmbedColour.search(/[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}/u) == 0) {
									inputCannotVariable.messageEmbedColour = inputCannotVariable.messageEmbedColour.split(",");
									colour = {
										R: Number(inputCannotVariable.messageEmbedColour[0]),
										G: Number(inputCannotVariable.messageEmbedColour[1]),
										B: Number(inputCannotVariable.messageEmbedColour[2])
									};
									Object.keys(colour).forEach((key, index) => {
										if (colour[key] > 255) {
											colour[key] = 255;
										};
									});
								} else {
									colour = {
										R: 0,
										G: 0,
										B: 0
									};
								};
								break;
						};
						output.embeds[0].color = colour.R * 65536 + colour.G * 256 + colour.B;
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputCanVariable.messageEmbedAuthorName) == false) {
						if (inputCanVariable.messageEmbedAuthorName.length > 256) {
							inputCanVariable.messageEmbedAuthorName = `${inputCanVariable.messageEmbedAuthorName.slice(0, 252)}...`;
						};
						output.embeds[0].author = {
							name: inputCanVariable.messageEmbedAuthorName
						};
						if (customNullDetermine(inputCanVariable.messageEmbedAuthorAvatarUrl) == false) {
							output.embeds[0].author.icon_url = inputCanVariable.messageEmbedAuthorAvatarUrl;
						};
						if (customNullDetermine(inputCanVariable.messageEmbedAuthorUrl) == false) {
							output.embeds[0].author.url = inputCanVariable.messageEmbedAuthorUrl;
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputCanVariable.messageEmbedTitle) == false) {
						if (inputCanVariable.messageEmbedTitle.length > 256) {
							inputCanVariable.messageEmbedTitle = `${inputCanVariable.messageEmbedTitle.slice(0, 252)}...`;
						};
						output.embeds[0].title = inputCanVariable.messageEmbedTitle;
						if (customNullDetermine(inputCanVariable.messageEmbedTitleUrl) == false) {
							output.embeds[0].url = inputCanVariable.messageEmbedTitleUrl;
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputCanVariable.messageEmbedDescription) == false) {
						if (inputCanVariable.messageEmbedDescription.length > 2048) {
							inputCanVariable.messageEmbedDescription = `${inputCanVariable.messageEmbedDescription.slice(0, 2044)}...`;
						};
						output.embeds[0].description = inputCanVariable.messageEmbedDescription;
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputCanVariable.messageEmbedFooterText) == false) {
						if (inputCanVariable.messageEmbedFooterText.length > 2048) {
							inputCanVariable.messageEmbedFooterText = `${inputCanVariable.messageEmbedFooterText.slice(0, 2044)}...`;
						};
						output.embeds[0].footer = {
							text: inputCanVariable.messageEmbedFooterText
						};
						if (customNullDetermine(inputCanVariable.messageEmbedFooterIconUrl) == false) {
							output.embeds[0].footer.icon_url = inputCanVariable.messageEmbedFooterIconUrl;
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputCanVariable.messageEmbedImageUrl) == false) {
						output.embeds[0].image = {
							url: inputCanVariable.messageEmbedImageUrl
						};
					};
					if (customNullDetermine(inputCanVariable.messageEmbedThumbnailUrl) == false) {
						output.embeds[0].thumbnail = {
							url: inputCanVariable.messageEmbedThumbnailUrl
						};
					};
					if (customNullDetermine(inputCanVariable.messageEmbedVideoUrl) == false) {
						output.embeds[0].video = {
							url: inputCanVariable.messageEmbedVideoUrl
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputMessageEmbedFields) == false) {
						inputMessageEmbedFields.forEach((slot, index) => {
							if (customNullDetermine(slot.name) == false) {
								if (slot.name.length > 256) {
									inputMessageEmbedFields[index].name = `${slot.name.slice(0, 252)}...`;
								};
							} else {
								inputMessageEmbedFields[index].name = "-";
							};
							if (customNullDetermine(slot.value) == false) {
								if (slot.value.length > 1024) {
									inputMessageEmbedFields[index].value = `${slot.value.slice(0, 1020)}...`;
								};
							} else {
								inputMessageEmbedFields[index].value = "-";
							};
						});
						output.embeds[0].fields = inputMessageEmbedFields;
					};
				}).catch((error) => { })
			]);
		};
	}).catch((error) => { })
]);
const requestPayload = JSON.stringify(output);
const requestOption = {
	port: 443,
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Content-Length": requestPayload.length
	}
};
const requestNode = https.request(
	inputCannotVariable.webhookUrl,
	requestOption,
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
requestNode.on(
	"error",
	(error) => {
		githubAction.core.setFailed(error);
	}
);
requestNode.write(requestPayload);
requestNode.end();
