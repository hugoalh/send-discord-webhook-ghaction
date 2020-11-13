/*==================
[GitHub Action] Send To Discord - Workflow Argument Convert To Configuration Argument
	Language:
		NodeJS/12.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	githubAction = {
		core: require("@actions/core")
	};
function wactca() {
	let result = {};
	githubAction.core.info(`Import workflow argument (stage WACTCA 1). ([GitHub Action] Send To Discord)`);
	let avatarUrl = githubAction.core.getInput("webhook_avatarurl"),
		content = githubAction.core.getInput("message_text"),
		tts = githubAction.core.getInput("message_usetexttospeech"),
		username = githubAction.core.getInput("webhook_name");
	githubAction.core.info(`Analysis workflow argument (stage WACTCA 1). ([GitHub Action] Send To Discord)`);
	if (advancedDetermine.isBoolean(tts, { allowStringify: true }) !== true) {
		throw new TypeError(`Workflow argument "message_usetexttospeech" must be type of boolean! ([GitHub Action] Send To Discord)`);
	};
	githubAction.core.info(`Construct configuration argument (stage WACTCA 1). ([GitHub Action] Send To Discord)`);
	if (advancedDetermine.isString(avatarUrl) === true) {
		result.avatar_url = avatarUrl;
	};
	if (advancedDetermine.isString(content) === true) {
		result.content = content;
	};
	result.tts = (tts === "true");
	if (advancedDetermine.isString(username) === true) {
		result.username = username;
	};
	githubAction.core.info(`Import and analysis workflow argument (stage WACTCA 2), and construct configuration argument (stage WACTCA 2). ([GitHub Action] Send To Discord)`);
	let embedAuthorAvatarUrl = githubAction.core.getInput("message_embed_authoravatarurl"),
		embedAuthorName = githubAction.core.getInput("message_embed_authorname"),
		embedAuthorUrl = githubAction.core.getInput("message_embed_authorurl"),
		embedColor = githubAction.core.getInput("message_embed_colour"),
		embedDescription = githubAction.core.getInput("message_embed_description"),
		embedFooterIconUrl = githubAction.core.getInput("message_embed_footericonurl"),
		embedFooterText = githubAction.core.getInput("message_embed_footertext"),
		embedImageUrl = githubAction.core.getInput("message_embed_imageurl"),
		embedThumbnailUrl = githubAction.core.getInput("message_embed_thumbnailurl"),
		embedTitle = githubAction.core.getInput("message_embed_title"),
		embedTitleUrl = githubAction.core.getInput("message_embed_titleurl"),
		embedVideoUrl = githubAction.core.getInput("message_embed_videourl");
	let embedFields = [];
	for (let index = 0; index < 25; index++) {
		let key = githubAction.core.getInput(`message_embed_field_${index}_key`),
			value = githubAction.core.getInput(`message_embed_field_${index}_value`),
			isInline = githubAction.core.getInput(`message_embed_field_${index}_isinline`);
		if (advancedDetermine.isBoolean(isInline, { allowStringify: true }) !== true) {
			throw new TypeError(`Workflow argument "message_embed_field_${index}_isinline" must be type of boolean! ([GitHub Action] Send To Discord)`);
		};
		if (advancedDetermine.isString(key) === true && advancedDetermine.isString(value) === true) {
			embedFields.push(
				{
					name: key,
					value: value,
					inline: (isInline === "true")
				}
			);
		} else {
			githubAction.core.debug(`Message embed field #${index} is empty. ([GitHub Action] Send To Discord)`);
		};
	};
	if (
		advancedDetermine.isString(embedAuthorAvatarUrl) === true ||
		advancedDetermine.isString(embedAuthorName) === true ||
		advancedDetermine.isString(embedAuthorUrl) === true ||
		advancedDetermine.isString(embedColor) === true ||
		advancedDetermine.isString(embedDescription) === true ||
		advancedDetermine.isString(embedFooterText) === true ||
		advancedDetermine.isString(embedImageUrl) === true ||
		advancedDetermine.isString(embedThumbnailUrl) === true ||
		advancedDetermine.isString(embedTitle) === true ||
		advancedDetermine.isString(embedTitleUrl) === true ||
		advancedDetermine.isString(embedVideoUrl) === true ||
		advancedDetermine.isArray(embedFields) === true
	) {
		result.embeds = [{}];
		if (
			advancedDetermine.isString(embedAuthorAvatarUrl) === true ||
			advancedDetermine.isString(embedAuthorName) === true ||
			advancedDetermine.isString(embedAuthorUrl) === true
		) {
			result.embeds[0].author = {};
			if (advancedDetermine.isString(embedAuthorAvatarUrl) === true) {
				result.embeds[0].author.icon_url = embedAuthorAvatarUrl;
			};
			if (advancedDetermine.isString(embedAuthorName) === true) {
				result.embeds[0].author.name = embedAuthorName;
			};
			if (advancedDetermine.isString(embedAuthorUrl) === true) {
				result.embeds[0].author.url = embedAuthorUrl;
			};
		};
		if (advancedDetermine.isString(embedColor) === true) {
			result.embeds[0].color = embedColor;
		};
		if (advancedDetermine.isString(embedDescription) === true) {
			result.embeds[0].description = embedDescription;
		};
		if (
			advancedDetermine.isString(embedFooterText) === true
		) {
			result.embeds[0].footer = {};
			if (advancedDetermine.isString(embedFooterIconUrl) === true) {
				result.embeds[0].footer.icon_url = embedFooterIconUrl;
			};
			if (advancedDetermine.isString(embedFooterText) === true) {
				result.embeds[0].footer.text = embedFooterText;
			};
		};
		if (advancedDetermine.isString(embedImageUrl) === true) {
			result.embeds[0].image = {
				url: embedImageUrl
			};
		};
		if (advancedDetermine.isString(embedThumbnailUrl) === true) {
			result.embeds[0].thumbnail = {
				url: embedThumbnailUrl
			};
		};
		if (advancedDetermine.isString(embedTitle) === true) {
			result.embeds[0].title = embedTitle;
		};
		if (advancedDetermine.isString(embedTitleUrl) === true) {
			result.embeds[0].url = embedTitleUrl;
		};
		if (advancedDetermine.isString(embedVideoUrl) === true) {
			result.embeds[0].video = {
				url: embedVideoUrl
			};
		};
		if (advancedDetermine.isArray(embedFields) === true) {
			result.embeds[0].fields = embedFields;
		};
	};
	githubAction.core.debug(`Configuration Argument (Stage WACTCA): ${JSON.stringify(result)} ([GitHub Action] Send To Discord)`);
	return result;
};
module.exports = wactca;
