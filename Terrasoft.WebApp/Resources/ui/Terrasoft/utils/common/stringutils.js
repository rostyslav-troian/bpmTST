Ext.ns("Terrasoft.utils.string");

/**
 * @singleton
 */

/**
 * Empty string literal.
 * @type {String}
 */
Terrasoft.utils.string.emptyString = "";

/**
 * Alias for {@link Terrasoft.utils.string#emptyString}
 * @member Terrasoft
 * @inheritdoc Terrasoft.utils.string#emptyString
 */
Terrasoft.emptyString = Terrasoft.utils.string.emptyString;

/**
 * Performs parametrized replace in string.
 * Example:
 * getFormattedString('some {0} text {1}', 'good', 'allowed')
 * Result:
 * 'some good text allowed'
 * @param {String} string String to format.
 * @return {String} Formatted string.
 */
Terrasoft.getFormattedString = function(string) {
	var args = Array.prototype.slice.call(arguments, 1);
	var searchRegExp = /\{(\d*)\}/ig;
	if (string === undefined) {
		throw new Error("parameter string is not defined");
	}
	return string.replace(searchRegExp, function(value, index) {
		var positionIndex = parseInt(index, Terrasoft.NumeralSystem.DECIMAL);
		return args[positionIndex] || value;
	});
};

/**
 * Returns string representation of value.
 * @throws {Terrasoft.exceptions.ItemNotFoundException}
 * Throws exception {@link Terrasoft.exceptions#ItemNotFoundException} if type is unsupported.
 * @param {Number/String/Object/Boolean/Date} value Value to transform.
 * @param {Terrasoft.DataValueType} type Value datatype.
 * @param {Object} [config] String format config.
 * @return {String} Value string representation.
 */
Terrasoft.getTypedStringValue = function(value, type, config) {
	if (!Ext.isNumber(type)) {
		return;
	}
	switch (type) {
		case Terrasoft.DataValueType.DATE:
			return Ext.isDate(value) ? Ext.Date.format(value, Terrasoft.Resources.CultureSettings.dateFormat) : "";
		case Terrasoft.DataValueType.TIME:
			return Ext.isDate(value) ? Ext.Date.format(value, Terrasoft.Resources.CultureSettings.timeFormat) : "";
		case Terrasoft.DataValueType.DATE_TIME:
			return Ext.isDate(value) ? Ext.Date.format(value, Terrasoft.Resources.CultureSettings.dateFormat + " " +
				Terrasoft.Resources.CultureSettings.timeFormat) : "";
		case Terrasoft.DataValueType.LOOKUP:
		case Terrasoft.DataValueType.MAPPING:
			return value ? value.displayValue : "";
		case Terrasoft.DataValueType.MONEY:
			return Terrasoft.getFormattedNumberValue(value, {type: Terrasoft.DataValueType.MONEY});
		case Terrasoft.DataValueType.FLOAT:
			var decimalPrecision = config ? config.decimalPrecision : null;
			return Terrasoft.getFormattedNumberValue(value, {decimalPrecision: decimalPrecision});
		case Terrasoft.DataValueType.INTEGER:
			return Terrasoft.getFormattedNumberValue(value, {type: Terrasoft.DataValueType.INTEGER});
		case Terrasoft.DataValueType.TEXT:
		case Terrasoft.DataValueType.SHORT_TEXT:
		case Terrasoft.DataValueType.MEDIUM_TEXT:
		case Terrasoft.DataValueType.LONG_TEXT:
		case Terrasoft.DataValueType.MAXSIZE_TEXT:
		case Terrasoft.DataValueType.GUID:
			return value;
		case Terrasoft.DataValueType.BOOLEAN:
			var result = value
				? Terrasoft.Resources.CommonUtils.TrueStringValue
				: Terrasoft.Resources.CommonUtils.FalseStringValue;
			return result;
		default:
			throw new Terrasoft.exceptions.UnsupportedTypeException({
				message: type + " is unsupported type"
			});
	}
};

/**
 * Alias for {@link Terrasoft#getTypedStringValue}
 */
Terrasoft.utils.string.getTypedStringValue = Terrasoft.getTypedStringValue;

/**
 * Creates string of given length consisting of given character.
 * Example:
 * var str = Terrasoft.utils.string.getUniformString(5, 'a') // str = 'aaaaa'
 * @param  {Number} length String length.
 * @param  {String} symbol Character to fill string.
 * @return {String} String of given length and given character.
 */
Terrasoft.utils.string.getUniformString = function(length, symbol) {
	if (length <= 0) {
		return "";
	}
	var zerosArr = new Array(length + 1);
	return zerosArr.join(symbol);
};

/**
 * Alias for {@link Terrasoft.utils.string#getUniformString}
 * @member Terrasoft
 * @method getUniformString
 * @inheritdoc Terrasoft.utils.string#getUniformString
 */
Terrasoft.getUniformString = Terrasoft.utils.string.getUniformString;

/**
 * Checks whether string is valid URL.
 * @param {String} value String representation of URL.
 * @return {Boolean} Returns true if string is valid URL.
 */
Terrasoft.utils.string.isUrl = function(value) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.isUrl", "Terrasoft.utils.uri.isUrl");
	console.log(obsoleteMessage);
	return Terrasoft.utils.uri.isUrl(value);
};

/**
 * Adds missing number of characters in the beginning of the string.
 * @param {String} value Source string.
 * @param {Number} length Required length of result string.
 * @param {String} symbol (optional) Symbol to add to string (optional).
 * @return {String} String of required length.
 */
Terrasoft.utils.string.pad = function(value, length, symbol) {
	symbol = symbol || "0";
	value = String(value);
	return (value.length >= length) ? value : new Array(length - value.length + 1).join(symbol) + value;
};

/**
 * Alias for {@link Terrasoft.utils.string#pad}
 * @member Terrasoft
 * @method pad
 * @inheritdoc Terrasoft.utils.string#pad
 */
Terrasoft.pad = Terrasoft.utils.string.pad;

/**
 * Performs reverse of string.
 *
 * Example:
 * var str = Terrasoft.utils.string.reverseStr('1234') // str = '4321'
 *
 * @param {String} str Source string.
 * @return {String} Reversed string.
 */
Terrasoft.utils.string.reverseStr = function(str) {
	var arr = str.split("");
	var reverseArr = arr.reverse();
	return reverseArr.join("");
};

/**
 * Alias for {@link Terrasoft.utils.string#reverseStr}
 * @member Terrasoft
 * @method reverseStr
 * @inheritdoc Terrasoft.utils.string#reverseStr
 */
Terrasoft.reverseStr = Terrasoft.utils.string.reverseStr;

/**
 * Returns copy of string transformed to lowerCamelCase.
 * @param  {String} value Source string.
 * @return {String} String transformed to lowerCamelCase.
 */
Terrasoft.utils.string.toLowerCamelCase = function(value) {
	return (value.length > 0) ? value.substr(0, 1).toLowerCase() + value.substr(1) : "";
};

/**
 * Alias for {@link Terrasoft.utils.string#toLowerCamelCase}
 * @member Terrasoft
 * @method toLowerCamelCase
 * @inheritdoc Terrasoft.utils.string#toLowerCamelCase
 */
Terrasoft.toLowerCamelCase = Terrasoft.utils.string.toLowerCamelCase;

/**
 * Returns string with converted eol char to unix style.
 * @param  {String} value Source string.
 * @return {String} String converted eol char to unix style.
 */
Terrasoft.utils.string.convertEolToUnix = function(value) {
	var winEol = String.fromCharCode(13, 10);
	var unixEol = String.fromCharCode(10);
	return (value || "").replace(new RegExp(winEol, "g"), unixEol);
};

/**
 * Alias for {@link Terrasoft.utils.string#convertEolToUnix}
 * @member Terrasoft
 * @method convertEolToUnix
 * @inheritdoc Terrasoft.utils.string#convertEolToUnix
 */
Terrasoft.convertEolToUnix = Terrasoft.utils.string.convertEolToUnix;

/**
 * Checks whether string is serialized JSON object.
 * @param {String} value Value to check.
 * @param {Boolean} [checksPropertyNamesOnQuotes] Flag that indicates whether to check property names on quotes.
 * Default true.
 * @return {Boolean}
 */
Terrasoft.isJsonObject = function(value, checksPropertyNamesOnQuotes) {
	if (value == null) {
		return false;
	}
	var jsonParseFn = (checksPropertyNamesOnQuotes === false) ? Ext.global.JSON5.parse : Ext.JSON.decode;
	try {
		var jsonObject = jsonParseFn(value);
		return Ext.isArray(jsonObject) || Ext.isObject(jsonObject);
	} catch (e) {
		return false;
	}
};

/**
 * Alias for {@link Terrasoft#isJsonObject}
 * @member Terrasoft.utils.string
 * @method isJsonObject
 * @inheritdoc Terrasoft#isJsonObject
 */
Terrasoft.utils.string.isJsonObject = Terrasoft.isJsonObject;

/**
 * Determines whether one string may be found within another string, returning true or false as appropriate.
 * @param {String|Array} sourceString String to search inside.
 * @param {String} searchString String to search for.
 * @return {Boolean} True if the given string is found anywhere within the search string, otherwise, false if not.
 */
Terrasoft.utils.string.includes = function(sourceString, searchString) {
	return sourceString.indexOf(searchString) !== -1;
};

/**
 * Alias for {@link Terrasoft.utils.string#includes}
 * @member Terrasoft
 * @method includes
 * @inheritdoc Terrasoft.utils.string#includes
 */
Terrasoft.includes = Terrasoft.utils.string.includes;

/**
 * Checks the string contains RTL characters.
 * @param {String} sourceString Source string.
 * @return {Boolean} True if string contains RTL characters.
 */
Terrasoft.utils.string.containsRtlChars = function(sourceString) {
	var rtlCharsPattern = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
	return rtlCharsPattern.test(sourceString);
};

/**
 * Alias for {@link Terrasoft.utils.string#containsRtlChars}
 * @member Terrasoft
 * @method containsRtlChars
 * @inheritdoc Terrasoft.utils.string#containsRtlChars
 */
Terrasoft.containsRtlChars = Terrasoft.utils.string.containsRtlChars;

/**
 * Gets direction of the source text.
 * @param {String} text Source text.
 * @return {String|null} Direction of the source text.
 */
Terrasoft.utils.string.getTextDirection = function(text) {
	if (!Terrasoft.getIsRtlMode() || Ext.isEmpty(text)) {
		return null;
	}
	return Terrasoft.containsRtlChars(text) ? "rtl" : "ltr";
};

/**
 * Alias for {@link Terrasoft.utils.string#getTextDirection}
 * @member Terrasoft
 * @method getTextDirection
 * @inheritdoc Terrasoft.utils.string#getTextDirection
 */
Terrasoft.getTextDirection = Terrasoft.utils.string.getTextDirection;

/**
 * Gets random string.
 * @return {String} Random string.
 */
Terrasoft.utils.string.randomString = function() {
	var randomFloat = Math.random();
	var randomString = randomFloat.toString(36);
	return randomString.substring(2);
};

/**
 * Alias for {@link Terrasoft.utils.string#randomString}
 * @member Terrasoft
 * @method randomString
 * @inheritdoc Terrasoft.utils.string#randomString
 */
Terrasoft.randomString = Terrasoft.utils.string.randomString;

/**
 * Alias for {@link Terrasoft.utils.html#decodeHtml}. Backward compatibility.
 * @member Terrasoft
 * @method decodeHtml
 * @inheritdoc Terrasoft.utils.html#decodeHtml
 */
Terrasoft.utils.string.decodeHtml = Terrasoft.decodeHtml;

/**
 * Alias for {@link Terrasoft.utils.html#encodeHtml}. Backward compatibility.
 * @member Terrasoft
 * @method encodeHtml
 * @inheritdoc Terrasoft.utils.html#encodeHtml
 */
Terrasoft.utils.string.encodeHtml = Terrasoft.encodeHtml;

/**
 * Alias for {@link Terrasoft.utils.html#decodeHtmlEntities}. Backward compatibility.
 * @member Terrasoft
 * @method decodeHtmlEntities
 * @inheritdoc Terrasoft.utils.html#decodeHtmlEntities
 */
Terrasoft.utils.string.decodeHtmlEntities = Terrasoft.decodeHtmlEntities;

/**
 * Alias for {@link Terrasoft.utils.html#stripTags}. Backward compatibility.
 * @member Terrasoft
 * @method stripTags
 * @inheritdoc Terrasoft.utils.html#stripTags
 */
Terrasoft.utils.string.stripTags = Terrasoft.stripTags;

/**
 * Alias for {@link Terrasoft.utils.html#unescape}. Backward compatibility.
 * @member Terrasoft
 * @method unescape
 * @inheritdoc Terrasoft.utils.html#unescape
 */
Terrasoft.utils.string.unescape = Terrasoft.unescape;

/**
 * Alias for {@link Terrasoft.utils.html#removeHtmlTags}. Backward compatibility.
 * @member Terrasoft
 * @method removeHtmlTags
 * @inheritdoc Terrasoft.utils.html#removeHtmlTags
 */
Terrasoft.utils.string.removeHtmlTags = Terrasoft.removeHtmlTags;

/**
 * Alias for {@link Terrasoft.utils.html#sanitizeHTML}. Backward compatibility.
 * @member Terrasoft
 * @method sanitizeHTML
 * @inheritdoc Terrasoft.utils.html#sanitizeHTML
 */
Terrasoft.utils.string.sanitizeHTML = Terrasoft.sanitizeHTML;