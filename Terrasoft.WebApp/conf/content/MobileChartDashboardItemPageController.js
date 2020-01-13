Terrasoft.configuration.Structures["MobileChartDashboardItemPageController"] = {innerHierarchyStack: ["MobileChartDashboardItemPageController"]};
/**
 * @class Terrasoft.configuration.controller.ChartDashboardItemPage
 */
Ext.define("Terrasoft.configuration.controller.ChartDashboardItemPage", {
	extend: "Terrasoft.controller.DashboardItemPage",
	alternateClassName: "Terrasoft.controller.ChartDashboardItemPage",

	config: {
		refs: {
			view: "#ChartDashboardItemPage"
		}
	},

	//region Properties: Private

	/**
	 * @private
	 */
	itemMetadata: null,

	/**
	 * @private
	 */
	gridConfigs: null,

	/**
	 * @private
	 */
	serieIndex: null,

	//endregion

	//region Properties: Protected

	/**
	 * @inheritdoc
	 * @overridden
	 */
	gridDataServiceName: "getChartGridData",

	/**
	 * @inheritdoc
	 * @overridden
	 */
	gridDataConfigServiceName: "getChartGridConfigs",

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	intitializeGridIfNeeded: function(serieIndex, callback) {
		if (serieIndex === this.serieIndex) {
			Ext.callback(callback, this);
		} else {
			var gridConfig = this.gridConfigs[serieIndex];
			this.serieIndex = serieIndex;
			this.initializeGridConfig(gridConfig, callback);
		}
	},

	/**
	 * @private
	 */
	getFilterValue: function(index, serieIndex) {
		var itemValue = this.itemMetadata.data[index].xAxis;
		var axisConfig = this.itemMetadata.chartConfig.seriesConfig[serieIndex].xAxis;
		if (axisConfig.dateTimeFormat) {
			return Terrasoft.encode(itemValue);
		} else if (axisConfig.dataValueType === Terrasoft.DataValueType.Lookup) {
			return itemValue.value;
		} else {
			return itemValue;
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeView: function(view) {
		this.gridConfigs = [];
		this.callParent(arguments);
		view.on("charttap", this.onChartTap, this);
		view.on("chartpointtap", this.onChartPointTap, this);
	},

	/**
	 * Handles tap on dashboard item.
	 * @protected
	 * @virtual
	 */
	onChartTap: function(chart) {
		chart.deselectAllPoints();
		this.intitializeGridIfNeeded(0, function() {
			this.loadGridData();
		});
	},

	/**
	 * Handles tap on dashboard item point.
	 * @protected
	 * @virtual
	 */
	onChartPointTap: function(chart, pointIndex, serieIndex) {
		chart.selectPoint(pointIndex, serieIndex);
		var filterValue = this.getFilterValue(pointIndex, serieIndex);
		this.intitializeGridIfNeeded(serieIndex, function() {
			this.loadGridData({
				serieIndex: serieIndex,
				filterValue: filterValue
			});
		});
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	createAnalyticsServiceGridDataStore: function() {
		var proxy = this.callParent(arguments);
		proxy.setRemoteFilter(true);
		return proxy;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	loadGridConfig: function(callback) {
		this.callParent([function(gridConfigs) {
			this.gridConfigs = gridConfigs || [];
			var defaultGridConfig = gridConfigs[0];
			Ext.callback(callback, this, [defaultGridConfig]);
		}]);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	loadGridData: function(config) {
		config = config || {};
		var store = this.getStore();
		store.setParams({
			filterValue: config.filterValue,
			serieIndex: config.serieIndex
		});
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeDashboardItemMetadata: function(metadata) {
		this.itemMetadata = metadata;
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	generateDashboardItemConfig: function(metadata) {
		var configGenerator = Ext.create("Terrasoft.ChartDashboardItemConfigGenerator");
		var config = configGenerator.generate({
			chartConfig: metadata.chartConfig,
			chartData: metadata.data
		});
		config.legend = false;
		return config;
	}

	//endregion

});


