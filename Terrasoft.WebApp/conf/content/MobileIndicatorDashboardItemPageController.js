Terrasoft.configuration.Structures["MobileIndicatorDashboardItemPageController"] = {innerHierarchyStack: ["MobileIndicatorDashboardItemPageController"]};
/**
 * @class Terrasoft.configuration.controller.IndicatorDashboardItemPage
 */
Ext.define("Terrasoft.configuration.controller.IndicatorDashboardItemPage", {
	extend: "Terrasoft.controller.DashboardItemPage",
	alternateClassName: "Terrasoft.controller.IndicatorDashboardItemPage",

	config: {
		refs: {
			view: "#IndicatorDashboardItemPage"
		}
	},

	//region Properties: Protected

	/**
	 * @inheritdoc
	 * @overridden
	 */
	gridDataServiceName: "getIndicatorGridData",

	/**
	 * @inheritdoc
	 * @overridden
	 */
	gridDataConfigServiceName: "getIndicatorGridDataConfig",

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	getIndicatorValue: function(metadata) {
		var configGenerator = Ext.create("Terrasoft.IndicatorDashboardConfigGenerator", {
			format: metadata.format
		});
		return configGenerator.convertValue(metadata.data, metadata.dataValueType);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	generateDashboardItemConfig: function(metadata) {
		return {
			value: this.getIndicatorValue(metadata),
			style: metadata.style || Terrasoft.DefaultDashboardStyle
		};
	}

	//endregion

});


