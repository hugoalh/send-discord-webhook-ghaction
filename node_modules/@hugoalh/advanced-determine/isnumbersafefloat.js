/*==================
[NodeJS] Advanced Determine - Is Number Safe Float
	Language:
		NodeJS 14
==================*/
const isNumberFloat = require("./isnumberfloat.js");
/**
 * @function isNumberSafeFloat
 * @alias isNumSFlt
 * @description Determine item is type of safe float number or not.
 * @param {*} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberSafeFloat(item) {
	return (
		isNumberFloat(item) == true && item > Number.MIN_SAFE_INTEGER && item < Number.MAX_SAFE_INTEGER
	);
};
module.exports = isNumberSafeFloat;
