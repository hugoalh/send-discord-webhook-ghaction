/*==================
[NodeJS] Advanced Determine - Is Regular Expression
	Language:
		NodeJS 14
==================*/
/**
 * @function isRegularExpression
 * @alias isRegEx
 * @alias isRegExp
 * @alias isRegExr
 * @description Determine item is instance of regular expression or not.
 * @param {*} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isRegularExpression(item) {
	return (
		item instanceof RegExp
	);
};
module.exports = isRegularExpression;
