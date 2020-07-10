/*==================
[NodeJS] Advanced Determine - Is Stringify JSON
	Language:
		NodeJS 14
==================*/
function isStringifyJSON(item) {
	try {
		const bin = JSON.parse(item);
		if (Object.keys(bin).length == 0 || item === "{}") {
			return null;
		};
		return true;
	} catch (error) {
		return false;
	};
};
module.exports = isStringifyJSON;
