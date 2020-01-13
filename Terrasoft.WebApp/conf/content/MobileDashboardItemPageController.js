Terrasoft.configuration.Structures["MobileDashboardItemPageController"] = {innerHierarchyStack: ["MobileDashboardItemPageController"]};
/**
 * @class Terrasoft.configuration.controller.DashboardItemPage
 * @abstract
 */
Ext.define("Terrasoft.configuration.controller.DashboardItemPage", {
	extend: "Terrasoft.controller.BasePage",
	alternateClassName: "Terrasoft.controller.DashboardItemPage",

	//region Properties: Protected

	/**
	 * @property {String} gridDataServiceName Method name for getting data.
	 * @protected
	 */
	gridDataServiceName: null,

	/**
	 * @property {String} gridDataConfigServiceName Method name for getting data config.
	 * @protected
	 */
	gridDataConfigServiceName: null,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	loadDashboardItemMetadata: function(callback) {
		Terrasoft.DashboardDataManager.loadDashboardItem({
			sysDashboardRecord: this.getSysDashboardRecord(),
			itemName: this.getDashboardItemName(),
			success: function(data) {
				Ext.callback(callback, this, [data]);
			},
			failure: function(exception) {
				this.callFailure(exception);
			},
			scope: this
		});
	},

	//endregion

	//region Methods: Protected

	/**
	 * @protected
	 */
	getStore: function() {
		var view = this.getView();
		var grid = view.getGrid();
		return grid.getStore();
	},

	/**
	 * Loads grid config.
	 * @protected
	 * @virtual
	 * @param {Function} callback Callback function.
	 */
	loadGridConfig: function(callback) {
		var record = this.getSysDashboardRecord();
		Terrasoft.AnalyticsService[this.gridDataConfigServiceName]({
			dashboardId: record.getId(),
			itemName: this.getDashboardItemName(),
			success: function(gridConfig) {
				Ext.callback(callback, this, [gridConfig]);
			},
			failure: function(exception) {
				this.callFailure(exception);
			},
			scope: this
		});
	},

	/**
	 * Generates config of dashboard item.
	 * @protected
	 * @virtual
	 * @param {Object} metadata Metadata of grid.
	 * @return {Object} Config of dashboard item.
	 */
	generateDashboardItemConfig: Terrasoft.abstractFn,

	/**
	 * Returns name by column config.
	 * @protected
	 * @param {Object} columnConfig Column config.
	 * @return {String} Column name.
	 */
	getColumnConfigName: function(columnConfig) {
		return columnConfig.bindTo || columnConfig.metaPath;
	},

	/**
	 * Returns dashboard record.
	 * @protected
	 * @return {SysDashboardRecord} Dashboard record.
	 */
	getSysDashboardRecord: function() {
		var pageHistoryConfig = this.getPageHistoryItem().getRawConfig();
		return pageHistoryConfig.sysDashboardRecord;
	},

	/**
	 * Returns dashboard item name.
	 * @protected
	 * @return {String} Dashboard item name.
	 */
	getDashboardItemName: function() {
		var pageHistoryConfig = this.getPageHistoryItem().getRawConfig();
		return pageHistoryConfig.itemName;
	},

	/**
	 * Initializes dashboard item by metadata.
	 * @protected
	 * @virtual
	 * @param {Object} metadata Metadata of grid.
	 */
	initializeDashboardItemMetadata: function(metadata) {
		var view = this.getView();
		var navigationPanel = view.getNavigationPanel();
		navigationPanel.setTitle(metadata.caption);
		var dashboardItemConfig = this.generateDashboardItemConfig(metadata);
		this.setViewDashboardItem(dashboardItemConfig);
	},

	/**
	 * Initializes grid by config.
	 * @protected
	 * @virtual
	 * @param {Object} gridConfig Config of grid.
	 * @param {Function} callback Callback function.
	 */
	initializeGridConfig: function(gridConfig, callback) {
		Terrasoft.StructureLoader.loadModelsWithDependencies({
			modelNames: [gridConfig.schemaName],
			success: function() {
				this.setViewGrid(gridConfig);
				Ext.callback(callback, this);
			},
			scope: this
		});
	},

	/**
	 * Creates proxy.
	 * @protected
	 * @virtual
	 * @param {Object} gridConfig Config of grid.
	 * @return {Terrasoft.configuration.AnalyticsServiceGridDataProxy} Proxy.
	 */
	createAnalyticsServiceGridDataProxy: function(gridConfig) {
		var record = this.getSysDashboardRecord();
		return Ext.create("Terrasoft.configuration.AnalyticsServiceGridDataProxy", {
			methodName: this.gridDataServiceName,
			dashboardId: record.getId(),
			itemName: this.getDashboardItemName(),
			groupId: Terrasoft.configuration.consts.DashboardRequestsGroupId,
			columns: gridConfig.columns
		});
	},

	/**
	 * Creates store.
	 * @param {Object} gridConfig Config of grid.
	 * @return {Ext.data.Store} Store.
	 */
	createAnalyticsServiceGridDataStore: function(gridConfig) {
		var proxy = this.createAnalyticsServiceGridDataProxy(gridConfig);
		return Ext.create("Ext.data.Store", {
			proxy: proxy
		});
	},

	/**
	 * Sets grid by config.
	 * @protected
	 * @virtual
	 * @param {Object} gridConfig Config of grid.
	 */
	setViewGrid: function(gridConfig) {
		var store = this.createAnalyticsServiceGridDataStore(gridConfig);
		var view = this.getView();
		view.setGrid({
			prepareDataFn: function(data) {
				return data.Data;
			},
			store: store,
			columnsConfig: this.getGridViewColumnsConfig(gridConfig),
			listeners: {
				recordlinktap: this.onGridRecordLinkTap,
				scope: this
			}
		});
	},

	/**
	 * Gets columns config of grid.
	 * @protected
	 * @virtual
	 * @param {Object} gridConfig Config of grid.
	 * @return {Object[]} Columns config.
	 */
	getGridViewColumnsConfig: function(gridConfig) {
		var columns = gridConfig.columns;
		var gridColumnsConfig = [];
		var columnLength = columns.length;
		var averageCols = Math.floor(24 / columnLength);
		for (var i = 0; i < columnLength; i++) {
			var columnConfig = columns[i];
			var columnName = this.getColumnConfigName(columnConfig);
			var gridColumnConfig = Terrasoft.DashboardUtils.getGridColumnConfig({
				modelName: gridConfig.schemaName,
				columnName: columnName,
				caption: columnConfig.caption || columnName,
				cols: columnConfig.colSpan || averageCols,
				dataValueType: columnConfig.dataValueType,
				columnModelName: columnConfig.referenceSchemaName
			});
			gridColumnsConfig.push(gridColumnConfig);
		}
		return gridColumnsConfig;
	},

	/**
	 * Handles exception.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.Exception} exception Exception.
	 */
	callFailure: function(exception) {
		Terrasoft.MessageBox.showException(exception);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeView: function(view) {
		this.setMasked(true);
		this.callParent(arguments);
		this.loadDashboardItemMetadata(function(metadata) {
			this.initializeDashboardItemMetadata(metadata);
		});
		this.loadGridConfig(function(gridConfig) {
			this.initializeGridConfig(gridConfig, function() {
				this.loadGridData({
					success: function() {
						this.setMasked(false);
					},
					failure: function(exception) {
						this.setMasked(false);
						this.callFailure(exception);
					},
					scope: this
				});
			});
		});
	},

	/**
	 * Loads dashboard item data.
	 * @protected
	 * @virtual
	 * @param {Object} config Configuration object:
	 * @param {Function} config.success Called on success.
	 * @param {Function} config.failure Called on failure.
	 * @param {Object} config.scope Scope of the callback method.
	 */
	loadGridData: function(config) {
		config = config || {};
		this.setMasked(true);
		var store = this.getStore();
		store.loadPage(1, {
			isCancelable: true,
			callback: function(records, operation, successful) {
				this.setMasked(false);
				if (successful) {
					Ext.callback(config.success, config.scope);
				} else {
					Ext.callback(config.failure, config.scope, [operation.getError()]);
				}
			},
			scope: this
		});
	},

	/**
	 * Sets view dashboard item.
	 * @protected
	 * @virtual
	 * @param {Object} dashboardItemConfig Config of dashboard item.
	 */
	setViewDashboardItem: function(dashboardItemConfig) {
		var view = this.getView();
		view.setDashboardItem(dashboardItemConfig);
	},

	/**
	 * Called when grid record link tapped.
	 * @protected
	 * @virtual	 *
	 * @param {Terrasoft.Grid} grid Instance of grid.
	 * @param {String} modelName Name of model.
	 * @param {String} recordId Id of record.
	 */
	onGridRecordLinkTap: function(grid, modelName, recordId) {
		Terrasoft.util.openPreviewPage(modelName, {
			recordId: recordId
		});
	}

	//endregion

});


