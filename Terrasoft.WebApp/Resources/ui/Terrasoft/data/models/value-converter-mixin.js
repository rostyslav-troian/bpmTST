/**
 * Value converter mixin.
 */
Ext.define("Terrasoft.mixins.ValueConverter", {
	alternateClassName: "Terrasoft.ValueConverter",

	// region Properties: Public

	/**
	 * Returns the inverse value. Used for the converter in bindings to a value.
	 * @param {Boolean} value Value.
	 * @return {Boolean} Inverse value.
	 */
	invertBooleanValue: function(value) {
		return !value;
	},

	/**
	 * Converts value to boolean.
	 * @param {Mixed} value Value.
	 * @return {Boolean} Converted value.
	 */
	toBoolean: function(value) {
		return Boolean(value);
	},

	/**
	 * Returns flag that indicates whether value strict is empty or not.
	 * @param {Object} value Value.
	 * @return {Boolean}
	 */
	isEmptyValue: function(value) {
		return Terrasoft.isEmpty(value, true);
	},

	/**
	 * Returns flag that indicates whether value strict is not empty.
	 * @param {Object} value Value.
	 * @return {Boolean}
	 */
	isNotEmptyValue: function(value) {
		return !Terrasoft.isEmpty(value, true);
	}

	// endregion

});
