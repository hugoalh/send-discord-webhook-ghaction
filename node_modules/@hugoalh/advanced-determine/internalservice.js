/*==================
[NodeJS] Advanced Determine - Internal Service
	Language:
		NodeJS 14
==================*/
const configuration = require("./configuration.js");
/**
 * @function generalError
 * @param {string} message
 * @returns {undefined}
 */
function generalError(message) {
	if (configuration.ignoreGeneralError() == true) {
		console.error(message);
		return undefined;
	};
	throw new Error(message);
};
/**
 * @function rangeError
 * @param {string} message
 * @returns {undefined}
 */
function rangeError(message) {
	if (configuration.ignoreRangeError() == true) {
		console.error(message);
		return undefined;
	};
	throw new RangeError(message);
};
/**
 * @function referenceError
 * @param {string} message
 * @returns {undefined}
 */
function referenceError(message) {
	if (configuration.ignoreReferenceError() == true) {
		console.error(message);
		return undefined;
	};
	throw new ReferenceError(message);
};
/**
 * @function typeError
 * @param {string} message
 * @returns {undefined}
 */
function typeError(message) {
	if (configuration.ignoreTypeError() == true) {
		console.error(message);
		return undefined;
	};
	throw new TypeError(message);
};
module.exports.generalError = generalError;
module.exports.rangeError = rangeError;
module.exports.referenceError = referenceError;
module.exports.typeError = typeError;
