/*==================
[GitHub Action] Send To Discord
	Language:
		NodeJS 14
==================*/
/*::::::::
Import Module
::::::::*/
const nodeJS = {
	https: require("https")
};
const githubAction = {
	Core: require("@actions/core")
};
const customNullDetermine = require("./customnulldetermine.js");
const jsonFlatten = require("flat").flatten;

/*::::::::
Data Handle
::::::::*/
let inputCannotVariable = {};
[
	"webhook_id",
	"webhook_token",
	"message_usetexttospeech",
	"message_embed_colour",
	"variable_prefix",
	"variable_suffix",
	"variable_join"
].forEach((value, index) => {
	inputCannotVariable[value] = githubAction.Core.getInput(value);
});
let inputCanVariable = {};
[
	"webhook_name",
	"webhook_avatarurl",
	"message_text",
	"message_embed_authorname",
	"message_embed_authorurl",
	"message_embed_authoravatarurl",
	"message_embed_title",
	"message_embed_titleurl",
	"message_embed_description",
	"message_embed_thumbnailurl",
	"message_embed_imageurl",
	"message_embed_videourl",
	"message_embed_footericonurl",
	"message_embed_footertext"
].forEach((value, index) => {
	inputCanVariable[value] = githubAction.Core.getInput(value);
});
if (customNullDetermine(inputCannotVariable["webhook_id"]) == false && customNullDetermine(inputCannotVariable["webhook_token"]) == false) {
	inputCannotVariable["webhook_url"] = `https://discord.com/api/webhooks/${inputCannotVariable["webhook_id"]}/${inputCannotVariable["webhook_token"]}`;
} else {
	githubAction.Core.setFailed("Invalid webhook ID or token!");
};
let inputMessageEmbedFields = [];
for (let index = 0; index < 25; index++) {
	let key = githubAction.Core.getInput(`message_embed_field_${index}_key`),
		value = githubAction.Core.getInput(`message_embed_field_${index}_value`),
		isInline = githubAction.Core.getInput(`message_embed_field_${index}_isinline`);
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
		githubAction.Core.info(`Message embed field #${index} is null, ignore remains.`);
		break;
	};
};
let inputVariableLists = {};
for (let index = 0; index < 10; index++) {
	let name = githubAction.Core.getInput(`variable_list_${index}_name`),
		data = githubAction.Core.getInput(`variable_list_${index}_data`);
	if (customNullDetermine(data) == false) {
		try {
			if (typeof data != "object") {
				data = JSON.parse(data);
			};
		} catch (error) {
			githubAction.Core.setFailed(`Fail to parse variable list #${index}: ${error}`);
		};
		if (customNullDetermine(name) == false) {
			inputVariableLists[name] = data;
		} else {
			inputVariableLists[index] = data;
		};
	} else {
		githubAction.Core.info(`Variable list #${index} is null, ignore remains.`);
		break;
	};
};
if (customNullDetermine(inputCannotVariable["variable_join"]) == true) {
	inputCannotVariable["variable_join"] = "_";
};
if (customNullDetermine(inputCannotVariable["variable_prefix"]) == true) {
	inputCannotVariable["variable_prefix"] = "%";
};
if (customNullDetermine(inputCannotVariable["variable_suffix"]) == true) {
	inputCannotVariable["variable_suffix"] = "%";
};
if (customNullDetermine(inputVariableLists) == false) {
	if (Object.keys(inputVariableLists).length == 1) {
		inputVariableLists = Object.values(inputVariableLists)[0];
	};
	try {
		inputVariableLists = jsonFlatten(
			inputVariableLists,
			{
				delimiter: inputCannotVariable["variable_join"],
				overwrite: true
			}
		);
	} catch (error) {
		githubAction.Core.setFailed(`Fail to flatten variable list: ${error}`);
	};
	Promise.allSettled(
		Object.keys(inputCanVariable).map((item, index) => {
			new Promise((resolve, reject) => {
				Object.keys(inputVariableLists).forEach((key, index) => {
					inputCanVariable[item] = inputCanVariable[item].replace(
						new RegExp(`${inputCannotVariable["variable_prefix"]}${key}${inputCannotVariable["variable_suffix"]}`, "gu"),
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
							new RegExp(`${inputCannotVariable["variable_prefix"]}${key}${inputCannotVariable["variable_suffix"]}`, "gu"),
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
		if (inputCannotVariable["message_usetexttospeech"] == true || inputCannotVariable["message_usetexttospeech"] == "true") {
			output.tts = true;
		} else {
			output.tts = false;
		};
	}).catch((error) => { }),
	new Promise((resolve, reject) => {
		if (customNullDetermine(inputCanVariable["webhook_name"]) == false && inputCanVariable["webhook_name"].length >= 2 && inputCanVariable["webhook_name"].length <= 32) {
			output.username = inputCanVariable["webhook_name"];
		};
		if (customNullDetermine(inputCanVariable["webhook_avatarurl"]) == false) {
			output.avatar_url = inputCanVariable["webhook_avatarurl"];
		};
		if (customNullDetermine(inputCanVariable["message_text"]) == false) {
			if (inputCanVariable["message_text"].length > 2000) {
				inputCanVariable["message_text"] = `${inputCanVariable["message_text"].slice(0, 1996)}...`;
			};
			output.content = inputCanVariable["message_text"];
		};
	}).catch((error) => { }),
	new Promise((resolve, reject) => {
		if (customNullDetermine(inputCanVariable["message_embed_authorname"]) == false ||
			customNullDetermine(inputCanVariable["message_embed_title"]) == false ||
			customNullDetermine(inputCanVariable["message_embed_description"]) == false ||
			customNullDetermine(inputCanVariable["message_embed_thumbnailurl"]) == false ||
			customNullDetermine(inputCanVariable["message_embed_imageurl"]) == false ||
			customNullDetermine(inputCanVariable["message_embed_videourl"]) == false ||
			customNullDetermine(inputMessageEmbedFields) == false ||
			customNullDetermine(inputCanVariable["message_embed_footertext"]) == false
		) {
			output.embeds = [
				{
					color: 0
				}
			];
			Promise.allSettled([
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputCannotVariable["message_embed_colour"]) == false) {
						inputCannotVariable["message_embed_colour"] = inputCannotVariable["message_embed_colour"].toUpperCase();
						let colour = {};
						switch (inputCannotVariable["message_embed_colour"]) {
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
								if (inputCannotVariable["message_embed_colour"].search(/[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}/u) == 0) {
									inputCannotVariable["message_embed_colour"] = inputCannotVariable["message_embed_colour"].split(",");
									colour = {
										R: Number(inputCannotVariable["message_embed_colour"][0]),
										G: Number(inputCannotVariable["message_embed_colour"][1]),
										B: Number(inputCannotVariable["message_embed_colour"][2])
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
					if (customNullDetermine(inputCanVariable["message_embed_authorname"]) == false) {
						if (inputCanVariable["message_embed_authorname"].length > 256) {
							inputCanVariable["message_embed_authorname"] = `${inputCanVariable["message_embed_authorname"].slice(0, 252)}...`;
						};
						output.embeds[0].author = {
							name: inputCanVariable["message_embed_authorname"]
						};
						if (customNullDetermine(inputCanVariable["message_embed_authoravatarurl"]) == false) {
							output.embeds[0].author.icon_url = inputCanVariable["message_embed_authoravatarurl"];
						};
						if (customNullDetermine(inputCanVariable["message_embed_authorurl"]) == false) {
							output.embeds[0].author.url = inputCanVariable["message_embed_authorurl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputCanVariable["message_embed_title"]) == false) {
						if (inputCanVariable["message_embed_title"].length > 256) {
							inputCanVariable["message_embed_title"] = `${inputCanVariable["message_embed_title"].slice(0, 252)}...`;
						};
						output.embeds[0].title = inputCanVariable["message_embed_title"];
						if (customNullDetermine(inputCanVariable["message_embed_titleurl"]) == false) {
							output.embeds[0].url = inputCanVariable["message_embed_titleurl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputCanVariable["message_embed_description"]) == false) {
						if (inputCanVariable["message_embed_description"].length > 2048) {
							inputCanVariable["message_embed_description"] = `${inputCanVariable["message_embed_description"].slice(0, 2044)}...`;
						};
						output.embeds[0].description = inputCanVariable["message_embed_description"];
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputCanVariable["message_embed_footertext"]) == false) {
						if (inputCanVariable["message_embed_footertext"].length > 2048) {
							inputCanVariable["message_embed_footertext"] = `${inputCanVariable["message_embed_footertext"].slice(0, 2044)}...`;
						};
						output.embeds[0].footer = {
							text: inputCanVariable["message_embed_footertext"]
						};
						if (customNullDetermine(inputCanVariable["message_embed_footericonurl"]) == false) {
							output.embeds[0].footer.icon_url = inputCanVariable["message_embed_footericonurl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (customNullDetermine(inputCanVariable["message_embed_imageurl"]) == false) {
						output.embeds[0].image = {
							url: inputCanVariable["message_embed_imageurl"]
						};
					};
					if (customNullDetermine(inputCanVariable["message_embed_thumbnailurl"]) == false) {
						output.embeds[0].thumbnail = {
							url: inputCanVariable["message_embed_thumbnailurl"]
						};
					};
					if (customNullDetermine(inputCanVariable["message_embed_videourl"]) == false) {
						output.embeds[0].video = {
							url: inputCanVariable["message_embed_videourl"]
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

/*::::::::
Send
::::::::*/
const requestPayload = JSON.stringify(output);
const requestOption = {
	port: 443,
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Content-Length": requestPayload.length
	}
};
const requestNode = nodeJS.https.request(
	inputCannotVariable["webhook_url"],
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
		githubAction.Core.setFailed(error);
	}
);
requestNode.write(requestPayload);
requestNode.end();
