/**
 * Determine whether the item is a synchronous function.
 *
 * This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is (...parameters: unknown[]) => Exclude<unknown, Promise<unknown>>} Determine result.
 */
export declare function isSyncFunction(item: unknown): item is (...parameters: unknown[]) => Exclude<unknown, Promise<unknown>>;
export { isSyncFunction as isSynchronousFunction };
export default isSyncFunction;
//# sourceMappingURL=is-sync-function.d.ts.map