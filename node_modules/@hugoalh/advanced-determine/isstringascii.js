/*==================
[NodeJS] Advanced Determine - Is String ASCII
	Language:
		NodeJS 14
==================*/
const isString = require("./isstring.js");
function isStringASCII(item) {
	if (isString(item) == false) {
		throw new TypeError(`Invalid type of "item"! Require type of string.`);
	};
	for (let index = 0; index < item.length; index++) {
		if (item.charCodeAt(index) > 127) {
			return false;
		};
	};
	return true;
};
module.exports = isStringASCII;
