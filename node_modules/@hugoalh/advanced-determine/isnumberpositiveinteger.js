/*==================
[NodeJS] Advanced Determine - Is Number Positive Integer
	Language:
		NodeJS 14
==================*/
const isNumberPositive = require("./isnumberpositive.js");
/**
 * @function isNumberPositiveInteger
 * @alias isNumPstInt
 * @description Determine item is type of positive integer number or not.
 * @param {*} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberPositiveInteger(item) {
	return (
		isNumberPositive(item) == true && Number.isInteger(item) == true
	);
};
module.exports = isNumberPositiveInteger;
