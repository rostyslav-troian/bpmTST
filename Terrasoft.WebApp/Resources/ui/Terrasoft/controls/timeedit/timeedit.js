/**
 * Control for viewing / editing time
 */
Ext.define("Terrasoft.controls.TimeEdit", {
	extend: "Terrasoft.ComboBoxEdit",
	alternateClassName: "Terrasoft.TimeEdit",

	/**
	 * Time interval between timestamps in expandable list.
	 * @type {Number}
	 */
	interval: 15,

	/**
	 * Calendar start time in minutes.
	 * @type {Number}
	 */
	startMinute: 0,

	/**
	 * Calendar end time in minutes.
	 * @type {Number}
	 */
	dueMinute: 60 * 24,

	/**
	 * Time format.
	 * @type {Terrasoft.Resources.CultureSettings}
	 */
	timeFormat: Terrasoft.Resources.CultureSettings.timeFormat,

	/**
	 * Array of alternative time formats.
	 * @type {String[]}
	 */
	alternativeTimeFormats: null,

	/**
	 * Time to focus in expandable list.
	 * @type {String}
	 */
	timeToFocus: "",

	/**
	 * Constructor for timeedit class.
	 */
	constructor: function() {
		this.alternativeTimeFormats = ["Gi", "Hi", "H:i"];
		this.callParent(arguments);
	},

	/**
	 * Tries to parse string to date by format.
	 * @private
	 * @param {String} value String date.
	 * @param {String} format String format to parse.
	 * @param {Boolean} strict Strict parsing.
	 * @return {Date|Null} Return Date or null if cannot parse.
	 */
	tryParseDate: function(value, format, strict) {
		var formats = [format].concat(this.alternativeTimeFormats || []);
		var length = formats.length;
		for (var i = 0; i < length; i++) {
			var timeFormat = formats[i];
			var time = this.parseDate(value, timeFormat, strict);
			if (Ext.isDate(time)) {
				return time;
			}
		}
		return null;
	},

	/**
	 * Parses string to date by format.
	 * @private
	 * @param {String} value String date.
	 * @param {String} format String format to parse.
	 * @param {Boolean} strict Strict parsing.
	 * @return {Date|Null} Return Date or null if cannot parse.
	 */
	parseDate: function(value, format, strict) {
		try {
			return Terrasoft.parseDate(value, format, strict);
		} catch (e) {
			return null;
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		var value = this.value;
		if (value !== null && !Ext.isDate(value)) {
			/**
    * @throws {Terrasoft.UnknownException}
    * The exception is activated if the initialization of the "value" control
    * was initialized to a variable of type different from {Date}
    */
			throw new Terrasoft.UnsupportedTypeException({
				message: Terrasoft.Resources.Controls.InvalidValue
			});
		}
	},

	formatValue: function(value) {
		return Ext.Date.format(value, this.timeFormat);
	},

	/**
  * The method returns the parameter object of the control's rendering template.
  * @protected
  * @override
  * @return {Object}
  */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var value = this.value;
		if (Ext.isDate(value)) {
			tplData.value = this.formatValue(value);
		}
		tplData.direction = Terrasoft.getIsRtlMode() ? "ltr" : null;
		var wrapClass = tplData.wrapClass;
		wrapClass.push("time-edit");
		return tplData;
	},

	/**
  * Displays a drop-down list with timestamps.
  * The interval between the timestamps is equal to "interval".
  * @protected
  * @override
  */
	expandList: function() {
		var list = this.list;
		if (list === null) {
			list = this.createCollection();
		}
		var timeToFocus = this.getTypedValue() || this.timeToFocus;
		var result = this.fireEvent(this.listPrepareEventName, timeToFocus, this.list);
		if (!result) {
			this.maskTimerId = Ext.defer(this.showLoadMask, this.maskDelay, this);
		}
		var value = (timeToFocus !== "") ? Ext.Date.parse(timeToFocus, this.timeFormat) : null;
		if (value) {
			var findedItem = this.findNearestItemValue(value);
			this.setSelectedItem(findedItem);
		} else {
			this.setSelectedItem(null);
		}
		this.loadList(list);
		var el = this.getEl();
		el.focus();
		var listView = this.listView;
		if (listView) {
			listView.selectElement();
		}
	},

	/**
	 * Returns nearest item in time list by current value.
	 * @param {String} value Time edit DOM value.
	 * @return {Object}
	 */
	findNearestItemValue: function(value) {
		var itemIndex = Math.round((value.getHours() * 60 + value.getMinutes()) / this.interval);
		return Terrasoft.findWhere(this.list.getItems(), {
			value: itemIndex.toString()
		});
	},

	/**
  * Creates a collection whose elements consist of lines containing the time at intervals of equal to "interval".
  * Sets the list link to the created collection.
  * @protected
  * @return {Terrasoft.core.collections.Collection} The new collection.
  */
	createCollection: function() {
		var stamp = this.startMinute;
		var hours = 0;
		var minutes = 0;
		var day = this.dueMinute;
		var interval = this.interval;
		var listView = this.listView;
		var list = Ext.create("Terrasoft.Collection");
		var date = new Date();
		listView = this.createListView();
		this.listView = listView;
		var map = listView.map;
		var i = 0;
		while (stamp < day) {
			hours = Math.floor(stamp / 60);
			minutes = stamp % 60;
			var item = {};
			date.setHours(hours, minutes);
			item[map.displayValue] = this.formatValue(date);
			item[map.value] = String(i);
			list.add(i, item);
			stamp += interval;
			i += 1;
		}
		this.list = list;
		return list;
	},

	/**
	 * The method compares the value date and the value of the control,
	 * if they are not caused by the event "change" and set the new value.
	 * This method takes a string or object Date.
	 * @protected
	 * @override
	 * @param  {String|Date} date The date or a string representation.
	 * @return {Boolean} Returns true - if the value has changed, otherwise - false.
	 */
	changeValue: function(date) {
		var newValue = this.getCorrectValue(date);
		var isChanged = this.isChanged(newValue);
		if (isChanged) {
			this.value = newValue;
			this.fireEvent("change", newValue, this);
		}
		return isChanged;
	},

	/**
	 * Returns the result of parse perameter date.
	 * @param {Date|String} date The date or a string representation.
	 * @return {Date|Null|String} Returns date, null or "".
	 */
	getCorrectValue: function(date) {
		var newValue = null;
		if (Ext.isDate(date)) {
			newValue = date;
		}
		if (Ext.isString(date)) {
			var currentValue = this.value;
			var emptyValue = ((date === "") ? null : "");
			newValue = this.tryParseDate(date, this.timeFormat) || emptyValue;
			if (Ext.isDate(currentValue) && Ext.isDate(newValue)) {
				newValue.setFullYear(currentValue.getFullYear(), currentValue.getMonth(), currentValue.getDate());
			}
		}
		return newValue;
	},
	/**
	 * Returns the result of the comparison parameter newValue, to the value of the control.
	 * @param {Date|String} newValue The date or a string representation.
	 * @return {Boolean} Returns true - if the value has changed, otherwise - false.
	 */
	isChanged: function(newValue) {
		var isChanged;
		var currentValue = this.value;
		if (Ext.isDate(currentValue) && Ext.isDate(newValue)) {
			isChanged = (currentValue.getHours() !== newValue.getHours() ||
				currentValue.getMinutes() !== newValue.getMinutes());
		} else {
			isChanged = (newValue !== currentValue);
		}
		return isChanged;
	},
	/**
	 * @inheritdoc Terrasoft.BaseEdit#onBlur
	 * @override
	 */
	onBlur: function() {
		if (!this.enabled || !this.rendered) {
			return;
		}
		var value = this.getTypedValue();
		this.setValue(value);
		this.focused = false;
		this.fireEvent("blur", this);
		this.fireEvent("focusChanged", this);
		//BrowserSupport: <IE> In IE browsers, when you click on the scroll bar, a browser loss of focus

		// event triggers (in other browsers this is not). The solution prevents hiding the list when you click on the
		// scroll bar for IE browsers

		if (!Ext.isIE && this.listView) {
			this.listView.hide();
		}
	},

	/**
  * Handler of the listElementSelected event,
  * sets the value of the control using the value of the "item" parameter.
  * Hides the drop-down list.
  * @protected
  * @override
  * @param  {Object} item properties of the selected item
  */
	onListElementSelected: function(item) {
		this.callParent([item.displayValue]);
	},

	/**
  * Event handle for a key release. On user input, sets the control to null,
  * calls a function to retrieve data from the results of user input.
  * @param  {Ext.EventObjectImpl} event The event object
  * @protected
  * @override
  */
	onKeyUp: function(event) {
		if (!this.enabled) {
			return;
		}
		var typedValue = this.getTypedValue();
		var key = event.getKey();
		if ((key === event.DELETE || key === event.BACKSPACE) && (typedValue === "")) {
			this.collapseList();
		}
		if (!event.isNavKeyPress()) {
			if (typedValue.length >= this.minSearchCharsCount && typedValue !== "") {
				this.typedValue = typedValue;
				this.expandList(typedValue);
			}
		}
		if (!this.isListElementSelected) {
			this.fireEvent("keyUp", event, this);
		}
	},

	/**
	 * Subscribe to the event model and, if necessary, subscribe to changes bindable property
	 * control type Property.
	 * @protected
	 * @override
	 * @param {Object} binding An object that describes the parameters of the binding properties of the control
	 * to the model.
	 * @param {String} property Name of the property to bind the control.
	 * @param {Terrasoft.data.modules.BaseViewModel} model The data model which is linked to the control.
	 */
	subscribeForPropertyChangeEvent: function(binding, property, model) {
		var changeEvent = binding.config.changeEvent;
		if (changeEvent === "change") {
			var modelProperty = binding.modelItem;
			var onControlPropertyChange = function(value) {
				var modelValue = model.get(modelProperty);
				var columnType = model.getColumnDataType(modelProperty);
				var newDate = !value || Ext.isDate(value)
					? value
					: new Date(value);
				if (newDate && columnType === Terrasoft.DataValueType.DATE_TIME && Ext.isDate(modelValue)) {
					newDate.setFullYear(modelValue.getFullYear(), modelValue.getMonth(), modelValue.getDate());
				}
				model.set(modelProperty, newDate);
			};
			this.on(changeEvent, onControlPropertyChange);
			var dependentProperties = [modelProperty];
			// The handler for changing one property in the model

			var handler = function(viewModel, value) {
				if (value === "") {
					value = "invalid value";
				} else if (value === null) {
					value = "";
				}
				this.setControlPropertyValue(binding, value, model);
			};
			this.toggleSubscriptionForModelEvents(model, null, dependentProperties, handler, this);
		} else {
			this.callParent(arguments);
		}
	},

	/**
  * The event handler for a keystroke event.
  * Navigates through the menus. When you enter a value and press the ENTER key, it sets the entered value.
  * @protected
  * @override
  * @param  {Event} e The keystroke event object.
  */
	onKeyDown: function(e) {
		if (!this.enabled) {
			return;
		}
		this.callParent(arguments);
		var key = e.getKey();
		if (key === e.ENTER) {
			var inputedValue = this.getTypedValue();
			this.setValue(inputedValue);
		}
		//BrowserSupport: <IE> In IE browsers, when you click on the scroll bar, a browser loss of focus

		// event (other browsers do not have this). This solution is required to hid the list when the TAB key is pressed

		// in a value entry field

		if (Ext.isIE && (key === e.TAB)) {
			this.listView.hide();
		}
	},

	/**
  * Sets the value of the control.
  * @override
  * @param {String/Date} value The string in the required format or "Date" object.
  */
	setValue: function(value) {
		this.changeValue(value);
		if (this.rendered) {
			var newValue = this.formatValue(this.value);
			var el = this.getEl();
			el.dom.value = newValue;
		}
	},

	/**
  * @inheritdoc Terrasoft.ComboBoxEdit#onMouseDownCollapse
  * @override
  * @protected
  * @param  {Event} e The mousedown event
  */
	onMouseDownCollapse: function(e) {
		var isInComboWrap = e.within(this.getWrapEl());
		var listView = this.listView;
		var isInListWrap = (listView === null) || e.within(listView.getWrapEl());
		if (!isInComboWrap && !isInListWrap) {
			listView.hide();
		}
	}
});
