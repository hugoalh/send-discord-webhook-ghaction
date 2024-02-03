/**
 * Determine whether the number is safe with IEEE-754.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumberSafe(item) {
    return (Number.MIN_SAFE_INTEGER <= item && item <= Number.MAX_SAFE_INTEGER);
}
export default isNumberSafe;
