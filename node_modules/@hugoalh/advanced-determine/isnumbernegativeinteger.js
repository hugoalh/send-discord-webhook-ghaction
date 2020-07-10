/*==================
[NodeJS] Advanced Determine - Is Number Negative Integer
	Language:
		NodeJS 14
==================*/
const isNumberNegative = require("./isnumbernegative.js");
/**
 * @function isNumberNegativeInteger
 * @alias isNumNgtInt
 * @description Determine item is type of negative integer number or not.
 * @param {*} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberNegativeInteger(item) {
	return (
		isNumberNegative(item) == true && Number.isInteger(item) == true
	);
};
module.exports = isNumberNegativeInteger;
