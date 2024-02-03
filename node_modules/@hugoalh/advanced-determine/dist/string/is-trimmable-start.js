/**
 * Determine whether the string is trimmable at the start.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringTrimmableStart(item) {
    return (item.length !== item.trimStart().length);
}
export default isStringTrimmableStart;
