Ext.ns("Terrasoft.utils.date");

/**
 * @singleton
 */

/**
 * Adds days to date.
 * @param {Date} date Date to change.
 * @param {Number} days Number of days.
 * @return {Date} New date.
 */
Terrasoft.utils.date.addDays = function(date, days) {
	if (!(date instanceof Date)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	days = parseInt(days, 10);
	if (isNaN(days)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.date#addDays}
 * @member Terrasoft
 * @method addDays
 * @inheritdoc Terrasoft.utils.date#addDays
 */
Terrasoft.addDays = Terrasoft.utils.date.addDays;

/**
 * Adds minutes to date.
 * @param {Date} date Date to change.
 * @param {Number} minutes Number of minutes.
 * @return {Date} New date.
 */
Terrasoft.utils.date.addMinutes = function(date, minutes) {
	if (!(date instanceof Date)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	minutes = parseInt(minutes, 10);
	if (isNaN(minutes)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	var result = new Date(date);
	result.setMinutes(result.getMinutes() + minutes);
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.date#addMinutes}
 * @member Terrasoft
 * @method addMinutes
 * @inheritdoc Terrasoft.utils.date#addMinutes
 */
Terrasoft.addMinutes = Terrasoft.utils.date.addMinutes;

/**
 * Compares two dates (checks year month and day).
 * @param {Date} date1 Date to compare.
 * @param {Date} date2 Date to compare.
 * @return {Boolean} Returns true if values are equal.
 */
Terrasoft.utils.date.areDatesEqual = function(date1, date2) {
	if (Ext.isDate(date1) && Ext.isDate(date2)) {
		return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear();
	}
	return false;
};

/**
 * Alias for {@link Terrasoft.utils.date#areDatesEqual
 * @member Terrasoft
 * @method areDatesEqual
 * @inheritdoc Terrasoft.utils.date#areDatesEqual
 */
Terrasoft.areDatesEqual = Terrasoft.utils.date.areDatesEqual;

/**
 * Returns parameter without seconds and milliseconds.
 * @throws {Terrasoft.exceptions.UnsupportedTypeException}
 * Throws exception UnsupportedTypeException if argument type neither dateValue nor Date.
 * @param {Date} dateValue Date value.
 * @return {Date} Parameter without seconds and milliseconds.
 */
Terrasoft.utils.date.clearSeconds = function(dateValue) {
	if (!Ext.isDate(dateValue)) {
		throw new Terrasoft.exceptions.UnsupportedTypeException();
	}
	var result = new Date(dateValue);
	result = new Date(result.setMilliseconds(0));
	result = new Date(result.setSeconds(0));
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.date#clearSeconds}
 * @member Terrasoft
 * @method clearSeconds
 * @inheritdoc Terrasoft.utils.date#clearSeconds
 */
Terrasoft.clearSeconds = Terrasoft.utils.date.clearSeconds;

/**
 * Clears time of date.
 * @param {Date} dateValue Date value.
 * @return {Date} Date value with cleared time.
 */
Terrasoft.utils.date.clearTime = function(dateValue) {
	return Ext.Date.clearTime(dateValue, true);
};

/**
 * Alias for {@link Terrasoft.utils.date#clearTime}
 * @member Terrasoft
 * @method clearTime
 * @inheritdoc Terrasoft.utils.date#clearTime
 */
Terrasoft.clearTime = Terrasoft.utils.date.clearTime;


/**
 * Returns date diff in days.
 * @param {Date} startDate Start date value.
 * @param {Date} endDate End date value.
 * @return {Number} Diff in days.
 */
Terrasoft.utils.date.dateDiffDays = function(startDate, endDate) {
	if (Ext.isDate(startDate) && Ext.isDate(endDate)) {
		var oneDay = Terrasoft.DateRate.MILLISECONDS_IN_DAY;
		var diffDate = Math.ceil(endDate.getTime() / oneDay) - Math.ceil(startDate.getTime() / oneDay);
		return diffDate;
	}
	throw new Terrasoft.exceptions.InvalidDateFormatException();
};

/**
 * Alias for {@link Terrasoft.utils.date#dateDiffDays}
 * @member Terrasoft
 * @method dateDiffDays
 * @inheritdoc Terrasoft.utils.date#dateDiffDays
 */
Terrasoft.dateDiffDays = Terrasoft.utils.date.dateDiffDays;

/**
 * Returns end of day.
 * @param {Date} dateValue Date value.
 * @return {Date} Date value of end of day (time 23:59:59.999).
 */
Terrasoft.utils.date.endOfDay = function(dateValue) {
	var date = Ext.Date.clone(dateValue);
	date.setHours(23);
	date.setMinutes(59);
	date.setSeconds(59);
	date.setMilliseconds(999);
	return date;
};

/**
 * Alias for {@link Terrasoft.utils.date#endOfDay}
 * @member Terrasoft
 * @method endOfDay
 * @inheritdoc Terrasoft.utils.date#endOfDay
 */
Terrasoft.endOfDay = Terrasoft.utils.date.endOfDay;

/**
 * Returns end of today.
 * @return {Date} Date value of end of today (time 23:59:59.999).
 */
Terrasoft.utils.date.endOfToday = function() {
	return Terrasoft.endOfDay(new Date());
};

/**
 * Alias for {@link Terrasoft.utils.date#endOfToday}
 * @member Terrasoft
 * @method endOfToday
 * @inheritdoc Terrasoft.utils.date#endOfToday
 */
Terrasoft.endOfToday = Terrasoft.utils.date.endOfToday;

/**
 * Returns end of month.
 * @param {Date} dateValue Date value.
 * @return {Date} Date value of end of month (time 23:59:59.999).
 */
Terrasoft.utils.date.endOfMonth = function(dateValue) {
	return Terrasoft.endOfDay(Ext.Date.getLastDateOfMonth(dateValue));
};

/**
 * Alias for {@link Terrasoft.utils.date#endOfMonth}
 * @member Terrasoft
 * @method endOfMonth
 * @inheritdoc Terrasoft.utils.date#endOfMonth
 */
Terrasoft.endOfMonth = Terrasoft.utils.date.endOfMonth;

/**
 * Returns end of quarter.
 * @param {Date} dateValue Date value.
 * @return {Date} Date value of end of month (time 23:59:59.999).
 */
Terrasoft.utils.date.endOfQuarter = function(dateValue) {
	var quarter = Math.floor(dateValue.getMonth() / 3);
	var month = 2;
	var day = 31;
	switch (quarter) {
		case 1:
			month = 5;
			day = 30;
			break;
		case 2:
			month = 8;
			day = 30;
			break;
		case 3:
			month = 11;
			day = 31;
			break;
		default:
			break;
	}
	return Terrasoft.endOfDay(new Date(dateValue.getFullYear(), month, day));
};

/**
 * Alias for {@link Terrasoft.utils.date#endOfQuarter}
 * @member Terrasoft
 * @method endOfQuarter
 * @inheritdoc Terrasoft.utils.date#endOfQuarter
 */
Terrasoft.endOfQuarter = Terrasoft.utils.date.endOfQuarter;

/**
 * Returns end of week.
 * @param {Date} dateValue Date value.
 * @return {Date} Date value of end of week (time 23:59:59.999).
 */
Terrasoft.utils.date.endOfWeek = function(dateValue) {
	var dateDiff = dateValue.getDay()  + (1 - Terrasoft.Resources.CultureSettings.startDay);
	dateDiff = dateDiff ? 7 - dateDiff : dateDiff;
	return Terrasoft.endOfDay(Ext.Date.add(dateValue, Ext.Date.DAY, dateDiff));
};

/**
 * Alias for {@link Terrasoft.utils.date#endOfWeek}
 * @member Terrasoft
 * @method endOfWeek
 * @inheritdoc Terrasoft.utils.date#endOfWeek
 */
Terrasoft.endOfWeek = Terrasoft.utils.date.endOfWeek;

/**
 * Returns end of year.
 * @param {Date} dateValue Date value.
 * @return {Date} Date value of end of year (time 23:59:59.999).
 */
Terrasoft.utils.date.endOfYear = function(dateValue) {
	return new Date(dateValue.getFullYear(), 11, 31, 23, 59, 59, 999);
};

/**
 * Alias for {@link Terrasoft.utils.date#endOfYear}
 * @member Terrasoft
 * @method endOfYear
 * @inheritdoc Terrasoft.utils.date#endOfYear
 */
Terrasoft.endOfYear = Terrasoft.utils.date.endOfYear;

/**
 * Returns number of minutes from midnight.
 * @param {Date} date Date value.
 * @return {number} Number of minutes from midnight.
 */
Terrasoft.utils.date.getMinutesFromMidnight = function(date) {
	var hour = date.getHours();
	var minutes = hour * Terrasoft.DateRate.MINUTES_IN_HOUR + date.getMinutes();
	return minutes;
};

/**
 * Alias for {@link Terrasoft.utils.date#getMinutesFromMidnight}
 * @member Terrasoft
 * @method getMinutesFromMidnight
 * @inheritdoc Terrasoft.utils.date#getMinutesFromMidnight
 */
Terrasoft.getMinutesFromMidnight = Terrasoft.utils.date.getMinutesFromMidnight;

/**
 * Checks whether date is midnight.
 * @param {Date} date Date to check.
 * @return {Boolean} Returns true if date is midnight.
 */
Terrasoft.utils.date.isMidnight = function(date) {
	return Ext.Date.isEqual(date, Terrasoft.clearTime(date));
};

/**
 * Alias for {@link Terrasoft.utils.date#isMidnight}
 * @member Terrasoft
 * @method isMidnight
 * @inheritdoc Terrasoft.utils.date#isMidnight
 */
Terrasoft.isMidnight = Terrasoft.utils.date.isMidnight;


/**
 * Returns string to date.
 * @param {String} value Date to serialize.
 * @param {String} format date format.
 * @param {Boolean} strict flag.
 * @return {Date} Deserialized date.
 */
Terrasoft.utils.date.parseDate = function(value, format, strict) {
	var result = Ext.Date.parse(value, format || "c", strict || false);
	if (!Ext.isDate(result)) {
		throw new Terrasoft.exceptions.InvalidDateFormatException();
	}
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.date#parseDate}
 * @member Terrasoft
 * @method parseDate
 * @inheritdoc Terrasoft.utils.date#parseDate
 */
Terrasoft.parseDate = Terrasoft.utils.date.parseDate;

/**
 * Returns start of day.
 * @param {Date} dateValue Date value.
 * @return {Date} Date value with empty time.
 */
Terrasoft.utils.date.startOfDay = function(dateValue) {
	return Ext.Date.clearTime(dateValue, true);
};

/**
 * Alias for {@link Terrasoft.utils.date#startOfDay}
 * @member Terrasoft
 * @method startOfDay
 * @inheritdoc Terrasoft.utils.date#startOfDay
 */
Terrasoft.startOfDay = Terrasoft.utils.date.startOfDay;

/**
 * Returns start of month.
 * @param {Date} dateValue Date value.
 * @return {Date} Date value of start of month.
 */
Terrasoft.utils.date.startOfMonth = function(dateValue) {
	return Ext.Date.getFirstDateOfMonth(dateValue);
};

/**
 * Alias for {@link Terrasoft.utils.date#startOfMonth}
 * @member Terrasoft
 * @method startOfMonth
 * @inheritdoc Terrasoft.utils.date#startOfMonth
 */
Terrasoft.startOfMonth = Terrasoft.utils.date.startOfMonth;

/**
 * Returns start of quarter.
 * @param {Date} dateValue Date value.
 * @return {Date} Date value of start of month.
 */
Terrasoft.utils.date.startOfQuarter = function(dateValue) {
	var quarter = Math.floor(dateValue.getMonth() / 3);
	var month = 0;
	switch (quarter) {
		case 1:
			month = 3;
			break;
		case 2:
			month = 6;
			break;
		case 3:
			month = 9;
			break;
		default:
			break;
	}
	return new Date(dateValue.getFullYear(), month, 1);
};

/**
 * Alias for {@link Terrasoft.utils.date#startOfQuarter}
 * @member Terrasoft
 * @method startOfQuarter
 * @inheritdoc Terrasoft.utils.date#startOfQuarter
 */
Terrasoft.startOfQuarter = Terrasoft.utils.date.startOfQuarter;

/**
 * Returns start of week.
 * @param {Date} dateValue Date value.
 * @return {Date} Date value of start of week.
 */
Terrasoft.utils.date.startOfWeek = function(dateValue) {
	var dateDiff = dateValue.getDay() + (1 - Terrasoft.Resources.CultureSettings.startDay);
	dateDiff = dateDiff ? 1 - dateDiff : -6;
	return Terrasoft.startOfDay(Ext.Date.add(dateValue, Ext.Date.DAY, dateDiff));
};

/**
 * Alias for {@link Terrasoft.utils.date#startOfWeek}
 * @member Terrasoft
 * @method startOfWeek
 * @inheritdoc Terrasoft.utils.date#startOfWeek
 */
Terrasoft.startOfWeek = Terrasoft.utils.date.startOfWeek;

/**
 * Returns start of year.
 * @param {Date} dateValue Date value.
 * @return {Date} Date value of start of year.
 */
Terrasoft.utils.date.startOfYear = function(dateValue) {
	return new Date(dateValue.getFullYear(), 0, 1);
};

/**
 * Alias for {@link Terrasoft.utils.date#startOfYear}
 * @member Terrasoft
 * @method startOfYear
 * @inheritdoc Terrasoft.utils.date#startOfYear
 */
Terrasoft.startOfYear = Terrasoft.utils.date.startOfYear;

/**
 * Returns string with date in locale format.
 * Example:
 *
 *      var date = new Date(Date.UTC(2016, 01, 20));
 *      var options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
 *      this.Terrasoft.toLocaleDate(date, "en-US", options);
 *
 * Returns: "Saturday, Feb 20, 2016"
 * @param {Date} date Date value.
 * @param {String} [culture] A string with a BCP 47 language tag.
 * @param {Object} [options] Converting options.
 * @return {String} String with date in locale format.
 */
Terrasoft.utils.date.toLocaleDate = function(date, culture, options) {
	if (Ext.isDate(date)) {
		var params = [];
		if (culture) {
			params.push(culture);
		}
		if (culture && options) {
			params.push(options);
		}
		return date.toLocaleDateString.apply(date, params);
	}
	throw new Terrasoft.exceptions.InvalidDateFormatException();
};

/**
 * Alias for {@link Terrasoft.utils.date#toLocaleDate}
 * @member Terrasoft
 * @method toLocaleDate
 * @inheritdoc Terrasoft.utils.date#toLocaleDate
 */
Terrasoft.toLocaleDate = Terrasoft.utils.date.toLocaleDate;

/**
 * Returns date in target time zone.
 * Example:
 *
 *      var date = new Date(Date.UTC(2016, 01, 20));
 *      var timeZone = "UTC";
 *      this.Terrasoft.convertToTimeZone(date, timeZone);
 *
 * @param {Date} date Date value.
 * @param {String} targetTimeZone time zone name.
 * @param {Number} currentUserTimeZoneOffset time zone offset in minutes
 * @return {Date} instance of Date in target time zone.
 */
Terrasoft.utils.date.convertToTimeZone = function(date, targetTimeZone, currentUserTimeZoneOffset) {
	if (Ext.isDate(date)) {
		if (targetTimeZone) {
			var timeZoneOffset = 0;
			var matches = targetTimeZone.match("[+-][0-9]{2}:[0-9]{2}");
			if (matches) {
				var gmtParts = matches[0].split(":");
				timeZoneOffset = ((+gmtParts[0]) * 60);
				timeZoneOffset += +gmtParts[1];
			}
			if (currentUserTimeZoneOffset) {
				timeZoneOffset -= currentUserTimeZoneOffset;
			}
			timeZoneOffset *= 60000;
			return new Date(date.getTime() - timeZoneOffset);
		}
		return date;
	} else {
		throw new Terrasoft.exceptions.InvalidDateFormatException();
	}
};

/**
 * Alias for {@link Terrasoft.utils.date#convertToTimeZone}
 * @member Terrasoft
 * @method convertToTimeZone
 * @inheritdoc Terrasoft.utils.date#convertToTimeZone
 */
Terrasoft.convertToTimeZone = Terrasoft.utils.date.convertToTimeZone;

/**
 * string represent of date in ISO 8601 without time zone specification.
 * Example:
 *
 *      var date = new Date(2018, 01, 20, 15, 10, 30);
 *      this.Terrasoft.toLocalISOString(date);
 *
 * Returns: "2018-02-20T15:10:30"
 * @param {Date} date Date value.
 * @return {String} string represent of date in ISO 8601.
 */
Terrasoft.utils.date.toLocalISOString = function(date) {
	if (Ext.isDate(date)) {
		var timeZoneOffset = (date).getTimezoneOffset() * 60000;
		var localISOTime = (new Date(date.getTime() - timeZoneOffset)).toISOString().slice(0, -1);
		return localISOTime;
	}
	throw new Terrasoft.exceptions.InvalidDateFormatException();
};

/**
 * Alias for {@link Terrasoft.utils.date#toLocalISOString}
 * @member Terrasoft
 * @method toLocalISOString
 * @inheritdoc Terrasoft.utils.date#toLocalISOString
 */
Terrasoft.toLocalISOString = Terrasoft.utils.date.toLocalISOString;

/**
 * String represent of date in user culture settings.
 * Example:
 *
 *      Terrasoft.Resources.CultureSettings.dateFormat = "Y/m/d";
 *      Terrasoft.Resources.CultureSettings.timeFormat = "G|i|s";
 *      var date = new Date(2018, 0, 29, 20, 57, 1);
 *      Terrasoft.toCultureDateTime(date);
 *
 * Returns: "2018/01/29 20|57|01"
 * @param {Date} date Date value.
 * @return {String} string represent of date in user culture settings.
 */
Terrasoft.utils.date.toCultureDateTime = function(date) {
	const resources = Terrasoft.Resources;
	const cultureSettings = resources && resources.CultureSettings;
	const dateFormat = cultureSettings && cultureSettings.dateFormat;
	const timeFormat = cultureSettings && cultureSettings.timeFormat;
	if (!Ext.isDate(date)) {
		throw new Terrasoft.exceptions.InvalidDateFormatException();
	}
	if (!dateFormat || !timeFormat) {
		return Terrasoft.toLocalISOString(date);
	}
	const dateTimeFormat = Ext.String.format("{0} {1}", dateFormat, timeFormat);
	const cultureDateTime = Ext.Date.format(new Date(date), dateTimeFormat);
	return cultureDateTime;
};

/**
 * Alias for {@link Terrasoft.utils.date#toCultureDateTime}
 * @member Terrasoft
 * @method toCultureDateTime
 * @inheritdoc Terrasoft.utils.date#toCultureDateTime
 */
Terrasoft.toCultureDateTime = Terrasoft.utils.date.toCultureDateTime;
