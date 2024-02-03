/**
 * Determine whether the object is plain.
 * @param {object} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isObjectPlain(item) {
    if (!(item instanceof Object) ||
        item.constructor.name !== "Object" ||
        Object.prototype.toString.call(item) !== "[object Object]") {
        return false;
    }
    const itemPrototype = Object.getPrototypeOf(item);
    if (itemPrototype !== null && itemPrototype !== Object.prototype) {
        return false;
    }
    let itemShadow = item;
    while (Object.getPrototypeOf(itemShadow) !== null) {
        itemShadow = Object.getPrototypeOf(itemShadow);
    }
    if (itemPrototype !== itemShadow) {
        return false;
    }
    if (Object.getOwnPropertySymbols(item).length > 0) {
        return false;
    }
    const itemEntriesConfigurable = [];
    const itemEntriesEnumerable = [];
    const itemEntriesGetter = [];
    const itemEntriesNonAccessor = [];
    const itemEntriesNonConfigurable = [];
    const itemEntriesNonEnumerable = [];
    const itemEntriesNonWritable = [];
    const itemEntriesSetter = [];
    const itemEntriesWritable = [];
    const itemDescriptors = Object.getOwnPropertyDescriptors(item);
    for (const descriptor in itemDescriptors) {
        if (Object.hasOwn(itemDescriptors, descriptor)) {
            const descriptorProperties = itemDescriptors[descriptor];
            if (descriptorProperties.configurable) {
                itemEntriesConfigurable.push(descriptor);
            }
            else {
                itemEntriesNonConfigurable.push(descriptor);
            }
            if (descriptorProperties.enumerable) {
                itemEntriesEnumerable.push(descriptor);
            }
            else {
                itemEntriesNonEnumerable.push(descriptor);
            }
            if (typeof descriptorProperties.get !== "undefined") {
                itemEntriesGetter.push(descriptor);
            }
            if (typeof descriptorProperties.set !== "undefined") {
                itemEntriesSetter.push(descriptor);
            }
            if (typeof descriptorProperties.get === "undefined" && typeof descriptorProperties.set === "undefined") {
                itemEntriesNonAccessor.push(descriptor);
            }
            if (descriptorProperties.writable) {
                itemEntriesWritable.push(descriptor);
            }
            else {
                itemEntriesNonWritable.push(descriptor);
            }
        }
        else {
            return false;
        }
    }
    if (Object.entries(item).length !== itemEntriesEnumerable.length ||
        itemEntriesConfigurable.length + itemEntriesNonConfigurable.length !== itemEntriesEnumerable.length + itemEntriesNonEnumerable.length ||
        itemEntriesEnumerable.length + itemEntriesNonEnumerable.length !== itemEntriesGetter.length + itemEntriesNonAccessor.length + itemEntriesSetter.length ||
        itemEntriesGetter.length + itemEntriesNonAccessor.length + itemEntriesSetter.length !== itemEntriesNonWritable.length + itemEntriesWritable.length ||
        itemEntriesConfigurable.length + itemEntriesNonConfigurable.length !== itemEntriesNonWritable.length + itemEntriesWritable.length ||
        itemEntriesNonConfigurable.length > 0 ||
        itemEntriesNonEnumerable.length > 0 ||
        itemEntriesGetter.length > 0 ||
        itemEntriesSetter.length > 0 ||
        itemEntriesNonWritable.length > 0) {
        return false;
    }
    return true;
}
