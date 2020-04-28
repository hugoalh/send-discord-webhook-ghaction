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

/*::::::::
Data Handle
::::::::*/
var DiscordWebhookUrl = GitHubAction.Core.getInput("discord_webhook_url");
if (DiscordWebhookUrl.search(/^https:\/\/(?:.*)discord/u) == -1) {
	GitHubAction.Core.setFailed(`Discord Webhook Url is not from Discord, or invalid.`);
};
var Mode = GitHubAction.Core.getInput("mode");
if (Mode != "text" && Mode != "embed") {
	GitHubAction.Core.warning(`Invalid mode "${Mode}", fallback to "text".`);
	Mode = "text";
};
var Variables = GitHubAction.Core.getInput("variables");
var Message = GitHubAction.Core.getInput("message");
if (Variables != "%N/A%") {
	try {
		Variables = JSON.parse(Variables);
		Variables = JSONFlatten(
			Variables,
			{
				overwrite: true
			}
		);
	} catch (error) {
		GitHubAction.Core.setFailed(`Fail to parse variables: ${error}`);
	};
	if (Message.search(/%(?:[^ ]*)%/gu) != -1) {
		const VariableList = Object.keys(Variables);
		VariableList.forEach((value, index) => {
			Message = Message.replace(new RegExp(`%${value}%`, "gu"), Variables[value]);
		});
	};
};

/*::::::::
Send Data
::::::::*/

