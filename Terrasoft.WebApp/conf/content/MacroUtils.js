Terrasoft.configuration.Structures["MacroUtils"] = {innerHierarchyStack: ["MacroUtils"]};
define("MacroUtils", function() {
	/**
	 * @class Terrasoft.configuration.MacroUtils
	 */
	Ext.define("Terrasoft.configuration.MacroUtils", {
		alternateClassName: "Terrasoft.MacroUtils",

		// region Methods: Public

		/**
		 * Validates given string is a macro.
		 * @param {String} value String value to validate.
		 * @returns {boolean} True if given string is a macro like [#AnyMacroName#].
		 * @public
		 */
		isValueMacro: function(value) {
			var macroRegex = /(^(\[\#.+\#\])$)/;
			return macroRegex.test(value);
		},

		/**
		 * Validates given string contains macro.
		 * @param {String} value String value to validate.
		 * @returns {boolean} True if given string contains a macro like [#AnyMacroName#].
		 * @public
		 */
		isStringContainsMacro: function(value) {
			var stringWithMacroRegex = /^.*?(\[\#.+\#\]).*?$/;
			return stringWithMacroRegex.test(value);
		}

		// endregion

	});

	return Ext.create("Terrasoft.MacroUtils");
});


