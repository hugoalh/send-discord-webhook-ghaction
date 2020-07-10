/*==================
[NodeJS] Advanced Determine - Is Number Negative
	Language:
		NodeJS 14
==================*/
const isNumber = require("./isnumber.js");
/**
 * @function isNumberNegative
 * @alias isNumNgt
 * @description Determine item is type of negative number or not.
 * @param {*} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberNegative(item) {
	return (
		isNumber(item) == true && item < 0
	);
};
module.exports = isNumberNegative;
