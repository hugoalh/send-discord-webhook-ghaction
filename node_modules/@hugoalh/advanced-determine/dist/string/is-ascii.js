//eslint-disable-next-line no-control-regex
const regexpASCII = /^[\u0000-\u007F]*$/u;
/**
 * Determine whether the string is ASCII.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringASCII(item) {
    return regexpASCII.test(item);
}
export default isStringASCII;
