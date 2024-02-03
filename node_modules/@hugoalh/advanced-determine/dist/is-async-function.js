import { types } from "node:util";
/**
 * Determine whether the item is an asynchronous function.
 *
 * This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is (...parameters: unknown[]) => Promise<unknown>} Determine result.
 */
export function isAsyncFunction(item) {
    return (types.isAsyncFunction(item) && !types.isGeneratorFunction(item) && Object.prototype.toString.call(item) === "[object AsyncFunction]");
}
export { isAsyncFunction as isAsynchronousFunction };
export default isAsyncFunction;
