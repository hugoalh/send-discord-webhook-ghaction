/*==================
[NodeJS] Advanced Determine - Configuration
	Language:
		NodeJS 14
==================*/
const internalService = require("./internalservice.js");
/**
 * @var {boolean} ignoreGeneralErrorValue
 */
let ignoreGeneralErrorValue = false;
/**
 * @var {boolean} ignoreRangeErrorValue
 */
let ignoreRangeErrorValue = false;
/**
 * @var {boolean} ignoreReferenceErrorValue
 */
let ignoreReferenceErrorValue = false;
/**
 * @var {boolean} ignoreTypeErrorValue
 */
let ignoreTypeErrorValue = false;
/**
 * @function ignoreGeneralError
 * @description Globally ignore general error to prevent script stop executing.
 * @param {(boolean|undefined)} [mode] Enable or disable this feature; Query current value.
 * @returns {(boolean|undefined)}
 */
function ignoreGeneralError(mode) {
	if (typeof mode == "boolean") {
		ignoreGeneralErrorValue = mode;
	} else {
		return ignoreGeneralErrorValue;
	};
};
/**
 * @function ignoreRangeError
 * @description Globally ignore range error to prevent script stop executing.
 * @param {(boolean|undefined)} [mode] Enable or disable this feature; Query current value.
 * @returns {(boolean|undefined)}
 */
function ignoreRangeError(mode) {
	if (typeof mode == "boolean") {
		ignoreRangeErrorValue = mode;
	} else {
		return ignoreRangeErrorValue;
	};
};
/**
 * @function ignoreReferenceError
 * @description Globally ignore reference error to prevent script stop executing.
 * @param {(boolean|undefined)} [mode] Enable or disable this feature; Query current value.
 * @returns {(boolean|undefined)}
 */
function ignoreReferenceError(mode) {
	if (typeof mode == "boolean") {
		ignoreReferenceErrorValue = mode;
	} else {
		return ignoreReferenceErrorValue;
	};
};
/**
 * @function ignoreTypeError
 * @description Globally ignore type error to prevent script stop executing.
 * @param {(boolean|undefined)} [mode] Enable or disable this feature; Query current value.
 * @returns {(boolean|undefined)}
 */
function ignoreTypeError(mode) {
	if (typeof mode == "boolean") {
		ignoreTypeErrorValue = mode;
	} else {
		return ignoreTypeErrorValue;
	};
};
/**
 * @function ignoreAllErrors
 * @description Globally ignore all of the errors to prevent script stop executing.
 * @param {boolean} mode Enable or disable this feature.
 * @returns {undefined}
 */
function ignoreAllErrors(mode) {
	if (typeof mode != "boolean") {
		return internalService.typeError(`Invalid type of "mode"! Require type of boolean.`);
	};
	ignoreGeneralError(mode);
	ignoreRangeError(mode);
	ignoreReferenceError(mode);
	ignoreTypeError(mode);
};
module.exports.ignoreAllErrors = ignoreAllErrors;
module.exports.ignoreGeneralError = ignoreGeneralError;
module.exports.ignoreRangeError = ignoreRangeError;
module.exports.ignoreReferenceError = ignoreReferenceError;
module.exports.ignoreTypeError = ignoreTypeError;
