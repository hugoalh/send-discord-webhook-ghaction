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
				content = Buffer.from(data.data.content, "base64").toString();
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
	githubAction.core.info(`Analysis configuration argument (stage 2). ([GitHub Action] Send To Discord)`);
	if (advancedDetermine.isString(delta.content) === true) {
		if (delta.content.length > 2000) {
			delta.content = `${delta.content.slice(0, 1996)}...`;
			githubAction.core.isDebug(`Content: ${delta.content} ([GitHub Action] Send To Discord)`);
		};
	};
	if (advancedDetermine.isString(delta.username) === true) {
		if (delta.username.length < 2 || delta.username.length > 32) {
			githubAction.core.warning(`Configuration argument "username"'s length must larger than 1 and smaller than 33! Ignored this key. ([GitHub Action] Send To Discord)`);
			delete delta.username;
		};
	};
	if (advancedDetermine.isArray(delta.embeds) === true) {
		let characterCount = 0;
		delta.embeds.forEach((embed, indexEmbed) => {
			if (advancedDetermine.isString(delta.embeds[indexEmbed].title) === true) {
				if (delta.embeds[indexEmbed].title.length > 256) {
					delta.embeds[indexEmbed].title = `${delta.embeds[indexEmbed].title.slice(0, 253)}...`;
					githubAction.core.isDebug(`Embed#${indexEmbed} Title: ${delta.embeds[indexEmbed].title} ([GitHub Action] Send To Discord)`);
				};
				characterCount += delta.embeds[indexEmbed].title.length;
			};
			if (advancedDetermine.isString(delta.embeds[indexEmbed].description) === true) {
				if (delta.embeds[indexEmbed].description.length > 2048) {
					delta.embeds[indexEmbed].description = `${delta.embeds[indexEmbed].description.slice(0, 2045)}...`;
					githubAction.core.isDebug(`Embed#${indexEmbed} Description: ${delta.embeds[indexEmbed].description} ([GitHub Action] Send To Discord)`);
				};
				characterCount += delta.embeds[indexEmbed].description.length;
			};
			if (advancedDetermine.isString(delta.embeds[indexEmbed].color) === true) {
				let colorNode = delta.embeds[indexEmbed].color.toLowerCase(),
					colorRGB = [];
				switch (colorNode) {
					case "random":
						colorRGB = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
						break;
					case "discordblurple":
						colorRGB = [114, 137, 218];
						break;
					case "white":
						colorRGB = [255, 255, 255];
						break;
					case "black":
						colorRGB = [0, 0, 0];
						break;
					case "discordgreyple":
						colorRGB = [153, 170, 181];
						break;
					case "discorddark":
						colorRGB = [44, 47, 51];
						break;
					case "discordblack":
						colorRGB = [35, 39, 42];
						break;
					default:
						if (colorNode.search(/^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/u) !== 0) {
							throw new SyntaxError(`Configuration argument "embed#${indexEmbed}.color"'s value is not an expected colour scheme! Read the documentation for more information. ([GitHub Action] Send To Discord)`);
						};
						colorNode = colorNode.split(",");
						colorRGB = [
							Number(colorNode[0]),
							Number(colorNode[1]),
							Number(colorNode[2])
						];
						colorRGB.forEach((element) => {
							if (
								advancedDetermine.isNumberPositiveInteger(element) !== true ||
								element > 255
							) {
								throw new RangeError(`Configuration argument "embed#${indexEmbed}.color"'s value is not a RGB standard! Read the documentation for more information. ([GitHub Action] Send To Discord)`);
							};
						});
						break;
				};
				delta.embeds[indexEmbed].color = colorRGB[0] * 65536 + colorRGB[1] * 256 + colorRGB[2];
			};
			if (advancedDetermine.isNumberPositiveInteger(delta.embeds[indexEmbed].color) === true) {
				if (delta.embeds[indexEmbed].color > 16777215) {
					throw new RangeError(`Configuration argument "embed#${indexEmbed}.color"'s value is out of range! Read the documentation for more information. ([GitHub Action] Send To Discord)`);
				};
			};
			if (advancedDetermine.isJSON(delta.embeds[indexEmbed].footer) === true) {
				if (advancedDetermine.isString(delta.embeds[indexEmbed].footer.text) === true) {
					if (delta.embeds[indexEmbed].footer.text.length > 2048) {
						delta.embeds[indexEmbed].footer.text = `${delta.embeds[indexEmbed].footer.text.slice(0, 2045)}...`;
						githubAction.core.isDebug(`Embed#${indexEmbed} Footer Text: ${delta.embeds[indexEmbed].footer.text} ([GitHub Action] Send To Discord)`);
					};
					characterCount += delta.embeds[indexEmbed].footer.text.length;
				};
			};
			if (advancedDetermine.isJSON(delta.embeds[indexEmbed].author) === true) {
				if (advancedDetermine.isString(delta.embeds[indexEmbed].author.name) === true) {
					if (delta.embeds[indexEmbed].author.name.length > 256) {
						delta.embeds[indexEmbed].author.name = `${delta.embeds[indexEmbed].author.name.slice(0, 253)}...`;
						githubAction.core.isDebug(`Embed#${indexEmbed} Author Name: ${delta.embeds[indexEmbed].author.name} ([GitHub Action] Send To Discord)`);
					};
					characterCount += delta.embeds[indexEmbed].author.name.length;
				};
			};
			if (advancedDetermine.isArray(delta.embeds[indexEmbed].fields) === true) {
				delta.embeds[indexEmbed].fields.forEach((field, indexField) => {
					if (advancedDetermine.isJSON(delta.embeds[indexEmbed].fields[indexField]) === true) {
						if (advancedDetermine.isString(delta.embeds[indexEmbed].fields[indexField].name) === true) {
							if (delta.embeds[indexEmbed].fields[indexField].name.length > 256) {
								delta.embeds[indexEmbed].fields[indexField].name = `${delta.embeds[indexEmbed].fields[indexField].name.slice(0, 253)}...`;
								githubAction.core.isDebug(`Embed#${indexEmbed} Field#${indexField} Name: ${delta.embeds[indexEmbed].fields[indexField].name} ([GitHub Action] Send To Discord)`);
							};
							characterCount += delta.embeds[indexEmbed].fields[indexField].name.length;
						};
						if (advancedDetermine.isString(delta.embeds[indexEmbed].fields[indexField].value) === true) {
							if (delta.embeds[indexEmbed].fields[indexField].value.length > 1024) {
								delta.embeds[indexEmbed].fields[indexField].value = `${delta.embeds[indexEmbed].fields[indexField].value.slice(0, 1021)}...`;
								githubAction.core.isDebug(`Embed#${indexEmbed} Field#${indexField} Name: ${delta.embeds[indexEmbed].fields[indexField].value} ([GitHub Action] Send To Discord)`);
							};
							characterCount += delta.embeds[indexEmbed].fields[indexField].value.length;
						};
					};
				});
			};
		});
		if (characterCount > 6000) {
			throw new Error(`Characters in all fields of embed title, embed description, embed field name, embed fieldvalue, embed footer text, and embed author name must not exceed 6000 characters in total (restricted by Discord)! ([GitHub Action] Send To Discord)`);
		};
	};
	githubAction.core.info(`Finalize payload content. ([GitHub Action] Send To Discord)`);
	delta.allowed_mentions = {
		parse: [
			"roles",
			"users",
			"everyone"
		]
	};
	githubAction.core.info(`Generate network request payload. ([GitHub Action] Send To Discord)`);
	let requestPayload = JSON.stringify(delta);
	githubAction.core.debug(`Network Request Payload: ${requestPayload} ([GitHub Action] Send To Discord)`);
	githubAction.core.info(`Send network request to Discord. ([GitHub Action] Send To Discord)`);
	let response = await nodeFetch(
		`https://discord.com/api/webhooks/${webhook.identificationNumber}/${webhook.token}`,
		{
			body: requestPayload,
			follow: 5,
			headers: {
				"Content-Type": "application/json",
				"Content-Length": requestPayload.length,
				"User-Agent": `NodeJS/${process.version.replace(/^v/giu, "")} node-fetch/2.6.1 GitHubAction.SendToDiscord(@hugoalh)/3.0.0`
			},
			method: "POST",
			redirect: "follow"
		}
	).catch((error) => {
		throw error;
	});
	githubAction.core.info(`Receive network response from Discord. ([GitHub Action] Send To Discord)`);
	if (response.status !== 200 && response.status !== 204) {
		githubAction.core.warning(`Receive status code ${response.status}! May cause error in the beyond. ([GitHub Action] Send To Discord)`);
	};
	let responseText = await response.text();
	if (response.ok === true) {
		githubAction.core.debug(`${response.status} ${responseText} ([GitHub Action] Send To Discord)`);
	} else {
		throw new Error(`${response.status} ${responseText} ([GitHub Action] Send To Discord)`);
	};
})().catch((error) => {
	throw error;
});
