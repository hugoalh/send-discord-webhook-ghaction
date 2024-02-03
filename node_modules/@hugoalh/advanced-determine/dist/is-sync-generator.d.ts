/**
 * Determine whether the item is a synchronous generator.
 *
 * This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is Generator} Determine result.
 */
export declare function isSyncGenerator(item: unknown): item is Generator;
export { isSyncGenerator as isSynchronousGenerator };
export default isSyncGenerator;
//# sourceMappingURL=is-sync-generator.d.ts.map