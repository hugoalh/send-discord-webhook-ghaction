var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StringOverflowTruncator_ellipsisMark, _StringOverflowTruncator_ellipsisPosition, _StringOverflowTruncator_maximumLength, _StringOverflowTruncator_resultLengthMaximum, _StringOverflowTruncator_stringDissector;
import { StringDissector } from "@hugoalh/string-dissect";
const ellipsisPositionEndRegExp = /^(?:[Ee](?:nd)?|[Rr](?:ight)?)$/u;
const ellipsisPositionMiddleRegExp = /^(?:[Cc](?:enter)?|[Mm](?:iddle)?)$/u;
const ellipsisPositionStartRegExp = /^(?:[Ll](?:eft)?|[Ss](?:tart)?)$/u;
/**
 * @access private
 * @function $checkLength
 * @param {number} maximumLength Maximum length of the target string.
 * @param {number} ellipsisMarkLength Ellipsis mark length of the target string.
 * @returns {void}
 */
function $checkLength(maximumLength, ellipsisMarkLength) {
    if (!(typeof maximumLength === "number" && !Number.isNaN(maximumLength))) {
        throw new TypeError(`Argument \`maximumLength\` must be type of number!`);
    }
    if (!(Number.isSafeInteger(maximumLength) && maximumLength >= 0)) {
        throw new RangeError(`Argument \`maximumLength\` must be a number which is integer, positive, and safe!`);
    }
    if (ellipsisMarkLength > maximumLength) {
        throw new Error(`Ellipsis string also overflow!`);
    }
}
/**
 * @class StringOverflowTruncator
 * @description String truncator to truncate the string with the specify length; Safe with the emojis, URLs, and words.
 */
class StringOverflowTruncator {
    /**
     * @constructor
     * @description Initialize string truncator.
     * @param {number} maximumLength Maximum length of the target string.
     * @param {StringOverflowTruncatorOptions} [options={}] Options.
     */
    constructor(maximumLength, options = {}) {
        _StringOverflowTruncator_ellipsisMark.set(this, void 0);
        _StringOverflowTruncator_ellipsisPosition.set(this, void 0);
        _StringOverflowTruncator_maximumLength.set(this, void 0);
        _StringOverflowTruncator_resultLengthMaximum.set(this, void 0);
        _StringOverflowTruncator_stringDissector.set(this, void 0);
        let { ellipsisMark = "...", ellipsisPosition = "End", safeURLs = true, safeWords = true } = options;
        if (typeof ellipsisMark !== "string") {
            throw new TypeError(`Argument \`ellipsisMark\` must be type of string!`);
        }
        if (typeof ellipsisPosition !== "string") {
            throw new TypeError(`Argument \`ellipsisPosition\` must be type of string!`);
        }
        if (ellipsisPositionEndRegExp.test(ellipsisPosition)) {
            __classPrivateFieldSet(this, _StringOverflowTruncator_ellipsisPosition, "E", "f");
        }
        else if (ellipsisPositionMiddleRegExp.test(ellipsisPosition)) {
            __classPrivateFieldSet(this, _StringOverflowTruncator_ellipsisPosition, "M", "f");
        }
        else if (ellipsisPositionStartRegExp.test(ellipsisPosition)) {
            __classPrivateFieldSet(this, _StringOverflowTruncator_ellipsisPosition, "S", "f");
        }
        else {
            throw new RangeError(`\`${ellipsisPosition}\` is not a valid ellipsis position!`);
        }
        $checkLength(maximumLength, ellipsisMark.length);
        __classPrivateFieldSet(this, _StringOverflowTruncator_ellipsisMark, ellipsisMark, "f");
        __classPrivateFieldSet(this, _StringOverflowTruncator_maximumLength, maximumLength, "f");
        __classPrivateFieldSet(this, _StringOverflowTruncator_resultLengthMaximum, maximumLength - ellipsisMark.length, "f");
        __classPrivateFieldSet(this, _StringOverflowTruncator_stringDissector, new StringDissector({
            safeURLs,
            safeWords
        }), "f");
    }
    /**
     * @method truncate
     * @description Truncate the string.
     * @param {string} item String that need to truncate.
     * @param {number} [maximumLengthOverride] Override the preset maximum length of the target string.
     * @returns {string} A truncated string.
     */
    truncate(item, maximumLengthOverride) {
        if (typeof item !== "string") {
            throw new TypeError(`Argument \`item\` must be type of string!`);
        }
        let maximumLength = __classPrivateFieldGet(this, _StringOverflowTruncator_maximumLength, "f");
        let resultLengthMaximum = __classPrivateFieldGet(this, _StringOverflowTruncator_resultLengthMaximum, "f");
        if (typeof maximumLengthOverride !== "undefined") {
            $checkLength(maximumLengthOverride, __classPrivateFieldGet(this, _StringOverflowTruncator_ellipsisMark, "f").length);
            maximumLength = maximumLengthOverride;
            resultLengthMaximum = maximumLengthOverride - __classPrivateFieldGet(this, _StringOverflowTruncator_ellipsisMark, "f").length;
        }
        if (item.length <= maximumLength) {
            return item;
        }
        let resultLengthLeft = 0;
        let resultLengthRight = 0;
        if (__classPrivateFieldGet(this, _StringOverflowTruncator_ellipsisPosition, "f") === "S") {
            resultLengthRight = resultLengthMaximum;
        }
        else if (__classPrivateFieldGet(this, _StringOverflowTruncator_ellipsisPosition, "f") === "M") {
            let resultLengthHalf = Math.floor(resultLengthMaximum / 2);
            resultLengthLeft = resultLengthHalf;
            resultLengthRight = resultLengthHalf;
        }
        else {
            resultLengthLeft = resultLengthMaximum;
        }
        let stringGroup = __classPrivateFieldGet(this, _StringOverflowTruncator_stringDissector, "f").dissect(item).map((value) => {
            return value.value;
        });
        let resultStringLeftGroup = [];
        for (let index = 0, resultStringLeftLength = 0; index < stringGroup.length; index++) {
            let content = stringGroup[index];
            if (resultStringLeftLength + content.length > resultLengthLeft) {
                break;
            }
            resultStringLeftGroup.push(content);
            resultStringLeftLength += content.length;
        }
        let resultStringRightGroup = [];
        for (let index = stringGroup.length - 1, resultStringRightLength = 0; index >= 0; index--) {
            let content = stringGroup[index];
            if (resultStringRightLength + content.length > resultLengthRight) {
                break;
            }
            resultStringRightGroup.unshift(content);
            resultStringRightLength += content.length;
        }
        return `${resultStringLeftGroup.join("")}${__classPrivateFieldGet(this, _StringOverflowTruncator_ellipsisMark, "f")}${resultStringRightGroup.join("")}`;
    }
    /**
     * @static truncate
     * @description Truncate the string with the specify length; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to truncate.
     * @param {number} maximumLength Maximum length of the target string.
     * @param {StringOverflowTruncatorOptions} [options={}] Options.
     * @returns {string} A truncated string.
     */
    static truncate(item, maximumLength, options = {}) {
        return new this(maximumLength, options).truncate(item);
    }
}
_StringOverflowTruncator_ellipsisMark = new WeakMap(), _StringOverflowTruncator_ellipsisPosition = new WeakMap(), _StringOverflowTruncator_maximumLength = new WeakMap(), _StringOverflowTruncator_resultLengthMaximum = new WeakMap(), _StringOverflowTruncator_stringDissector = new WeakMap();
/**
 * @function stringOverflow
 * @description Truncate the string with the specify length; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to truncate.
 * @param {number} maximumLength Maximum length of the target string.
 * @param {StringOverflowTruncatorOptions} [options={}] Options.
 * @returns {string} A truncated string.
 */
function stringOverflow(item, maximumLength, options = {}) {
    return new StringOverflowTruncator(maximumLength, options).truncate(item);
}
export { stringOverflow, StringOverflowTruncator };
