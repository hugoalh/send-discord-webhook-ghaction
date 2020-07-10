/*==================
[NodeJS] Advanced Determine - Is JSON
	Language:
		NodeJS 14
==================*/
function isJSON(item) {
	if (typeof item != "object" || item === null) {
		return false;
	};
	try {
		const bin = JSON.stringify(item);
		if (Object.keys(item).length == 0 || bin === "{}") {
			return null;
		};
		return true;
	} catch (error) {
		return false;
	};
};
module.exports = isJSON;
