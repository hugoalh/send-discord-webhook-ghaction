/*==================
[GitHub Action] Send To Discord - Analysis Configuration Argument 2
	Language:
		NodeJS/12.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	githubAction = {
		core: require("@actions/core")
	};
function aca2(delta) {
	githubAction.core.info(`Analysis configuration argument (stage 2). ([GitHub Action] Send To Discord)`);
	if (advancedDetermine.isString(delta.content) === true) {
		if (delta.content.length > 2000) {
			delta.content = `${delta.content.slice(0, 1996)}...`;
			githubAction.core.isDebug(`Content: ${delta.content} ([GitHub Action] Send To Discord)`);
		};
	};
	if (advancedDetermine.isString(delta.username) === true) {
		if (advancedDetermine.isStringSingleLine(delta.username) !== true) {
			throw new TypeError(`Configuration argument "username" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
		};
		if (delta.username.length < 2 || delta.username.length > 32) {
			githubAction.core.warning(`Configuration argument "username"'s length must larger than 1 and smaller than 33! Ignored this key. ([GitHub Action] Send To Discord)`);
			delete delta.username;
		};
	};
	if (advancedDetermine.isString(delta.avatar_url) === true) {
		if (advancedDetermine.isStringSingleLine(delta.avatar_url) !== true) {
			throw new TypeError(`Configuration argument "avatar_url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
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
			if (advancedDetermine.isString(delta.embeds[indexEmbed].url) === true) {
				if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].url) !== true) {
					throw new TypeError(`Configuration argument "embeds#${indexEmbed}.url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
				};
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
							throw new SyntaxError(`Configuration argument "embed#${indexEmbed}.color"'s value is not an expected colour scheme! ([GitHub Action] Send To Discord)`);
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
								throw new RangeError(`Configuration argument "embed#${indexEmbed}.color"'s value is not a RGB standard! ([GitHub Action] Send To Discord)`);
							};
						});
						break;
				};
				delta.embeds[indexEmbed].color = colorRGB[0] * 65536 + colorRGB[1] * 256 + colorRGB[2];
			};
			if (advancedDetermine.isNumberPositiveInteger(delta.embeds[indexEmbed].color) === true) {
				if (delta.embeds[indexEmbed].color > 16777215) {
					throw new RangeError(`Configuration argument "embed#${indexEmbed}.color"'s value is out of range! ([GitHub Action] Send To Discord)`);
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
				if (advancedDetermine.isString(delta.embeds[indexEmbed].footer.icon_url) === true) {
					if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].footer.icon_url) !== true) {
						throw new TypeError(`Configuration argument "embeds#${indexEmbed}.footer.icon_url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
					};
				};
			};
			if (advancedDetermine.isJSON(delta.embeds[indexEmbed].image) === true) {
				if (advancedDetermine.isString(delta.embeds[indexEmbed].image.url) === true) {
					if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].image.url) !== true) {
						throw new TypeError(`Configuration argument "embeds#${indexEmbed}.image.url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
					};
				};
			};
			if (advancedDetermine.isJSON(delta.embeds[indexEmbed].thumbnail) === true) {
				if (advancedDetermine.isString(delta.embeds[indexEmbed].thumbnail.url) === true) {
					if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].thumbnail.url) !== true) {
						throw new TypeError(`Configuration argument "embeds#${indexEmbed}.thumbnail.url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
					};
				};
			};
			if (advancedDetermine.isJSON(delta.embeds[indexEmbed].video) === true) {
				if (advancedDetermine.isString(delta.embeds[indexEmbed].video.url) === true) {
					if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].video.url) !== true) {
						throw new TypeError(`Configuration argument "embeds#${indexEmbed}.video.url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
					};
				};
			};
			if (advancedDetermine.isJSON(delta.embeds[indexEmbed].author) === true) {
				if (advancedDetermine.isString(delta.embeds[indexEmbed].author.name) === true) {
					if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].author.name) !== true) {
						throw new TypeError(`Configuration argument "embeds#${indexEmbed}.author.name" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
					};
					if (delta.embeds[indexEmbed].author.name.length > 256) {
						delta.embeds[indexEmbed].author.name = `${delta.embeds[indexEmbed].author.name.slice(0, 253)}...`;
						githubAction.core.isDebug(`Embed#${indexEmbed} Author Name: ${delta.embeds[indexEmbed].author.name} ([GitHub Action] Send To Discord)`);
					};
					characterCount += delta.embeds[indexEmbed].author.name.length;
				};
				if (advancedDetermine.isString(delta.embeds[indexEmbed].author.url) === true) {
					if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].author.url) !== true) {
						throw new TypeError(`Configuration argument "embeds#${indexEmbed}.author.url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
					};
				};
				if (advancedDetermine.isString(delta.embeds[indexEmbed].author.icon_url) === true) {
					if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].author.icon_url) !== true) {
						throw new TypeError(`Configuration argument "embeds#${indexEmbed}.author.icon_url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
					};
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
		for (let indexEmbed = delta.embeds.length - 1; indexEmbed >= 0; indexEmbed--) {
			if (
				(Object.keys(delta.embeds[indexEmbed]).length === 1 && typeof delta.embeds[indexEmbed].color !== "undefined") ||
				Object.keys(delta.embeds[indexEmbed]).length === 0 ||
				advancedDetermine.isJSON(delta.embeds[indexEmbed]) !== true
			) {
				delta.embeds.splice(indexEmbed - 1, 1);
			};
		};
		if (characterCount > 6000) {
			throw new Error(`Characters in all fields of embed title, embed description, embed field name, embed fieldvalue, embed footer text, and embed author name must not exceed 6000 characters in total (restricted by Discord)! ([GitHub Action] Send To Discord)`);
		};
	};
	if (advancedDetermine.isArray(delta.embeds) === null) {
		delete delta.embeds;
	};
	if (advancedDetermine.isString(delta.content) !== true && advancedDetermine.isArray(delta.embeds) !== true) {
		throw new Error(`Both configuration argument "content" and "embeds" are empty! ([GitHub Action] Send To Discord)`);
	};
	githubAction.core.debug(`Configuration Argument (Stage ACA2): ${JSON.stringify(delta)} ([GitHub Action] Send To Discord)`);
	return delta;
};
module.exports = aca2;
