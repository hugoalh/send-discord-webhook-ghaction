/*==================
[NodeJS] Advanced Determine - Is String ASCII
	Language:
		NodeJS 14
==================*/
const internalService = require("./internalservice.js");
const isString = require("./isstring.js");
/**
 * @function isStringASCII
 * @alias isStrASCII
 * @description Determine item is type of ASCII string or not.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isStringASCII(item) {
	if (isString(item) == false) {
		return internalService.typeError(`Invalid type of "item"! Require type of string.`);
	};
	for (let index = 0; index < item.length; index++) {
		if (item.charCodeAt(index) > 127) {
			return false;
		};
	};
	return true;
};
module.exports = isStringASCII;
