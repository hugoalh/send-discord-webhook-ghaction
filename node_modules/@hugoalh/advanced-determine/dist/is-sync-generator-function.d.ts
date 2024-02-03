/**
 * Determine whether the item is a synchronous generator function.
 *
 * This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is GeneratorFunction} Determine result.
 */
export declare function isSyncGeneratorFunction(item: unknown): item is GeneratorFunction;
export { isSyncGeneratorFunction as isSynchronousGeneratorFunction };
export default isSyncGeneratorFunction;
//# sourceMappingURL=is-sync-generator-function.d.ts.map