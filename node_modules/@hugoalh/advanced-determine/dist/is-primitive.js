/**
 * Determine whether the item is a primitive.
 * @param {unknown} item Item that need to determine.
 * @returns {item is Primitive} Determine result.
 */
export function isPrimitive(item) {
    switch (typeof item) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "symbol":
        case "undefined":
            return true;
        case "object":
            return (item === null);
        default:
            return false;
    }
}
export default isPrimitive;
