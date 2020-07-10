/*==================
[NodeJS] Advanced Determine - Is Number Positive
	Language:
		NodeJS 14
==================*/
const isNumber = require("./isnumber.js");
/**
 * @function isNumberPositive
 * @alias isNumPst
 * @description Determine item is type of positive number or not.
 * @param {*} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberPositive(item) {
	return (
		isNumber(item) == true && item >= 0
	);
};
module.exports = isNumberPositive;
