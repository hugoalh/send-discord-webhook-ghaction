/*==================
[NodeJS] Advanced Determine - All Is
	Language:
		NodeJS 14
==================*/
const isString = require("./isstring.js");
const isArray = require("./isarray.js");
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
		if (resultArray.includes(false) == true || resultArray.includes(null) == true) {
			return false;
		};
		return true;
	} catch (error) {
		throw new Error(`Invalid argument "type"! Cannot find the module.`);
	};
};
module.exports = allIs;
