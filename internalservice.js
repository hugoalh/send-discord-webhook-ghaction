/*==================
[GitHub Action] Send To IFTTT - Internal Service
	Language:
		NodeJS 14
==================*/
/**
 * @private
 * @const {object} preset
 * @const {object} preset.header
 * @const {string} preset.header.userAgent
 */
const preset = {
	header: {
		userAgent: `NodeJS/${process.version.replace(/v/giu, "")} GitHubAction.SendToIFTTT/2.0.0`
	}
};
/**
 * @private
 * @function prefabNoInputError
 * @param {string} argumentName
 * @returns {Error}
 */
function prefabNoInputError(argumentName) {
	throw new Error(`No input of "${argumentName}"!`);
};
/**
 * @private
 * @function prefabReferenceError
 * @param {string} argumentName
 * @param {string} [description="(Read the documentation for more information.)"]
 * @returns {ReferenceError}
 */
function prefabReferenceError(argumentName, description = "(Read the documentation for more information.)") {
	throw new ReferenceError(`Invalid reference of "${argumentName}"! ${description}`);
};
/**
 * @private
 * @function prefabTypeError
 * @param {string} argumentName
 * @param {string} typeCondition
 * @returns {TypeError}
 */
function prefabTypeError(argumentName, typeCondition) {
	throw new TypeError(`Invalid type of "${argumentName}"! Require type of ${typeCondition}.`);
};
module.exports.preset = preset;
module.exports.prefabNoInputError = prefabNoInputError;
module.exports.prefabReferenceError = prefabReferenceError;
module.exports.prefabTypeError = prefabTypeError;
