Terrasoft.configuration.Structures["MobileChartDashboardItemPageView"] = {innerHierarchyStack: ["MobileChartDashboardItemPageView"]};
/**
 * @class Terrasoft.configuration.view.ChartDashboardItemPage
 */
Ext.define("Terrasoft.configuration.view.ChartDashboardItemPage", {
	extend: "Terrasoft.configuration.view.DashboardItemPage",
	alternateClassName: "Terrasoft.view.ChartDashboardItemPage",

	config: {

		/**
		 * @inheritdoc
		 */
		id: "ChartDashboardItemPage",

		/**
		 * @inheritdoc
		 */
		itemClassName: "Terrasoft.Chart"

	},

	//region Methods: Protected

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	createDashboardItem: function(config) {
		var dashboardItem = this.callParent(arguments);
		dashboardItem.on("charttap", this.onDashboardItemTap, this);
		dashboardItem.on("chartpointtap", this.onDashboardItemPointTap, this);
		return dashboardItem;
	},

	/**
	 * Handles tap on dashboard item.
	 * @protected
	 * @virtual
	 */
	onDashboardItemTap: function(chart, config) {
		this.fireEvent("charttap", chart, config);
	},

	/**
	 * Handles tap on dashboard item point.
	 * @protected
	 * @virtual
	 */
	onDashboardItemPointTap: function(chart, pointIndex, serieIndex) {
		this.fireEvent("chartpointtap", chart, pointIndex, serieIndex);
	}

	//endregion

});


