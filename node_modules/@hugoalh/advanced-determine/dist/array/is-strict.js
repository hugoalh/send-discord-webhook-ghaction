const regexpArrayIndex = /^(?:0|[1-9]\d*)$/u;
/**
 * Determine whether the array is not contain custom defined properties.
 * @param {unknown[]} item Item that need to determine.
 * @returns {boolean} Determine result.
 * @example
 * isArrayStrict(Object.freeze([1, 2, 3, "foo", "bar", "baz"]) as unknown[]);
 * //=> false
 * @example
 * isArrayStrict([1, 2, 3, "foo", "bar", "baz"]);
 * //=> true
 */
export function isArrayStrict(item) {
    const itemPrototype = Object.getPrototypeOf(item);
    if ((itemPrototype !== null && itemPrototype !== Array.prototype) ||
        Object.getOwnPropertySymbols(item).length > 0) {
        return false;
    }
    const itemDescriptors = Object.getOwnPropertyDescriptors(item);
    for (const itemPropertyKey in itemDescriptors) {
        if (Object.hasOwn(itemDescriptors, itemPropertyKey)) {
            if (regexpArrayIndex.test(itemPropertyKey) && Number(itemPropertyKey) < 4294967296) {
                const itemPropertyDescriptor = itemDescriptors[itemPropertyKey];
                if (!itemPropertyDescriptor.configurable ||
                    !itemPropertyDescriptor.enumerable ||
                    typeof itemPropertyDescriptor.get !== "undefined" ||
                    typeof itemPropertyDescriptor.set !== "undefined" ||
                    !itemPropertyDescriptor.writable) {
                    return false;
                }
            }
            else if (itemPropertyKey === "length") {
                const itemPropertyDescriptor = itemDescriptors[itemPropertyKey];
                if (itemPropertyDescriptor.configurable ||
                    itemPropertyDescriptor.enumerable ||
                    typeof itemPropertyDescriptor.get !== "undefined" ||
                    typeof itemPropertyDescriptor.set !== "undefined" ||
                    !itemPropertyDescriptor.writable) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }
    return true;
}
export default isArrayStrict;
