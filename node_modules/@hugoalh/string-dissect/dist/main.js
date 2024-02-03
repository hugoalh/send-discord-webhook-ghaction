import regexpANSIOriginal from "ansi-regex";
import regexpURLOriginal from "url-regex-safe";
const regexpANSIGlobal = new RegExp(regexpANSIOriginal().source, "gu");
const regexpEmojiExact = /^\p{Emoji}+$/v;
const regexpURLGlobal = new RegExp(regexpURLOriginal().source, "gu");
/**
 * Enum of string segment type.
 */
export var StringSegmentType;
(function (StringSegmentType) {
    StringSegmentType["ansi"] = "ansi";
    StringSegmentType["ANSI"] = "ansi";
    StringSegmentType["character"] = "character";
    StringSegmentType["Character"] = "character";
    StringSegmentType["emoji"] = "emoji";
    StringSegmentType["Emoji"] = "emoji";
    StringSegmentType["url"] = "url";
    StringSegmentType["Url"] = "url";
    StringSegmentType["URL"] = "url";
    StringSegmentType["word"] = "word";
    StringSegmentType["Word"] = "word";
})(StringSegmentType || (StringSegmentType = {}));
/**
 * @access private
 * @param {StringDissectSegmentByRegExpParameters} param0
 * @returns {Generator<string | StringSegmentDescriptor>}
 */
function* dissectSegmentWithRegExp({ matcher, segment, type }) {
    let cursor = 0;
    for (const match of Array.from(segment.matchAll(matcher))) {
        const value = match[0];
        const indexStart = match.index;
        if (cursor < indexStart) {
            yield segment.slice(cursor, indexStart);
        }
        yield { type, value };
        cursor = indexStart + value.length;
    }
    if (cursor < segment.length) {
        yield segment.slice(cursor, segment.length);
    }
}
/**
 * String dissector to dissect the string; Safe with the emojis, URLs, and words.
 */
export class StringDissector {
    #locales;
    #removeANSI;
    #safeURLs;
    #safeWords;
    /**
     * Initialize string dissector.
     * @param {StringDissectorOptions} [options={}] Options.
     */
    constructor(options = {}) {
        this.#locales = options.locales;
        this.#removeANSI = options.removeANSI ?? false;
        this.#safeURLs = options.safeURLs ?? true;
        this.#safeWords = options.safeWords ?? true;
        void new Intl.Segmenter(this.#locales, { granularity: this.#safeWords ? "word" : "grapheme" });
    }
    /**
     * Dissect the string.
     * @param {string} item String that need to dissect.
     * @param {StringDissectorOptions} [optionsOverride={}] Override the defined options.
     * @returns {Generator<StringSegmentDescriptor>} A dissected string with descriptor.
     */
    *dissect(item, optionsOverride = {}) {
        const locales = optionsOverride.locales ?? this.#locales;
        const removeANSI = optionsOverride.removeANSI ?? this.#removeANSI;
        const safeURLs = optionsOverride.safeURLs ?? this.#safeURLs;
        const safeWords = optionsOverride.safeWords ?? this.#safeWords;
        const segmenter = new Intl.Segmenter(locales, { granularity: safeWords ? "word" : "grapheme" });
        for (const segmentWithANSI of dissectSegmentWithRegExp({
            matcher: regexpANSIGlobal,
            segment: item,
            type: StringSegmentType.ANSI
        })) {
            if (typeof segmentWithANSI !== "string") {
                if (!removeANSI) {
                    yield segmentWithANSI;
                }
                continue;
            }
            for (const segmentWithURL of (safeURLs ? dissectSegmentWithRegExp({
                matcher: regexpURLGlobal,
                segment: segmentWithANSI,
                type: StringSegmentType.URL
            }) : [segmentWithANSI])) {
                if (typeof segmentWithURL !== "string") {
                    yield segmentWithURL;
                    continue;
                }
                for (const { isWordLike, segment } of segmenter.segment(segmentWithURL)) {
                    if (regexpEmojiExact.test(segment)) {
                        yield {
                            type: StringSegmentType.Emoji,
                            value: segment
                        };
                        continue;
                    }
                    yield {
                        type: isWordLike ? StringSegmentType.Word : StringSegmentType.Character,
                        value: segment
                    };
                }
            }
        }
    }
    /**
     * Dissect the string with extend information.
     * @param {string} item String that need to dissect.
     * @param {StringDissectorOptions} [optionsOverride={}] Override the defined options.
     * @returns {Generator<StringSegmentDescriptorExtend>} A dissected string with extend descriptor.
     */
    *dissectExtend(item, optionsOverride = {}) {
        const removeANSI = optionsOverride.removeANSI ?? this.#removeANSI;
        let cursor = 0;
        for (const segment of this.dissect(item, { ...optionsOverride, removeANSI: false })) {
            if (!(segment.type === StringSegmentType.ANSI && removeANSI)) {
                yield {
                    ...segment,
                    indexEnd: cursor + segment.value.length,
                    indexStart: cursor
                };
            }
            cursor += segment.value.length;
        }
    }
    /**
     * Dissect the string; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to dissect.
     * @param {StringDissectorOptions} [options={}] Options.
     * @returns {Generator<StringSegmentDescriptor>} A dissected string with descriptor.
     */
    static dissect(item, options = {}) {
        return new this(options).dissect(item);
    }
    /**
     * Dissect the string with extend information; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to dissect.
     * @param {StringDissectorOptions} [options={}] Options.
     * @returns {Generator<StringSegmentDescriptorExtend>} A dissected string with extend descriptor.
     */
    static dissectExtend(item, options = {}) {
        return new this(options).dissectExtend(item);
    }
}
export default StringDissector;
/**
 * Dissect the string; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to dissect.
 * @param {StringDissectorOptions} [options={}] Options.
 * @returns {Generator<StringSegmentDescriptor>} A dissected string with descriptor.
 */
export function stringDissect(item, options = {}) {
    return new StringDissector(options).dissect(item);
}
/**
 * Dissect the string with extend information; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to dissect.
 * @param {StringDissectorOptions} [options={}] Options.
 * @returns {Generator<StringSegmentDescriptorExtend>} A dissected string with extend descriptor.
 */
export function stringDissectExtend(item, options = {}) {
    return new StringDissector(options).dissectExtend(item);
}
