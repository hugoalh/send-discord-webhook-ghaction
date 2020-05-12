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
	Core: require("@actions/core"),
	GitHub: require("@actions/github")
};
const JSONFlatten = require("flat").flatten;

/*::::::::
Data Handle
::::::::*/
function DetermineIsNull(Input) {
	if (Input == null || Input == "null" || Input == "" || Input == [] || Input == {} || Input == undefined || Input == "undefined") {
		return true;
	};
	return false;
};
var DiscordWebhookUrl = GitHubAction.Core.getInput(
	"discord_webhook_url",
	{
		required: true
	}
);
if (DiscordWebhookUrl.search(/^https:\/\/(?:canary.)?discord(?:app)?.com\/api\/webhooks\/[0-9]+\//u) == 0 && DiscordWebhookUrl.search("/github") != (DiscordWebhookUrl.length - "/github".length - 1)) {
	DiscordWebhookUrl = DiscordWebhookUrl.replace(/^https:\/\/(?:canary.)?discord(?:app)?.com\/api\/webhooks\//u, "https://discordapp.com/api/webhooks/");
} else {
	GitHubAction.Core.setFailed(`Invalid Discord webhook url!`);
};
const Output = {
	embeds: [
		{
			color: null,
			fields: []
		}
	],
	allowed_mentions: {
		parse: [
			"roles",
			"users",
			"everyone"
		]
	}
};
var MessageTTS = GitHubAction.Core.getInput("message_tts");
if (MessageTTS == true || MessageTTS == "true") {
	Output.tts = true;
} else {
	Output.tts = false;
};
var MessageVariablesJoin = GitHubAction.Core.getInput("message_variables_join");
if (DetermineIsNull(MessageVariablesJoin) == true) {
	MessageVariablesJoin = ".";
};
var MessageVariablesPrefix = GitHubAction.Core.getInput("message_variables_prefix");
if (DetermineIsNull(MessageVariablesPrefix) == true) {
	MessageVariablesPrefix = "%";
};
var MessageVariablesSuffix = GitHubAction.Core.getInput("message_variables_suffix");
if (DetermineIsNull(MessageVariablesSuffix) == true) {
	MessageVariablesSuffix = "%";
};
var MessageVariablesList = GitHubAction.Core.getInput("message_variables_list");
const Input = {
	"DiscordWebhookName": GitHubAction.Core.getInput("discord_webhook_name"),
	"DiscordWebhookAvatarUrl": GitHubAction.Core.getInput("discord_webhook_avatarurl"),
	"MessageText": GitHubAction.Core.getInput("message_text"),
	"MessageEmbedAuthorName": GitHubAction.Core.getInput("message_embed_author_name"),
	"MessageEmbedAuthorUrl": GitHubAction.Core.getInput("message_embed_author_url"),
	"MessageEmbedAuthorAvatarUrl": GitHubAction.Core.getInput("message_embed_author_avatarurl"),
	"MessageEmbedTitle": GitHubAction.Core.getInput("message_embed_title"),
	"MessageEmbedTitleUrl": GitHubAction.Core.getInput("message_embed_titleurl"),
	"MessageEmbedDescription": GitHubAction.Core.getInput("message_embed_description"),
	"MessageEmbedThumbnailUrl": GitHubAction.Core.getInput("message_embed_thumbnailurl"),
	"MessageEmbedImageUrl": GitHubAction.Core.getInput("message_embed_imageurl"),
	"MessageEmbedVideoUrl": GitHubAction.Core.getInput("message_embed_videourl"),
	"MessageEmbedFields": GitHubAction.Core.getInput("message_embed_fields"),
	"MessageEmbedFooterIconUrl": GitHubAction.Core.getInput("message_embed_footer_iconurl"),
	"MessageEmbedFooterText": GitHubAction.Core.getInput("message_embed_footer_text")
};
if (DetermineIsNull(MessageVariablesList) == false) {
	try {
		MessageVariablesList = JSON.parse(MessageVariablesList);
		MessageVariablesList = JSONFlatten(
			MessageVariablesList,
			{
				delimiter: MessageVariablesJoin,
				overwrite: true
			}
		);
	} catch (error) {
		GitHubAction.Core.setFailed(`Fail to parse message variables: ${error}`);
	};
	Promise.allSettled(
		Object.keys(Input).map((key, index) => {
			new Promise((resolve, reject) => {
				Object.keys(MessageVariablesList).forEach((value, index) => {
					Input[key] = Input[key].replace(
						new RegExp(`${MessageVariablesPrefix}${value}${MessageVariablesSuffix}`, "gu"),
						MessageVariablesList[value]
					);
				});
			}).catch((error) => { });
		})
	);
};
Promise.allSettled([
	new Promise((resolve, reject) => {
		if (DetermineIsNull(Input["DiscordWebhookName"]) == false && Input["DiscordWebhookName"].length >= 2 && Input["DiscordWebhookName"].length <= 32) {
			Output.username = Input["DiscordWebhookName"];
		};
		if (DetermineIsNull(Input["DiscordWebhookAvatarUrl"]) == false) {
			Output.avatar_url = Input["DiscordWebhookAvatarUrl"];
		};
		if (DetermineIsNull(Input["MessageText"]) == false) {
			if (Input["MessageText"].length > 2000) {
				Input["MessageText"] = `${Input["MessageText"].slice(0, 1996)}...`;
			};
			Output.content = Input["MessageText"];
		};
	}).catch((error) => { }),
	new Promise((resolve, reject) => {
		if (DetermineIsNull(Input["MessageEmbedAuthorName"]) == false || DetermineIsNull(Input["MessageEmbedTitle"]) == false || DetermineIsNull(Input["MessageEmbedDescription"]) == false || DetermineIsNull(Input["MessageEmbedThumbnailUrl"]) == false || DetermineIsNull(Input["MessageEmbedImageUrl"]) == false || DetermineIsNull(Input["MessageEmbedFields"]) == false || DetermineIsNull(Input["MessageEmbedFooterIconUrl"]) == false || DetermineIsNull(Input["MessageEmbedFooterText"]) == false) {
			Output.embeds = [
				{
					color: null
				}
			];
			Promise.allSettled([
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input["MessageEmbedAuthorName"]) == false && Input["MessageEmbedAuthorName"].length >= 2 && Input["MessageEmbedAuthorName"].length <= 32) {
						Output.embeds[0].author.name = Input["MessageEmbedAuthorName"];
						if (DetermineIsNull(Input["MessageEmbedAuthorAvatarUrl"]) == false) {
							Output.embeds[0].author.icon_url = Input["MessageEmbedAuthorAvatarUrl"];
						};
						if (DetermineIsNull(Input["MessageEmbedAuthorUrl"]) == false) {
							Output.embeds[0].author.url = Input["MessageEmbedAuthorUrl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input["MessageEmbedTitle"]) == false) {
						if (Input["MessageEmbedTitle"].length > 256) {
							Input["MessageEmbedTitle"] = `${Input["MessageEmbedTitle"].slice(0, 252)}...`;
						};
						Output.embeds[0].title = Input["MessageEmbedTitle"];
						if (DetermineIsNull(Input["MessageEmbedTitleUrl"]) == false) {
							Output.embeds[0].url = Input["MessageEmbedTitleUrl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input["MessageEmbedDescription"]) == false) {
						if (Input["MessageEmbedDescription"].length > 2048) {
							Input["MessageEmbedDescription"] = `${Input["MessageEmbedDescription"].slice(0, 2044)}...`;
						};
						Output.embeds[0].description = Input["MessageEmbedDescription"];
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input["MessageEmbedFooterText"]) == false) {
						if (Input["MessageEmbedFooterText"].length > 2048) {
							Input["MessageEmbedFooterText"] = `${Input["MessageEmbedFooterText"].slice(0, 2044)}...`;
						};
						Output.embeds[0].footer.text = Input["MessageEmbedFooterText"];
						if (DetermineIsNull(Input["MessageEmbedFooterIconUrl"]) == false) {
							Output.embeds[0].footer.icon_url = Input["MessageEmbedFooterIconUrl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input["MessageEmbedImageUrl"]) == false) {
						Output.embeds[0].image.url = Input["MessageEmbedImageUrl"];
					};
					if (DetermineIsNull(Input["MessageEmbedThumbnailUrl"]) == false) {
						Output.embeds[0].thumbnail.url = Input["MessageEmbedThumbnailUrl"];
					};
					if (DetermineIsNull(Input["MessageEmbedVideoUrl"]) == false) {
						Output.embeds[0].video.url = Input["MessageEmbedVideoUrl"];
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input["MessageEmbedFields"]) == false) {
						Input["MessageEmbedFields"].split("-;-", 25).forEach((value, index) => {
							let FieldSection = value.split("-,-", 3);
							if (DetermineIsNull(FieldSection[0]) == false && DetermineIsNull(FieldSection[1]) == false) {
								if (FieldSection[0].length > 256) {
									FieldSection[0] = `${FieldSection[0].slice(0, 252)}...`;
								};
								if (FieldSection[1].length > 1024) {
									FieldSection[1] = `${FieldSection[1].slice(0, 1020)}...`;
								};
								if (DetermineIsNull(FieldSection[2]) == false) {
									if (FieldSection[2] == true || FieldSection[2] == "true") {
										FieldSection[2] = true;
									}
								} else {
									FieldSection[2] = false;
								};
								Output.embeds[0].fields[index] = {
									name: FieldSection[0],
									value: FieldSection[1],
									inline: FieldSection[2]
								};
							};
						});
					};
				}).catch((error) => { })
			]);
		};
	}).catch((error) => { })
]);

/*::::::::
Send
::::::::*/
const RequestPayload = JSON.stringify(Output);
const RequestOption = {
	port: 443,
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Content-Length": RequestPayload.length
	}
};
const NewRequest = NodeJS.HTTPS.request(DiscordWebhookUrl, RequestOption, (result) => {
	console.log(`Status Code: ${result.statusCode}`);
	result.on("data", (delta) => {
		process.stdout.write(delta);
	});
});
NewRequest.on("error", (error) => {
	GitHubAction.Core.setFailed(error);
});
NewRequest.write(RequestPayload);
NewRequest.end();
