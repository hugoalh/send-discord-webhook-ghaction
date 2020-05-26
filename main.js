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
	"Webhook_ID",
	"Webhook_Token",
	"Message_UseTextToSpeech",
	"Message_Embed_Colour",
	"Message_Embed_FieldSplit",
	"Variable_Prefix",
	"Variable_Suffix",
	"Variable_Join"
].forEach((value, index) => {
	Input_CannotVariable[value] = GitHubAction.Core.getInput(value);
});
const Input_CanVariable = {};
[
	"Webhook_Name",
	"Webhook_AvatarUrl",
	"Message_Text",
	"Message_Embed_AuthorName",
	"Message_Embed_AuthorUrl",
	"Message_Embed_AuthorAvatarUrl",
	"Message_Embed_Title",
	"Message_Embed_TitleUrl",
	"Message_Embed_Description",
	"Message_Embed_ThumbnailUrl",
	"Message_Embed_ImageUrl",
	"Message_Embed_VideoUrl",
	"Message_Embed_FooterIconUrl",
	"Message_Embed_FooterText"
].forEach((value, index) => {
	Input_CanVariable[value] = GitHubAction.Core.getInput(value);
});
if (DetermineIsNull(Input_CannotVariable["Webhook_ID"]) == false && DetermineIsNull(Input_CannotVariable["Webhook_Token"]) == false) {
	Input_CannotVariable["Webhook_Url"] = `https://discordapp.com/api/webhooks/${Input_CannotVariable["Webhook_ID"]}/${Input_CannotVariable["Webhook_Token"]}`;
} else {
	GitHubAction.Core.setFailed("Invalid webhook ID or token!");
};
var Input_MessageEmbedFields = [];
for (let index = 0; index < 25; index++) {
	let Key = GitHubAction.Core.getInput(`Message_Embed_Field_${index}_Key`),
		Value = GitHubAction.Core.getInput(`Message_Embed_Field_${index}_Value`),
		IsInline = GitHubAction.Core.getInput(`Message_Embed_Field_${index}_IsInline`);
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
	let Name = GitHubAction.Core.getInput(`Variable_List_${index}_Name`),
		Data = GitHubAction.Core.getInput(`Variable_List_${index}_Data`);
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
if (DetermineIsNull(Input_CannotVariable["Variable_Join"]) == true) {
	Input_CannotVariable["Variable_Join"] = "_";
};
if (DetermineIsNull(Input_CannotVariable["Variable_Prefix"]) == true) {
	Input_CannotVariable["Variable_Prefix"] = "%";
};
if (DetermineIsNull(Input_CannotVariable["Variable_Suffix"]) == true) {
	Input_CannotVariable["Variable_Suffix"] = "%";
};
if (DetermineIsNull(Input_VariableLists) == false) {
	if (Object.keys(Input_VariableLists).length == 1) {
		Input_VariableLists = Object.values(Input_VariableLists)[0];
	};
	try {
		Input_VariableLists = JSONFlatten(
			Input_VariableLists,
			{
				delimiter: Input_CannotVariable["Variable_Join"],
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
						new RegExp(`${Input_CannotVariable["Variable_Prefix"]}${Key}${Input_CannotVariable["Variable_Suffix"]}`, "gu"),
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
							new RegExp(`${Input_CannotVariable["Variable_Prefix"]}${Key}${Input_CannotVariable["Variable_Suffix"]}`, "gu"),
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
		if (Input_CannotVariable["Message_UseTextToSpeech"] == true || Input_CannotVariable["Message_UseTextToSpeech"] == "true") {
			Output.tts = true;
		} else {
			Output.tts = false;
		};
	}).catch((error) => { }),
	new Promise((resolve, reject) => {
		if (DetermineIsNull(Input_CanVariable["Webhook_Name"]) == false && Input_CanVariable["Webhook_Name"].length >= 2 && Input_CanVariable["Webhook_Name"].length <= 32) {
			Output.username = Input_CanVariable["Webhook_Name"];
		};
		if (DetermineIsNull(Input_CanVariable["Webhook_AvatarUrl"]) == false) {
			Output.avatar_url = Input_CanVariable["Webhook_AvatarUrl"];
		};
		if (DetermineIsNull(Input_CanVariable["Message_Text"]) == false) {
			if (Input_CanVariable["Message_Text"].length > 2000) {
				Input_CanVariable["Message_Text"] = `${Input_CanVariable["Message_Text"].slice(0, 1996)}...`;
			};
			Output.content = Input_CanVariable["Message_Text"];
		};
	}).catch((error) => { }),
	new Promise((resolve, reject) => {
		if (DetermineIsNull(Input_CanVariable["Message_Embed_AuthorName"]) == false ||
			DetermineIsNull(Input_CanVariable["Message_Embed_Title"]) == false ||
			DetermineIsNull(Input_CanVariable["Message_Embed_Description"]) == false ||
			DetermineIsNull(Input_CanVariable["Message_Embed_ThumbnailUrl"]) == false ||
			DetermineIsNull(Input_CanVariable["Message_Embed_ImageUrl"]) == false ||
			DetermineIsNull(Input_CanVariable["Message_Embed_VideoUrl"]) == false ||
			DetermineIsNull(Input_MessageEmbedFields) == false ||
			DetermineIsNull(Input_CanVariable["Message_Embed_FooterText"]) == false
		) {
			Output.embeds = [
				{
					color: 0
				}
			];
			Promise.allSettled([
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_CannotVariable["Message_Embed_Colour"]) == false) {
						Input_CannotVariable["Message_Embed_Colour"] = Input_CannotVariable["Message_Embed_Colour"].toUpperCase();
						let Colour = {};
						switch (Input_CannotVariable["Message_Embed_Colour"]) {
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
								if (Input_CannotVariable["Message_Embed_Colour"].search(/[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}/u) == 0) {
									Input_CannotVariable["Message_Embed_Colour"] = Input_CannotVariable["Message_Embed_Colour"].split(",");
									Colour = {
										R: Number(Input_CannotVariable["Message_Embed_Colour"][0]),
										G: Number(Input_CannotVariable["Message_Embed_Colour"][1]),
										B: Number(Input_CannotVariable["Message_Embed_Colour"][2])
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
					if (DetermineIsNull(Input_CanVariable["Message_Embed_AuthorName"]) == false && Input_CanVariable["Message_Embed_AuthorName"].length >= 2 && Input_CanVariable["Message_Embed_AuthorName"].length <= 32) {
						Output.embeds[0].author = {
							name: Input_CanVariable["Message_Embed_AuthorName"]
						};
						if (DetermineIsNull(Input_CanVariable["Message_Embed_AuthorAvatarUrl"]) == false) {
							Output.embeds[0].author.icon_url = Input_CanVariable["Message_Embed_AuthorAvatarUrl"];
						};
						if (DetermineIsNull(Input_CanVariable["Message_Embed_AuthorUrl"]) == false) {
							Output.embeds[0].author.url = Input_CanVariable["Message_Embed_AuthorUrl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_CanVariable["Message_Embed_Title"]) == false) {
						if (Input_CanVariable["Message_Embed_Title"].length > 256) {
							Input_CanVariable["Message_Embed_Title"] = `${Input_CanVariable["Message_Embed_Title"].slice(0, 252)}...`;
						};
						Output.embeds[0].title = Input_CanVariable["Message_Embed_Title"];
						if (DetermineIsNull(Input_CanVariable["Message_Embed_TitleUrl"]) == false) {
							Output.embeds[0].url = Input_CanVariable["Message_Embed_TitleUrl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_CanVariable["Message_Embed_Description"]) == false) {
						if (Input_CanVariable["Message_Embed_Description"].length > 2048) {
							Input_CanVariable["Message_Embed_Description"] = `${Input_CanVariable["Message_Embed_Description"].slice(0, 2044)}...`;
						};
						Output.embeds[0].description = Input_CanVariable["Message_Embed_Description"];
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_CanVariable["Message_Embed_FooterText"]) == false) {
						if (Input_CanVariable["Message_Embed_FooterText"].length > 2048) {
							Input_CanVariable["Message_Embed_FooterText"] = `${Input_CanVariable["Message_Embed_FooterText"].slice(0, 2044)}...`;
						};
						Output.embeds[0].footer = {
							text: Input_CanVariable["Message_Embed_FooterText"]
						};
						if (DetermineIsNull(Input_CanVariable["Message_Embed_FooterIconUrl"]) == false) {
							Output.embeds[0].footer.icon_url = Input_CanVariable["Message_Embed_FooterIconUrl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input_CanVariable["Message_Embed_ImageUrl"]) == false) {
						Output.embeds[0].image = {
							url: Input_CanVariable["Message_Embed_ImageUrl"]
						};
					};
					if (DetermineIsNull(Input_CanVariable["Message_Embed_ThumbnailUrl"]) == false) {
						Output.embeds[0].thumbnail = {
							url: Input_CanVariable["Message_Embed_ThumbnailUrl"]
						};
					};
					if (DetermineIsNull(Input_CanVariable["Message_Embed_VideoUrl"]) == false) {
						Output.embeds[0].video = {
							url: Input_CanVariable["Message_Embed_VideoUrl"]
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
	Input_CannotVariable["Webhook_Url"],
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
