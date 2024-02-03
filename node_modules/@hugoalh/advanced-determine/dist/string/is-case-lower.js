/**
 * Determine whether the string is lower case.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringCaseLower(item) {
    return (item === item.toLowerCase());
}
export { isStringCaseLower as isStringLowerCase };
export default isStringCaseLower;
