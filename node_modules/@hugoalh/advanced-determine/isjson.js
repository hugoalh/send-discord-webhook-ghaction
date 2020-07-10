/*==================
[NodeJS] Advanced Determine - Is JSON
	Language:
		NodeJS 14
==================*/
/**
 * @function isJSON
 * @description Determine item is type of JSON or not.
 * @param {*} item Item that need to determine.
 * @returns {(boolean|null)} Determine result.
 */
function isJSON(item) {
	if (typeof item != "object" || item === null) {
		return false;
	};
	let bin;
	try {
		bin = JSON.stringify(item);
	} catch (error) {
		return false;
	};
	if (Object.keys(item).length == 0 || bin === "{}") {
		return null;
	};
	return true;
};
module.exports = isJSON;
