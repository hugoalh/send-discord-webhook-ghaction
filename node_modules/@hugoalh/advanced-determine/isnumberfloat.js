/*==================
[NodeJS] Advanced Determine - Is Number Float
	Language:
		NodeJS 14
==================*/
const isNumber = require("./isnumber.js");
/**
 * @function isNumberFloat
 * @alias isNumFlt
 * @description Determine item is type of float number or not.
 * @param {*} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberFloat(item) {
	return (
		isNumber(item) == true && Number.isInteger(item) == false
	);
};
module.exports = isNumberFloat;
