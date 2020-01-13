Terrasoft.configuration.Structures["MobileIndicatorDashboardItem"] = {innerHierarchyStack: ["MobileIndicatorDashboardItem"]};
/**
 * @class Terrasoft.configuration.IndicatorDashboardItem
 * Dashboard item that displays indicator widget.
 */
Ext.define("Terrasoft.configuration.controls.IndicatorDashboardItem", {
	extend: "Terrasoft.configuration.controls.BaseDashboardItem",
	alternateClassName: "Terrasoft.IndicatorDashboardItem",

	config: {

		/**
		 * @cfg {String} value Value.
		 */
		value: null,

		/**
		 * @cfg {String} format Format of value.
		 */
		format: null,

		/**
		 * @cfg {Terrasoft.DataValueType} dataValueType Data value type.
		 */
		dataValueType: null,

		/**
		 * @inheritdoc
		 */
		cssSuffix: "indicator",

		/**
		 * @inheritdoc
		 */
		fullscreenButton: true,

		/**
		 * @inheritdoc
		 */
		configGeneratorClassName: "Terrasoft.IndicatorDashboardConfigGenerator"

	},

	/**
	 * @property
	 * @private
	 */
	indicatorComponent: null,

	/**
	 * @deprecated
	 */
	defaultFormat: null,

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	createConfigGenerator: function(config) {
		config = Ext.applyIf(config || {}, {
			format: this.getFormat()
		});
		return this.callParent([config]);
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-applier
	 */
	applyValue: function(value) {
		return this.convertValue(value, this.getDataValueType());
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateValue: function(value) {
		if (this.indicatorComponent) {
			Ext.destroy(this.indicatorComponent);
		}
		this.indicatorComponent = Ext.create("Terrasoft.IndicatorDashboardComponent", {
			value: value
		});
		this.innerHtmlElement.appendChild(this.indicatorComponent.element);
	}

});


