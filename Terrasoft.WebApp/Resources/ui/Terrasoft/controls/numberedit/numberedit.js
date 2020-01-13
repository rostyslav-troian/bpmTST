/**
 * Base class for controls FloatEdit, IntegerEdit
 * @abstract
*/
Ext.define("Terrasoft.controls.NumberEdit", {
	extend: "Terrasoft.BaseEdit",

	alternateClassName: "Terrasoft.NumberEdit",

	/**
  * A string that contains a list of characters that can be entered from the keyboard
  * @protected
  * @type {String}
  */
	baseCharsRe: null,

	/**
  * Number entry pattern
  * @protected
  * @type {RegExp}
  */
	numberRe: null,

	/**
  * Template of separators of integer and fractional part
  * @protected
  * @type {RegExp}
  */
	decimalSeparatorsRe: null,

	/**
  * Indicates if the division of numbers of numbers is used
  * @type {Boolean}
  */
	useThousandSeparator: true,

	/**
  * Digit number separator
  * @type {Terrasoft.Resources.CultureSettings}
  */
	thousandSeparator: Terrasoft.Resources.CultureSettings.thousandSeparator,

	/**
  * The number of digits of a number without a separator
  * @type {Terrasoft.Resources.CultureSettings}
  */
	numberGroupSizes: Terrasoft.Resources.CultureSettings.numberGroupSizes,

	/**
	 * @inheritdoc Terrasoft.controls.BaseEdit#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		var thousandSeparator = Ext.String.escapeRegex(this.thousandSeparator);
		this.thousandSeparatorRe = new RegExp(thousandSeparator, "g");
		this.displayNumberConfig = {
			decimalPrecision: this.decimalPrecision,
			decimalSeparator: this.decimalSeparator,
			useThousandSeparator: this.useThousandSeparator,
			thousandSeparator: this.thousandSeparator,
			numberGroupSizes: this.numberGroupSizes
		};
	},

	/**
	 * Handler for focus element event.
	 * After focus inner text formatted and align left.
	 * @protected
	 * @override
	 */
	onFocus: function() {
		this.callParent(arguments);
		var el = this.getEl();
		if (el && el.dom && el.dom.value) {
			el.dom.select();
		}
		if (this.validationInfo.isValid === false) {
			return;
		}
		this.formatDomValue();
	},

	/**
	 * Format value for dom element.
	 * @private
	 */
	formatDomValue: function() {
		var value = this.getTypedValue();
		var el = this.getEl();
		var domEl = el && el.dom;
		if (Ext.isEmpty(value) || !domEl) {
			return;
		}
		value = value.replace(this.thousandSeparatorRe, "");
		var numericValue = this.parseNumber(value);
		var config = Terrasoft.deepClone(this.displayNumberConfig);
		Ext.apply(config, {
			thousandSeparator: ""
		});
		domEl.value = Terrasoft.getFormattedNumberValue(numericValue, config);
	},

	/**
	 * @inheritdoc Terrasoft.controls.BaseEdit#onEnterKeyPressed
	 * @override
	 */
	onEnterKeyPressed: function() {
		var value = this.getTypedValue();
		var numericValue = this.parseNumber(value);
		var hasChanges = this.changeValue(numericValue);
		this.fireEvent("enterkeypressed", this);
		if (!hasChanges) {
			this.fireEvent("editenterkeypressed", this);
		}
	},

	/**
  * The handler for the event when an element looses focus.
  * When the focus is received, the text inside the element is formatted and aligned to the right
  * @protected
  * @override
  */
	onBlur: function() {
		var el = this.getEl();
		var value = this.getTypedValue();
		var numericValue = this.parseNumber(value);
		el.dom.value = this.getFormattedNumberValue(numericValue);
		this.changeValue(numericValue);
		this.focused = false;
		this.fireEvent("blur", this);
		this.fireEvent("focusChanged", this);
	},

	/**
  * Initializes data for the template and updates the selectors
  * @override
  * @protected
  * @return {Object}
  */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var value = this.getTplValue();
		tplData.value = value;
		tplData.wrapClass.push("number-edit-align");
		tplData.editInputClass.push("number-edit-input-align");
		return tplData;
	},

	/**
  * Formats the value to display
  * @override
  * @protected
  * @return {String} formatted string
  */
	getTplValue: function() {
		var value = this.value;
		if (Ext.isEmpty(value)) {
			return "";
		}
		if (this.validationInfo.isValid === true) {
			this.value = this.parseNumber(value);
			return this.getFormattedNumberValue(value);
		}
	},

	/**
	 * Handler for key press.
	 * Prevents typing of prohibited symbols or values from keyboard that are not match the pattern numberRe.
	 * The second parameter specifies the event processing mode.
	 * @protected
	 * @override
	 * @param  {Event} e DOM event keypress.
	 * @param  {String} type (optional) If param not set then processed both the integer, else param is
	 * {@link Terrasoft.DataValueType.FLOAT} then both double.
	 */
	onKeyPress: function(e, type) {
		this.callParent(arguments);
		if (this.readonly || !this.enabled) {
			return;
		}
		var isSpecialKey = Ext.isGecko && e.isSpecialKey();
		if (isSpecialKey) {
			return;
		}
		e.preventDefault();
		var keyUnicode = e.getKey();
		var key = String.fromCharCode(keyUnicode);
		var isDeprecated = this.baseCharsRe && !this.baseCharsRe.test(key);
		if (isDeprecated) {
			return;
		}
		var domEl = e.getTarget();
		var selectedTextLength = Terrasoft.utils.dom.getSelectedTextLength(domEl);
		if (type === Terrasoft.DataValueType.FLOAT && this.decimalSeparatorsRe.test(key)) {
			key = this.decimalSeparator;
		}
		var value = domEl.value;
		var caretPosition = Terrasoft.utils.dom.getCaretPosition(domEl);
		var valueBeforeCaret = "";
		var valueAfterCaret = "";
		if (Ext.isIE && !Ext.isIE11) {
			valueBeforeCaret = value.slice(0, caretPosition - selectedTextLength);
			valueAfterCaret = value.slice(caretPosition);
			caretPosition -= selectedTextLength;
		} else {
			valueBeforeCaret = value.slice(0, caretPosition);
			valueAfterCaret = value.slice(caretPosition + selectedTextLength);
		}
		var newValue = valueBeforeCaret + key + valueAfterCaret;
		isDeprecated = this.numberRe && !this.numberRe.test(newValue);
		if (isDeprecated) {
			return;
		} else {
			caretPosition += 1;
			domEl.value = newValue;
			Terrasoft.utils.dom.setCaretPosition(domEl, caretPosition);
		}
	},

	/**
  * Sets the value of the control
  * @param {Number/String} value - the value to set
  */
	setValue: function(value) {
		var numericValue = this.parseNumber(value);
		var isChanged = this.changeValue(numericValue);
		if (this.rendered && isChanged) {
			var domValue = ((this.focused === true) ? value : this.getFormattedNumberValue(value));
			this.setDomValue(domValue);
		}
	},

	/**
  * Converts a string value to a number with the second parameter, if type is equal to Terrasoft.DataValueType.INTEGER
  * the method returns an integer,
  * if type is Terrasoft.DataValueType.FLOAT method will return a floating-point number.
  * If the value parameter is a number the function will return it without conversion.
  * @protected
  * @param  {String/Number} value The string you want to convert to a number
  * Terrasoft.DataValueType.INTEGER and Terrasoft.DataValueType.FLOAT
  * @return {Number} number after the conversion of the input string
  */
	parseNumber: function(value) {
		return Terrasoft.parseNumber(value, this.displayNumberConfig);
	},

	/**
  * The method formats the string / number according to the specified configuration object.
  * @protected
  * @param  {Number/String} value Number to format
  * @return {String} Formatted string
  */
	getFormattedNumberValue: function(value) {
		var config = Ext.apply({}, this.displayNumberConfig);
		return Terrasoft.getFormattedNumberValue(value, config);
	}

});
