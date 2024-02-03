import { types } from "node:util";
/**
 * Determine whether the item is a synchronous function.
 *
 * This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is (...parameters: unknown[]) => Exclude<unknown, Promise<unknown>>} Determine result.
 */
export function isSyncFunction(item) {
    return (typeof item === "function" && !types.isAsyncFunction(item) && !types.isGeneratorFunction(item) && Object.prototype.toString.call(item) === "[object Function]");
}
export { isSyncFunction as isSynchronousFunction };
export default isSyncFunction;
