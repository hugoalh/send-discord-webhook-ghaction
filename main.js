/*==================
[GitHub Action] Send To Discord
	Language:
		NodeJS/12.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	githubAction = {
		core: require("@actions/core"),
		github: require("@actions/github")
	},
	jsonFlatten = require("flat").flatten,
	nodeFetch = require("node-fetch");
(async () => {
	githubAction.core.info(`Import workflow argument (stage I). ([GitHub Action] Send To Discord)`);
	let configuration = githubAction.core.getInput("configuration"),
		variableSystem = {
			join: githubAction.core.getInput("variable_join"),
			prefix: githubAction.core.getInput("variable_prefix"),
			suffix: githubAction.core.getInput("variable_suffix")
		},
		webhook = {
			identificationNumber: githubAction.core.getInput("webhook_id"),
			token: githubAction.core.getInput("webhook_token")
		};
	githubAction.core.info(`Analysis workflow argument (stage I). ([GitHub Action] Send To Discord)`);
	if (advancedDetermine.isString(configuration) !== true) {
		throw new TypeError(`Workflow argument "configuration" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
	};
	if (advancedDetermine.isString(variableSystem.join) !== true) {
		throw new TypeError(`Workflow argument "variable_join" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
	};
	if (advancedDetermine.isString(variableSystem.prefix) !== true) {
		throw new TypeError(`Workflow argument "variable_prefix" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
	};
	if (advancedDetermine.isString(variableSystem.suffix) !== true) {
		throw new TypeError(`Workflow argument "variable_suffix" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
	};
	if (advancedDetermine.isString(webhook.identificationNumber) !== true) {
		throw new TypeError(`Workflow argument "webhook_id" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
	};
	if (advancedDetermine.isString(webhook.token) !== true) {
		throw new TypeError(`Workflow argument "webhook_token" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
	};
	let delta;
	if (configuration.toLowerCase() === "false") {
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
		delta = result;
	} else if (advancedDetermine.isStringifyJSON(configuration) !== false) {
		githubAction.core.info(`Construct configuration argument (stage MCA). ([GitHub Action] Send To Discord)`);
		let data = JSON.parse(configuration);
		githubAction.core.debug(`Configuration Argument (Stage MCA): ${JSON.stringify(data)} ([GitHub Action] Send To Discord)`);
		delta = require("./aca1.js")(data);
	} else if (configuration.search(/[\n\r]/gu) === -1 && configuration.search(/\.\.\//gu) === -1 && configuration.search(/\.(jsonc?)|(ya?ml)$/gu) !== -1) {
		githubAction.core.info(`Import workflow argument (stage XCA). ([GitHub Action] Send To Discord)`);
		let githubToken = githubAction.core.getInput("github_token");
		githubAction.core.info(`Analysis workflow argument (stage XCA). ([GitHub Action] Send To Discord)`);
		if (advancedDetermine.isString(githubToken) === false) {
			throw new TypeError(`Workflow argument "github_token" must be type of string! ([GitHub Action] Send To Discord)`);
		};
		githubAction.core.info(`Send network request to GitHub. ([GitHub Action] Send To Discord)`);
		const octokit = githubAction.github.getOctokit(githubToken);
		let [repositoryOwner, repositoryName] = process.env.GITHUB_REPOSITORY.split("/");
		let data = await octokit.repos.getContent({
			owner: repositoryOwner,
			path: configuration,
			repo: repositoryName
		}).catch((error) => {
			throw error;
		});
		githubAction.core.info(`Receive network response from GitHub. ([GitHub Action] Send To Discord)`);
		if (data.status !== 200) {
			githubAction.core.warning(`Receive status code ${data.status}! May cause error in the beyond. ([GitHub Action] Send To Discord)`);
		};
		githubAction.core.info(`Analysis network response from GitHub. ([GitHub Action] Send To Discord)`);
		let content;
		switch (data.data.encoding) {
			case "base64":
				content = Buffer.from(data.data.content).toString();
				break;
			case "utf8":
			case "utf-8":
				content = data.data.content;
				break;
			default:
				throw new Error(`File is not exist, or using unsupported encoding! ([GitHub Action] Send To Discord)`);
		};
		githubAction.core.info(`Construct configuration argument (stage XCA). ([GitHub Action] Send To Discord)`);
		const dynamicRequire = require("./dynamicrequire.js");
		let result;
		if (configuration.search(/\.json$/gu) !== -1) {
			result = JSON.parse(content);
		} else if (configuration.search(/\.jsonc$/gu) !== -1) {
			const JSONC = dynamicRequire("jsonc");
			result = JSONC.parse(content);
		} else {
			const YAML = dynamicRequire("yaml");
			result = YAML.parse(content);
		};
		githubAction.core.debug(`Configuration Argument (Stage XCA): ${JSON.stringify(result)} ([GitHub Action] Send To Discord)`);
		delta = require("./aca1.js")(result);
	} else {
		throw new SyntaxError(`Workflow argument "configuration"'s value is not match the require pattern! ([GitHub Action] Send To Discord)`);
	};
	githubAction.core.info(`Import variable list. ([GitHub Action] Send To Discord)`);
	variableSystem.list = {
		external: githubAction.core.getInput(`variable_list_external`),
		payload: githubAction.github.context.payload
	};
	githubAction.core.info(`Analysis external variable list. ([GitHub Action] Send To Discord)`);
	switch (advancedDetermine.isString(variableSystem.list.external)) {
		case false:
			throw new TypeError(`Argument "variable_list_external" must be type of object JSON! ([GitHub Action] Send To Discord)`);
		case null:
			githubAction.core.info(`External variable list is empty. ([GitHub Action] Send To Discord)`);
			variableSystem.list.external = {};
			break;
		case true:
			if (advancedDetermine.isStringifyJSON(variableSystem.list.external) === false) {
				throw new TypeError(`Argument "variable_list_external" must be type of object JSON! ([GitHub Action] Send To Discord)`);
			};
			variableSystem.list.external = JSON.parse(variableSystem.list.external);
			break;
		default:
			throw new Error();
	};
	githubAction.core.info(`Tokenize variable list. ([GitHub Action] Send To Discord)`);
	variableSystem.list.external = jsonFlatten(
		variableSystem.list.external,
		{
			delimiter: variableSystem.join
		}
	);
	variableSystem.list.payload = jsonFlatten(
		variableSystem.list.payload,
		{
			delimiter: variableSystem.join
		}
	);
	githubAction.core.info(`Replace variable in the data. ([GitHub Action] Send To Discord)`);
	function variableReplace(variableKey, variableValue) {
		if (advancedDetermine.isString(delta.content) === true) {
			delta.content = delta.content.replace(variableKey, variableValue);
		};
		if (advancedDetermine.isString(delta.username) === true) {
			delta.username = delta.username.replace(variableKey, variableValue);
		};
		if (advancedDetermine.isString(delta.avatar_url) === true) {
			delta.avatar_url = delta.avatar_url.replace(variableKey, variableValue);
		};
		if (advancedDetermine.isArray(delta.embeds) === true) {
			delta.embeds.forEach((embed, indexEmbed) => {
				if (advancedDetermine.isString(delta.embeds[indexEmbed].title) === true) {
					delta.embeds[indexEmbed].title = delta.embeds[indexEmbed].title.replace(variableKey, variableValue);
				};
				if (advancedDetermine.isString(delta.embeds[indexEmbed].description) === true) {
					delta.embeds[indexEmbed].description = delta.embeds[indexEmbed].description.replace(variableKey, variableValue);
				};
				if (advancedDetermine.isString(delta.embeds[indexEmbed].url) === true) {
					delta.embeds[indexEmbed].url = delta.embeds[indexEmbed].url.replace(variableKey, variableValue);
				};
				if (advancedDetermine.isJSON(delta.embeds[indexEmbed].footer) === true) {
					if (advancedDetermine.isString(delta.embeds[indexEmbed].footer.text) === true) {
						delta.embeds[indexEmbed].footer.text = delta.embeds[indexEmbed].footer.text.replace(variableKey, variableValue);
					};
					if (advancedDetermine.isString(delta.embeds[indexEmbed].footer.icon_url) === true) {
						delta.embeds[indexEmbed].footer.icon_url = delta.embeds[indexEmbed].footer.icon_url.replace(variableKey, variableValue);
					};
				};
				if (advancedDetermine.isJSON(delta.embeds[indexEmbed].image) === true) {
					if (advancedDetermine.isString(delta.embeds[indexEmbed].image.url) === true) {
						delta.embeds[indexEmbed].image.url = delta.embeds[indexEmbed].image.url.replace(variableKey, variableValue);
					};
				};
				if (advancedDetermine.isJSON(delta.embeds[indexEmbed].thumbnail) === true) {
					if (advancedDetermine.isString(delta.embeds[indexEmbed].thumbnail.url) === true) {
						delta.embeds[indexEmbed].thumbnail.url = delta.embeds[indexEmbed].thumbnail.url.replace(variableKey, variableValue);
					};
				};
				if (advancedDetermine.isJSON(delta.embeds[indexEmbed].video) === true) {
					if (advancedDetermine.isString(delta.embeds[indexEmbed].video.url) === true) {
						delta.embeds[indexEmbed].video.url = delta.embeds[indexEmbed].video.url.replace(variableKey, variableValue);
					};
				};
				if (advancedDetermine.isJSON(delta.embeds[indexEmbed].author) === true) {
					if (advancedDetermine.isString(delta.embeds[indexEmbed].author.name) === true) {
						delta.embeds[indexEmbed].author.name = delta.embeds[indexEmbed].author.name.replace(variableKey, variableValue);
					};
					if (advancedDetermine.isString(delta.embeds[indexEmbed].author.url) === true) {
						delta.embeds[indexEmbed].author.url = delta.embeds[indexEmbed].author.url.replace(variableKey, variableValue);
					};
					if (advancedDetermine.isString(delta.embeds[indexEmbed].author.icon_url) === true) {
						delta.embeds[indexEmbed].author.icon_url = delta.embeds[indexEmbed].author.icon_url.replace(variableKey, variableValue);
					};
				};
				if (advancedDetermine.isArray(delta.embeds[indexEmbed].fields) === true) {
					delta.embeds[indexEmbed].fields.forEach((field, indexField) => {
						if (advancedDetermine.isJSON(delta.embeds[indexEmbed].fields[indexField]) === true) {
							if (advancedDetermine.isString(delta.embeds[indexEmbed].fields[indexField].name) === true) {
								delta.embeds[indexEmbed].fields[indexField].name = delta.embeds[indexEmbed].fields[indexField].name.replace(variableKey, variableValue);
							};
							if (advancedDetermine.isString(delta.embeds[indexEmbed].fields[indexField].value) === true) {
								delta.embeds[indexEmbed].fields[indexField].value = delta.embeds[indexEmbed].fields[indexField].value.replace(variableKey, variableValue);
							};
						};
					});
				};
			});
		};
	};
	Object.keys(variableSystem.list.payload).forEach((keyPayload) => {
		variableReplace(
			new RegExp(`${variableSystem.prefix}payload${variableSystem.join}${keyPayload}${variableSystem.suffix}`, "gu"),
			variableSystem.list.payload[keyPayload]
		);
	});
	Object.keys(variableSystem.list.external).forEach((keyExternal) => {
		variableReplace(
			new RegExp(`${variableSystem.prefix}external${variableSystem.join}${keyExternal}${variableSystem.suffix}`, "gu"),
			variableSystem.list.external[keyExternal]
		);
	});



	// TODO
	githubAction.core.debug(`Construct payload content. ([GitHub Action] Send To Discord)`);
	let output = {
		allowed_mentions: {
			parse: [
				"roles",
				"users",
				"everyone"
			]
		}
	};
	if (advancedDetermine.isBoolean(inputCannotVariable.messageUseTextToSpeech, { allowStringify: true }) !== true) {
		throw new TypeError(`Argument "message_usetexttospeech" must be type of boolean! ([GitHub Action] Send To Discord)`);
	};
	output.tts = (inputCannotVariable.messageUseTextToSpeech === "true");
	if (advancedDetermine.isString(inputCanVariable.webhookName) === true && inputCanVariable.webhookName.length >= 2 && inputCanVariable.webhookName.length <= 32) {
		output.username = inputCanVariable.webhookName;
	};
	if (advancedDetermine.isString(inputCanVariable.webhookAvatarUrl) === true) {
		output.avatar_url = inputCanVariable.webhookAvatarUrl;
	};
	if (advancedDetermine.isString(inputCanVariable.messageText) === true) {
		if (inputCanVariable.messageText.length > 2000) {
			inputCanVariable.messageText = `${inputCanVariable.messageText.slice(0, 1996)}...`;
		};
		output.content = inputCanVariable.messageText;
	};
	if (advancedDetermine.isString(inputCanVariable.messageEmbedAuthorName) === true ||
		advancedDetermine.isString(inputCanVariable.messageEmbedTitle) === true ||
		advancedDetermine.isString(inputCanVariable.messageEmbedDescription) === true ||
		advancedDetermine.isString(inputCanVariable.messageEmbedThumbnailUrl) === true ||
		advancedDetermine.isString(inputCanVariable.messageEmbedImageUrl) === true ||
		advancedDetermine.isString(inputCanVariable.messageEmbedVideoUrl) === true ||
		advancedDetermine.isString(inputMessageEmbedFields) === true ||
		advancedDetermine.isString(inputCanVariable.messageEmbedFooterText) === true
	) {
		output.embeds = [{}];
		if (advancedDetermine.isString(inputCannotVariable.messageEmbedColour) !== true) {
			throw new TypeError(`Argument "message_embed_colour" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
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
				if (inputCannotVariable.messageEmbedColour.search(/^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/u) !== 0) {
					throw new SyntaxError(`Argument "message_embed_colour"'s value is not an expected colour scheme! Read the documentation for more information. ([GitHub Action] Send To Discord)`);
				};
				inputCannotVariable.messageEmbedColour = inputCannotVariable.messageEmbedColour.split(",");
				colourRGB = [
					Number(inputCannotVariable.messageEmbedColour[0]),
					Number(inputCannotVariable.messageEmbedColour[1]),
					Number(inputCannotVariable.messageEmbedColour[2])
				];
				colourRGB.forEach((element) => {
					if (
						advancedDetermine.isNumberPositiveInteger(element) !== true ||
						element > 255
					) {
						throw new RangeError(`Argument "message_embed_colour"'s value is not a RGB standard! Read the documentation for more information. ([GitHub Action] Send To Discord)`);
					};
				});
				break;
		};
		output.embeds[0].color = colourRGB[0] * 65536 + colourRGB[1] * 256 + colourRGB[2];
		if (advancedDetermine.isString(inputCanVariable.messageEmbedAuthorName) === true) {
			if (inputCanVariable.messageEmbedAuthorName.length > 256) {
				inputCanVariable.messageEmbedAuthorName = `${inputCanVariable.messageEmbedAuthorName.slice(0, 252)}...`;
			};
			output.embeds[0].author = {
				name: inputCanVariable.messageEmbedAuthorName
			};
			if (advancedDetermine.isString(inputCanVariable.messageEmbedAuthorAvatarUrl) === true) {
				output.embeds[0].author.icon_url = inputCanVariable.messageEmbedAuthorAvatarUrl;
			};
			if (advancedDetermine.isString(inputCanVariable.messageEmbedAuthorUrl) === true) {
				output.embeds[0].author.url = inputCanVariable.messageEmbedAuthorUrl;
			};
		};
		if (advancedDetermine.isString(inputCanVariable.messageEmbedTitle) === true) {
			if (inputCanVariable.messageEmbedTitle.length > 256) {
				inputCanVariable.messageEmbedTitle = `${inputCanVariable.messageEmbedTitle.slice(0, 252)}...`;
			};
			output.embeds[0].title = inputCanVariable.messageEmbedTitle;
			if (advancedDetermine.isString(inputCanVariable.messageEmbedTitleUrl) === true) {
				output.embeds[0].url = inputCanVariable.messageEmbedTitleUrl;
			};
		};
		if (advancedDetermine.isString(inputCanVariable.messageEmbedDescription) === true) {
			if (inputCanVariable.messageEmbedDescription.length > 2048) {
				inputCanVariable.messageEmbedDescription = `${inputCanVariable.messageEmbedDescription.slice(0, 2044)}...`;
			};
			output.embeds[0].description = inputCanVariable.messageEmbedDescription;
		};
		if (advancedDetermine.isString(inputCanVariable.messageEmbedFooterText) === true) {
			if (inputCanVariable.messageEmbedFooterText.length > 2048) {
				inputCanVariable.messageEmbedFooterText = `${inputCanVariable.messageEmbedFooterText.slice(0, 2044)}...`;
			};
			output.embeds[0].footer = {
				text: inputCanVariable.messageEmbedFooterText
			};
			if (advancedDetermine.isString(inputCanVariable.messageEmbedFooterIconUrl) === true) {
				output.embeds[0].footer.icon_url = inputCanVariable.messageEmbedFooterIconUrl;
			};
		};
		if (advancedDetermine.isString(inputCanVariable.messageEmbedImageUrl) === true) {
			output.embeds[0].image = {
				url: inputCanVariable.messageEmbedImageUrl
			};
		};
		if (advancedDetermine.isString(inputCanVariable.messageEmbedThumbnailUrl) === true) {
			output.embeds[0].thumbnail = {
				url: inputCanVariable.messageEmbedThumbnailUrl
			};
		};
		if (advancedDetermine.isString(inputCanVariable.messageEmbedVideoUrl) === true) {
			output.embeds[0].video = {
				url: inputCanVariable.messageEmbedVideoUrl
			};
		};
		inputMessageEmbedFields.forEach((field, index) => {
			if (advancedDetermine.isString(field.name) === true) {
				if (field.name.length > 256) {
					inputMessageEmbedFields[index].name = `${field.name.slice(0, 252)}...`;
				};
			} else {
				inputMessageEmbedFields[index].name = "-";
			};
			if (advancedDetermine.isString(field.value) === true) {
				if (field.value.length > 1024) {
					inputMessageEmbedFields[index].value = `${field.value.slice(0, 1020)}...`;
				};
			} else {
				inputMessageEmbedFields[index].value = "-";
			};
		});
		output.embeds[0].fields = inputMessageEmbedFields;
	};
	githubAction.core.debug(`Finalize payload content. ([GitHub Action] Send To Discord)`);
	githubAction.core.debug(`Export payload. ([GitHub Action] Send To Discord)`);
	let requestPayload = JSON.stringify(output);
	githubAction.core.debug(`Send network request to Discord. ([GitHub Action] Send To Discord)`);
	nodeFetch(
		`https://discord.com/api/webhooks/${webhook.identificationNumber}/${webhook.token}`,
		{
			body: requestPayload,
			follow: 5,
			headers: {
				"Content-Type": "application/json",
				"Content-Length": requestPayload.length,
				"User-Agent": `NodeJS/${process.version.replace(/^v/giu, "")} node-fetch/2.6.1 GitHubAction.SendToDiscord(@hugoalh)/2.1.0`
			},
			method: "POST",
			redirect: "follow"
		}
	).catch((error) => {
		throw error;
	}).then((response) => {
		if (Math.floor(Number(response.status) / 100) !== 2) {
			throw new Error(`Status Code: ${response.status} ([GitHub Action] Send To Discord)`);
		};
		githubAction.core.debug(`Status Code: ${response.status} ([GitHub Action] Send To Discord)`);
	});
})();
