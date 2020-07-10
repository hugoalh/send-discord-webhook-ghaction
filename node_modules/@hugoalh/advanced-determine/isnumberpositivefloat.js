/*==================
[NodeJS] Advanced Determine - Is Number Positive Float
	Language:
		NodeJS 14
==================*/
const isNumberPositive = require("./isnumberpositive.js");
/**
 * @function isNumberPositiveFloat
 * @alias isNumPstFlt
 * @description Determine item is type of positive float number or not.
 * @param {*} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberPositiveFloat(item) {
	return (
		isNumberPositive(item) == true && Number.isInteger(item) == false
	);
};
module.exports = isNumberPositiveFloat;
