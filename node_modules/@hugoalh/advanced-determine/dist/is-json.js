import { isArrayStrict } from "./array/is-strict.js";
import { isObjectPlain } from "./object/is-plain.js";
/**
 * Determine whether the item is a JSON.
 * @param {unknown} item Item that need to determine.
 * @returns {item is JSONValue} Determine result.
 */
export function isJSON(item) {
    return (isJSONArray(item) ||
        isJSONObject(item) ||
        isJSONPrimitive(item));
}
export { isJSON as isJSONValue };
export default isJSON;
/**
 * Determine whether the item is a JSON array.
 * @param {unknown} item Item that need to determine.
 * @returns {item is JSONArray} Determine result.
 */
export function isJSONArray(item) {
    if (!Array.isArray(item) ||
        !isArrayStrict(item)) {
        return false;
    }
    for (const element of item) {
        if (!isJSON(element)) {
            return false;
        }
    }
    return true;
}
/**
 * Determine whether the item is a JSON object.
 * @param {unknown} item Item that need to determine.
 * @returns {item is JSONObject} Determine result.
 */
export function isJSONObject(item) {
    if (typeof item !== "object" ||
        item === null ||
        Array.isArray(item)) {
        return false;
    }
    try {
        JSON.stringify(item);
    }
    catch {
        return false;
    }
    if (!isObjectPlain(item)) {
        return false;
    }
    for (const key in item) {
        if (Object.hasOwn(item, key)) {
            //@ts-ignore Impact not exists.
            if (!isJSON(item[key])) {
                return false;
            }
        }
    }
    return true;
}
/**
 * Determine whether the item is a JSON primitive.
 * @param {unknown} item Item that need to determine.
 * @returns {item is JSONPrimitive} Determine result.
 */
export function isJSONPrimitive(item) {
    switch (typeof item) {
        case "boolean":
        case "string":
            return true;
        case "number":
            return (!Number.isNaN(item) && item !== -Infinity && item !== Infinity);
        case "object":
            return (item === null);
        default:
            return false;
    }
}
