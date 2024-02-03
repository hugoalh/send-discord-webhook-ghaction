/**
 * Determine whether the item is an asynchronous generator function.
 *
 * This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is AsyncGeneratorFunction} Determine result.
 */
export declare function isAsyncGeneratorFunction(item: unknown): item is AsyncGeneratorFunction;
export { isAsyncGeneratorFunction as isAsynchronousGeneratorFunction };
export default isAsyncGeneratorFunction;
//# sourceMappingURL=is-async-generator-function.d.ts.map