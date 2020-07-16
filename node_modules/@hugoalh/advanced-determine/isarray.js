/*==================
[NodeJS] Advanced Determine - Is Array
	Language:
		NodeJS 14
==================*/
/**
 * @function isArray
 * @alias isArr
 * @description Determine item is type of array or not.
 * @param {*} item Item that need to determine.
 * @returns {(boolean|null)} Determine result.
 */
function isArray(item) {
	if (Array.isArray(item) == false) {
		return false;
	};
	if (item.length == 0) {
		return null;
	};
	return true;
};
module.exports = isArray;
