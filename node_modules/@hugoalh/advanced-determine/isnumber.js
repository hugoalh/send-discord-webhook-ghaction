/*==================
[NodeJS] Advanced Determine - Is Number
	Language:
		NodeJS 14
==================*/
function isNumber(item) {
	return (
		typeof item == "number" && Number.isNaN(item) == false
	);
};
module.exports = isNumber;
