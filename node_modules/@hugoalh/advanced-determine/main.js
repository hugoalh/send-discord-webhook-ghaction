/*==================
[NodeJS] Advanced Determine
	Language:
		NodeJS 14
==================*/
/**
 * @const {string} version
 */
const version = "2.0.2";

const configuration = require("./configuration.js");
const isArray = require("./isarray.js");
const isBuffer = require("./isbuffer.js");
const isNull = require("./isnull.js");
const isNumber = require("./isnumber.js");
const isNumberFloat = require("./isnumberfloat.js");
const isNumberNegative = require("./isnumbernegative.js");
const isNumberNegativeFloat = require("./isnumbernegativefloat.js");
const isNumberNegativeInteger = require("./isnumbernegativeinteger.js");
const isNumberNegativeSafeFloat = require("./isnumbernegativesafefloat.js");
const isNumberNegativeSafeInteger = require("./isnumbernegativesafeinteger.js");
const isNumberPositive = require("./isnumberpositive.js");
const isNumberPositiveFloat = require("./isnumberpositivefloat.js");
const isNumberPositiveInteger = require("./isnumberpositiveinteger.js");
const isNumberPositiveSafeFloat = require("./isnumberpositivesafefloat.js");
const isNumberPositiveSafeInteger = require("./isnumberpositivesafeinteger.js");
const isNumberSafeFloat = require("./isnumbersafefloat.js");
const isRegularExpression = require("./isregularexpression.js");
const isString = require("./isstring.js");
const isStringASCII = require("./isstringascii.js");
const isStringifyJSON = require("./isstringifyjson.js");
const isStringLowerCase = require("./isstringlowercase.js");
const isStringUpperCase = require("./isstringuppercase.js");
const isUndefined = require("./isundefined.js");
module.exports.allIs = require("./allis.js");
module.exports.cfg = configuration;
module.exports.config = configuration;
module.exports.configuration = configuration;
module.exports.isArr = isArray;
module.exports.isArray = isArray;
module.exports.isBoolean = require("./isboolean.js");
module.exports.isBuf = isBuffer;
module.exports.isBuffer = isBuffer;
module.exports.isDate = require("./isdate.js");
module.exports.isJSON = require("./isjson.js");
module.exports.isNul = isNull;
module.exports.isNull = isNull;
module.exports.isNum = isNumber;
module.exports.isNumber = isNumber;
module.exports.isNumberFloat = isNumberFloat;
module.exports.isNumberNegative = isNumberNegative;
module.exports.isNumberNegativeFloat = isNumberNegativeFloat;
module.exports.isNumberNegativeInteger = isNumberNegativeInteger;
module.exports.isNumberNegativeSafeFloat = isNumberNegativeSafeFloat;
module.exports.isNumberNegativeSafeInteger = isNumberNegativeSafeInteger;
module.exports.isNumberPositive = isNumberPositive;
module.exports.isNumberPositiveFloat = isNumberPositiveFloat;
module.exports.isNumberPositiveInteger = isNumberPositiveInteger;
module.exports.isNumberPositiveSafeFloat = isNumberPositiveSafeFloat;
module.exports.isNumberPositiveSafeInteger = isNumberPositiveSafeInteger;
module.exports.isNumberSafeFloat = isNumberSafeFloat;
module.exports.isNumFlt = isNumberFloat;
module.exports.isNumNgt = isNumberNegative;
module.exports.isNumNgtFlt = isNumberNegativeFloat;
module.exports.isNumNgtInt = isNumberNegativeInteger;
module.exports.isNumNgtSFlt = isNumberNegativeSafeFloat;
module.exports.isNumNgtSInt = isNumberNegativeSafeInteger;
module.exports.isNumPst = isNumberPositive;
module.exports.isNumPstFlt = isNumberPositiveFloat;
module.exports.isNumPstInt = isNumberPositiveInteger;
module.exports.isNumPstSFlt = isNumberPositiveSafeFloat;
module.exports.isNumPstSInt = isNumberPositiveSafeInteger;
module.exports.isNumSFlt = isNumberSafeFloat;
module.exports.isRegEx = isRegularExpression;
module.exports.isRegExp = isRegularExpression;
module.exports.isRegExr = isRegularExpression;
module.exports.isRegularExpression = isRegularExpression;
module.exports.isStr = isString;
module.exports.isStrASCII = isStringASCII;
module.exports.isString = isString;
module.exports.isStringASCII = isStringASCII;
module.exports.isStringifyJSON = isStringifyJSON;
module.exports.isStringLowerCase = isStringLowerCase;
module.exports.isStringUpperCase = isStringUpperCase;
module.exports.isStrJSON = isStringifyJSON;
module.exports.isStrL = isStringLowerCase;
module.exports.isStrU = isStringUpperCase;
module.exports.isUdf = isUndefined;
module.exports.isUndefined = isUndefined;
module.exports.v = version;
module.exports.ver = version;
module.exports.version = version;
