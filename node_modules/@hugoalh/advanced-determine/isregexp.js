/*==================
[NodeJS] Advanced Determine - Is RegExp
	Language:
		NodeJS 14
==================*/
function isRegExp(item) {
	return (
		item instanceof RegExp
	);
};
module.exports = isRegExp;
