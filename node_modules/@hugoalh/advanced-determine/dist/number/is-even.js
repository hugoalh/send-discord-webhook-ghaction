/**
 * Determine whether the number is even.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumberEven(item) {
    return (Number.isInteger(item) && item % 2 === 0);
}
export default isNumberEven;
