import { deepStrictEqual } from "node:assert";
/**
 * Determine whether the items are equal or not by deep equality comparison.
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean} Determine result.
 * @example
 * equal([1, 2, 3], [1, 2, 3]);
 * //=> true
 * @example
 * equal([1, 2, 3], [1, [2], 3]);
 * //=> false
 */
export function equal(a, b) {
    try {
        deepStrictEqual(a, b);
        return true;
    }
    catch {
        return false;
    }
}
export default equal;
