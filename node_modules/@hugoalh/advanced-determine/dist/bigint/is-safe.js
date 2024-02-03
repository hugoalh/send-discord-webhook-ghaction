const MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
const MIN_SAFE_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
/**
 * Determine whether the big integer is safe with IEEE-754.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntSafe(item) {
    return (MIN_SAFE_INTEGER <= item && item <= MAX_SAFE_INTEGER);
}
export { isBigIntSafe as isBigIntegerSafe };
export default isBigIntSafe;
