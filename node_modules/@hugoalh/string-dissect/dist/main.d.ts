type StringDissectorLocales = ConstructorParameters<typeof Intl.Segmenter>[0];
export interface StringDissectorOptions {
    /**
     * The locale(s) to use in the operation; The JavaScript implementation examines locales, and then computes a locale it understands that comes closest to satisfying the expressed preference. By default, the implementation's default locale will be used. For more information, please visit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument.
     * @default undefined
     */
    locales?: StringDissectorLocales;
    /**
     * Whether to remove ANSI escape codes.
     * @default false
     */
    removeANSI?: boolean;
    /**
     * Whether to prevent URLs get splitted.
     * @default true
     */
    safeURLs?: boolean;
    /**
     * Whether to prevent words get splitted.
     * @default true
     */
    safeWords?: boolean;
}
/**
 * Enum of string segment type.
 */
export declare enum StringSegmentType {
    ansi = "ansi",
    ANSI = "ansi",
    character = "character",
    Character = "character",
    emoji = "emoji",
    Emoji = "emoji",
    url = "url",
    Url = "url",
    URL = "url",
    word = "word",
    Word = "word"
}
/**
 * String segment descriptor.
 */
export interface StringSegmentDescriptor {
    type: StringSegmentType;
    value: string;
}
/**
 * String segment descriptor with extend information.
 */
export interface StringSegmentDescriptorExtend extends StringSegmentDescriptor {
    indexEnd: number;
    indexStart: number;
}
/**
 * String dissector to dissect the string; Safe with the emojis, URLs, and words.
 */
export declare class StringDissector {
    #private;
    /**
     * Initialize string dissector.
     * @param {StringDissectorOptions} [options={}] Options.
     */
    constructor(options?: StringDissectorOptions);
    /**
     * Dissect the string.
     * @param {string} item String that need to dissect.
     * @param {StringDissectorOptions} [optionsOverride={}] Override the defined options.
     * @returns {Generator<StringSegmentDescriptor>} A dissected string with descriptor.
     */
    dissect(item: string, optionsOverride?: StringDissectorOptions): Generator<StringSegmentDescriptor>;
    /**
     * Dissect the string with extend information.
     * @param {string} item String that need to dissect.
     * @param {StringDissectorOptions} [optionsOverride={}] Override the defined options.
     * @returns {Generator<StringSegmentDescriptorExtend>} A dissected string with extend descriptor.
     */
    dissectExtend(item: string, optionsOverride?: StringDissectorOptions): Generator<StringSegmentDescriptorExtend>;
    /**
     * Dissect the string; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to dissect.
     * @param {StringDissectorOptions} [options={}] Options.
     * @returns {Generator<StringSegmentDescriptor>} A dissected string with descriptor.
     */
    static dissect(item: string, options?: StringDissectorOptions): Generator<StringSegmentDescriptor>;
    /**
     * Dissect the string with extend information; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to dissect.
     * @param {StringDissectorOptions} [options={}] Options.
     * @returns {Generator<StringSegmentDescriptorExtend>} A dissected string with extend descriptor.
     */
    static dissectExtend(item: string, options?: StringDissectorOptions): Generator<StringSegmentDescriptorExtend>;
}
export default StringDissector;
/**
 * Dissect the string; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to dissect.
 * @param {StringDissectorOptions} [options={}] Options.
 * @returns {Generator<StringSegmentDescriptor>} A dissected string with descriptor.
 */
export declare function stringDissect(item: string, options?: StringDissectorOptions): Generator<StringSegmentDescriptor>;
/**
 * Dissect the string with extend information; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to dissect.
 * @param {StringDissectorOptions} [options={}] Options.
 * @returns {Generator<StringSegmentDescriptorExtend>} A dissected string with extend descriptor.
 */
export declare function stringDissectExtend(item: string, options?: StringDissectorOptions): Generator<StringSegmentDescriptorExtend>;
//# sourceMappingURL=main.d.ts.map