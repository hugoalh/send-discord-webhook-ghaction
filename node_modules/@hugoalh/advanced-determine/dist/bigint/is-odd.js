/**
 * Determine whether the big integer is odd.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntOdd(item) {
    return (item % 2n !== 0n);
}
export { isBigIntOdd as isBigIntegerOdd };
export default isBigIntOdd;
