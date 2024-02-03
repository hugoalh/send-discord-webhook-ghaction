/**
 * Determine whether the string is upper case.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringCaseUpper(item) {
    return (item === item.toUpperCase());
}
export { isStringCaseUpper as isStringUpperCase };
export default isStringCaseUpper;
