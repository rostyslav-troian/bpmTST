Terrasoft.configuration.Structures["DashboardListedGridViewConfig"] = {innerHierarchyStack: ["DashboardListedGridViewConfig"]};
define("DashboardListedGridViewConfig", ["DashboardListedGridViewConfigResources", "DashboardGridViewConfig",
	"InnerListedGridHtmlGenerator"], function(resources) {
	Ext.define("Terrasoft.DashboardListedGridViewConfig", {
		extend: "Terrasoft.DashboardGridViewConfig",

		/**
		 * Resources of the localizable images.
		 * @private
		 * @type {Object}
		 */
		_localizableImages: null,

		/**
		 * @inheritdoc
		 * @override Terrasoft.DashboardGridViewConfig#constructor
		 */
		constructor: function() {
			this.callParent(arguments);
			this._localizableImages = resources && resources.localizableImages || {};
		},

		/**
		 * Returns grid tools view config.
		 * @private
		 * @param {String} moduleId Dashboard module id.
		 * @returns {Object} Grid tools view config.
		 */
		_getGridToolsViewConfig: function(moduleId) {
			return {
				"name": Ext.String.format("{0}-tools", moduleId),
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"wrapClass": ["highchart-tools"],
				"items": [{
					"name": moduleId + "-settings-button",
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.Settings"},
					"markerValue": "SettingsButton",
					"menu": [
						{
							"name": "exportToExcel",
							"caption": {"bindTo": "Resources.Strings.ExportToExcelCaption"},
							"click": {"bindTo": "exportToExcel"},
							"imageConfig": this._localizableImages.ExportToExcelBtnImage
						},
						{
							"name": "switchViewMode",
							"caption": {"bindTo": "getSwitchGridCellViewTypeMenuCaption"},
							"click": {"bindTo": "switchGridCellViewType"}
						}
					]
				}]
			};
		},

		/**
		 * Returns dashboard grid header items view config.
		 * @private
		 * @param {String} moduleId Dashboard module id.
		 * @param {String} dashBoardGridWrapperId Dashboard grid wrapper id.
		 * @returns {Object[]} Dashboard grid header items view config.
		 */
		_getDashboardGridHeaderItems: function(moduleId, dashBoardGridWrapperId) {
			var gridHeaderItems = [{
				"name": "dashboard-grid-caption" + moduleId,
				"itemType": Terrasoft.ViewItemType.LABEL,
				"caption": {"bindTo": "caption"},
				"labelClass": "default-widget-header-label"
			}, {
				"itemType": Terrasoft.ViewItemType.BUTTON,
				"name": Ext.String.format("{0}-full-screen-btn", dashBoardGridWrapperId),
				"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				"imageConfig": {"bindTo": "Resources.Images.FullScreenImg"},
				"classes": {
					"wrapperClass": ["grid-dashboard-full-screen-btn full-screen-btn"]
				},
				"click": {"bindTo": "onFullScreenBtnClick"},
				"tag": dashBoardGridWrapperId,
				"markerValue": "full-screen-btn"
			}, 	this._getGridToolsViewConfig(moduleId)];
			return gridHeaderItems;
		},

		/**
		 * Generates grid view config.
		 * @private
		 * @param {String} moduleId Dashboard module id.
		 * @param {Object} config Dashboard module config.
		 * @returns {Object} Grid view config.
		 */
		_getDashboardGridViewConfig: function(moduleId, config) {
			var listedConfig = this.getListedConfig(config);
			return {
				"id": Ext.String.format("grid-{0}", moduleId),
				"name": "DataGrid",
				"collection": {"bindTo": "GridData"},
				"itemType": Terrasoft.ViewItemType.GRID,
				"type": Terrasoft.GridType.LISTED,
				"primaryColumnName": "Id",
				"linkClick": {"bindTo": "onLinkClick"},
				"safeBind": true,
				"listedZebra": true,
				"isEmpty": {"bindTo": "IsGridEmpty"},
				"isLoading": {"bindTo": "IsGridLoading"},
				"listedConfig": listedConfig,
				"listedGridHtmlGeneratorClassName": "Terrasoft.InnerListedGridHtmlGenerator",
				"className": "Terrasoft.BaseViewGrid",
				"gridCellViewType": {"bindTo": "GridCellViewType"},
				"loadMoreBtnClick": {"bindTo": "onLoadMoreBtnClick"},
				"watchedRowInViewport": {"bindTo": "loadGridData"},
				"loadMoreBtnVisible": {"bindTo": "CanLoadMoreData"},
				"loadMoreBtnCaption": {"bindTo": "Resources.Strings.LoadMoreButtonCaption"},
				"watchRowInViewport": {"bindTo": "WatchRowInViewport"}
			};
		},

		/**
		 * @inheritdoc
		 * @override Terrasoft.DashboardGridViewConfig#generate
		 */
		generate: function(config) {
			var moduleId = Terrasoft.Component.generateId();
			var dashBoardGridWrapperId = Ext.String.format("gridContainer-{0}", moduleId);
			return {
				"id": dashBoardGridWrapperId,
				"name": dashBoardGridWrapperId,
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": [
						"dashboard-grid-container",
						"dashboard-listed-grid",
						config.style
					]
				},
				"items": [{
					"name": Ext.String.format("gridCaptionContainer-{0}", moduleId),
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["default-widget-header", config.style]},
					"items": this._getDashboardGridHeaderItems(moduleId, dashBoardGridWrapperId)
				}, this._getDashboardGridViewConfig(moduleId, config)]
			};
		},

		/**
		 * Gets config of the listed property.
		 * @protected
		 * @param {Object} config Configuration of grid item.
		 * @param {Object} config.gridConfig Configuration object of the grid columns.
		 * @return {Object} Config of the listed property.
		 */
		getListedConfig: function(config) {
			var listedConfig = {};
			var columnsConfig = this._getGridColumnsConfig(config);
			var captionsConfig = this._getGridCaptionsConfig(config);
			listedConfig.columnsConfig = columnsConfig;
			listedConfig.captionsConfig = captionsConfig;
			return listedConfig;
		},

		/**
		 * Gets config of the grid columns.
		 * @private
		 * @param {Object} config Configuration of grid item.
		 * @param {Object} config.gridConfig Configuration object of the grid columns.
		 * @return {Array} Config of the grid columns.
		 */
		_getGridColumnsConfig: function(config) {
			if (!config.gridConfig || !config.gridConfig.items) {
				return [];
			}
			return config.gridConfig.items.map(function(columnConfig) {
				var onColumnLinkClickName = "on" + columnConfig.metaPath + "LinkClick";
				var type = columnConfig.type === "link" ? "text" : columnConfig.type;
				return {
					aggregationType: columnConfig.aggregationType,
					serializedFilter: columnConfig.serializedFilter,
					cols: columnConfig.position.colSpan,
					key: [{
						name: {bindTo: columnConfig.bindTo},
						type: type,
						caption: columnConfig.caption
					}],
					link: {bindTo: onColumnLinkClickName}
				};
			});
		},

		/**
		 * Gets captions config of the grid columns.
		 * @private
		 * @param {Object} config Configuration of grid item.
		 * @param {Object} config.gridConfig Configuration object of the grid columns.
		 * @return {Array} Captions config of the grid columns.
		 */
		_getGridCaptionsConfig: function(config) {
			if (!config.gridConfig || !config.gridConfig.items) {
				return [];
			}
			return config.gridConfig.items.map(function(columnConfig) {
				return {
					cols: columnConfig.position.colSpan,
					name: columnConfig.caption
				};
			});
		}
	});
	return {};
});


