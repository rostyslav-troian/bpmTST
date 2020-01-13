Terrasoft.configuration.Structures["FunnelBaseDataProvider"] = {innerHierarchyStack: ["FunnelBaseDataProvider"]};
define('FunnelBaseDataProviderStructure', ['FunnelBaseDataProviderResources'], function(resources) {return {schemaUId:'fe3d1f50-c4cd-4a5a-a8d7-edb6b26a343d',schemaCaption: "FunnelBaseDataProvider", parentSchemaName: "", schemaName:'FunnelBaseDataProvider',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FunnelBaseDataProvider", ["ext-base", "terrasoft", "OpportunityStage", "ChartModuleHelper",
	"ConfigurationConstants", "FunnelBaseDataProviderResources", "ChartDrillDownProvider",
	"DashboardFunnelEnums"],
	function(Ext, Terrasoft, OpportunityStage, ChartModuleHelper, ConfigurationConstants, resources) {

		/**
		 * @class Terrasoft.configuration.FunnelBaseDataProvider
		 * Base class to build funnel chart.
		 */
		Ext.define("Terrasoft.configuration.FunnelBaseDataProvider", {
			extend: "Terrasoft.ChartDrillDownProvider",
			alternateClassName: "Terrasoft.FunnelBaseDataProvider",

			statics: {
				Resources: {Strings: resources.localizableStrings}
			},

			/**
			 * @private
			 * @obsolete
			 */
			funnelType: Terrasoft.DashboardFunnelEnums.FunnelType.BY_NUMBER,

			/**
			 * Name of root schema.
			 * @type {String}
			 */
			rootSchemaName: "Opportunity",

			/**
			 * @inheritdoc Terrasoft.ChartDrillDownProvider#checkQueryDataLimit
			 * @overridden
			 */
			checkQueryDataLimit: function() {
				return false;
			},

			/**
			 * Returns true if current chart view is funnel.
			 * @private
			 * @return {Boolean}
			 */
			getIsOpportunityFunnel: function() {
				var seriesKind = this.getSeriesKind();
				var isFunnel = (seriesKind === ChartModuleHelper.ChartSeriesKind.funnel.value);
				return (isFunnel && !this.isDrilledDown());
			},

			/**
			 * Sets initial general state.
			 * @protected
			 * @overridden
			 * @param {Object} rawState Raw state.
			 */
			setInitialGeneralState: function(rawState) {
				this.callParent(arguments);
				this.initialGeneralState.dueDate = rawState.dueDate;
				this.initialGeneralState.startDate = rawState.startDate;
			},

			/**
			 * Initialize additional information before querying main data.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} [scope] Scope.
			 */
			initAdditionalData: function(callback, scope) {
				Terrasoft.chain(
					this.initOpportunityStageCollection,
					this.initOpportunityFunnelColumnsInfo,
					function() {
						callback.call(scope || this);
					},
					this
				);
			},

			/**
			 * @inheritdoc Terrasoft.ChartDrillDownProvider#getChartSeriesData
			 * @overridden
			 */
			getChartSeriesData: function(callback, scope) {
				var seriesData = [];
				this.yAxis = [];
				Terrasoft.chain(
					this.initAdditionalData,
					function(next) {
						this.getMainSeriesData(function(series) {
							Ext.Array.insert(seriesData, seriesData.length, series);
							next();
						}, this);
					},
					function(next) {
						this.getAdditionalSeriesData(function(series) {
							Ext.Array.insert(seriesData, seriesData.length, series);
							next();
						}, this);
					},
					function() {
						seriesData = this.convertSeriesDataToSingleCategory(seriesData);
						callback.call(scope, seriesData, this.yAxis);
					},
					this
				);
			},

			/**
			 * Initialize opportunity funnel columns info.
			 * @private
			 * @param {Function} callback Callback function.
			 */
			initOpportunityFunnelColumnsInfo: function(callback) {
				var initColumnsInfoConfig = [{
					columnPath: this.getXAxisColumn(),
					entitySchemaName: this.getEntitySchemaName()
				}, {
					columnPath: this.getYAxisColumn(),
					entitySchemaName: this.getEntitySchemaName()
				}];
				if (this.drillDownHistory.length === 1) {
					var seriesConfig = this.getSeriesConfig();
					Terrasoft.each(seriesConfig, function(seriesConfigItem) {
						var seriesConfigItemEntitySchemaName = seriesConfigItem.schemaName;
						initColumnsInfoConfig.push({
							columnPath: seriesConfigItem.xAxisColumn,
							entitySchemaName: seriesConfigItemEntitySchemaName
						});
						initColumnsInfoConfig.push({
							columnPath: seriesConfigItem.yAxisColumn,
							entitySchemaName: seriesConfigItemEntitySchemaName
						});
					}, this);
				}
				this.initColumnsInfo(initColumnsInfoConfig, function() {
					callback();
				}, this);
			},

			/**
			 * Init query for load funnel data.
			 * @protected
			 * @virtual
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			initQuery: function() {
				return Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.rootSchemaName
				});
			},

			/**
			 * Returns full path for interchange table column.
			 * @protected
			 * @param {String} relativeColumnPath Relative column path.
			 * @return {String}
			 */
			getDetailColumnPath: function(relativeColumnPath) {
				return "=[OpportunityInStage:Opportunity]." + relativeColumnPath;
			},

			/**
			 * @inheritDoc ChartDrillDownProvider#getCategoryItem
			 * @override
			 */
			getCategoryItem: function() {
				return this.isDrilledDown() ? null : this.callParent(arguments);
			},

			/**
			 * Adds a columns to the query.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.EntitySchemaQuery} entitySchemaQuery Instance of EntitySchemaQuery.
			 */
			addQueryColumns: function(entitySchemaQuery) {
				entitySchemaQuery.addAggregationSchemaColumn(this.getYAxisColumnPath(), Terrasoft.AggregationType.COUNT, "yAxis");
				entitySchemaQuery.addColumn(this.getXAxisColumnPath(), "xAxis");
			},

			/**
			 * Returns path to X axis column.
			 * @private
			 * @return {String}
			 */
			getXAxisColumnPath: function() {
				var columnPath = this.getDetailColumnPath("Stage");
				if (this.isDrilledDown()) {
					var currentIndexState = this.getCurrentStateIndex();
					var currentState = this.drillDownHistory[currentIndexState];
					if(!Ext.isEmpty(currentState)) {
						columnPath = currentState.xAxisColumn;
					}
				}
				return columnPath;
			},

			/**
			 * Returns path to Y axis column.
			 * @private
			 * @return {String}
			 */
			getYAxisColumnPath: function() {
				return "Id";
			},

			/**
			 * Returns item stage data.
			 * @protected
			 * @param {Terrasoft.BaseModel} dataItem Funnel item data model.
			 * @return {Object}
			 */
			getItemStage: function(dataItem) {
				return dataItem.get("xAxis") || {};
			},

			/**
			 * Update funnel item stage data.
			 * @param {Terrasoft.BaseModel} dataItem Funnel item data model.
			 * @param {Object} value New stage data.
			 */
			setItemStage: function(dataItem, value) {
				dataItem.set("xAxis", value);
			},

			/**
			 * Sets series state to drill down history.
			 * @protected
			 * @overridden
			 * @param {Integer} [seriesIndex] Index of required series.
			 */
			setSeriesState: function(seriesIndex) {
				var requiredSeriesIndex = seriesIndex || 0;
				if (this.isNotDrilledDown()) {
					var savedDueDate = this.drillDownHistory[0].dueDate;
					var savedStartDate = this.drillDownHistory[0].startDate;
					this.drillDownHistory[0] = this._getInitialSeriesState(requiredSeriesIndex);
					this.drillDownHistory[0].dueDate = savedDueDate;
					this.drillDownHistory[0].startDate = savedStartDate;
				}
			},

			/**
			 * @inheritdoc Terrasoft.ChartDrillDownProvider#getEntitySchemaColumnCaption
			 * @overridden
			 */
			getEntitySchemaColumnCaption: function(entitySchemaName, columnPath) {
				if (columnPath === this.getDetailColumnPath("Stage")) {
					columnPath = "Stage";
				}
				return this.callParent([entitySchemaName, columnPath]);
			},

			/**
			 * Modifies query for grid data view.
			 * @param {Terrasoft.EntitySchemaQuery} esq Query instance to modify.
			 * @virtual
			 */
			addGridDataColumns: Terrasoft.emptyFn,

			/**
			 * Returns special funnel filters.
			 * @return {Terrasoft.FilterGroup}
			 */
			getFunnelFixedFilters: function() {
				var esqFiltersGroup = Terrasoft.createFilterGroup();
				esqFiltersGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				this.applyFunnelPeriodFilters(esqFiltersGroup);
				this.applyHistoryDetailFilters(esqFiltersGroup);
				var stageFilters = this.getFunnelAllowedStagesFilters(this.getDetailColumnPath("Stage"));
				esqFiltersGroup.addItem(stageFilters);
				return esqFiltersGroup;
			},

			/**
			 * Applies filters based on history detail for root schema.
			 * @param {Terrasoft.FilterGroup} esqFilters Filter group to apply filters to.
			 */
			applyHistoryDetailFilters: function(esqFilters) {
				var historyItemsFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						this.getDetailColumnPath("Historical"), false, Terrasoft.DataValueType.BOOLEAN);
				esqFilters.addItem(historyItemsFilter);
			},

			/**
			 * @inheritdoc Terrasoft.ChartDrillDownProvider#drillUp
			 * @protected
			 * @overridden
			 */
			drillUp: function() {
				var drillDownHistory = this.drillDownHistory;
				if (drillDownHistory.length > 1) {
					var prevHistory = drillDownHistory[drillDownHistory.length - 2];
					var currentHistory = drillDownHistory[drillDownHistory.length - 1];
					if ("startDate" in currentHistory) {
						prevHistory.startDate = currentHistory.startDate;
					}
					if ("dueDate" in currentHistory) {
						prevHistory.dueDate = currentHistory.dueDate;
					}
				}
				this.callParent(arguments);
			},

			/**
			 * Returns column path by passed schema name and column name.
			 * @private
			 * @param {String} [schemaName] Schema name.
			 * @param {String} columnName Column name.
			 * @return {String}
			 */
			getColumnPathBySchema: function(schemaName, columnName) {
				if (!schemaName) {
					return columnName;
				}
				return Ext.String.format("{0}.{1}", schemaName, columnName);
			},

			/**
			 * Returns filters for all stages, which show in funnel.
			 * @protected
			 * @param {String} [parentSchemaName] The name of parent schema.
			 * @return {Terrasoft.FilterGroup} Filter group.
			 */
			getFunnelAllowedStagesFilters: function(parentSchemaName) {
				var showInFunnelColumnName = this.getColumnPathBySchema(parentSchemaName, "ShowInFunnel");
				return Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					showInFunnelColumnName, true, Terrasoft.DataValueType.BOOLEAN);
			},

			/**
			 * Prepare date parameters for build funnel.
			 * @protected
			 */
			getFunnelDatePeriod: function() {
				var seriesState = this.getState();
				var startDate = seriesState.startDate;
				var dueDate = seriesState.dueDate;
				if (startDate) {
					startDate = Terrasoft.startOfDay(new Date(startDate));
				}
				if (dueDate) {
					dueDate = Terrasoft.endOfDay(new Date(dueDate));
				}
				return {
					startDate: startDate,
					dueDate: dueDate
				};
			},

			/**
			 * Returns funnel filters by period.
			 * @protected
			 * @return {Terrasoft.FilterGroup}
			 */
			applyFunnelPeriodFilters: function(filterGroup) {
				var datePeriodConfig = this.getFunnelDatePeriod();
				var startDateColumnPath = this.getDetailColumnPath("StartDate");
				if (datePeriodConfig.startDate) {
					filterGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.GREATER_OR_EQUAL,
							startDateColumnPath, datePeriodConfig.startDate, Terrasoft.DataValueType.DATE_TIME)
					);
				}
				if (datePeriodConfig.dueDate) {
					filterGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.LESS_OR_EQUAL,
							startDateColumnPath, datePeriodConfig.dueDate, Terrasoft.DataValueType.DATE_TIME)
					);
				}
				return filterGroup;
			},

			/**
			 * @inheritdoc Terrasoft.ChartDrillDownProvider#addFilters
			 * @overridden
			 */
			addFilters: function(entitySchemaQuery) {
				if (!this.isDrilledDown() ||
					(this.getDisplayMode() === Terrasoft.DashboardEnums.ChartDisplayMode.GRID)) {
						this.callParent(arguments);
				}
				entitySchemaQuery.filters.removeByKey("xAxisColumnIsNotNullFilter");
				entitySchemaQuery.filters.addItem(this.getFunnelFixedFilters());
			},

			/**
			 * @inheritdoc Terrasoft.ChartDrillDownProvider#drillUp
			 * @protected
			 * @overridden
			 */
			getDrillDownFilters: function() {
				var filters  = this.callParent(arguments);
				var processedFilters = {};
				Terrasoft.each(filters, function(filter, columnName) {
					if (!filter.datePart) {
						if (columnName === "Stage") {
							columnName = this.getDetailColumnPath("Stage");
						}
					}
					processedFilters[columnName] = filter;
				}, this);
				return processedFilters;
			},

			/**
			 * @inheritdoc Terrasoft.ChartModuleHelper#getSeriesQuery
			 * @protected
			 * @overridden
			 */
			getSeriesQuery: function(config) {
				var query;
				if (this.isDrilledDown() && config) {
					query = this.callParent(arguments);
				} else {
					query = this.initQuery();
					this.addQueryColumns(query);
				}
				this.addFilters(query);
				return query;
			},

			/**
			 * @inheritdoc Terrasoft.ChartDrillDownProvider#getOrderBy
			 * @overridden
			 */
			getOrderBy: function() {
				if (this.isDrilledDown()) {
					return this.callParent(arguments);
				}
				return {
					orderBy: "StageNumber",
					seriesOrderIndex: 0
				};
			},

			/**
			 * Returns response item with default values.
			 * @return {Terrasoft.BaseViewModel}
			 */
			createDummyResponseItem: function() {
				return this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						xAxis: {}
					}
				});
			},

			/**
			 * Returns item found in response collection that matches stage.
			 * @param {Terrasoft.Collection} responseData Collection to find data in.
			 * @param {String} stageId Primary value of stage.
			 * @return {Terrasoft.BaseViewModel}
			 */
			getResponseItemByStage: function(responseData, stageId) {
				var matchedItems = responseData.filterByFn(function(item) {
					var itemStage = this.getItemStage(item);
					return itemStage && (itemStage.value === stageId);
				}, this);
				if ((matchedItems.getCount() === 1)) {
					return matchedItems.getByIndex(0);
				} else {
					return this.createDummyResponseItem();
				}
			},

			/**
			 * Applies information about x and y axis columns to row.
			 * @param {Object} responseRow Row to apply info.
			 */
			applyRowConfig: function(responseRow) {
				var rowConfig = responseRow.rowConfig || {};
				Ext.applyIf(rowConfig, {
					yAxis: {
						columnPath: this.getYAxisColumnPath()
					},
					xAxis: {
						columnPath: this.getXAxisColumnPath()
					}
				});
				responseRow.xAxis = Ext.applyIf(responseRow.xAxis || {}, rowConfig.xAxis);
				responseRow.rowConfig = rowConfig;
			},

			/**
			 * Applies stage data in response row.
			 * @protected
			 * @param {Terrasoft.BaseModel} responseRow Row need to be prepared.
			 * @param {Terrasoft.BaseModel} stageItem Stage data for row.
			 */
			prepareStageRow: function(responseRow, stageItem) {
				var itemStageData = this.getItemStage(responseRow);
				var stageId = stageItem.get("Id");
				itemStageData = Ext.apply(itemStageData, {
					Id: stageId,
					value: stageId,
					displayValue: Terrasoft.encodeHtml(stageItem.get("Name")),
					number: stageItem.get("Number"),
					end: stageItem.get("End")
				});
				this.setItemStage(responseRow, itemStageData);
				this.applyRowConfig(responseRow);
			},

			/**
			 * Calculates data for each stage and forms final collection for chart.
			 * @private
			 * @param {Object} responseCollection Opportunity stages query result.
			 */
			mergeOpportunityStage: function(responseCollection) {
				var stages = this.opportunityStageCollection;
				var responseData = responseCollection.clone();
				responseCollection.clear();
				stages.each(function(stageItem) {
					var stageId = stageItem.get("Id");
					var reportData = this.getResponseItemByStage(responseData, stageId);
					this.prepareStageRow(reportData, stageItem);
					responseCollection.add(stageId, reportData);
				}, this);
			},

			/**
			 * Preprocess response collection before converting it to series data.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.Collection} collection Collection retrived from server.
			 */
			prepareFunnelResponseCollection: function(collection) {
				this.mergeOpportunityStage(collection);
			},

			/**
			 * @inheritdoc Terrasoft.ChartDrillDownProvider#prepareSeriesPoint
			 * @protected
			 * @overridden
			 */
			prepareSeriesPoint: function(response, seriesQueryConfig) {
				var isFunnel = this.getIsOpportunityFunnel();
				if (!isFunnel) {
					return this.callParent(arguments);
				}
				var responseCollection = response.collection;
				this.prepareFunnelResponseCollection(responseCollection);
				var entitySchemaName = seriesQueryConfig.entitySchemaName;
				var seriesData = [];
				var i = 0;
				var entitySchema = this.getEntitySchemaByName(entitySchemaName);
				responseCollection.each(function(item) {
					var xAxis = item.get("xAxis");
					var orderValue = xAxis && xAxis.number;
					item.entitySchema = entitySchema;
					item.entitySchemaName = entitySchemaName;
					item.serializedFilters = this.getSerializedFilters();
					var seriesDataConfig = this.getSeriesDataConfigByItem(item);
					if (seriesDataConfig.y === 0) {
						seriesDataConfig.y = 0.00001;
						seriesDataConfig.drilldown = false;
					}
					var seriesDataPoint = Ext.apply({
						categoryItem: item,
						x: i++,
						orderValue: orderValue,
						drilldown: true
					}, seriesDataConfig);

					seriesData.push(seriesDataPoint);
				}, this);
				return seriesData;
			},

			/**
			 * Returns chart series item config.
			 * @protected
			 * @param {Terrasoft.BaseModel} responseItem Data query response collectioln item.
			 * @return {Object}
			 */
			getSeriesDataConfigByItem: function(responseItem) {
				var stage = this.getItemStage(responseItem);
				var localizedStrings = Terrasoft.FunnelBaseDataProvider.Resources.Strings;
				var yValue = responseItem.get("yAxis") || 0;
				yValue = Math.round(yValue * 100) / 100;
				var values = {
					y: yValue,
					countOpp: Ext.String.format("{0}: {1}", localizedStrings.Count, yValue),
					value: stage.Id,
					menuHeaderValue: stage.displayValue || stage
				};
				return Ext.apply({
					name: "",
					value: "",
					displayValue: "",
					countOpp: "",
					y: 0
				}, values);
			},

			/**
			 * Returns entity schema query for stages to display.
			 * @protected
			 * @virtual
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			getStagesEsq: function() {
				var currentCultureId = Terrasoft.SysValue.CURRENT_USER_CULTURE.value;
				var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "OpportunityStage",
					serverESQCacheParameters: {
						cacheLevel: Terrasoft.ESQServerCacheLevels.APPLICATION,
						cacheGroup: "OpportunityStages",
						cacheItemName: "OpportunityStagesFunnelData" + currentCultureId
					},
					clientESQCacheParameters: {
						cacheItemName: "OpportunityStagesFunnelData"
					}
				});
				var allowedStageFiltersGroup = this.getFunnelAllowedStagesFilters();
				entitySchemaQuery.filters.addItem(allowedStageFiltersGroup);
				entitySchemaQuery.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
				entitySchemaQuery.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
				entitySchemaQuery.addColumn("End", "End");
				var numberColumn = entitySchemaQuery.addColumn("Number", "Number");
				numberColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				numberColumn.orderPosition = 0;
				return entitySchemaQuery;
			},

			/**
			 * Inisializes staages, which need to be displayed.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			initOpportunityStageCollection: function(callback, scope) {
				if (this.opportunityStageCollection) {
					callback.call(scope);
					return;
				}
				var entitySchemaQuery = this.getStagesEsq();
				entitySchemaQuery.getEntityCollection(function(response) {
					if (response && response.success) {
						this.opportunityStageCollection = response.collection;
						callback.call(scope);
					}
				}, this);
			}

		});
	});



