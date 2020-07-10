/*==================
[NodeJS] Advanced Determine - All Is
	Language:
		NodeJS 14
==================*/
const internalService = require("./internalservice.js");
const isArray = require("./isarray.js");
const isString = require("./isstring.js");
/**
 * @function allIs
 * @description Determine items are the same type or not.
 * @param {(string|[string, object])} configuration Type to determine; or with type determiner configuration.
 * @param  {...*} items Items that need to determine.
 * @returns {boolean} Determine result.
 */
function allIs(configuration, ...items) {
	if (isString(configuration) == true) {
		if (configuration.indexOf("/") != -1) {
			return internalService.referenceError(`Invalid path of "type"!`);
		};
	} else if (isArray(configuration) == true) {
		if (isString(configuration[0]) != true) {
			return internalService.typeError(`Invalid type of "type"! Require type of string.`);
		};
		if (configuration[0].indexOf("/") != -1) {
			return internalService.referenceError(`Invalid path of "type"!`);
		};
	} else {
		return internalService.typeError(`Invalid type of "option"! Require type of string, or array.`);
	};
	let typeDeterminer;
	try {
		typeDeterminer = require(`./is${configuration[0].toLowerCase()}.js`);
	} catch (error) {
		return internalService.generalError(`Invalid argument "type"! Cannot find the module.`);
	};
	let resultJSON = {};
	Promise.allSettled(
		items.map((item, index) => {
			new Promise((resolve, reject) => {
				resultJSON[index] = typeDeterminer(item, configuration[1]);
			}).catch((error) => { });
		})
	);
	const resultArray = Object.values(resultJSON);
	if (resultArray.includes(false) == true || resultArray.includes(null) == true) {
		return false;
	};
	return true;
};
module.exports = allIs;
