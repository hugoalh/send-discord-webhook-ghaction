/**
 * Determine whether the big integer is positive.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntPositive(item) {
    return (item >= 0n);
}
export { isBigIntPositive as isBigIntegerPositive };
export default isBigIntPositive;
