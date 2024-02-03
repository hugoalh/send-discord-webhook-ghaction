/**
 * Type of JavaScript primitive.
 */
export type Primitive = bigint | boolean | null | number | string | symbol | undefined;
/**
 * Determine whether the item is a primitive.
 * @param {unknown} item Item that need to determine.
 * @returns {item is Primitive} Determine result.
 */
export declare function isPrimitive(item: unknown): item is Primitive;
export default isPrimitive;
//# sourceMappingURL=is-primitive.d.ts.map