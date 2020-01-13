Terrasoft.configuration.Structures["MobileAnalyticsServiceGridDataProxy"] = {innerHierarchyStack: ["MobileAnalyticsServiceGridDataProxy"]};
/**
 * @class Terrasoft.configuration.AnalyticsServiceGridDataProxy
 */
Ext.define("Terrasoft.configuration.AnalyticsServiceGridDataProxy", {
	extend: "Ext.data.proxy.Proxy",

	config: {

		/**
		 * @cfg {String} methodName Service method name.
		 */
		methodName: null,

		/**
		 * @cfg {String} dashboardId Id of SysDashboard.
		 */
		dashboardId: null,

		/**
		 * @cfg {String} itemName Dashboard item name.
		 */
		itemName: null,

		/**
		 * @cfg {String} groupId Id of request group.
		 */
		groupId: null,

		/**
		 * @cfg {Object[]} columns List of column configurations.
		 */
		columns: null

	},

	/**
	 * @private
	 */
	convertDataToRecords: function(data) {
		data = Terrasoft.AnalyticsServiceResponseParser.parseData(data, this.getColumns());
		var records = [];
		for (var i = 0, ln = data.length; i < ln; i++) {
			records.push(Terrasoft.model.SimpleModel.create({
				Data: data[i]
			}));
		}
		return records;
	},

	/**
	 * @private
	 */
	doRequest: function() {
		var methodName = this.getMethodName();
		var params = this.operation.getParams();
		var filterValue;
		var serieIndex;
		if (params) {
			filterValue = params.filterValue;
			serieIndex = params.serieIndex;
		}
		Terrasoft.AnalyticsService[methodName]({
			dashboardId: this.getDashboardId(),
			itemName: this.getItemName(),
			rowCount: this.operation.getLimit(),
			rowOffset: this.operation.getStart(),
			filterValue: filterValue,
			serieIndex: serieIndex,
			timeZoneOffset: -Terrasoft.util.getCurrentTimezoneOffsetInMinutes(),
			groupId: this.getGroupId(),
			success: function(data) {
				var records = this.convertDataToRecords(data);
				var total = Terrasoft.Proxy.ProxyUtils.calculateTotalRecords(this.operation, records.length);
				var result = new Ext.data.ResultSet({
					records: records,
					total: total
				});
				this.operation.setResultSet(result);
				this.operation.setCompleted();
				this.operation.setSuccessful();
				Ext.callback(this.callback, this.scope || this, [this.operation]);
			},
			failure: function(exception) {
				this.processFailedResponse(exception);
			},
			scope: this
		});
	},

	/**
	 * @private
	 */
	processFailedResponse: function(exception) {
		var operation = this.operation;
		operation.setException(exception);
		operation.setCompleted();
		this.fireEvent("exception", exception);
		Ext.callback(this.callback, this.scope || this, [operation]);
	},

	/**
	 * @private
	 */
	init: function(operation, callback, scope) {
		this.operation = operation;
		this.callback = callback;
		this.scope = scope;
	},

	/**
	 * @inheritdoc
	 */
	read: function(operation, callback, scope) {
		this.init(operation, callback, scope);
		this.doRequest();
	}

});


