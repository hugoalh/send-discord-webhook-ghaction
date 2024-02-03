import { isNumericPrime } from "../numeric/is-prime.js";
/**
 * Determine whether the number is prime.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumberPrime(item) {
    return isNumericPrime(item);
}
export default isNumberPrime;
