/*==================
[GitHub Action] Send To Discord - Custom Null Determine
	Language:
		NodeJS 14
==================*/
const determine = require("@hugoalh/advanced-determine");
function customNullDetermine(item) {
	if (
		determine.isNull(item, true) == true ||
		item === "{}" ||
		item === undefined ||
		item === "undefined"
	) {
		return true;
	};
	return false;
};
module.exports = customNullDetermine;
