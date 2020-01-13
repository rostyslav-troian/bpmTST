Terrasoft.configuration.Structures["MobileIndicatorDashboardItemPageView"] = {innerHierarchyStack: ["MobileIndicatorDashboardItemPageView"]};
/**
 * @class Terrasoft.configuration.view.IndicatorDashboardItemPage
 */
Ext.define("Terrasoft.configuration.view.IndicatorDashboardItemPage", {
	extend: "Terrasoft.view.DashboardItemPage",
	alternateClassName: "Terrasoft.view.IndicatorDashboardItemPage",

	config: {

		/**
		 * @inheritdoc
		 */
		id: "IndicatorDashboardItemPage",

		/**
		 * @inheritdoc
		 */
		itemClassName: "Terrasoft.IndicatorDashboardComponent"

	},

	//region Methods: Protected

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initialize: function() {
		this.callParent(arguments);
		this.addCls("cf-indicator-dashboard-item-page");
	}

	//endregion

});


