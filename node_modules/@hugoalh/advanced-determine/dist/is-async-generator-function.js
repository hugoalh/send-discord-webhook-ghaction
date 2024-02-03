import { types } from "node:util";
/**
 * Determine whether the item is an asynchronous generator function.
 *
 * This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is AsyncGeneratorFunction} Determine result.
 */
export function isAsyncGeneratorFunction(item) {
    return (types.isAsyncFunction(item) && types.isGeneratorFunction(item) && Object.prototype.toString.call(item) === "[object AsyncGeneratorFunction]");
}
export { isAsyncGeneratorFunction as isAsynchronousGeneratorFunction };
export default isAsyncGeneratorFunction;
