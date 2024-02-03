/**
 * Determine whether the array is not contain custom defined properties.
 * @param {unknown[]} item Item that need to determine.
 * @returns {boolean} Determine result.
 * @example
 * isArrayStrict(Object.freeze([1, 2, 3, "foo", "bar", "baz"]) as unknown[]);
 * //=> false
 * @example
 * isArrayStrict([1, 2, 3, "foo", "bar", "baz"]);
 * //=> true
 */
export declare function isArrayStrict(item: unknown[]): boolean;
export default isArrayStrict;
//# sourceMappingURL=is-strict.d.ts.map