/*==================
[NodeJS] Advanced Determine - Is Null
	Language:
		NodeJS 14
==================*/
const isArray = require("./isarray.js");
const isJSON = require("./isjson.js");
const isString = require("./isstring.js");
/**
 * @function isNull
 * @alias isNul
 * @description Determine item is type of null or not.
 * @param {*} item Item that need to determine.
 * @param {object} [option] Option.
 * @returns {boolean} Determine result.
 */
function isNull(item, option) {
	return (
		item === null ||
		isArray(item) == null ||
		isJSON(item) == null ||
		isString(item, option) == null
	);
};
module.exports = isNull;
