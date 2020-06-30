/*==================
[NodeJS] Advanced Determine - Is String All Lower Case
	Language:
		NodeJS 14
==================*/
const isString = require("./isstring.js");
function isStringAllLowerCase(item) {
	if (isString(item) == false) {
		throw new TypeError(`Invalid type of "item"! Require type of string.`);
	};
	const bin = item.toLowerCase();
	if (item !== bin) {
		return false;
	};
	return true;
};
module.exports = isStringAllLowerCase;
