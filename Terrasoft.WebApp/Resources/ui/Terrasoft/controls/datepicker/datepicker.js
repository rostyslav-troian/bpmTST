Ext.ns("Terrasoft.controls.DatePickerEnums");

/**
 * @enum {string} Terrasoft.controls.DatePickerEnums
 * Constants of the configuration of the control.
 */
Terrasoft.controls.DatePickerEnums = {
	/**
  * Days Id
  * @type {String}
  */
	DAYS: "days",
	/**
  * Months Id
  * @type {String}
  */
	MONTHS: "months",
	/**
  * Years Id
  * @type {String}
  */
	YEARS: "years",
	/**
  * First day of the month
  * @type {Number}
  */
	FIRSTDAYINMONTH: 1,
	/**
  * Count of months in a year
  * @type {Number}
  */
	MONTHSINYEAR: 12,
	/**
  * The number of years displayed in the year display mode
  * @type {Number}
  */
	YEARSTODISPLAY: 12,
	/**
  * Number of days in week
  * @type {Number}
  */
	DAYSINWEEK: 7,
	/**
  * Number of columns in months of the year view
  * @type {Number}
  */
	ROWSNUMBER: 3,
	/**
  * The maximum number of rows occupied by the month at which its display starts from the second line
  * @type {Number}
  */
	LINESTODISPLAYFROMSECONDLINE: 5,
	/**
  * The number of rows to display the days of the month
  * @type {Number}
  */
	LINESTODISPLAY: 6,
	/**
  * Date format in the information message for today's date display
  * @type {String}
  */
	DATEFORMAT: Terrasoft.Resources.CultureSettings.dateFormat
};

/**
 * Class for working with the calendar.
 */
Ext.define("Terrasoft.controls.DatePicker", {
	alternateClassName: "Terrasoft.DatePicker",
	extend: "Terrasoft.Component",

	/**
  * Selected date.
  * @private
  * @type {Date}
  */
	date: null,

	/**
  * Current date
  * @private
  * @type {Data}
  */
	currentDate: null,

	/**
  * The date displayed.
  * @private
  * @type {Date}
  */
	displayedDate: null,

	/**
  * A configuration object for the control template.
  * @type {Object}
  */
	templateConfig: {
		data: {
			day: "data-day",
			month: "data-month",
			year: "data-year"
		},
		notCurrentClass: "ts-datepicker-not-current",
		selectedClass: "ts-datepicker-selected",
		dayClass: "ts-datepicker-day",
		monthClass: "ts-datepicker-month",
		yearClass: "ts-datepicker-year",
		daysPanelClass: "ts-datepicker-days-panel",
		monthsPanelClass: "ts-datepicker-months-panel",
		yearsPanelClass: "ts-datepicker-years-panel",
		daysWeekClass: "ts-datepicker-day-name",
		mainConfig: {
			firstItemClass: "ts-datepicker-first-item",
			lastItemClass: "ts-datepicker-last-item",
			selectedClass: "ts-datepicker-selected",
			currentDateClass: "ts-datepicker-current"
		}
	},

	/**
 t * The main wrapper template for the control.
 t * Specifies the framework of the control in which the content is then displayed.
  * @private
  * @type {Array}
  */
	/*jshint ignore:start */
	tpl: [
		'<div id="{id}-wrap" class="ts-datepicker-container" style="{wrapStyle}">',
		'<div id = "{id}-date" class="ts-datepicker-item ts-datepicker-date">{currentDate}</div>',
		'<div class="ts-datepicker-item ts-datepicker-panel {panelClass}">',
		'<div class="ts-datepicker-item ts-datepicker-arrow ts-datepicker-left-arrow">&nbsp;</div>',
		'<div id="{id}-display-mode" class="ts-datepicker-item ts-datepicker-display">',
		'<tpl for="switchInfo">',
		'<span>{.}</span>',
		'</tpl>',
		'</div>',
		'<div class = "ts-datepicker-item ts-datepicker-arrow ts-datepicker-right-arrow">&nbsp;</div>',
		'</div>',
		'{%this.generateTemplateContent(out, values)%}',
		'</div>'
	],
	/*jshint ignore:end */

	/**
  * The template that is used to display the control in the display of the days of the month.
  * @private
  * @type {Array}
  */
	/*jshint ignore:start */
	daysTpl: [
		'{% var itemClass %}',
		'<tpl for="shortDayNames">',
		'{% if (xindex === 1) { itemClass = " " + parent.firstItemClass } %}',
		'{% else if (xindex === 7) { itemClass = " " + parent.lastItemClass } %}',
		'{% else { itemClass = "" } %}',
		'<div class = "ts-datepicker-day-name ts-datepicker-item{[ itemClass ]}">{.}</div>',
		'</tpl>',
		'{% var itemClass, monthClass, selectedClass, currentDateClass %}',
		'<tpl for="daysToDisplay">',
		'{% if (xindex % 7 === 1 || xindex === 1) { itemClass = " " + parent.firstItemClass } %}',
		'{% else if (xindex % 7 === 0 && xindex >= 7) { itemClass = " " + parent.lastItemClass } %}',
		'{% else { itemClass = "" } %}',
		'{% if (values.notCurrentMonth) { monthClass = " "+ parent.notCurrentMonth } %}',
		'{% else { monthClass = "" } %}',
		'{% if (values.isSelectedDate) { selectedClass = " "+ parent.selectedClass } %}',
		'{% else { selectedClass = "" } %}',
		'{% if (values.isCurrentDate) { currentDateClass = " "+ parent.currentDateClass } %}',
		'{% else { currentDateClass = "" } %}',
		'<div class = "ts-datepicker-day ts-datepicker-item',
		'{[ itemClass ]}{[ monthClass ]}{[ selectedClass ]}{[ currentDateClass ]}"',
		'data-day="{day}" data-month="{month}" data-year="{year}">{day}</div>',
		'</tpl>'
	],
	/*jshint ignore:end */

	/**
  * The template that is used to display the control in the months of the year view.
  * @private
  * @type {Array}
  */
	/*jshint ignore:start */
	monthsTpl: [
		'{% var itemClass, selectedClass, currentMonthClass %}',
		'<tpl for="monthNames">',
		'{% if (xindex % 3 === 1 || xindex === 1) { itemClass = " " + parent.firstItemClass } %}',
		'{% else if (xindex % 3 === 0 && xindex >= 3) { itemClass = " " + parent.lastItemClass } %}',
		'{% else { itemClass = "" } %}',
		'{% if (xindex - 1 === parent.selectedMonth && parent.year === parent.selectedYear)',
		'{ selectedClass = " "+ parent.selectedClass } %}',
		'{% else { selectedClass = "" } %}',
		'{% if (xindex - 1 === parent.currentMonth && parent.year === parent.currentYear)',
		'{ currentMonthClass = " "+ parent.currentDateClass } %}',
		'{% else { currentMonthClass = "" } %}',
		'<div class = "ts-datepicker-month ts-datepicker-item',
		'{[ itemClass ]}{[ selectedClass ]}{[ currentMonthClass ]}"',
		'data-month="{[ xindex - 1]}" data-year="{[ parent.year ]}">{.}</div>',
		'</tpl>'
	],
	/*jshint ignore:end */

	/**
  * The template that is used to display the control in the mode of showing the years from the group of 12 years.
  * @private
  * @type {Array}
  */
	/*jshint ignore:start */
	yearsTpl: [
		'{% var itemClass, selectedClass, currentYearClass %}',
		'<tpl for="years">',
		'{% if (xindex % 3 === 1 || xindex === 1) { itemClass = " " + parent.firstItemClass } %}',
		'{% else if (xindex % 3 === 0 && xindex >= 3) { itemClass = " " + parent.lastItemClass } %}',
		'{% else { itemClass = "" } %}',
		'{% if (values === parent.selectedYear) { selectedClass = " "+ parent.selectedClass } %}',
		'{% else { selectedClass = "" } %}',
		'{% if (values === parent.currentYear) { currentYearClass = " "+ parent.currentDateClass } %}',
		'{% else { currentYearClass = "" } %}',
		'<div class = "ts-datepicker-year ts-datepicker-item',
		'{[ itemClass ]}{[ selectedClass ]}{[ currentYearClass ]}" data-year="{.}">{.}</div>',
		'</tpl>'
	],
	/*jshint ignore:end */

	/**
  * The element relative to which the control will be positioned.
  * @protected
  * @type {HTMLelement/Ext.dom.element}
  */
	parentEl: null,

	/**
  * The number of the day the week begins.
  * @type {Number}
  */
	startDay: Terrasoft.Resources.CultureSettings.startDay,

	/**
  * Calendar display mode.
  * @type {String}
  */
	displayMode: Terrasoft.controls.DatePickerEnums.DAYS,

	/**
  * The message that appears next to the current date.
  * @type {String}
  */
	todayMessage: Terrasoft.Resources.CultureSettings.todayMessage,

	/**
  * Short days of the week.
  * @type {String[]}
  */
	shortDayNames: Terrasoft.Resources.CultureSettings.shortDayNames,

	/**
  * Names of the months.
  * @type {String[]}
  */
	monthNames: Terrasoft.Resources.CultureSettings.monthNames,

	/**
  * Switches between the display modes for the days of the month/month of the year/year from the group of 12 years.
  * @param {Object} e Event.
  * @param {htmlDomelement} element The element on which the event occurred.
  * @param {Object} options An object that contains the isReverse parameter.
  * If isReverse is set to true, then switching between display modes will be done in reverse order.
  * @private
  */
	switchDisplayMode: function(e, element, options) {
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		var shift = options.isReverse ? -1 : 1;
		var availableDisplayMode = Terrasoft.controls.DatePickerEnums;
		var displayModes = [availableDisplayMode.DAYS, availableDisplayMode.MONTHS, availableDisplayMode.YEARS];
		var displayModeIndex = displayModes.indexOf(this.displayMode);
		displayModeIndex += shift;
		if (displayModeIndex < displayModes.length) {
			this.displayMode = displayModes[displayModeIndex];
			this.reRender();
		}
	},

	/**
  * Toggles the calendar between the neighboring months, years or groups of 12 years,
  * depending on the displayMode parameter.
  * By default, the switch is in the direction of large state values.
  * @param {Event} e The event on which the switching occurs.
  * @param {HTMLElement} element The element on which the event occurred.
  * @param {Object} options May contain the parameter isReverse, if it is set to true, then switching will occur not forward and backward.
  * @private
  */
	switchToNeighbor: function(e, element, options) {
		e.stopPropagation();
		var shift = options.isReverse ? -1 : 1;
		var displayMode = this.displayMode;
		var availableDisplayMode = Terrasoft.controls.DatePickerEnums;
		var displayedDate = this.displayedDate;
		var year;
		if (displayMode === availableDisplayMode.DAYS) {
			var month = displayedDate.getMonth();
			month += shift;
			displayedDate.setDate(availableDisplayMode.FIRSTDAYINMONTH);
			displayedDate.setMonth(month);
		} else if (displayMode === availableDisplayMode.MONTHS) {
			year = displayedDate.getFullYear();
			year += shift;
			displayedDate.setFullYear(year);
		} else {
			year = displayedDate.getFullYear() + 10 * shift;
			year = (year % 10 === 0) ? year - 1 : year;
			displayedDate.setFullYear(year);
		}
		this.reRender();
	},

	/**
  * DateSelected date selection event handler, monthSelected month selection or yearSelected year,
  * depending on the display mode of the control.
  * Sets the selected date.
  * @param {Event} e Date selection events.
  * @param {HTMLElement} el element on which the event occurred.
  * @private
  */
	selectDate: function(e, el) {
		e.stopPropagation();
		el = Ext.get(el);
		var displayMode = this.displayMode;
		var availableDisplayMode = Terrasoft.controls.DatePickerEnums;
		var year, month, day;
		var templateConfig = this.templateConfig;
		var data = templateConfig.data;
		if (displayMode === availableDisplayMode.DAYS) {
			var hasDayClass = el.hasCls(templateConfig.dayClass);
			var hasSelectedClass = el.hasCls(templateConfig.selectedClass);
			if (hasDayClass || hasSelectedClass) {
				year = el.getAttribute(data.year);
				month = el.getAttribute(data.month);
				day = el.getAttribute(data.day);
				this.changeDate(year, month, day);
				this.fireEvent("dateSelected", this);
			}
		} else if (displayMode === availableDisplayMode.MONTHS) {
			if (el.hasCls(templateConfig.monthClass)) {
				year = el.getAttribute(data.year);
				month = el.getAttribute(data.month);
				this.changeDate(year, month);
				this.switchDisplayMode(this, el.dom, {
					isReverse: true
				});
				this.fireEvent("monthSelected", this);
			}
		} else {
			if (el.hasCls(templateConfig.yearClass)) {
				year = el.getAttribute(data.year);
				this.changeDate(year);
				this.setDisplayMode(availableDisplayMode.DAYS);
				this.fireEvent("yearSelected", this);
			}
		}
	},

	/**
  * Changes the displayed and current date.
  * @param {Number} year New Year.
  * @param {Number} month New month.
  * @param {Number} day A new day.
  * @private
  */
	changeDate: function(year, month, day) {
		var displayedDate = this.displayedDate;
		var currentDay = displayedDate.getDate();
		displayedDate.setDate(Terrasoft.controls.DatePickerEnums.FIRSTDAYINMONTH);
		displayedDate.setFullYear(year);
		if (month !== undefined) {
			displayedDate.setMonth(month);
		}
		if (day !== undefined) {
			displayedDate.setDate(day);
		} else {
			displayedDate.setDate(currentDay);
		}
		this.setDate(displayedDate);
	},

	/**
  * Sets the selected date to the current one.
  * Switches the calendar to display the days of the month.
  * @private
  */
	switchToCurrentDate: function(e) {
		e.stopPropagation();
		var currentDate = this.currentDate;
		var displayMode = this.displayMode;
		var availableDisplayMode = Terrasoft.controls.DatePickerEnums;
		var isRerender = false;
		if (displayMode !== availableDisplayMode.DAYS) {
			this.displayMode = availableDisplayMode.DAYS;
			isRerender = true;
		}
		if (!Terrasoft.areDatesEqual(currentDate, this.displayedDate)) {
			this.setDisplayedDate(currentDate);
			this.setDate(currentDate);
			isRerender = true;
		}
		if (this.rendered && isRerender) {
			this.reRender();
		}
		this.fireEvent("currentDateSelected", this);
	},

	/**
  * Calculates the days of months to display the control in the display mode of the days of the month.
  * @return {Array} An array of objects that contain information about the days to display.
  * The structure of the object is as follows:
  * {
  *   day: The day to display
  *   tmonth: month number
  *   tyear: year
  *   tnotCurrentMonth: a sign that the specified number does not fall in the current month
  *   tisCurrentDate: a sign that the specified number is the same as the current date
  *   tisSelectedDate: a sign that the specified number matches the date selected
  *}
  * @private
  */
	getDaysToDisplay: function() {
		var displayedDate = this.displayedDate;
		var date = this.date;
		var currentDate = this.currentDate;
		var DisplayMode = Terrasoft.controls.DatePickerEnums;
		var daysInWeek = DisplayMode.DAYSINWEEK;
		var daysInMonth = Ext.Date.getDaysInMonth(displayedDate);
		var startDay = this.startDay;
		var firstDayOfMonth = Ext.Date.getFirstDayOfMonth(displayedDate);
		var availableDaysInFirstLine = startDay + daysInWeek - firstDayOfMonth;
		availableDaysInFirstLine = (availableDaysInFirstLine > daysInWeek) ?
		availableDaysInFirstLine - daysInWeek : availableDaysInFirstLine;
		var availableDaysForPrevMonth = daysInWeek - availableDaysInFirstLine;
		var linesForDisplayMonth = Math.ceil((daysInMonth - availableDaysInFirstLine) / daysInWeek) + 1;
		if (linesForDisplayMonth <= DisplayMode.LINESTODISPLAYFROMSECONDLINE) {
			availableDaysForPrevMonth += daysInWeek;
		}
		var availableDaysForNextMonth = DisplayMode.LINESTODISPLAY * daysInWeek -
			availableDaysForPrevMonth - daysInMonth;
		var daysToDisplay = [];
		daysToDisplay.push(availableDaysForPrevMonth);
		daysToDisplay.push(daysInMonth);
		daysToDisplay.push(availableDaysForNextMonth);
		var monthsInfo = [];
		monthsInfo.push(this.getMonthInfo(displayedDate, -1));
		monthsInfo.push(this.getMonthInfo(displayedDate));
		monthsInfo.push(this.getMonthInfo(displayedDate, 1));
		var firstDayToDisplay, day, month, year, availableDays, notCurrentMonth, isCurrentDate, isSelectedDate;
		var daysInfo = [];
		var length = DisplayMode.ROWSNUMBER;
		for (var i = 0; i < length; i++) {
			firstDayToDisplay = (i === 0) ? monthsInfo[i].daysInMonth - availableDaysForPrevMonth + 1 : 1;
			notCurrentMonth = (i !== 1);
			month = monthsInfo[i].month;
			year = monthsInfo[i].year;
			availableDays = daysToDisplay[i];
			for (var j = 0; j < availableDays; j++) {
				day = firstDayToDisplay + j;
				isCurrentDate = day === currentDate.getDate() && month === currentDate.getMonth() &&
					year === currentDate.getFullYear();
				isSelectedDate = day === date.getDate() && month === date.getMonth();
				daysInfo.push({
					day: day,
					month: month,
					year: year,
					notCurrentMonth: notCurrentMonth,
					isCurrentDate: isCurrentDate,
					isSelectedDate: isSelectedDate
				});
			}
		}
		return daysInfo;
	},

	/**
  * Returns an array consisting of a list of years to display the control in the display mode of the year from the group of 12 years.
  * @return {Array} A new array with a list of years.
  * @private
  */
	getYearsToDisplay: function(year) {
		var yearsToDisplay = Terrasoft.controls.DatePickerEnums.YEARSTODISPLAY;
		var upLimitYear = year + 10 - year % 10;
		var displayYear = upLimitYear - (yearsToDisplay - 1);
		var years = [];
		for (var i = 0; i < yearsToDisplay; i++, displayYear++) {
			years.push(displayYear);
		}
		return years;
	},

	/**
  * Creates a new array with a list of days of the week according to the set startDay parameter.
  * @param {Array} days An array with a list of days of the week.
  * @param {Number} startDay The day number from which the week starts.
  * @private
  * @return {Array} A new array with a list of days of the week.
  */
	getShiftedDays: function(days, startDay) {
		var length = days.length;
		if (Ext.isEmpty(startDay) || startDay > length) {
			return days;
		}
		var newDays = days.slice(0, startDay);
		var restDays = days.slice(startDay, length);
		return restDays.concat(newDays);
	},

	/**
  * Returns an object with selectors.
  * @private
  * @return {Object} An object with selectors.
  */
	getDatePickerSelectors: function() {
		var enums = Terrasoft.controls.DatePickerEnums;
		var selectors = {
			wrapEl: "#" + this.id + "-wrap",
			monthEl: "#" + this.id + "-display-mode > span",
			dateEl: "#" + this.id + "-date",
			rightArrowEl: ".ts-datepicker-right-arrow",
			leftArrowEl: ".ts-datepicker-left-arrow"
		};
		if (this.displayMode === enums.DAYS) {
			selectors.yearEl = "#" + this.id + "-display-mode > span + span";
		} else if (this.selectors && this.selectors.yearEl) {
			delete this.selectors.yearEl;
		}
		return selectors;
	},

	/**
  * Returns an information message for the days of the month display mode.
  * @private
  * @return {Array} Parts of the information message.
  */
	getDaysInfoMessage: function() {
		var displayedDate = this.displayedDate;
		var currentMonth = displayedDate.getMonth();
		var message = [];
		message.push(this.monthNames[currentMonth] + " ");
		message.push(displayedDate.getFullYear());
		return message;
	},

	/**
  * Returns the information message of the current day.
  * @private
  * @return {String} Information message of the current day.
  */
	getCurrentDayString: function() {
		var message = [];
		var todayDate = Ext.Date.format(this.currentDate, Terrasoft.controls.DatePickerEnums.DATEFORMAT);
		message.push(this.todayMessage);
		message.push(todayDate);
		return message.join(" ");
	},

	/**
  * Creates a markup for the current display mode, and adds the master template to it.
  * @param {String []} buffer Buffer for generating HTML
  * @param {Object} renderData Parameters passed to the template {@link #tpl tpl}.
  * @private
  */
	generateTemplateContent: function(buffer, renderData) {
		var availableDisplayMode = Terrasoft.controls.DatePickerEnums;
		var self = renderData.self;
		var displayMode = self.displayMode;
		var tpl;
		if (displayMode === availableDisplayMode.DAYS) {
			tpl = new Ext.XTemplate(self.daysTpl);
		} else if (displayMode === availableDisplayMode.MONTHS) {
			tpl = new Ext.XTemplate(self.monthsTpl);
		} else {
			tpl = new Ext.XTemplate(self.yearsTpl);
		}
		self.prepareTpl(tpl, renderData);
		tpl.applyOut(renderData, buffer);
	},

	/**
  * Positioning the menu relative to the parent element.
  * @protected
  */
	adjustPosition: function() {
		var alignEl = this.parentEl;
		if (!alignEl) {
			return;
		}
		var wrapEl = this.getWrapEl();
		wrapEl.anchorTo(alignEl, "tl-bl?", [1, 1], false, false);
		wrapEl.removeAnchor();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @protected
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.adjustPosition();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @protected
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.adjustPosition();
	},

	/**
  * Returns information about the month: year, month number, number of days in a month.
  * @param {Date} date Date relative to which information is needed.
  * @param {Number} offset Offset relative to the month passed to date.
  * If the parameter is not set, returns information about the current month.
  * @return {Object} Information about the month.
  * @protected
  */
	getMonthInfo: function(date, offset) {
		const localDate = Terrasoft.deepClone(date);
		const enums = Terrasoft.controls.DatePickerEnums;
		localDate.setDate(enums.FIRSTDAYINMONTH);
		if (!Ext.isEmpty(offset)) {
			localDate.setDate(enums.FIRSTDAYINMONTH);
			localDate.setMonth(localDate.getMonth() + offset);
		}
		return {
			year: localDate.getFullYear(),
			month: localDate.getMonth(),
			daysInMonth: Ext.Date.getDaysInMonth(localDate)
		};
	},

	/**
  * Initializes the control. Sets the value of the current date currentDate,
  * displayed date displayedDate, date date selected.
  * @protected
  * @override
  */
	init: function() {
		this.callParent(arguments);
		if (Ext.isEmpty(this.date)) {
			this.date = new Date();
		}
		if (Ext.isEmpty(this.displayedDate)) {
			this.displayedDate = Terrasoft.deepClone(this.date);
		}
		this.currentDate = new Date();
		this.addEvents(
			/**
			* @event
			* Date selection event.
			* @param {Terrasoft.DatePicker} this
			*/
			"dateSelected",
			/**
			* @event
			* The month selection event.
			* @param {Terrasoft.DatePicker} this
			*/
			"monthSelected",
			/**
			* @event
			* The year selection event.
			* @param {Terrasoft.DatePicker} this
			*/
			"yearSelected",
			/**
			* @event
			* Current date selection event.
			* @param {Terrasoft.DatePicker} this
			*/
			"currentDateSelected"
		);
	},

	/**
  * Initialize the DOM events.
  * @protected
  * @override
  */
	initDomEvents: function() {
		this.callParent(arguments);
		this.monthEl.on("click", this.switchDisplayMode, this);
		this.rightArrowEl.on("click", this.switchToNeighbor, this);
		this.leftArrowEl.on("click", this.switchToNeighbor, this, {
			isReverse: true
		});
		this.dateEl.on("click", this.switchToCurrentDate, this);
		this.wrapEl.on("click", this.selectDate, this);
		var yearEl = this.yearEl;
		if (!Ext.isEmpty(yearEl)) {
			this.yearEl.on("click", this.setYearsDisplayMode, this);
		}
	},

	/**
  * The event handler for the mouse click on the "year" control area.
  * Moves the calendar to the year view mode.
  * @protected
  */
	setYearsDisplayMode: function(e) {
		e.stopPropagation();
		this.setDisplayMode(Terrasoft.controls.DatePickerEnums.YEARS);
	},

	/**
  * Sets the desired display mode.
  * @param {String} displayMode New display mode.
  * @protected
  */
	setDisplayMode: function(displayMode) {
		this.displayMode = displayMode;
		this.reRender();
	},

	/**
	 * Append days display mode tpl data.
	 * @private
	 * @param {Object} tplData Template data.
	 */
	_appendDaysDisplayModeTplData: function(tplData) {
		tplData.shortDayNames = this.getShiftedDays(this.shortDayNames, this.startDay);
		tplData.daysToDisplay = this.getDaysToDisplay(this.displayedDate);
		tplData.notCurrentMonth = this.templateConfig.notCurrentClass;
		tplData.switchInfo = this.getDaysInfoMessage();
		tplData.panelClass = this.templateConfig.daysPanelClass;
	},

	/**
	 * Append months display mode tpl data.
	 * @private
	 * @param {Object} tplData Template data.
	 */
	_appendMonthsDisplayModeTplData: function(tplData) {
		var year = this.displayedDate.getFullYear();
		tplData.monthNames = this.monthNames;
		tplData.year = tplData.switchInfo = year;
		tplData.currentMonth = this.currentDate.getMonth();
		tplData.selectedMonth = this.date.getMonth();
		tplData.panelClass = this.templateConfig.monthsPanelClass;
	},

	/**
	 * Append years display mode tpl data.
	 * @private
	 * @param {Object} tplData Template data.
	 */
	_appendYearsDisplayModeTplData: function(tplData) {
		var years = this.getYearsToDisplay(this.displayedDate.getFullYear());
		var firstYear = years[0];
		var lastYear = years[years.length - 1];
		var infoYears = Terrasoft.getIsRtlMode() ? [lastYear, firstYear] : [firstYear, lastYear];
		tplData.years = years;
		tplData.switchInfo = infoYears.join("-");
		tplData.panelClass = this.templateConfig.yearsPanelClass;
	},

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @protected
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var availableDisplayMode = Terrasoft.controls.DatePickerEnums;
		var date = this.date;
		var currentDate = this.currentDate;
		var templateConfig = this.templateConfig;
		switch (this.displayMode) {
			case availableDisplayMode.DAYS:
				this._appendDaysDisplayModeTplData(tplData);
				break;
			case availableDisplayMode.MONTHS:
				this._appendMonthsDisplayModeTplData(tplData);
				break;
			case availableDisplayMode.YEARS:
				this._appendYearsDisplayModeTplData(tplData);
				break;
			default:
				break;
		}
		tplData.currentYear = currentDate.getFullYear();
		tplData.selectedYear = date.getFullYear();
		tplData.currentDate = this.getCurrentDayString();
		var mainConfig = templateConfig.mainConfig;
		for (var property in mainConfig) {
			tplData[property] = mainConfig[property];
		}
		tplData.generateTemplateContent = this.generateTemplateContent;
		this.selectors = this.getDatePickerSelectors();
		this.styles = this.getDatePickerStyles();
		return tplData;
	},

	/**
  * Gets the styles for the control.
  * @return {Object} The styles for the control.
  */
	getDatePickerStyles: function() {
		var styles = {};
		var parentEl = this.parentEl;
		if (!Ext.isEmpty(parentEl)) {
			var wrapStyle = styles.wrapStyle = {};
			var box = parentEl.getBox();
			wrapStyle.top = box.bottom + "px";
			wrapStyle.left = box.x + "px";
		}
		return styles;
	},

	/**
  * Sets the selected date.
  * @param {Date} date New date.
  */
	setDate: function(date) {
		this.date = Terrasoft.deepClone(date);
		this.safeRerender();
	},

	/**
  * Sets the date to display.
  * @param {Date} date New date.
  */
	setDisplayedDate: function(date) {
		this.displayedDate = Terrasoft.deepClone(date);
		this.safeRerender();
	},

	/**
  * Sets the selected date.
  * @return {Date} New date.
  */
	getDate: function() {
		return this.date;
	},

	/**
  * Displays the drop-down list.
  * @param {Object} options Enumerate the public parameters of this class with the required values.
  */
	show: function(parentEl) {
		this.visible = true;
		this.parentEl = parentEl;
		if (!this.renderTo) {
			this.renderTo = Ext.getBody();
		}
		if (!this.rendered) {
			this.render(this.renderTo);
		} else {
			this.reRender();
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#setVisible
	 * @override
	 */
	setVisible: function(visible) {
		if (this.visible === visible) {
			return;
		}
		var daysMode = Terrasoft.controls.DatePickerEnums.DAYS;
		if (this.displayMode !== daysMode && visible) {
			this.displayMode = daysMode;
		}
		this.callParent(arguments);
	}

});