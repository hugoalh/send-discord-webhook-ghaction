/**
 * Enum of the numeric integral type.
 */
export var NumericIntegralType;
(function (NumericIntegralType) {
    NumericIntegralType["bigint"] = "int64";
    NumericIntegralType["bigInt"] = "int64";
    NumericIntegralType["Bigint"] = "int64";
    NumericIntegralType["BigInt"] = "int64";
    NumericIntegralType["biguint"] = "uint64";
    NumericIntegralType["bigUint"] = "uint64";
    NumericIntegralType["bigUInt"] = "uint64";
    NumericIntegralType["BigUint"] = "uint64";
    NumericIntegralType["BigUInt"] = "uint64";
    NumericIntegralType["byte"] = "uint8";
    NumericIntegralType["Byte"] = "uint8";
    NumericIntegralType["char"] = "int8";
    NumericIntegralType["Char"] = "int8";
    NumericIntegralType["int8"] = "int8";
    NumericIntegralType["Int8"] = "int8";
    NumericIntegralType["int16"] = "int16";
    NumericIntegralType["Int16"] = "int16";
    NumericIntegralType["int32"] = "int32";
    NumericIntegralType["Int32"] = "int32";
    NumericIntegralType["int64"] = "int64";
    NumericIntegralType["Int64"] = "int64";
    NumericIntegralType["int128"] = "int128";
    NumericIntegralType["Int128"] = "int128";
    NumericIntegralType["integer"] = "int32";
    NumericIntegralType["Integer"] = "int32";
    NumericIntegralType["long"] = "int64";
    NumericIntegralType["Long"] = "int64";
    NumericIntegralType["rune"] = "int32";
    NumericIntegralType["Rune"] = "int32";
    NumericIntegralType["short"] = "int16";
    NumericIntegralType["Short"] = "int16";
    NumericIntegralType["smallint"] = "int16";
    NumericIntegralType["smallInt"] = "int16";
    NumericIntegralType["SmallInt"] = "int16";
    NumericIntegralType["smalluint"] = "uint16";
    NumericIntegralType["smallUint"] = "uint16";
    NumericIntegralType["smallUInt"] = "uint16";
    NumericIntegralType["SmallUint"] = "uint16";
    NumericIntegralType["SmallUInt"] = "uint16";
    NumericIntegralType["tinyint"] = "int8";
    NumericIntegralType["tinyInt"] = "int8";
    NumericIntegralType["TinyInt"] = "int8";
    NumericIntegralType["tinyuint"] = "uint8";
    NumericIntegralType["tinyUint"] = "uint8";
    NumericIntegralType["tinyUInt"] = "uint8";
    NumericIntegralType["TinyUint"] = "uint8";
    NumericIntegralType["TinyUInt"] = "uint8";
    NumericIntegralType["uchar"] = "uint8";
    NumericIntegralType["uChar"] = "uint8";
    NumericIntegralType["Uchar"] = "uint8";
    NumericIntegralType["UChar"] = "uint8";
    NumericIntegralType["uint8"] = "uint8";
    NumericIntegralType["uInt8"] = "uint8";
    NumericIntegralType["Uint8"] = "uint8";
    NumericIntegralType["UInt8"] = "uint8";
    NumericIntegralType["uint16"] = "uint16";
    NumericIntegralType["uInt16"] = "uint16";
    NumericIntegralType["Uint16"] = "uint16";
    NumericIntegralType["UInt16"] = "uint16";
    NumericIntegralType["uint32"] = "uint32";
    NumericIntegralType["uInt32"] = "uint32";
    NumericIntegralType["Uint32"] = "uint32";
    NumericIntegralType["UInt32"] = "uint32";
    NumericIntegralType["uint64"] = "uint64";
    NumericIntegralType["uInt64"] = "uint64";
    NumericIntegralType["Uint64"] = "uint64";
    NumericIntegralType["UInt64"] = "uint64";
    NumericIntegralType["uint128"] = "uint128";
    NumericIntegralType["uInt128"] = "uint128";
    NumericIntegralType["Uint128"] = "uint128";
    NumericIntegralType["UInt128"] = "uint128";
    NumericIntegralType["uinteger"] = "uint32";
    NumericIntegralType["uInteger"] = "uint32";
    NumericIntegralType["Uinteger"] = "uint32";
    NumericIntegralType["UInteger"] = "uint32";
    NumericIntegralType["ulong"] = "uint64";
    NumericIntegralType["uLong"] = "uint64";
    NumericIntegralType["Ulong"] = "uint64";
    NumericIntegralType["ULong"] = "uint64";
    NumericIntegralType["ushort"] = "uint16";
    NumericIntegralType["uShort"] = "uint16";
    NumericIntegralType["Ushort"] = "uint16";
    NumericIntegralType["UShort"] = "uint16";
})(NumericIntegralType || (NumericIntegralType = {}));
/**
 * @access private
 * @param {bigint} base
 * @returns {NumericIntegralTypeRange}
 */
function resolveNumericIntegralTypeRangeIntBase(base) {
    const gridHalf = (2n ** base) / 2n;
    return {
        maximum: gridHalf - 1n,
        minimum: -gridHalf
    };
}
/**
 * @access private
 * @param {bigint} base
 * @returns {NumericIntegralTypeRange}
 */
function resolveNumericIntegralTypeRangeUIntBase(base) {
    return {
        maximum: (2n ** base) - 1n,
        minimum: 0n
    };
}
/**
 * @access private
 * @param {NumericIntegralType | NumericIntegralTypeStringify} name
 * @returns {NumericIntegralTypeRange}
 */
function resolveNumericIntegralTypeRange(name) {
    switch (NumericIntegralType[name]) {
        case "int8":
            return resolveNumericIntegralTypeRangeIntBase(8n);
        case "int16":
            return resolveNumericIntegralTypeRangeIntBase(16n);
        case "int32":
            return resolveNumericIntegralTypeRangeIntBase(32n);
        case "int64":
            return resolveNumericIntegralTypeRangeIntBase(64n);
        case "int128":
            return resolveNumericIntegralTypeRangeIntBase(128n);
        case "uint8":
            return resolveNumericIntegralTypeRangeUIntBase(8n);
        case "uint16":
            return resolveNumericIntegralTypeRangeUIntBase(16n);
        case "uint32":
            return resolveNumericIntegralTypeRangeUIntBase(32n);
        case "uint64":
            return resolveNumericIntegralTypeRangeUIntBase(64n);
        case "uint128":
            return resolveNumericIntegralTypeRangeUIntBase(128n);
        default:
            throw new RangeError(`\`${name}\` is not a valid integral numeric type! Only accept these values: ${Array.from(new Set(Object.keys(NumericIntegralType).sort()).values()).join(", ")}`);
    }
}
/**
 * Determine whether the numeric is in the range of the specify integral type.
 * @param {NumericIntegralType | NumericIntegralTypeStringify} typeName Name of the integral numeric type.
 * @param {bigint | number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumericIntegralType(typeName, item) {
    const { maximum, minimum } = resolveNumericIntegralTypeRange(typeName);
    if (typeof item === "bigint") {
        return (minimum <= item && item <= maximum);
    }
    return (Number.isInteger(item) && Number(minimum) <= item && item <= Number(maximum));
}
export default isNumericIntegralType;
