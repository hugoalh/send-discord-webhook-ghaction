/*==================
[NodeJS] Advanced Determine - Is String
	Language:
		NodeJS 14
==================*/
const isJSON = require("./isjson.js");
/**
 * @function isString
 * @alias isStr
 * @description Determine item is type of string or not.
 * @param {*} item Item that need to determine.
 * @param {object} [option] Option.
 * @param {boolean} [option.fuzzyMode=false] Enable/Disable fuzzy mode.
 * @returns {(boolean|null)} Determine result.
 */
function isString(item, option) {
	let runtime = {
		fuzzyMode: false
	};
	if (isJSON(option) == true) {
		if (option.fuzzyMode) {
			if (typeof option.fuzzyMode == "boolean") {
				runtime.fuzzyMode = option.fuzzyMode;
			} else {
				console.warn(`Invalid type of "option.fuzzyMode"! Require type of boolean. Ignored this parameter.`);
			};
		};
	};
	if (typeof item != "string") {
		return false;
	};
	if (item.length == 0) {
		return null;
	};
	if (runtime.fuzzyMode == true) {
		if (item === "null") {
			return null;
		};
	};
	return true;
};
module.exports = isString;
