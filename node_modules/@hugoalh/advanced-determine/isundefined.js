/*==================
[NodeJS] Advanced Determine - Is Undefined
	Language:
		NodeJS 14
==================*/
function isUndefined(item, fuzzyMode = false) {
	if (typeof fuzzyMode != "boolean") {
		throw new TypeError(`Invalid type of "fuzzyMode"! Require type of boolean.`);
	};
	if (typeof item == "undefined") {
		return true;
	};
	if (fuzzyMode == true) {
		if (item === "undefined") {
			return true;
		};
	};
	return false;
};
module.exports = isUndefined;
