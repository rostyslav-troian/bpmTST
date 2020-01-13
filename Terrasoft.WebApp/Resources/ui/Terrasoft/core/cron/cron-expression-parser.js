/**
 */
Ext.define("Terrasoft.manager.CronExpressionParser", {
	alternateClassName: "Terrasoft.CronExpressionParser",

	/**
	 * Array of cron expression possible days of the week.
	 * @private
	 * @type {Array}
	 */
	_dayOfWeek: [
		"SUN",
		"MON",
		"TUE",
		"WED",
		"THU",
		"FRI",
		"SAT"
	],

	/**
	 * Array of cron expression possible month.
	 * @private
	 * @type {Array}
	 */
	_month: [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC"
	],

	/**
	 * Allowed seconds parameter value.
	 * @private
	 * @type {String}
	 */
	_allowedSecondsValue: "0",

	/**
	 * Maximum possible year value.
	 * @private
	 * @type {Number}
	 */
	_maximumYearValue: 2099,

	/**
	 * Default year cron parameter value.
	 * @private
	 * @type {String}
	 */
	_defaultYear: "*",

	/**
	 * Regex tests input for year cron parameter.
	 * @private
	 * @type {RegExp}
	 */
	_isYearRegex: /\d{4}$/,

	/**
	 * Regex replaces multiple spaces.
	 * @private
	 * @type {RegExp}
	 */
	_replaceMultipleSpacesRegex: /\s\s+/g,

	/**
	 * Special symbols regex.
	 * @private
	 * @type {RegExp}
	 */
	_specialSymbolsRegexp: /^[^\*\-\,]+$/,

	/**
	 * Regex for number extraction.
	 * @private
	 * @type {RegExp}
	 */
	_numberExtractorRegex: /\d+/g,

	/**
	 * Regex for time valid symbols.
	 * @private
	 * @type {RegExp}
	 */
	_baseTimeSymbolsRegex: /^([\,\-\*\/]|\d)+$/,

	/**
	 * Regex for day of month valid symbols.
	 * @private
	 * @type {RegExp}
	 */
	_dayOfMonthRegex: /^([\,\-\*\/\?LW]|\d)+$/,

	/**
	 * Regex for day of the week valid symbols.
	 * @private
	 * @type {RegExp}
	 */
	_dayOfWeekRegex: /^([\,\-\*\/\?L\#]|\d)+$/,

	/**
	 * Cron parameters separator.
	 * @private
	 * @type {String}
	 */
	_parametersSeparator: " ",

	/**
	 * Parsed cron expression.
	 * @private
	 * @type {Array}
	 */
	_parsedExpression: null,

	/**
	 * Parsing information config.
	 * @private
	 * @type {Object}
	 */
	_parsingParameters: null,

	/**
	 * validation information_
	 * @private
	 * @type {Object}
	 */
	_parsingInfo: null,

	/**
	 * Normalizes time prefix in cron parameters.
	 * @private
	 * @param {String} parameter Cron parameter.
	 */
	_normalizeTimePrefix: function(parameter) {
		return Ext.String.startsWith(parameter, "0/") ? parameter.replace("0/", "*/") : parameter;
	},

	/**
	 * Normalizes day prefix in cron parameters.
	 * @private
	 * @param {String} parameter Cron parameter.
	 */
	_normalizeDatePrefix: function(parameter) {
		return Ext.String.startsWith(parameter, "1/") ? parameter.replace("1/", "*/") : parameter;
	},

	/**
	 * Normalizes day names in cron parameters.
	 * @private
	 * @param {Array} expressionParts Cron parameters.
	 */
	_normalizeDays: function(expressionParts) {
		for (var i = 0; i <= 6; i++) {
			var currentDay = this._dayOfWeek[i];
			expressionParts[5] = expressionParts[5].replace(currentDay, i + 1);
		}
	},

	/**
	 * Normalizes month names in cron parameters.
	 * @private
	 * @param {Array} expressionParts Cron parameters.
	 */
	_normalizeMonth: function(expressionParts) {
		for (var i = 0; i < 12; i++) {
			var currentMonth = this._month[i];
			expressionParts[4] = expressionParts[4].replace(currentMonth, i + 1);
		}
	},

	/**
	 * Normalizes ranges in cron parameters.
	 * @private
	 * @param {Array} expressionParts Cron parameters.
	 */
	_normalizeRanges: function(expressionParts) {
		for (var i = 0; i < expressionParts.length; i++) {
			if (expressionParts[i] === "*/1") {
				expressionParts[i] = "*";
			}
			if (Terrasoft.includes(expressionParts[i], "/") && this._specialSymbolsRegexp.test(expressionParts[i])) {
				var stepRangeThrough = null;
				switch (i) {
					case 4:
						stepRangeThrough = "12";
						break;
					case 5:
						stepRangeThrough = "6";
						break;
					case 6:
						stepRangeThrough = this._maximumYearValue;
						break;
					default:
						stepRangeThrough = null;
						break;
				}
				if (stepRangeThrough != null) {
					var parts = expressionParts[i].split("/");
					expressionParts[i] = Ext.String.format("{0}-{1}/{2}", parts[0], stepRangeThrough, parts[1]);
				}
			}
		}
	},

	/**
	 * Normalizes cron parameters time.
	 * @private
	 * @param {Array} expressionParts Cron parameters.
	 */
	_normalizeTime: function(expressionParts) {
		for (var i = 0; i <= 2; i++) {
			expressionParts[i] = this._normalizeTimePrefix(expressionParts[i]);
		}
	},

	/**
	 * Normalizes cron parameter date.
	 * @private
	 * @param {Array} expressionParts Cron parameters.
	 */
	_normalizeDate: function(expressionParts) {
		for (var i = 3; i <= 6; i++) {
			expressionParts[i] = this._normalizeDatePrefix(expressionParts[i]);
		}
	},

	/**
	 * Normalizes cron expression.
	 * @private
	 * @param {Array} expressionParts Cron parameters.
	 */
	_normalizeExpression: function(expressionParts) {
		this._normalizeTime(expressionParts);
		this._normalizeDate(expressionParts);
		this._normalizeDays(expressionParts);
		this._normalizeMonth(expressionParts);
		this._normalizeRanges(expressionParts);
	},

	/**
	 * Prepares cron expression parts from cron string.
	 * @private
	 * @returns {Array} Cron expression parts.
	 */
	_prepareExpressionParameters: function(unParsed) {
		var clearString = unParsed.replace(this._replaceMultipleSpacesRegex, this._parametersSeparator);
		var result = clearString.split(this._parametersSeparator);
		result = result.filter(function(item) {
			return !Ext.isEmpty(item);
		});
		this._parsingParameters = result;
		return result;
	},

	/**
	 * Validates value range.
	 * @private
	 * @param {Object} value Value to validate.
	 * @param {Number} min Valid min number.
	 * @param {Number} max Valid max number.
	 * @param {String} parameterName Cron parameter name.
	 */
	_validateRange: function(value, min, max, parameterName) {
		if (value < min || value > max) {
			throw Terrasoft.InvalidFormatException({
				message: Ext.String.format(Terrasoft.Resources.Cron.ValueOutOfRangeException,
					parameterName, value, min, max)
			});
		}
	},

	/**
	 * Validates number ranges.
	 * @private
	 * @param {String} parameter Parameter to validate.
	 * @param {Number} min Minimal parameter value.
	 * @param {Number} max Maximum parameter value.
	 * @param {String} parameterName Cron parameter name.
	 */
	_validateNumberRanges: function(parameter, min, max, parameterName) {
		var numbers = this._extractNumbers(parameter);
		if (numbers) {
			numbers.forEach(function(number) {
				this._validateRange(number, min, max, parameterName);
			}, this);
		}
	},

	/**
	 * Validates parameter symbols by regex.
	 * @private
	 * @param {String} parameter Cron parameter to validate.
	 * @param {RegExp} regex Validation regexp.
	 * @param {String} parameterName Cron parameter name.
	 */
	_validateSymbols: function(parameter, regex, parameterName) {
		if (!regex.test(parameter)) {
			throw Terrasoft.InvalidFormatException({
				message: Ext.String.format(Terrasoft.Resources.Cron.InvalidSymbolsException, parameterName, parameter)
			});
		}
	},

	/**
	 * Returns all numbers from cron parameter.
	 * @private
	 * @param {String} parameter Cron parameter.
	 * @returns {Array} Array of numbers from parameter.
	 */
	_extractNumbers: function(parameter) {
		return parameter.match(this._numberExtractorRegex);
	},

	/**
	 * Validates cron seconds parameter.
	 * @private
	 * @param {String} seconds Seconds parameter.
	 */
	_validateSeconds: function(seconds) {
		var secondsName = Terrasoft.Resources.Cron.Parameters.Seconds;
		this._validateSymbols(seconds, this._baseTimeSymbolsRegex, secondsName);
		this._validateNumberRanges(seconds, 0, 59, secondsName);
	},

	/**
	 * Validates cron minutes parameter.
	 * @private
	 * @param {String} minutes Minutes parameter.
	 */
	_validateMinutes: function(minutes) {
		var minutesName = Terrasoft.Resources.Cron.Parameters.Minutes;
		this._validateSymbols(minutes, this._baseTimeSymbolsRegex, minutesName);
		this._validateNumberRanges(minutes, 0, 59, minutesName);
	},

	/**
	 * Validates cron hours parameter.
	 * @private
	 * @param {String} hours Hours parameter.
	 */
	_validateHours: function(hours) {
		var hoursName = Terrasoft.Resources.Cron.Parameters.Hours;
		this._validateSymbols(hours, this._baseTimeSymbolsRegex, hoursName);
		this._validateNumberRanges(hours, 0, 23, hoursName);
	},

	/**
	 * Validates cron day of month parameter.
	 * @private
	 * @param {String} dayOfMonth Day of month parameter.
	 */
	_validateDayOfMonth: function(dayOfMonth) {
		var daysOfMonthName = Terrasoft.Resources.Cron.Parameters.DaysOfMonth;
		this._validateSymbols(dayOfMonth, this._dayOfMonthRegex, daysOfMonthName);
		this._validateNumberRanges(dayOfMonth, 1, 31, daysOfMonthName);
	},

	/**
	 * Validates cron month parameter.
	 * @private
	 * @param {String} month Month parameter.
	 */
	_validateMonth: function(month) {
		var monthsName = Terrasoft.Resources.Cron.Parameters.Months;
		this._validateSymbols(month, this._baseTimeSymbolsRegex, monthsName);
		this._validateNumberRanges(month, 1, 12, monthsName);
	},

	/**
	 * Validates cron day of week parameter.
	 * @private
	 * @param {String} dayOfWeek Day of week parameter.
	 */
	_validateDayOfWeek: function(dayOfWeek) {
		var daysOfWeekName = Terrasoft.Resources.Cron.Parameters.DaysOfWeek;
		this._validateSymbols(dayOfWeek, this._dayOfWeekRegex, daysOfWeekName);
		this._validateNumberRanges(dayOfWeek, 1, 7, daysOfWeekName);
	},

	/**
	 * Validates cron year parameter.
	 * @private
	 * @param {String} year Year parameter.
	 */
	_validateYear: function(year) {
		var yearsName = Terrasoft.Resources.Cron.Parameters.Years;
		this._validateSymbols(year, this._baseTimeSymbolsRegex, yearsName);
		this._validateNumberRanges(year, 0, this._maximumYearValue, yearsName);
	},

	/**
	 * Validates day of parameters.
	 * @private
	 * @param {String} dayOfWeek Day of week parameter.
	 * @param {String} dayOfMonth Day of month parameter.
	 */
	_validateDayOfParameters: function(dayOfWeek, dayOfMonth) {
		if (dayOfWeek !== "?" && dayOfMonth !== "?") {
			throw Terrasoft.InvalidFormatException({
				message: Ext.String.format(Terrasoft.Resources.Cron.DayOfNotImplementedException, dayOfWeek, dayOfMonth)
			});
		}
	},

	/**
	 * Validates expression.
	 * @private
	 * @param {Array} parameters Cron parameters.
	 */
	_validateExpression: function(parameters) {
		this._validateSeconds(parameters[0]);
		this._validateMinutes(parameters[1]);
		this._validateHours(parameters[2]);
		this._validateDayOfMonth(parameters[3]);
		this._validateMonth(parameters[4]);
		this._validateDayOfWeek(parameters[5]);
		this._validateYear(parameters[6]);
		this._validateDayOfParameters(parameters[3], parameters[5]);
	},

	/**
	 * Normalizes cron length.
	 * @private
	 * @param {Array} expressionParameters Cron parameters.
	 * @returns {Array} Normalized cron by length.
	 */
	_normalizeLength: function(expressionParameters) {
		var length = expressionParameters.length;
		switch (length) {
			case 5:
				expressionParameters.unshift(this._allowedSecondsValue);
				expressionParameters.push(this._defaultYear);
				break;
			case 6:
				var dayOfWeek = expressionParameters[5];
				if (this._isYearRegex.test(dayOfWeek)) {
					expressionParameters.unshift(this._allowedSecondsValue);
				} else {
					expressionParameters.push(this._defaultYear);
				}
				break;
			default:
				if (length < 5) {
					throw new Terrasoft.InvalidFormatException({
						message: Ext.String.format(Terrasoft.Resources.Cron.ShortCronException, length)
					});
				}
				if (length > 7) {
					throw new Terrasoft.InvalidFormatException({
						message: Ext.String.format(Terrasoft.Resources.Cron.LongCronException, length)
					});
				}
				break;
		}
	},

	/**
	 * Parse cron expression
	 * @param {String} cron expression
	 * @return {Array} parsed Cron expression
	 */
	parse: function(unParsedExpression) {
		var result = null;
		this._parsingInfo = {
			isValid: true,
			error: "",
			parsingParameters: []
		};
		try {
			if (Ext.isEmpty(unParsedExpression)) {
				throw new Terrasoft.InvalidFormatException({
					message: Terrasoft.Resources.Exception.NullOrEmptyException
				});
			}
			var expressionParameters = this._prepareExpressionParameters(unParsedExpression.slice());
			var normalizedExpression = this.normalize(expressionParameters);
			this._validateExpression(normalizedExpression);
			this._parsedExpression = normalizedExpression;
			result = this._parsedExpression;
			this._parsingInfo.parsingParameters = this._parsedExpression;
		} catch (exception) {
			this._parsingInfo = {
				isValid: false,
				error: exception.message,
				parsingParameters: this._parsingParameters
			};
		}
		return result;
	},

	/**
	 * Normalizes cron expression parts.
	 * @returns {Array} Normalized cron parts.
	 */
	normalize: function(expressionParts) {
		var result = expressionParts.slice();
		this._normalizeLength(result);
		this._normalizeExpression(result);
		return result;
	},

	/**
	 * Returns cron expression from parsed cron string.
	 * @returns {Terrasoft.CronExpression} Cron expression.
	 */
	getCronObject: function() {
		var cron = Ext.create("Terrasoft.CronExpression", {parameters: this.getCronParameters()});
		return cron;
	},

	/**
	 * Returns cron parameters array from parsed cron string.
	 * @returns {Array} Cron parameters.
	 */
	getCronParameters: function() {
		return this._parsedExpression;
	},

	/**
	 * Returns parsing info
	 * @returns {Object}
	 */
	getParsingInfo: function() {
		return this._parsingInfo;
	},

	/**
	 * Returns normalizes cron string from input cron string.
	 * @returns {String} Normalized cron expression string.
	 */
	toString: function() {
		return this._parsedExpression.join(this._parametersSeparator);
	}

});
