const regexpSingleLine = /^.*$/u;
/**
 * Determine whether the string is single line.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringSingleLine(item) {
    return regexpSingleLine.test(item);
}
export default isStringSingleLine;
