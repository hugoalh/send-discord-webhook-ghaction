import { StringDissector } from "@hugoalh/string-dissect";
/**
 * Enum of the string truncate ellipsis position.
 */
export var StringTruncateEllipsisPosition;
(function (StringTruncateEllipsisPosition) {
    StringTruncateEllipsisPosition["end"] = "end";
    StringTruncateEllipsisPosition["End"] = "end";
    StringTruncateEllipsisPosition["middle"] = "middle";
    StringTruncateEllipsisPosition["Middle"] = "middle";
    StringTruncateEllipsisPosition["start"] = "start";
    StringTruncateEllipsisPosition["Start"] = "start";
})(StringTruncateEllipsisPosition || (StringTruncateEllipsisPosition = {}));
/**
 * Check length.
 * @access private
 * @param {number} maximumLength Maximum length of the target string.
 * @param {number} ellipsisMarkLength Ellipsis mark length of the target string.
 * @returns {void}
 */
function checkLength(maximumLength, ellipsisMarkLength) {
    if (!(Number.isSafeInteger(maximumLength) && maximumLength >= 0)) {
        throw new RangeError(`Argument \`maximumLength\` is not a number which is integer, positive, and safe!`);
    }
    if (ellipsisMarkLength > maximumLength) {
        throw new Error(`Ellipsis string is too long!`);
    }
}
/**
 * String truncator to truncate the string with the specify length; Safe with the emojis, URLs, and words.
 */
export class StringTruncator {
    #ellipsisMark = "...";
    #ellipsisPosition = StringTruncateEllipsisPosition.End;
    #maximumLength;
    #resultLengthMaximum;
    #stringDissector;
    /**
     * Initialize string truncator.
     * @param {number} maximumLength Maximum length of the target string.
     * @param {StringTruncatorOptions} [options={}] Options.
     */
    constructor(maximumLength, options = {}) {
        if (typeof options.ellipsisMark !== "undefined") {
            this.#ellipsisMark = options.ellipsisMark;
        }
        if (typeof options.ellipsisPosition !== "undefined") {
            const value = StringTruncateEllipsisPosition[options.ellipsisPosition];
            if (typeof value === "undefined") {
                throw new RangeError(`\`${options.ellipsisPosition}\` is not a valid ellipsis position! Only accept these values: ${Array.from(new Set(Object.keys(StringTruncateEllipsisPosition).sort()).values()).join(", ")}`);
            }
            this.#ellipsisPosition = value;
        }
        checkLength(maximumLength, this.#ellipsisMark.length);
        this.#maximumLength = maximumLength;
        this.#resultLengthMaximum = this.#maximumLength - this.#ellipsisMark.length;
        this.#stringDissector = new StringDissector({
            locales: options.locales,
            removeANSI: options.removeANSI,
            safeURLs: options.safeURLs,
            safeWords: options.safeWords
        });
    }
    /**
     * Truncate the string.
     * @param {string} item String that need to truncate.
     * @param {number} [maximumLengthOverride] Override the defined maximum length of the target string.
     * @returns {string} A truncated string.
     */
    truncate(item, maximumLengthOverride) {
        let maximumLength = this.#maximumLength;
        let resultLengthMaximum = this.#resultLengthMaximum;
        if (typeof maximumLengthOverride !== "undefined") {
            checkLength(maximumLengthOverride, this.#ellipsisMark.length);
            maximumLength = maximumLengthOverride;
            resultLengthMaximum = maximumLengthOverride - this.#ellipsisMark.length;
        }
        if (item.length <= maximumLength) {
            return item;
        }
        let resultLengthEnd = 0;
        let resultLengthStart = 0;
        switch (this.#ellipsisPosition) {
            case "end":
                resultLengthStart = resultLengthMaximum;
                break;
            case "middle":
                {
                    const resultLengthHalf = Math.floor(resultLengthMaximum / 2);
                    resultLengthStart = resultLengthHalf;
                    resultLengthEnd = resultLengthHalf;
                }
                break;
            case "start":
                resultLengthEnd = resultLengthMaximum;
                break;
        }
        const stringSegments = Array.from(this.#stringDissector.dissect(item), (segment) => {
            return segment.value;
        });
        let resultStringStart = "";
        for (let index = 0; index < stringSegments.length; index += 1) {
            const segment = stringSegments[index];
            if (resultStringStart.length + segment.length > resultLengthStart) {
                break;
            }
            resultStringStart = `${resultStringStart}${segment}`;
        }
        let resultStringEnd = "";
        for (let index = stringSegments.length - 1; index >= 0; index -= 1) {
            const segment = stringSegments[index];
            if (resultStringEnd.length + segment.length > resultLengthEnd) {
                break;
            }
            resultStringEnd = `${segment}${resultStringEnd}`;
        }
        return `${resultStringStart}${this.#ellipsisMark}${resultStringEnd}`;
    }
    /**
     * Truncate the string with the specify length; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to truncate.
     * @param {number} maximumLength Maximum length of the target string.
     * @param {StringTruncatorOptions} [options={}] Options.
     * @returns {string} A truncated string.
     */
    static truncate(item, maximumLength, options = {}) {
        return new this(maximumLength, options).truncate(item);
    }
}
export default StringTruncator;
/**
 * Truncate the string with the specify length; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to truncate.
 * @param {number} maximumLength Maximum length of the target string.
 * @param {StringTruncatorOptions} [options={}] Options.
 * @returns {string} A truncated string.
 */
export function stringTruncate(item, maximumLength, options = {}) {
    return new StringTruncator(maximumLength, options).truncate(item);
}
