/*==================
[NodeJS] Advanced Determine - Is Boolean
	Language:
		NodeJS 14
==================*/
const isJSON = require("./isjson.js");
/**
 * @function isBoolean
 * @description Determine item is type of boolean or not.
 * @param {*} item Item that need to determine.
 * @param {object} [option] Option.
 * @param {boolean} [option.fuzzyMode=false] Enable/Disable fuzzy mode.
 * @returns {boolean} Determine result.
 */
function isBoolean(item, option) {
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
	if (typeof item == "boolean") {
		return true;
	};
	if (runtime.fuzzyMode == true) {
		if (item === "true" || item === "false") {
			return true;
		};
	};
	return false;
};
module.exports = isBoolean;
