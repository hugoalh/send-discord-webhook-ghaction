import { isNumericIntegralType } from "../numeric/is-integral-type.js";
/**
 * Determine whether the number is in the range of the specify integral type.
 * @param {Parameters<typeof isNumericIntegralType>[0]} typeName Name of the integral numeric type.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumberIntegralType(typeName, item) {
    return isNumericIntegralType(typeName, item);
}
export default isNumberIntegralType;
