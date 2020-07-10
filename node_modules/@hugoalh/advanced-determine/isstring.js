/*==================
[NodeJS] Advanced Determine - Is String
	Language:
		NodeJS 14
==================*/
function isString(item, fuzzyMode = false) {
	if (typeof fuzzyMode != "boolean") {
		throw new TypeError(`Invalid type of "fuzzyMode"! Require type of boolean.`);
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
