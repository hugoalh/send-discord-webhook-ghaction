/*==================
[GitHub Action] Send To Discord - Test
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
var DiscordWebhookUrl = "https://discordapp.com/api/webhooks/709711149884768276/ueyzeWxBbt4vHiMVjS4JdKH4FV_8bb1zMhLIgzZWJ180i0YM8LqAZkR8mybsCl3nO23T";
if (DiscordWebhookUrl.search(/^https:\/\/(?:canary.)?discord(?:app)?.com\/api\/webhooks\/[0-9]+\//u) == 0 && DiscordWebhookUrl.search("/github") != (DiscordWebhookUrl.length - "/github".length - 1)) {
	DiscordWebhookUrl = DiscordWebhookUrl.replace(/^https:\/\/(?:canary.)?discord(?:app)?.com\/api\/webhooks\//u, "https://discordapp.com/api/webhooks/");
} else {
	throw new Error(`Invalid Discord webhook url!`);
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
var MessageTTS = false;
if (MessageTTS == true || MessageTTS == "true") {
	Output.tts = true;
} else {
	Output.tts = false;
};
var MessageVariablesJoin = ".";
if (DetermineIsNull(MessageVariablesJoin) == true) {
	MessageVariablesJoin = ".";
};
var MessageVariablesPrefix = "%";
if (DetermineIsNull(MessageVariablesPrefix) == true) {
	MessageVariablesPrefix = "%";
};
var MessageVariablesSuffix = "%";
if (DetermineIsNull(MessageVariablesSuffix) == true) {
	MessageVariablesSuffix = "%";
};
var MessageVariablesList = "{}";
const Input = {
	"DiscordWebhookName": "Webhook Test",
	"DiscordWebhookAvatarUrl": "",
	"MessageText": "A very long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long sentences.",
	"MessageEmbedAuthorName": "hugoalh",
	"MessageEmbedAuthorUrl": "",
	"MessageEmbedAuthorAvatarUrl": "",
	"MessageEmbedTitle": ":wave:",
	"MessageEmbedTitleUrl": "",
	"MessageEmbedDescription": "Hello, world!",
	"MessageEmbedThumbnailUrl": "",
	"MessageEmbedImageUrl": "",
	"MessageEmbedVideoUrl": "",
	"MessageEmbedFields": "1-,-Test-|-2-,-Test-|-3-,-Test",
	"MessageEmbedFooterIconUrl": "",
	"MessageEmbedFooterText": "[GitHub Action] Send To Discord"
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
		throw new Error(`Fail to parse message variables: ${error}`);
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
			}).catch((error) => {
				console.log(`${error}`);
			});
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
					color: 0
				}
			];
			Promise.allSettled([
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input["MessageEmbedAuthorName"]) == false && Input["MessageEmbedAuthorName"].length >= 2 && Input["MessageEmbedAuthorName"].length <= 32) {
						Output.embeds[0].author = {
							name: Input["MessageEmbedAuthorName"]
						};
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
						Output.embeds[0].footer = {
							text: Input["MessageEmbedFooterText"]
						};
						if (DetermineIsNull(Input["MessageEmbedFooterIconUrl"]) == false) {
							Output.embeds[0].footer.icon_url = Input["MessageEmbedFooterIconUrl"];
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input["MessageEmbedImageUrl"]) == false) {
						Output.embeds[0].image = {
							url: Input["MessageEmbedImageUrl"]
						};
					};
					if (DetermineIsNull(Input["MessageEmbedThumbnailUrl"]) == false) {
						Output.embeds[0].thumbnail = {
							url: Input["MessageEmbedThumbnailUrl"]
						};
					};
					if (DetermineIsNull(Input["MessageEmbedVideoUrl"]) == false) {
						Output.embeds[0].video = {
							url: Input["MessageEmbedVideoUrl"]
						};
					};
				}).catch((error) => { }),
				new Promise((resolve, reject) => {
					if (DetermineIsNull(Input["MessageEmbedFields"]) == false) {
						Output.embeds[0].fields = [];
						Input["MessageEmbedFields"].split("-|-", 25).forEach((value, index) => {
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
								Output.embeds[0].fields.push({
									name: FieldSection[0],
									value: FieldSection[1],
									inline: FieldSection[2]
								});
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
	throw new Error(error);
});
NewRequest.write(RequestPayload);
NewRequest.end();
