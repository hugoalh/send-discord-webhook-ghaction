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
var _StringDissector_safeURLs, _StringDissector_safeWords;
import ansiRegExpOriginal from "ansi-regex";
import characterRegExpOriginal from "char-regex";
import emojiRegExpOriginal from "emoji-regex";
import urlRegExpOriginal from "url-regex-safe";
const ansiRegExp = new RegExp(ansiRegExpOriginal().source, "u");
const characterRegExp = new RegExp(characterRegExpOriginal().source, "u");
const emojiRegExp = new RegExp(emojiRegExpOriginal().source, "u");
const urlRegExp = new RegExp(urlRegExpOriginal().source, "u");
const wordsRegExp = /[\d\w]+(?:[~@#$%&*_'.-][\d\w]+)*/u;
/**
 * @class StringDissector
 * @description Dissect the string; Safe with the emojis, URLs, and words.
 */
class StringDissector {
    /**
     * @constructor
     * @description Initialize string dissector.
     * @param {StringDissectorOptions} [options={}] Options.
     */
    constructor(options = {}) {
        _StringDissector_safeURLs.set(this, void 0);
        _StringDissector_safeWords.set(this, void 0);
        let { safeURLs = true, safeWords = true } = options;
        if (typeof safeURLs !== "boolean") {
            throw new TypeError(`Argument \`safeURLs\` must be type of boolean!`);
        }
        if (typeof safeWords !== "boolean") {
            throw new TypeError(`Argument \`safeWords\` must be type of boolean!`);
        }
        __classPrivateFieldSet(this, _StringDissector_safeURLs, safeURLs, "f");
        __classPrivateFieldSet(this, _StringDissector_safeWords, safeWords, "f");
    }
    /**
     * @method dissect
     * @description Dissect the string.
     * @param {string} item String that need to dissect.
     * @returns {StringDescriptor[]} A dissected string.
     */
    dissect(item) {
        if (typeof item !== "string") {
            throw new TypeError(`Argument \`item\` must be type of string!`);
        }
        let itemRaw = item;
        let result = [];
        /**
         * @access private
         * @function unshiftItem
         * @param {string} value
         * @param {StringDissectType} type
         * @returns {void}
         */
        function unshiftItem(value, type) {
            result.push({
                value,
                type,
                typeANSI: type === "ANSI",
                typeCharacter: type === "Character",
                typeEmoji: type === "Emoji",
                typeUrl: type === "Url",
                typeWord: type === "Word"
            });
            itemRaw = itemRaw.substring(value.length);
        }
        while (itemRaw.length > 0) {
            if (itemRaw.search(ansiRegExp) === 0) {
                unshiftItem(itemRaw.match(ansiRegExp)[0], "ANSI");
                continue;
            }
            if (itemRaw.search(emojiRegExp) === 0) {
                unshiftItem(itemRaw.match(emojiRegExp)[0], "Emoji");
                continue;
            }
            if (__classPrivateFieldGet(this, _StringDissector_safeURLs, "f") && itemRaw.search(urlRegExp) === 0) {
                unshiftItem(itemRaw.match(urlRegExp)[0], "Url");
                continue;
            }
            if (__classPrivateFieldGet(this, _StringDissector_safeWords, "f") && itemRaw.search(wordsRegExp) === 0) {
                unshiftItem(itemRaw.match(wordsRegExp)[0], "Word");
                continue;
            }
            if (itemRaw.search(characterRegExp) === 0) {
                unshiftItem(itemRaw.match(characterRegExp)[0], "Character");
                continue;
            }
            unshiftItem(itemRaw.charAt(0), "Character");
        }
        return result;
    }
    /**
     * @static dissect
     * @description Dissect the string; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to dissect.
     * @param {StringDissectorOptions} [options={}] Options.
     * @returns {StringDescriptor[]} A dissected string.
     */
    static dissect(item, options = {}) {
        return new this(options).dissect(item);
    }
}
_StringDissector_safeURLs = new WeakMap(), _StringDissector_safeWords = new WeakMap();
/**
 * @function stringDissect
 * @description Dissect the string; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to dissect.
 * @param {StringDissectorOptions} [options={}] Options.
 * @returns {StringDescriptor[]} A dissected string.
 */
function stringDissect(item, options = {}) {
    return new StringDissector(options).dissect(item);
}
export { stringDissect, StringDissector };
