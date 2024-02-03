/**
 * Determine whether the item is an asynchronous generator.
 *
 * This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is AsyncGenerator} Determine result.
 */
export declare function isAsyncGenerator(item: unknown): item is AsyncGenerator;
export { isAsyncGenerator as isAsynchronousGenerator };
export default isAsyncGenerator;
//# sourceMappingURL=is-async-generator.d.ts.map