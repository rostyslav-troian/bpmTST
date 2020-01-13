/**
 */
Ext.define("Terrasoft.manager.CronExpression", {
	alternateClassName: "Terrasoft.CronExpression",

	statics: {

		/**
		 * Creates base valid cron.
		 * @return {Terrasoft.CronExpression} Base valid cron.
		 */
		create: function() {
			return Terrasoft.CronExpression.from("0 * * ? * ? *");
		},

		/**
		 * Creates cron expression object from argument or creates base valid cron if no arguments passed.
		 * @param {Object} [argument] Source argument.
		 * @return {Terrasoft.CronExpression} Cron expression object.
		 */
		from: function(argument) {
			var cron = Ext.create("Terrasoft.CronExpression");
			if (Ext.isArray(argument)) {
				cron = Ext.create("Terrasoft.CronExpression", {parameters: argument});
			} else if (Ext.isString(argument)) {
				cron = Ext.create("Terrasoft.CronExpression", {expression: argument});
			}
			return cron;
		},

		/**
		 * Validates given cron expression string.
		 * @param {String} string Cron expression string representation.
		 * @param {Object} [config] Parser config.
		 * @return {Object} Validation info.
		 */
		validate: function(string, config) {
			var result = {};
			try {
				var cron = Terrasoft.CronExpression.from(string);
				result = cron.validate(config);
			} catch(exception) {
				result.error = exception.message;
				result.isValid = false;
			}
			return result;
		}
	},

	//region Properties: Private

	/**
	 * Cron expression parameters separator.
	 * @private
	 * @type {String}
	 */
	_cronParametersSeparator: " ",

	/**
	 * Cron expression parameters enumerator symbol.
	 * @private
	 * @type {String}
	 */
	_cronParametersEnumeratorSymbol: ",",

	/**
	 * Cron expression parameters.
	 * @private
	 * @type {Array}
	 */
	_cronParameters: [],

	//endregion

	/**
	 * Cron constructor.
	 */
	constructor: function(config) {
		if (config) {
			var expression = config.expression;
			var parameters = config.parameters;
			var parametersArray = [];
			if (parameters) {
				parametersArray = parameters;
			} else if (expression) {
				var parser = Ext.create("Terrasoft.CronExpressionParser");
				var parsingResult = parser.parse(expression);
				if (parsingResult) {
					parametersArray = parsingResult;
				} else {
					var parsingInfo = parser.getParsingInfo();
					parametersArray = parsingInfo.parsingParameters;
				}
			}
			this.fillFromArray(parametersArray);
		}
	},

	/**
	 * Sets cron parameter value by parameter type.
	 * @param {Terrasoft.cron.Parameters} parameterType Cron parameter type.
	 * @param {String} value Cron parameter value.
	 */

	setParameter: function(parameterType, value) {
		this._cronParameters[parameterType] = value;
	},
	/**
	 * Sets weekday ordinal info separated by '#'.
	 * @param {Number} weekDay Weekday.
	 * @param {Number} weekDayNumber Weekday number.
	 */
	setWeekDayOrdinalInfo: function(weekDay, weekDayNumber) {
		var dayOfWeek = Ext.String.format("{0}#{1}", weekDay, weekDayNumber);
		this.setParameter(Terrasoft.cron.Parameters.DayOfWeek, dayOfWeek);
	},

	/**
	 * Returns normalized instance of cron object.
	 * @returns {Terrasoft.CronExpression} Normalized cron object.
	 */
	normalize: function() {
		var parser = Ext.create("Terrasoft.CronExpressionParser");
		var normalizedParameters = parser.normalize(this._cronParameters);
		return Ext.create("Terrasoft.CronExpression", {parameters: normalizedParameters});
	},

	/**
	 * Returns cron parameter value by parameter type.
	 * @param {Terrasoft.cron.Parameters} parameterType Cron parameter type.
	 * @return {String} Cron parameter value.
	 */
	getParameter: function(parameterType) {
		return this._cronParameters[parameterType];
	},

	/**
	* Returns true if parameter has default value.
	* @param {Terrasoft.cron.Parameters} parameterType Cron parameter type.
	* @return {Boolean}
	*/
	getIsParameterDefault: function(parameterType) {
		var defaultCronExpression = Terrasoft.CronExpression.create();
		var defaultParameter = defaultCronExpression.getParameter(parameterType);
		var parameter = this.getParameter(parameterType);
		return parameter === defaultParameter;
	},

	/**
	 * Returns week ordinal info splitted by '#'.
	 * @return {Object} Week ordinal info.
	 */
	getDayOfWeekOrdinalInfo: function() {
		var value = this.getParameter(Terrasoft.cron.Parameters.DayOfWeek);
		var match = value.match(/(\d#\d)/);
		var result = null;
		if (!Ext.isEmpty(match)) {
			var dayParts = match[1].split("#");
			result = {
				dayOfWeek: dayParts[0],
				order: dayParts[1]
			};
		}
		return result;
	},

	/**
	 * Returns last week day position.
	 * @return {Number} Week day position.
	 */
	getLastWeekDay: function (){
		var value = this.getParameter(Terrasoft.cron.Parameters.DayOfWeek);
		var match = value.match(/(\dL)/);
		if (!Ext.isEmpty(match)) {
			var dayParts = match[1].split("L");
			return dayParts[0];
		} else {
			throw new Terrasoft.ItemNotFoundException();
		}
	},

	/**
	 * Check if day of month in cron expression has only calendar values.
	 * @return {Boolean}
	 */
	hasOnlyCalendarValues: function() {
		var hasOnlyDigits = /^\d+$/;
		return hasOnlyDigits.test(this.getParameter(Terrasoft.cron.Parameters.DayOfMonth));
	},

	/**
	 * Check if cron expression has last day in day of the week section.
	 * @return {Boolean}
	 */
	hasLastWeekDay: function() {
		return Terrasoft.includes(this.getParameter(Terrasoft.cron.Parameters.DayOfWeek), "L");
	},

	/**
	 * Check if cron expression has last day in day of the week section.
	 * @return {Boolean}
	 */
	hasLastDayOfMonth: function(){
		return Terrasoft.includes(this.getParameter(Terrasoft.cron.Parameters.DayOfMonth), "L");
	},

	/**
	 * Check if cron expression has Work day in day of the month section
	 * @return {Boolean}
	 */
	hasWorkDays: function(){
		return Terrasoft.includes(this.getParameter(Terrasoft.cron.Parameters.DayOfMonth), "W");
	},

	/**
	 * Sets cron start time from time object.
	 * @param {Date} time Time to set.
	 */
	setStartTime: function(time) {
		var hours = time.getHours();
		var minutes = time.getMinutes();
		this.setParameter(Terrasoft.cron.Parameters.Hours, hours.toString());
		this.setParameter(Terrasoft.cron.Parameters.Minutes, minutes.toString());
	},

	/**
	 * Returns start time.
	 * @return {Date} Start time.
	 */
	getStartTime: function() {
		return new Date(0, 0, 0, this.getParameter(Terrasoft.cron.Parameters.Hours),
			this.getParameter(Terrasoft.cron.Parameters.Minutes));
	},

	/**
	 * Returns interval parameter config.
	 * @param {Terrasoft.cron.Parameters} parameterType Parameter type.
	 * @param {Number} start Interval start.
	 * @param {Number} end Interval end.
	 */
	setInterval: function (parameterType, start, end) {
		this.setParameter(parameterType, Ext.String.format("{0}-{1}", start, end));
	},

	/**
	 * Returns interval parameter config.
	 * @param {Terrasoft.cron.Parameters} parameterType Parameter type.
	 * @return {Object} Interval parameter config.
	 */
	getInterval: function(parameterType) {
		var parameter = this.getParameter(parameterType);
		var match = parameter.match(/(.*)-(.*)/);
		return {
			start: Number(match[1]),
			end: Number(match[2])
		};
	},

	/**
	 * Returns if cron parameter is not specified.
	 * @param {Terrasoft.cron.Parameters} parameterType Parameter type.
	 * @return {Boolean} Is parameter not specified.
	 */
	getIsParameterEmpty: function(parameterType) {
		return Number(this.getParameter(parameterType)) === 0;
	},

	/**
	 * Sets interval with period parameter.
	 * @param {Terrasoft.cron.Parameters} parameterType Parameter type.
	 * @param {Object} config Parameter config.
	 * @param {Number} config.start Interval start time.
	 * @param {Number} config.end Interval end time.
	 * @param {Number} config.period Interval execution period.
	 */
	setIntervalWithPeriod: function(parameterType, config) {
		var intervalAndPeriod = Ext.String.format("{0}-{1}/{2}", config.start, config.end, config.period);
		this.setParameter(parameterType, intervalAndPeriod);
	},

	/**
	 * Returns config for interval with period parameter.
	 * @param {Terrasoft.cron.Parameters} parameterType Parameter type.
	 * @return {Object} Interval with period parameter config.
	 */
	getIntervalWithPeriod: function(parameterType) {
		var startEndPeriodMatch = /((.*)-(.*)(?=\/))\/(.*)/;
		var parameter = this.getParameter(parameterType);
		var match = parameter.match(startEndPeriodMatch);
		return {
			start: Number(match[2]),
			end: Number(match[3]),
			period: Number(match[4])
		};
	},

	/**
	 * Returns repeat period from cron parameter if it has one.
	 * @param {Terrasoft.cron.Parameters} parameterType Parameters to extract period from.
	 */
	getRepetitionPeriod: function(parameterType) {
		var value = this.getParameter(parameterType);
		var match = value.match(/\/([^\/]+)/);
		return Ext.isEmpty(match) ? null : parseInt(match[1], 10);
	},

	/**
	 * Configures cron parameter to repeat at given period.
	 * @param {Terrasoft.cron.Parameters} parameterType Cron parameter type.
	 * @param {Number} period Repeat period.
	 */
	setRepetitionPeriod: function(parameterType, period) {
		this.setParameter(parameterType, Ext.String.format("*/{0}", period));
	},

	/**
	 * Sets week days from array of week days numbers.
	 * @param {Array} weeksDays Array of week days numbers.
	 */
	setWeekDays: function(weeksDays) {
		this.setParameter(Terrasoft.cron.Parameters.DayOfWeek, weeksDays.join(this._cronParametersEnumeratorSymbol));
	},

	/**
	 * Sets last week day of month in day of week section.
	 * @param {Number} dayOfWeek Week day number.
	 */
	setLastWeekDay: function (weekDay){
		var dayOfWeek = Ext.String.format("{0}L", weekDay);
		this.setParameter(Terrasoft.cron.Parameters.DayOfWeek, dayOfWeek);
	},

	/**
	 * Sets last day of month in day of month section.
	 */
	setLastDayOfMonth: function (){
		this.setParameter(Terrasoft.cron.Parameters.DayOfMonth, "L");
	},

	/**
	 * Sets last week day of month in day of week section.
	 * @param {Number} dayOfMonth Month day number.
	 */
	setDayOfMonth: function (dayOfMonth){
		this.setParameter(Terrasoft.cron.Parameters.DayOfMonth, dayOfMonth);
	},

	/**
	 * Sets work day position of month in day of month section.
	 * @param {String|Number} day Day of month number or L - last day.
	 */
	setWorkDayPositionInMonth: function (day){
		var dayOfMonth = Ext.String.format("{0}W", day);
		this.setParameter(Terrasoft.cron.Parameters.DayOfMonth, dayOfMonth);
	},

	/**
	 * Sets last work day of month in day of month section.
	 */
	setLastWorkDayInMonth: function(){
		this.setWorkDayPositionInMonth("L");
	},

	/**
	 * Returns week days.
	 * @return {Array} Week days numbers.
	 */
	getWeekDays: function() {
		var parameter = this.getParameter(Terrasoft.cron.Parameters.DayOfWeek);
		var result;
		if (parameter === '*') {
			result =  [1,2,3,4,5,6,7];
		} else {
			result = parameter.split(this._cronParametersEnumeratorSymbol);
			result = result.map(function(item) {
				return Number(item);
			}, this);
		}
		return result;
	},

	/**
	 * Fills out cron expression object from parameters array.
	 * @param {Array} parameters Cron expression parameters.
	 */
	fillFromArray: function(parameters) {
		this._cronParameters = parameters.slice();
	},

	/**
	 * Returns if cron is valid.
	 * @return {Boolean} Validation result.
	 */
	isValid: function() {
		var info = Terrasoft.CronExpression.validate(this.toString());
		return info.isValid;
	},

	/**
	 * Validates cron expression.
	 * @returns {Object} Validation config.
	 */
	validate: function() {
		var validResult = {
			error: "",
			isValid: true
		};
		var parser = Ext.create("Terrasoft.CronExpressionParser");
		var parsingResult = parser.parse(this.toString());
		return parsingResult ?  validResult : parser.getParsingInfo();
	},

	/**
	 * Returns array of cron parameters.
	 * @return {Array} Array of cron parameters.
	 */
	toArray: function() {
		return this._cronParameters.slice();
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#toString
	 * @override
	 */
	toString: function() {
		return this._cronParameters.join(this._cronParametersSeparator);
	}
});
