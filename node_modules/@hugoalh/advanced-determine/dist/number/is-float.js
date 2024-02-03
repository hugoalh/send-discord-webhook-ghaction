/**
 * Determine whether the number is float.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumberFloat(item) {
    return (item % 1 !== 0);
}
export default isNumberFloat;
