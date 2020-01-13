Terrasoft.configuration.Structures["MoneyEdit"] = {innerHierarchyStack: ["MoneyEdit"]};
define("MoneyEdit", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.controls.MoneyEdit
	 * Control for editing values with money data type.
	 */
	Ext.define("Terrasoft.controls.MoneyEdit", {
		extend: "Terrasoft.FloatEdit",
		alternateClassName: "Terrasoft.MoneyEdit",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.FloatEdit#decimalPrecision
		 * @overridden
		 */
		decimalPrecision: null,

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.NumberEdit#init
		 * @overridden
		 */
		init: function() {
			if (this.decimalPrecision === null) {
				this.decimalPrecision = Terrasoft.SysValue.CURRENT_MONEY_DISPLAY_PRECISION;
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.controls.NumberEdit#getFormattedNumberValue
		 * @overridden
		 */
		getFormattedNumberValue: function(value) {
			var config = Ext.apply({}, this.displayNumberConfig);
			config.type = Terrasoft.DataValueType.MONEY;
			return Terrasoft.getFormattedNumberValue(value, config);
		}

		//endregion

	});

});


