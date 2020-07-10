/*==================
[NodeJS] Advanced Determine - Is Buffer
	Language:
		NodeJS 14
==================*/
/**
 * @function isBuffer
 * @alias isBuf
 * @description Determine item is instance of buffer or not.
 * @param {*} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isBuffer(item) {
	return (
		item !== null && item !== undefined && item.constructor !== null && item.constructor !== undefined && typeof item.constructor.isBuffer == "function" && item.constructor.isBuffer(item)
	);
};
module.exports = isBuffer;
