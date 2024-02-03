import { isNumericIntegralType } from "../numeric/is-integral-type.js";
/**
 * Determine whether the big integer is in the range of the specify integral type.
 * @param {Parameters<typeof isNumericIntegralType>[0]} typeName Name of the integral numeric type.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntIntegralType(typeName, item) {
    return isNumericIntegralType(typeName, item);
}
export { isBigIntIntegralType as isBigIntegerIntegralType };
export default isBigIntIntegralType;
