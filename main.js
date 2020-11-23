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
	nodeFetch = require("node-fetch"),
	regexpEscape = require("escape-string-regexp");
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
	if (advancedDetermine.isStringSingleLine(variableSystem.join, { allowWhitespace: false }) !== true) {
		throw new TypeError(`Workflow argument "variable_join" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
	};
	if (advancedDetermine.isStringSingleLine(variableSystem.prefix, { allowWhitespace: false }) !== true) {
		throw new TypeError(`Workflow argument "variable_prefix" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
	};
	if (advancedDetermine.isStringSingleLine(variableSystem.suffix, { allowWhitespace: false }) !== true) {
		throw new TypeError(`Workflow argument "variable_suffix" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
	};
	if (advancedDetermine.isStringSingleLine(webhook.identificationNumber, { allowWhitespace: false }) !== true) {
		throw new TypeError(`Workflow argument "webhook_id" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
	};
	if (webhook.identificationNumber.search(/\//gu) !== -1) {
		throw new SyntaxError(`Workflow argument "webhook_id"'s value is not match the require pattern! ([GitHub Action] Send To Discord)`);
	};
	if (advancedDetermine.isStringSingleLine(webhook.token, { allowWhitespace: false }) !== true) {
		throw new TypeError(`Workflow argument "webhook_token" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
	};
	if (webhook.token.search(/\//gu) !== -1) {
		throw new SyntaxError(`Workflow argument "webhook_token"'s value is not match the require pattern! ([GitHub Action] Send To Discord)`);
	};
	let delta = {};
	if (advancedDetermine.isBoolean(configuration, { allowStringify: true }) === true && configuration === "false") {
		delta = require("./wactca.js")();
	} else if (advancedDetermine.isStringifyJSON(configuration) !== false) {
		githubAction.core.info(`Construct configuration argument (stage MCA). ([GitHub Action] Send To Discord)`);
		let data = JSON.parse(configuration);
		githubAction.core.debug(`Configuration Argument (Stage MCA): ${JSON.stringify(data)} ([GitHub Action] Send To Discord)`);
		delta = data;
	} else if (advancedDetermine.isStringSingleLine(configuration) === true && configuration.search(/\.\.\//gu) === -1 && configuration.search(/\.(jsonc?)|(ya?ml)$/gu) !== -1) {
		delta = await require("./xca.js")(configuration);
	} else {
		throw new SyntaxError(`Workflow argument "configuration"'s value is not match the require pattern! ([GitHub Action] Send To Discord)`);
	};
	delta = require("./aca1.js")(delta);
	githubAction.core.info(`Import variable list. ([GitHub Action] Send To Discord)`);
	variableSystem.list = {
		external: githubAction.core.getInput(`variable_list_external`),
		payload: githubAction.github.context.payload
	};
	githubAction.core.info(`Analysis external variable list. ([GitHub Action] Send To Discord)`);
	switch (advancedDetermine.isString(variableSystem.list.external)) {
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
		case false:
		default:
			throw new TypeError(`Argument "variable_list_external" must be type of object JSON! ([GitHub Action] Send To Discord)`);
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
			new RegExp(
				regexpEscape(`${variableSystem.prefix}payload${variableSystem.join}${keyPayload}${variableSystem.suffix}`),
				"gu"
			),
			variableSystem.list.payload[keyPayload]
		);
	});
	Object.keys(variableSystem.list.external).forEach((keyExternal) => {
		variableReplace(
			new RegExp(
				regexpEscape(`${variableSystem.prefix}external${variableSystem.join}${keyExternal}${variableSystem.suffix}`),
				"gu"
			),
			variableSystem.list.external[keyExternal]
		);
	});
	delta = require("./aca2.js")(delta);
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
				"User-Agent": `NodeJS/${process.version.replace(/^v/giu, "")} node-fetch/2.6.1 GitHubAction.SendToDiscord(@hugoalh)/3.1.0`
			},
			method: "POST",
			redirect: "follow"
		}
	);
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
	githubAction.core.error(error);
	process.exit(1);
});
