import { uniqueArray } from "@hugoalh/unique-array";
/**
 * Determine whether the array is contain unique elements.
 * @param {unknown[]} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isArrayUnique(item) {
    return (item.length === uniqueArray(item).length);
}
export default isArrayUnique;
