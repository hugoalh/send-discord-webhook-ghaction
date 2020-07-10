/*==================
[NodeJS] Advanced Determine - Is String
	Language:
		NodeJS 14
==================*/
const fuzzyModeDefault = false;
const isJSON = require("./isjson.js");
/**
 * @function isString
 * @alias isStr
 * @description Determine item is type of string or not.
 * @param {*} item Item that need to determine.
 * @param {object} [configuration] Configuration.
 * @param {boolean} [configuration.fuzzyMode=false] Enable/Disable fuzzy mode.
 * @returns {(boolean|null)} Determine result.
 */
function isString(item, configuration) {
	let fuzzyMode = fuzzyModeDefault;
	if (isJSON(configuration) == true) {
		if (configuration.fuzzyMode) {
			if (typeof configuration.fuzzyMode == "boolean") {
				fuzzyMode = configuration.fuzzyMode;
			} else {
				console.warn(`Invalid type of "configuration.fuzzyMode"! Require type of boolean. Ignored this parameter.`);
			};
		};
	};
	if (typeof item != "string") {
		return false;
	};
	if (item.length == 0) {
		return null;
	};
	if (fuzzyMode == true) {
		if (item === "null") {
			return null;
		};
	};
	return true;
};
module.exports = isString;
