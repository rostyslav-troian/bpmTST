/**
 * A class for working with an integer field.
 */
Ext.define("Terrasoft.controls.IntegerEdit", {
	extend: "Terrasoft.NumberEdit",
	alternateClassName: "Terrasoft.IntegerEdit",

	/**
  * A string that contains a list of characters that can be typed from the keyboard
  * @protected
  * @override
  * @type {String}
  */
	baseCharsRe: /[-1234567890]/,

	/**
  * Template of the entered number
  * @protected
  * @override
  * @type {RegExp}
  */
	numberRe: /^-?\d*$/,

	/**
  * Initializes the parameters of the control element
  * @protected
  * @override
  */
	init: function() {
		this.callParent(arguments);
		this.displayNumberConfig.type = Terrasoft.DataValueType.INTEGER;
	},

	/**
  * The event handler for the keystroke event.
  * Prevents the input of prohibited characters or values that do not match the numberRe template.
  * The method is parameterized, the second parameter specifies the event processing mode.
  * @protected
  * @override
  * @param {Event} e DOM keypress event
  */
	onKeyPress: function(e) {
		this.callParent([e, Terrasoft.DataValueType.INTEGER]);
	}

});