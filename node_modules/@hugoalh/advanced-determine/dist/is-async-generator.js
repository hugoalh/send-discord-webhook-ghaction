import { types } from "node:util";
/**
 * Determine whether the item is an asynchronous generator.
 *
 * This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is AsyncGenerator} Determine result.
 */
export function isAsyncGenerator(item) {
    return (types.isGeneratorObject(item) && Object.prototype.toString.call(item) === "[object AsyncGenerator]");
}
export { isAsyncGenerator as isAsynchronousGenerator };
export default isAsyncGenerator;
