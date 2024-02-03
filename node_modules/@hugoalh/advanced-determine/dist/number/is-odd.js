/**
 * Determine whether the number is odd.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumberOdd(item) {
    return (Number.isInteger(item) && item % 2 !== 0);
}
export default isNumberOdd;
