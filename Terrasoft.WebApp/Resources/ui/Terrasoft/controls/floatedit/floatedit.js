/**
 * Class for working with a real field.
 */
Ext.define('Terrasoft.controls.FloatEdit', {
	extend: 'Terrasoft.NumberEdit',
	alternateClassName: 'Terrasoft.FloatEdit',

	/**
  * A string that contains a list of characters that can be typed from the keyboard
  * @protected
  * @override
  * @type {String}
  */
	baseCharsRe: /[-1234567890.,]/,

	/**
  * Template of separators of integer and decimal part
  * @protected
  * @override
  * @type {RegExp}
  */
	decimalSeparatorsRe: /[,.]/,

	/**
  * The decimal separator of the integer and decimal part of the number
  * @override
  * @type {Terrasoft.Resources.CultureSettings}
  */
	decimalSeparator: Terrasoft.Resources.CultureSettings.decimalSeparator,

	/**
  * The precision of the decimal part of the number (the number of digits after the delimiter)
  * @override
  * @type {Number}
  */
	decimalPrecision: 2,

	/**
  * Initializes the parameters of the control
  * @protected
  * @override
  */
	init: function() {
		this.callParent(arguments);
		this.numberRe = new RegExp('^-?\\d*[,.]?\\d{0,' + this.decimalPrecision + '}$');
	},

	/**
  * The event handler for the keystroke event.
  * Prevents typing prohibited characters or values that do not match the pattern numberRe
  * @protected
  * @override
  * @param {Event} e DOM keypress event
  */
	onKeyPress: function(e) {
		this.callParent([e, Terrasoft.DataValueType.FLOAT]);
	}

});