/*==================
[NodeJS] Advanced Determine - Is Number Negative Safe Integer
	Language:
		NodeJS 14
==================*/
const isNumberNegative = require("./isnumbernegative.js");
/**
 * @function isNumberNegativeSafeInteger
 * @alias isNumNgtSInt
 * @description Determine item is type of safe negative integer number or not.
 * @param {*} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberNegativeSafeInteger(item) {
	return (
		isNumberNegative(item) == true && Number.isSafeInteger(item) == true
	);
};
module.exports = isNumberNegativeSafeInteger;
