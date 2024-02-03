interface StringDissectorOptions {
    /**
     * @property safeURLs
     * @description Whether to prevent URLs get splitted.
     * @default true
     */
    safeURLs?: boolean;
    /**
     * @property safeWords
     * @description Whether to prevent words get splitted.
     * @default true
     */
    safeWords?: boolean;
}
type StringDissectType = "ANSI" | "Character" | "Emoji" | "Url" | "Word";
type StringDescriptor = {
    value: string;
    type: StringDissectType;
    typeANSI: boolean;
    typeCharacter: boolean;
    typeEmoji: boolean;
    typeUrl: boolean;
    typeWord: boolean;
};
/**
 * @class StringDissector
 * @description Dissect the string; Safe with the emojis, URLs, and words.
 */
declare class StringDissector {
    #private;
    /**
     * @constructor
     * @description Initialize string dissector.
     * @param {StringDissectorOptions} [options={}] Options.
     */
    constructor(options?: StringDissectorOptions);
    /**
     * @method dissect
     * @description Dissect the string.
     * @param {string} item String that need to dissect.
     * @returns {StringDescriptor[]} A dissected string.
     */
    dissect(item: string): StringDescriptor[];
    /**
     * @static dissect
     * @description Dissect the string; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to dissect.
     * @param {StringDissectorOptions} [options={}] Options.
     * @returns {StringDescriptor[]} A dissected string.
     */
    static dissect(item: string, options?: StringDissectorOptions): StringDescriptor[];
}
/**
 * @function stringDissect
 * @description Dissect the string; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to dissect.
 * @param {StringDissectorOptions} [options={}] Options.
 * @returns {StringDescriptor[]} A dissected string.
 */
declare function stringDissect(item: string, options?: StringDissectorOptions): StringDescriptor[];
export { stringDissect, StringDissector, type StringDescriptor, type StringDissectorOptions, type StringDissectType };
//# sourceMappingURL=main.d.ts.map