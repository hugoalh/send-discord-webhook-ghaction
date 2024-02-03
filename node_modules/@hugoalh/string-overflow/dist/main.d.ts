import { type StringDissectorOptions } from "@hugoalh/string-dissect";
interface StringOverflowTruncatorOptions extends StringDissectorOptions {
    /**
     * @property ellipsisMark
     * @description Ellipsis mark of the target string.
     * @default "..."
     */
    ellipsisMark?: string;
    /**
     * @property ellipsisPosition
     * @description Ellipsis position at the target string.
     * @default "End"
     */
    ellipsisPosition?: string;
}
/**
 * @class StringOverflowTruncator
 * @description String truncator to truncate the string with the specify length; Safe with the emojis, URLs, and words.
 */
declare class StringOverflowTruncator {
    #private;
    /**
     * @constructor
     * @description Initialize string truncator.
     * @param {number} maximumLength Maximum length of the target string.
     * @param {StringOverflowTruncatorOptions} [options={}] Options.
     */
    constructor(maximumLength: number, options?: StringOverflowTruncatorOptions);
    /**
     * @method truncate
     * @description Truncate the string.
     * @param {string} item String that need to truncate.
     * @param {number} [maximumLengthOverride] Override the preset maximum length of the target string.
     * @returns {string} A truncated string.
     */
    truncate(item: string, maximumLengthOverride?: number): string;
    /**
     * @static truncate
     * @description Truncate the string with the specify length; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to truncate.
     * @param {number} maximumLength Maximum length of the target string.
     * @param {StringOverflowTruncatorOptions} [options={}] Options.
     * @returns {string} A truncated string.
     */
    static truncate(item: string, maximumLength: number, options?: StringOverflowTruncatorOptions): string;
}
/**
 * @function stringOverflow
 * @description Truncate the string with the specify length; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to truncate.
 * @param {number} maximumLength Maximum length of the target string.
 * @param {StringOverflowTruncatorOptions} [options={}] Options.
 * @returns {string} A truncated string.
 */
declare function stringOverflow(item: string, maximumLength: number, options?: StringOverflowTruncatorOptions): string;
export { stringOverflow, StringOverflowTruncator, type StringOverflowTruncatorOptions };
//# sourceMappingURL=main.d.ts.map