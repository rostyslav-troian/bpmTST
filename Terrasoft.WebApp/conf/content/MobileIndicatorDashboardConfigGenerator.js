Terrasoft.configuration.Structures["MobileIndicatorDashboardConfigGenerator"] = {innerHierarchyStack: ["MobileIndicatorDashboardConfigGenerator"]};
/**
 * @class Terrasoft.configuration.IndicatorDashboardConfigGenerator
 * Config generator of indicator dashboard.
 */
Ext.define("Terrasoft.configuration.IndicatorDashboardConfigGenerator", {
	extend: "Terrasoft.BaseDashboardItemConfigGenerator",
	alternateClassName: "Terrasoft.IndicatorDashboardConfigGenerator",

	config: {

		/**
		 * @cfg {String} format Format of value.
		 */
		format: null

	},

	/**
	 * @protected
	 */
	defaultFormat: {
		textDecorator: "{0}"
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	convertValue: function(value, type) {
		var result;
		var formatConfig = this.getFormat() || this.defaultFormat;
		value = this.parseValue(value, type);
		if (Ext.isEmpty(value) && Terrasoft.Number.isNumericDataValueType(type)) {
			value = 0;
		}
		if (Ext.isNumber(value)) {
			if (Ext.isEmpty(formatConfig.decimalPrecision)) {
				formatConfig.decimalPrecision = (formatConfig.type === Terrasoft.DataValueType.Integer) ? 0 : 2;
			}
			if (formatConfig.decimalPrecision === 0) {
				value = Math.round(value);
			}
			result = Terrasoft.Number.getFormattedValue(value, formatConfig);
		} else if (Ext.isDate(value)) {
			var dateFormat = formatConfig.dateFormat || Terrasoft.Date.getDateFormat();
			result = Ext.Date.format(value, dateFormat);
		} else {
			result = "";
		}
		var textDecorator = formatConfig.textDecorator;
		if (textDecorator) {
			result = Ext.String.format(textDecorator, result);
		}
		return result;
	}

});


