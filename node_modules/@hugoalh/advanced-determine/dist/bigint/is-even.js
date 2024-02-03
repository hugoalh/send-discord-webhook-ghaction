/**
 * Determine whether the big integer is even.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntEven(item) {
    return (item % 2n === 0n);
}
export { isBigIntEven as isBigIntegerEven };
export default isBigIntEven;
