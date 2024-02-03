import { bigintRootApproximate } from "./_bigint-root-approximate.js";
/**
 * Determine whether the numeric is prime.
 * @param {bigint | number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumericPrime(item) {
    let itemBigInteger;
    if (typeof item === "bigint") {
        itemBigInteger = item;
    }
    else {
        if (!Number.isInteger(item)) {
            return false;
        }
        itemBigInteger = BigInt(item);
    }
    if (itemBigInteger === 2n ||
        itemBigInteger === 3n ||
        itemBigInteger === 5n ||
        itemBigInteger === 7n) {
        return true;
    }
    if (itemBigInteger < 2n ||
        itemBigInteger % 2n === 0n ||
        itemBigInteger % 3n === 0n ||
        itemBigInteger % 5n === 0n ||
        itemBigInteger % 7n === 0n) {
        return false;
    }
    const divisorMaximum = bigintRootApproximate(itemBigInteger).ceil;
    for (let divisor = 3n; divisor <= divisorMaximum; divisor += 2n) {
        if (itemBigInteger % divisor === 0n) {
            return false;
        }
    }
    return true;
}
export default isNumericPrime;
