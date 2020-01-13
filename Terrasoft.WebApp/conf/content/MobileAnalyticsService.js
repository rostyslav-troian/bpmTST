Terrasoft.configuration.Structures["MobileAnalyticsService"] = {innerHierarchyStack: ["MobileAnalyticsService"]};
/**
 * @class Terrasoft.AnalyticsService
 * Provides methods for work with analytics web service.
 */
Ext.define("Terrasoft.configuration.service.AnalyticsService", {
	alternateClassName: "Terrasoft.AnalyticsService",

	statics: {

		/**
		 * @private
		 * Path to analytics service.
		 */
		serviceUrl: "rest/AnalyticsService/",

		/**
		 * @private
		 */
		sendRequest: function(config) {
			Terrasoft.RequestManager.issueRequest({
				groupId: config.groupId,
				supressRequestEvents: false,
				requestFn: Terrasoft.Ajax.request,
				abortFn: Terrasoft.Ajax.abort,
				requestFnConfig: {
					isCancelable: true,
					url: Terrasoft.util.encodeServiceUrl(this.serviceUrl) + config.methodName,
					method: "POST",
					timeout: Terrasoft.core.enums.WebRequestTimeout.Ajax,
					jsonData: config.data,
					success: function(response) {
						var decodedResponse = Ext.JSON.decode(response.responseText, true);
						Ext.callback(config.success, config.scope, [decodedResponse]);
					},
					failure: function(response) {
						var parser = Ext.create("Terrasoft.ServiceResponseParser", response);
						var exception = parser.getServiceFailureException();
						Ext.callback(config.failure, config.scope, [exception]);
					},
					scope: this
				},
				responseToStatusCodeFn: function(response) {
					return response.status;
				},
				scope: Terrasoft.Ajax
			});
		},

		/**
		 * @private
		 */
		getGridDataConfig: function(config) {
			var data = {
				dashboardId: config.dashboardId,
				itemName: config.itemName
			};
			this.sendRequest({
				data: data,
				methodName: config.methodName,
				success: config.success,
				failure: config.failure,
				scope: config.scope
			});
		},

		/**
		 * @private
		 */
		getGridData: function(config) {
			var data = {
				dashboardId: config.dashboardId,
				itemName: config.itemName,
				timeZoneOffset: config.timeZoneOffset,
				filterValue: config.filterValue,
				serieIndex: config.serieIndex,
				rowCount: config.rowCount,
				rowOffset: config.rowOffset
			};
			this.sendRequest({
				data: data,
				methodName: config.methodName,
				success: config.success,
				failure: config.failure,
				scope: config.scope
			});
		},

		/**
		 * Retrieves dashboard's view config by id.
		 * @param {Object} config Configuration object:
		 * @param {String} config.id Dashboard id.
		 * @param {String} config.groupId (optional) Identifier for group of requests.
		 * @param {Function} config.success Called on success.
		 * @param {Function} config.failure Called on failure.
		 * @param {Object} config.scope Value of 'this' in the above functions.
		 */
		getDashboardViewConfig: function(config) {
			var data = {
				id: config.id
			};
			this.sendRequest({
				data: data,
				groupId: config.groupId,
				methodName: "GetDashboardViewConfig",
				success: config.success,
				failure: config.failure,
				scope: config.scope
			});
		},

		/**
		 * Retrieves dashboard's data by id.
		 * @param {Object} config Configuration object:
		 * @param {String} config.id Dashboard id.
		 * @param {String} config.groupId (optional) Identifier for group of requests.
		 * @param {Number} config.timeZoneOffset Time zone offset in minutes.
		 * @param {Function} config.success Called on success.
		 * @param {Function} config.failure Called on failure.
		 * @param {Object} config.scope Value of 'this' in the above functions.
		 */
		getDashboardData: function(config) {
			var data = {
				id: config.id,
				timeZoneOffset: config.timeZoneOffset
			};
			this.sendRequest({
				data: data,
				groupId: config.groupId,
				methodName: "GetDashboardData",
				success: config.success,
				failure: config.failure,
				scope: config.scope
			});
		},

		/**
		 * Retrieves dashboard's item data by name.
		 * @param {Object} config Configuration object:
		 * @param {String} config.dashboardId Dashboard id.
		 * @param {String} config.groupId (optional) Identifier for group of requests.
		 * @param {String} config.itemName Dashboard item name.
		 * @param {Number} config.timeZoneOffset Time zone offset in minutes.
		 * @param {Function} config.success Called on success.
		 * @param {Function} config.failure Called on failure.
		 * @param {Object} config.scope Value of 'this' in the above functions.
		 */
		getDashboardItemData: function(config) {
			var data = {
				dashboardId: config.dashboardId,
				itemName: config.itemName,
				timeZoneOffset: config.timeZoneOffset
			};
			this.sendRequest({
				data: data,
				groupId: config.groupId,
				methodName: "GetDashboardItemData",
				success: config.success,
				failure: config.failure,
				scope: config.scope
			});
		},

		/**
		 * Retrieves dashboard's item data by binding filter.
		 * @param {Object} config Configuration object:
		 * @param {String} config.dashboardId Dashboard id.
		 * @param {String} config.groupId (optional) Identifier for group of requests.
		 * @param {String} config.itemName Dashboard item name.
		 * @param {String} config.bindingColumnValue Value for section binding filter.
		 * @param {Number} config.timeZoneOffset Time zone offset in minutes.
		 * @param {Function} config.success Called on success.
		 * @param {Function} config.failure Called on failure.
		 * @param {Object} config.scope Value of 'this' in the above functions.
		 */
		getDashboardItemDataForSection: function(config) {
			var data = {
				dashboardId: config.dashboardId,
				itemName: config.itemName,
				timeZoneOffset: config.timeZoneOffset,
				bindingColumnValue: config.bindingColumnValue
			};
			this.sendRequest({
				data: data,
				groupId: config.groupId,
				methodName: "GetDashboardItemDataForSection",
				success: config.success,
				failure: config.failure,
				scope: config.scope
			});
		},

		/**
		 * Retrieves chart's display data by name.
		 * @param {Object} config Configuration object:
		 * @param {String} config.dashboardId Dashboard id.
		 * @param {String} config.itemName Chart name.
		 * @param {Number} config.timeZoneOffset Time zone offset in minutes.
		 * @param {String} config.filterValue Filter value by group column.
		 * @param {Number} config.serieIndex Index of chart serie.
		 * @param {Number} config.rowCount Rows count.
		 * @param {Number} config.rowOffset Rows offset.
		 * @param {Function} config.success Called on success.
		 * @param {Function} config.failure Called on failure.
		 * @param {Object} config.scope Value of 'this' in the above functions.
		 */
		getChartGridData: function(config) {
			if (Ext.isDefined(config.filterValue)) {
				config.methodName = "GetChartGridDataByFilter";
			} else {
				config.methodName = "GetChartGridData";
			}
			this.getGridData(config);
		},

		/**
		 * Retrieves chart's grid configs by name.
		 * @param {Object} config Configuration object:
		 * @param {String} config.dashboardId Dashboard id.
		 * @param {String} config.itemName Chart name.
		 * @param {Function} config.success Called on success.
		 * @param {Function} config.failure Called on failure.
		 * @param {Object} config.scope Value of 'this' in the above functions.
		 */
		getChartGridConfigs: function(config) {
			config.methodName = "GetChartGridDataConfigs";
			this.getGridDataConfig(config);
		},

		/**
		 * Retrieves indicator's grid config by indicator name.
		 * @param {Object} config Configuration object:
		 * @param {String} config.dashboardId Dashboard id.
		 * @param {String} config.itemName Indicator name.
		 * @param {Function} config.success Called on success.
		 * @param {Function} config.failure Called on failure.
		 * @param {Object} config.scope Value of 'this' in the above functions.
		 */
		getIndicatorGridDataConfig: function(config) {
			config.methodName = "GetIndicatorGridDataConfig";
			this.getGridDataConfig(config);
		},

		/**
		 * Retrieves indicator's display data by indicator name.
		 * @param {Object} config Configuration object:
		 * @param {String} config.dashboardId Dashboard id.
		 * @param {String} config.itemName Indicator name.
		 * @param {Number} config.timeZoneOffset Time zone offset in minutes.
		 * @param {Number} config.rowCount Rows count.
		 * @param {Number} config.rowOffset Rows offset.
		 * @param {Function} config.success Called on success.
		 * @param {Function} config.failure Called on failure.
		 * @param {Object} config.scope Value of 'this' in the above functions.
		 */
		getIndicatorGridData: function(config) {
			config.methodName = "GetIndicatorGridData";
			this.getGridData(config);
		}

	}

});


