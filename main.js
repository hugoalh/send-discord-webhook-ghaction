/*==================
[GitHub Action] Send To Discord
	Author & Contributor:
		hugoalh
	Language:
		NodeJS 12
==================*/
/*::::::::
Import Module
::::::::*/
const NodeJS = {
	HTTPS: require("https")
};
const GitHubAction = {
	Core: require("@actions/core")
};
const JSONFlatten = require("flat").flatten;

/*::::::::
Data Handle
::::::::*/
function DetermineIsNull(Input) {
	if (Input == null ||
		Input == "null" ||
		Input == "" ||
		Input == [] ||
		Input == {} ||
		Input == "{}" ||
		Input == undefined ||
		Input == "undefined"
	) {
		return true;
	};
	return false;
};
const Input_CannotVariable = {};
[
	"webhook_id",
	"webhook_token",
	"message_usetexttospeech",
	"message_embed_colour",
	"variable_prefix",
	"variable_suffix",
	"variable_join"
].forEach((value, index) => {
	Input_CannotVariable[value] = GitHubAction.Core.getInput(value);
});
const Input_CanVariable = {};
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
	Input_CanVariable[value] = GitHubAction.Core.getInput(value);
});
if (DetermineIsNull(Input_CannotVariable["webhook_id"]) == false && DetermineIsNull(Input_CannotVariable["webhook_token"]) == false) {
	Input_CannotVariable["webhook_url"] = `https://discord.com/api/webhooks/${Input_CannotVariable["webhook_id"]}/${Input_CannotVariable["webhook_token"]}`;
} else {
	GitHubAction.Core.setFailed("Invalid webhook ID or token!");
};
var Input_MessageEmbedFields = [];
for (let index = 0; index < 25; index++) {
	let Key = GitHubAction.Core.getInput(`message_embed_field_${index}_key`),
		Value = GitHubAction.Core.getInput(`message_embed_field_${index}_value`),
		IsInline = GitHubAction.Core.getInput(`message_embed_field_${index}_isinline`);
	if (DetermineIsNull(Key) == false && DetermineIsNull(Value) == false) {
		if (IsInline == true || IsInline == "true") {
			IsInline = true;
		} else {
			IsInline = false;
		};
		Input_MessageEmbedFields.push(
			{
				name: Key,
				value: Value,
				inline: IsInline
			}
		);
	} else {
		GitHubAction.Core.info(`Message embed field #${index} is null, ignore remains.`);
		break;
	};
};
var Input_VariableLists = {};
for (let index = 0; index < 10; index++) {
	let Name = GitHubAction.Core.getInput(`variable_list_${index}_name`),
		Data = GitHubAction.Core.getInput(`variable_list_${index}_data`);
	if (DetermineIsNull(Data) == false) {
		try {
			if (typeof Data != "object") {
				Data = JSON.parse(Data);
			};
		} catch (error) {
			GitHubAction.Core.setFailed(`Fail to parse variable list #${index}: ${error}`);
		};
		if (DetermineIsNull(Name) == false) {
			Input_VariableLists[Name] = Data;
		} else {
			Input_VariableLists[index] = Data;
		};
	} else {
		GitHubAction.Core.info(`Variable list #${index} is null, ignore remains.`);
		break;
	};
};
if (DetermineIsNull(Input_CannotVariable["variable_join"]) == true) {
	Input_CannotVariable["variable_join"] = "_";
};
if (DetermineIsNull(Input_CannotVariable["variable_prefix"]) == true) {
	Input_CannotVariable["variable_prefix"] = "%";
};
if (DetermineIsNull(Input_CannotVariable["variable_suffix"]) == true) {
	Input_CannotVariable["variable_suffix"] = "%";
};
if (DetermineIsNull(Input_VariableLists) == false) {
	if (Object.keys(Input_VariableLists).length == 1) {
		Input_VariableLists = Object.values(Input_VariableLists)[0];
	};
	try {
		Input_VariableLists = JSONFlatten(
			Input_VariableLists,
			{
				delimiter: Input_CannotVariable["variable_join"],
				overwrite: true
			}
		);
	} catch (error) {
		GitHubAction.Core.setFailed(`Fail to flatten variable list: ${error}`);
	};
	Promise.allSettled(
		Object.keys(Input_CanVariable).map((Item, index) => {
			new Promise((resolve, reject) => {
				Object.keys(Input_VariableLists).forEach((Key, index) => {
					Input_CanVariable[Item] = Input_CanVariable[Item].replace(
						new RegExp(`${Input_CannotVariable["variable_prefix"]}${Key}${Input_CannotVariable["variable_suffix"]}`, "gu"),
						Input_VariableLists[Key]
					);
				});
			}).catch((error) => { });
		})
	);
	Promise.allSettled(
		Input_MessageEmbedFields.map((Field, index_0) => {
			new Promise((resolve, reject) => {
				Object.keys(Input_VariableLists).forEach((Key, index_1) => {
					[
						"name",
						"value"
					].forEach((SubKey, index_2) => {
						Input_MessageEmbedFields[index_0][SubKey] = Input_MessageEmbedFields[index_0][SubKey].replace(
							new RegExp(`${Input_CannotVariable["variable_prefix"]}${Key}${Input_CannotVariable["variable_suffix"]}`, "gu"),
							Input_VariableLists[Key]
						);
					});
				});
			}).catch((error) => { });
		})
	);
};
const Output = {
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
		if (Input_CannotVariable["message_usetexttospeech"] == true || Input_CannotVariable["message_usetexttospeech"] == "true") {
			Output.tts = true;
		} else {
			Output.tts = false;
		};
	}).catch((error) => { }),
	new Promise((resolve, reject) => {
		if (DetermineIsNull(Input_CanVariable["webhook_name"]) == false && Input_CanVariable["webhook_name"].length >= 2 && Input_CanVariable["webhook_name"].length <= 32) {
			Output.username = Input_CanVariable["webhook_name"];
		};
		if (DetermineIsNull(Input_CanVariable["webhook_avatarurl"]) == false) {
			Output.avatar_url = Input_CanVariable["webhook_avatarurl"];
		};
		if (DetermineIsNull(Input_CanVariable["message_text"]) == false) {
			if (Input_CanVariable["message_text"].length > 2000) {
				Input_CanVariable["message_text"] = `${Input_CanVariable["message_text"].slice(0, 1996)}...`;
			};
			Output.content = Input_CanVariable["message_text"];
		};
	}).catch((error) => { }),
	new Promise((resolve, reject) => {
		if (DetermineIsNull(Input_CanVariable["message_embed_authorname"]) == false ||
			DetermineIsNull(Input_CanVariable["message_embed_title"]) == false ||
			DetermineIsNull(Input_CanVariable["message_embed_description"]) == false ||
			DetermineIsNull(Input_CanVariable["message_embed_thumbnailurl"]) == false ||
			DetermineIsNull(Input_CanVariable["message_embed_imageurl"]) == false ||
			DetermineIsNull(Input_CanVariable["message_embed_videourl"]) == false ||
			DetermineIsNull(Input_MessageEmbedFields) == false ||
			DetermineIsNull(Input_CanVariable["message_embed_footertext"]) == false
		) {
			Output.embeds = [
				{
					color: 0
				}
			];
			Promise.allSettled([
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_CannotVariable["message_embed_colour"]) == false) {
						Input_CannotVariable["message_embed_colour"] = Input_CannotVariable["message_embed_colour"].toUpperCase();
						let Colour = {};
						switch (Input_CannotVariable["message_embed_colour"]) {
							case "RANDOM":
								Colour = {
									R: Math.floor(Math.random() * 256),
									G: Math.floor(Math.random() * 256),
									B: Math.floor(Math.random() * 256)
								};
								break;
							case "DISCORDBLURPLE":
								Colour = {
									R: 114,
									G: 137,
									B: 218
								};
								break;
							case "WHITE":
								Colour = {
									R: 255,
									G: 255,
									B: 255
								};
								break;
							case "BLACK":
								Colour = {
									R: 0,
									G: 0,
									B: 0
								};
								break;
							case "DISCORDGREYPLE":
								Colour = {
									R: 153,
									G: 170,
									B: 181
								};
								break;
							case "DISCORDDARK":
								Colour = {
									R: 44,
									G: 47,
									B: 51
								};
								break;
							case "DISCORDBLACK":
								Colour = {
									R: 35,
									G: 39,
									B: 42
								};
								break;
							default:
								if (Input_CannotVariable["message_embed_colour"].search(/[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}/u) == 0) {
									Input_CannotVariable["message_embed_colour"] = Input_CannotVariable["message_embed_colour"].split(",");
									Colour = {
										R: Number(Input_CannotVariable["message_embed_colour"][0]),
										G: Number(Input_CannotVariable["message_embed_colour"][1]),
										B: Number(Input_CannotVariable["message_embed_colour"][2])
									};
									Object.keys(Colour).forEach((key, index) => {
										if (Colour[key] > 255) {
											Colour[key] = 255;
										};
									});
								} else {
									Colour = {
										R: 0,
										G: 0,
										B: 0
									};
								};
								break;
						};
						Output.embeds[0].color = Colour.R * 65536 + Colour.G * 256 + Colour.B;
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_CanVariable["message_embed_authorname"]) == false && Input_CanVariable["message_embed_authorname"].length >= 2 && Input_CanVariable["message_embed_authorname"].length <= 32) {
						Output.embeds[0].author = {
							name: Input_CanVariable["message_embed_authorname"]
						};
						if (DetermineIsNull(Input_CanVariable["message_embed_authoravatarurl"]) == false) {
							Output.embeds[0].author.icon_url = Input_CanVariable["message_embed_authoravatarurl"];
						};
						if (DetermineIsNull(Input_CanVariable["message_embed_authorurl"]) == false) {
							Output.embeds[0].author.url = Input_CanVariable["message_embed_authorurl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_CanVariable["message_embed_title"]) == false) {
						if (Input_CanVariable["message_embed_title"].length > 256) {
							Input_CanVariable["message_embed_title"] = `${Input_CanVariable["message_embed_title"].slice(0, 252)}...`;
						};
						Output.embeds[0].title = Input_CanVariable["message_embed_title"];
						if (DetermineIsNull(Input_CanVariable["message_embed_titleurl"]) == false) {
							Output.embeds[0].url = Input_CanVariable["message_embed_titleurl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_CanVariable["message_embed_description"]) == false) {
						if (Input_CanVariable["message_embed_description"].length > 2048) {
							Input_CanVariable["message_embed_description"] = `${Input_CanVariable["message_embed_description"].slice(0, 2044)}...`;
						};
						Output.embeds[0].description = Input_CanVariable["message_embed_description"];
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_CanVariable["message_embed_footertext"]) == false) {
						if (Input_CanVariable["message_embed_footertext"].length > 2048) {
							Input_CanVariable["message_embed_footertext"] = `${Input_CanVariable["message_embed_footertext"].slice(0, 2044)}...`;
						};
						Output.embeds[0].footer = {
							text: Input_CanVariable["message_embed_footertext"]
						};
						if (DetermineIsNull(Input_CanVariable["message_embed_footericonurl"]) == false) {
							Output.embeds[0].footer.icon_url = Input_CanVariable["message_embed_footericonurl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_CanVariable["message_embed_imageurl"]) == false) {
						Output.embeds[0].image = {
							url: Input_CanVariable["message_embed_imageurl"]
						};
					};
					if (DetermineIsNull(Input_CanVariable["message_embed_thumbnailurl"]) == false) {
						Output.embeds[0].thumbnail = {
							url: Input_CanVariable["message_embed_thumbnailurl"]
						};
					};
					if (DetermineIsNull(Input_CanVariable["message_embed_videourl"]) == false) {
						Output.embeds[0].video = {
							url: Input_CanVariable["message_embed_videourl"]
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_MessageEmbedFields) == false) {
						Input_MessageEmbedFields.forEach((Slot, index) => {
							if (DetermineIsNull(Slot.name) == false) {
								if (Slot.name.length > 256) {
									Input_MessageEmbedFields[index].name = `${Slot.name.slice(0, 252)}...`;
								};
							} else {
								Input_MessageEmbedFields[index].name = "-";
							};
							if (DetermineIsNull(Slot.value) == false) {
								if (Slot.value.length > 1024) {
									Input_MessageEmbedFields[index].value = `${Slot.value.slice(0, 1020)}...`;
								};
							} else {
								Input_MessageEmbedFields[index].value = "-";
							};
						});
						Output.embeds[0].fields = Input_MessageEmbedFields;
					};
				}).catch((error) => { })
			]);
		};
	}).catch((error) => { })
]);

/*::::::::
Send
::::::::*/
const Request_Payload = JSON.stringify(Output);
const Request_Option = {
	port: 443,
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Content-Length": Request_Payload.length
	}
};
const Request_Node = NodeJS.HTTPS.request(
	Input_CannotVariable["webhook_url"],
	Request_Option,
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
Request_Node.on(
	"error",
	(error) => {
		GitHubAction.Core.setFailed(error);
	}
);
Request_Node.write(Request_Payload);
Request_Node.end();
