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
const GitHubAction = {
	Core: require("@actions/core"),
	GitHub: require("@actions/github")
};
const JSONFlatten = require("flat").flatten;
const DiscordWebhook = require("discord.hook");

/*::::::::
Data Handle
::::::::*/
const DiscordWebhookUrl = GitHubAction.Core.getInput("discord_webhook_url");
if (DiscordWebhookUrl.search(/^https:\/\/discordapp.com\/api\/webhooks\/[0-9]+\//u) == -1) {
	GitHubAction.Core.setFailed(`Discord Webhook Url is not from Discord, or invalid.`);
};
const DiscordWebhookUrl_Split = DiscordWebhookUrl.replace(/^https:\/\/discordapp.com\/api\/webhooks\//u, "").split("/");
const DiscordWebhookClient = new DiscordWebhook.Client(DiscordWebhookUrl_Split[0], DiscordWebhookUrl_Split[1]);
var MessageContent = GitHubAction.Core.getInput("message_content");
var MessageVariables = GitHubAction.Core.getInput("message_variables");
if (MessageVariables != "%N/A%") {
	try {
		MessageVariables = JSON.parse(MessageVariables);
		MessageVariables = JSONFlatten(
			MessageVariables,
			{
				overwrite: true
			}
		);
	} catch (error) {
		GitHubAction.Core.setFailed(`Fail to parse message variables: ${error}`);
	};
	if (MessageContent.search(/%(?:[^ ]*)%/gu) != -1) {
		Object.keys(MessageVariables).forEach((value, index) => {
			MessageContent = MessageContent.replace(new RegExp(`%${value}%`, "gu"), MessageVariables[value]);
		});
	};
};
const MessageMode = GitHubAction.Core.getInput("message_mode");
var DiscordWebhookName = GitHubAction.Core.getInput("discord_webhook_name");
var DiscordWebhookAvatarUrl = GitHubAction.Core.getInput("discord_webhook_avatarurl");
const SendJSON = {};
if (DiscordWebhookName != "%N/A%") {
	SendJSON["username"] = DiscordWebhookName;
};
if (DiscordWebhookAvatarUrl != "%N/A%") {
	SendJSON["avatar_url"] = DiscordWebhookAvatarUrl;
};
switch (MessageMode) {
	default:
		GitHubAction.Core.warning(`Invalid message mode "${MessageMode}", will fallback to "text".`);
	case "text":
		SendJSON["content"] = MessageContent;
		break;
	case "embed": case "both":
		try {
			MessageContent = JSON.parse(MessageContent);
		} catch (error) {
			GitHubAction.Core.setFailed(`Fail to parse message content: ${error}`);
		};
		if (typeof MessageContent["Content"] == "string" && MessageContent["Content"].length <= 2000) {
			SendJSON["content"] = MessageContent["Content"];
		};
		const DiscordEmbedContent = new DiscordWebhook.DiscordEmbed();
		if (MessageContent["Title"] && typeof MessageContent["Title"] == "string" && MessageContent["Title"].length <= 256) {
			DiscordEmbedContent.setTitle(MessageContent["Title"]);
		};
		if (MessageContent["Author"] && typeof MessageContent["Author"]["Name"] == "string" && MessageContent["Author"]["Name"].length > 0) {
			if (!MessageContent["Author"]["AvatarUrl"]) {
				MessageContent["Author"]["AvatarUrl"] = "";
			};
			if (!MessageContent["Author"]["Url"]) {
				MessageContent["Author"]["Url"] = "";
			};
			DiscordEmbedContent.setAuthor(MessageContent["Author"]["Name"], MessageContent["Author"]["AvatarUrl"], MessageContent["Author"]["Url"]);
		};
		if (typeof MessageContent["Description"] == "string" && MessageContent["Description"].length <= 2048) {
			DiscordEmbedContent.setDescription(MessageContent["Description"]);
		};
		if (typeof MessageContent["Footer"] == "string" && MessageContent["Footer"].length <= 2048) {
			DiscordEmbedContent.setFooter(MessageContent["Footer"]);
		};
		if (MessageContent["Image"]) {
			DiscordEmbedContent.setImage(MessageContent["Image"]);
		};
		if (MessageContent["Thumbnail"]) {
			DiscordEmbedContent.setThumbnail(MessageContent["Thumbnail"]);
		};
		if (MessageContent["Url"]) {
			DiscordEmbedContent.setURL(MessageContent["Url"]);
		};
		if (Array.isArray(MessageContent["Field"]) == true) {
			for (let index = 0; index < MessageContent["Field"].length && index <= 25; index++) {
				
			}
		};
		var MessageColour = GitHubAction.Core.getInput("message_colour").toUpperCase();
		DiscordEmbedContent.setColor(MessageColour);
		SendJSON["embeds"] = DiscordEmbedContent.embeds;
		break;
};

/*::::::::
Send Data
::::::::*/
DiscordWebhookClient.send(SendJSON);
