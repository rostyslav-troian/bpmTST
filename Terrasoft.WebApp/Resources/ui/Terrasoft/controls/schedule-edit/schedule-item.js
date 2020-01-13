Ext.ns("Terrasoft.controls.ScheduleItem");

/**
 * Calendar item status
 * @enum
 */
Terrasoft.controls.ScheduleItem.Status = {
	/** New */
	NEW: 1,
	/** Completed */
	DONE: 2,
	/** Overdue */
	OVERDUE: 3
};

/**
 * Abbreviation for {@link Terrasoft.controls.ScheduleItem.Status}
 * @member Terrasoft
 * @inheritdoc Terrasoft.controls.ScheduleItem.Status
 */
Terrasoft.ScheduleItemStatus = Terrasoft.controls.ScheduleItem.Status;

/**
 *  Class to work with the schedule.
 */
Ext.define("Terrasoft.controls.ScheduleItem.ScheduleItem", {
	alternateClassName: "Terrasoft.ScheduleItem",
	extend: "Terrasoft.Component",

	/**
	 * Estimated height of the time slot (em)
	 * @type {Number}
	 */
	timeItemHeight: 2.2,

	/**
	 * Estimated height of the multi-day task (px)
	 * @private
	 * @type {Number}
	 */
	multiDayItemHeight: 21,

	/**
	 * View Model collection Id
	 * @type {Object}
	 */
	scheduler: null,

	/**
	 * View Model collection Id
	 * @type {String}
	 */
	viewModelCollectionItemId: "",

	/**
	 * Item Id
	 * @type {String}
	 */
	itemId: null,

	/**
	 * Start date
	 * @type {Date}
	 */
	startDate: null,

	/**
	 * End date
	 * @type {Date}
	 */
	dueDate: null,

	/**
	 * Title
	 * @type {String}
	 */
	title: null,

	/**
	 * Status
	 * @type {Terrasoft.ScheduleItemStatus}
	 */
	status: Terrasoft.ScheduleItemStatus.NEW,

	/**
	 * Vertical position of the element
	 * @type {Number}
	 */
	top: 0,

	/**
	 * Position of the element horizontally
	 * @type {Number}
	 */
	left: 0,

	/**
	 * Item right indent
	 * @type {Number}
	 */
	rightSpace: 2,

	/**
	 * Item width
	 * @type {Number}
	 */
	width: 100,

	/**
	 * Time slot scale
	 * @type {Terrasoft.TimeScale}
	 */
	timeScale: null,

	/**
	 * Item background
	 * @type {String}
	 */
	background: null,

	/**
	 * Text color
	 * @type {String}
	 */
	fontColor: null,

	/**
	 * Italic type font
	 * @type {Boolean}
	 */
	isItalic: false,

	/**
	 * Bold font
	 * @type {Boolean}
	 */
	isBold: false,

	/**
	 * Underline font
	 * @type {Boolean}
	 */
	isUnderline: false,

	/**
	 * Indicates that the item is selected
	 * @type {Boolean}
	 */
	isSelected: false,

	/**
	 * Short day names.
	 * @type {String[]}
	 */
	shortDayNames: Terrasoft.Resources.CultureSettings.shortDayNames,

	/**
	 * Click event task item.
	 * @type {Object}
	 */
	itemTask: null,

	/**
	 * Click event wait interval.
	 * @type {Number}
	 */
	clickHandlerTimeout: 300,

	/**
	 * Common control template, contains the scrolling of elements and a method for rendering content
	 * @override
	 * @type {Array}
	 */
	tpl: [
		"<div tabindex=\"0\" id=\"{id}-scheduleritem\" style=\"{schedulerItemStyle}\" class=\"{scheduleItemClass}\">",
		"<div id=\"{id}-scheduleritem-resize-top\" class=\"{scheduleItemResizeTopClass}\"></div>",
		"{%this.prepareSchedulerItem(out, values)%}",
		"<div id=\"{id}-scheduleritem-resize-bottom\" class=\"{scheduleItemResizeBottomClass}\"></div>",
		"</div>"
	],

	/**
	 * List of styles and classes for mapping a one-day task
	 * @private
	 * @type {Object}
	 */
	oneDayItemConfig: {
		classes: {
			scheduleItemClass: ["scheduleritem"],
			scheduleItemResizeTopClass: ["scheduleritem-resize-top"],
			scheduleItemResizeBottomClass: ["scheduleritem-resize-bottom"],
			scheduleItemStatusClass: ["scheduleritem-selected", "scheduleritem-new", "scheduleritem-done",
				"scheduleritem-overdue"],
			scheduleItemCaptionClass: ["scheduleritem-caption"],
			scheduleItemTitleClass: ["scheduleritem-title"]
		}
	},

	/**
	 * List of styles and classes for mapping a multi-day task
	 * @private
	 * @type {Object}
	 */
	multiDayItemConfig: {
		classes: {
			scheduleItemClass: ["multi-day-item"],
			scheduleItemResizeTopClass: ["multi-day-item-resize-right"],
			scheduleItemResizeBottomClass: ["multi-day-item-resize-left"],
			scheduleItemCaptionClass: ["multi-day-item-caption"],
			scheduleItemTitleClass: ["multi-day-item-title"],
			scheduleItemStatusClass: ["scheduleritem-selected", "scheduleritem-new", "scheduleritem-done",
				"scheduleritem-overdue"],
			scheduleItemLeftCaptionClass: ["multi-day-item-left-caption"]
		}
	},

	/**
	 * The configuration of the binding of initial values by the method of binding. Defines at what method of data binding
	 * what property of the class will be assigned during the initialization of the binding. Used in
	 * Terrasoft.Bindable#setControlInitialValue.
	 * @private
	 * @type {Object}
	 */
	bindInitialValueConfig: {
		onItemIdChange: "itemId",
		onTitleChange: "title",
		onStartDateChange: "startDate",
		onDueDateChange: "dueDate",
		onStatusChange: "status",
		onBackgroundChange: "background",
		onFontColorChange: "fontColor",
		onIsBoldChange: "isBold",
		onIsItalicChange: "isItalic",
		onIsUnderlineChange: "isUnderline",
		setMarkerValue: "markerValue"
	},

	/**
	 * Returns the date taking the time scale into account
	 * @private
	 * @param {Date} currentDate The current date
	 * @param {Date} newDate The new date
	 * @param {Terrasoft.TimeScale} timeScale Time scale
	 * @return {Date} The date taking the time scale into account
	 */
	getNewDateByScale: function(currentDate, newDate, timeScale) {
		var newDateMinutes = currentDate.getMinutes();
		if (newDateMinutes % timeScale === 0) {
			return newDate;
		} else {
			var millisecondsInMinute = Terrasoft.DateRate.MILLISECONDS_IN_MINUTE;
			newDate = newDate - currentDate;
			newDate = newDate / millisecondsInMinute;
			newDate = Math.floor(newDate / timeScale) + 1;
			newDate = newDate * timeScale * millisecondsInMinute;
			currentDate = currentDate - 0;
			newDate = currentDate + newDate;
			newDate = new Date(newDate);
			return newDate;
		}
	},

	/**
	 * Returns the parameters of the rectangle of the dom element
	 * @private
	 * @param {Object} The dom element
	 * @return {Object} The parameters of the rectangle of the dom element
	 */
	getElementBox: function(element) {
		var elementEl = Ext.get(element);
		return elementEl.getBox();
	},

	/**
	 * Returns the element header
	 * @private
	 * @return {String} The element header
	 */
	getItemCaption: function() {
		var result = "";
		var startDate = this.startDate;
		var dueDate = this.dueDate;
		if (this.isMultiDayItem()) {
			var scheduleDueDate = Terrasoft.addDays(this.scheduler.getDueDate(), 1);
			var isShowCaption = !Terrasoft.areDatesEqual(dueDate, scheduleDueDate) && (scheduleDueDate < dueDate);
			var showDueDate = new Date(dueDate - 1);
			var day = showDueDate.getDate();
			var dayOfWeek = showDueDate.getDay();
			result = (isShowCaption) ? Ext.String.format("{0}, {1}", day, this.shortDayNames[dayOfWeek]) : "";
		} else {
			var startDateMinutes = startDate.getMinutes();
			var dueDateMinutes = dueDate.getMinutes();
			var timeScale = this.getTimeScale();
			if ((startDateMinutes % timeScale) !== 0 || (dueDateMinutes % timeScale) !== 0) {
				var displayStartDate = Ext.Date.format(startDate, Terrasoft.Resources.CultureSettings.timeFormat);
				var displayDueDate = Ext.Date.format(dueDate, Terrasoft.Resources.CultureSettings.timeFormat);
				result = Ext.String.format("{0}-{1}", displayStartDate, displayDueDate);
			}
		}
		return result;
	},

	/**
	 * Returns the inscription on the left if the multi-day task does not fit into the scope
	 * @private
	 * @return {String} Inscription with date
	 */
	getLeftCaption: function() {
		var result;
		var startDate = this.getStartDate();
		var scheduleStartDate = this.scheduler.getStartDate();
		var isShowCaption = !Terrasoft.areDatesEqual(startDate, scheduleStartDate) && (startDate < scheduleStartDate);
		var day = startDate.getDate();
		var dayOfWeek = startDate.getDay();
		result = (isShowCaption) ? Ext.String.format("{0}, {1}", day, this.shortDayNames[dayOfWeek]) : "";
		return result;
	},

	/**
	 * Checks the equality of days
	 * @private
	 * @return {Boolean} Returns the result of checking the equality of days
	 */
	getIsTheSameDay: function(dateA, dateB) {
		return Terrasoft.areDatesEqual(dateA, dateB);
	},

	/**
	 * Generates the day column Id
	 * @private
	 * @param {Date} date Column date
	 * @return {String} The day column Id
	 */
	getDayColumnId: function(date) {
		var day = String(date.getDate());
		day = (day.length === 1) ? Ext.String.format("0{0}", day) : day;
		var month = String(date.getMonth() + 1);
		month = (month.length === 1) ? Ext.String.format("0{0}", month) : month;
		var year = date.getFullYear();
		return Ext.String.format("-day-{0}-{1}-{2}", day, month, year);
	},

	/**
	 * Returns the component to render the element
	 * @private
	 * @return {Object} The component to render the element
	 */
	getRenderTo: function() {
		var startDate = this.startDate;
		var dueDate = this.dueDate;
		if (!startDate || !dueDate) {
			return;
		}
		if (this.isMultiDayItem()) {
			return this.scheduler.multiDayItemArea;
		}
		startDate = new Date(this.startDate);
		var dateColumnName = this.getDayColumnId(startDate);
		var columnId = Ext.String.format("[id*='{0}']", dateColumnName);
		var dateColumn = Ext.select(columnId, false);
		if (dateColumn) {
			var dateColumnEl = dateColumn.elements;
			if (dateColumnEl.length > 0) {
				return Ext.get(dateColumnEl[0]);
			}
		}
	},

	/**
	 * Returns the scale of the calendar
	 * @private
	 * @return {Terrasoft.TimeScale} Day column Id
	 */
	getTimeScale: function() {
		return this.scheduler.getTimeScale();
	},

	/**
	 * Gets an indication that the item is a multi-day
	 * @private
	 * @return {Boolean} An indication that the item is a multi-day
	 */
	isMultiDayItem: function() {
		return (!Terrasoft.areDatesEqual(this.startDate, this.dueDate));
	},

	/**
	 * Updates styles for selected item.
	 * @private
	 */
	updateItemSelectionStyle: function() {
		var isSelected = this.isSelected;
		var selectedCls = "scheduleritem-selected";
		var className = "scheduleritem-";
		switch (this.status) {
			case 2:
				className += "done";
				break;
			case 3:
				className += "overdue";
				break;
			default:
				className += "new";
				break;
		}
		var wrapEl = this.getWrapEl();
		if (wrapEl && wrapEl.dom) {
			var itemBody = wrapEl.child("div");
			var itemBodyEl = itemBody.next();
			itemBodyEl.addCls(className);
			if (isSelected) {
				itemBodyEl.addCls(selectedCls);
			} else {
				itemBodyEl.removeCls(selectedCls);
			}
			itemBodyEl.setStyle({
				"backgroundColor": (isSelected) ? "" : this.background,
				"color": (isSelected) ? "" : this.fontColor
			});
		}
	},

	/**
	 * Schedule item double click event handler.
	 * @private
	 * @param {Object} event Click event.
	 * @param {Boolean} silent Event execution flag.
	 */
	onScheduleItemDoubleClick: function(event, silent) {
		this.setSelected(event, silent);
		this.scheduler.fireEvent("scheduleItemDoubleClick", this);
	},

	/**
	 * Schedule item click event handler.
	 * @private
	 * @param {Object} event Click event.
	 * @param {Boolean} silent Event execution flag.
	 */
	onScheduleItemClick: function(event, silent) {
		const canExecute = this.canExecute({
			method: this.onScheduleItemClick,
			args: arguments
		});
		if (canExecute === false) {
			const browserEvent = event.browserEvent;
			Ext.EventManager.stopEvent(browserEvent);
			return;
		}
		this.setSelected(event, silent);
		const target = this.getWrapEl();
		if (target) {
			this.scheduler.fireEvent("scheduleItemClick", {targetId: target.id});
			target.focus();
		}
	},

	/**
	 * Schedule item title mouse over event handler.
	 * @private
	 */
	onScheduleItemTitleMouseOver: function() {
		var target = this.getWrapEl();
		this.scheduler.fireEvent("scheduleItemTitleMouseOver", {targetId: target.id}, {recordId: this.itemId});
	},

	/**
	 * Schedule item title click event handler.
	 * @private
	 * @param {Object} event Click event.
	 * @param {Boolean} silent Event execution flag.
	 */
	onScheduleItemTitleClick: function(event, silent) {
		this.setSelected(event, silent);
		var target = this.getWrapEl();
		this.scheduler.fireEvent("scheduleItemTitleClick", {targetId: target.id}, {recordId: this.itemId});
	},

	/**
	 * Schedule item title double click event handler.
	 * @param {Object} event  Double click event.
	 */
	onScheduleItemTitleDoubleClick: function(event) {
		event.stopEvent();
	},

	/**
	 * Handler for key-down event.
	 * @protected
	 * @param {Object} event Event object.
	 * @return {Boolean}
	 */
	onKeyDown: function(event) {
		switch (event.keyCode) {
			case event.ENTER:
				event.preventDefault();
				this.onEnterKeyPressed(event);
				return false;
			case event.TAB:
				event.preventDefault();
				this.onTabKeyPressed(event);
				return false;
			case event.UP:
				event.preventDefault();
				this.onUpKeyPressed(event);
				return false;
			case event.DOWN:
				event.preventDefault();
				this.onDownKeyPressed(event);
				return false;
			case event.LEFT:
				event.preventDefault();
				this.onLeftKeyPressed(event);
				return false;
			case event.RIGHT:
				event.preventDefault();
				this.onRightKeyPressed(event);
				return false;
		}
	},

	/**
	 * @protected
	 */
	onEnterKeyPressed: function() {
		if (!_.isEmpty(this.scheduler.selectedItems)) {
			this.scheduler.fireEvent("scheduleItemDoubleClick", this);
		}
	},

	/**
	 * @protected
	 */
	onTabKeyPressed: function(event) {
		const itemId = this.scheduler.selectedItems[0];
		if (itemId) {
			const collection = this.scheduler.getSortedCollection();
			const item = Terrasoft.findWhere(collection, {itemId: itemId});
			const index = collection.indexOf(item);
			const step = event.shiftKey ? -1 : 1;
			const nextItem = collection[index + step];
			if (nextItem) {
				this.scheduler.setSelectedItems([nextItem.itemId]);
				nextItem.focus();
			}
		}
	},

	/**
	 * @protected
	 */
	onUpKeyPressed: function(event) {
		this._changeItemTime(event, this.scheduler.selectedItems[0], -1);
	},

	/**
	 * @protected
	 */
	onDownKeyPressed: function(event) {
		this._changeItemTime(event, this.scheduler.selectedItems[0], 1);
	},

	/**
	 * @protected
	 */
	onLeftKeyPressed: function(event) {
		this._changeItemDay(event, this.scheduler.selectedItems[0], -1);
	},

	/**
	 * @protected
	 */
	onRightKeyPressed: function(event) {
		this._changeItemDay(event, this.scheduler.selectedItems[0], 1);
	},

	/**
	 * @private
	 */
	_changeItemTime: function(event, itemId, value) {
		const item = Terrasoft.findWhere(this.scheduler.collection, {itemId: itemId});
		if (item && !item.isMultiDayItem()) {
			let interval;
			if (event.ctrlKey) {
				interval = Ext.Date.HOUR;
			} else {
				interval = Ext.Date.MINUTE;
				value *= this.scheduler.getTimeScale();
			}
			const oldStartDate = item.startDate;
			const oldDueDate = item.dueDate;
			const newStartDate = event.shiftKey ? oldStartDate : Ext.Date.add(oldStartDate, interval, value);
			const newDueDate = Ext.Date.add(oldDueDate, interval, value);
			const dayNotChanged = Terrasoft.areDatesEqual(oldStartDate, newStartDate) &&
				Terrasoft.areDatesEqual(oldDueDate, newDueDate);
			if (dayNotChanged) {
				item._changeDates(newStartDate, newDueDate);
			}
		}
	},

	/**
	 * @private
	 */
	_changeItemDay: function(event, itemId, value) {
		const item = Terrasoft.findWhere(this.scheduler.collection, {itemId: itemId});
		if (item) {
			const startDate = (event.shiftKey && item.isMultiDayItem())
				? item.startDate
				: Ext.Date.add(item.startDate, Ext.Date.DAY, value);
			const dueDate = Ext.Date.add(item.dueDate, Ext.Date.DAY, value);
			item._changeDates(startDate, dueDate);
		}
	},

	/**
	 * @protected
	 */
	_changeDates: function(startDate, dueDate) {
		const minDate = this.scheduler.startDate;
		const maxDate = Ext.Date.add(this.scheduler.dueDate, Ext.Date.DAY, 1);
		if (startDate >= minDate && dueDate <= maxDate) {
			this.startDate = startDate;
			if (dueDate > this.startDate) {
				this.dueDate = dueDate;
			}
			if (this.isMultiDayItem()) {
				this.scheduler.multiDayItemPositionProcess();
			}
			this.fireEvent("changeStartDate", this.startDate, this);
			this.fireEvent("changeDueDate", this.dueDate, this);
			this.scheduler.fireEvent("change", this);
			this.reRender();
			this.focus();
		}
	},

	/**
	 * @protected
	 */
	focus: function() {
		const wrapEl = this.getWrapEl();
		if (wrapEl) {
			wrapEl.focus();
		}
	},

	/**
	 * Subscribes title events.
	 * @private
	 */
	subscribeTitleEvents: function() {
		var titleEl = this.getTitleEl();
		titleEl.on("mouseover", this.onScheduleItemTitleMouseOver, this);
		titleEl.on("click", Terrasoft.debounce(this.onScheduleItemTitleClick, this.clickHandlerTimeout, true), this);
		titleEl.on("dblclick", this.onScheduleItemTitleDoubleClick, this);
	},

	/**
	 * Unsubscribes title events.
	 * @private
	 */
	unSubscribeTitleEvents: function() {
		var titleEl = this.getTitleEl();
		if (titleEl) {
			titleEl.un("mouseover", this.onScheduleItemTitleMouseOver, this);
			titleEl.un("click", this.onScheduleItemTitleClick, this);
			titleEl.un("dblclick", this.onScheduleItemTitleDoubleClick, this);
		}
	},

	/**
	 * Initialization of the calendar component
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.selectors = {
			wrapEl: ""
		};
		this.addEvents(
			/**
			 * @event changeTitle
			 * This is triggerd when the header changes
			 */
			"changeTitle",
			/**
			 * @event changeStartDate
			 * This is triggered when the start date changes
			 */
			"changeStartDate",
			/**
			 * @event changeDueDate
			 * This is triggered when the end date changes
			 */
			"changeDueDate",
			/**
			 * @event changeStatus
			 * This is triggered when the status changes
			 */
			"changeStatus"
		);
	},

	/**
	 * Returns title element.
	 * @protected
	 * @return {Ext.dom.Element} Title element.
	 */
	getTitleEl: function() {
		var titleEl = this.titleEl;
		var multiDayItemTitleEl = this.multiDayItemTitleEl;
		if (titleEl) {
			return titleEl;
		} else if (multiDayItemTitleEl) {
			return multiDayItemTitleEl;
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @protected
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		wrapEl.on("click", Terrasoft.debounce(this.onScheduleItemClick, this.clickHandlerTimeout, true), this);
		wrapEl.on("dblclick", this.onScheduleItemDoubleClick, this);
		this.subscribeTitleEvents();
		wrapEl.on("keydown", this.onKeyDown, this);
	},

	/**
	 * Destroys a calendar item
	 * @protected
	 * @override
	 */
	onDestroy: function() {
		var wrapEl = this.getWrapEl();
		if (wrapEl) {
			wrapEl.un("click", this.onScheduleItemClick, this);
			wrapEl.un("dblclick", this.onScheduleItemDoubleClick, this);
			wrapEl.un("keydown", this.onKeyDown, this);
		}
		this.unSubscribeTitleEvents();
		this.callParent(arguments);
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @protected
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var itemBindConfig = {
			itemId: {
				changeMethod: "onItemIdChange"
			},
			title: {
				changeMethod: "onTitleChange",
				changeEvent: "changeTitle"
			},
			startDate: {
				changeMethod: "onStartDateChange",
				changeEvent: "changeStartDate"
			},
			dueDate: {
				changeMethod: "onDueDateChange",
				changeEvent: "changeDueDate"
			},
			status: {
				changeMethod: "onStatusChange",
				changeEvent: "changeStatus"
			},
			background: {
				changeMethod: "onBackgroundChange"
			},
			fontColor: {
				changeMethod: "onFontColorChange"
			},
			isBold: {
				changeMethod: "onIsBoldChange"
			},
			isItalic: {
				changeMethod: "onIsItalicChange"
			},
			isUnderline: {
				changeMethod: "onIsUnderlineChange"
			}
		};
		Ext.apply(itemBindConfig, bindConfig);
		return itemBindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#setControlInitialValue
	 * @override
	 */
	setControlInitialValue: function(binding, model) {
		var propertyValue = this.getBindingValue(binding, model);
		if (Ext.isDate(propertyValue)) {
			propertyValue = new Date(propertyValue);
		}
		var changeMethodName = binding.config.changeMethod;
		var bindInitialValueConfig = this.bindInitialValueConfig;
		if (!bindInitialValueConfig.hasOwnProperty(changeMethodName)) {
			return;
		}
		var bindPropertyName = bindInitialValueConfig[changeMethodName];
		this[bindPropertyName] = propertyValue;
	},

	/**
	 * Handler of the "onItemIdChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onItemIdChange: function(value) {
		this.itemId = value;
	},

	/**
	 * Handler of the "onTitleChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onTitleChange: function(value) {
		this.title = value;
		this.show();
	},

	/**
	 * Handler of the "onStartDateChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onStartDateChange: function(value) {
		this.startDate = value;
		this.show();
	},

	/**
	 * Handler of the "onDueDateChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onDueDateChange: function(value) {
		this.dueDate = value;
		this.show();
	},

	/**
	 * Handler of the "onStatusChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onStatusChange: function(value) {
		this.setStatus(value);
		this.show();
	},

	/**
	 * Handler of the "onBackgroundChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onBackgroundChange: function(value) {
		this.background = value;
		this.show();
	},

	/**
	 * Handler of the "onFontColorChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onFontColorChange: function(value) {
		this.fontColor = value;
		this.show();
	},

	/**
	 * Handler of the "onIsBoldChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onIsBoldChange: function(value) {
		this.isBold = value;
		this.show();
	},

	/**
	 * Handler of the "onIsItalicChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onIsItalicChange: function(value) {
		this.isItalic = value;
		this.show();
	},

	/**
	 * Handler of the "onIsUnderlineChange" event
	 * @protected
	 * @param {Terrasoft.BaseViewModel} value
	 */
	onIsUnderlineChange: function(value) {
		this.isUnderline = value;
		this.show();
	},

	/**
	 * Calculates data for template
	 * @protected
	 * @override
	 * throws {Terrasoft.ItemNotFoundException}
	 * If no suitable configuration is found among the configurations, then
	 * an error will be generated that will be processed in the XTemplate, so the only way to detect this
	 * error is to view the logs.
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.selectors.wrapEl = Ext.String.format("#{0}-scheduleritem", this.id);
		var isMultiDayItem = this.isMultiDayItem();
		var classes = (isMultiDayItem) ? this.multiDayItemConfig.classes : this.oneDayItemConfig.classes;
		var styles = {};
		var selectors = this.selectors;
		selectors.titleEl = Ext.String.format("#{0}-scheduleritem .scheduleritem-title", this.id);
		selectors.multiDayItemTitleEl = Ext.String.format("#{0}-scheduleritem .multi-day-item-title", this.id);
		if (isMultiDayItem) {
			selectors.resizeLeft = ".multi-day-item-resize-left";
			selectors.resizeRight = ".multi-day-item-resize-right";
			styles.top = Ext.String.format("{0}px", this.top);
			styles.left = Ext.String.format("{0}px", this.left);
			styles.width = Ext.String.format("{0}px", this.width - this.rightSpace);
		} else {
			selectors.resizeTop = selectors.wrapEl + "-resize-top";
			selectors.resizeBottom = selectors.wrapEl + "-resize-bottom";
			var startDate = new Date(this.startDate);
			this.top = this.getTimePosition(startDate);
			styles.top = Ext.String.format("{0}em", this.top);
			if (Terrasoft.getIsRtlMode()) {
				styles.right = Ext.String.format("{0}%", this.left);
			} else {
				styles.left = Ext.String.format("{0}%", this.left);
			}
			styles.width = Ext.String.format("{0}%", this.width - this.rightSpace);
			styles.height = Ext.String.format("{0}em", this.getHeight());
		}
		tplData.scheduleItemClass = classes.scheduleItemClass;
		tplData.scheduleItemResizeTopClass = classes.scheduleItemResizeTopClass;
		tplData.scheduleItemResizeBottomClass = classes.scheduleItemResizeBottomClass;
		tplData.scheduleItemStatusClass = classes.scheduleItemStatusClass;
		tplData.scheduleItemCaptionClass = classes.scheduleItemCaptionClass;
		tplData.scheduleItemLeftCaptionClass = classes.scheduleItemLeftCaptionClass;
		tplData.scheduleItemTitleClass = classes.scheduleItemTitleClass;
		tplData.schedulerItemStyle = styles;
		tplData.prepareSchedulerItem = function(out, values) {
			var encodeHtml = Terrasoft.encodeHtml;
			var schedulerItem = values.self;
			var status = schedulerItem.status;
			var isSelected = schedulerItem.isSelected;
			var schedulerItemStatusClasses = values.scheduleItemStatusClass;
			var schedulerItemCaptionClass = values.scheduleItemCaptionClass;
			var schedulerItemLeftCaptionClass = values.scheduleItemLeftCaptionClass;
			var schedulerItemTitleClass = values.scheduleItemTitleClass;
			var doShowCaption = schedulerItem.getHeight() > schedulerItem.timeItemHeight;
			var caption = (doShowCaption) ? schedulerItem.getItemCaption() : "";
			var title = encodeHtml(schedulerItem.title);
			var markerValue = encodeHtml(schedulerItem.markerValue);
			var itemStyle = "";
			var background = schedulerItem.background;
			var fontColor = schedulerItem.fontColor;
			var isBold = schedulerItem.isBold;
			var isItalic = schedulerItem.isItalic;
			var isUnderline = schedulerItem.isUnderline;
			itemStyle = ((fontColor) && (!isSelected)) ? (itemStyle + "color: " + fontColor + "; ") : itemStyle;
			itemStyle = (isBold) ? (itemStyle + "font-weight: bold; ") : itemStyle;
			itemStyle = (isItalic) ? (itemStyle + "font-style: italic; ") : itemStyle;
			itemStyle = (isUnderline) ? (itemStyle + "text-decoration: underline; ") : itemStyle;
			if (background && isSelected) {
				out.push("<div style=\"background: " + background + ";\" class=\"" + schedulerItemStatusClasses[status] +
					" " + schedulerItemStatusClasses[0] + "\">");
			} else if (background && !isSelected) {
				out.push("<div style=\"background: " + background + ";\" class=\"" + schedulerItemStatusClasses[status] +
					"\">");
			} else if (!background && isSelected) {
				out.push("<div class=\"" + schedulerItemStatusClasses[status] + " " + schedulerItemStatusClasses[0] +
					"\">");
			} else {
				out.push("<div class=\"" + schedulerItemStatusClasses[status] + "\">");
			}
			if (schedulerItem.isMultiDayItem()) {
				out.push("<div class=\"" + schedulerItemLeftCaptionClass + "\">" + schedulerItem.getLeftCaption() +
					"</div>");
			}
			out.push("<div class=\"" + schedulerItemCaptionClass + "\">" + caption + "</div>");
			itemStyle = itemStyle.length === 0 ? "" : Ext.String.format(" style=\"{0}\" ", itemStyle);
			markerValue = (markerValue) ? Ext.String.format(" data-item-marker=\"{0}\"", markerValue) : "";
			title = Ext.String.format("<div class=\"{0}\"{1}{2}>{3}</div>", schedulerItemTitleClass, itemStyle,
				markerValue, title);
			out.push(title);
			out.push("</div>");
		};
		return tplData;
	},

	/**
	 * Handler of the "afterrender" event
	 * @protected
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.initDd();
		var wrapEl = this.getWrapEl();
		wrapEl.unselectable();
	},

	/**
	 * Handler of the "afterrerender" event
	 * @protected
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.initDd();
		var wrapEl = this.getWrapEl();
		wrapEl.unselectable();
	},

	/**
	 * Calendar item render
	 */
	show: function() {
		var container = this.getRenderTo();
		if (!container) {
			this.setVisible(false);
		} else {
			this.visible = true;
			if (!this.rendered) {
				this.render(container);
			} else {
				this.reRender(null, container);
			}
		}
	},

	/**
	 * Returns the position of the specified date
	 * @param {Date} date The date
	 * @param {Boolean} isExact Parameter that determines the accuracy of the calculation
	 * false - the result will be a multiple of the time intervals
	 * true - the result will be accurate
	 * @return {Number} Returns the item's start date position
	 */
	getTimePosition: function(date, isExact) {
		var timeItemHeight = this.timeItemHeight;
		var minutes = Terrasoft.getMinutesFromMidnight(date);
		return this.getTimeItemNumber(minutes, isExact) * timeItemHeight;
	},

	/**
	 * Calculates the number of time intervals relative to the time scale
	 * @param {Number} minuteCount Number of minutes
	 * @param {Boolean} isExact Parameter that determines the accuracy of the calculation
	 * false - the result will be a multiple of the time intervals
	 * true - the result will be accurate
	 * @return {Number} Returns the number of time intervals relative to the time scale
	 */
	getTimeItemNumber: function(minuteCount, isExact) {
		var timeScale = this.getTimeScale();
		var result = 0;
		if (isExact) {
			result = minuteCount / timeScale;
		} else {
			result = (Math.floor(minuteCount / timeScale));
		}
		return result - (this.scheduler.startHour * 60 / timeScale);
	},

	/**
	 * Calculates the height of the task depending on the scale
	 * @return {Number} The height of the task depending on the scale

	 */
	getHeight: function() {
		var timeItemHeight = this.timeItemHeight;
		return this.getTimeItemCount() * timeItemHeight;
	},

	/**
	 * Calculates the number of time units occupied by an element
	 * @return {Number} The number of time units occupied by an element
	 */
	getTimeItemCount: function() {
		var millisecondsInMinute = Terrasoft.DateRate.MILLISECONDS_IN_MINUTE;
		var timeScale = this.getTimeScale();
		var epsilon = 1 / (timeScale * millisecondsInMinute);
		var startDate = this.startDate.getTime();
		var dueDate = this.dueDate.getTime();
		var startRangeValue = startDate / (timeScale * millisecondsInMinute);
		var dueRangeValue = dueDate / (timeScale * millisecondsInMinute);
		startRangeValue = Math.abs(Math.round(startRangeValue) - startRangeValue) < epsilon
			? Math.round(startRangeValue)
			: startRangeValue;
		dueRangeValue = Math.abs(Math.round(dueRangeValue) - dueRangeValue) < epsilon
			? Math.round(dueRangeValue)
			: dueRangeValue;
		var timeItemCount = Math.ceil(dueRangeValue) - Math.floor(startRangeValue);
		return (timeItemCount > 0) ? timeItemCount : 1;
	},

	/**
	 * Gets the item width (%)
	 * @return {Number} Item width (%)
	 */
	getWidth: function() {
		return this.width;
	},

	/**
	 * Returns the position of the element along the Y axis
	 * @return {Number} The position of the element along the Y axis
	 */
	getTop: function() {
		return this.top;
	},

	/**
	 * Returns the View Model collection model Id
	 * @return {String} The View Model collection model Id
	 */
	getViewModelCollectionItemId: function() {
		return this.viewModelCollectionItemId;
	},

	/**
	 * Gets the record Id
	 * @return {String} Record Id
	 */
	getItemId: function() {
		return this.itemId;
	},

	/**
	 * Returns start date.
	 * @return {Date} Start date.
	 */
	getStartDate: function() {
		return this.startDate;
	},

	/**
	 * Returns due date.
	 * @return {Date} Due date.
	 */
	getDueDate: function() {
		return this.dueDate;
	},

	/**
	 * Gets the indication that the item is selected
	 * @return {Boolean} The indication that the item is selected
	 */
	getIsSelected: function() {
		return this.isSelected;
	},

	/**
	 * Check element and fire click event.
	 * @param {Object} event Click event.
	 * @param {Boolean} silent Event execution flag.
	 */
	setSelected: function(event, silent) {
		if (event) {
			event.stopEvent(event);
		}
		var scheduler = this.scheduler;
		scheduler.unSelectItems();
		this.isSelected = true;
		scheduler.getSelectedItems();
		if (silent !== true) {
			scheduler.fireEvent("changeSelectedItems");
		}
		this.updateItemSelectionStyle(true);
	},

	/**
	 * Clears the item selection.
	 * @param {Boolean} silent Indicates the need to run the event
	 * of updating the list of selected items.
	 */
	setNotSelected: function(silent) {
		this.isSelected = false;
		if (silent !== true) {
			this.scheduler.fireEvent("changeSelectedItems");
		}
		this.updateItemSelectionStyle(false);
	},

	/**
	 * Sets the Id of the View Model collection
	 * @param {String} value The Id of the View Model collection
	 */
	setViewModelCollectionItemId: function(value) {
		this.viewModelCollectionItemId = value;
		this.tag = value;
	},

	/**
	 * Sets the item title
	 * @param {String} title The item title
	 */
	setTitle: function(title) {
		if (this.title === title) {
			return;
		}
		this.title = title;
		this.fireEvent("changeTitle", this.title, this);
		this.scheduler.fireEvent("change", this);
	},

	/**
	 * Sets the element status
	 * @param {Terrasoft.ScheduleItemStatus} status The element status
	 */
	setStatus: function(status) {
		if ((status !== Terrasoft.ScheduleItemStatus.NEW) && (status !== Terrasoft.ScheduleItemStatus.DONE) &&
			(status !== Terrasoft.ScheduleItemStatus.OVERDUE)) {
			throw new Terrasoft.NotImplementedException({
				message: Terrasoft.Resources.Controls.ScheduleEdit.SchedulerItemStatusIsNotValid
			});
		}
		if (this.status === status) {
			return;
		}
		this.status = status;
		this.fireEvent("changeStatus", this.status, this);
		this.scheduler.fireEvent("change", this);
	},

	/**
	 * Updates the element start date
	 * @param {Date} date The element start date
	 * @param {Boolean} pointInsideMultiDayItemArea Indicates that the task is in the multi-day task area
	 * @return {Boolean} Returns true if the update is successful
	 */
	updateDuration: function(date, pointInsideMultiDayItemArea) {
		var dueDate;
		var changeDate = [];
		var doMultiDayItemPositionProcess = true;
		var isMultiDayItem = this.isMultiDayItem();
		var scheduler = this.scheduler;
		if (pointInsideMultiDayItemArea && !isMultiDayItem) {
			dueDate = Terrasoft.addDays(date, 1);
			changeDate.push(this.startDate);
		} else if (!pointInsideMultiDayItemArea && isMultiDayItem) {
			dueDate = Terrasoft.addMinutes(date, this.getTimeScale());
			changeDate.push(date);
		} else {
			var timeScale = this.getTimeScale();
			var startDate = new Date(this.startDate);
			var minutesDiff;
			date = this.getNewDateByScale(startDate, date, timeScale);
			if (Ext.Date.isEqual(startDate, date)) {
				if (isMultiDayItem) {
					scheduler.multiDayItemPositionProcess();
				}
				this.show();
				return true;
			}
			changeDate.push(date);
			if (!Terrasoft.areDatesEqual(date, startDate)) {
				changeDate.push(startDate);
			}
			dueDate = new Date(this.dueDate);
			minutesDiff = (dueDate - startDate) / Terrasoft.DateRate.MILLISECONDS_IN_MINUTE;
			dueDate = Terrasoft.addMinutes(date, minutesDiff);
			doMultiDayItemPositionProcess = isMultiDayItem;
		}
		this.startDate = date;
		this.dueDate = new Date(dueDate);
		scheduler.itemPositionProcess(changeDate);
		if (doMultiDayItemPositionProcess) {
			scheduler.multiDayItemPositionProcess();
		}
		this.fireEvent("changeStartDate", this.startDate, this);
		this.fireEvent("changeDueDate", this.dueDate, this);
		scheduler.fireEvent("change", this);
		return true;
	},

	/**
	 * Sets item's start date.
	 * @param {Date} date The date.
	 * @return {Boolean} True, if the new value has been set. False, if the two dates match.
	 */
	setStartDate: function(date) {
		var startDate = this.startDate;
		if (Ext.Date.isEqual(startDate, date)) {
			return false;
		}
		var changeDate = [];
		changeDate.push(date);
		if (!Terrasoft.areDatesEqual(date, startDate)) {
			changeDate.push(startDate);
		}
		var dueDate = this.dueDate;
		var minutesDiff = dueDate - date;
		if (minutesDiff < 0) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.ScheduleEdit.DaysCountShouldBeGreaterThenZero
			});
		}
		this.startDate = date;
		this.fireEvent("changeStartDate", this.startDate, this);
		this.scheduler.fireEvent("change", this);
		var scheduler = this.scheduler;
		scheduler.multiDayItemPositionProcess();
		scheduler.itemPositionProcess(changeDate);
		return true;
	},

	/**
	 * Sets the item's end date.
	 * @param {Date} date The date.
	 * @return {Boolean} True, if the new value has been set. False, if date values match.
	 */
	setDueDate: function(date) {
		var dueDate = this.dueDate;
		if (Ext.Date.isEqual(dueDate, date)) {
			return false;
		}
		var changeDate = [];
		changeDate.push(date);
		if (!Terrasoft.areDatesEqual(date, dueDate)) {
			changeDate.push(dueDate);
		}
		var startDate = this.startDate;
		var minutesDiff = date - startDate;
		if (minutesDiff < 0) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.ScheduleEdit.DaysCountShouldBeGreaterThenZero
			});
		}
		var isMultiDayItem = this.isMultiDayItem();
		if (!isMultiDayItem && ((Math.abs(date.getDate() - dueDate.getDate()) === 1) && (date.getHours() === 0) &&
			(date.getMinutes() === 0))) {
			date = new Date(date - 1);
		} else if (isMultiDayItem) {
			date = Terrasoft.addDays(date, 1);
		}
		this.dueDate = date;
		this.fireEvent("changeDueDate", this.dueDate, this);
		this.scheduler.fireEvent("change", this);
		var scheduler = this.scheduler;
		scheduler.multiDayItemPositionProcess();
		scheduler.itemPositionProcess(changeDate);
		return true;
	},

	/**
	 * Sets the X axis position of the element
	 * @param {Number} left X-axis position value of the element
	 */
	setLeft: function(left) {
		if (this.left === left) {
			return;
		}
		this.left = left;
	},

	/**
	 * Sets the width of an element
	 * @param {Number} width The element width
	 */
	setWidth: function(width) {
		if (this.width === width) {
			return;
		}
		this.width = width;
	},

	/**
	 * Sets element top position.
	 * @param {Number} Element top position.
	 */
	setTop: function(top) {
		if (this.top === top) {
			return;
		}
		this.top = top;
	},

	/**
	 * Initializing the allowable values for moving the D&D element.
	 * @protected
	 * @param {Object} dragEl Element of the D&D.
	 */
	initScheduleItemDDTicksOnMove: function(dragEl) {
		var ddEl = Ext.get(dragEl.getEl());
		var item = dragEl.config.item;
		var scheduler = item.scheduler;
		var schedulerId = scheduler.id;
		var schedulerDayColumnArea = Ext.getElementById(schedulerId + "-scheduler-day-column-area");
		var firstColumn = Terrasoft.getIsRtlMode()
			? schedulerDayColumnArea.lastChild
			: schedulerDayColumnArea.firstChild;
		var lastColumn = Terrasoft.getIsRtlMode()
			? schedulerDayColumnArea.firstChild
			: schedulerDayColumnArea.lastChild;
		var schedulerDayColumnAreaFirstChildElBox = item.getElementBox(firstColumn);
		var schedulerDayColumnAreaLastChildElBox = item.getElementBox(lastColumn);
		var xLeft = schedulerDayColumnAreaFirstChildElBox.left;
		dragEl.minX = dragEl.initPageX = xLeft;
		var scrollbarSize = Ext.getScrollbarSize();
		var xRightNumber = schedulerDayColumnAreaLastChildElBox.right - ddEl.getWidth();
		var xRight = !scrollbarSize.width ? xRightNumber : (xRightNumber + scrollbarSize.width);
		dragEl.maxX = xRight;
		var tickX = schedulerDayColumnAreaFirstChildElBox.width;
		dragEl.setXTicks(xLeft, tickX);
		var schedulerDayRowArea = Ext.get(schedulerId + "-scheduler-day-row-area");
		var schedulerDayRowAreaDom = schedulerDayRowArea.dom;
		var schedulerDayRowAreaLastChildElBox = item.getElementBox(schedulerDayRowAreaDom.lastChild);
		var schedulerDayRowAreaFirstChildElBox = item.getElementBox(schedulerDayRowAreaDom.firstChild);
		var yTop = schedulerDayRowAreaFirstChildElBox.top;
		var ddElHeight = Ext.isIE ? ddEl.getHeight() / 2 : ddEl.getHeight();
		var yBottom = schedulerDayRowAreaLastChildElBox.bottom - ddElHeight;
		dragEl.minY = dragEl.initPageY = yTop;
		dragEl.maxY = yBottom;
		var tickY = schedulerDayRowAreaLastChildElBox.height;
		dragEl.setYTicks(yTop, tickY);
		var viewArea = Ext.get(schedulerId + "-scroll-area");
		var viewAreaBox = viewArea.getBox();
		var yTicks = dragEl.yTicks;
		var top = viewAreaBox.top;
		var bottom = viewAreaBox.bottom;
		yTicks = Ext.Array.filter(yTicks, function(item) {
			if (item <= bottom && item >= top) {
				return true;
			}
		});
		var scheduleMultiDayItemAreaBox = scheduler.multiDayItemArea.getBox();
		var multiDayItemAreaYTicks = this.getYTicksForMultiDayItemArea(scheduleMultiDayItemAreaBox);
		dragEl.yTicks = Ext.Array.merge(multiDayItemAreaYTicks, yTicks);
	},

	/**
	 * Calculates an array of moving points of an element vertically
	 * @protected
	 * @param {Object} scheduleItemDayItemAreaBox object with the dimensions of the area of multi-day tasks
	 */
	getYTicksForMultiDayItemArea: function(scheduleItemDayItemAreaBox) {
		var yTicks = [];
		var multiDayItemHeight = this.multiDayItemHeight;
		var MultiDayItemAreaLayoutSizes = Terrasoft.MultiDayItemAreaLayoutSizes;
		var top = scheduleItemDayItemAreaBox.top + MultiDayItemAreaLayoutSizes.MULTI_DAY_ITEM_PADDING_TOP;
		var bottom = scheduleItemDayItemAreaBox.bottom - MultiDayItemAreaLayoutSizes.MULTI_DAY_ITEM_PADDING_BOTTOM;
		yTicks.push(top);
		while (top < bottom) {
			top = top + multiDayItemHeight + MultiDayItemAreaLayoutSizes.BORDER_HEIGHT;
			yTicks.push(top);
		}
		return yTicks;
	},

	/**
	 * Initializes resize constraints of the D&D element.
	 * @protected
	 * @param {Object} dragEl D&D element.
	 * @param {Terrasoft.DDAction} resizeDirection Resize direction.
	 */
	initScheduleItemDDTicksOnHorizontalResize: function(dragEl, resizeDirection) {
		var item = dragEl.config.item;
		var scheduler = item.scheduler;
		var schedulerId = scheduler.id;
		var schedulerDayColumnArea = Ext.get(schedulerId + "-scheduler-day-column-area");
		dragEl.setYConstraint(0, 0, 0);
		var borderWidth = Terrasoft.MultiDayItemAreaLayoutSizes.BORDER_WIDTH;
		var resizeParams = this._getConstraintResizeParams(item, schedulerDayColumnArea, borderWidth, resizeDirection);
		dragEl.setXConstraint(resizeParams.xLeft, resizeParams.xRight, resizeParams.tickWidth);
	},

	/**
	 * Returns drag element resize constraints for resizing.
	 * @private
	 * @param {Object} item D&D element config item.
	 * @param {Object} schedulerDayColumnArea D&D scheduler day column area.
	 * @param {Number} borderWidth D&D element border width.
	 * @param {Terrasoft.DDAction} resizeDirection Resize direction.
	 * @return {Object} Resize constraints.
	 */
	_getConstraintResizeParams: function(item, schedulerDayColumnArea, borderWidth, resizeDirection) {
		var itemWrapEl = item.getWrapEl();
		var itemBox = itemWrapEl.getBox();
		if (Terrasoft.getIsRtlMode()) {
			if (resizeDirection === Terrasoft.DDAction.RESIZE_LEFT) {
				return this._getConstraintResizeParamsLeft(itemBox,
					item.getElementBox(schedulerDayColumnArea.dom.lastChild), borderWidth);
			} else {
				return this._getConstraintResizeParamsRight(itemBox,
					item.getElementBox(schedulerDayColumnArea.dom.firstChild), borderWidth);
			}
		} else if (resizeDirection === Terrasoft.DDAction.RESIZE_LEFT) {
			return this._getConstraintResizeParamsLeft(itemBox,
				item.getElementBox(schedulerDayColumnArea.dom.firstChild), borderWidth);
		} else {
			return this._getConstraintResizeParamsRight(itemBox,
				item.getElementBox(schedulerDayColumnArea.dom.lastChild), borderWidth);
		}
	},

	/**
	 * Returns drag element resize constraints for the left side resizing.
	 * @private
	 * @param {Object} itemBox D&D element itemBox.
	 * @param {Object} dayColumnItemBox D&D column element itemBox.
	 * @param {Number} borderWidth D&D element border width.
	 * @return {Object} Resize constraints.
	 */
	_getConstraintResizeParamsLeft: function(itemBox, dayColumnItemBox, borderWidth) {
		var xLeft;
		var xRight;
		var tickWidth = dayColumnItemBox.width;
		xLeft = itemBox.left - dayColumnItemBox.left;
		xLeft = xLeft + Math.ceil(xLeft / tickWidth) * borderWidth;
		xRight = itemBox.width - tickWidth;
		xRight = xRight + Math.ceil(xRight / tickWidth) * borderWidth;
		return {
			xLeft: xLeft,
			xRight: xRight,
			tickWidth: tickWidth
		};
	},

	/**
	 * Returns drag element resize constraints for the right side resizing.
	 * @private
	 * @param {Object} itemBox D&D element itemBox.
	 * @param {Object} dayColumnItemBox D&D column element itemBox.
	 * @param {Number} borderWidth D&D element border width.
	 * @return {Object} Resize constraints.
	 */
	_getConstraintResizeParamsRight: function(itemBox, dayColumnItemBox, borderWidth) {
		var xLeft;
		var xRight;
		var tickWidth = dayColumnItemBox.width;
		xLeft = itemBox.width - tickWidth;
		xLeft = xLeft + Math.ceil(xLeft / tickWidth) * borderWidth;
		xRight = dayColumnItemBox.right - itemBox.right;
		xRight = xRight + Math.ceil(xRight / tickWidth) * borderWidth;
		return {
			xLeft: xLeft,
			xRight: xRight,
			tickWidth: tickWidth
		};
	},

	/**
	 * Initializing the allowable values for changing the size of the top of the Drag-and-Drop element
	 * @protected
	 * @param {Object} dragEl The Drag-and-Drop element
	 */
	initScheduleItemDDTicksOnResizeTop: function(dragEl) {
		var item = dragEl.config.item;
		var scheduler = item.scheduler;
		var schedulerId = scheduler.id;
		var schedulerDayRowArea = Ext.get(schedulerId + "-scheduler-day-row-area");
		var schedulerDayRowAreaFirstChildElBox = item.getElementBox(schedulerDayRowArea.dom.firstChild);
		dragEl.setXConstraint(0, 0, 0);
		var yTop = schedulerDayRowAreaFirstChildElBox.top;
		var tick = schedulerDayRowAreaFirstChildElBox.height;
		var itemWrapEl = item.getWrapEl();
		var itemWrapElBottom = itemWrapEl.getBottom();
		// BrowserSupport: IE
		// Adjustment of allowable values for Drag-and-Drop
		var yBottom = (Ext.isIE) ? itemWrapElBottom : (itemWrapElBottom - tick);
		dragEl.minY = dragEl.initPageY = yTop;
		dragEl.maxY = yBottom;
		dragEl.setYTicks(yTop, tick);
	},

	/**
	 * Initializing the allowed values for resizing the bottom of the Drag-and-Drop element
	 * @protected
	 * @param {Object} dragEl Drag&drop element
	 */
	initScheduleItemDDTicksOnResizeBottom: function(dragEl) {
		var item = dragEl.config.item;
		var scheduler = item.scheduler;
		var schedulerId = scheduler.id;
		var schedulerDayRowArea = Ext.get(schedulerId + "-scheduler-day-row-area");
		var schedulerDayRowAreaDom = schedulerDayRowArea.dom;
		var schedulerDayRowAreaFirstChildElBox = item.getElementBox(schedulerDayRowAreaDom.firstChild);
		var schedulerDayRowAreaLastChildElBox = item.getElementBox(schedulerDayRowAreaDom.lastChild);
		var tick = schedulerDayRowAreaFirstChildElBox.height;
		dragEl.setXConstraint(0, 0, 0);
		var yTop = item.getWrapEl().getTop() + tick;
		// BrowserSupport: IE
		// Adjustment of allowable values for Drag-and-Drop
		var fixIE = 5;
		var yBottom = Ext.isIE
			? (schedulerDayRowAreaLastChildElBox.bottom + fixIE)
			: schedulerDayRowAreaLastChildElBox.bottom;
		dragEl.minY = dragEl.initPageY = yTop;
		dragEl.maxY = yBottom;
		dragEl.setYTicks(yTop, tick);
	},

	ddItemOverride: {
		b4StartDrag: function() {
			var item = this.config.item;
			item.unSubscribeTitleEvents();
			var scheduler = item.scheduler;
			var el = this.el = Ext.get(this.id);
			this.elStyle = {
				width: el.getStyle("width"),
				left: el.getStyle("left")
			};
			var styles = {
				"z-index": "12"
			};
			if (!item.isMultiDayItem()) {
				styles.width = "100%";
				styles.left = "0";
			}
			el.setStyle(styles);
			scheduler.itemDDEl = {
				item: this,
				action: Terrasoft.DDAction.MOVE
			};
			item.initScheduleItemDDTicksOnMove(this);
			var itemWrapEl = item.getWrapEl();
			item.setSelected();
			var point = itemWrapEl.getXY();
			var multiDayItemAreaBox = scheduler.multiDayItemArea.getBox();
			this.isMultidayItem = this.pointInsideRegion(point, multiDayItemAreaBox);
		},

		onDrag: function(event) {
			var isMultidayItem;
			var item = this.config.item;
			var scheduler = item.scheduler;
			var multiDayItemAreaBox = scheduler.multiDayItemArea.getBox();
			var oneDayArea = Ext.get(scheduler.id + "-scroll-area");
			var oneDayAreaBox = oneDayArea.getBox();
			var ddEl = Ext.get(this.getEl());
			var x = event.getX();
			var y = event.getY();
			isMultidayItem = this.pointInsideRegion([x, y], multiDayItemAreaBox);
			var isItemInsideOneDayItemArea = this.pointInsideRegion([x, y], oneDayAreaBox);
			if (isMultidayItem !== this.isMultidayItem) {
				this.isMultidayItem = isMultidayItem;
				var xTickSize = this.xTickSize;
				var yTickSize = this.yTickSize;
				var isOneDayItemInsideMultiDayItemArea = (isMultidayItem && !item.isMultiDayItem());
				var isMultiDayItemInsideOneDayItemArea = (isItemInsideOneDayItemArea && item.isMultiDayItem());
				if (isOneDayItemInsideMultiDayItemArea) {
					var deltaY = this.deltaY;
					this.deltaY = deltaY - yTickSize * Math.floor(deltaY / yTickSize);
					ddEl.setStyle("position", "fixed");
					ddEl.setHeight(item.multiDayItemHeight);
					ddEl.setWidth(xTickSize);
				} else if (isMultiDayItemInsideOneDayItemArea) {
					ddEl.setWidth(xTickSize);
					var deltaX = this.deltaX;
					this.deltaX = deltaX - xTickSize * Math.floor(deltaX / xTickSize);
					item.initScheduleItemDDTicksOnMove(this);
				}
			}
			x = this.x = this.getTick(x - this.deltaX, this.xTicks);
			y = this.y = this.getTick(y - this.deltaY, this.yTicks);
			ddEl.setXY([x, y]);
		},

		onInvalidDrop: function() {
			this.el.setStyle({
				"z-index": "10",
				"width": this.elStyle.width,
				"left": this.elStyle.left
			});
			this.x = null;
			this.y = null;
			this.invalidDrop = true;
		},

		endDrag: function() {
			var item = this.config.item;
			item.subscribeTitleEvents();
			if (this.invalidDrop === true) {
				item.reRender();
				delete this.invalidDrop;
			}
		},

		/**
		 * @private
		 * @param {Event} event
		 * @return {boolean}
		 */
		_isTargetDisconnected: function(event) {
			const targetElement = event && event.target;
			const isConnectedToDom = targetElement && document.body.contains(targetElement);
			return !isConnectedToDom;
		},

		onDragDrop: function(event) {
			if (this._isTargetDisconnected(event)) {
				return;
			}
			var x = event.getX();
			var y = event.getY();
			if (!this.x || !this.y) {
				this.y = this.getTick(y - this.deltaY, this.yTicks);
				this.x = this.getTick(x - this.deltaX, this.xTicks);
			}
			if (Terrasoft.getIsRtlMode() && this.el.dom) {
				var elWidth = this.el.getWidth();
				var elementTick = this.getTick(x + elWidth - this.deltaX, this.xTicks);
				this.x = x + elWidth - this.deltaX <= this.xTicks[this.xTicks.length - 1]
					? elementTick - this.xTickSize
					: elementTick;
			}
			var item = this.config.item;
			var scheduler = item.scheduler;
			var multiDayItemAreaBox = scheduler.multiDayItemArea.getBox();
			var point = [this.x + this.xTickSize / 2, this.y + this.yTickSize / 2];
			var pointInsideFewDayItemArea = this.pointInsideFewDayItemArea =
				this.pointInsideRegion([x, y], multiDayItemAreaBox);
			var ddm = this.DDMInstance;
			var days = ddm.ids.day;
			var times = ddm.ids.time;
			var date = this.pointInsideDays(point, days);
			var time = (pointInsideFewDayItemArea) ? {hour: 0, minute: 0} : this.pointInsideTimes(point, times);
			if (!date || !time) {
				this.onInvalidDrop();
				return;
			}
			var dateObject = new Date(date.year, date.month, date.day, time.hour, time.minute);
			item.updateDuration(dateObject, pointInsideFewDayItemArea);
			scheduler.itemDDEl = null;
			item.focus();
		},

		pointInsideInterval: function(point, interval) {
			var x = point[0];
			return (interval.left < x && x < interval.right);
		},

		pointInsideDays: function(point, days) {
			for (var i in days) {
				var day = days[i];
				var dayEl = day.getEl();
				var region = Ext.util.Region.getRegion(dayEl);
				var isPointInsideRegion = (this.pointInsideFewDayItemArea) ? this.pointInsideInterval(point, region)
					: this.pointInsideRegion(point, region);
				if (isPointInsideRegion) {
					var date = this.dateRe.exec(dayEl.id);
					var result = {
						day: date[1],
						month: date[2],
						year: date[3]
					};
					result.month = result.month - 1;
					if (result.month.length === 1) {
						result.month += "0";
					}
					return result;
				}
			}
			return false;
		},

		pointInsideTimes: function(point, times) {
			var result;
			for (var i in times) {
				var time = times[i];
				var timeEl = time.getEl();
				var region = Ext.util.Region.getRegion(timeEl);
				if (this.pointInsideRegion(point, region)) {
					var timing = this.timeRe.exec(timeEl.id);
					result = {
						hour: timing[1],
						minute: timing[2]
					};
				}
			}
			return result;
		},

		pointInsideRegion: function(point, region) {
			var x = point[0];
			var y = point[1];
			return !(
				x < region.left ||
				x > region.right ||
				y < region.top ||
				y > region.bottom
			);
		},

		dateRe: new RegExp("(\\d{2})-(\\d{2})-(\\d{4})$"),

		timeRe: new RegExp("(\\d{1,2})-(\\d{1,2})$")
	},

	ddItemResizeTopOverride: {
		b4StartDrag: function() {
			var item = this.config.item;
			var el = this.el = Ext.get(this.id);
			var elParent = this.elParent = el.parent();
			// BrowserSupport: IE8 CR-207952
			if (Ext.isIE8) {
				this.position = {
					top: elParent.getTop(),
					bottom: elParent.getBottom()
				};
			}
			elParent.setStyle({
				"z-index": "11",
				"width": "100%",
				"left": 0
			});
			var scheduler = item.scheduler;
			scheduler.itemDDEl = {
				item: this,
				action: Terrasoft.DDAction.RESIZE_TOP
			};
			item.initScheduleItemDDTicksOnResizeTop(this);
			item.setSelected();
		},

		onDrag: function(event) {
			var parent = this.elParent;
			var parentRegion = parent.getRegion();
			// BrowserSupport: IE8 CR-207952: ### ######### #######(###### ########## #### ### #####): ###### ##########

			// ## ##### ############ ############ ## ######### (############# # ############### ###########)

			var position = this.position;
			if (Ext.isIE8) {
				parentRegion.top = position.top;
				parentRegion.bottom = position.bottom;
				parent.setRegion(parentRegion);
			}
			this.y = this.getTick(event.getY() - this.deltaY, this.yTicks);
			parentRegion.top = this.y;
			// BrowserSupport: IE8 CR-207952: ### ######### #######(###### ########## #### ### #####): ###### ##########

			// ## ##### ############ ############ ## #########(############# # ############### ###########)

			if (Ext.isIE8) {
				parentRegion.bottom = position.bottom;
			}
			parent.setRegion(parentRegion);
		},

		onDragDrop: function() {
			var el = Ext.get(this.id);
			var point = el.getXY();
			if (!this.y) {
				var y = el.getY();
				this.y = this.getTick(y - this.deltaY, this.yTicks);
			}
			point[1] = this.y === this.minY ? this.y : this.y + (this.yTickSize / 2);
			var ddm = this.DDMInstance;
			var times = ddm.ids.time;
			var time = this.pointInsideTimes(point, times);
			var item = this.config.item;
			var itemStartDate = new Date(item.getStartDate());
			itemStartDate = new Date(itemStartDate.getFullYear(), itemStartDate.getMonth(), itemStartDate.getDate(),
				time.hour, time.minute);
			if (item.setStartDate(itemStartDate)) {
				item.scheduler.itemDDEl = null;
			}
		},

		pointInsideTimes: function(point, times) {
			var result;
			for (var i in times) {
				var time = times[i];
				var timeEl = time.getEl();
				var region = Ext.util.Region.getRegion(timeEl);
				if (this.pointInsideRegion(point, region)) {
					var timing = this.timeRe.exec(timeEl.id);
					result = {
						hour: timing[1],
						minute: timing[2]
					};
				}
			}
			return result;
		},

		pointInsideRegion: function(point, region) {
			var x = point[0];
			var y = point[1];
			return !(
				x < region.left ||
				x > region.right ||
				y < region.top ||
				y > region.bottom
			);
		},

		dateRe: new RegExp("(\\d{2})-(\\d{2})-(\\d{4})$"),

		timeRe: new RegExp("(\\d{1,2})-(\\d{1,2})$")
	},

	ddItemResizeBottomOverride: {
		b4StartDrag: function() {
			var item = this.config.item;
			var el = this.el = Ext.get(this.id);
			var elParent = this.elParent = el.parent();
			this.position = {
				top: elParent.getTop(),
				bottom: elParent.getBottom()
			};
			elParent.setStyle({
				"z-index": "11",
				"width": "100%",
				"left": 0
			});
			item.scheduler.itemDDEl = {
				item: this,
				action: Terrasoft.DDAction.RESIZE_BOTTOM
			};
			item.initScheduleItemDDTicksOnResizeBottom(this);
			item.setSelected();
		},

		onDrag: function(event) {
			var parent = this.elParent;
			var parentRegion = parent.getRegion();
			// BrowserSupport: IE8 CR-207952
			var position = this.position;
			if (Ext.isIE8) {
				parentRegion.top = position.top;
				parentRegion.bottom = position.bottom;
				parent.setRegion(parentRegion);
			}
			this.y = this.getTick(event.getY() - this.deltaY, this.yTicks);
			parentRegion.bottom = this.y;
			// BrowserSupport: IE8 CR-207952
			if (Ext.isIE8) {
				parentRegion.top = position.top;
			}
			parent.setRegion(parentRegion);
		},

		onDragDrop: function(event) {
			if (!this.y) {
				var y = event.getY();
				this.y = this.getTick(y - this.deltaY, this.yTicks);
			}
			var point = event.getXY();
			var pointMaxCorrection = this.y - (this.yTickSize / 2);
			var pointCorrection = this.y + (this.yTickSize / 2);
			if (this.y >= this.maxY) {
				point[1] = pointMaxCorrection;
			} else {
				// BrowserSupport: IE ############# ######## ######### ######## ######## ### ######### #######

				// ######## #####: ### ##### ############### ###### ## ###### ###### ### #####

				point[1] = (Ext.isIE) ? pointMaxCorrection + this.yTickSize : pointCorrection;
			}
			var ddm = this.DDMInstance;
			var times = ddm.ids.time;
			var time = this.pointInsideTimes(point, times);
			var item = this.config.item;
			var itemDueDate = new Date(item.getDueDate());
			itemDueDate = new Date(itemDueDate.getFullYear(), itemDueDate.getMonth(), itemDueDate.getDate(),
				time.hour, time.minute);
			var timeScale = item.getTimeScale();
			if (this.maxY - this.yTickSize < this.y) {
				itemDueDate = Terrasoft.addMinutes(itemDueDate, timeScale);
			}
			if (item.setDueDate(itemDueDate)) {
				item = this.config.item;
				item.scheduler.itemDDEl = null;
			}
		},

		pointInsideTimes: function(point, times) {
			var result;
			for (var i in times) {
				var time = times[i];
				var timeEl = time.getEl();
				var region = Ext.util.Region.getRegion(timeEl);
				if (this.pointInsideRegion(point, region)) {
					var timing = this.timeRe.exec(timeEl.id);
					result = {
						hour: timing[1],
						minute: timing[2]
					};
				}
			}
			return result;
		},

		pointInsideRegion: function(point, region) {
			var x = point[0];
			var y = point[1];
			return !(
				x < region.left ||
				x > region.right ||
				y < region.top ||
				y > region.bottom
			);
		},

		dateRe: new RegExp("(\\d{2})-(\\d{2})-(\\d{4})$"),

		timeRe: new RegExp("(\\d{1,2})-(\\d{1,2})$")
	},

	ddItemResizeLeftOverride: {
		b4StartDrag: function() {
			var item = this.config.item;
			var el = this.el = Ext.get(this.id);
			var elParent = this.elParent = el.parent();
			// BrowserSupport: IE8 CR-207952
			if (Ext.isIE8) {
				this.position = {
					top: elParent.getTop(),
					bottom: elParent.getBottom(),
					left: elParent.getLeft(),
					right: elParent.getRight()
				};
			}
			elParent.setStyle({
				"z-index": "11"
			});
			var scheduler = item.scheduler;
			scheduler.itemDDEl = {
				item: this,
				action: Terrasoft.DDAction.RESIZE_LEFT
			};
			item.initScheduleItemDDTicksOnHorizontalResize(this, Terrasoft.DDAction.RESIZE_LEFT);
			item.setSelected();
		},

		onDrag: function(event) {
			var parent = this.elParent;
			var parentRegion = parent.getRegion();
			// BrowserSupport: IE8 CR-207952: ### ######### #######(###### ########## #### ### #####): ###### ##########

			// ## ##### ############ ############ ## #########(############# # ############### ###########)

			var position = this.position;
			if (Ext.isIE8) {
				parentRegion.left = position.left;
				parentRegion.right = position.right;
				parent.setRegion(parentRegion);
			}
			this.x = this.getTick((event.getX() - this.deltaX), this.xTicks);
			parentRegion.left = this.x;
			// BrowserSupport: IE8 CR-207952: ### ######### #######(###### ########## #### ### #####): ###### ##########

			// ## ##### ############ ############ ## #########(############# # ############### ###########)

			if (Ext.isIE8) {
				parentRegion.right = position.right;
			}
			parent.setRegion(parentRegion);
		},

		endDrag: function(event) {
			var point = event.xy;
			var item = this.config.item;
			if ((point[0] < this.minX) && item.allowRerender()) {
				this.config.item.reRender();
			}
		},

		onDragDrop: function() {
			var ddm = this.DDMInstance;
			var days = ddm.ids.day;
			var date = this.pointInsideDays(this.x + this.xTickSize / 2, days);
			var item = this.config.item;
			var dateObject = new Date(date.year, date.month, date.day, 0, 0);
			var sateDateFn = Terrasoft.getIsRtlMode() ? item.setDueDate : item.setStartDate;
			if (sateDateFn.call(item, dateObject)) {
				item.scheduler.itemDDEl = null;
			}
		},

		pointInsideDays: function(point, days) {
			var result;
			for (var i in days) {
				var day = days[i];
				var dayEl = day.getEl();
				var region = Ext.util.Region.getRegion(dayEl);
				if (this.pointInsideRegion(point, region)) {
					var date = this.dateRe.exec(dayEl.id);
					result = {
						day: date[1],
						month: date[2],
						year: date[3]
					};
					result.month = result.month - 1;
					if (result.month.length === 1) {
						result.month += "0";
					}
				}
			}
			return result;
		},

		pointInsideRegion: function(xPoint, region) {
			return (region.left < xPoint && xPoint < region.right);
		},

		dateRe: new RegExp("(\\d{2})-(\\d{2})-(\\d{4})$"),

		timeRe: new RegExp("(\\d{1,2})-(\\d{1,2})$")
	},

	ddItemResizeRightOverride: {
		b4StartDrag: function() {
			var item = this.config.item;
			var el = this.el = Ext.get(this.id);
			var elParent = this.elParent = el.parent();
			// BrowserSupport: IE8 CR-207952
			if (Ext.isIE8) {
				this.position = {
					top: elParent.getTop(),
					bottom: elParent.getBottom(),
					left: elParent.getLeft(),
					right: elParent.getRight()
				};
			}
			elParent.setStyle({
				"z-index": "11"
			});
			item.scheduler.itemDDEl = {
				item: this,
				action: Terrasoft.DDAction.RESIZE_RIGHT
			};
			item.initScheduleItemDDTicksOnHorizontalResize(this, Terrasoft.DDAction.RESIZE_RIGHT);
			item.setSelected();
		},

		onDrag: function(event) {
			var parent = this.elParent;
			var parentRegion = parent.getRegion();
			this.x = this.getTick(event.getX(), this.xTicks);
			parentRegion.right = this.x + this.deltaX;
			parent.setRegion(parentRegion);
		},

		endDrag: function(event) {
			var point = event.xy;
			var item = this.config.item;
			if (point[0] > this.maxX && item.allowRerender()) {
				this.config.item.reRender();
			}
		},

		onDragDrop: function() {
			var ddm = this.DDMInstance;
			var days = ddm.ids.day;
			var date = this.pointInsideDays(this.x - this.xTickSize / 2, days);
			var item = this.config.item;
			var dateObject = new Date(date.year, date.month, date.day, 0, 0);
			var sateDateFn = Terrasoft.getIsRtlMode() ? item.setStartDate : item.setDueDate;
			if (sateDateFn.call(item, dateObject)) {
				item.scheduler.itemDDEl = null;
			}
		},

		pointInsideDays: function(point, days) {
			var result;
			for (var i in days) {
				var day = days[i];
				var dayEl = day.getEl();
				var region = Ext.util.Region.getRegion(dayEl);
				if (this.pointInsideRegion(point, region)) {
					var date = this.dateRe.exec(dayEl.id);
					result = {
						day: date[1],
						month: date[2],
						year: date[3]
					};
					result.month = result.month - 1;
					if (result.month.length === 1) {
						result.month += "0";
					}
				}
			}
			return result;
		},

		pointInsideRegion: function(xPoint, region) {
			return (region.left < xPoint && xPoint < region.right);
		},

		dateRe: new RegExp("(\\d{2})-(\\d{2})-(\\d{4})$"),

		timeRe: new RegExp("(\\d{1,2})-(\\d{1,2})$")
	},

	initDd: function() {
		Ext.dd.DragDropManager.notifyOccluded = true;
		var wrapEl = this.getWrapEl();
		var ddItem = wrapEl.initDD("item", {isTarget: false, item: this}, this.ddItemOverride);
		ddItem.addToGroup("multi-day-item");
		ddItem.addToGroup("day-item");
		ddItem.addToGroup("time-item");
		if (this.isMultiDayItem()) {
			var resizeLeft = this.resizeLeft;
			var resizeRight = this.resizeRight;
			var ddResizeLeft;
			var ddResizeRight;
			ddResizeLeft = Terrasoft.getIsRtlMode()
				? resizeLeft.initDD("item-resize-left", {isTarget: false, item: this}, this.ddItemResizeRightOverride)
				: resizeLeft.initDD("item-resize-left", {isTarget: false, item: this}, this.ddItemResizeLeftOverride);
			ddResizeRight = Terrasoft.getIsRtlMode()
				? resizeRight.initDD("item-resize-right", {isTarget: false, item: this}, this.ddItemResizeLeftOverride)
				: resizeRight.initDD("item-resize-right", {
					isTarget: false,
					item: this
				}, this.ddItemResizeRightOverride);
			ddResizeLeft.addToGroup("multi-day-item");
			ddResizeRight.addToGroup("multi-day-item");
		} else {
			var ddResizeTop = this.resizeTop.initDD("item-resize-top", {isTarget: false, item: this},
				this.ddItemResizeTopOverride);
			ddResizeTop.addToGroup("day-item");
			ddResizeTop.addToGroup("time-item");
			var ddResizeBottom = this.resizeBottom.initDD("item-resize-bottom", {isTarget: false, item: this},
				this.ddItemResizeBottomOverride);
			ddResizeBottom.addToGroup("day-item");
			ddResizeBottom.addToGroup("time-item");
		}
	},

	/**
	 * Gets box of the element by element date.
	 * @param {Date} date Date of the element.
	 * @return {Object} Box of the element by element date.
	 */
	getElBoxByDate: function(date) {
		var dayElement = Ext.select("div[id*='" + this.getDayColumnId(date) + "']");
		var dayElementFirst = dayElement.first();
		return dayElementFirst.getBox();
	}

});
