/*==================
[GitHub Action] Send To Discord - Custom Null Determine
	Language:
		NodeJS 14
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine");
function customNullDetermine(item) {
	if (
		advancedDetermine.isNull(item, { fuzzyMode: true }) == true ||
		item === {} ||
		item === "{}" ||
		advancedDetermine.isUndefined(item, { fuzzyMode: true }) == true
	) {
		return true;
	};
	return false;
};
module.exports = customNullDetermine;
