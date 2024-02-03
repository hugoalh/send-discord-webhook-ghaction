/**
 * Type of JSON primitive.
 */
export type JSONPrimitive = boolean | null | number | string;
/**
 * Type of JSON array.
 */
export type JSONArray = JSONValue[];
/**
 * Type of JSON object.
 */
export type JSONObject = {
    [key: string]: JSONValue;
};
/**
 * Type of JSON value.
 */
export type JSONValue = JSONArray | JSONObject | JSONPrimitive;
/**
 * Type of JSON array (extend).
 */
export type JSONArrayExtend = JSONValueExtend[] | readonly JSONValueExtend[];
/**
 * Type of JSON object (extend).
 */
export type JSONObjectExtend = {
    [key: string]: JSONValueExtend | undefined;
};
/**
 * Type of JSON value (extend).
 */
export type JSONValueExtend = JSONArrayExtend | JSONObjectExtend | JSONPrimitive;
/**
 * Determine whether the item is a JSON.
 * @param {unknown} item Item that need to determine.
 * @returns {item is JSONValue} Determine result.
 */
export declare function isJSON(item: unknown): item is JSONValue;
export { isJSON as isJSONValue };
export default isJSON;
/**
 * Determine whether the item is a JSON array.
 * @param {unknown} item Item that need to determine.
 * @returns {item is JSONArray} Determine result.
 */
export declare function isJSONArray(item: unknown): item is JSONArray;
/**
 * Determine whether the item is a JSON object.
 * @param {unknown} item Item that need to determine.
 * @returns {item is JSONObject} Determine result.
 */
export declare function isJSONObject(item: unknown): item is JSONObject;
/**
 * Determine whether the item is a JSON primitive.
 * @param {unknown} item Item that need to determine.
 * @returns {item is JSONPrimitive} Determine result.
 */
export declare function isJSONPrimitive(item: unknown): item is JSONPrimitive;
//# sourceMappingURL=is-json.d.ts.map