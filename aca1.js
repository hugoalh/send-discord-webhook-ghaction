/*==================
[GitHub Action] Send To Discord - Analysis Configuration Argument 1
	Language:
		NodeJS/12.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	githubAction = {
		core: require("@actions/core")
	};
function aca1(delta) {
	githubAction.core.info(`Analysis configuration argument (stage 1). ([GitHub Action] Send To Discord)`);
	Object.keys(delta).forEach((key) => {
		if (key !== "content" && key !== "username" && key !== "avatar_url" && key !== "tts" && key !== "embeds") {
			if (key === "file" || key === "payload_json") {
				githubAction.core.warning(`Configuration argument "${key}" is not suitable for this action! Ignored this key. ([GitHub Action] Send To Discord)`);
			} else if (key === "allowed_mentions") {
				githubAction.core.warning(`Configuration argument "${key}" is controll by this action! Ignored this key. ([GitHub Action] Send To Discord)`);
			} else {
				githubAction.core.warning(`Configuration argument "${key}" is invalid! Ignored this key. ([GitHub Action] Send To Discord)`);
			};
			delete delta[key];
		};
	});
	if (typeof delta.content !== "undefined") {
		if (advancedDetermine.isString(delta.content) !== true) {
			throw new TypeError(`Configuration argument "content" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
		};
	};
	if (typeof delta.username !== "undefined") {
		if (advancedDetermine.isStringSingleLine(delta.username) !== true) {
			throw new TypeError(`Configuration argument "username" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
		};
	};
	if (typeof delta.avatar_url !== "undefined") {
		if (advancedDetermine.isStringSingleLine(delta.avatar_url) !== true) {
			throw new TypeError(`Configuration argument "avatar_url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
		};
	};
	if (typeof delta.tts !== "undefined") {
		if (advancedDetermine.isBoolean(delta.tts) !== true) {
			throw new TypeError(`Configuration argument "tts" must be type of boolean! ([GitHub Action] Send To Discord)`);
		};
	};
	if (typeof delta.embeds !== "undefined") {
		if (advancedDetermine.isArray(delta.embeds) === true) {
			if (delta.embeds.length > 10) {
				throw new Error(`Configuration argument "embeds"'s length must not larger than 10! ([GitHub Action] Send To Discord)`);
			};
			delta.embeds.forEach((embed, indexEmbed) => {
				if (advancedDetermine.isJSON(delta.embeds[indexEmbed]) === true) {
					Object.keys(delta.embeds[indexEmbed]).forEach((embedKey) => {
						if (embedKey !== "title" && embedKey !== "description" && embedKey !== "url" && embedKey !== "color" && embedKey !== "footer" && embedKey !== "image" && embedKey !== "thumbnail" && embedKey !== "video" && embedKey !== "author" && embedKey !== "fields") {
							if (embedKey === "type" || embedKey === "provider") {
								githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.${embedKey}" is control by Discord! Ignored this key. ([GitHub Action] Send To Discord)`);
							} else if (embedKey === "timestamp") {
								githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.${embedKey}" is not suitable for this action! Ignored this key. ([GitHub Action] Send To Discord)`);
							} else {
								githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.${embedKey}" is invalid! Ignored this key. ([GitHub Action] Send To Discord)`);
							};
							delete delta.embeds[indexEmbed][embedKey];
						};
					});
					if (typeof delta.embeds[indexEmbed].title !== "undefined") {
						if (advancedDetermine.isString(delta.embeds[indexEmbed].title) !== true) {
							throw new TypeError(`Configuration argument "embeds#${indexEmbed}.title" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
						};
					};
					if (typeof delta.embeds[indexEmbed].description !== "undefined") {
						if (advancedDetermine.isString(delta.embeds[indexEmbed].description) !== true) {
							throw new TypeError(`Configuration argument "embeds#${indexEmbed}.description" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
						};
					};
					if (typeof delta.embeds[indexEmbed].url !== "undefined") {
						if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].url) !== true) {
							throw new TypeError(`Configuration argument "embeds#${indexEmbed}.url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
						};
					};
					if (typeof delta.embeds[indexEmbed].color === "undefined") {
						delta.embeds[indexEmbed].color = "black";
					} else {
						if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].color) !== true && advancedDetermine.isNumberPositiveInteger(delta.embeds[indexEmbed].color) !== true) {
							throw new TypeError(`Configuration argument "embeds#${indexEmbed}.color" must be type of string (non-nullable) or positive integer number! ([GitHub Action] Send To Discord)`);
						};
					};
					if (typeof delta.embeds[indexEmbed].footer !== "undefined") {
						if (advancedDetermine.isJSON(delta.embeds[indexEmbed].footer) === true) {
							Object.keys(delta.embeds[indexEmbed].footer).forEach((embedFooterKey) => {
								if (embedFooterKey !== "text" && embedFooterKey !== "icon_url") {
									if (embedFooterKey === "proxy_icon_url") {
										githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.footer.${embedFooterKey}" is control by Discord! Ignored this key. ([GitHub Action] Send To Discord)`);
									} else {
										githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.footer.${embedFooterKey}" is invalid! Ignored this key. ([GitHub Action] Send To Discord)`);
									};
									delete delta.embeds[indexEmbed].footer[embedFooterKey];
								};
							});
							if (advancedDetermine.isString(delta.embeds[indexEmbed].footer.text) !== true) {
								throw new TypeError(`Configuration argument "embeds#${indexEmbed}.footer.text" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
							};
							if (typeof delta.embeds[indexEmbed].footer.icon_url !== "undefined") {
								if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].footer.icon_url) !== true) {
									throw new TypeError(`Configuration argument "embeds#${indexEmbed}.footer.icon_url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
								};
							};
						} else {
							throw new TypeError(`Configuration argument "embeds#${indexEmbed}.footer" must be type of object JSON (non-nullable)! ([GitHub Action] Send To Discord)`);
						};
					};
					if (typeof delta.embeds[indexEmbed].image !== "undefined") {
						if (advancedDetermine.isJSON(delta.embeds[indexEmbed].image) === true) {
							Object.keys(delta.embeds[indexEmbed].image).forEach((embedImageKey) => {
								if (embedImageKey !== "url") {
									if (embedImageKey === "proxy_url" || embedImageKey === "height" || embedImageKey === "width") {
										githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.image.${embedImageKey}" is control by Discord! Ignored this key. ([GitHub Action] Send To Discord)`);
									} else {
										githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.image.${embedImageKey}" is invalid! Ignored this key. ([GitHub Action] Send To Discord)`);
									};
									delete delta.embeds[indexEmbed].image[embedImageKey];
								};
							});
							if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].image.url) !== true) {
								throw new TypeError(`Configuration argument "embeds#${indexEmbed}.image.url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
							};
						} else {
							throw new TypeError(`Configuration argument "embeds#${indexEmbed}.image" must be type of object JSON (non-nullable)! ([GitHub Action] Send To Discord)`);
						};
					};
					if (typeof delta.embeds[indexEmbed].thumbnail !== "undefined") {
						if (advancedDetermine.isJSON(delta.embeds[indexEmbed].thumbnail) === true) {
							Object.keys(delta.embeds[indexEmbed].thumbnail).forEach((embedThumbnailKey) => {
								if (embedThumbnailKey !== "url") {
									if (embedThumbnailKey === "proxy_url" || embedThumbnailKey === "height" || embedThumbnailKey === "width") {
										githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.thumbnail.${embedThumbnailKey}" is control by Discord! Ignored this key. ([GitHub Action] Send To Discord)`);
									} else {
										githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.thumbnail.${embedThumbnailKey}" is invalid! Ignored this key. ([GitHub Action] Send To Discord)`);
									};
									delete delta.embeds[indexEmbed].thumbnail[embedThumbnailKey];
								};
							});
							if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].thumbnail.url) !== true) {
								throw new TypeError(`Configuration argument "embeds#${indexEmbed}.thumbnail.url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
							};
						} else {
							throw new TypeError(`Configuration argument "embeds#${indexEmbed}.thumbnail" must be type of object JSON (non-nullable)! ([GitHub Action] Send To Discord)`);
						};
					};
					if (typeof delta.embeds[indexEmbed].video !== "undefined") {
						if (advancedDetermine.isJSON(delta.embeds[indexEmbed].video) === true) {
							Object.keys(delta.embeds[indexEmbed].video).forEach((embedVideoKey) => {
								if (embedVideoKey !== "url") {
									if (embedVideoKey === "height" || embedVideoKey === "width") {
										githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.video.${embedVideoKey}" is control by Discord! Ignored this key. ([GitHub Action] Send To Discord)`);
									} else {
										githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.video.${embedVideoKey}" is invalid! Ignored this key. ([GitHub Action] Send To Discord)`);
									};
									delete delta.embeds[indexEmbed].video[embedVideoKey];
								};
							});
							if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].video.url) !== true) {
								throw new TypeError(`Configuration argument "embeds#${indexEmbed}.video.url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
							};
						} else {
							throw new TypeError(`Configuration argument "embeds#${indexEmbed}.video" must be type of object JSON (non-nullable)! ([GitHub Action] Send To Discord)`);
						};
					};
					if (typeof delta.embeds[indexEmbed].author !== "undefined") {
						if (advancedDetermine.isJSON(delta.embeds[indexEmbed].author) === true) {
							Object.keys(delta.embeds[indexEmbed].author).forEach((embedAuthorKey) => {
								if (embedAuthorKey !== "name" || embedAuthorKey !== "url" || embedAuthorKey !== "icon_url") {
									if (embedAuthorKey === "proxy_icon_url") {
										githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.author.${embedAuthorKey}" is control by Discord! Ignored this key. ([GitHub Action] Send To Discord)`);
									} else {
										githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.author.${embedAuthorKey}" is invalid! Ignored this key. ([GitHub Action] Send To Discord)`);
									};
									delete delta.embeds[indexEmbed].author[embedAuthorKey];
								};
							});
							if (typeof delta.embeds[indexEmbed].author.name !== "undefined") {
								if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].author.name) !== true) {
									throw new TypeError(`Configuration argument "embeds#${indexEmbed}.author.name" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
								};
							};
							if (typeof delta.embeds[indexEmbed].author.url !== "undefined") {
								if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].author.url) !== true) {
									throw new TypeError(`Configuration argument "embeds#${indexEmbed}.author.url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
								};
							};
							if (typeof delta.embeds[indexEmbed].author.icon_url !== "undefined") {
								if (advancedDetermine.isStringSingleLine(delta.embeds[indexEmbed].author.icon_url) !== true) {
									throw new TypeError(`Configuration argument "embeds#${indexEmbed}.author.icon_url" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
								};
							};
						} else {
							throw new TypeError(`Configuration argument "embeds#${indexEmbed}.author" must be type of object JSON (non-nullable)! ([GitHub Action] Send To Discord)`);
						};
					};
					if (typeof delta.embeds[indexEmbed].fields !== "undefined") {
						if (advancedDetermine.isArray(delta.embeds[indexEmbed].fields) === true) {
							if (delta.embeds[indexEmbed].fields.length > 25) {
								throw new Error(`Configuration argument "embeds#${indexEmbed}.fields"'s length must not larger than 25! ([GitHub Action] Send To Discord)`);
							};
							delta.embeds[indexEmbed].fields.forEach((field, indexField) => {
								if (advancedDetermine.isJSON(delta.embeds[indexEmbed].fields[indexField]) === true) {
									Object.keys(delta.embeds[indexEmbed].fields[indexField]).forEach((embedFieldKey) => {
										if (embedFieldKey !== "name" && embedFieldKey !== "value" && embedFieldKey !== "inline") {
											githubAction.core.warning(`Configuration argument "embeds#${indexEmbed}.fields#${indexField}.${embedFieldKey}" is invalid! Ignored this key. ([GitHub Action] Send To Discord)`);
											delete delta.embeds[indexEmbed].fields[indexField][embedFieldKey];
										};
									});
									if (advancedDetermine.isString(delta.embeds[indexEmbed].fields[indexField].name) !== true) {
										throw new TypeError(`Configuration argument "embeds#${indexEmbed}.fields#${indexField}.name" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
									};
									if (advancedDetermine.isString(delta.embeds[indexEmbed].fields[indexField].value) !== true) {
										throw new TypeError(`Configuration argument "embeds#${indexEmbed}.fields#${indexField}.value" must be type of string (non-nullable)! ([GitHub Action] Send To Discord)`);
									};
									if (typeof delta.embeds[indexEmbed].fields[indexField].inline !== "undefined") {
										if (advancedDetermine.isBoolean(delta.embeds[indexEmbed].fields[indexField].inline) !== true) {
											throw new TypeError(`Configuration argument "embeds#${indexEmbed}.fields#${indexField}.inline" must be type of boolean! ([GitHub Action] Send To Discord)`);
										};
									};
								} else {
									throw new TypeError(`Configuration argument "embeds#${indexEmbed}.fields#${indexField}" must be type of object JSON (non-nullable)! ([GitHub Action] Send To Discord)`);
								};
							});
						} else {
							throw new TypeError(`Configuration argument "embeds#${indexEmbed}.fields" must be type of array (non-nullable)! ([GitHub Action] Send To Discord)`);
						};
					};
				} else {
					throw new TypeError(`Configuration argument "embeds#${indexEmbed}" must be type of object JSON (non-nullable)! ([GitHub Action] Send To Discord)`);
				};
			});
		} else {
			throw new TypeError(`Configuration argument "embeds" must be type of array (non-nullable)! ([GitHub Action] Send To Discord)`);
		};
	};
	if (typeof delta.content === "undefined" && typeof delta.embeds === "undefined") {
		throw new Error(`Both configuration argument "content" and "embeds" are empty! ([GitHub Action] Send To Discord)`);
	};
	githubAction.core.debug(`Configuration Argument (Stage ACA1): ${JSON.stringify(delta)} ([GitHub Action] Send To Discord)`);
	return delta;
};
module.exports = aca1;
