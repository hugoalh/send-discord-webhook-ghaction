/**
 * Determine whether the item is an asynchronous function.
 *
 * This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is (...parameters: unknown[]) => Promise<unknown>} Determine result.
 */
export declare function isAsyncFunction(item: unknown): item is (...parameters: unknown[]) => Promise<unknown>;
export { isAsyncFunction as isAsynchronousFunction };
export default isAsyncFunction;
//# sourceMappingURL=is-async-function.d.ts.map