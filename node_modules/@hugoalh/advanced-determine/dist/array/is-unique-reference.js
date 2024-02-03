/**
 * Determine whether the array is contain unique references.
 * @param {unknown[]} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isArrayUniqueReference(item) {
    return (item.length === new Set(item).size);
}
export default isArrayUniqueReference;
