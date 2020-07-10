/*==================
[NodeJS] Advanced Determine - Is Number Negative Safe Float
	Language:
		NodeJS 14
==================*/
const isNumberNegativeFloat = require("./isnumbernegativefloat.js");
/**
 * @function isNumberNegativeSafeFloat
 * @alias isNumNgtSFlt
 * @description Determine item is type of safe negative float number or not.
 * @param {*} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberNegativeSafeFloat(item) {
	return (
		isNumberNegativeFloat(item) == true && item > Number.MIN_SAFE_INTEGER
	);
};
module.exports = isNumberNegativeSafeFloat;
