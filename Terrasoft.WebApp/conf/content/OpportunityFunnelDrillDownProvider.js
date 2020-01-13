Terrasoft.configuration.Structures["OpportunityFunnelDrillDownProvider"] = {innerHierarchyStack: ["OpportunityFunnelDrillDownProvider"]};
define("OpportunityFunnelDrillDownProvider", ["OpportunityStage", "ChartModuleHelper", "ConfigurationConstants",
		"OpportunityFunnelDrillDownProviderResources", "StorageUtilities",
		"ChartDrillDownProvider", "DashboardEnums", "DashboardFunnelEnums"],
	function(OpportunityStage, chartModuleHelper, ConfigurationConstants, resources) {
		var funnelTypeEnum = Terrasoft.DashboardFunnelEnums.FunnelType;

		/**
		 * @class Terrasoft.configuration.ChartDrillDownProvider
		 * ##### ########## ############## #######.
		 */
		Ext.define("Terrasoft.configuration.OpportunityFunnelDrillDownProvider", {
			extend: "Terrasoft.ChartDrillDownProvider",
			alternateClassName: "Terrasoft.OpportunityFunnelDrillDownProvider",

			funnelType: funnelTypeEnum.BY_NUMBER,
			firstStageBottomValue: null,
			stageConversionBottomCollection: Ext.create("Terrasoft.Collection"),
			primaryCurrencySymbol: "",

			/**
			 * @inheritdoc Terrasoft.ChartDrillDownProvider#checkQueryDataLimit
			 * @overridden
			 */
			checkQueryDataLimit: function() {
				return false;
			},

			/**
			 * ########## ### ##### #### ## ### ########## ########.
			 * @private
			 * @param {String} name ######## #### ##### ####.
			 */
			getDatePartType: function(name) {
				switch (name) {
					case "Year":
						return Terrasoft.DatePartType.YEAR;
					case "Month":
						return Terrasoft.DatePartType.MONTH;
					case "Week":
						return Terrasoft.DatePartType.WEEK;
					case "Day":
						return Terrasoft.DatePartType.DAY;
				}
				return Terrasoft.DatePartType.NONE;
			},

			/**
			 * ##########, ######## ## ###### ######## ######.
			 * @private
			 * @return {Boolean} ######### ########.
			 */
			getIsOpportunityFunnel: function() {
				var seriesKind = this.getSeriesKind();
				var isFunnel = (seriesKind === chartModuleHelper.ChartSeriesKind.funnel.value);
				return (isFunnel && !this.isDrilledDown());
			},

			/**
			 * ########### ###### ### ####### ## ######## #########.
			 * @virtual
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			getChartSeriesData: function(callback, scope) {
				var seriesData = [];
				this.yAxis = [];
				Terrasoft.chain(
					function(next) {
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
							next();
						}, this);
					},
					function(next) {
						this.initPrimaryCurrencySymbol(function() {
							next();
						}, this);
					},
					function(next) {
						this.initOpportunityStageCollection(function() {
							next();
						}, this);
					},
					function(next) {
						this.initFirstStageBottomValue(function() {
							next();
						}, this);
					},
					function(next) {
						this.initStageConversionBottomCollection(function() {
							next();
						}, this);
					},
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
			 * ############## ########## ######### ####### ####### ######.
			 * @private
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ######## ##########.
			 */
			initPrimaryCurrencySymbol: function(callback, scope) {
				if (this.primaryCurrencySymbol) {
					callback.call(scope);
					return;
				}
				Terrasoft.SysSettings.querySysSettingsItem("PrimaryCurrency",
					function(value) {
						if (!value) {
							callback.call(scope);
							return;
						}
						var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "Currency"
						});
						entitySchemaQuery.addColumn("Symbol");
						entitySchemaQuery.filters.addItem(
							Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"Id", value.value, Terrasoft.DataValueType.GUID)
						);
						entitySchemaQuery.getEntityCollection(function(response) {
							if (response && response.success) {
								var responseItems = response.collection.getItems();
								if (responseItems.length > 0) {
									this.primaryCurrencySymbol = responseItems[0].get("Symbol");
								}
								callback.call(scope);
							}
						}, this);
					},
					this);
			},

			/**
			 * ############## ######### ###### ####### ## ########## ################ ###########.
			 * @virtual
			 * @param {Function} callback #######, ####### ##### ####### ## ########## ### # ######, #### #########
			 * ### ################.
			 * @param {Object} scope ######## ##########.
			 */
			initOpportunityStageCollection: function(callback, scope) {
				if (this.opportunityStage) {
					callback.call(scope);
					return;
				}
				var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "OpportunityStage"
				});
				var allowedStageFiltersGroup = this.getFunnelAllowedStagesFilters();
				entitySchemaQuery.filters.addItem(allowedStageFiltersGroup);
				entitySchemaQuery.addColumn("Id", "Id");
				var primaryDisplayColumnName = OpportunityStage.primaryDisplayColumnName;
				entitySchemaQuery.addColumn(primaryDisplayColumnName, primaryDisplayColumnName);
				var numberColumn = entitySchemaQuery.addColumn("Number", "Number");
				numberColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				numberColumn.orderPosition = 0;
				entitySchemaQuery.getEntityCollection(function(response) {
					if (response && response.success) {
						this.opportunityStage = response;
						callback.call(scope);
					}
				}, this);
			},

			/**
			 * ############## ###### ### ########## #########.
			 * @protected
			 * @param {Object} config ###### ########## #######.
			 * @param {Terrasoft.EntitySchemaQuery} config.entitySchemaQuery ###### ###### ### #######.
			 */
			initConversionQuery: function(config) {
				var entitySchemaName = config.entitySchemaName = "Opportunity";
				var entitySchemaQuery = config.entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: entitySchemaName,
					isDistinct: true
				});
				entitySchemaQuery.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "yAxis",
					Terrasoft.AggregationEvalType.DISTINCT);
				entitySchemaQuery.addColumn("[VwOpportFunnelData:Id].fStage", "xAxis");
				entitySchemaQuery.addAggregationSchemaColumn("Budget", Terrasoft.AggregationType.SUM, "Amount");
			},

			/**
			 * @inheritdoc Terrasoft.ChartDrillDownProvider#getEntitySchemaColumnCaption
			 * @overridden
			 */
			getEntitySchemaColumnCaption: function(entitySchemaName, columnPath) {
				if (columnPath === "[VwOpportFunnelData:Id].fStage") {
					columnPath = "Stage";
				}
				return this.callParent(arguments);
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
			 * ######### ###### ### ########## ########### ## ######### # ###### ###### # ########## ### ## ######.
			 * @virtual
			 * @param {Function} callback #######, ####### ##### ####### ##### ######### ########### #######.
			 * @param {Object} scope ######## ##########.
			 */
			initFirstStageBottomValue: function(callback, scope) {
				if (this.firstStageBottomValue) {
					this.firstStageBottomValue = null;
				}
				var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Opportunity"
				});
				entitySchemaQuery.addAggregationSchemaColumn("Id",
					Terrasoft.AggregationType.COUNT, "cntConversionBottom");
				var periodFiltersConfig = {
					isBottomFilter: true,
					bottomFunnelType: funnelTypeEnum.TO_FIRST_STAGE
				};
				this.addFilters(entitySchemaQuery, periodFiltersConfig);
				entitySchemaQuery.getEntityCollection(function(response) {
					if (response && response.success) {
						var responseItems = response.collection.getItems();
						if (responseItems.length > 0) {
							this.firstStageBottomValue = responseItems[0].get("cntConversionBottom");
						}
						if (callback) {
							callback.call(scope);
						}
					}
				}, this);
			},

			/**
			 * ######### ###### ### ########## ############ #### ###### ## ######### ###### # ########## ### ## ######.
			 * @virtual
			 * @param {Function} callback #######, ####### ##### ####### ##### ######### ########### #######.
			 * @param {Object} scope ######## ##########.
			 */
			initStageConversionBottomCollection: function(callback, scope) {
				if (this.stageConversionBottomCollection) {
					this.stageConversionBottomCollection = Ext.create("Terrasoft.Collection");
				}
				var filtersConfig = {
					isBottomFilter: true,
					bottomFunnelType: funnelTypeEnum.STAGE_CONVERSION
				};
				var entitySchemaQuery = this.getOpportunityFunnelQuery(filtersConfig);
				entitySchemaQuery.getEntityCollection(function(response) {
					if (response && response.success) {
						this.stageConversionBottomCollection = response.collection;
						if (callback) {
							callback.call(scope);
						}
					}
				}, this);
			},

			/**
			 * ######### # ###### ####### ############## #######.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.EntitySchemaQuery} entitySchemaQuery ###### ###### ### #######.
			 * @param {Object} filters ####### #######.
			 * @param {Terrasoft.BaseFilter} filters.quickFilters ###### ######## ####### #######.
			 * @param {Terrasoft.BaseFilter} filters.chartFilters ###### ######## #######.
			 * @param {Terrasoft.BaseFilter} filters.serializedFilters ###### ################## #######.
			 * @param {Terrasoft.BaseFilter} filters.drillDownFilters ###### ####### drill down.
			 */
			addDrillDownFilters: function(entitySchemaQuery, filters) {
				Terrasoft.each(filters, function(filter, columnName) {
					if (!filter.datePart) {
						if (columnName === "Stage") {
							columnName = "[VwOpportFunnelData:Id].fStage";
						}
						var esqFilter = Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, columnName, filter.value);
						entitySchemaQuery.filters.addItem(esqFilter);
					} else {
						Terrasoft.each(filter.datePart, function(value, name) {
							var esqFilter = Terrasoft.createDatePartColumnFilter(Terrasoft.ComparisonType.EQUAL,
								columnName, this.getDatePartType(name), value);
							entitySchemaQuery.filters.addItem(esqFilter);
						}, this);
					}
				}, this);
			},

			/**
			 * ######### # ###### #######.
			 * @protected
			 * @virtual
			 * @param {Object} config ###### ########## #######.
			 * @param {Terrasoft.EntitySchemaQuery} config.entitySchemaQuery ###### ###### ### #######.
			 * @param {String} config.xAxis.column ####### ### X.
			 * @param {Terrasoft.BaseFilter} config.filters.quickFilters ###### ######## ####### #######.
			 * @param {Terrasoft.BaseFilter} config.filters.#hartFilters ###### ######## #######.
			 * @param {Terrasoft.BaseFilter} config.filters.serializedFilters ###### ################## #######.
			 * @param {Terrasoft.BaseFilter} config.filters.drillDownFilters ###### ####### drill down.
			 * @param {Terrasoft.BaseFilter} config.filters.funnelFixedFilters ###### ############# ######## #######.
			 */
			addFiltersSeriesQuery: function(config) {
				var entitySchemaQuery = config.entitySchemaQuery;
				var filters = config.filters;
				var quickFilters = filters.quickFilters;
				if (quickFilters && !quickFilters.isEmpty()) {
					entitySchemaQuery.filters.addItem(quickFilters);
				}
				var chartFilters = filters.chartFilters;
				if (chartFilters && !chartFilters.isEmpty()) {
					entitySchemaQuery.filters.addItem(chartFilters);
				}
				var serFilters = config.filters.serializedFilters;
				if (serFilters && !serFilters.isEmpty()) {
					entitySchemaQuery.filters.addItem(serFilters);
				}
				var funnelFixedFilters = config.filters.funnelFixedFilters;
				if (funnelFixedFilters && !funnelFixedFilters.isEmpty()) {
					entitySchemaQuery.filters.addItem(funnelFixedFilters);
				}
				this.addDrillDownFilters(entitySchemaQuery, filters.drillDownFilters);
				if (config.xAxis) {
					var xAxisColumnIsNotNullFilter = Terrasoft.createColumnIsNotNullFilter(config.xAxis.column);
					entitySchemaQuery.filters.addItem(xAxisColumnIsNotNullFilter);
				}
			},

			/**
			 * ######### #### # ####### ## ######## ##### # #######.
			 * @private
			 * @param {String} schemaName ######## #####.
			 * @param {String} columnName ######## #######.
			 * @return {String} #### # ####### ############ #####.
			 */
			getColumnPathBySchema: function(schemaName, columnName) {
				if (!schemaName) {
					return columnName;
				}
				return Ext.String.format("{0}.{1}", schemaName, columnName);
			},

			/**
			 * ########## ####### ####### ## ############# #### ######## #######.
			 * @protected
			 * @param {String} parentSchemaName ######## ############ ##### ### ####### ##########.
			 * @return {Terrasoft.FilterGroup} ###### ######## #######.
			 */
			getFunnelAllowedStagesFilters: function(parentSchemaName) {
				var endColumnName = this.getColumnPathBySchema(parentSchemaName, "End");
				var successColumnName = this.getColumnPathBySchema(parentSchemaName, "Successful");
				var allowedStageFiltersGroup = Terrasoft.createFilterGroup();
				allowedStageFiltersGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				var isNotEndStageFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					endColumnName, 0, Terrasoft.DataValueType.INTEGER);
				var isSuccessfulStageFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					successColumnName, 1, Terrasoft.DataValueType.INTEGER);
				var endStageIsNullFilter = Terrasoft.createColumnIsNullFilter(endColumnName);
				allowedStageFiltersGroup.addItem(isNotEndStageFilter);
				allowedStageFiltersGroup.addItem(endStageIsNullFilter);
				allowedStageFiltersGroup.addItem(isSuccessfulStageFilter);
				return allowedStageFiltersGroup;
			},

			/**
			 * ########## ####### ####### ## ####### ### ########### ## ##########.
			 * @protected
			 * @param {Date} startDate #### ###### #######.
			 * @param {Date} dueDate #### ########## #######.
			 * @return {Terrasoft.FilterGroup} ###### ######## #######.
			 */
			getFunnelFiltersByCount: function(startDate, dueDate) {
				var esqFiltersGroup = Terrasoft.createFilterGroup();
				var esqFiltersDueDateGroup = Terrasoft.createFilterGroup();
				esqFiltersDueDateGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				esqFiltersDueDateGroup.addItem(
					Terrasoft.createColumnIsNullFilter("[VwOpportFunnelData:Id].lStartDate")
				);
				var seriesState = this._getState();
				if (seriesState.startDate !== null) {
					esqFiltersGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.GREATER_OR_EQUAL,
							"CreatedOn", startDate, Terrasoft.DataValueType.DATE_TIME)
					);
				}
				if (seriesState.dueDate !== null) {
					esqFiltersGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.LESS_OR_EQUAL,
							"[VwOpportFunnelData:Id].fStartDate", dueDate, Terrasoft.DataValueType.DATE_TIME)
					);
					esqFiltersDueDateGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.GREATER,
							"[VwOpportFunnelData:Id].lStartDate", dueDate, Terrasoft.DataValueType.DATE_TIME)
					);
				}
				esqFiltersGroup.addItem(esqFiltersDueDateGroup);
				esqFiltersGroup.addItem(this.getFunnelAllowedStagesFilters("[VwOpportFunnelData:Id].fStage"));
				return esqFiltersGroup;
			},

			/**
			 * ########## ####### ####### ## ####### ### ########### ## ######### # ######.
			 * @protected
			 * @param {Date} startDate #### ###### #######.
			 * @param {Date} dueDate #### ########## #######.
			 * @return {Terrasoft.FilterGroup} ###### ######## #######.
			 */
			getFunnelFiltersStageConversionBottom: function(startDate, dueDate) {
				var seriesState = this._getState();
				var esqFiltersGroup = Terrasoft.createFilterGroup();
				if (seriesState.startDate !== null) {
					var esqFiltersDueDateGroup = Terrasoft.createFilterGroup();
					esqFiltersDueDateGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
					esqFiltersDueDateGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.GREATER_OR_EQUAL,
							"[VwOpportFunnelData:Id].fDueDate", startDate, Terrasoft.DataValueType.DATE_TIME)
					);
					esqFiltersDueDateGroup.addItem(
						Terrasoft.createColumnIsNullFilter("[VwOpportFunnelData:Id].fDueDate")
					);
					esqFiltersGroup.addItem(esqFiltersDueDateGroup);
				}
				if (seriesState.dueDate !== null) {
					esqFiltersGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.LESS_OR_EQUAL,
							"[VwOpportFunnelData:Id].fStartDate", dueDate, Terrasoft.DataValueType.DATE_TIME)
					);
				}
				return esqFiltersGroup;
			},

			/**
			 * ########## ####### ####### ## ####### ### ######### ## ######### # ######.
			 * @protected
			 * @param {Date} startDate #### ###### #######.
			 * @param {Date} dueDate #### ########## #######.
			 * @return {Terrasoft.FilterGroup} ###### ######## #######.
			 */
			getFunnelFiltersStageConversionTop: function(startDate, dueDate) {
				var esqFiltersGroup = this.getFunnelFiltersStageConversionBottom(startDate, dueDate);
				esqFiltersGroup.addItem(
					Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"[VwOpportFunnelData:Id].IsInStageConversion", 1, Terrasoft.DataValueType.INTEGER)
				);
				var seriesState = this._getState();
				if (seriesState.dueDate !== null) {
					esqFiltersGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.LESS_OR_EQUAL,
							"[VwOpportFunnelData:Id].lStartDate", dueDate, Terrasoft.DataValueType.DATE_TIME)
					);
				}
				return esqFiltersGroup;
			},

			/**
			 * ########## ####### ####### ## ####### ### ########### ## ######### # ###### ######.
			 * @protected
			 * @param {Date} startDate #### ###### #######.
			 * @param {Date} dueDate #### ########## #######.
			 * @return {Terrasoft.FilterGroup} ###### ######## #######.
			 */
			getFunnelFiltersFirstStageBottom: function(startDate, dueDate) {
				var esqFiltersGroup = Terrasoft.createFilterGroup();
				var seriesState = this._getState();
				if (seriesState.startDate !== null) {
					esqFiltersGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.GREATER_OR_EQUAL,
							"CreatedOn", startDate, Terrasoft.DataValueType.DATE_TIME)
					);
				}
				if (seriesState.dueDate !== null) {
					esqFiltersGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.LESS_OR_EQUAL,
							"CreatedOn", dueDate, Terrasoft.DataValueType.DATE_TIME)
					);
				}
				return esqFiltersGroup;
			},

			/**
			 * ########## ####### ####### ## ####### ### ######### ## ######### # ###### ######.
			 * @protected
			 * @param {Date} startDate #### ###### #######.
			 * @param {Date} dueDate #### ########## #######.
			 * @return {Terrasoft.FilterGroup} ###### ######## #######.
			 */
			getFunnelFiltersFirstStageTop: function(startDate, dueDate) {
				var esqFiltersGroup = Terrasoft.createFilterGroup();
				var seriesState = this._getState();
				if (seriesState.startDate !== null) {
					esqFiltersGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.GREATER_OR_EQUAL,
							"CreatedOn", startDate, Terrasoft.DataValueType.DATE_TIME)
					);
				}
				if (seriesState.dueDate !== null) {
					esqFiltersGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.LESS_OR_EQUAL,
							"[VwOpportFunnelData:Id].fStartDate", dueDate, Terrasoft.DataValueType.DATE_TIME)
					);
				}
				return esqFiltersGroup;
			},

			/**
			 * ########## ####### ####### ## #######.
			 * @protected
			 * @param {Object} config ###### ############ ### ############ ######## ## #######. ######## #######
			 * ############ ######## ## ########### # ### ####### ###### ### ############ #######.
			 * @return {Terrasoft.FilterGroup} ###### ######## ####### ## #######.
			 */
			getFunnelPeriodFilters: function(config) {
				var funnelType = config.isBottomFilter ? config.bottomFunnelType : this.funnelType;
				var seriesState = this._getState();
				var startDate = seriesState.startDate || Terrasoft.startOfMonth(new Date());
				var dueDate = seriesState.dueDate || Terrasoft.endOfMonth(new Date());
				if (seriesState.startDate !== null) {
					startDate = Terrasoft.startOfDay(new Date(startDate));
				}
				if (seriesState.dueDate !== null) {
					dueDate = Terrasoft.endOfDay(new Date(dueDate));
				}
				if ((seriesState.displayMode === Terrasoft.DashboardEnums.ChartDisplayMode.GRID) &&
					!seriesState.filter) {
					return this.getFunnelFiltersByCount(startDate, dueDate);
				}
				switch (funnelType) {
					case funnelTypeEnum.TO_FIRST_STAGE:
						return config.isBottomFilter
							? this.getFunnelFiltersFirstStageBottom(startDate, dueDate)
							: this.getFunnelFiltersFirstStageTop(startDate, dueDate);
					case funnelTypeEnum.STAGE_CONVERSION:
						return config.isBottomFilter
							? this.getFunnelFiltersStageConversionBottom(startDate, dueDate)
							: this.getFunnelFiltersStageConversionTop(startDate, dueDate);
					case funnelTypeEnum.BY_NUMBER:
						return this.getFunnelFiltersByCount(startDate, dueDate);
				}
			},

			/**
			 * ######### # ###### #######.
			 * @protected
			 * @overridden
			 * @param {Terrasoft.EntitySchemaQuery} entitySchemaQuery ###### ###### ### #######.
			 * @param {Object} periodFiltersConfig ###### ############ ######## ####### ###### ## #######.
			 */
			addFilters: function(entitySchemaQuery, periodFiltersConfig) {
				var serializedFunnelFilter = Terrasoft.deserialize(this.serializedFilterData);
				var funnelPeriodFilters = this.getFunnelPeriodFilters(periodFiltersConfig || {});
				this.addFiltersSeriesQuery({
					entitySchemaQuery: entitySchemaQuery,
					filters: {
						quickFilters: this.getQuickFilters(),
						chartFilters: this.getChartFilters(),
						serializedFilters: serializedFunnelFilter,
						drillDownFilters: this.getDrillDownFilters(),
						funnelFixedFilters: funnelPeriodFilters
					}
				});
			},

			/**
			 * ######### ###### ### ####### ######.
			 * @protected
			 * @param {Object} config ###### ########## #######.
			 * @return {Terrasoft.EntitySchemaQuery} ###### ###### ### #######.
			 */
			getOpportunityFunnelQuery: function(config) {
				this.initConversionQuery(config);
				this.addFilters(config.entitySchemaQuery, config);
				return config.entitySchemaQuery;
			},

			/**
			 * @inheritdoc Terrasoft.ChartModuleHelper#getSeriesQuery
			 * @protected
			 * @overridden
			 */
			getSeriesQuery: function(config) {
				return this.getOpportunityFunnelQuery(config);
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
					orderBy: "Stage.Number",
					seriesOrderIndex: 0
				};
			},

			/**
			 * ############ ######### ####### ## ####### # ########### ## #### - ######### # #########
			 * ####### ## ############.
			 * @virtual
			 * @param {Object} response ######### #######.
			 * @param {Terrasoft.DashboardFunnelEnums.FunnelType} funnelType ### ########### ####### ######.
			 * @return {Object} ########## ######### #######.
			 */
			prepareConversionResponse: function(response, funnelType) {
				var responseItems = response.collection.getItems();
				var bottomResponseItems = this.stageConversionBottomCollection.getItems();
				Terrasoft.each(responseItems, function(currentItem) {
					var xAxisValue = currentItem.get("xAxis").value;
					switch (funnelType) {
						case funnelTypeEnum.STAGE_CONVERSION:
							currentItem.set("bottomConversionValue", 0);
							for (var index in bottomResponseItems) {
								if (bottomResponseItems[index].get("xAxis").value === xAxisValue) {
									currentItem.set("bottomConversionValue", bottomResponseItems[index].get("yAxis"));
								}
							}
							break;
						case funnelTypeEnum.TO_FIRST_STAGE:
							currentItem.set("bottomConversionValue", this.firstStageBottomValue);
							break;
					}
				}, this);
				return response;
			},

			/**
			 * ######### ###### ### ####### ###### ## ###### ###### # ######### ######## ######### ### ###########.
			 * @private
			 * @param {Object} response ######### #######.
			 * @param {Object} stageCollection ######### ####### ## ########### ######.
			 * @param {Terrasoft.DashboardFunnelEnums.FunnelType} funnelType ### ########### ####### ######.
			 * @return {Object} ########## ###### # ####### ## ###### ###### ### ########### #######.
			 */
			mergeOpportunityStage: function(response, stageCollection, funnelType) {
				var stageName = "";
				var Id = "";
				Terrasoft.each(stageCollection.collection.getItems(), function(stageItem) {
					Id = stageItem.get("Id");
					stageName = stageItem.get(OpportunityStage.primaryDisplayColumnName);
					stageItem.set("xAxis", {
						Id: Id,
						value: Id,
						displayValue: stageName,
						number: stageItem.get("Number")
					});
					stageItem.set("yAxis", 0);
					stageItem.set("oppSum", 0);
					Terrasoft.each(response.collection.getItems(), function(responseItem) {
						if (stageName !== responseItem.get("xAxis").displayValue) {
							return;
						}
						stageItem.set("yAxis", responseItem.get("yAxis") || 0);
						stageItem.set("oppSum", responseItem.get("Amount") || 0);
					}, this);
					if (stageItem.rowConfig && !stageItem.xAxis) {
						stageItem.xAxis = {
							columnPath: "Stage"
						};
						stageItem.rowConfig.yAxis = {
							columnPath: "Id"
						};
					}
				}, this);
				this.prepareConversionResponse(stageCollection, funnelType);
				return stageCollection;
			},

			/**
			 * ########## #### ####### X ########## ######## #######.
			 * @param {Object} categoryItem ####### ## ######## ########## ##############.
			 * @return {String} ########## #### ####### X ########## ######## #######.
			 */
			getCategoryItemXAxisColumnPath: function(categoryItem) {
				var xAxisColumnPath = this.callParent(arguments);
				if (categoryItem.xAxis) {
					xAxisColumnPath = categoryItem.xAxis.columnPath;
				}
				return xAxisColumnPath;
			},

			/**
			 * ########## ######## ####### ####### ###### ## ######## ######### ########## #######.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} responseItem ####### ######### ########## #######.
			 * @return {Number} ######## #######.
			 */
			getFunnelChartValueByItem: function(responseItem) {
				var bottomValue = responseItem.get("bottomConversionValue") || 0;
				var yValue = (bottomValue === 0) ? 0 : (responseItem.get("yAxis") * 100 / bottomValue);
				return Math.round(yValue * 100) / 100;
			},

			/**
			 * ######### ############ ###### ### ##### ## ######## ######### ########## #######.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} responseItem ####### ######### ########## #######.
			 * @param {Number} yValue ######## ####### ## ### Y.
			 * @return {Object} ############ ### ########## # ##### #######.
			 */
			getSeriesDataConfigByItem: function(responseItem, yValue) {
				var xValueObject = responseItem.get("xAxis");
				var funnelType = this.funnelType;
				var bottomValue = responseItem.get("bottomConversionValue");
				var conversionStr = "";
				var lcz = resources.localizableStrings;
				var resultConfig = {
					name: "",
					value: "",
					displayValue: ""
				};
				if (xValueObject) {
					resultConfig.value = responseItem.get("Id");
					resultConfig.menuHeaderValue = xValueObject.displayValue || xValueObject;
					if (funnelType === funnelTypeEnum.BY_NUMBER) {
						resultConfig.name = Ext.String.format("{0}<br/>{1}: {2}", resultConfig.menuHeaderValue,
							lcz.CntOpportunity, yValue);
						resultConfig.displayValue = Ext.String.format("<br/>{0} {1} {2}", lcz.Amount,
							responseItem.get("oppSum"), this.primaryCurrencySymbol);
					} else {
						conversionStr = (bottomValue === 0) ? lcz.NoData : yValue + "%";
						resultConfig.name = Ext.String.format("{0}<br/>{1} {2}", resultConfig.menuHeaderValue,
							lcz.Conversion, conversionStr);
						resultConfig.displayValue = Ext.String.format("<br/>{0}: {1}",
							lcz.Conversion, conversionStr);
					}
				}
				return resultConfig;
			},

			/**
			 * @inheritdoc Terrasoft.ChartDrillDownProvider#prepareSeriesPoint
			 * @protected
			 * @overridden
			 */
			prepareSeriesPoint: function(response, seriesQueryConfig) {
				var isFunnel = this.getIsOpportunityFunnel();
				var funnelType = this.funnelType;
				var lcz = resources.localizableStrings;
				if (!isFunnel) {
					return this.callParent(arguments);
				}
				var stageCollection = Ext.clone(this.opportunityStage);
				response = this.mergeOpportunityStage(response, stageCollection, funnelType);
				var entitySchemaName = seriesQueryConfig.entitySchemaName;
				var seriesData = [];
				var i = 0;
				var entitySchema = this.getEntitySchemaByName(entitySchemaName);
				response.collection.each(function(item) {
					item.entitySchema = entitySchema;
					item.entitySchemaName = entitySchemaName;
					var xAxis = item.get("xAxis");
					var orderValue = xAxis && xAxis.number;
					var yValue = Math.round(item.get("yAxis") * 100) / 100;
					var countOpp = Ext.String.format(lcz.Count + ": {0}", yValue || 0);
					if (isFunnel && (funnelType !== funnelTypeEnum.BY_NUMBER)) {
						yValue = this.getFunnelChartValueByItem(item);
					}
					var seriesDataConfig = this.getSeriesDataConfigByItem(item, yValue);
					seriesData.push({
						name: seriesDataConfig.name,
						value: seriesDataConfig.value,
						orderValue: orderValue,
						displayValue: seriesDataConfig.displayValue,
						menuHeaderValue: seriesDataConfig.menuHeaderValue,
						categoryItem: item,
						x: i++,
						y: (yValue === 0 && isFunnel) ? 0.00001 : yValue,
						countOpp: countOpp,
						drilldown: true
					});
				}, this);
				return seriesData;
			}
		});
	});


