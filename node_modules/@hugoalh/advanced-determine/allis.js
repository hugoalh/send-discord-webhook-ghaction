/*==================
[NodeJS] Advanced Determine - All Is
	Language:
		NodeJS 14
==================*/
const isString = require("./isstring.js");
const isArray = require("./isarray.js");
function allIsSmallData(option, ...items) {
	try {
		const typeDeterminer = require(`./is${option[0]}.js`);
		let result = [];
		items.forEach((item, index) => {
			result.push(
				typeDeterminer(item, option[1])
			);
		});
		if (result.includes(false) || result.includes(null)) {
			return false;
		};
		return true;
	} catch (error) {
		throw new Error(`Invalid argument "type"! Cannot find the module.`);
	};
};
function allIsBigData(option, ...items) {
	try {
		const typeDeterminer = require(`./is${option[0]}.js`);
		let resultJSON = {};
		Promise.allSettled(
			items.map((item, index) => {
				new Promise((resolve, reject) => {
					resultJSON[index] = typeDeterminer(item, option[1]);
				}).catch((error) => { });
			})
		);
		const resultArray = Object.values(resultJSON);
		if (resultArray.includes(false) || resultArray.includes(null)) {
			return false;
		};
		return true;
	} catch (error) {
		throw new Error(`Invalid argument "type"! Cannot find the module.`);
	};
};
function allIs(option, ...items) {
	const optionIsString = isString(option);
	if (optionIsString != true && isArray(option) != true) {
		throw new TypeError(`Invalid type of "option"! Require type of string, or array.`);
	};
	if (optionIsString == true) {
		option = [option, false];
	};
	if (isString(option[0]) != true) {
		throw new TypeError(`Invalid type of "type"! Require type of string.`);
	};
	if (typeof option[1] != "boolean") {
		throw new TypeError(`Invalid type of "fuzzyMode"! Require type of boolean.`);
	};
	if (items.length <= 16) {
		return allIsSmallData(option, ...items);
	};
	return allIsBigData(option, ...items);
};
module.exports = allIs;
