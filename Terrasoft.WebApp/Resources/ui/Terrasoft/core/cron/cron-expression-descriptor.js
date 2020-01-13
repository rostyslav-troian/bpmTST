/**
 */
Ext.define("Terrasoft.manager.CronExpressionDescriptor", {
	alternateClassName: "Terrasoft.CronExpressionDescriptor",

	statics: {
		/**
		 * Describes given cron expression object in human readable text.
		 * @param {Terrasoft.CronExpression} cron Cron expression to describe.
		 * @param {Object} config Describe config.
		 * @param {Boolean} config.use24HourTimeFormat Enables 24 hours format description. Uses 12 hours format
		 * by default.
		 * @returns {String|null} Human readable cron description.
		 */
		describe: function(cron, config) {
			var result = null;
			if (cron.isValid()) {
				var descriptor = Ext.create("Terrasoft.CronExpressionDescriptor", {
					parameters: cron.toArray(),
					use24HourTimeFormat: config && config.use24HourTimeFormat
				});
				result = descriptor.tryGetFullDescription();
			}
			return result;
		}
	},

	/**
	 * Resources alias.
	 */
	resources: Terrasoft.Resources.Cron.Descriptor,

	/**
	 * Words separator character.
	 * @private
	 * @type {String}
	 */
	_wordsSeparator: ", ",

	/**
	 * Values separator.
	 * @private
	 * @type {String}
	 */
	_valueSeparator: ",",

	/**
	 * Space character.
	 * @private
	 * @type {String}
	 */
	_space: " ",

	/**
	 * Activates time output in 24 hour format.
	 * @private
	 * @type {Boolean}
	 */
	_use24HourTimeFormat: null,

	/**
	 * Cron parameters.
	 * @private
	 * @type {Array}
	 */
	_expressionParts: null,

	/**
	 * Days names.
	 * @private
	 * @type {Array}
	 */
	_dayNames: [],

	/**
	 * Converts number value to day caption.
	 * @private
	 * @param {Number} item Day number.
	 * @returns {String} Day caption.
	 */
	_convertNumberToDay: function(item) {
		return this._dayNames[item - 1];
	},

	/**
	 * Converts number value to month caption.
	 * @private
	 * @param {Number} item Month number.
	 * @returns {String} Month caption.
	 */
	_convertNumberToMonth: function(item) {
		return Terrasoft.Resources.CultureSettings.monthNames[item - 1];
	},

	/**
	 * Removes unnecessary symbols from output description.
	 * @private
	 * @param {String} description Source description.
	 * @returns {String} Formatted description.
	 */
	_transformVerbosity: function(description) {
		description = description.replace(new RegExp(this.resources.ComaEveryMinute, "g"), "");
		description = description.replace(new RegExp(this.resources.ComaEveryHour, "g"), "");
		description = description.replace(new RegExp(this.resources.ComaEveryDay, "g"), "");
		return description;
	},

	/**
	 * Concatenates description by format.
	 * @private
	 * @param {String} betweenExpression Source expression.
	 * @param {Function} getBetweenDescriptionFormat Description format for composite description.
	 * @param {Function} getSingleItemDescription Description for single item.
	 * @param {Object} scope Functions scope.
	 * @returns {String} Formatted description.
	 */
	_generateBetweenSegmentDescription: function(betweenExpression, getBetweenDescriptionFormat,
			getSingleItemDescription, scope) {
		var description = "";
		var betweenSegments = betweenExpression.split("-");
		var betweenSegment1Description = getSingleItemDescription.call(scope, betweenSegments[0]);
		var betweenSegment2Description = getSingleItemDescription.call(scope, betweenSegments[1]);
		betweenSegment2Description = betweenSegment2Description.replace(":00", ":59");
		var betweenDescriptionFormat = getBetweenDescriptionFormat.call(scope, betweenExpression);
		description += Ext.String.format(betweenDescriptionFormat, betweenSegment1Description,
			betweenSegment2Description);
		return description;
	},

	/**
	 * Formats time.
	 * @param {Number} hour Hour number.
	 * @param {Number} minute Minute number.
	 * @param {Number} second Seconds number.
	 * @returns {String} Formatted time.
	 */
	_formatTime: function(hour, minute, second) {
		var period = "";
		if (!this._use24HourTimeFormat) {
			period = (hour >= 12) ? " PM" : " AM";
			if (hour > 12) {
				hour -= 12;
			}
		}
		var secondValue = "";
		if (second) {
			secondValue = Ext.String.format(":{0}", Terrasoft.pad(second, 2, "0"));
		}
		return Ext.String.format("{0}:{1}{2}{3}", Terrasoft.pad(hour, 2, "0"), Terrasoft.pad(minute, 2, "0"),
			secondValue, period);
	},

	/**
	 * Normalizes cron parameters for description.
	 * @private
	 */
	_normalizeCronForDescription: function() {
		var params = this._expressionParts;
		params[3] = params[3].replace("?", "*");
		params[5] = params[5].replace("?", "*");
	},

	/**
	 * Prepares days names array.
	 * @private
	 */
	_prepareDayNames: function() {
		var days = Terrasoft.Resources.DayNames;
		this._dayNames = [
			days.Sunday,
			days.Monday,
			days.Tuesday,
			days.Wednesday,
			days.Thursday,
			days.Friday,
			days.Saturday
		];
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this._expressionParts = config.parameters;
		this._use24HourTimeFormat = Ext.isEmpty(config.use24HourTimeFormat)
			? this._getIsCurrentCultureIn24HourTimeFormat()
			: config.use24HourTimeFormat;
		this._prepareDayNames();
	},

	/**
	 * Initializes parameter which indicates time format to use.
	 * @private
	 * @return {Boolean}
	 */
	_getIsCurrentCultureIn24HourTimeFormat: function() {
		return Terrasoft.Resources.CultureSettings.currentCultureName !== "en-US";
	},

	/**
	 * Returns full cron description. If cron contains errors throws exception.
	 * @returns {String} Description.
	 */
	tryGetFullDescription: function() {
		var description;
		try {
			this._normalizeCronForDescription();
			description = Ext.String.format("{0}{1}{2}{3}{4}",
				this.getTimeOfDayDescription(),
				this.getDayOfMonthDescription(),
				this.getDayOfWeekDescription(),
				this.getMonthDescription(),
				this.getYearDescription()
			);
			description = this._transformVerbosity(description);
			description = description.charAt(0).toLocaleUpperCase() + description.substr(1);
		} catch (exception) {
			throw new Terrasoft.InvalidFormatException({
				message: exception.message
			});
		}
		return description;
	},

	/**
	 * Returns time of day description.
	 * @returns {String} Time of day description.
	 */
	getTimeOfDayDescription: function() {
		var secondsParam = this._expressionParts[0];
		var minutesParam = this._expressionParts[1];
		var hoursParam = this._expressionParts[2];
		var description = "";
		var hasNoSpecialChars = /^[^\/*\-,]+$/;
		var minutesHasNoSpecialChars = hasNoSpecialChars.test(minutesParam);
		var hoursHasNoSpecialChars = hasNoSpecialChars.test(hoursParam);
		var secondsHasNoSpecialChars = hasNoSpecialChars.test(secondsParam);
		var minutesIncludesDash = Terrasoft.includes(minutesParam, "-");
		var minutesIncludeSeparator = Terrasoft.includes(minutesParam, this._valueSeparator);
		var hoursIncludesSeparator = Terrasoft.includes(hoursParam, this._valueSeparator);
		var hoursIncludesDash = Terrasoft.includes(hoursParam, "-");
		if (minutesHasNoSpecialChars && hoursHasNoSpecialChars && secondsHasNoSpecialChars) {
			description += this.resources.AtSpace + this._formatTime(hoursParam, minutesParam, secondsParam);
		} else if (minutesIncludesDash && !minutesIncludeSeparator && hoursHasNoSpecialChars) {
			var minuteParts = minutesParam.split("-");
			var firstTimeStamp = this._formatTime(hoursParam, minuteParts[0]);
			var secondTimeStamp = this._formatTime(hoursParam, minuteParts[1]);
			description += Ext.String.format(this.resources.EveryMinuteBetweenX0AndX1, firstTimeStamp, secondTimeStamp);
		} else if (hoursIncludesSeparator && !hoursIncludesDash && minutesHasNoSpecialChars) {
			var hourParts = hoursParam.split(this._valueSeparator);
			description += this.resources.At;
			for (var i = 0; i < hourParts.length; i++) {
				description += this._space + this._formatTime(hourParts[i], minutesParam);
				if (i < (hourParts.length - 2)) {
					description += this._valueSeparator;
				}
				if (i === hourParts.length - 2) {
					description += this.resources.SpaceAnd;
				}
			}
		} else {
			var secondsDescription = this.getSecondsDescription();
			var minutesDescription = this.getMinutesDescription();
			var hoursDescription = this.getHoursDescription();
			description += secondsDescription;
			if (!Ext.isEmpty(description)) {
				description += this._wordsSeparator;
			}
			description += minutesDescription;
			if (!Ext.isEmpty(description)) {
				description += this._wordsSeparator;
			}
			description += hoursDescription;
		}
		return description;
	},

	/**
	 * Returns minutes description.
	 * @returns {String} Minutes description.
	 */
	getMinutesDescription: function() {
		return this._getSegmentDescription({
			expression: this._expressionParts[1],
			allDescription: this.resources.EveryMinute,
			getSingleItemDescription: function(item) {
				return item;
			},
			getIntervalDescriptionFormat: function(item) {
				return Ext.String.format(this.resources.EveryX0Minutes, item);
			},
			getBetweenDescriptionFormat: function() {
				return this.resources.MinutesX0ThroughX1PastTheHour;
			},
			getDescriptionFormat: function(item) {
				return item === "0" ? "" : this.resources.AtX0MinutesPastTheHour;
			},
			scope: this
		});
	},

	/**
	 * Returns seconds description.
	 * @returns {String} Seconds description.
	 */
	getSecondsDescription: function() {
		return this._getSegmentDescription({
			expression: this._expressionParts[0],
			allDescription: this.resources.EverySecond,
			getSingleItemDescription: function (item) {
				return item;
			},
			getIntervalDescriptionFormat: function(item) {
				return Ext.String.format(this.resources.EveryX0Seconds, item);
			},
			getBetweenDescriptionFormat: function() {
				return this.resources.SecondsX0ThroughX1PastTheMinute;
			},
			getDescriptionFormat: function(item) {
				return item === "0" ? "" : this.resources.AtX0SecondsPastTheMinute;
			},
			scope: this
		});
	},

	/**
	 * Returns hours description.
	 * @returns {String} Hours description.
	 */
	getHoursDescription: function() {
		return this._getSegmentDescription({
			expression: this._expressionParts[2],
			allDescription: this.resources.EveryHour,
			getSingleItemDescription: function(item) {
				return this._formatTime(item, "0");
			},
			getIntervalDescriptionFormat: function(item) {
				return Ext.String.format(this.resources.EveryX0Hours, item);
			},
			getBetweenDescriptionFormat: function() {
				return this.resources.BetweenX0AndX1;
			},
			getDescriptionFormat: function() {
				return this.resources.AtX0;
			},
			scope: this
		});
	},

	/**
	 * Returns day of week description.
	 * @returns {String} Day of week description.
	 */
	getDayOfWeekDescription: function() {
		var description = null;
		if (this._expressionParts[5] === "*" && this._expressionParts[3] !== "*") {
			description = "";
		} else {
			description = this._getSegmentDescription({
				expression: this._expressionParts[5],
				allDescription: this.resources.ComaEveryDay,
				getSingleItemDescription: function(item) {
					var exp = item;
					if (Terrasoft.includes(item, "#")) {
						exp = item.slice(0, item.indexOf("#"));
					} else if (Terrasoft.includes(item, "L")) {
						exp = exp.replace("L", "");
					}
					return this._convertNumberToDay(exp);
				},
				getIntervalDescriptionFormat: function (item) {
					return Ext.String.format(this.resources.ComaEveryX0DaysOfTheWeek, item);
				},
				getBetweenDescriptionFormat: function() {
					return this.resources.ComaX0ThroughX1;
				},
				getDescriptionFormat: function(item) {
					var format;
					if (Terrasoft.includes(item, "#")) {
						var dayOfWeekOfMonthNumber = item.substring(item.indexOf("#") + 1);
						var dayOfWeekOfMonthDescription = null;
						switch (dayOfWeekOfMonthNumber) {
							case "1":
								dayOfWeekOfMonthDescription = this.resources.First;
								break;
							case "2":
								dayOfWeekOfMonthDescription = this.resources.Second;
								break;
							case "3":
								dayOfWeekOfMonthDescription = this.resources.Third;
								break;
							case "4":
								dayOfWeekOfMonthDescription = this.resources.Forth;
								break;
							case "5":
								dayOfWeekOfMonthDescription = this.resources.Fifth;
								break;
						}
						format = Ext.String.format("{0}{1}{2}", this.resources.ComaOnThe,	dayOfWeekOfMonthDescription,
							this.resources.SpaceX0OfTheMonth);
					} else if (Terrasoft.includes(item, "L")) {
						format = this.resources.ComaOnTheLastX0OfTheMonth;
					} else {
						format = this.resources.ComaOnlyOnX0;
					}
					return format;
				},
				scope: this
			});
		}
		return description;
	},

	/**
	 * Returns month description.
	 * @returns {String} Month description.
	 */
	getMonthDescription: function() {
		return this._getSegmentDescription({
			expression: this._expressionParts[4],
			allDescription: "",
			getSingleItemDescription: this._convertNumberToMonth,
			getIntervalDescriptionFormat: function (item) {
				return Ext.String.format(this.resources.ComaEveryX0Months, item);
			},
			getBetweenDescriptionFormat: function () {
				return this.resources.ComaX0ThroughX1;
			},
			getDescriptionFormat: function () {
				return this.resources.ComaOnlyInX0;
			},
			scope: this
		});
	},

	/**
	 * Returns day of month description.
	 * @returns {String} Day of month description.
	 */
	getDayOfMonthDescription: function() {
		var description;
		var expression = this._expressionParts[3];
		switch (expression) {
			case "L":
				description = this.resources.ComaOnTheLastDayOfTheMonth;
				break;
			case "WL":
			case "LW":
				description = this.resources.ComaOnTheLastWeekdayOfTheMonth;
				break;
			default:
				var numberInside = /(\d{1,2}W)|(W\d{1,2})/;
				if (numberInside.test(expression)) {
					var match = Terrasoft.first(expression.match(numberInside));
					var dayNumber = match.replace("W", "");
					var nearestDay = Ext.String.format(this.resources.WeekdayNearestDayX0, dayNumber);
					var dayString = dayNumber === "1" ? this.resources.FirstWeekday : nearestDay;
					description = Ext.String.format(this.resources.ComaOnTheX0OfTheMonth, dayString);
				} else {
					description = this._getSegmentDescription({
						expression: expression,
						allDescription: this.resources.ComaEveryDay,
						getSingleItemDescription: function(item) {
							return item;
						},
						getIntervalDescriptionFormat: function(item) {
							return item === "1" ? this.resources.ComaEveryDay : this.resources.ComaEveryX0Days;
						},
						getBetweenDescriptionFormat: function() {
							return this.resources.ComaBetweenDayX0AndX1OfTheMonth;
						},
						getDescriptionFormat: function() {
							return this.resources.ComaOnDayX0OfTheMonth;
						},
						scope: this
					});
				}
				break;
		}
		return description;
	},

	/**
	 * Returns year description.
	 * @returns {String} Year description.
	 */
	getYearDescription: function() {
		return this._getSegmentDescription({
			expression: this._expressionParts[6],
			allDescription: "",
			getSingleItemDescription: function(item) {
				return item;
			},
			getIntervalDescriptionFormat: function (item) {
				return Ext.String.format(this.resources.ComaEveryX0Years, item);
			},
			getBetweenDescriptionFormat: function() {
				return this.resources.ComaX0ThroughX1;
			},
			getDescriptionFormat: function() {
				return this.resources.ComaOnlyInX0;
			},
			scope: this
		});
	},

	/**
	 * Returns segment description.
	 * @private
	 * @param {Object} config Description config.
	 * @param {String} config.expression Cron parameter.
	 * @param {String} config.allDescription Description for * parameter.
	 * @param {Function} config.getSingleItemDescription Description for single item.
	 * @param {Function} config.getIntervalDescriptionFormat Description for interval item.
	 * @param {Function} config.getBetweenDescriptionFormat Description format for composite description.
	 * @param {Function} config.getDescriptionFormat Description format.
	 * @param {Object} config.scope Functions scope.
	 * @returns {String} Description string.
	 */
	_getSegmentDescription: function(config) {
		var expression = config.expression;
		var allDescription = config.allDescription;
		var getSingleItemDescription = config.getSingleItemDescription;
		var getIntervalDescriptionFormat = config.getIntervalDescriptionFormat;
		var getBetweenDescriptionFormat = config.getBetweenDescriptionFormat;
		var getDescriptionFormat = config.getDescriptionFormat;
		var scope = config.scope;
		var betweenSegmentDescription, segments;
		var hasNoSlashMinusComma = /^[^\/\-,]+$/;
		var hasNoStarComma = /^[^*,]+$/;
		var description = null;
		if (Ext.isEmpty(expression)) {
			description = "";
		} else if (expression === "*") {
			description = allDescription;
		} else if (hasNoSlashMinusComma.test(expression)) {
			description = Ext.String.format(getDescriptionFormat.call(scope, expression),
				getSingleItemDescription.call(scope, expression));
		} else if (Terrasoft.includes(expression, "/")) {
			segments = expression.split("/");
			description = Ext.String.format(getIntervalDescriptionFormat.call(scope, segments[1]),
				getSingleItemDescription.call(scope, segments[1]));
			if (Terrasoft.includes(segments[0], "-")) {
				betweenSegmentDescription = this._generateBetweenSegmentDescription(segments[0],
					getBetweenDescriptionFormat, getSingleItemDescription, this);
				if (!Ext.String.startsWith(betweenSegmentDescription, this._wordsSeparator)) {
					description += this._wordsSeparator;
				}
				description += betweenSegmentDescription;
			} else if (hasNoStarComma.test(segments[0])) {
				var rangeItemDescription = Ext.String.format(getDescriptionFormat.call(scope, segments[0]),
					getSingleItemDescription.call(scope, segments[0]));
				rangeItemDescription = rangeItemDescription.replace(this._wordsSeparator, "");
				description += Ext.String.format(this.resources.CommaStartingX0, rangeItemDescription);
			}
		} else if (Terrasoft.includes(expression, this._valueSeparator)) {
			segments = expression.split(this._valueSeparator);
			var descriptionContent = "";
			for (var i = 0; i < segments.length; i++) {
				if (i > 0 && segments.length > 2) {
					descriptionContent += this._valueSeparator;
					if (i < segments.length - 1) {
						descriptionContent += this._space;
					}
				}
				if (i > 0 && segments.length > 1 && (i === segments.length - 1 || segments.length === 2)) {
					descriptionContent += this.resources.SpaceAndSpace;
				}
				if (Terrasoft.includes(segments[i], "-")) {
					betweenSegmentDescription = this._generateBetweenSegmentDescription(
						segments[i],
						function() {
							return this.resources.ComaX0ThroughX1;
						},
						getSingleItemDescription,
						this
					);
					betweenSegmentDescription = betweenSegmentDescription.replace(this._wordsSeparator, "");
					descriptionContent += betweenSegmentDescription;
				} else {
					descriptionContent += getSingleItemDescription.call(scope, segments[i]);
				}
			}
			description = Ext.String.format(getDescriptionFormat.call(scope, expression), descriptionContent);
		} else if (Terrasoft.includes(expression, "-")) {
			description = this._generateBetweenSegmentDescription(expression, getBetweenDescriptionFormat,
				getSingleItemDescription, this);
		}
		return description;
	}
});
