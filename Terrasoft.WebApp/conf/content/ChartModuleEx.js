Terrasoft.configuration.Structures["ChartModuleEx"] = {innerHierarchyStack: ["ChartModuleEx"]};
define("ChartModuleEx", ["ChartModule"],
	function() {

		/**
		 * @class Terrasoft.configuration.ChartViewModelEx
		 * ##### ###### ############# ############ ###### #######.
		 */
		Ext.define("Terrasoft.configuration.ChartViewModelEx", {
			extend: "Terrasoft.ChartViewModel",
			alternateClassName: "Terrasoft.ChartViewModelEx",

			/**
			 * @inheritDoc Terrasoft.configuration.ChartViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.chartModulePropertiesTranslator.GridConfig = "gridConfig";
				this.callParent([function() {
					var queryConfig = this.getQueryConfig();
					if (queryConfig && queryConfig.rowCount) {
						this.set("RowCount", queryConfig.rowCount);
					}
					callback.call(scope);
				}, this]);
			},

			/**
			 * ######### ############ #####.
			 * @return {Object} Object
			 */
			getGridConfig: function() {
				var gridConfig = this.get("GridConfig");
				if (gridConfig) {
					var gridName = this.getDataGridName();
					return gridConfig[gridName];
				}
			},

			/**
			 * ######### ############ {Terrasoft.EntitySchemaQuery} #####.
			 * @return {Object} Object
			 */
			getQueryConfig: function() {
				var config = this.getGridConfig();
				if (config) {
					return config.queryConfig;
				}
				return null;
			},

			/**
			 * @inheritDoc Terrasoft.configuration.ChartViewModel#prepareProfile
			 * @overridden
			 */
			prepareProfile: function() {
				var gridConfig = this.getGridConfig();
				if (gridConfig) {
					var profile = this.get("Profile");
					this.set("GridSettingsChanged", true);
					profile = (profile && Terrasoft.deepClone(profile)) || {};
					var gridName = this.getDataGridName();
					var gridProfile = profile[gridName] = {
						"isTiled": false,
						"type": "listed",
						"key": this.getProfileKey()
					};
					var listedConfig = {};
					var listedConfigItems = listedConfig.items = gridConfig.profileColumns;
					var columnsCount = listedConfigItems.length;
					var columnWidth = 24 / columnsCount;
					Terrasoft.each(listedConfigItems, function(columnConfig, index) {
						Ext.apply(columnConfig, {
							"position": {
								"column": columnWidth * index,
								"colSpan": columnWidth,
								"row": 1
							}
						});
					}, this);
					gridProfile.listedConfig = Terrasoft.encode(listedConfig);
					this.set("Profile", profile);
					return;
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.GridUtilities#initQueryOptions
			 * @overridden
			 */
			initQueryOptions: function(esq) {
				this.callParent(arguments);
				var queryConfig = this.getQueryConfig();
				if (queryConfig) {
					Ext.apply(esq, queryConfig);
				}
			},

			/**
			 * @inheritDoc Terrasoft.ChartModule#getOpenGridSettingsVisible
			 * @overridden
			 */
			getOpenGridSettingsVisible: function() {
				var gridConfig = this.getGridConfig();
				if (gridConfig && gridConfig.profileColumns) {
					return false;
				}
				return this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.GridUtilities#addGridDataColumns
			 * @overridden
			 */
			addGridDataColumns: function() {
				var gridConfig = this.getGridConfig();
				if (!gridConfig) {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritDoc Terrasoft.GridUtilities#addProfileAggregationColumn
			 * @overridden
			 */
			addProfileAggregationColumn: function(esq, column, columnName) {
				if (!column.subFilters) {
					esq.addAggregationSchemaColumn(column.path, column.aggregationType, columnName);
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritDoc Terrasoft.GridUtilities#addItemsToGridData
			 * @overridden
			 */
			addItemsToGridData: function(dataCollection) {
				var gridConfig = this.getGridConfig();
				if (gridConfig && gridConfig.columnValuesExpression) {
					dataCollection.eachKey(function(key, item) {
						Terrasoft.each(gridConfig.columnValuesExpression, function(expression) {
							this.evaluateExpression(expression, item);
						}, this);
					}, this);
				}
				this.callParent(arguments);
			},

			/**
			 * ######### ######## #######.
			 * @param {Object} expression ######### ######## #######.
			 * @param {Terrasoft.BaseViewModel} item ####### #######.
			 */
			evaluateExpression: function(expression, item) {
				if (typeof expression.fn !== "function") {
					this.initExpressionFn(expression);
				}
				var args = [];
				Terrasoft.each(expression.args, function(columnName) {
					args.push(item.get(columnName));
				});
				var result = expression.fn.apply(this, args) || 0;
				item.set(expression.columnName, result);
			},

			/**
			 * ############## ####### ########## ######## #######.
			 * @param {Object} expression ######### ######## #######.
			 */
			initExpressionFn: function(expression) {
				var regExp = new RegExp(/\{(.*?)\}/gi);
				var expressionStr = expression.expression;
				var args = [];
				var result = regExp.exec(expressionStr);
				while (!Ext.isEmpty(result)) {
					args.push(result[1]);
					result = regExp.exec(expressionStr);
				}
				expression.args = args;
				var fnArgs = args.slice();
				fnArgs.push("return " + expressionStr.replace(/[\{\}]/gi, ""));
				expression.fn = Function.apply(this, fnArgs);
			}

		});

		/**
		 * @class Terrasoft.configuration.ChartModuleEx
		 * ##### ############ ###### #######.
		 */
		Ext.define("Terrasoft.configuration.ChartModuleEx", {
			alternateClassName: "Terrasoft.ChartModuleEx",
			extend: "Terrasoft.ChartModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,
			showMask: true,

			/**
			 * ###### ############ ######.
			 * @type {Object}
			 */
			moduleConfig: null,

			/**
			 * ### ###### ###### ############# ### ########## ######.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.ChartViewModelEx",

			/**
			 * ### ##### ########## ############ ############# ########## ######.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.ChartViewConfig",

			/**
			 * ### ##### ########## #############.
			 * @type {String}
			 */
			viewGeneratorClass: "Terrasoft.ViewGenerator"
		});

		return Terrasoft.ChartModuleEx;
	});


