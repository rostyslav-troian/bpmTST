Ext.ns("Terrasoft.utils.number");

/**
 * @singleton
 */

/**
 * The regular expression used to remove the leading zeros in the number
 * @private
 * @type {RegExp}
 */
Terrasoft.utils.number.zerosRe = /^(0*)(\d*)$/;

/**
 * A regular expression used to split a number into an integer and a fractional part.
 * @private
 * @type {RegExp}
 */
Terrasoft.utils.number.floatRe = /^(-?)(0*)(\d*)([,.]?)(\d*)$/;

/**
 * The method splits the number into its constituent parts, and writes the result to an object
 * The structure of the resulting object
 * {
  * isNegative: <flag indicates a negative number or not>,
  * zeros: <leading zeros if present>,
  * integer: <integer part of number>,
  * separator: <integer and fractional separator>,
  * decimal: <fractional part>
  *}
 * @param {String} value Input string
 * @return {Object} An object containing the results of the partition, or null if the input string does not match the pattern
 */
Terrasoft.utils.number.splitNumber = function(value) {
	var numberParts = Terrasoft.utils.number.floatRe.exec(value);
	var number = {};
	if (numberParts === null) {
		return null;
	}
	number.isNegative = numberParts[1] ? true : false;
	var zeros = numberParts[2];
	var integer = numberParts[3];
	if (integer !== "") {
		number.integer = integer;
	} else if (zeros !== "") {
		number.integer = "0";
	} else {
		number.integer = "";
	}
	number.separator = numberParts[4];
	number.decimal = numberParts[5];
	return number;
};

/**
 * short notation for {@link Terrasoft.utils.number#splitNumber}
 * @member Terrasoft
 * @method splitNumber
 * @inheritdoc Terrasoft.utils.number#splitNumber
 */
Terrasoft.splitNumber = Terrasoft.utils.number.splitNumber;

/**
 * Rounds value to given decimal places.
 * @param {Number} value Value to round.
 * @param {Integer} [decimalPlaces] Target decimal places.
 * @returns {Number}
 */
Terrasoft.utils.number.roundValue = function(value, decimalPlaces) {
	var exponent = Math.pow(10, decimalPlaces || 0);
	return Math.round(value * exponent) / exponent;
};

/**
 * Alias for {@link Terrasoft.utils.number#roundValue}
 * @member Terrasoft
 * @method roundValue
 * @inheritdoc Terrasoft.utils.number#roundValue
 */
Terrasoft.roundValue = Terrasoft.utils.number.roundValue;

/**
 * Formats number value using passed formatting options.
 * @param {Number/String} value Number which will be formatted.
 * @param {Object} [config] Formatting options.
 * @param {String} [config.type] Display mode (if type is Terrasoft.DataValueType.MONEY - value will
 * be rounded to current money display precision, if type is Terrasoft.DataValueType.INTEGER the decimal part
 * will be cut out elsewhere decimal part will be cut depending on decimalPrecision).
 * @param {Number} [config.decimalPrecision] Number of decimal places to keep.
 * @param {String} [config.thousandSeparator] Thousand separator.
 * @param {String} [config.decimalSeparator] Separator for integer and decimal part defined decimalPrecision.
 * @param {Number} [config.numberGroupSizes] Thousand group length.
 * @return {String} Formatted value.
 */

Terrasoft.utils.number.getFormattedNumberValue = function(value, config) {
	config = config || {};
	var type = config.type || Terrasoft.DataValueType.FLOAT;
	var cultureSettings = Terrasoft.Resources.CultureSettings;
	var numberGroupSizes = config.numberGroupSizes || cultureSettings.numberGroupSizes;
	var thousandSeparator = (config.thousandSeparator !== undefined) ? config.thousandSeparator :
		cultureSettings.thousandSeparator;
	var useThousandSeparator = config.useThousandSeparator;
	if (useThousandSeparator === false) {
		thousandSeparator = "";
	}
	var decimalSeparator = config.decimalSeparator || cultureSettings.decimalSeparator;
	var isMoney = (type === Terrasoft.DataValueType.MONEY);
	var defaultDecimalPrecision = isMoney ? Terrasoft.SysValue.CURRENT_MONEY_DISPLAY_PRECISION : 2;
	var decimalPrecision = Ext.isNumber(config.decimalPrecision) ? config.decimalPrecision : defaultDecimalPrecision;
	if (isMoney) {
		value = Terrasoft.utils.number.roundValue(Number(value), decimalPrecision);
	} else if (type === Terrasoft.DataValueType.INTEGER) {
		decimalPrecision = 0;
	}
	var stringValue = Terrasoft.numberToString(value);
	if (stringValue === "") {
		return "";
	}
	var partsOfNumber = Terrasoft.splitNumber(stringValue);
	if (partsOfNumber === null) {
		return "";
	}
	var isNegative = partsOfNumber.isNegative;
	var integer = partsOfNumber.integer;
	var decimal = partsOfNumber.decimal;
	if (integer === "" && decimal === "") {
		return "";
	}
	var newValue = "";
	decimal = Terrasoft.discardZeros(decimal, decimalPrecision);
	var isNotZero = ((integer !== "" && integer !== "0") || (decimal !== ""));
	if (isNegative && isNotZero) {
		newValue += "-";
	}
	var isFormatted = (thousandSeparator !== "") && integer && (integer.length > numberGroupSizes);
	if (isFormatted) {
		integer = Terrasoft.getIntegerFormattedValue(integer, {
			thousandSeparator: thousandSeparator,
			numberGroupSizes: numberGroupSizes
		});
	}
	newValue += integer;
	if (isMoney || type === Terrasoft.DataValueType.FLOAT) {
		decimal = Terrasoft.complementZeros(decimal, decimalPrecision);
	}
	if (decimal) {
		newValue += decimalSeparator + decimal;
	}
	return newValue;
};

/**
 * Alias for {@link Terrasoft.utils.number#getFormattedNumberValue}
 * @member Terrasoft
 * @method getFormattedNumberValue
 * @inheritdoc Terrasoft.utils.number#getFormattedNumberValue
 */
Terrasoft.getFormattedNumberValue = Terrasoft.utils.number.getFormattedNumberValue;

/**
 * Casts Number value to formatted money value string.
 * More info {@link Terrasoft.utils.number#getFormattedNumberValue}.
 * @param {Number} amount Value to convert.
 * @return {String}
 */
Terrasoft.utils.number.getFormattedMoneyValue = function(amount) {
	var config = {
		type: Terrasoft.DataValueType.MONEY
	};
	return Terrasoft.utils.number.getFormattedNumberValue(amount || 0, config);
};

/**
 * Alias for {@link Terrasoft.utils.number#getFormattedMoneyValue}
 * @member Terrasoft
 * @method getFormattedMoneyValue
 * @inheritdoc Terrasoft.utils.number#getFormattedMoneyValue
 */
Terrasoft.getFormattedMoneyValue = Terrasoft.utils.number.getFormattedMoneyValue;

/**
 * Discards the leading zeros in the number represented by the string. Used to discard extra zeros in the decimal part of the number.
 * The function truncates the number to the value specified by the decimalPrecision parameter by simply discarding values that go beyond the precision
 * @private
 * @param {String} value input string
 * @param {Number} decimalPrecision decimal precision
 * @return {String} a formatted string
 */
Terrasoft.utils.number.discardZeros = function(value, decimalPrecision) {
	if (!value) {
		return "";
	}
	decimalPrecision = Ext.isNumber(decimalPrecision)
		? decimalPrecision
		: Terrasoft.Resources.CultureSettings.decimalPrecision;
	var decimal = value;
	if (decimalPrecision > decimal.length) {
		return decimal;
	}
	decimal = decimal.slice(0, decimalPrecision);
	var reverseStr = Terrasoft.reverseStr;
	var reverseDecimal = reverseStr(decimal);
	var decimalParts = Terrasoft.utils.number.zerosRe.exec(reverseDecimal);
	var reverseDecimalsWithoutZeros = decimalParts[2];
	return reverseDecimalsWithoutZeros ? reverseStr(reverseDecimalsWithoutZeros) : "";
};

/**
 * short notation for {@link Terrasoft.utils.number#discardZeros}
 * @member Terrasoft
 * @method discardZeros
 * @inheritdoc Terrasoft.utils.number#discardZeros
 */
Terrasoft.discardZeros = Terrasoft.utils.number.discardZeros;

/**
 * Appends the leading zeros to the number represented by the string. Used to append zeros to the decimal part of a number.
 * Zeros are added to the precision specified by the parameter precision
 * @private
 * @param {String} value input string
 * @param {Number} precision decimal precision
 * @return {String} a formatted string
 */
Terrasoft.utils.number.complementZeros = function(value, precision) {
	var decimal = value;
	var length = decimal.length;
	var getUniformString = Terrasoft.getUniformString;
	precision = Ext.isNumber(precision) ? precision : Terrasoft.Resources.CultureSettings.precision;
	if (!decimal) {
		return getUniformString(precision, "0");
	}
	if (precision === length) {
		return decimal;
	}
	if (length > precision) {
		decimal = decimal.slice(0, precision);
	} else {
		var zerosLength = precision - length;
		var zerosStr = getUniformString(zerosLength, "0");
		decimal += zerosStr;
	}
	return decimal;
};

/**
 * short notation for {@link Terrasoft.utils.number#complementZeros}
 * @member Terrasoft
 * @method complementZeros
 * @inheritdoc Terrasoft.utils.number#complementZeros
 */
Terrasoft.complementZeros = Terrasoft.utils.number.complementZeros;

/**
 * Groupa bits and adda a separator between the digits of the number
 * @param {String} value Input string
 * @param {Object} config Formatting options
 * @param {String} config.thousandSeparator (optional) Thousands separator
 * @param {Number} config.numberGroupSizes (optional) Number of characters in the group of thousands
 * @return {String} Formatted value
 */
Terrasoft.utils.number.getIntegerFormattedValue = function(value, config) {
	config = config || {};
	var numberGroupSizes = config.numberGroupSizes || Terrasoft.Resources.CultureSettings.numberGroupSizes;
	var thousandSeparator = config.thousandSeparator || Terrasoft.Resources.CultureSettings.thousandSeparator;
	if (!value) {
		return "";
	}
	var separatedParts = [];
	var start = 0;
	var end = value.length;
	var part;
	while (end > 0) {
		start = end - numberGroupSizes;
		if (start < 0) {
			start = 0;
		}
		part = value.slice(start, end);
		separatedParts.push(part);
		end -= numberGroupSizes;
	}
	separatedParts.reverse();
	return separatedParts.join(thousandSeparator);
};

/**
 * short notation for {@link Terrasoft.utils.number#getIntegerFormattedValue}
 * @member Terrasoft
 * @method getIntegerFormattedValue
 * @inheritdoc Terrasoft.utils.number#getIntegerFormattedValue
 */
Terrasoft.getIntegerFormattedValue = Terrasoft.utils.number.getIntegerFormattedValue;

/**
 * Converts a number to a string. If the number is specified in a floating-point number format, the number is converted to a string that contains the traditional number representation.
 * If the number is specified in the usual format, converts the number to a string
 *
 * Example:
 * var num1 = numberToString (-1.1e5) // num1 = -110000
 * var num2 = numberToString (5.2e-3) // num1 = 0.0052
 *
 * @param {Number} value The number to convert
 * @param {String} decimalSeparator An integer and decimal separator. Can take the values "," or "."
 * @return {String} The string containing the converted number
 */
Terrasoft.utils.number.numberToString = function(value, decimalSeparator) {
	decimalSeparator = decimalSeparator || Terrasoft.Resources.CultureSettings.decimalSeparator;
	var stringValue = String(value);
	var numberRe = /^([+|-]?)(\d*)(?:\.?)(\d*)(?:[e|E]{1})([+|-]?)(\d{0,3})$/;
	var numberParts = numberRe.exec(stringValue);
	if (numberParts) {
		var sign = numberParts[1];
		var beforePoint = numberParts[2];
		var afterPoint = numberParts[3];
		var mantissaSign = numberParts[4];
		var mantissa = numberParts[5];
		stringValue = sign;
		if (mantissaSign === "-") {
			var uniformString = Terrasoft.getUniformString((mantissa - beforePoint.length), "0");
			stringValue += Ext.String.format("0{0}{1}{2}{3}", decimalSeparator, uniformString, beforePoint, afterPoint);
		} else {
			var uniformPlusString = Terrasoft.getUniformString((mantissa - afterPoint.length), "0");
			stringValue += Ext.String.format("{0}{1}{2}", beforePoint, afterPoint, uniformPlusString);
		}
	}
	return stringValue;
};

/**
 * Short notation for {@link Terrasoft.utils.number#numberToString}
 * @member Terrasoft
 * @method numberToString
 * @inheritdoc Terrasoft.utils.number#numberToString
 */
Terrasoft.numberToString = Terrasoft.utils.number.numberToString;

/**
 * Converts a string value to a number with the configuration object. If the value parameter is a number the function will return it without conversion
 * @param {String / Number} value The string to be converted to a number
 * @param {Object} config Parser options
 * @param {Number} config.decimalPrecision (optional) Decimal precision
 * @param {Terrasoft.DataValueType} config.type (optional) String conversion mode (if the value is set to
 * Terrasoft.DataValueType.FLOAT - is converted to a real number,
 * if Terrasoft.DataValueType.INTEGER - in whole)
 * @return {Number} The number after converting the input string
 */
Terrasoft.utils.number.parseNumber = function(value, config) {
	config = config || {};
	var decimalSeparator = config.decimalSeparator || Terrasoft.Resources.CultureSettings.decimalSeparator;
	var thousandSeparator = config.thousandSeparator || Terrasoft.Resources.CultureSettings.thousandSeparator;
	var type = config.type || Terrasoft.DataValueType.FLOAT;
	var result = null;
	if (typeof value === "number") {
		result = value;
	} else if (typeof value === "string" && value !== "") {
		thousandSeparator = Ext.String.escapeRegex(thousandSeparator);
		var thousandSeparatorRe = new RegExp(thousandSeparator, "g");
		var stringValue = value.replace(thousandSeparatorRe, "");
		stringValue = stringValue.replace(decimalSeparator, ".");
		var numericValue;
		if (type === Terrasoft.DataValueType.INTEGER) {
			numericValue = parseInt(stringValue, Terrasoft.NumeralSystem.DECIMAL);
		} else if (type === Terrasoft.DataValueType.FLOAT) {
			numericValue = parseFloat(stringValue);
		}
		result = isNaN(numericValue) ? null : numericValue;
	}
	return result;
};

/**
 * short notation for {@link Terrasoft.utils.number#parseNumber}
 * @member Terrasoft
 * @method parseNumber
 * @inheritdoc Terrasoft.utils.number#parseNumber
 */
Terrasoft.parseNumber = Terrasoft.utils.number.parseNumber;

/*
* @param {Number} min
* @param {Number} max
* @param {Number} value
* @return {Object} result
* @return {Boolean} result.isValid
* @return {String} result.invalidMessage
*/
Terrasoft.utils.number.validateNumberRange = function(min, max, value) {
	var info = {
		invalidMessage: "",
		isValid: false
	};
	if (value > max) {
		info.invalidMessage = Terrasoft.Resources.BaseViewModel.columnIncorrectMaxNumberValidationMessage;
	} else if (value < min) {
		info.invalidMessage = Terrasoft.Resources.BaseViewModel.columnIncorrectMinNumberValidationMessage;
	} else {
		info.isValid = true;
	}
	return info;
};

/**
 * Abbreviation for {@link Terrasoft.utils.number#validateNumberRange}
 * @member Terrasoft
 * @method validateNumberRange
 * @inheritdoc Terrasoft.utils.number#validateNumberRange
 */
Terrasoft.validateNumberRange = Terrasoft.utils.number.validateNumberRange;
