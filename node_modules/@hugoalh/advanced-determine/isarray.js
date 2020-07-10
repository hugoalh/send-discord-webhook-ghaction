/*==================
[NodeJS] Advanced Determine - Is Array
	Language:
		NodeJS 14
==================*/
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
