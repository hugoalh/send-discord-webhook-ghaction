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
 * @param {object} [configuration] Configuration.
 * @returns {boolean} Determine result.
 */
function isNull(item, configuration) {
	return (
		item === null ||
		isArray(item) == null ||
		isJSON(item) == null ||
		isString(item, configuration) == null
	);
};
module.exports = isNull;
