import { type StringDissectorOptions } from "@hugoalh/string-dissect";
/**
 * Enum of the string truncate ellipsis position.
 */
export declare enum StringTruncateEllipsisPosition {
    end = "end",
    End = "end",
    middle = "middle",
    Middle = "middle",
    start = "start",
    Start = "start"
}
/**
 * Key of enum of the string truncate ellipsis position.
 */
export type StringTruncateEllipsisPositionStringify = keyof typeof StringTruncateEllipsisPosition;
export interface StringTruncatorOptions extends StringDissectorOptions {
    /**
     * Ellipsis mark of the target string.
     * @default "..."
     */
    ellipsisMark?: string;
    /**
     * Ellipsis position at the target string.
     * @default "end"
     */
    ellipsisPosition?: StringTruncateEllipsisPosition | StringTruncateEllipsisPositionStringify;
}
/**
 * String truncator to truncate the string with the specify length; Safe with the emojis, URLs, and words.
 */
export declare class StringTruncator {
    #private;
    /**
     * Initialize string truncator.
     * @param {number} maximumLength Maximum length of the target string.
     * @param {StringTruncatorOptions} [options={}] Options.
     */
    constructor(maximumLength: number, options?: StringTruncatorOptions);
    /**
     * Truncate the string.
     * @param {string} item String that need to truncate.
     * @param {number} [maximumLengthOverride] Override the defined maximum length of the target string.
     * @returns {string} A truncated string.
     */
    truncate(item: string, maximumLengthOverride?: number): string;
    /**
     * Truncate the string with the specify length; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to truncate.
     * @param {number} maximumLength Maximum length of the target string.
     * @param {StringTruncatorOptions} [options={}] Options.
     * @returns {string} A truncated string.
     */
    static truncate(item: string, maximumLength: number, options?: StringTruncatorOptions): string;
}
export default StringTruncator;
/**
 * Truncate the string with the specify length; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to truncate.
 * @param {number} maximumLength Maximum length of the target string.
 * @param {StringTruncatorOptions} [options={}] Options.
 * @returns {string} A truncated string.
 */
export declare function stringTruncate(item: string, maximumLength: number, options?: StringTruncatorOptions): string;
//# sourceMappingURL=main.d.ts.map