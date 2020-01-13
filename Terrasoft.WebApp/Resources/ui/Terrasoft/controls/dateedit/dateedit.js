/**
 * Class of the date input control
 */
Ext.define("Terrasoft.controls.DateEdit", {
	extend: "Terrasoft.BaseEdit",
	alternateClassName: "Terrasoft.DateEdit",

	mixins: {
		rightIcon: "Terrasoft.RightIcon"
	},

	/**
  * Parameter indicating whether the right icon is used
  * @type {Boolean}
  * @override
  * @protected
  */
	enableRightIcon: true,

	/**
  * Classes of CSS styles for the right icon
  * @protected
  * @property {String[]} rightIconClasses
  */
	rightIconClasses: ["ts-date-edit-right-icon"],

	/**
  * Link to the DatePicker control
  * @private
  * @type {Terrasoft.DatePicker}
  */
	datePicker: null,

	/**
  * The value of the control
  * @protected
  * @type {Date}
  */
	value: null,

	/**
  * Date format
  * @type {String}
  */
	format: Terrasoft.Resources.CultureSettings.dateFormat,

	/**
	 * The expansion of the data set for a template.
	 * @protected
	 * @override
	 * @return {Object}
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.value = Ext.Date.format(this.value, this.format);
		var wrapClass = tplData.wrapClass;
		wrapClass.push("date-edit");
		tplData.direction = Terrasoft.getIsRtlMode() ? "ltr" : null;
		return tplData;
	},

	/**
  * Creates the {@link Terrasoft.DatePicker} element
  * and sets the {@link #datePicker datePicker} parameter to the link.
  * @private
  */
	createDatePicker: function() {
		var datePicker = this.datePicker = Ext.create("Terrasoft.DatePicker", {
			renderTo: Ext.getBody(),
			parentEl: this.wrapEl,
			date: this.value
		});
		datePicker.on("dateSelected", this.onDateSelected, this);
		datePicker.on("currentDateSelected", this.onDateSelected, this);
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
		try {
			return Terrasoft.parseDate(value, format, strict);
		} catch (e) {
			console.warn(e && e.message);
			return null;
		}
	},

	/**
  * Initializing DOM events.
  * @protected
  * @override
  */
	initDomEvents: function() {
		this.callParent(arguments);
		/**
   * @event click
   * Right click event
   */
		this.on("rightIconClick", this.onButtonClick, this);
		var document = Ext.getDoc();
		/**
   * @event mousedown
   * Mouse click event in the document area.
   */
		document.on("mousedown", this.onMouseDownCollapse, this);
	},

	/**
  * Hides the calendar if the click occurred outside the control or calendar.
  * @protected
  * @param  {Event} e  mousedown event
  */
	onMouseDownCollapse: function(e) {
		var isInDateEditWrap = e.within(this.getWrapEl());
		var datePicker = this.datePicker;
		var isInDatePickerWrap = (datePicker === null) || e.within(datePicker.getWrapEl());
		if (!isInDateEditWrap && !isInDatePickerWrap) {
			datePicker.setVisible(false);
		}
	},

	/**
	 * Handler for the button click.
	 * @protected
	 */
	onButtonClick: function() {
		if (this.readonly) {
			return;
		}
		var datePicker = this.datePicker;
		if (!datePicker) {
			this.createDatePicker();
		} else {
			var date = this.value;
			if (date) {
				datePicker.setDisplayedDate(date);
				datePicker.setDate(date);
			}
			if (datePicker.visible) {
				datePicker.setVisible(false);
			} else {
				var wrapEl = this.getWrapEl();
				datePicker.show(wrapEl);
			}
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
				var newDate = value ? new Date(value) : new Date();
				if (!value) {
					newDate = value;
				} else if (columnType === Terrasoft.DataValueType.DATE_TIME && Ext.isDate(modelValue)) {
					newDate.setHours(modelValue.getHours(), modelValue.getMinutes(), modelValue.getSeconds(),
							modelValue.getMilliseconds());
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
  * Key event handler. Pressing the key displays the calendar.
  * @protected
  * @override
  * @param  {Ext.EventObjectImpl} e event object
  */
	onKeyDown: function(e) {
		if (!this.enabled) {
			return;
		}
		this.callParent(arguments);
		var key = e.getKey();
		var datePicker = this.datePicker;
		if (key === e.DOWN) {
			if (!datePicker) {
				this.createDatePicker();
			} else {
				datePicker.show(this.getWrapEl());
			}
		} else if (key === e.TAB && datePicker) {
			this.datePicker.setVisible(false);
		}
	},

	/**
  * The handler of the event of getting focus by control.
  * When you get the focus, the text inside the control is highlighted.
  * @protected
  * @override
  */
	onFocus: function() {
		this.callParent();
		var el = this.getEl();
		if (el && el.dom && el.dom.value) {
			el.dom.select();
		}
	},

	/**
	 * Handler for the date selection event.
	 * Hides the calendar, set the value of the control equal to the selected date,
	 * sets focus to the element.
	 * @protected
	 */
	onDateSelected: function() {
		var datePicker = this.datePicker;
		if (this.enabled) {
			this.setValue(datePicker.getDate());
		}
		datePicker.setVisible(false);
		var el = this.getEl();
		el.focus();
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
	 * Returns the result of parse parameter date.
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
			if (date === "") {
				newValue = null;
			} else {
				newValue = this.parseDate(date) || "";
			}
			if (Ext.isDate(currentValue) && Ext.isDate(newValue)) {
				newValue.setHours(currentValue.getHours(), currentValue.getMinutes(), currentValue.getSeconds(),
						currentValue.getMilliseconds());
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
			isChanged = !Ext.Date.isEqual(currentValue, newValue);
		} else {
			isChanged = (newValue !== currentValue);
		}
		return isChanged;
	},

	/**
  * Returns the formatted value of the control (date string).
  * @return {String}
  */
	getFormattedValue: function() {
		return Terrasoft.utils.string.getTypedStringValue(this.value, Terrasoft.DataValueType.DATE);
	},

	/**
  * Destroys the control and clears the event handlers.
  * If the {@link Terrasoft.DatePicker datePicker} element is created, it destroys it, and clears the handlers associated with it.
  * @override
  */
	onDestroy: function() {
		var datePicker = this.datePicker;
		if (datePicker !== null) {
			datePicker.un("dateSelected", this.onDateSelected, this);
			datePicker.un("currentDateSelected", this.onDateSelected, this);
			datePicker.destroy();
		}
		this.callParent(arguments);
	},

	/**
  * Sets the value of the control, checks its value for correctness.
  * If the item is displayed and its value is changed, set a new value to the dom element.
  * @param {String / Date} date If a string is passed, it converts it to a Date object.
  * @return {Boolean} Returns a sign that the value has changed
  */
	setValue: function(date) {
		var isChanged = this.changeValue(date);
		if (this.rendered) {
			var el = this.getEl();
			el.dom.value = this.getFormattedValue();
		}
		return isChanged;
	},

	/**
  * If the focus is lost, it sets the value of the control if it changes.
  * @method onBlur
  * @override
  * @inheritdoc Terrasoft.baseedit#onBlur
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
	},

	/**
  * Pressing the "ENTER" key sets the value of the control if it has changed.
  * @method onEnterKeyPressed
  * @override
  * @inheritdoc Terrasoft.baseedit#onEnterKeyPressed
  */
	onEnterKeyPressed: function() {
		var value = this.getTypedValue();
		var isChanged = this.setValue(value);
		this.fireEvent("enterkeypressed", this);
		if (!isChanged) {
			this.fireEvent("editenterkeypressed", this);
		}
	},

	/**
  * Converts string to date.
  * If you pass a string of 6 or 8 digits.
  * Converts it into a Date object based on the current
  * date format "Terrasoft.Resources.CultureSettings.dateFormat" culture.
  * Prevents the ef#fect of "rollover" of a Date object in JavaScript, ie, takes into
  * account the existence of the date.
  * For example, the date of leap years and the possible number of days in the month,
  * if the conversion can not be transferred to a string returns null.
  * @method parseDate
  * @param {String} value The string date.
  * @return {Date|Null} The conversion results.
  */
	parseDate: function(value) {
		var clearFormat = this.getDateFormat(value);
		var result = this.tryParseDate(value, clearFormat, true) || this.tryParseDate(value, this.format, true)
			|| this.tryParseDate(value, this.format, false);
		return result;
	},

	/**
  * Analyzes the length of the string passed and returns the appropriate format to convert a string to a Date object.
  * Allows for setting the current culture specified in Terrasoft.Resources.CultureSettings.
  * If the format string is longer than 6 characters will return the format with full representation
  * of the year (4 digits)
  * otherwise a brief presentation format (2 digits).
  * @method getDateFormat
  * @param {String} value The format of the date string.
  * @return {String} string The date format.
  */
	getDateFormat: function(value) {
		var regex = /^(\d{6}||\d{8})$/;
		var format = this.format;
		if (regex.test(value)) {
			var dot = new RegExp("\\.", "g");
			var clearFormat = format.replace(dot, "");
			var clearValue = value.replace(dot, "");
			var length = clearValue.length;
			var isShortDate = (length <= 6);
			if (isShortDate) {
				return clearFormat.replace("Y", "y");
			}
			return clearFormat.replace("y", "Y");
		}
		return format;
	},

	/**
	 * @inheritdoc Terrasoft.controls.component#isEventWithin.
	 * @override
	 */
	isEventWithin: function(event) {
		var isWithin = this.callParent(arguments);
		if (!isWithin && this.datePicker) {
			isWithin = this.datePicker.isEventWithin(event);
		}
		return isWithin;
	}
});
