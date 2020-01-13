Ext.ns("Terrasoft.controls.ScheduleEdit");

/**
 * Time scale.
 * @enum
 */
Terrasoft.controls.ScheduleEdit.TimeScale = {
	/** 1 minute */
	ONE_MINUTE: 1,
	/** 5 minutes */
	FIVE_MINUTES: 5,
	/** 10 minutes */
	TEN_MINUTES: 10,
	/** 15 minutes */
	FIFTEEN_MINUTES: 15,
	/** 30 minutes */
	THIRTY_MINUTES: 30,
	/** 60 minutes */
	SIXTY_MINUTES: 60
};

/**
 * Abbreviation for {@link Terrasoft.controls.Scheduler.TimeScale}
 * @member Terrasoft
 * @inheritdoc Terrasoft.controls.Scheduler.TimeScale
 */
Terrasoft.TimeScale = Terrasoft.controls.ScheduleEdit.TimeScale;

/**
 * Drag-and-Drop action.
 * @enum
 */
Terrasoft.controls.ScheduleEdit.DDAction = {
	/** Move */
	MOVE: 0,
	/** Resizing upwards */
	RESIZE_TOP: 1,
	/** Resizing down */
	RESIZE_BOTTOM: 2,
	/** Resizing right */
	RESIZE_RIGHT: 3,
	/** Resizing left */
	RESIZE_LEFT: 4
};

/**
 * The size parameters of the markup that are used to recalculate task transfer areas.
 * @enum
 */
Terrasoft.controls.ScheduleEdit.MultiDayItemAreaLayoutSizes = {
	/**
	 * Line thickness.
	 */
	BORDER_WIDTH: 3,
	/**
	 * Line height.
	 */
	BORDER_HEIGHT: 1,
	/**
	 * Lower internal indentation in the area of multi-day tasks.
	 */
	MULTI_DAY_ITEM_PADDING_BOTTOM: 1,
	/**
	 * Upper internal indentation in the area of multi-day tasks.
	 */
	MULTI_DAY_ITEM_PADDING_TOP: 1
};

Terrasoft.MultiDayItemAreaLayoutSizes = Terrasoft.controls.ScheduleEdit.MultiDayItemAreaLayoutSizes;

/**
 * Abbreviation for {@link Terrasoft.controls.Scheduler.DDAction}
 * @member Terrasoft
 * @inheritdoc Terrasoft.controls.Scheduler.DDAction
 */
Terrasoft.DDAction = Terrasoft.controls.ScheduleEdit.DDAction;

/**
 * Class for working with the schedule.
 */
Ext.define("Terrasoft.controls.ScheduleEdit.ScheduleEdit", {
	extend: "Terrasoft.controls.Component",
	alternateClassName: "Terrasoft.ScheduleEdit",

	/**
	 * Estimated height of the time cell.
	 * @type {Number}
	 */
	timeItemHeight: 2.2,

	/**
	 * Estimated width of the non-primary time zone.
	 * @type {Number}
	 */
	timezoneItemWidth: 3.5,

	/**
	 * Estimated width of the main time zone.
	 * @type {Number}
	 */
	mainTimezoneItemWidth: 3.5,

	/**
	 * Date from.
	 * @type {Date}
	 */
	startDate: null,

	/**
	 * Date to.
	 * @type {Date}
	 */
	dueDate: null,

	/**
	 * Period.
	 * @type {Object}
	 */
	period: null,

	/**
	 * Time interval scale.
	 * @type {Terrasoft.TimeScale}
	 */
	timeScale: null,

	/**
	 * The amount of indentation from below (px)
	 * @type {Number}
	 */
	bottomPadding: 5,

	/**
	 * Time zones.
	 * @type {Array}
	 * Example: timezone: [{ timezoneTitle: "Kiev", timezoneTime: 2 }]
	 */
	timezone: null,

	/**
	 * The requirement to show images in the title of dates.
	 * @type {Boolean}
	 */
	showDayImages: false,

	/**
	 * Array of dates for selected days.
	 * @type {Array|null}
	 */
	selectedDays: [],

	/**
	 * List of class objects for displaying the day's image for the seven days of the week starting with Sunday.
	 * @private
	 * @type {Array}
	 */
	weekImageConfig: [
		{dayImageClass: "schedule-edit-day-image-sunday"},
		{dayImageClass: "schedule-edit-day-image-monday"},
		{dayImageClass: "schedule-edit-day-image-tuesday"},
		{dayImageClass: "schedule-edit-day-image-wednesday"},
		{dayImageClass: "schedule-edit-day-image-thursday"},
		{dayImageClass: "schedule-edit-day-image-friday"},
		{dayImageClass: "schedule-edit-day-image-saturday"}
	],

	/**
	 * List of classes to display the image for the default day.
	 * @private
	 * @type {Object}
	 */
	dayImageConfig: {
		dayImageClass: "schedule-edit-day-image",
		selectedDayImageClass: "schedule-edit-selected-day-image"
	},

	/**
	 * Calendar elements.
	 * @type {Object[]}
	 */
	collection: [],

	/**
	 * Calendar elements.
	 * @type {Terrasoft.Collection}
	 */
	activityCollection: null,

	/**
	 * List of days to re-draw.
	 * @type {Array}
	 */
	schedulerDayList: [],

	/**
	 * Array of keys for ViewModel elements of selected schedule elements.
	 * @type {Array}
	 */
	selectedItems: [],

	/**
	 * @property {Object} selection The start and end date of the selected area.
	 * @property {Date} selection.startDate Start date of the selected area.
	 * @property {Date} selection.dueDate End date of the selected area.
	 */
	selection: null,

	/**
	 * @property {Object} selection The start and end date of the selected area. Used to store the value
	 * of the selected area during the selection.
	 * @property {Date} selection.startDate Start date of the selected area.
	 * @property {Date} selection.dueDate End date of the selected area.
	 * @private
	 */
	innerSelection: null,

	/**
	 * Collection of Quick Adding Window Models.
	 * @private
	 * @type {Terrasoft.BaseViewModelCollection}
	 */
	floatingItemsCollection: null,

	/**
	 * Collection of pop-up window controls.
	 * @private
	 * @type {Terrasoft.BaseViewModelCollection}
	 */
	scheduleFloatingItems: null,

	/**
	 * Initial display time.
	 * @type {String}
	 * Example:
	 * 8:05 - 8-05
	 * 9:00 - 9-00
	 * 11:30 - 11-30
	 */
	displayStartHour: null,

	/**
	 * Calendar start time.
	 * @type {Number}
	 */
	startHour: 0,

	/**
	 * Calendar end time.
	 * @type {Number}
	 */
	dueHour: 24,

	/**
	 * Scrollbar visibility property.
	 * @type {Boolean}
	 */
	isScrollVisible: false,

	/**
	 * The property that defines the element and the action of Drag-and-drop
	 * Used to recalculate the allowed values when the position / size of the calendar item changes.
	 * @type {Object}
	 */
	itemDDEl: null,

	/**
	 * Common control template, contains the markup of the scrolling elements and a method for rendering content.
	 * @override
	 * @type {Array}
	 */
	tpl: [
		/* jshint quotmark:false */
		// jscs:disable
		"<div id=\"{id}-scheduler\" class=\"{schedulerAreaClass}\">",
		"<div id=\"{id}-title-area\" class=\"{titleAreaClass}\" style=\"{titleAreaStyle}\">",
		"<div style=\"{timezoneTitleAreaStyle}\" class=\"{timezoneTitleAreaClass}\">",
		"</div>",
		"<div style=\"{dayTitleAreaStyle}\" class=\"{dayTitleAreaClass}\">" +
		"{%this.prepareDayTitle(out, values)%}",
		"</div>",
		"</div>",
		"<div style=\"{multiDayItemAreaStyle}\" class=\"{multiDayItemAreaClass}\">",
		"<div style=\"{timezoneTitleAreaStyle}\" class=\"{timezoneTitleAreaClass}\">",
		"{%this.prepareTimezoneTitle(out, values)%}",
		"</div>",
		"<div style=\"{dayTitleAreaStyle}\" class=\"{dayTitleAreaClass}\">",
		"</div>",
		"</div>",
		"<div id=\"{id}-scroll-area\" class=\"{scrollAreaClass}\" style=\"{gridScrollStyle}\">",
		"<div id=\"{id}-grid-area\" style=\"{timeGridStyle}\" class=\"{gridAreaClass}\">",
		"<div class=\"{timeColumnAreaClass}\">",
		"<div id=\"{id}-time-marker\" style=\"top:0em\" class=\"time-marker\"></div>",
		"{%this.prepareTimeColumn(out, values)%}",
		"</div>",
		"<div class=\"{dayGridAreaClass}\">",
		"<div style=\"{dayColumnAreaStyle}\" class=\"{dayColumnAreaClass}\" " +
		"id=\"{id}-scheduler-day-column-area\">",
		"{%this.prepareDayColumn(out, values)%}",
		"</div>",
		"<div class=\"{dayRowAreaClass}\" id=\"{id}-scheduler-day-row-area\">",
		"{%this.prepareDayRow(out, values)%}",
		"</div>",
		"</div>",
		"</div>",
		"</div>",
		"</div>"
		// jscs:enable
		/* jshint quotmark:true */
	],

	/**
	 * Calendar configuration.
	 * @private
	 * @static
	 * @type {Object}
	 */
	schedulerConfig: {
		classes: {
			schedulerAreaClass: ["scheduler-area"],
			titleAreaClass: ["title-area"],
			multiDayItemAreaClass: ["multi-day-item-area"],
			gridAreaClass: ["grid-area"],
			timezoneTitleAreaClass: ["timezone-title-area"],
			dayTitleAreaClass: ["day-title-area"],
			timeColumnAreaClass: ["time-column-area"],
			dayGridAreaClass: ["day-grid-area"],
			dayColumnAreaClass: ["day-column-area"],
			dayRowAreaClass: ["day-row-area"],
			dayTitleClass: ["day-title", "today-title", "holiday-title"],
			dayColumnClass: ["day-column", "holiday-column"],
			timezoneTitleClass: ["main-timezone-title", "single-main-timezone-title", "timezone-title"],
			timeColumnClass: ["main-time-column", "time-column"],
			scrollAreaClass: ["scroll-area", "ts-box-sizing"]
		},
		styles: {
			titleAreaStyle: {
				"z-index": "20"
			},
			multiDayItemAreaStyle: {
				height: ""
			},
			timeGridStyle: {
				height: ""
			},
			timezoneTitleAreaStyle: {
				width: ""
			},
			dayTitleAreaStyle: {
				"padding-left": ""
			},
			dayColumnAreaStyle: {
				"padding-left": ""
			},
			dayItemWidthStyle: {
				width: ""
			},
			gridScrollStyle: {
				"height": "auto",
				"overflow-y": "auto",
				"overflow-x": "hidden"
			}
		},
		/* jshint quotmark:false */
		// jscs:disable
		mainTimezoneHourTpl: {
			minutes5:
			"<div class=\"hour-cell\"><div class=\"hour-cell-content\">{hourNumber}</div></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"><div class=\"minute-cell-content\">15</div></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"><div class=\"minute-cell-content\">30</div></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"><div class=\"minute-cell-content\">45</div></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>",
			minutes10:
			"<div class=\"hour-cell\"><div class=\"hour-cell-content\">{hourNumber}</div></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"><div class=\"minute-cell-content\">30</div></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>",
			minutes15:
			"<div class=\"hour-cell\"><div class=\"hour-cell-content\">{hourNumber}</div></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"><div class=\"minute-cell-content\">30</div></div>" +
			"<div class=\"minute-cell\"></div>",
			minutes30:
			"<div class=\"hour-cell\"><div class=\"hour-cell-content\">{hourNumber}</div></div>" +
			"<div class=\"minute-cell\"></div>",
			minutes60:
				"<div class=\"hour-cell\"><div class=\"hour-cell-content\">{hourNumber}</div></div>"
		},
		timezoneHourTpl: {
			minutes5:
			"<div class=\"hour-cell\"><div class=\"hour-cell-content\">{hourNumber}</div></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>",
			minutes10:
			"<div class=\"hour-cell\"><div class=\"hour-cell-content\">{hourNumber}</div></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>",
			minutes15:
			"<div class=\"hour-cell\"><div class=\"hour-cell-content\">{hourNumber}</div></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>" +
			"<div class=\"minute-cell\"></div>",
			minutes30:
			"<div class=\"hour-cell\"><div class=\"hour-cell-content\">{hourNumber}</div></div>" +
			"<div class=\"minute-cell\"></div>",
			minutes60:
				"<div class=\"hour-cell\"><div class=\"hour-cell-content\">{hourNumber}</div></div>"
		},
		dayHourTpl: {
			minutes5:
			"<div id=\"{hourId}-00\" class=\"hour-row\"></div>" +
			"<div id=\"{hourId}-05\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-10\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-15\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-20\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-25\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-30\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-35\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-40\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-45\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-50\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-55\" class=\"minute-row\"></div>",
			minutes10:
			"<div id=\"{hourId}-00\" class=\"hour-row\"></div>" +
			"<div id=\"{hourId}-10\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-20\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-30\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-40\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-50\" class=\"minute-row\"></div>",
			minutes15:
			"<div id=\"{hourId}-00\" class=\"hour-row\"></div>" +
			"<div id=\"{hourId}-15\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-30\" class=\"minute-row\"></div>" +
			"<div id=\"{hourId}-45\" class=\"minute-row\"></div>",
			minutes30:
			"<div id=\"{hourId}-00\" class=\"hour-row\"></div>" +
			"<div id=\"{hourId}-30\" class=\"minute-row\"></div>",
			minutes60:
				"<div id=\"{hourId}-00\" class=\"hour-row\"></div>"
		}
	},
	// jscs:enable
	/* jshint quotmark:true */
	itemBindingConfig: {
		itemId: {
			bindTo: "Id"
		},
		title: {
			bindTo: "Title"
		},
		dueDate: {
			bindTo: "DueDate"
		},
		status: {
			bindTo: "Status"
		},
		startDate: {
			bindTo: "StartDate"
		},
		background: {
			bindTo: "Background"
		},
		fontColor: {
			bindTo: "FontColor"
		},
		isBold: {
			bindTo: "IsBold"
		},
		isItalic: {
			bindTo: "IsItalic"
		},
		isUnderline: {
			bindTo: "IsUnderline"
		},
		markerValue: {
			bindTo: "MarkerValue"
		}
	},

	/**
	 * Configuration of binding to the model for the task's pop-up summary window.
	 * @protected
	 * @type {Object}
	 */
	floatingItemBindingConfig: null,

	/**
	 * The string of characters that were typed from the keyboard after selecting the time range in the calendar and before opening
	 * a task pop-up summary (quick add window).
	 * @protected
	 * @type {String}
	 */
	selectionKeyPressSymbols: "",

	ddDayOverride: {},

	ddTimeOverride: {},

	/**
	 * An instance of the Ext.KeyMap class for processing the ESC key
	 * @private
	 * @type {Ext.KeyMap}
	 */
	keyMap: null,

	/**
	 * Timer calling rate
	 * @private
	 * @type {Number}
	 */
	timeMarkerUpdateRate: 12000,

	/**
	 * Timer identifier for moving time marker
	 * @private
	 * @type {Number}
	 */
	timeMarkerUpdateTimer: null,

	/**
	 * Padding direction of the right to left or left to right mode.
	 * @private
	 * @type {String}
	 */
	_paddingDirection: "padding-left",

	/**
	 * Initializes and starts time marker timer
	 * @private
	 */
	initTimeMarkerUpdateTimer: function() {
		var self = this;
		this.timeMarkerUpdateTimer = setInterval(function() {
			self.updateTimeMarker();
		}, this.getTimeMarkerUpdateTimerInterval());
	},

	/**
	 * Destroys time marker timer
	 * @private
	 */
	clearTimeMarkerUpdateTimer: function() {
		if (this.timeMarkerUpdateTimer) {
			clearInterval(this.timeMarkerUpdateTimer);
		}
	},

	/**
	 * Calculates timer calling interval
	 * @returns {Number} Returns timer calling interval
	 */
	getTimeMarkerUpdateTimerInterval: function() {
		return this.timeScale * this.timeMarkerUpdateRate;
	},

	/**
	 * Calculates the height of the time block.
	 * @private
	 * @param {Terrasoft.TimeScale} timeScale Time scale.
	 * @return {Number} Returns the height of the time block.
	 */
	getTimeGridHeight: function(timeScale) {
		var minutesInHour = Terrasoft.DateRate.MINUTES_IN_HOUR;
		return ((((this.dueHour - this.startHour) * minutesInHour) / timeScale) * this.timeItemHeight);
	},

	/**
	 * Removes selection from elements.
	 * @private
	 */
	unSelectItems: function() {
		var collection = this.collection;
		this.selectedItems = [];
		for (var i = 0, length = collection.length; i < length; i++) {
			if (collection[i].getIsSelected()) {
				collection[i].setNotSelected();
			}
		}
	},

	/**
	 * Move the scroll bar to the initial time displayed.
	 * @param {Object} wrapEl Scrolling element.
	 * @protected
	 */
	scrollToStartPosition: function(wrapEl) {
		let scrollHeight = 0;
		const clientCache = Terrasoft.ClientCoreCache;
		const timeScale = this.getTimeScale();
		let ScheduleEditScrollTop;
		if (clientCache) {
			const cacheKey = "ScheduleEditScrollTopOnScale" + timeScale;
			ScheduleEditScrollTop = clientCache.getItem(cacheKey);
		}
		if (ScheduleEditScrollTop >= 0) {
			scrollHeight = ScheduleEditScrollTop;
		} else {
			const displayStartHour = this.displayStartHour;
			const displayStartHourEl = Ext.get(this.id + "-time-" + displayStartHour);
			if (!displayStartHourEl) {
				return;
			}
			const scrollVector = wrapEl.getConstrainVector(displayStartHourEl);
			if (scrollVector) {
				scrollHeight = scrollVector[1];
			}
		}
		this._silentScrollTop(scrollHeight);
	},

	/**
	 * @private
	 * @param {Number} scrollHeight
	 */
	_silentScrollTop: function(scrollHeight) {
		const scrollEl = this.scrollEl;
		const currentScrollTop = scrollEl.getScrollTop();
		if (currentScrollTop === scrollHeight) {
			return;
		}
		this._destroyScrollListeners();
		scrollEl.scroll("bottom", scrollHeight, false);
		Terrasoft.defer(this._initScrollListeners, this);
	},

	/**
	 * Defines and sets the necessary parameters for a block with a scroll bar.
	 * @param {Boolean} autoScroll Determines the need for automatic scrolling to the desired item.
	 * @private
	 */
	prepareScrollArea: function(autoScroll) {
		var scrollAreaBoxEl = this.scrollEl;
		var scrollAreaBox = scrollAreaBoxEl.getBox();
		var scrollAreaBoxTop = scrollAreaBox.top;
		var viewportHeight = Ext.Element.getViewportHeight();
		var calculatedHeight = viewportHeight - scrollAreaBoxTop - this.bottomPadding;
		var titleAreaEl = Ext.get(this.id + "-title-area");
		scrollAreaBoxEl.setHeight(calculatedHeight);
		if (autoScroll === true) {
			this.scrollToStartPosition(scrollAreaBoxEl);
		}
		var scrollbarSize = Ext.getScrollbarSize();
		this.isScrollVisible = scrollAreaBoxEl.isScrollable();
		var overflowX = this.isScrollVisible ? "hidden" : "auto";
		scrollAreaBoxEl.setStyle({
			"overflow-x": overflowX
		});
		if (Ext.isWebKit) {
			var gridAreaEl = Ext.get(this.id + "-grid-area");
			var customScrollWidth = 12;
			var gridPaddingRight = this.isScrollVisible
				? Ext.String.format("{0}px", scrollbarSize.width - customScrollWidth)
				: 0;
			gridAreaEl.setStyle({
				"padding-right": gridPaddingRight
			});
		}
		if (!Terrasoft.getIsRtlMode()) {
			var areaPaddingRight = this.isScrollVisible
				? Ext.String.format("{0}px", scrollbarSize.width)
				: 0;
			titleAreaEl.setStyle({
				"padding-right": areaPaddingRight
			});
		}
	},

	/**
	 * Forms the ID of the day column.
	 * @private
	 * @param {String} componentId of the ID component.
	 * @param {Date} date Column date.
	 * @return {String} Day column ID.
	 */
	getDayColumnId: function(componentId, date) {
		var day = String(date.getDate());
		day = day.length === 1 ? "0" + day : day;
		var month = String(date.getMonth() + 1);
		month = month.length === 1 ? "0" + month : month;
		var year = date.getFullYear();
		return [componentId, "day", day, month, year].join("-");
	},

	/**
	 * Calculates the percentage of width of the daily time interval.
	 * @private
	 * @param {Number} dayCount Number of days.
	 * @return {Number} Returns % of width of daily time interval.
	 */
	getDayItemWidth: function(dayCount) {
		return Number(100 / dayCount);
	},

	/**
	 * Calculates the percentage of width of the daily time interval.
	 * @private
	 * @param {Array} timezone Time zones.
	 * @return {Number} Gets the percentage of width of the daily time interval.
	 */
	getTimezoneAreaWidth: function(timezone) {
		if (!timezone) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.ScheduleEdit.IsNullTimeZoneParameter
			});
		}
		if (timezone.length === 0) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.ScheduleEdit.IsNullTimeZoneParameter
			});
		}
		return Number((timezone.length - 1) * this.timezoneItemWidth + this.mainTimezoneItemWidth);
	},

	/**
	 * Calculates the number of days in the specified time interval.
	 * @private
	 * @param {Date} startDate Date from.
	 * @param {Date} dueDate Date to.
	 * @return {Number} Gets the number of days in the specified time interval.
	 */
	getDayCount: function(startDate, dueDate) {
		var clearDueDate = Ext.Date.clearTime(dueDate);
		var clearStartDate = Ext.Date.clearTime(startDate);
		var daysMerge = clearDueDate - clearStartDate;
		var millisecondsInDay = Terrasoft.DateRate.MILLISECONDS_IN_DAY;
		return ((Math.floor(daysMerge / millisecondsInDay)) + 1);
	},

	/**
	 * Checks if the specified day is a weekend.
	 * @private
	 * @param {Date} date Date.
	 * @return {Boolean} Gets if the specified day is a weekend.
	 */
	getIsDayOff: function(date) {
		var dayNumber = date.getDay();
		// TODO: ##### ########## # ######## ## ######### #########

		return ((dayNumber === 0) || (dayNumber === 6));
	},

	/**
	 * Calculates the number of time intervals relative to the time scale.
	 * @private
	 * @param {Number} minuteCount Number of minutes.
	 * @param {Boolean} isExact
	 * @return {Number} Returns the number of time intervals relative to the time scale.
	 */
	getTimeItemNumber: function(minuteCount, isExact) {
		var timeScale = this.timeScale;
		var timeItemHeight = this.timeItemHeight;
		var minutesInHour = Terrasoft.DateRate.MINUTES_IN_HOUR;
		var result = 0;
		if (isExact) {
			result = minuteCount * timeItemHeight / timeScale;
		} else {
			result = (Math.floor(minuteCount / timeScale)) * timeItemHeight;
		}
		return result - (this.startHour * minutesInHour * timeItemHeight / timeScale);
	},

	/**
	 * Checks whether the specified date is today.
	 * @private
	 * @param {Date} date - The date to check.
	 * @return {Boolean} Returns whether the specified day is today.
	 */
	getIsDayToday: function(date) {
		if (!date) {
			return false;
		}
		var today = new Date(Ext.Date.now());
		return (Ext.Date.isEqual(Ext.Date.clearTime(today), Ext.Date.clearTime(date)));
	},

	/**
	 * Returns the configuration object for the image of the day.
	 * @private
	 * @param {Date} date Date of the current day.
	 * @return {Object} The configuration object for the image of the day.
	 */
	getImageConfig: function(date) {
		var weekDay = date.getDay();
		var imageConfig = this.dayImageConfig;
		var weekImageConfig = this.weekImageConfig;
		if (weekImageConfig[weekDay]) {
			var weekDayImageConfig = weekImageConfig[weekDay];
			var newImageConfig = {
				dayImageClass: imageConfig.dayImageClass,
				selectedDayImageClass: imageConfig.selectedDayImageClass
			};
			if (weekDayImageConfig.dayImageClass) {
				newImageConfig.dayImageClass += " " + weekDayImageConfig.dayImageClass;
			}
			if (weekDayImageConfig.selectedDayImageClass) {
				newImageConfig.selectedDayImageClass += " " + weekDayImageConfig.selectedDayImageClass;
			}
			return newImageConfig;
		} else {
			return imageConfig;
		}
	},

	/**
	 * Generates an image for the title of the day.
	 * @private
	 * @param {Date} date Date of the current day.
	 * @param {Boolean} selected Indicates the state of activity.
	 * @return {String} String with HTML markup image.
	 */
	getTitleImage: function(date, selected) {
		if (!date) {
			return "";
		}
		var displayValue = this.isDayImageVisible ? "block" : "none";
		var imageConfig = this.getImageConfig(date);
		var classes = selected ? imageConfig.dayImageClass + " " +
			imageConfig.selectedDayImageClass : imageConfig.dayImageClass;
		return "<div day-image-date=\"" + date + "\" class=\"" +
			classes + "\" style=\"display:" + displayValue + "\"></div>";
	},

	/**
	 * Generates the title of the day.
	 * @private
	 * @param {Date} date Date.
	 * @return {String} Returns whether the specified day is a weekend.
	 */
	getDayTitle: function(date) {
		if (!date) {
			return "";
		}
		var shortDayNames = Terrasoft.Resources.CultureSettings.shortDayNames;
		var dayName = shortDayNames[date.getDay()];
		return (date.getDate() + ", " + dayName);
	},

	/**
	 * Returns the coordinates of the specified date.
	 * @private
	 * @param {Date} date The date.
	 * @param {Boolean} isExact
	 * @return {Number} Returns the calendar start date.
	 */
	getTimePosition: function(date, isExact) {
		var minutes = Terrasoft.getMinutesFromMidnight(date);
		return this.getTimeItemNumber(minutes, isExact);
	},

	/**
	 * Gets a list of calendar days.
	 * @private
	 * @return {Array} List of calendar days.
	 */
	getSchedulerDayList: function() {
		var result = [];
		var startDate = new Date(this.startDate);
		var dueDate = new Date(this.dueDate);
		while (startDate <= dueDate) {
			// TODO: ############# ########### ########## ####

			result.push(startDate);
			startDate = Terrasoft.addDays(startDate, 1);
		}
		return result;
	},

	/**
	 * Renders the elements of the schedule.
	 * @private
	 */
	renderSchedulerItems: function() {
		var schedulerDayList = this.getSchedulerDayList();
		this.itemPositionProcess(schedulerDayList);
		this.multiDayItemPositionProcess();
		this.renderScheduleFloatingItems();
	},

	/**
	 * Return sorted scheduler items collection.
	 * @return {Array}
	 */
	getSortedCollection: function() {
		var sortItemList = _.clone(this.collection);
		sortItemList.sort(this.sortScheduleItemListByStartDate);
		return sortItemList;
	},

	/**
	 * Performs the positioning of intersecting elements in the day.
	 * @private
	 * @param {Array} dayArray Array of days for distribution.
	 */
	itemPositionProcess: function(dayArray) {
		// Get the sorted array of elements

		var sortedCollection = this.sortScheduleItemList(this.collection);
		if (sortedCollection.length === 0) {
			return;
		}
		var minutesInHour = Terrasoft.DateRate.MINUTES_IN_HOUR;
		for (var d = 0; d < dayArray.length; d++) {
			var dayItems = this.getDayItemArray(dayArray[d], sortedCollection);
			var timeScale = this.timeScale;
			var timeItemCount = ((this.dueHour - this.startHour) * minutesInHour) / timeScale;
			// nitialize the element distribution matrix in a day

			var dayTable = [];
			var i;
			var dayItemsLength = dayItems.length;
			for (i = 0; i < timeItemCount; i++) {
				dayTable[i] = [];
			}
			// Filling the matrix of distribution of elements in a day

			var itemHeight = [];
			for (i = 0; i < dayItemsLength; i++) {
				var item = dayItems[i];
				var itemStartDate = item.getStartDate();
				var minutes = Terrasoft.getMinutesFromMidnight(itemStartDate);
				var y = item.getTimeItemNumber(minutes, false);
				itemHeight[i] = this.getTimeItemCount(item.startDate, item.dueDate);
				var bottomIndex = itemHeight[i] + y;
				var currentIndex = dayTable[y].length;
				item.setWidth(100);
				item.setLeft(0);
				for (var j = 0; j <= currentIndex; j++) {
					if (dayTable[y][j] == null) {
						for (var k = y; k < bottomIndex; k++) {
							dayTable[k][j] = i;
						}
						break;
					}
				}
			}
			// Define and display the group of intersecting elements
			var groupMaxCrossIndex = 0;
			var groupStart = 0;
			for (i = 0; i < timeItemCount; i++) {
				if (dayTable[i].length === 0) {
					groupStart = i + 1;
					continue;
				}
				if (groupMaxCrossIndex < dayTable[i].length) {
					groupMaxCrossIndex = dayTable[i].length;
					if (i === (timeItemCount - 2)) {
						if (groupMaxCrossIndex < dayTable[timeItemCount - 1].length) {
							groupMaxCrossIndex = dayTable[timeItemCount - 1].length;
						}
					}
				}
				if (!this.getIsArraysCrossed(dayTable[i], dayTable[i + 1]) || (i === (timeItemCount - 1))) {
					this.itemPositionRenderProcess(dayItems, dayTable, itemHeight, groupStart, i, groupMaxCrossIndex);
					groupStart = i + 1;
					groupMaxCrossIndex = 0;
				}
			}
		}
	},

	/**
	 * Draws a group of intersecting elements.
	 * @private
	 * @param {Array} itemArray Array of elements.
	 * @param {Array} dayItemArray Element distribution matrix in a day.
	 * @param {Number} itemHeight Height of the element.
	 * @param {Number} groupStart The initial vertical position of groups of intersecting elements.
	 * @param {Number} groupEnd The final vertical position of the group of intersecting elements.
	 * @param {Number} groupMaxCrossIndex Number of the maximum intersection of the group.
	 */
	itemPositionRenderProcess: function(itemArray, dayItemArray, itemHeight, groupStart, groupEnd, groupMaxCrossIndex) {
		var renderedItem = [];
		for (var i = groupStart; i <= groupEnd; i++) {
			var rowItems = dayItemArray[i];
			for (var j = 0; j < rowItems.length; j++) {
				var itemIndex = rowItems[j];
				if (itemIndex != null) {
					var item = itemArray[itemIndex];
					if (renderedItem[itemIndex] == null) {
						renderedItem[itemIndex] = item;
					}
					var positionIndex = 100 / groupMaxCrossIndex;
					var width = positionIndex;
					if (j < (rowItems.length - 1)) {
						var itemAddWidthIndex = this.getItemAdditionalWidthIndex(dayItemArray, i, itemHeight[itemIndex],
							j + 1);
						width = width * itemAddWidthIndex;
					} else {
						width = width * (groupMaxCrossIndex - j);
					}
					var itemWidth = item.getWidth();
					item.setWidth(itemWidth > width ? width : itemWidth);
					item.setLeft(positionIndex * j);
				}
			}
		}
		for (i = 0; i < renderedItem.length; i++) {
			if (renderedItem[i] != null) {
				renderedItem[i].show();
			}
		}
	},

	/**
	 * Returns the maximum allowed index of increasing the width of the element to the right.
	 * @private
	 * @param {Array} dayItemArray Element distribution matrix in the bottom.
	 * @param {Number} startY The initial vertical position of the element.
	 * @param {Number} height Height of the element.
	 * @param {Number} startX The first neighbor position is on the right.
	 * @return {Number} Returns the maximum allowed index of increasing the width of the element to the right.
	 */
	getItemAdditionalWidthIndex: function(dayItemArray, startY, height, startX) {
		var itemAddWidthIndex = 1;
		for (var j = startX; j < dayItemArray[startY].length; j++) {
			var elementHeight = ((startY + height) > dayItemArray.length) ? dayItemArray.length : (startY + height);
			for (var i = startY; i < elementHeight; i++) {
				if (dayItemArray[i][j] != null) {
					return itemAddWidthIndex;
				}
			}
			itemAddWidthIndex += 1;
		}
		return itemAddWidthIndex;
	},

	/**
	 * Checks for the presence of intersections of elements of 2 arrays.
	 * @private
	 * @param {Array} arrayA Array A.
	 * @param {Array} arrayB Array B.
	 * @return {Boolean} Returns the result of checking for intersections of 2 arrays.
	 */
	getIsArraysCrossed: function(arrayA, arrayB) {
		if (arrayB && arrayA) {
			var index = 0;
			for (var i = 0; i < arrayA.length; i++) {
				index = arrayB.indexOf(arrayA[i]);
				if (index >= 0) {
					return true;
				}
			}
		}
		return false;
	},

	/**
	 * Returns an array of items of the specified day.
	 * @private
	 * @param {Date} day The day.
	 * @param {Array} array List of calendar items.
	 * @return {Array} An array of items of the specified day.
	 */
	getDayItemArray: function(day, array) {
		var result = [];
		for (var i = 0; i < array.length; i++) {
			var itemStartDate = array[i].getStartDate();
			if (Terrasoft.areDatesEqual(day, itemStartDate) && !array[i].isMultiDayItem()) {
				result.push(array[i]);
			}
		}
		return result;
	},

	/**
	 * Checks the equality of days.
	 * @private
	 * @return {Boolean} Returns the result of checking the equality of days.
	 */
	getIsTheSameDay: function(dateA, dateB) {
		return (dateA.getDate() === dateB.getDate()) &&
			(dateA.getMonth() === dateB.getMonth()) &&
			(dateA.getFullYear() === dateB.getFullYear());
	},

	/**
	 * Returns the sorted list of calendar items.
	 * @private
	 * @param {Array} schedulerItemList List of calendar items.
	 * @return {Array} Sorted list of calendar items.
	 */
	sortScheduleItemList: function(schedulerItemList) {
		var sortItemList = [];
		Terrasoft.each(schedulerItemList, function(item) {
			if (!item.isMultiDayItem()) {
				sortItemList.push(item);
			}
		});
		sortItemList.sort(this.sortScheduleItemListByStartDate);
		return sortItemList;
	},

	/**
	 * Returns the result of comparing 2 calendar items by date.
	 * @private
	 * @param {Object} itemA Item #.
	 * @param {Object} itemB Item B.
	 * @return {Array} The result of comparing 2 calendar items by date.
	 */
	sortScheduleItemListByStartDate: function(itemA, itemB) {
		var result = 0;
		var itemAStartDate = itemA.startDate;
		var itemADuration = itemA.dueDate - itemAStartDate;
		var itemBStartDate = itemB.startDate;
		var itemBDuration = itemB.dueDate - itemBStartDate;
		if ((itemAStartDate === itemBStartDate) && (itemADuration === itemBDuration)) {
			result = 0;
		} else if (itemAStartDate > itemBStartDate) {
			result = 1;
		} else if (itemAStartDate < itemBStartDate) {
			result = -1;
		} else if (itemADuration > itemBDuration) {
			result = -1;
		} else if (itemADuration < itemBDuration) {
			result = 1;
		}
		return result;
	},

	/**
	 * Renders all controls in the collection #scheduleFloatingItems
	 * @private
	 */
	renderScheduleFloatingItems: function() {
		this.scheduleFloatingItems.each(function(scheduleFloatingItem) {
			this.renderScheduleFloatingItem(scheduleFloatingItem);
		}, this);
	},

	/**
	 * Renders one model of the quick task adding window, which is passed in the arguments.
	 * @private
	 * @param {Terrasoft.BaseViewModel} scheduleFloatingItem Model  for quick task adding window (pop-up summary).
	 */
	renderScheduleFloatingItem: function(scheduleFloatingItem) {
		if (!this.rendered || !this.visible) {
			return;
		}
		var wrapEl = this.getWrapEl();
		scheduleFloatingItem.render(wrapEl);
	},

	/**
	 * Processes adding a model to #scheduleFloatingItems
	 * @param {Terrasoft.BaseViewModel} scheduleFloatingItem
	 */
	onScheduleFloatingItemAdd: function(scheduleFloatingItem) {
		this.renderScheduleFloatingItem(scheduleFloatingItem);
	},

	/**
	 * Processes the loading of controls into the collection #scheduleFloatingItems
	 */
	onScheduleFloatingItemsDataLoaded: function() {
		this.renderScheduleFloatingItems();
	},

	/**
	 * Processes the removal of the quick add task window model.
	 * @param {Terrasoft.BaseViewModel} scheduleFloatingItem
	 */
	onScheduleFloatingItemRemove: function(scheduleFloatingItem) {
		this.destroyKeyMap();
		scheduleFloatingItem.destroy();
	},

	/**
	 * Processes clearing the collection of controls for task pop-up summary windows #scheduleFloatingItems
	 */
	onScheduleFloatingItemsClear: function() {
		var scheduleFloatingItems = this.scheduleFloatingItems;
		scheduleFloatingItems.each(function(scheduleFloatingItem) {
			scheduleFloatingItem.destroy();
		}, this);
	},

	/**
	 * Initializing the calendar component.
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		var scheduleFloatingItems = this.scheduleFloatingItems = Ext.create("Terrasoft.Collection");
		scheduleFloatingItems.on("add", this.onScheduleFloatingItemAdd, this);
		scheduleFloatingItems.on("dataLoaded", this.onScheduleFloatingItemsDataLoaded, this);
		scheduleFloatingItems.on("remove", this.onScheduleFloatingItemRemove, this);
		scheduleFloatingItems.on("clear", this.onScheduleFloatingItemsClear, this);
		this.selection = {};
		this.showDayImages = false;
		this.selectors = {
			wrapEl: "",
			daysEl: ".day-column-area",
			dayTimesEl: ".day-row-area",
			scrollEl: "",
			multiDayItemArea: ".multi-day-item-area",
			dayGridAreaEl: ".day-grid-area",
			timeColumnArea: ".time-column-area",
			timeMarkerEl: ""
		};
		this.addEvents(
			/**
			 * @event change
			 * @param scheduleItem {object} an instance of a calendar item whose parameter has changed.
			 * Signalizes that the data must be updated.
			 */
			"change",
			/**
			 * @event
			 * @param {Object} scheduleItem an instance of the calendar element that was clicked twice.
			 * Double click event by schedule item.
			 */
			"scheduleItemDoubleClick",
			/**
			 * @event
			 * @param {Object} scheduleItem Schedule item instance.
			 * Schedule item click event.
			 */
			"scheduleItemClick",
			/**
			 * @event
			 * @param {Object} scheduleItem an instance of the calendar item that was clicked on the title.
			 * A click event on the title of the calendar item.
			 */
			"scheduleItemTitleClick",

			/**
			 * @event
			 * @param {Object} scheduleItem Schedule item instance.
			 * Schedule item title mouse over event.
			 */
			"scheduleItemTitleMouseOver",

			/**
			 * Event of changing the selected area of the control.
			 * @event
			 * @param {Terrasoft.ScheduleEdit} sender An instance of the Terrasoft.ScheduleEdit class that initiated
			 * the select event.
			 * @param {Object|Null} selection New selection value.
			 * @param {Date} selection.startDate Time of the beginning of the selected area.
			 * @param {Date} selection.dueDate Time to complete the selection.
			 */
			"selectionChanged",
			/**
			 * Keyboard start event after the selection of the time range in the schedule.
			 * @event
			 * @param {Object} scheduleItem an instance of the schedule item that was clicked twice.
			 * @param {Ext.EventObject} event object.
			 */
			"selectionKeyPress",
			/**
			 * Ready event for a quick add task for filling.
			 * @event
			 * @param {Object} instance of Terrasoft.ScheduleFloatingItem
			 * @param {String} identifier of the DOM element of the markup for filling.
			 */
			"floatingItemReady",
			/**
			 * Update event of the #selectionKeyPressSymbols parameter. Used in the binding mechanism.
			 * @event
			 */
			"selectionKeyPressSymbolsUpdate",
			/**
			 * Update event of the #selectedItems parameter. Occurs when the current selected record is changed or when
			 * selection is removed. Used in the binding mechanism.
			 * @event
			 */
			"changeSelectedItems",
			/**
			 * Update event of the #selectedDays parameter. Appears when a day status is changed.
			 * @event
			 */
			"selectedDaysChanged",
			/**
			 * Image click event in the day title
			 * @event
			 */
			"dayImageClick"
		);
		this.initTimeMarkerUpdateTimer();
		this._initRtlProperties();
	},

	/**
	 * Initialize properties of the right to left mode.
	 * @private
	 */
	_initRtlProperties: function() {
		if (!Terrasoft.getIsRtlMode()) {
			return;
		}
		this._paddingDirection = "padding-right";
		this.schedulerConfig.styles.dayTitleAreaStyle = {"padding-right": ""};
		this.schedulerConfig.styles.dayColumnAreaStyle = {"padding-right": ""};
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @protected
	 */
	initDomEvents: function() {
		var wrapEl = this.getWrapEl();
		wrapEl.on("click", this.unSelectItems, this);
		wrapEl.on("mousedown", this.onMouseDown, this);
		Ext.EventManager.on(window, "resize", this.prepareScrollArea, this);
		this._initScrollListeners();
	},

	/**
	 * @private
	 */
	_initScrollListeners: function() {
		const scrollEl = this.scrollEl;
		if (scrollEl) {
			if (!Ext.isIE) {
				scrollEl.on("scroll", this.onScroll, this);
			}
			scrollEl.on("scroll", this.saveScrollPosition, this);
		}
	},

	/**
	 * Saves the scroll position of the schedule area #scrollEl
	 * @protected
	 */
	saveScrollPosition: function() {
		var clientCache = Terrasoft.ClientCoreCache;
		var scrollEl = this.scrollEl;
		if (!clientCache || !scrollEl) {
			return;
		}
		var timeScale = this.getTimeScale();
		var cacheKey = "ScheduleEditScrollTopOnScale" + timeScale;
		var scrollTop = scrollEl.getScrollTop();
		clientCache.setItem(cacheKey, scrollTop);
	},

	/**
	 * The keypress event handler on the selected time range in the calendar
	 * @protected
	 * @param {Ext.EventObject} event Event object
	 * @param {Event} event.browserEvent Browser event.
	 * @param {String} [key] Pressed key button.
	 */
	onSelectionKeyPress: function(event, key) {
		key = Ext.isNumber(key) ? key : event.getKey();
		const canExecute = this.canExecute({
			method: this.onSelectionKeyPress,
			args: [event, key]
		});
		if (canExecute === false) {
			Ext.EventManager.stopEvent(event.browserEvent);
			return;
		}
		if (event.isSpecialKey() && key !== Ext.EventObject.ENTER) {
			return;
		}
		this.selectionKeyPressSymbols += String.fromCharCode(key);
		if (this.selectionKeyPressSymbols.length === 1) {
			this.fireEvent("selectionKeyPress", this, event);
		}
		this.fireEvent("selectionKeyPressSymbolsUpdate");
	},

	/**
	 * The event handler for clicking on the mouse button. If the left mouse button is pressed, the area is selected. Previous
	 * selection disappears
	 * @param {Ext.EventObject} e Mouse click event.
	 * @private
	 */
	onMouseDown: function(e) {
		var wrapEl = this.getWrapEl();
		var targetEl = Ext.get(e.target);
		if (targetEl.findParent(".schedule-floating-item", wrapEl, true)) {
			return;
		}
		if (targetEl.findParent(".day-title", wrapEl, true) || targetEl.findParent(".holiday-title", wrapEl, true) ||
			targetEl.findParent(".today-title", wrapEl, true)) {
			var dateString = targetEl.getAttribute("day-image-date");
			if (dateString !== null) {
				var dayDate = new Date(dateString);
				this.fireEvent("dayImageClick", dayDate);
			}
			return;
		}
		var mouseButton = Terrasoft.getMouseButton(e);
		if (mouseButton !== Terrasoft.MouseButton.LEFT) {
			var innerSelection = this.innerSelection;
			if (innerSelection) {
				wrapEl.un("mousemove", this.onMouseMove, this);
				wrapEl.un("mouseup", this.onMouseUp, this);
				this.innerSelection = null;
			}
			return;
		}
		var point = e.getPoint();
		if (!this.checkSelectionRegion(point)) {
			return;
		}
		wrapEl.on("mousemove", this.onMouseMove, this);
		wrapEl.on("mouseup", this.onMouseUp, this);
		var selection = this.innerSelection = {};
		var startDate = this.getDateByPoint(point);
		selection.startDate = startDate;
		var timeScale = this.getTimeScale();
		selection.dueDate = Ext.Date.add(startDate, Ext.Date.MINUTE, timeScale);
		if (this.floatingItemsCollection) {
			this.floatingItemsCollection.clear();
		}
		this.clearSelection();
		this.selectionKeyPressSymbols = "";
		this.renderSelection(selection);
	},

	/**
	 * Clears the selected time range in the calendar
	 * @protected
	 */
	clearSelection: function() {
		var selectionEl = this.selectionEl;
		if (selectionEl) {
			selectionEl.clearListeners();
			selectionEl.destroy();
			this.selectionEl = null;
		}
	},

	/**
	 * Checks the possibility of selection for a transmitted point.
	 * @param {Ext.util.Point} point The point for which to check the possibility of selection.
	 * @return {Boolean}
	 * @private
	 */
	checkSelectionRegion: function(point) {
		var gridAreaRegion = this.dayGridAreaEl.getRegion();
		if (!gridAreaRegion.contains(point)) {
			return false;
		}
		var timeColumnRegion = this.timeColumnArea.getRegion();
		return !timeColumnRegion.contains(point);
	},

	/**
	 * The handler of the mouse button release. Finishes selection of the area.
	 * @private
	 */
	onMouseUp: function() {
		this.setSelection(this.innerSelection);
		this.innerSelection = null;
		var wrapEl = this.getWrapEl();
		wrapEl.un("mousemove", this.onMouseMove, this);
		wrapEl.un("mouseup", this.onMouseUp, this);
		var selectionEl = this.selectionEl;
		selectionEl.focus();
		selectionEl.on("keypress", this.onSelectionKeyPress, this);
	},

	/**
	 * The handler for changing the position of the mouse cursor. Visually displays the selected area.
	 * @param {Ext.EventObject} e Mouse cursor movement event.
	 * @private
	 */
	onMouseMove: function(e) {
		var point = e.getPoint();
		if (!this.checkSelectionRegion(point)) {
			return;
		}
		var innerSelection = this.innerSelection;
		var dueDate = this.getDateByPoint(point);
		var timeScale = this.getTimeScale();
		innerSelection.dueDate = Terrasoft.addMinutes(dueDate, timeScale);
		this.renderSelection(innerSelection);
	},

	/**
	 * Returns the date corresponding to the cell of the calendar that contains the transmitted point.
	 * @param {Ext.util.Point} point The point for which to find date.
	 * @return {Date}
	 * @private
	 */
	getDateByPoint: function(point) {
		var timeEl = this.getTimeElByPoint(point);
		var dayEl = this.getDayElByPoint(point);
		var timeRe = new RegExp("-time-(\\d{1,2})-(\\d{1,2})$");
		var dayRe = new RegExp("-day-(\\d{2})-(\\d{2})-(\\d{4})$");
		var time = timeRe.exec(timeEl.id);
		var date = dayRe.exec(dayEl.id);
		var result = {
			hour: time[1],
			minute: time[2],
			day: date[1],
			month: date[2],
			year: date[3]
		};
		result.month = result.month - 1;
		return new Date(result.year, result.month, result.day, result.hour, result.minute);
	},

	/**
	 * Returns the column element that contains the passed point.
	 * @param {Ext.util.Point} point The point for which you want to find the column.
	 * @return {Ext.dom.Element}
	 * @private
	 */
	getDayElByPoint: function(point) {
		return this.getChildElementByPoint(this.daysEl, point);
	},

	/**
	 * Returns the element of the string that contains the passed point.
	 * @param {Ext.util.Point} point The point for which you want to find the string.
	 * @return {Ext.dom.Element}
	 * @private
	 */
	getTimeElByPoint: function(point) {
		return this.getChildElementByPoint(this.dayTimesEl, point);
	},

	/**
	 * For the passed container, returns the first child that contains the transmitted point.
	 * @param {Ext.dom.Element} el Item container.
	 * @param {Ext.util.Point} point Point for which to find an element.
	 * @return {Ext.dom.Element}
	 * @private
	 */
	getChildElementByPoint: function(el, point) {
		var childEls = el.select(">*");
		var resultEl = null;
		childEls.each(function(childEl) {
			var elRegion = childEl.getRegion();
			if (elRegion.contains(point)) {
				resultEl = Ext.get(childEl);
				return false;
			}
			return true;
		}, this);
		return resultEl;
	},

	/**
	 * Performs rendering of the passed selection area.
	 * @param {Object} selection For the selection object, see {@link #selection}
	 * @private
	 */
	renderSelection: function(selection) {
		if (!this.rendered) {
			return;
		}
		var normalizedSelection = this.normalizeSelection(selection);
		if (!normalizedSelection) {
			return;
		}
		var cultureSettings = Terrasoft.Resources.CultureSettings;
		var startDate = normalizedSelection.startDate;
		var dueDate = normalizedSelection.dueDate;
		if (Terrasoft.isMidnight(dueDate)) {
			dueDate = Terrasoft.addMinutes(dueDate, -1);
		}
		var schedulerId = this.id;
		var startDateColumnId = this.getDayColumnId(schedulerId, startDate);
		var dueDateColumnId = this.getDayColumnId(schedulerId, dueDate);
		var startDateColumn = Ext.get(startDateColumnId);
		var selectionEl = this.selectionEl;
		if (startDateColumnId === dueDateColumnId) {
			var timeItemHeight = this.timeItemHeight;
			var top = this.getTimePosition(startDate) + 0.1;
			var height = this.getTimeItemCount(startDate, dueDate) * timeItemHeight - 0.1;
			var title = Ext.Date.format(startDate, cultureSettings.timeFormat) +
				"-" + Ext.Date.format(dueDate, cultureSettings.timeFormat);
			if (!selectionEl) {
				selectionEl = this.selectionEl = startDateColumn.createChild({
					tag: "div",
					id: this.id + "-selection",
					cls: "schedule-edit-selection ts-box-sizing",
					style: {
						top: top + "em",
						height: height + "em"
					},
					tabindex: 0,
					children: [{
						tag: "label",
						html: title
					}]
				});
			} else {
				selectionEl.setStyle({
					top: top + "em",
					height: height + "em"
				});
				var label = selectionEl.child("label");
				label.setHTML(title);
			}
		}
	},

	/**
	 * Performs normalization of the transferred selection object. Checks that the start date must be less than the
	 * end date.
	 * @param {Object} selection For the selection object, see {@link #selection}
	 * @return {Object} selection The normalized object of the selected area, see {@link #selection}
	 * @private
	 */
	normalizeSelection: function(selection) {
		if (!selection) {
			return null;
		}
		var startDate = Ext.Date.clone(selection.startDate);
		var dueDate = Ext.Date.clone(selection.dueDate);
		if (startDate >= dueDate) {
			startDate = Ext.Date.clone(dueDate);
			var timeScale = this.getTimeScale();
			startDate = Terrasoft.addMinutes(startDate, -1 * timeScale);
			dueDate = Ext.Date.clone(selection.startDate);
			dueDate = Terrasoft.addMinutes(dueDate, timeScale);
		}
		return {
			startDate: startDate,
			dueDate: dueDate
		};
	},

	/**
	 * Returns the object of selected region. See {@link #selection}
	 * @return {Object}
	 */
	getSelection: function() {
		return this.normalizeSelection(this.selection);
	},

	/**
	 * Sets the selected region object.
	 * @param {Object} selection Object of the selected area. See {@link #selection}
	 */
	setSelection: function(selection) {
		// TODO: ######### ####### ## ########## ######### ########## ####.

		selection = Terrasoft.deepClone(selection);
		if (selection && selection.dueDate) {
			if (Terrasoft.isMidnight(selection.dueDate)) {
				selection.dueDate = Terrasoft.addMinutes(selection.dueDate, -1);
			}
			selection.dueDate.setDate(selection.startDate.getDate());
		}
		var normalizedSelection = this.normalizeSelection(selection);
		var cloneSelection = Terrasoft.deepClone(normalizedSelection);
		if (Ext.Object.equals(this.selection, cloneSelection)) {
			return;
		}
		this.selection = cloneSelection;
		this.fireEvent("selectionChanged", this, Terrasoft.deepClone(cloneSelection));
		this.renderSelection(this.selection);
	},

	/**
	 * Sets the display state of the days images.
	 * @param {Boolean} visible The display state of the days images.
	 */
	setDayImageVisibility: function(visible) {
		this.isDayImageVisible = visible;
		var dayImages = Ext.select("div[class*=\"schedule-edit-day-image\"]");
		dayImages.setStyle({
			"display": visible ? "block" : "none"
		});
	},

	/**
	 * Calculates time marker element top from currentTime
	 * @private
	 */
	updateTimeMarker: function() {
		var currentTime = new Date(Ext.Date.now());
		if (!this.timeMarkerEl) {
			return;
		}
		var currentTimeHours = currentTime.getHours();
		if (currentTimeHours >= this.startHour && currentTimeHours < this.dueHour) {
			var markerTop = this.getTimePosition(currentTime, true);
			this.timeMarkerEl.setTop(markerTop + "em");
		}
	},

	/**
	 * Sets active days.
	 * @param {Array} selectedDays The date array to be made active.
	 */
	setSelectedDays: function(selectedDays) {
		selectedDays = selectedDays || [];
		if (!Ext.Array.equals(this.selectedDays, selectedDays)) {
			var selectedDayImageClass = this.dayImageConfig.selectedDayImageClass;
			Ext.select("div[class*=\"schedule-edit-selected-day-image\"]").removeCls(selectedDayImageClass);
			for (var i = 0, ln = selectedDays.length; i < ln; i++) {
				this.selectDay(selectedDays[i], true);
			}
			this.selectedDays = selectedDays;
			this.fireEvent("selectedDaysChanged");
		}
	},

	/**
	 * Install date images.
	 * @private
	 * @param {Date} day Date value.
	 * @param {Boolean} selected Select date.
	 */
	selectDay: function(day, selected) {
		var activeClass = this.dayImageConfig.selectedDayImageClass;
		var element = this.getDayImageElement(day);
		if (element) {
			if (selected) {
				Ext.get(element).addCls(activeClass);
			} else {
				Ext.get(element).removeCls(activeClass);
			}
		}
	},

	/**
	 * Gets the image element for the day.
	 * @private
	 * @param {Date} day Date value.
	 * @return {?Object} Returns the DOM object of the day image or null if not found.
	 */
	getDayImageElement: function(day) {
		var images = Ext.select("div[day-image-date=\"" + day + "\"]");
		if (images.elements.length) {
			return images.elements[0];
		}
		return null;
	},

	/**
	 * Returns the number of time intervals between transmitted dates.
	 * @param {Date} startDate Interval start.
	 * @param {Date} dueDate Interval end.
	 * @return {Number}
	 */
	getTimeItemCount: function(startDate, dueDate) {
		var millisecondsInMinute = Terrasoft.DateRate.MILLISECONDS_IN_MINUTE;
		var minutesInHour = Terrasoft.DateRate.MINUTES_IN_HOUR;
		var timeScale = this.getTimeScale();
		var minutesDiff = Math.floor((dueDate - startDate) / millisecondsInMinute);
		var startDateMinutes = (startDate.getMinutes() === 0) ? minutesInHour : startDate.getMinutes();
		var dueDateMinutes = (dueDate.getMinutes()) === 0 ? minutesInHour : dueDate.getMinutes();
		var minutesItem = (((dueDateMinutes % timeScale) > 0) || ((startDateMinutes % timeScale) > 0)) ? 1 : 0;
		var timeItemCount = (Math.floor(minutesDiff / timeScale) + minutesItem);
		return timeItemCount === 0 ? 1 : timeItemCount;
	},

	/**
	 * Unsubscribes from events of the #scheduleFloatingItems collection, clears it and deletes.
	 * @protected
	 */
	destroyScheduleFloatingItems: function() {
		var scheduleFloatingItems = this.scheduleFloatingItems;
		scheduleFloatingItems.clear();
		scheduleFloatingItems.un("dataLoaded", this.onScheduleFloatingItemsDataLoaded, this);
		scheduleFloatingItems.un("add", this.onScheduleFloatingItemAdd, this);
		scheduleFloatingItems.un("remove", this.onScheduleFloatingItemRemove, this);
		scheduleFloatingItems.un("clear", this.onScheduleFloatingItemsClear, this);
		scheduleFloatingItems.destroy();
		scheduleFloatingItems = null;
	},

	/**
	 * Deletes the subscription to keystroke events in the control input field.
	 * @protected
	 * @override
	 */
	onDestroy: function() {
		this.clear();
		this.destroyScheduleFloatingItems();
		const wrapEl = this.getWrapEl();
		if (wrapEl) {
			wrapEl.un("click", this.unSelectItems, this);
		}
		Ext.EventManager.un(window, "resize", this.prepareScrollArea, this);
		this._destroyScrollListeners();
		this.clearTimeMarkerUpdateTimer();
		this.callParent(arguments);
	},

	/**
	 * @private
	 */
	_destroyScrollListeners: function() {
		const scrollEl = this.scrollEl;
		if (scrollEl) {
			Ext.dd.ScrollManager.unregister(scrollEl);
			if (!Ext.isIE) {
				scrollEl.un("scroll", this.onScroll, this);
			}
			scrollEl.un("scroll", this.saveScrollPosition, this);
		}
	},

	/**
	 * Automatic scrolling event handler when moving / resizing a calendar item.
	 * @protected
	 */
	onScroll: function() {
		var itemDDEl = this.itemDDEl;
		if (itemDDEl) {
			var activeDDItem = itemDDEl.item;
			var action = itemDDEl.action;
			if (activeDDItem) {
				var item = activeDDItem.config.item;
				switch (action) {
					case Terrasoft.DDAction.MOVE:
						item.initScheduleItemDDTicksOnMove(activeDDItem);
						break;
					case Terrasoft.DDAction.RESIZE_TOP:
						item.initScheduleItemDDTicksOnResizeTop(activeDDItem);
						break;
					case Terrasoft.DDAction.RESIZE_BOTTOM:
						item.initScheduleItemDDTicksOnResizeBottom(activeDDItem);
						break;
					case Terrasoft.DDAction.RESIZE_LEFT:
					case Terrasoft.DDAction.RESIZE_RIGHT:
						item.initScheduleItemDDTicksOnHorizontalResize(activeDDItem, action);
						break;
				}
			}
		}
	},

	initDd: function() {
		var scrollEl = this.scrollEl;
		//var wrapEl = this.wrapEl;
		if (scrollEl) {
			Ext.dd.ScrollManager.register(scrollEl);
		}
		Ext.dd.DragDropManager.notifyOccluded = true;
		this.clearTimes();
		var daysEl = this.daysEl;
		if (!daysEl) {
			return;
		}
		var dayTimesEl = this.dayTimesEl;
		var days = Ext.select("[class*='column']", false, daysEl.dom);
		days.each(function(element) {
			var ddDay = element.initDDTarget("day", {}, this.ddDayOverride);
			ddDay.addToGroup("day-item");
			ddDay.addToGroup("multi-day-item");
		}, this);
		var times = Ext.select("[class*='row']", false, dayTimesEl.dom);
		times.each(function(element) {
			var ddTime = element.initDDTarget("time", {}, this.ddDayOverride);
			ddTime.setPadding(5, 5, 5, 5);
			ddTime.addToGroup("time-item");
			ddTime.addToGroup("multi-day-item");
		}, this);
		var multiDayItemArea = Ext.select(".multi-day-item-area", false);
		var multiDayItemEl = multiDayItemArea.first();
		var ddMultiDay = multiDayItemEl.initDDTarget("multiDay", {}, this.ddDayOverride);
		ddMultiDay.addToGroup("multi-day-item");
	},

	clearTimes: function() {
		var dd = Ext.dd;
		var dDManager = dd.DragDropManager;
		var ids = dDManager.ids;
		if (ids.day) {
			ids.day = null;
		}
		if (ids["day-item"]) {
			ids["day-item"] = null;
		}
		if (ids.time) {
			ids.time = null;
		}
		if (ids["time-item"]) {
			ids["time-item"] = null;
		}
		if (ids["multi-day-item"]) {
			ids["multi-day-item"] = null;
		}
		if (ids["item-resize-left"]) {
			ids["item-resize-left"] = null;
		}
		if (ids["item-resize-right"]) {
			ids["item-resize-right"] = null;
		}
		if (ids["item-resize-bottom"]) {
			ids["item-resize-bottom"] = null;
		}
		if (ids["item-resize-top"]) {
			ids["item-resize-top"] = null;
		}
	},

	/**
	 * Updates selectors based on the data generated to create the layout.
	 * @protected
	 */
	updateSelectors: function() {
		this.updateSelector("wrap", "scheduler");
		this.updateSelector("scroll", "scroll-area");
		this.updateSelector("timeMarker", "time-marker");
	},

	/**
	 * Update a selector.
	 * @param {String} selectorName  selector name.
	 * @param {String} suffix  selector suffix.
	 * @protected
	 */
	updateSelector: function(selectorName, suffix) {
		if (!this.selectors) {
			this.selectors = {};
		}
		this.selectors[selectorName + "El"] = "#" + this.id + "-" + suffix;
	},

	/**
	 * Calculates the data for the template.
	 * @protected
	 * @override
	 * throws {Terrasoft.ItemNotFoundException}
	 * If a suitable configuration is not found among the configurations, then
	 * an error will be generated that will be processed in the XTemplate, so the only way to detect this
	 * error is to view the logs.
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var selectedDays = this.selectedDays || [];
		var schedulerConfig = this.schedulerConfig;
		var classes = schedulerConfig.classes;
		var styles = schedulerConfig.styles;
		var timeScale = this.timeScale;
		styles.timeGridStyle.height = this.getTimeGridHeight(timeScale) + "em";
		var timezone = this.timezone;
		var timezoneAreaWidth = this.getTimezoneAreaWidth(timezone);
		styles.timezoneTitleAreaStyle.width = Number(timezoneAreaWidth) + "em";
		styles.dayTitleAreaStyle[this._paddingDirection] = timezoneAreaWidth + "em";
		styles.dayColumnAreaStyle[this._paddingDirection] = timezoneAreaWidth + "em";
		var schedulerDayList = this.getSchedulerDayList();
		var dayCount = schedulerDayList.length;
		var datItemWidth = this.getDayItemWidth(dayCount);
		styles.dayItemWidthStyle.width = datItemWidth + "%";
		tplData.schedulerAreaClass = classes.schedulerAreaClass;
		tplData.titleAreaClass = classes.titleAreaClass;
		tplData.multiDayItemAreaClass = classes.multiDayItemAreaClass;
		tplData.gridAreaClass = classes.gridAreaClass;
		tplData.timezoneTitleAreaClass = classes.timezoneTitleAreaClass;
		tplData.dayTitleAreaClass = classes.dayTitleAreaClass;
		tplData.timeColumnAreaClass = classes.timeColumnAreaClass;
		tplData.dayGridAreaClass = classes.dayGridAreaClass;
		tplData.dayColumnAreaClass = classes.dayColumnAreaClass;
		tplData.dayRowAreaClass = classes.dayRowAreaClass;
		tplData.dayTitleClass = classes.dayTitleClass;
		tplData.timezoneTitleClass = classes.timezoneTitleClass;
		tplData.dayColumnClass = classes.dayColumnClass;
		tplData.timeColumnClass = classes.timeColumnClass;
		tplData.scrollAreaClass = classes.scrollAreaClass;
		tplData.multiDayItemAreaStyle = styles.multiDayItemAreaStyle;
		tplData.timeGridStyle = styles.timeGridStyle;
		tplData.timezoneTitleAreaStyle = styles.timezoneTitleAreaStyle;
		tplData.dayTitleAreaStyle = styles.dayTitleAreaStyle;
		tplData.dayColumnAreaStyle = styles.dayColumnAreaStyle;
		tplData.dayItemWidthStyle = styles.dayItemWidthStyle;
		tplData.gridScrollStyle = styles.gridScrollStyle;
		tplData.titleAreaStyle = styles.titleAreaStyle;
		tplData.prepareDayTitle = function(out, values) {
			var scheduler = values.self;
			var schedulerDayList = scheduler.getSchedulerDayList();
			var dayTitleClasses = values.dayTitleClass;
			var dayTitleWidth = values.dayItemWidthStyle.width;
			for (var i = 0; i < schedulerDayList.length; i++) {
				var date = schedulerDayList[i];
				var dayTitle = scheduler.getDayTitle(date);
				var selected = false;
				for (var j = 0, jln = selectedDays.length; j < jln; j++) {
					var selectedDay = selectedDays[j];
					if (Ext.Date.isEqual(selectedDay, date)) {
						selected = true;
						break;
					}
				}
				var titleImage = scheduler.getTitleImage(date, selected);
				var dayClassIndex = 0;
				if (scheduler.getIsDayToday(date)) {
					dayClassIndex = 1;
				} else if (scheduler.getIsDayOff(date)) {
					dayClassIndex = 2;
				}
				out.push("<div style='width: " + dayTitleWidth + "' class='" + dayTitleClasses[dayClassIndex] + "'>" +
					dayTitle + titleImage + "</div>");
			}
		};

		tplData.prepareTimezoneTitle = function(out, values) {
			var scheduler = values.self;
			var timezones = scheduler.timezone;
			var timezonesCount = timezones.length;
			var timezoneTitle;
			var timezoneTitleClasses = values.timezoneTitleClass;
			for (var i = timezonesCount - 1; i >= 0; i--) {
				timezoneTitle = timezones[i].timezoneTitle;
				if (i > 0) {
					out.push("<div class='" + timezoneTitleClasses[2] + "'>" + timezoneTitle + "</div>");
				} else {
					out.push("<div class='" + (timezonesCount > 1 ? timezoneTitleClasses[0] :
						timezoneTitleClasses[1]) + "'>" + (timezonesCount > 1 ? timezoneTitle : "") + "</div>");
				}
			}
		};

		tplData.prepareTimeColumn = function(out, values) {
			var scheduler = values.self;
			var timeScale = scheduler.timeScale;
			var scaleTplName = "minutes" + timeScale;
			var schedulerConfig = scheduler.schedulerConfig;
			var timezoneHourTplCollection = schedulerConfig.timezoneHourTpl;
			var mainTimezoneHourTplCollection = schedulerConfig.mainTimezoneHourTpl;
			var timezoneHourTpl = timezoneHourTplCollection[scaleTplName];
			var mainTimezoneHourTpl = mainTimezoneHourTplCollection[scaleTplName];
			var timezones = scheduler.timezone;
			var timezonesCount = timezones.length;
			var timeColumnClasses = values.timeColumnClass;
			for (var i = timezonesCount - 1; i >= 0; i--) {
				out.push("<div class='" + (i > 0 ? timeColumnClasses[1] : timeColumnClasses[0]) + "'>");
				for (var j = scheduler.startHour; j < scheduler.dueHour; j++) {
					var hourTpl = (i > 0 ? timezoneHourTpl : mainTimezoneHourTpl);
					hourTpl = hourTpl.replace("{hourNumber}", j);
					out.push(hourTpl);
				}
				out.push("</div>");
			}
		};

		tplData.prepareDayColumn = function(out, values) {
			var scheduler = values.self;
			var schedulerDayList = scheduler.getSchedulerDayList();
			var dayColumnClasses = values.dayColumnClass;
			var dayColumnWidth = values.dayItemWidthStyle.width;
			for (var i = 0; i < schedulerDayList.length; i++) {
				var date = schedulerDayList[i];
				var dayColumnClassIndex = 0;
				if (scheduler.getIsDayOff(date)) {
					dayColumnClassIndex = 1;
				}
				var columnId = scheduler.getDayColumnId(values.id, date);
				out.push("<div id='" + columnId + "' style='width:" + dayColumnWidth + "' class='" +
					dayColumnClasses[dayColumnClassIndex] + "'>");
				out.push("</div>");
			}
		};

		tplData.prepareDayRow = function(out, values) {
			var scheduler = values.self;
			var timeScale = scheduler.timeScale;
			var scaleTplName = "minutes" + timeScale;
			var schedulerConfig = scheduler.schedulerConfig;
			var hourTplCollection = schedulerConfig.dayHourTpl;
			var hourTpl = hourTplCollection[scaleTplName];
			for (var i = scheduler.startHour; i < scheduler.dueHour; i++) {
				var hourRowId = values.id + "-time-" + i;
				var hourIdRegExp = new RegExp("{hourId}", "ig");
				var resultString = hourTpl.replace(hourIdRegExp, hourRowId);
				out.push(resultString);
			}
		};

		this.updateSelectors();
		return tplData;
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the mixin interface {@link Terrasoft.Bindable}
	 * @protected
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var schedulerBindConfig = {
			activityCollection: {
				changeMethod: "onCollectionDataLoaded"
			},
			period: {
				changeMethod: "onPeriodChange"
			},
			timeScale: {
				changeMethod: "onTimeScaleChange"
			},
			selectedItems: {
				changeEvent: "changeSelectedItems",
				changeMethod: "setSelectedItems"
			},
			selectedDays: {
				changeEvent: "selectedDaysChanged",
				changeMethod: "setSelectedDays"
			},
			selection: {
				changeEvent: "selectionChanged",
				changeMethod: "setSelection"
			},
			floatingItemsCollection: {
				changeMethod: "onFloatingItemsCollectionDataLoaded"
			},
			selectionKeyPressSymbols: {
				changeEvent: "selectionKeyPressSymbolsUpdate"
			},
			isDayImageVisible: {
				changeMethod: "setDayImageVisibility"
			}
		};
		Ext.apply(schedulerBindConfig, bindConfig);
		return schedulerBindConfig;
	},

	/**
	 * Handler for the "onPeriodChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onPeriodChange: function(value) {
		this.setPeriod(value.startDate, value.dueDate);
	},

	/**
	 * Handler for the "onTimeScaleChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onTimeScaleChange: function(value) {
		this.setTimeScale(value);
		this.clearTimeMarkerUpdateTimer();
		this.initTimeMarkerUpdateTimer();
	},

	/**
	 * Handler for the "dataLoaded" event of the Terrasoft.Collection
	 * @protected
	 * @param {Terrasoft.Collection} collection
	 */
	onCollectionDataLoaded: function(collection) {
		Terrasoft.each(this.collection, function(scheduleItem) {
			scheduleItem.destroy();
		});
		this.collection = [];
		this.activityCollection = collection;
		this.activityCollection.eachKey(function(key, item, index) {
			this.onAddItem(item, index, key, true);
		}, this);
		if (this.rendered) {
			this.reRender();
		}
	},

	/**
	 * Processes the filling of the #floatingItemsCollection
	 * @protected
	 * @param {Terrasoft.BaseViewModelCollection} collection
	 */
	onFloatingItemsCollectionDataLoaded: function(collection) {
		this.floatingItemsCollection = collection;
		var items = Ext.create("Terrasoft.Collection");
		collection.each(function(floatingItemViewModel) {
			var scheduleFloatingItem = this.createScheduleFloatingItem(floatingItemViewModel);
			items.add(scheduleFloatingItem);
		}, this);
		this.scheduleFloatingItems.loadAll(items);
	},

	/**
	 * The "add" event handler for the Terrasoft.Collection
	 * @protected
	 * @param {Terrasoft.BaseViewModel} item
	 */
	onAddItem: function(item, index, key, cancelPositionProcess) {
		// TODO: #133932 ### ########## ########
		const startDate = item.values.StartDate;
		const dueDate = item.values.DueDate;
		const isMultiDayItem = !Terrasoft.areDatesEqual(startDate, dueDate);
		const startHour = startDate.getHours();
		const dueMinute = dueDate.getMinutes();
		const dueHour = dueMinute > 0 ? dueDate.getHours() + 1 : dueDate.getHours();
		if ((((startHour < this.startHour) || (startHour > this.dueHour) || (dueHour < this.startHour) ||
			(dueHour > this.dueHour)) && !isMultiDayItem) || (startDate > dueDate)) {
			return;
		}
		const itemBindingConfig = Terrasoft.deepClone(this.itemBindingConfig);
		itemBindingConfig.scheduler = this;
		const schedulerItem = Ext.create("Terrasoft.ScheduleItem", itemBindingConfig);
		schedulerItem.setViewModelCollectionItemId(key);
		schedulerItem.bind(item);
		schedulerItem.on("canExecute", config => this.fireEvent("canExecute", config));
		this.collection.push(schedulerItem);
		if (cancelPositionProcess === true) {
			return;
		}
		this.itemPositionProcess([schedulerItem.getStartDate()]);
		this.multiDayItemPositionProcess();
	},

	/**
	 * Gets whether the task is within the view area.
	 * @param {Terrasoft.controls.ScheduleItem} scheduleItem Task item.
	 * @return {Boolean}
	 */
	getItemIntersectViewInterval: function(scheduleItem) {
		var viewStartDate = this.startDate;
		var viewDueDate = this.dueDate;
		var itemStartDate = scheduleItem.getStartDate();
		var itemDueDate = scheduleItem.getDueDate();
		if (scheduleItem.isMultiDayItem() && ((itemDueDate.getHours() === 0) && (itemDueDate.getMinutes() === 0) &&
			(itemDueDate.getSeconds() === 0))) {
			itemDueDate = Terrasoft.addDays(itemDueDate, -1);
		}
		var isItemStartDateInViewInterval = Terrasoft.areDatesEqual(itemStartDate, viewDueDate) ||
			((itemStartDate <= viewDueDate) && (itemStartDate >= viewStartDate));
		var isItemDueDateInViewInterval = Terrasoft.areDatesEqual(itemDueDate, viewDueDate) ||
			((itemDueDate <= viewDueDate) && (itemDueDate >= viewStartDate));
		var isItemOverViewInterval = (itemStartDate < viewStartDate) && (itemDueDate > viewDueDate);
		return isItemStartDateInViewInterval || isItemDueDateInViewInterval || isItemOverViewInterval;
	},

	/**
	 * Sorts multi-day tasks by levels to display.
	 * @protected
	 * @return {Array} Array of sorted tasks.
	 */
	getMultiDayItemSortedArray: function() {
		var multiDayItemCollection = [];
		Terrasoft.each(this.collection, function(item) {
			if (item.isMultiDayItem()) {
				multiDayItemCollection.push(item);
			}
		});
		var sortedItems = multiDayItemCollection.sort(function(itemA, itemB) {
			var itemALength = itemA.dueDate - itemA.startDate;
			var itemBLength = itemB.dueDate - itemB.startDate;
			if ((itemA.startDate === itemB.startDate) && (itemALength === itemBLength)) {
				return 0;
			} else if (itemA.startDate > itemB.startDate) {
				return 1;
			} else if (itemA.startDate < itemB.startDate) {
				return -1;
			} else if (itemALength > itemBLength) {
				return -1;
			} else if (itemALength < itemBLength) {
				return 1;
			} else {
				return 0;
			}
		});
		var itemsSortedByLevel = [];
		var item;
		var lastItemInLevel;
		var itemsInLevel;
		var itemStartDate, lastItemInLevelDue;
		for (var i = 0, sortedItemsLength = sortedItems.length; i < sortedItemsLength; i++) {
			item = sortedItems[i];
			if (!this.getItemIntersectViewInterval(item)) {
				continue;
			}
			for (var j = 0, itemsSortedByLevelLength = itemsSortedByLevel.length; j < itemsSortedByLevelLength; j++) {
				itemsInLevel = itemsSortedByLevel[j];
				lastItemInLevel = itemsInLevel[itemsInLevel.length - 1];
				itemStartDate = item.startDate;
				lastItemInLevelDue = lastItemInLevel.dueDate;
				if (lastItemInLevelDue <= itemStartDate) {
					itemsInLevel.push(item);
					break;
				} else {
					continue;
				}
			}
			if (!itemsSortedByLevel[j]) {
				itemsInLevel = itemsSortedByLevel[j] = [];
				itemsInLevel.push(item);
			}
		}
		return itemsSortedByLevel;
	},

	/**
	 * Positions multi-day tasks.
	 * @private
	 */
	multiDayItemPositionProcess: function() {
		var items = this.getMultiDayItemSortedArray();
		var numberOfLevels = items.length;
		if (!this.rendered || (numberOfLevels <= 0)) {
			return;
		}
		var multiDayItemArea = this.multiDayItemArea;
		var multiDayItemHeight = this.collection[0].multiDayItemHeight;
		var topPosition;
		var multiDayItemAreaLayoutSizes = Terrasoft.MultiDayItemAreaLayoutSizes;
		multiDayItemArea.setHeight(multiDayItemHeight * numberOfLevels +
			multiDayItemAreaLayoutSizes.MULTI_DAY_ITEM_PADDING_TOP +
			multiDayItemAreaLayoutSizes.MULTI_DAY_ITEM_PADDING_BOTTOM + multiDayItemAreaLayoutSizes.BORDER_HEIGHT *
			(numberOfLevels - 1));
		for (var i = 0; i < numberOfLevels; i++) {
			var itemsInLevel = items[i];
			for (var j = 0, levelLength = itemsInLevel.length; j < levelLength; j++) {
				var item = itemsInLevel[j];
				var itemHeight = item.multiDayItemHeight;
				item.setWidth(this.getMultiDayItemWidth(item));
				topPosition = itemHeight * i + multiDayItemAreaLayoutSizes.MULTI_DAY_ITEM_PADDING_TOP + i *
					multiDayItemAreaLayoutSizes.BORDER_HEIGHT;
				item.setTop(topPosition);
				item.setLeft(this.getMultiDayItemLeft(item));
				item.show();
			}
		}
		this.prepareScrollArea();
	},

	/**
	 * Calculates the width of the multi-day task.
	 * @private
	 * @param {Terrasoft.controls.ScheduleItem} scheduleItem Task element.
	 * @return {Number} The width of the task in pixels.
	 */
	getMultiDayItemWidth: function(scheduleItem) {
		var itemStartDate = scheduleItem.getStartDate();
		var itemDueDate = scheduleItem.getDueDate();
		var scheduleStartDate = this.getStartDate();
		var scheduleDueDate = Terrasoft.addDays(this.getDueDate(), 1);
		scheduleDueDate = Terrasoft.clearTime(scheduleDueDate);
		var startDate = new Date(scheduleStartDate > itemStartDate ? scheduleStartDate : itemStartDate);
		var startDateElement = Ext.select("div[id*='" + scheduleItem.getDayColumnId(startDate) + "']").first();
		var startDateElementBox = startDateElement.getBox();
		var dueDate = new Date((scheduleDueDate < itemDueDate) ? scheduleDueDate : itemDueDate);
		dueDate = this._getRealDueDate(dueDate);
		var dueDateElement = Ext.select("div[id*='" + scheduleItem.getDayColumnId(dueDate) + "']").first();
		var dueDateElementBox = dueDateElement.getBox();
		if (Terrasoft.getIsRtlMode()) {
			return startDateElementBox.right - dueDateElementBox.left;
		}
		return dueDateElementBox.right - startDateElementBox.left;
	},

	/**
	 * Calculates the position of the left edge of the multi-day task.
	 * @private
	 * @param {Terrasoft.controls.ScheduleItem} scheduleItem Task element.
	 * @return {Number} The position of the left edge of the element in pixels.
	 */
	getMultiDayItemLeft: function(scheduleItem) {
		var multiDayItemAreaBox = this.multiDayItemArea.getBox();
		var dateElementBox = Terrasoft.getIsRtlMode()
			? this._getDueDateElBox(scheduleItem)
			: this._getStartDateElBox(scheduleItem);
		return dateElementBox.left - multiDayItemAreaBox.left + Terrasoft.MultiDayItemAreaLayoutSizes.BORDER_WIDTH;
	},

	/**
	 * Gets element box of the schedule item due date.
	 * @private
	 * @param {Terrasoft.controls.ScheduleItem} scheduleItem Schedule ite instance.
	 * @return {Object} Element box of the schedule item due date.
	 */
	_getDueDateElBox: function(scheduleItem) {
		var itemDueDate = scheduleItem.getDueDate();
		var scheduleDueDate = this.getDueDate();
		var dueDate = (scheduleDueDate < itemDueDate) ? scheduleDueDate : this._getRealDueDate(itemDueDate);
		return scheduleItem.getElBoxByDate(dueDate);
	},

	/**
	 * Gets element box of the schedule item start date.
	 * @private
	 * @param {Terrasoft.controls.ScheduleItem} scheduleItem Schedule ite instance.
	 * @return {Object} Element box of the schedule item start date.
	 */
	_getStartDateElBox: function(scheduleItem) {
		var itemStartDate = scheduleItem.getStartDate();
		var scheduleStartDate = this.getStartDate();
		var startDate = (scheduleStartDate > itemStartDate) ? scheduleStartDate : itemStartDate;
		return scheduleItem.getElBoxByDate(startDate);
	},

	/**
	 * Gets due date minus 1 day if hours, minutes, seconds == 0, otherwise passed value date.
	 * @private
	 * @param {Date} dueDate Due date.
	 * @return {Date} Real due date.
	 */
	_getRealDueDate: function(dueDate) {
		var dueDateHours = dueDate.getHours();
		var dueDateMinutes = dueDate.getMinutes();
		var dueDateSeconds = dueDate.getSeconds();
		if (dueDateHours + dueDateMinutes + dueDateSeconds === 0) {
			dueDate = Terrasoft.addDays(dueDate, -1);
		}
		return dueDate;
	},

	/**
	 * Handler of the "remove" event of the Terrasoft.Collection
	 * @protected
	 * @param {Object} item
	 * @param {String} key
	 */
	onDeleteItem: function(item, key) {
		var i;
		var collection = this.collection;
		for (i = 0; i < collection.length; i++) {
			if (key === collection[i].getViewModelCollectionItemId()) {
				var itemStartDate = collection[i].getStartDate();
				collection[i].destroy();
				collection.splice(i, 1);
				this.itemPositionProcess([itemStartDate]);
				this.multiDayItemPositionProcess();
			}
		}
		var selectedItems = this.selectedItems;
		for (i = 0; i < selectedItems.length; i++) {
			if (key === selectedItems[i]) {
				selectedItems.splice(i, 1);
				this.fireEvent("changeSelectedItems");
			}
		}
	},

	/**
	 * Method for clearing the calendar item collection.
	 */
	clear: function() {
		var collection = this.collection;
		for (var i = 0; i < collection.length; i++) {
			collection[i].destroy();
		}
		this.collection = [];
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @protected
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		this.callParent(arguments);
		var collection = model.get(binding.modelItem);
		switch (property) {
			case "activityCollection":
				collection.on("add", this.onAddItem, this);
				collection.on("remove", this.onDeleteItem, this);
				collection.on("clear", this.clear, this);
				break;
			case "floatingItemsCollection":
				collection.on("add", this.onAddFloatingItem, this);
				collection.on("remove", this.onDeleteFloatingItem, this);
				collection.on("clear", this.onClearFloatingItems, this);
				break;
			default:
				return;
		}
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#unSubscribeForCollectionEvents
	 * @protected
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		this.callParent(arguments);
		var collection = model.get(binding.modelItem);
		switch (property) {
			case "activityCollection":
				collection.un("add", this.onAddItem, this);
				collection.un("remove", this.onDeleteItem, this);
				collection.un("clear", this.clear, this);
				break;
			case "floatingItemsCollection":
				collection.un("add", this.onAddFloatingItem, this);
				collection.un("remove", this.onDeleteFloatingItem, this);
				collection.un("clear", this.onClearFloatingItems, this);
				break;
			default:
				return;
		}
	},

	/**
	 * Creates a quick add window and subscribes to its events.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} floatingItemViewModel
	 * @return {Terrasoft.ScheduleFloatingItem}
	 */
	createScheduleFloatingItem: function(floatingItemViewModel) {
		var floatingItemBindConfig = Terrasoft.deepClone(this.floatingItemBindingConfig) || {};
		floatingItemBindConfig.scheduleEdit = this;
		var floatingItem = Ext.create("Terrasoft.ScheduleFloatingItem", floatingItemBindConfig);
		floatingItem.on("ready", this.onFloatingItemReady, this);
		floatingItem.bind(floatingItemViewModel);
		return floatingItem;
	},

	/**
	 * Handles the ready event of the Quick Add Task window object.
	 * @protected
	 * @return {Object}
	 * @return {Terrasoft.ScheduleFloatingItem} return.renderToItem Quick Add Task window object.
	 * @return {String} return.floatingItemId the DOM element identifier of the
	 * Quick Add Task window object.
	 */
	onFloatingItemReady: function() {
		var config = {
			renderToItem: arguments[0],
			renderTo: arguments[1]
		};
		this.keyMap = this.createEscKeyMap();
		this.fireEvent("floatingItemReady", config);
	},

	/**
	 * Processes adding a model to a collection #scheduleFloatingItems.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} floatingItemViewModel
	 */
	onAddFloatingItem: function(floatingItemViewModel) {
		var scheduleFloatingItem = this.createScheduleFloatingItem(floatingItemViewModel);
		this.scheduleFloatingItems.add(scheduleFloatingItem);
	},

	/**
	 * Deletes the model in the collection #scheduleFloatingItems.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} deletedFloatingItemViewModel
	 */
	onDeleteFloatingItem: function(deletedFloatingItemViewModel) {
		var scheduleFloatingItems = this.scheduleFloatingItems;
		var filter = function(item) {
			if (item.model.instanceId === deletedFloatingItemViewModel.instanceId) {
				scheduleFloatingItems.remove(item);
			}
		};
		scheduleFloatingItems.each(filter);
	},

	/**
	 * Processes the collection of quick add task windows (task pop-up summaries).
	 * @protected
	 */
	onClearFloatingItems: function() {
		var scheduleFloatingItems = this.scheduleFloatingItems;
		var filter = function(item) {
			scheduleFloatingItems.remove(item);
		};
		scheduleFloatingItems.each(filter);
	},

	/**
	 * Handler of the "afterrender" event.
	 * @protected
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.prepareScrollArea(true);
		this.initDd();
		this.renderSchedulerItems();
		var wrapEl = this.getWrapEl();
		wrapEl.unselectable();
		this.updateTimeMarker();
	},

	/**
	 * Handler of the "afterrerender" event.
	 * @protected
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.prepareScrollArea(true);
		this.initDd();
		this.renderSchedulerItems();
		var wrapEl = this.getWrapEl();
		wrapEl.unselectable();
		this.updateTimeMarker();
	},

	/**
	 * Gets the calendar start date.
	 * @return {Date} Calendar start date.
	 */
	getStartDate: function() {
		return this.startDate;
	},

	/**
	 * Gets the calendar end date.
	 * @return {Date} Calendar end date.
	 */
	getDueDate: function() {
		return this.dueDate;
	},

	/**
	 * Gets the calendar end date.
	 * @return {Date} Calendar end date.
	 */
	getTimeScale: function() {
		return this.timeScale;
	},

	/**
	 * Returns an array of keys for the ViewModel elements of the selected calendar elements.
	 * @return {Array} Returns an array of selected calendar elements.
	 */
	getSelectedItems: function() {
		var collection = this.collection;
		var selectedSchedulerItems = [];
		for (var i = 0, length = collection.length; i < length; i++) {
			if (collection[i].getIsSelected()) {
				selectedSchedulerItems.push(collection[i].viewModelCollectionItemId);
			}
		}
		this.selectedItems = selectedSchedulerItems;
		return selectedSchedulerItems;
	},

	/**
	 * Marks selected records in the calendar according to the list of identifiers newSelectedIds.
	 * Selection of any records whose Id is not in the list will be cleared.
	 * @param {String[]} selectedItems
	 */
	setSelectedItems: function(selectedItems) {
		if (!Ext.isArray(selectedItems) ||
			Ext.Array.equals(selectedItems, this.selectedItems)) {
			return;
		}
		selectedItems = Ext.Array.clone(selectedItems);
		Terrasoft.each(this.collection, function(scheduleItem) {
			var isNewSelected = Terrasoft.contains(selectedItems,
				scheduleItem.viewModelCollectionItemId);
			if (scheduleItem.isSelected) {
				if (!isNewSelected) {
					scheduleItem.setNotSelected(true);
				}
			} else if (isNewSelected) {
				scheduleItem.setSelected(null, true);
			}
		});
		this.selectedItems = selectedItems;
		this.fireEvent("changeSelectedItems");
	},

	/**
	 * Sets the calendar period.
	 * @param {Date} startDate Date from.
	 * @param {Date} dueDate Date to.
	 */
	setPeriod: function(startDate, dueDate) {
		if (!startDate) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.ScheduleEdit.IsNullStartDateParameter
			});
		}
		if (!dueDate) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.ScheduleEdit.IsNullEndDateParameter
			});
		}
		var clearDueDate = Ext.Date.clearTime(dueDate);
		var clearStartDate = Ext.Date.clearTime(startDate);
		var daysMerge = clearDueDate - clearStartDate;
		if (daysMerge < 0) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.ScheduleEdit.DaysCountShouldBeGreaterThenZero
			});
		}
		if ((this.startDate === startDate) && (this.dueDate === dueDate)) {
			return;
		}
		this.startDate = startDate;
		this.dueDate = dueDate;
		this.safeRerender();
	},

	/**
	 * Sets the calendar time scale.
	 * @param {Terrasoft.controls.ScheduleEdit.TimeScale} timeScale Date from.
	 */
	setTimeScale: function(timeScale) {
		if (!timeScale) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.ScheduleEdit.IsNullTimeScaleParameter
			});
		}
		if (this.timeScale === timeScale) {
			return;
		}
		this.timeScale = timeScale;
		this.safeRerender();
	},

	/**
	 * The event handler for pressing the ESC key.
	 * @private
	 */
	onEscKeyPressed: function() {
		if (this.floatingItemsCollection) {
			this.floatingItemsCollection.clear();
		}
	},

	/**
	 * Creates event handler for pressing the ESC key.
	 * @private
	 * @return {Ext.KeyMap} Instance of {Ext.KeyMap}
	 */
	createEscKeyMap: function() {
		return new Ext.util.KeyMap(Ext.getBody(), [{
			key: Ext.EventObject.ESC,
			defaultEventAction: "preventDefault",
			scope: this,
			fn: this.onEscKeyPressed
		}]);
	},

	/**
	 * Deletes event handler for pressing the ESC key.
	 * @private
	 */
	destroyKeyMap: function() {
		if (this.keyMap) {
			this.keyMap.destroy();
			this.keyMap = null;
		}
	}
});
