Terrasoft.configuration.Structures["MobileDashboardDataManager"] = {innerHierarchyStack: ["MobileDashboardDataManager"]};
/**
 * @class Terrasoft.configuration.DashboardDataManager
 * Manages dashboard data.
 */
Ext.define("Terrasoft.configuration.DashboardDataManager", {
	alternateClassName: "Terrasoft.DashboardDataManager",
	singleton: true,

	/**
	 * Loads layout config of dashboards.
	 * @param {Object} config Configuration object:
	 * @param {String} config.dashboardId Id of dashboard.
	 * @param {Function} config.success Called on success.
	 * @param {Function} config.failure Called on failure.
	 * @param {Object} config.scope Value of 'this' in the above functions.
	 */
	loadStructure: function(config) {
		Terrasoft.AnalyticsService.getDashboardViewConfig({
			id: config.dashboardId,
			groupId: Terrasoft.configuration.consts.DashboardRequestsGroupId,
			success: config.success,
			failure: config.failure,
			scope: config.scope
		});
	},

	/**
	 * Loads information of dashboards.
	 * @param {Object} config Configuration object:
	 * @param {String} config.sectionId Id of section.
	 * @param {Function} config.success Called on success.
	 * @param {Function} config.failure Called on failure.
	 * @param {Object} config.scope Value of 'this' in the above functions.
	 */
	loadRecords: function(config) {
		var sectionId = config.sectionId || Terrasoft.SysModuleId.Dashboard;
		var filters = Ext.create("Terrasoft.Filter", {
			property: "Section",
			value: sectionId
		});
		var proxy = Terrasoft.DataUtils.getOnlineProxy();
		Terrasoft.DataUtils.loadRecords({
			modelName: "SysDashboard",
			columns: ["Id", "Caption"],
			orderByColumns: [{column: "Caption", orderType: Terrasoft.OrderTypes.ASC}],
			filters: filters,
			proxy: proxy,
			isCancelable: true,
			success: function(records, operation) {
				Ext.callback(config.success, config.scope, [records, operation]);
			},
			failure: function(exception) {
				Ext.callback(config.failure, config.scope, [exception]);
			},
			scope: this
		});
	},

	/**
	 * Loads dashboard item.
	 * @param {Object} config Configuration object:
	 * @param {SysDashboard} config.sysDashboardRecord Instance of model.
	 * @param {String} config.itemName Dashboard's item name.
	 * @param {Function} config.success Called on success.
	 * @param {Function} config.failure Called on failure.
	 * @param {Object} config.scope Value of 'this' in the above functions.
	 */
	loadDashboardItem: function(config) {
		Terrasoft.AnalyticsService.getDashboardItemData({
			dashboardId: config.sysDashboardRecord.getPrimaryColumnValue(),
			groupId: Terrasoft.configuration.consts.DashboardRequestsGroupId,
			itemName: config.itemName,
			timeZoneOffset: -Terrasoft.util.getCurrentTimezoneOffsetInMinutes(),
			success: config.success,
			failure: config.failure,
			scope: config.scope
		});
	}

});


