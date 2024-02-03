import { isNumericPrime } from "../numeric/is-prime.js";
/**
 * Determine whether the big integer is prime.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntPrime(item) {
    return isNumericPrime(item);
}
export { isBigIntPrime as isBigIntegerPrime };
export default isBigIntPrime;
