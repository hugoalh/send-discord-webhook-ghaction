/*==================
[NodeJS] Advanced Determine - Is Null
	Language:
		NodeJS 14
==================*/
const isArray = require("./isarray.js");
const isJSON = require("./isjson.js");
const isString = require("./isstring.js");
function isNull(item, fuzzyMode = false) {
	if (typeof fuzzyMode != "boolean") {
		throw new TypeError(`Invalid type of "fuzzyMode"! Require type of boolean.`);
	};
	return (
		item === null ||
		isArray(item) == null ||
		isJSON(item) == null ||
		isString(item, fuzzyMode) == null
	);
};
module.exports = isNull;
