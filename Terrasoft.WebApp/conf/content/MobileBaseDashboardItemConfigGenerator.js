Terrasoft.configuration.Structures["MobileBaseDashboardItemConfigGenerator"] = {innerHierarchyStack: ["MobileBaseDashboardItemConfigGenerator"]};
/**
 * @class Terrasoft.configuration.BaseDashboardItemConfigGenerator
 * Config generator of base dashboard item.
 */
Ext.define("Terrasoft.configuration.BaseDashboardItemConfigGenerator", {
	alternateClassName: "Terrasoft.BaseDashboardItemConfigGenerator",

	//region Constructors: Public

	constructor: function(config) {
		this.initConfig(config);
	},

	//endregion

	//region Methods: Protected

	/**
	 * Parses value by type.
	 * @protected
	 * @virtual
	 * @param {*} value Value.
	 * @param {Terrasoft.DataValueType} type Data value type.
	 */
	parseValue: function(value, type) {
		if (type === Terrasoft.DataValueType.Time || type === Terrasoft.DataValueType.Date ||
			type === Terrasoft.DataValueType.DateTime) {
			if (Ext.isEmpty(value)) {
				value = null;
			} else {
				value = Terrasoft.Date.parseDateValue(value);
			}
		}
		return value;
	},

	/**
	 * Converts value to string depends on data value type.
	 * @protected
	 * @virtual
	 * @param {*} value Value.
	 * @param {Terrasoft.DataValueType} type Data value type.
	 * @return {String} String value.
	 */
	convertValue: function(value, type) {
		value = this.parseValue(value, type);
		return Terrasoft.String.getTypedValue(value, type);
	},

	/**
	 * Returns sortable value.
	 * @protected
	 * @virtual
	 * @param {*} value Value.
	 * @param {Terrasoft.DataValueType} type Data value type.
	 * @return {*} Sortable value.
	 */
	getSortableValue: function(value, type) {
		value = this.parseValue(value, type);
		if (type === Terrasoft.DataValueType.Lookup) {
			return Terrasoft.String.getTypedValue(value, type);
		} else {
			if (Ext.isDate(value)) {
				value = value.getTime();
			}
			return value;
		}
	}

	//endregion

});


