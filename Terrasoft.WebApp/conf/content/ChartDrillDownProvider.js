Terrasoft.configuration.Structures["ChartDrillDownProvider"] = {innerHierarchyStack: ["ChartDrillDownProvider"]};
define("ChartDrillDownProvider", [
	"ChartDrillDownProviderResources", "ChartDrillDownProviderUtils", "ChartModuleHelper", "DashboardEnums",
	"EntityStructureHelperMixin", "QueryCancellationMixin"
], function(resources) {

	/**
	 * @class Terrasoft.configuration.ChartDrillDownProvider
	 * Provider class of chart drill down.
	 */
	Ext.define("Terrasoft.configuration.ChartDrillDownProvider", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ChartDrillDownProvider",

		mixins: {
			EntityStructureHelper: "Terrasoft.EntityStructureHelperMixin",
			ChartDrillDownProviderUtils: "Terrasoft.ChartDrillDownProviderUtils",
			QueryCancellationMixin: "Terrasoft.QueryCancellationMixin"
		},

		Ext: null,

		sandbox: null,

		/**
		 * Limit of chart data request.
		 * @type {Number}
		 */
		queryDataLimit: null,

		/**
		 * Ignores query data limit of chart.
		 * @type {Boolean}
		 */
		ignoreQueryDataLimit: false,

		/**
		 * Localizable values.
		 * @type {Object}
		 */
		localizableValues: null,

		/**
		 * Filter message tag.
		 * @type {String}
		 */
		filterMessageTag: null,

		/**
		 * Data type storage for loaded columns.
		 * @type {Object}
		 */
		columnDataValueType: null,

		/**
		 * Caption storage for loaded columns.
		 * @type {Object}
		 */
		columnsCaptions: null,

		/**
		 * Serializable filters.
		 * @type {String}
		 */
		serializedFilterData: null,

		/**
		 * Drill down history of chart.
		 * @type {Object[]}
		 */
		drillDownHistory: null,

		/**
		 * Chart module helper.
		 * @type {Object}
		 */
		chartModuleHelper: null,

		/**
		 * Series config.
		 * @type {Object}
		 */
		seriesConfig: null,

		/**
		 * Initial general state.
		 * @type {Object}
		 */
		initialGeneralState: null,

		/**
		 * Initial series state.
		 * @type {Object[]}
		 */
		initialSeriesState: null,

		//region Methods: private

		//endregion

		/**
		 * @inheritdoc Terrasoft.manager.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.columnDataValueType = this.columnDataValueType || {};
			this.columnsCaptions = this.columnsCaptions || {};
			this.drillDownHistory = this.drillDownHistory || [];
			this.initialGeneralState = this.initialGeneralState || {};
			this.initialSeriesState = this.initialSeriesState || [];
			this.chartModuleHelper = Ext.create("Terrasoft.ChartModuleHelper");
			this.addEvents(
					"historyChanged"
			);
		},

		/**
		 * Returns entity schema by name.
		 * @param {String} entitySchemaName Entity schema name.
		 * @return {Terrasoft.BaseEntitySchema} Returns entity schema by name.
		 */
		getEntitySchemaByName: function(entitySchemaName) {
			return Terrasoft[entitySchemaName];
		},

		/**
		 * Returns key of entity schema column.
		 * @param {String} entitySchemaName Name of entity schema.
		 * @param {String} columnPath Column path.
		 * @return {String} Returns key of entity schema column.
		 */
		getEntitySchemaColumnKey: function(entitySchemaName, columnPath) {
			const keyTpl = "{0}_{1}";
			return Ext.String.format(keyTpl, entitySchemaName, columnPath);
		},

		/**
		 * Returns caption of entity schema column.
		 * @param {String} entitySchemaName Name of entity schema.
		 * @param {String} columnPath Column path.
		 * @return {String} Returns caption of entity schema column.
		 */
		getEntitySchemaColumnCaption: function(entitySchemaName, columnPath) {
			const columnKey = this.getEntitySchemaColumnKey(entitySchemaName, columnPath);
			return this.columnsCaptions[columnKey];
		},

		/**
		 * Returns data value type of entity schema column.
		 * @param {String} entitySchemaName Name of entity schema.
		 * @param {String} columnPath Column path.
		 * @return {Terrasoft.DataValueType} Returns data value type of entity schema column.
		 */
		getEntitySchemaColumnDataValueType: function(entitySchemaName, columnPath) {
			const columnKey = this.getEntitySchemaColumnKey(entitySchemaName, columnPath);
			return this.columnDataValueType[columnKey];
		},

		/**
		 * Column selection handler.
		 * @param {Object} selectedColumnInfo Configuration object of selected column information.
		 * @param {Object} categoryItem Category drilling down element.
		 */
		onStructureExplorerResult: function(selectedColumnInfo, categoryItem) {
			this.addItemFilter(categoryItem);
			const entitySchemaName = categoryItem.entitySchemaName;
			const xAxisColumnPath = selectedColumnInfo.leftExpressionColumnPath;
			this.changeCurrentHistory({
				xAxisColumn: xAxisColumnPath,
				entitySchemaName: entitySchemaName,
				yAxis: this.yAxis,
				YAxisCaption: "",
				categoryItem: categoryItem
			});
			const entitySchemaColumnKey = this.getEntitySchemaColumnKey(entitySchemaName, xAxisColumnPath);
			this.columnDataValueType[entitySchemaColumnKey] = selectedColumnInfo.dataValueType;
			this.columnsCaptions[entitySchemaColumnKey] = selectedColumnInfo.leftExpressionCaption;
		},

		/**
		 * Returns X-axis column path of selected chart item.
		 * @param {Object} categoryItem Category drilling down element.
		 * @return {String} Returns X-axis column path of selected chart item.
		 */
		getCategoryItemXAxisColumnPath: function(categoryItem) {
			const rowConfig = Terrasoft.deepClone(categoryItem.rowConfig);
			delete rowConfig.yAxis;
			const columnNames = Object.keys(rowConfig);
			return rowConfig[columnNames[0]].columnPath;
		},

		/**
		 * Returns Y-axis column path of selected chart item.
		 * @param {Object} categoryItem Category drilling down element.
		 * @return {String} Returns Y-axis column path of selected chart item.
		 */
		getCategoryItemYAxisColumnPath: function(categoryItem) {
			const rowConfig = Terrasoft.deepClone(categoryItem.rowConfig);
			return rowConfig.yAxis.columnPath;
		},

		/**
		 * Adds a filter for the selected item.
		 * @private
		 * @param {Object} categoryItem Category drilling down element.
		 */
		addItemFilter: function(categoryItem) {
			const xAxisColumnPath = this.getCategoryItemXAxisColumnPath(categoryItem);
			const dataValueType = this.getEntitySchemaColumnDataValueType(categoryItem.entitySchemaName,
					xAxisColumnPath);
			let categoryValue = null;
			let isDateEmpty = false;
			if (!Terrasoft.isDateDataValueType(dataValueType)) {
				categoryValue = categoryItem.get("xAxis");
			} else {
				const categoryItems = this.getDateTimeFormat();
				categoryValue = {
					datePart: {}
				};
				Terrasoft.each(categoryItems, function(category) {
					const datePartValue = categoryItem.get(category);
					if (datePartValue === 0) {
						isDateEmpty = true;
					}
					categoryValue.datePart[category] = datePartValue;
				}, this);
			}
			const filter = {};
			if ((Ext.isEmpty(categoryValue) || isDateEmpty) &&
					this.canGroupByEmptyValue(dataValueType, this.getUseEmptyValue())) {
				const displayValue = isDateEmpty
						? resources.localizableStrings.FilterEmptyValue
						: resources.localizableStrings.LookupEmptyCaption;
				categoryValue = {
					"displayValue": displayValue,
					"isNull": true
				};
			}
			filter[xAxisColumnPath] = categoryValue;
			this.setSeriesState(categoryItem.seriesNumber);
			this.pushHistory({filter: filter});
		},

		/**
		 * Drill up the chart.
		 */
		drillUp: function() {
			if (this.isNotDrilledDown()) {
				return;
			}
			this.drillDownHistory.pop();
			this.setSeriesState();
			this.fireEvent("historyChanged");
		},

		/**
		 * Cancel drill down history, returns chart to default state.
		 */
		cancelDrill: function() {
			if (this.isNotDrilledDown()) {
				return;
			}
			this.drillDownHistory = [this._getInitialSeriesState(0)];
			this.fireEvent("historyChanged");
		},

		/**
		 * Adds state to history.
		 * @param {Object} history History state object.
		 */
		pushHistory: function(history) {
			this.drillDownHistory.push(history);
			this.fireEvent("historyChanged");
		},

		/**
		 * Sets initial general state.
		 * @protected
		 * @param {Object} rawState Raw state.
		 */
		setInitialGeneralState: function(rawState) {
			this.initialGeneralState.entitySchemaName = rawState.entitySchemaName;
			this.initialGeneralState.dateTimeFormat = rawState.dateTimeFormat;
			this.initialGeneralState.orderBy = rawState.orderBy;
			this.initialGeneralState.orderDirection = rawState.orderDirection;
			this.initialGeneralState.seriesKind = rawState.seriesKind;
			this.initialGeneralState.displayMode = rawState.displayMode;
			this.initialGeneralState.yAxis = rawState.yAxis;
			this.initialGeneralState.YAxisCaption = rawState.YAxisCaption;
			this.initialGeneralState.useEmptyValue = rawState.useEmptyValue;
			this.initialGeneralState.primaryColumnValue = rawState.primaryColumnValue;
			this.initialGeneralState.sectionEntitySchemaName = rawState.sectionEntitySchemaName;
		},

		/**
		 * Sets initial series state.
		 * @protected
		 * @param {Object} rawState Raw state.
		 */
		setInitialSeriesState: function(rawState) {
			this.initialSeriesState = [
				{
					sectionBindingColumn: rawState.sectionBindingColumn,
					xAxisColumn: rawState.xAxisColumn,
					func: rawState.func,
					yAxisColumn: rawState.yAxisColumn,
					yAxisConfig: rawState.yAxisConfig,
					styleColor: rawState.styleColor,
					filterData: this.serializedFilterData
				}
			];
		},

		/**
		 * Initializes series state.
		 * @param {Object} rawState Raw state.
		 */
		initState: function(rawState) {
			this.seriesConfig = rawState.seriesConfig;
			this.setInitialGeneralState(rawState);
			this.setInitialSeriesState(rawState);
			Terrasoft.each(rawState.seriesConfig, function(rawSeries) {
				this.initialSeriesState.push({
					sectionBindingColumn: rawSeries.sectionBindingColumn,
					xAxisColumn: rawSeries.xAxisColumn,
					func: rawSeries.func,
					yAxisColumn: rawSeries.yAxisColumn,
					yAxisConfig: rawSeries.yAxisConfig,
					styleColor: rawSeries.styleColor,
					filterData: rawSeries.filterData
				});
			}, this);
			this.drillDownHistory.push(this._getInitialSeriesState(0));
			this.fireEvent("historyChanged");
		},

		/**
		 * Changes the last step in the history.
		 * @param {object} history History state object.
		 */
		changeCurrentHistory: function(history) {
			const currentStateIndex = this.getCurrentStateIndex();
			Ext.apply(this.drillDownHistory[currentStateIndex], history);
			this.fireEvent("historyChanged");
		},

		/**
		 * Returns current state index.
		 * @protected
		 * @return (Number) The state index.
		 */
		getCurrentStateIndex: function() {
			return this.drillDownHistory.length - 1;
		},

		/**
		 * Returns true if there is no drill down.
		 * @protected
		 * @return {Boolean} Returns true if there is no drill down.
		 */
		isNotDrilledDown: function() {
			return this.drillDownHistory.length === 1;
		},

		/**
		 * Returns current series state.
		 * @protected
		 * @return {Object} Current series state.
		 */
		getState: function() {
			return this.drillDownHistory.reduce(function(x, y) {
				return Ext.apply(x, y);
			}, {});
		},

		/**
		 * Returns initial series state.
		 * @private
		 * @param {Number} seriesNumber Index of required series.
		 * @return {Object} Series state.
		 */
		_getInitialSeriesState: function(seriesNumber) {
			return Ext.apply(Terrasoft.deepClone(this.initialGeneralState), this.initialSeriesState[seriesNumber]);
		},

		/**
		 *
		 * Returns the current view type.
		 * @return {Terrasoft.DashboardEnums.ChartDisplayMode} Returns the current view type.
		 */
		getDisplayMode: function() {
			const seriesState = this.getState();
			return seriesState.displayMode;
		},

		/**
		 * Returns the current column which binds to section.
		 * @return {String} Returns the current column which binds to section.
		 */
		getSectionBindingColumn: function() {
			const seriesState = this.getState();
			return seriesState.sectionBindingColumn;
		},

		/**
		 * Returns the current column for X-axis.
		 * @return {String} Returns the current column for X-axis.
		 */
		getXAxisColumn: function() {
			const seriesState = this.getState();
			return seriesState.xAxisColumn;
		},

		/**
		 * Returns the chart series array.
		 * @return {Object[]} Returns the chart series array.
		 */
		getSeriesConfig: function() {
			return this.seriesConfig;
		},

		/**
		 * Returns Y-axis column path.
		 * @return {String} Returns Y-axis column path.
		 */
		getYAxisColumn: function() {
			const seriesState = this.getState();
			return seriesState.yAxisColumn || "Id";
		},

		/**
		 * Returns an element category object of chart fragment.
		 * @return {Object} Returns an element category object of chart fragment.
		 */
		getCategoryItem: function() {
			const seriesState = this.getState();
			return seriesState.categoryItem;
		},

		/**
		 * Returns date time format.
		 * @return {String[]} Returns date time format.
		 */
		getDateTimeFormat: function() {
			const seriesState = this.getState();
			return seriesState.dateTimeFormat.split(";");
		},

		/**
		 * Returns the entity schema name.
		 * @return {String} Returns the entity schema name.
		 */
		getEntitySchemaName: function() {
			const seriesState = this.getState();
			return seriesState.entitySchemaName;
		},

		/**
		 * @private
		 */
		_getSectionEntitySchemaName: function() {
			const seriesState = this.getState();
			return seriesState.sectionEntitySchemaName;
		},

		/**
		 * Returns the Y-axis caption.
		 * @return {String} Returns the Y-axis caption.
		 */
		getYAxisCation: function() {
			const seriesState = this.getState();
			return seriesState.YAxisCaption;
		},

		/**
		 * Returns the objects array for Y-axis config.
		 * @return {Object[]} Returns the objects array for Y-axis config.
		 */
		getYAxisConfig: function() {
			const seriesState = this.getState();
			return seriesState.yAxisConfig;
		},

		/**
		 * Returns the chart style name.
		 * @return {String} Returns the chart style name.
		 */
		getStyleColor: function() {
			const seriesState = this.getState();
			return seriesState.styleColor;
		},

		/**
		 * Returns the use empty value flag.
		 * @return {Boolean} Use empty value flag.
		 */
		getUseEmptyValue: function() {
			const seriesState = this.getState();
			return seriesState.useEmptyValue;
		},

		/**
		 * Returns the current sort column and series index on the selection result, which will be sorted.
		 * @return {Object} Returns the current sort column and series index on the selection result,
		 * which will be sorted.
		 */
		getOrderBy: function() {
			const result = {
				orderBy: "",
				seriesOrderIndex: 0
			};
			const seriesState = this.getState();
			const orderBy = seriesState.orderBy;
			if (orderBy) {
				const splittedValue = orderBy.split(":");
				result.orderBy = splittedValue[0];
				result.seriesOrderIndex = parseInt(splittedValue[1], 10) || 0;
			}
			return result;
		},

		/**
		 * Is ordered by group column.
		 * @return {Boolean} Is ordered by group column.
		 */
		isOrderedByGroupColumn: function() {
			const orderBy = this.getOrderBy();
			return orderBy.orderBy === Terrasoft.DashboardEnums.ChartOrderBy.GROUP_BY_FIELD;
		},

		/**
		 * Returns the sorting order direction.
		 * @return {String} Returns the sorting order direction.
		 */
		getOrderDirection: function() {
			const seriesState = this.getState();
			return seriesState.orderDirection;
		},

		/**
		 * Returns the series index for result of selection, which must be sorted.
		 * @return {Number} Returns the series index for result of selection, which must be sorted.
		 */
		getSeriesOrderIndex: function() {
			let result = 0;
			if (this.isNotDrilledDown()) {
				const orderBy = this.getOrderBy();
				result = orderBy.seriesOrderIndex;
			}
			return result;
		},

		/**
		 * Returns the current chart type.
		 * @return {String} Returns the current chart type.
		 */
		getSeriesKind: function() {
			const seriesState = this.getState();
			return seriesState.seriesKind;
		},

		/**
		 * Returns the current aggregation type.
		 * @return {String} Returns the current aggregation type.
		 */
		getAggregationType: function() {
			const seriesState = this.getState();
			const aggregationTypeValue = seriesState.func;
			return (Ext.isNumber(aggregationTypeValue) || aggregationTypeValue.match(/\d+/g))
					? aggregationTypeValue
					: Terrasoft.AggregationType[aggregationTypeValue.toUpperCase()];
		},

		/**
		 * Returns drill down filters.
		 * @protected
		 * @return {Object} Returns the column filters object.
		 */
		getDrillDownFilters: function() {
			const filters = {};
			Terrasoft.each(this.drillDownHistory, function(history) {
				Ext.apply(filters, history.filter);
			}, this);
			return filters;
		},

		/**
		 * Handler of chart drill down.
		 * @param {Object} categoryItem Category drilling down element.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		drillDownChart: function(categoryItem, callback, scope) {
			Terrasoft.StructureExplorerUtilities.open({
				scope: this,
				handlerMethod: function(selectedColumnInfo) {
					this.onStructureExplorerResult(selectedColumnInfo, categoryItem);
					callback.call(scope);
				},
				moduleConfig: {
					useBackwards: false,
					schemaName: categoryItem.entitySchemaName
				}
			});
		},

		/**
		 * @private
		 */
		_getSectionSchemaBoundColumnPath: function(sectionBindingColumnPath, columnPath) {
			const sectionEntitySchema = Terrasoft[this._getSectionEntitySchemaName()];
			const columnPathArray = sectionBindingColumnPath.split(".");
			const columnPathTpl = columnPathArray.length > 1 ? "{4}.[{0}:{1}:{2}].{3}" : "[{0}:{1}:{2}].{3}";
			const lastSectionBindingColumnPathElement = columnPathArray.pop();
			return Ext.String.format(columnPathTpl,
					sectionEntitySchema.name,
					sectionEntitySchema.primaryColumnName,
					lastSectionBindingColumnPathElement,
					columnPath,
					columnPathArray.join("."));
		},

		/**
		 * Update filters of module based on bindings section settings.
		 * @protected
		 * @param {Terrasoft.FilterGroup} quickFilter Quick section filter object.
		 * @param {String} sectionBindingColumnPath Section binding column.
		 */
		updateModuleFilter: function(quickFilter, sectionBindingColumnPath) {
			const leftExpression = quickFilter.leftExpression;
			if (!Ext.isEmpty(leftExpression)) {
				if (leftExpression.columnPath) {
					leftExpression.columnPath = this._getSectionSchemaBoundColumnPath(
							sectionBindingColumnPath, leftExpression.columnPath);
				}
				const leftExpressionFunctionArgument = leftExpression.functionArgument;
				if (leftExpression.expressionType === Terrasoft.ExpressionType.FUNCTION && leftExpressionFunctionArgument) {
					leftExpressionFunctionArgument.columnPath = this._getSectionSchemaBoundColumnPath(
							sectionBindingColumnPath, leftExpressionFunctionArgument.columnPath);
				}
			} else {
				quickFilter.each(function(item) {
					this.updateModuleFilter(item, sectionBindingColumnPath);
				}, this);
			}
		},

		/**
		 * Returns quick filters group.
		 * @param {String} sectionBindingColumn Section binding column path.
		 * @return {Terrasoft.FilterGroup} Returns quick filters group.
		 */
		getQuickFilters: function(sectionBindingColumn) {
			if (Ext.isEmpty(sectionBindingColumn)) {
				return this.Ext.create("Terrasoft.FilterGroup");
			}
			const seriesState = this.getState();
			if (seriesState.primaryColumnValue) {
				const filter = this.Ext.create("Terrasoft.FilterGroup");
				filter.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Id", seriesState.primaryColumnValue));
				this.updateModuleFilter(filter, sectionBindingColumn);
				return filter;
			}
			const quickFilter = this.sandbox.publish("GetFiltersCollection", this.filterMessageTag || null);
			if (quickFilter) {
				if (!quickFilter.getIsEnabled()) {
					quickFilter.addItem(Terrasoft.createColumnIsNotNullFilter("Id"));
				}
				const sectionEntitySchema = Terrasoft[this._getSectionEntitySchemaName()];
				if (sectionEntitySchema && sectionEntitySchema.name) {
					this.updateModuleFilter(quickFilter, sectionBindingColumn);
				}
			}
			return quickFilter || this.Ext.create("Terrasoft.FilterGroup");
		},

		/**
		 * Returns chart filters group.
		 * @return {Terrasoft.FilterGroup} Returns chart filters group.
		 */
		getChartFilters: function() {
			return this.sandbox.publish("GetChartFilter", this.sandbox.id, [this.sandbox.id]);
		},

		/**
		 * Returns group of chart filters.
		 * @protected
		 * @param {String} serializedFilterData Serialized filters data.
		 * @return {Terrasoft.FilterGroup} Returns group of chart filters.
		 */
		getSerializedFilters: function(serializedFilterData) {
			let filters = serializedFilterData || this.serializedFilterData;
			if (filters && Ext.isString(filters)) {
				filters = Terrasoft.deserialize(filters);
			}
			return filters;
		},

		/**
		 * Adds filters to query.
		 * @protected
		 * @param {Terrasoft.EntitySchemaQuery} entitySchemaQuery Entity schema query.
		 */
		addFilters: function(entitySchemaQuery) {
			const categoryItem = this.getCategoryItem();
			const sectionBindingColumn = this.getSectionBindingColumn();
			let serializedFilters, xAxis;
			if (categoryItem) {
				serializedFilters = categoryItem.serializedFilters;
				xAxis = categoryItem.xAxis;
			} else {
				serializedFilters = this.getSerializedFilters();
				xAxis = {"column": this.getXAxisColumn()};
			}
			const addFiltersConfig = {
				"entitySchemaQuery": entitySchemaQuery,
				"filters": {
					"quickFilters": this.getQuickFilters(sectionBindingColumn),
					"chartFilters": this.getChartFilters(),
					"serializedFilters": serializedFilters,
					"drillDownFilters": this.getDrillDownFilters(),
					"columnIsNotNullFilters": this.getColumnIsNotNullFilter(xAxis)
				},
				"xAxis": xAxis
			};
			this.chartModuleHelper.addFilters(addFiltersConfig);
		},

		/**
		 * Returns entity schema query IsNullFilter by column.
		 * @protected
		 * @param {Object} column Column config.
		 * @return {Terrasoft.IsNullFilter} Returns IsNullFilter by column.
		 */
		getColumnIsNotNullFilter: function(column) {
			let response;
			if (!this.getUseEmptyValue() && column) {
				const columnPath = column.column || column.columnPath;
				response = Terrasoft.createColumnIsNotNullFilter(columnPath);
			}
			return response;
		},

		/**
		 * Initializes columns information.
		 * @param {Array} config Configuration.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		initColumnsInfo: function(config, callback, scope) {
			const callParameters = [];
			Terrasoft.each(config, function(configItem) {
				const entitySchemaName = configItem.entitySchemaName;
				const columnPath = configItem.columnPath;
				const columnKey = this.getEntitySchemaColumnKey(entitySchemaName, columnPath);
				const callParameter = {
					schemaName: configItem.entitySchemaName,
					columnPath: configItem.columnPath,
					key: columnKey
				};
				callParameters.push(callParameter);
			}, this);
			this.getColumnPathCaption(Ext.JSON.encode(callParameters), function(responseObject) {
				if (responseObject && responseObject[0]) {
					Terrasoft.each(responseObject, function(responseItem) {
						const storeKey = responseItem.key;
						this.columnDataValueType[storeKey] = responseItem.dataValueType;
						this.columnsCaptions[storeKey] = responseItem.columnCaption;
					}, this);
				}
				callback.call(scope);
			}, this);
		},

		/**
		 * Returns array of caption for chart nesting levels.
		 * @return {String[]} Returns array of caption for chart nesting levels.
		 */
		getDrillDownCaptions: function() {
			const result = [];
			const filters = this.getDrillDownFilters();
			const entitySchemaName = this.getEntitySchemaName();
			Terrasoft.each(filters, function(filterValue, filterColumn) {
				const columnCaption = this.getEntitySchemaColumnCaption(entitySchemaName, filterColumn);
				let columnValue = filterValue;
				if (filterValue && filterValue.datePart) {
					columnValue = [];
					Terrasoft.each(filterValue.datePart, function(value) {
						columnValue.push(value);
					}, this);
					columnValue = columnValue.join("-");
				}
				let displayValue = columnValue.displayValue || columnValue;
				displayValue = this.prepareDisplayValue(displayValue);
				result.push({
					caption: columnCaption,
					value: displayValue
				});
			}, this);
			return result;
		},

		/**
		 * Requests the data for the chart on the current state.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		getChartSeriesData: function(callback, scope) {
			let seriesData = [];
			this.yAxis = [];
			Terrasoft.chain(
					function(next) {
						const initColumnsInfoConfig = [
							{
								columnPath: this.getXAxisColumn(),
								entitySchemaName: this.getEntitySchemaName()
							}, {
								columnPath: this.getYAxisColumn(),
								entitySchemaName: this.getEntitySchemaName()
							}
						];
						if (this.isNotDrilledDown()) {
							const seriesConfig = this.getSeriesConfig();
							Terrasoft.each(seriesConfig, function(seriesConfigItem) {
								const seriesConfigItemEntitySchemaName = seriesConfigItem.schemaName;
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
						this.fillPeriodsForDateTimeSeries(seriesData);
						seriesData = this.convertSeriesDataToSingleCategory(seriesData);
						callback.call(scope, seriesData, this.yAxis);
					},
					this
			);
		},

		/**
		 * Fills empty period for date time series.
		 * @protected
		 * @param {Array} seriesData Series object.
		 */
		fillPeriodsForDateTimeSeries: function(seriesData) {
			const xAxisColumn = this.getXAxisColumn();
			const entitySchemaName = this.getEntitySchemaName();
			const dataValueType = this.getEntitySchemaColumnDataValueType(entitySchemaName, xAxisColumn);
			if (Terrasoft.isDateDataValueType(dataValueType) && this.getUseEmptyValue()) {
				const dateTimeFormat = this.getDateTimeFormat();
				if (this.getIsFixedDateTimeFormat(dateTimeFormat)) {
					this.fillFixedPeriodsForDateTimeSeries(seriesData, dateTimeFormat);
				} else {
					this.fillDynamicPeriodsForDateTimeSeries(seriesData, dateTimeFormat);
				}
			}
		},

		/**
		 * Sets series state to drill down history.
		 * @protected
		 * @param {Number} [seriesIndex] Index of required series.
		 */
		setSeriesState: function(seriesIndex) {
			const requiredSeriesIndex = seriesIndex || 0;
			if (this.isNotDrilledDown()) {
				this.drillDownHistory[0] = this._getInitialSeriesState(requiredSeriesIndex);
			}
		},

		/**
		 * Fills fixed periods for date time series.
		 * @private
		 * @param {Object} seriesData Series object.
		 * @param {Array} dateTimeFormat Array of date time formats.
		 */
		fillFixedPeriodsForDateTimeSeries: function(seriesData, dateTimeFormat) {
			const periodPart = dateTimeFormat && dateTimeFormat[0];
			if (periodPart) {
				const periodList = this.getPeriodList(periodPart);
				Terrasoft.each(periodList, function(periodPartValue) {
					const itemViewModelValues = {};
					itemViewModelValues[periodPart] = periodPartValue;
					this.fillSeriesData(seriesData, itemViewModelValues);
				}, this);
			}
		},

		/**
		 * Fills series data for fixed format.
		 * @private
		 * @param {Object} seriesData Series object.
		 * @param {Object} itemValues Object with values.
		 */
		fillSeriesData: function(seriesData, itemValues) {
			Terrasoft.each(seriesData, function(seriesItem) {
				const data = seriesItem.data;
				if (data.length) {
					const existedPoints = this.getExistedPointByValues(data, itemValues);
					if (!existedPoints || !existedPoints.length) {
						const seriesQueryConfig = this.getSeriesQueryConfigFromItem(data[0]);
						const emptySeriesItemPoint = this.generateEmptySeriesItemPoint(itemValues, seriesQueryConfig);
						data.push(emptySeriesItemPoint);
					}
				}
			}, this);
		},

		/**
		 * Returns series query config from seris data item.
		 * @private
		 * @param {Object} item Series data item.
		 * @return {Object} Series query config.
		 */
		getSeriesQueryConfigFromItem: function(item) {
			let config = null;
			if (item && item.categoryItem) {
				const categoryItem = item.categoryItem;
				config = {
					"entitySchemaName": categoryItem.entitySchemaName,
					"filters": {"serializedFilters": categoryItem.serializedFilters},
					"xAxis": categoryItem.xAxis,
					"rowConfig": categoryItem.rowConfig
				};
			}
			return config;
		},

		/**
		 * Returns array with series data which have values.
		 * @private
		 * @param {Array} data Array of chart values.
		 * @param {Object} values Values object.
		 * @return {Array} Array with series data which have values.
		 */
		getExistedPointByValues: function(data, values) {
			return data.filter(function(item) {
				let hasInSeriesItem = true;
				const categoryItem = item.categoryItem;
				Terrasoft.each(values, function(value, key) {
					hasInSeriesItem = hasInSeriesItem && categoryItem.get(key) === value;
				}, this);
				return hasInSeriesItem;
			}, this);
		},

		/**
		 * Returns series data item config.
		 * @private
		 * @param {Object} values Values object.
		 * @param {Object} seriesQueryConfig Series query config.
		 * @return {Object} Series data item config.
		 */
		generateEmptySeriesItemPoint: function(values, seriesQueryConfig) {
			const itemViewModel = Ext.create("Terrasoft.BaseViewModel", {"values": values});
			itemViewModel.set("yAxis", 0);
			itemViewModel.rowConfig = seriesQueryConfig.rowConfig;
			return this.getSeriesDataItemConfig(itemViewModel, null, seriesQueryConfig);
		},

		/**
		 * Returns order values list from all series by selector.
		 * @private
		 * @param {Array} seriesData Array of series data.
		 * @param {Function} selector Item selector function.
		 * @return {Array} Order value list.
		 */
		getSeriesOrderValueList: function(seriesData, selector) {
			const result = [];
			Terrasoft.each(seriesData, function(seriesItem) {
				Terrasoft.each(seriesItem.data, function(item) {
					result.push(selector(item));
				}, this);
			}, this);
			return result;
		},

		/**
		 * Fills dynamic periods for date time series.
		 * @private
		 * @param {Array} seriesData Array of series data.
		 * @param {Array} dateTimeFormat Date time format values.
		 */
		fillDynamicPeriodsForDateTimeSeries: function(seriesData, dateTimeFormat) {
			let selector;
			if (this.isOrderedByChartEntityColumn()) {
				selector = function(item) {
					return item.categoryItem.seriesValue;
				};
			} else {
				selector = function(item) {
					return item.orderValue;
				};
			}
			const orderValueList = this.getSeriesOrderValueList(seriesData, selector);
			let min = Ext.Array.min(orderValueList);
			const max = Ext.Array.max(orderValueList);
			Terrasoft.each(seriesData, function(seriesItem) {
				const data = seriesItem.data;
				if (data.length) {
					while (min < max) {
						const values =
								this.getDatePartsFromDate(this.getLocalTimeZoneDateTimeOrderValue(min), dateTimeFormat);
						const existedPoints = this.getExistedPointByValues(data, values);
						if (!existedPoints || !existedPoints.length) {
							if (data.length >= this.queryDataLimit && !this.ignoreQueryDataLimit) {
								seriesItem.excessQueryDataLimit = true;
								break;
							}
							const seriesQueryConfig = this.getSeriesQueryConfigFromItem(data[0]);
							const emptySeriesItemPoint = this.generateEmptySeriesItemPoint(values, seriesQueryConfig);
							data.push(emptySeriesItemPoint);
						}
						min = this.getNextDateStepByDateTimeFormat(min, dateTimeFormat);
					}
				}
			}, this);
		},

		/**
		 * Returns is fixed date time format.
		 * @private
		 * @param dateTimeFormat
		 * @returns {Boolean} Is fixed date time format.
		 */
		getIsFixedDateTimeFormat: function(dateTimeFormat) {
			return dateTimeFormat &&
					dateTimeFormat.length === 1 &&
					dateTimeFormat[0] !== "Year";
		},

		/**
		 * Returns the number for sorting DateTime data.
		 * @param {Object} datePartValues Object contains the values of parts DateTime.
		 * @return {Number} Returns the number of sorting DateTime data.
		 */
		getDateTimeOrderValue: function(datePartValues) {
			const dateTimeFormat = this.getDateTimeFormat();
			let response;
			if (this.getIsFixedDateTimeFormat(dateTimeFormat)) {
				const orderValueKey = dateTimeFormat[0];
				response = datePartValues[orderValueKey];
			} else {
				let orderValue = new Date(0);
				const timezoneOffset = orderValue.getTimezoneOffset();
				orderValue = Ext.Date.add(orderValue, Ext.Date.MINUTE, timezoneOffset);
				if (datePartValues.Year) {
					orderValue.setYear(datePartValues.Year);
				}
				if (datePartValues.Month) {
					orderValue = Ext.Date.add(orderValue, Ext.Date.MONTH, datePartValues.Month - 1);
				}
				if (datePartValues.Week) {
					orderValue = Ext.Date.add(orderValue, Ext.Date.DAY, (datePartValues.Week) * 7);
				}
				if (datePartValues.Day) {
					orderValue = Ext.Date.add(orderValue, Ext.Date.DAY, datePartValues.Day - 1);
				}
				if (datePartValues.Hour) {
					orderValue = Ext.Date.add(orderValue, Ext.Date.HOUR, datePartValues.Hour);
				}
				const currentTimeZone = orderValue.getTimezoneOffset();
				orderValue = Ext.Date.add(orderValue, Ext.Date.MINUTE, -currentTimeZone);
				response = orderValue.getTime();
			}
			return response;
		},

		/**
		 * Returns date time order value for local timezone.
		 * @protected
		 * @param {Number} orderValue Date time order value for UTC timezone.
		 * @return {Number} Date time order value for local timezon.
		 */
		getLocalTimeZoneDateTimeOrderValue: function(orderValue) {
			let local = new Date(orderValue);
			const timezoneOffset = local.getTimezoneOffset();
			local = Ext.Date.add(local, Ext.Date.MINUTE, timezoneOffset);
			return local.getTime();
		},

		/**
		 * Returns an array of all the categories of the united series.
		 * @param {Object[]} seriesData Primary series data.
		 * @return {Object[]} An array of all the categories of the united series.
		 */
		getUnitedCategories: function(seriesData) {
			let categoryItems = [];
			const existingValues = [];
			Terrasoft.each(seriesData, function(seriesDataItem) {
				const seriesCategoryItems = seriesDataItem.data.map(function(item) {
					const orderValue = this.getSeriesDataItemOrderValue(item);
					return {
						value: item.value,
						name: item.name,
						orderValue: orderValue
					};
				}, this);
				Terrasoft.each(seriesCategoryItems, function(seriesCategoryItem) {
					if (!Terrasoft.contains(existingValues, seriesCategoryItem.value)) {
						if (this.isOrderedByGroupColumn()) {
							const insertInto = Terrasoft.sortedIndex(categoryItems, seriesCategoryItem, function(item) {
								const orderValue = item.orderValue;
								return (Ext.isNumber(orderValue)) ? orderValue : orderValue.toLowerCase();
							});
							categoryItems = Ext.Array.insert(categoryItems, insertInto, [seriesCategoryItem]);
						} else {
							categoryItems.push(seriesCategoryItem);
						}
						existingValues.push(seriesCategoryItem.value);
					}
				}, this);
				categoryItems = this.getSortData(categoryItems);
			}, this);
			return categoryItems;
		},

		/**
		 * Returns series data item order value.
		 * @private
		 * @param {Object} item Series data item.
		 * @return {String|Number} Returns order value.
		 */
		getSeriesDataItemOrderValue: function(item) {
			let orderValue = item.name;
			if (this.isOrderedByGroupColumn()) {
				const categoryItem = item.categoryItem;
				const categoryItemValues = Terrasoft.deepClone(categoryItem.values);
				if (!categoryItemValues.hasOwnProperty("xAxis")) {
					orderValue = this.getDateTimeOrderValue(categoryItemValues);
				}
				orderValue = this.convertOrderValueToNumber(categoryItem.xAxis, orderValue);
			} else {
				orderValue = item.orderValue || orderValue;
			}
			return orderValue;
		},

		/**
		 * Returns order direction index.
		 * @protected
		 * @return {Number} Returns order direction index.
		 */
		getOrderDirectionIndex: function() {
			return (this.getOrderDirection() === Terrasoft.DashboardEnums.ChartOrderDirection.DESCENDING) ? -1 : 1;
		},

		/**
		 * Returns sortered data.
		 * @protected
		 * @param {Object[]} items Series data.
		 * @param {Number} orderDirectionIndex Order direction inde.
		 * @return {Object[]} Returns sortered series data.
		 */
		getSortData: function(items, orderDirectionIndex) {
			if (!orderDirectionIndex) {
				orderDirectionIndex = this.getOrderDirectionIndex();
			}
			return Ext.Array.sort(items, function(first, second) {
				return (first.orderValue > second.orderValue) ? orderDirectionIndex : (orderDirectionIndex * -1);
			});
		},

		/**
		 * Sorts the series data on the query series.
		 * @param {Object[]} seriesData Series data.
		 * @return {Object[]} Sorts the series data on the query series.
		 */
		sortSeriesData: function(seriesData) {
			let result = [];
			if (this.isOrderedByChartEntityColumn()) {
				const seriesOrderIndex = this.getSeriesOrderIndex();
				const orderSeriesItem = seriesData[seriesOrderIndex];
				let orderSeriesItemData = orderSeriesItem.data;
				orderSeriesItemData = this.getSortData(orderSeriesItemData);
				Terrasoft.each(orderSeriesItemData, function(item, index) {
					item.x = index;
				});
				result[seriesOrderIndex] = orderSeriesItem;
				Terrasoft.each(seriesData, function(seriesItem, seriesIndex) {
					const seriesItemData = seriesItem.data;
					if (seriesIndex !== seriesOrderIndex) {
						result[seriesIndex] = seriesItem;
						const orderedData = [];
						Terrasoft.each(orderSeriesItemData, function(orderDataItem) {
							const value = orderDataItem.value;
							const searchDataItem = Ext.Array.findBy(seriesItemData, function(item) {
								return item.value === value;
							}, this);
							orderedData.push(searchDataItem);
							searchDataItem.x = orderedData.length - 1;
						}, this);
						result[seriesIndex].data = orderedData;
					}
				}, this);
			} else {
				result = seriesData;
			}
			return result;
		},

		/**
		 * Rebuilds the data array according to referred categories.
		 * @protected
		 * @param {Array} data Data array.
		 * @param {Array} categoryItems Categories array.
		 * @param {Object} uniqueCategoriesData Unique categories data items.
		 * @return {Array} Rebuilded array.
		 */
		mapSeriesItemDataToCategories: function(data, categoryItems, uniqueCategoriesData) {
			const dataByCategories = this.getDataByCategories(data);
			return categoryItems.map(function(item, index) {
				let dataItem = dataByCategories[item.value];
				if (dataItem) {
					dataItem.x = index;
				} else {
					dataItem = Ext.apply({}, uniqueCategoriesData[item.value]);
					dataItem.y = 0;
					dataItem.x = index;
					if (this.isOrderedByChartEntityColumn()) {
						dataItem.orderValue = 0;
					}
				}
				return dataItem;
			}, this);
		},

		/**
		 * Converts series data to single category.
		 * @param {Object[]} seriesData Series data.
		 * @return {Object[]} Converted series data.
		 */
		convertSeriesDataToSingleCategory: function(seriesData) {
			const categoryItems = this.getUnitedCategories(seriesData);
			const uniqueCategoriesData = this.getUniqueCategoriesData(seriesData);
			let i = 0;
			const iterations = seriesData.length;
			for (; i < iterations; i++) {
				const data = seriesData[i].data;
				seriesData[i].data = this.mapSeriesItemDataToCategories(data, categoryItems, uniqueCategoriesData);
			}
			return this.sortSeriesData(seriesData);
		},

		/**
		 * Returns unique categories data.
		 * @private
		 * @param {Array} seriesData Series data.
		 * @return {Object} Unique categories data.
		 */
		getUniqueCategoriesData: function(seriesData) {
			const allCategoriesItems = seriesData.reduce(function(accumulator, item) {
				return accumulator.concat(item.data);
			}, []);
			return this.getDataByCategories(allCategoriesItems);
		},

		/**
		 * Returns data by categories item.
		 * @private
		 * @param {Array} data Data array.
		 * @return {Object} Dat by categories item.
		 */
		getDataByCategories: function(data) {
			const dataByCategories = {};
			Terrasoft.each(data, function(item) {
				const value = item.value;
				if (!dataByCategories[value]) {
					dataByCategories[value] = item;
				}
			}, this);
			return dataByCategories;
		},

		/**
		 * Returns a Y-axis signature settings for a series.
		 * @param {Object} seriesConfig Series item configuration.
		 * @return {Object} Returns a Y-axis signature settings for a series.
		 */
		getSeriesYAxis: function(seriesConfig) {
			const yAxisConfig = seriesConfig.yAxisConfig || {};
			const textStyle = {
				"color": Terrasoft.DashboardEnums.StyleColors[seriesConfig.styleColor] || "#999999",
				"font-family": "Segoe UI",
				"font-size": "13px",
				"line-height": "14px",
				"width": "100%",
				"fill": "#999999"
			};
			return {
				gridLineWidth: 0,
				title: {
					text: seriesConfig.YAxisCaption || "",
					style: textStyle
				},
				labels: {
					rotation: 0,
					style: textStyle
				},
				min: yAxisConfig.min,
				max: yAxisConfig.max,
				opposite: yAxisConfig.position === Terrasoft.DashboardEnums.ChartAxisPosition.RIGHT
			};
		},

		/**
		 * Returns chart series data query.
		 * @protected
		 * @param {Object} config Configuration object.
		 * @param {String} config.entitySchemaName Query schema name.
		 * @param {String} config.func Aggregation function name.
		 * @param {Object} config.xAxis X axis column parameter object.
		 * @param {String} config.xAxis.column X axis column.
		 * @param {Terrasoft.DataValueType} config.xAxis.dataValueType X axis column data type.
		 * @param {String[]} config.xAxis.dateTimeFormat X axis column date format.
		 * @param {String} config.yAxis.column Y axis column.
		 * @param {Object} config.filters Filter parameter object.
		 * @param {Terrasoft.BaseFilter} config.filters.quickFilters Section quick filter object.
		 * @param {Terrasoft.BaseFilter} config.filters.chartFilters Chart filter object.
		 * @param {Terrasoft.BaseFilter} config.filters.serializedFilters Filter serialized object.
		 * @param {Terrasoft.BaseFilter} config.filters.drillDownFilters Drill down filter chart.
		 * @return {Terrasoft.EntitySchemaQuery} Data query for chart.
		 */
		getSeriesQuery: function(config) {
			if (config) {
				const esq = this.chartModuleHelper.getSeriesQuery(config);
				esq.isBatchable = Terrasoft.Features.getIsEnabled("BatchableDashboardQueryFeature");
				esq.queryKind = Terrasoft.QueryKind.LIMITED;
				this.applyQueryDataLimit(esq);
				return esq;
			}
		},

		/**
		 * Returns the sign of need to check the limit of chart data traffic request.
		 * @return {Boolean} The sign of need to check the limit of chart data traffic request.
		 */
		checkQueryDataLimit: function() {
			return !this.ignoreQueryDataLimit && this.queryDataLimit > -1;
		},

		/**
		 * Applies data query restriction chart.
		 * @protected
		 */
		applyQueryDataLimit: function(esq) {
			esq.rowCount = this.checkQueryDataLimit() ? this.queryDataLimit + 1 : -1;
		},

		/**
		 * Returns the sign of the excess data query restrictions of chart.
		 * @protected
		 * @return {Boolean} The sign of the excess data query restrictions of chart.
		 */
		excessQueryDataLimit: function(seriesDataCount) {
			return this.checkQueryDataLimit() ? this.queryDataLimit < seriesDataCount : false;
		},

		/**
		 * Returns function array for getting series data.
		 * @protected
		 * @param {Object} seriesQueryConfig Series query config.
		 * @param {Object} seriesConfig Series config.
		 * @param {Object[]} resultSeriesData Result series data.
		 * @param {Object} yAxis Array configuration data labels of the Y axis of the diagram.
		 * @return {Function[]} Function array for getting series data.
		 */
		getSeriesDataChain: function(seriesQueryConfig, seriesConfig, resultSeriesData, yAxis) {
			const chain = [];
			const schemaName = seriesQueryConfig.entitySchemaName;
			const getEntitySchema = function(next) {
				this.getEntitySchema(schemaName, function() {
					next();
				}, this);
			};
			chain.push(getEntitySchema);
			const getSeriesDataFunction = function(next) {
				const query = this.getSeriesQuery(seriesQueryConfig);
				query.getEntityCollection(function(response) {
					const entitySchema = this.getEntitySchemaByName(seriesConfig.schemaName);
					const xAxis = seriesQueryConfig.xAxis;
					const seriesData = {
						name: seriesConfig.YAxisCaption || entitySchema.caption,
						data: this.prepareSeriesPoint(response, seriesQueryConfig, seriesConfig.seriesNumber),
						useEmptyValue: seriesQueryConfig.useEmptyValue
					};
					seriesData.excessQueryDataLimit = this.excessQueryDataLimit(seriesData.data.length);
					if (seriesConfig.yAxisConfig &&
							seriesConfig.yAxisConfig.position !== Terrasoft.DashboardEnums.ChartAxisPosition.NONE) {
						seriesData.yAxis = yAxis.length;
						yAxis.push(this.getSeriesYAxis(seriesConfig));
					}
					if (seriesConfig.type) {
						seriesData.type = seriesConfig.type;
					}
					if (seriesConfig.styleColor) {
						const color = Terrasoft.DashboardEnums.StyleColors[seriesConfig.styleColor];
						seriesData._colorIndex = Terrasoft.DashboardEnums.WidgetColorSet.indexOf(color);
					}
					if (seriesData.isDateTime === Terrasoft.isDateDataValueType(xAxis && xAxis.dataValueType)) {
						seriesData.dateTimeFormat = xAxis.dateTimeFormat;
						seriesData.seriesConfig = {
							"xAxis": xAxis,
							"entitySchemaName": seriesQueryConfig.entitySchemaName
						};
					}
					resultSeriesData.push(seriesData);
					next();
				}, this);
				const key = this.sandbox.id + seriesConfig.seriesNumber;
				this.mixins.QueryCancellationMixin.registerSentQuery.call(this, key, query);
			};
			chain.push(getSeriesDataFunction);
			return chain;
		},

		/**
		 * Returns ordering criteria by selection result.
		 * @return {Boolean} Ordering criteria by selection result.
		 */
		isOrderedByChartEntityColumn: function() {
			const orderBy = this.getOrderBy();
			return orderBy.orderBy === Terrasoft.DashboardEnums.ChartOrderBy.CHART_ENTITY_COLUMN;
		},

		/**
		 * Returns ordering settings.
		 * @return {Object} Ordering settings.
		 */
		getOrderByConfig: function() {
			const chartOrderDirection = this.getOrderDirection();
			let esqOrderDirection;
			switch (chartOrderDirection) {
				case Terrasoft.DashboardEnums.ChartOrderDirection.ASCENDING:
					esqOrderDirection = Terrasoft.OrderDirection.ASC;
					break;
				case Terrasoft.DashboardEnums.ChartOrderDirection.DESCENDING:
					esqOrderDirection = Terrasoft.OrderDirection.DESC;
					break;
				default:
					esqOrderDirection = Terrasoft.OrderDirection.NONE;
			}
			const result = {
				direction: esqOrderDirection
			};
			const orderByConfig = this.getOrderBy();
			const orderBy = orderByConfig.orderBy;
			switch (orderBy) {
				case Terrasoft.DashboardEnums.ChartOrderBy.GROUP_BY_FIELD:
				case Terrasoft.DashboardEnums.ChartOrderBy.CHART_ENTITY_COLUMN:
					result.chartOrderType = orderBy;
					break;
				default:
					result.chartOrderType = Terrasoft.DashboardEnums.ChartOrderBy.CUSTOM_COLUMN;
					result.orderColumn = orderBy;
			}
			return result;
		},

		/**
		 * Returns main series data array.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 * @return {Object[]} Main series data array.
		 */
		getMainSeriesData: function(callback, scope) {
			const xAxisColumn = this.getXAxisColumn();
			const yAxisColumn = this.getYAxisColumn();
			const orderBy = this.getOrderByConfig();
			const entitySchemaName = this.getEntitySchemaName();
			const categoryItem = this.getCategoryItem();
			const sectionBindingColumn = this.getSectionBindingColumn();
			const useEmptyValue = this.getUseEmptyValue();
			const serializedFilters = (categoryItem) ? categoryItem.serializedFilters : null;
			const xAxis = {
				"column": xAxisColumn,
				"dataValueType": this.getEntitySchemaColumnDataValueType(entitySchemaName, xAxisColumn),
				"dateTimeFormat": this.getDateTimeFormat()
			};
			const getSeriesQueryConfig = {
				"entitySchemaName": entitySchemaName,
				"func": this.getAggregationType(),
				"xAxis": xAxis,
				"yAxis": {
					"column": yAxisColumn
				},
				"filters": {
					"quickFilters": this.getQuickFilters(sectionBindingColumn),
					"chartFilters": this.getChartFilters(),
					"serializedFilters": serializedFilters || this.getSerializedFilters(),
					"drillDownFilters": this.getDrillDownFilters(),
					"columnIsNotNullFilters": this.getColumnIsNotNullFilter(xAxis)
				},
				"useEmptyValue": useEmptyValue,
				"orderBy": orderBy
			};
			const seriesConfig = {
				"schemaName": entitySchemaName,
				"YAxisCaption": this.getYAxisCation(),
				"yAxisConfig": this.getYAxisConfig(),
				"styleColor": this.getStyleColor(),
				"xAxisColumn": xAxisColumn,
				seriesNumber: 0
			};
			const resultSeriesData = [];
			const chainParameters = this.getSeriesDataChain(getSeriesQueryConfig, seriesConfig, resultSeriesData,
					this.yAxis);
			chainParameters.push(function() {
				callback.call(scope, resultSeriesData);
			});
			chainParameters.push(this);
			Terrasoft.chain.apply(this, chainParameters);
		},

		/**
		 * Returns adding series data array.
		 * @protected
		 * @return {Object[]} Adding series data array.
		 */
		getAdditionalSeriesData: function(callback, scope) {
			const self = this;
			const resultSeriesData = [];
			const seriesConfig = this.getSeriesConfig() || [];
			const chainParameters = [];
			if (this.isNotDrilledDown()) {
				Terrasoft.each(seriesConfig, function(config, seriesNumber) {
					const entitySchemaName = config.schemaName;
					const xAxisColumn = config.xAxisColumn;
					const xAxis = {
						"column": config.xAxisColumn,
						"dataValueType": self.getEntitySchemaColumnDataValueType(entitySchemaName, xAxisColumn),
						"dateTimeFormat": self.getDateTimeFormat()
					};
					const columnIsNotNullFilters = this.getColumnIsNotNullFilter(xAxis);
					const getSeriesQueryConfig = {
						"entitySchemaName": config.schemaName,
						"useEmptyValue": self.getUseEmptyValue(),
						"func": (this.chartModuleHelper.getAggregationType(config.func) || config.func),
						"xAxis": xAxis,
						"yAxis": {
							column: config.yAxisColumn || config.primaryColumnName
						},
						"filters": {
							"quickFilters": self.getQuickFilters(config.sectionBindingColumn),
							"chartFilters": self.getChartFilters(),
							"serializedFilters": self.getSerializedFilters(config.filterData),
							"drillDownFilters": self.getDrillDownFilters(),
							"columnIsNotNullFilters": columnIsNotNullFilters
						}
					};
					config.seriesNumber = seriesNumber + 1;
					const seriesDataChain = self.getSeriesDataChain(getSeriesQueryConfig, config, resultSeriesData,
							self.yAxis);
					Ext.Array.insert(chainParameters, chainParameters.length, seriesDataChain);
				}, this);
			}
			chainParameters.push(function() {
				callback.call(scope, resultSeriesData);
			});
			chainParameters.push(this);
			Terrasoft.chain.apply(this, chainParameters);
		},

		/**
		 * Returns query series set.
		 * @protected
		 * @param {Object} response Server response.
		 * @param {Object} seriesQueryConfig Query configuration.
		 * @param {Number} seriesNumber Series number.
		 * @return {Object[]} Query series set.
		 */
		prepareSeriesPoint: function(response, seriesQueryConfig, seriesNumber) {
			const xAxis = seriesQueryConfig.xAxis;
			const collection = response.collection;
			const useEmptyValue = this.getUseEmptyValue();
			const seriesData = [];
			let i = 0;
			collection.each(function(item) {
				const seriesDataItem = this.getSeriesDataItemConfig(item, i, seriesQueryConfig);
				item.seriesNumber = seriesNumber;
				if (Ext.isEmpty(seriesDataItem.name) && this.canGroupByEmptyValue(xAxis.dataValueType, useEmptyValue)) {
					seriesDataItem.name = resources.localizableStrings.LookupEmptyCaption;
					item.useEmptyValue = useEmptyValue;
				}
				seriesData.push(seriesDataItem);
				i++;
			}, this);
			return seriesData;
		},

		/**
		 * Returns true - when column can group by empty value, false - othervise.
		 * @protected
		 * @param {Terrasoft.DataValueType} dataValueType Column data value type.
		 * @param {Boolean} useEmptyValue Can use empty value flag.
		 * @return {Boolean} True - when column can group by empty value, false - othervise.
		 */
		canGroupByEmptyValue: function(dataValueType, useEmptyValue) {
			return useEmptyValue && (
					Terrasoft.isTextDataValueType(dataValueType) ||
					Terrasoft.isLookupDataValueType(dataValueType) ||
					Terrasoft.isDateDataValueType(dataValueType));
		},

		/**
		 * Returns series data item config.
		 * @protected
		 * @param {Object} item Series data item.
		 * @param {Index} index Series index.
		 * @param {Object} seriesQueryConfig Series query config.
		 * @return {Object} Prepared series data item config.
		 */
		getSeriesDataItemConfig: function(item, index, seriesQueryConfig) {
			this.updateSeriesDataItemViewModel(item, seriesQueryConfig);
			const xAxis = item.xAxis;
			const isDateType = Terrasoft.isDateDataValueType(xAxis.dataValueType);
			const categoryItems = isDateType ? xAxis.dateTimeFormat : ["xAxis"];
			const name = isDateType
					? this.getFormatDateName(item, categoryItems)
					: this.getSeriesDataItemCombinedProperty(item, categoryItems, "displayValue",
							this.prepareDisplayValue);
			const value = this.getSeriesDataItemCombinedProperty(item, categoryItems, "value");
			return {
				"name": name,
				"value": value,
				"categoryItem": item,
				"x": index,
				"y": item.get("yAxis"),
				"orderValue": item.orderValue,
				"drilldown": true
			};
		},

		/**
		 * Returns formatted date value.
		 * @protected
		 * @param {Object} item Series data item.
		 * @param {Array} categoryItems Category items array.
		 * @return {String} Name value.
		 */
		getFormatDateName: function(item, categoryItems) {
			const dateTimeFormat = this.getDateTimeFormat();
			const dateTimeFormatStringValue = dateTimeFormat.join("");
			const milliseconds = this.isOrderedByChartEntityColumn() ? item.seriesValue : item.orderValue;
			const localOrderValue = this.getLocalTimeZoneDateTimeOrderValue(milliseconds);
			const date = new Date(localOrderValue);
			let name;
			switch (dateTimeFormatStringValue) {
				case "DayMonth":
					name = this.Ext.Date.format(date, Terrasoft.Resources.CultureSettings.shortMonthDayPattern);
					break;
				case "MonthYear":
					name = this.Ext.Date.format(date, Terrasoft.Resources.CultureSettings.shortYearMonthPattern);
					break;
				case "DayMonthYear":
					name = this.Ext.Date.format(date, Terrasoft.Resources.CultureSettings.dateFormat);
					break;
				default:
					name = this.getSeriesDataItemCombinedProperty(item, categoryItems, "displayValue",
							this.prepareDisplayValue);
			}
			return name;
		},

		/**
		 * Update series data item viewModel by series query config.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} viewModel Series data item viewModel.
		 * @param {Object} seriesQueryConfig Series query config.
		 */
		updateSeriesDataItemViewModel: function(viewModel, seriesQueryConfig) {
			const entitySchemaName = seriesQueryConfig.entitySchemaName;
			const xAxis = seriesQueryConfig.xAxis;
			const filters = seriesQueryConfig.filters || {};
			const serializedFilters = filters.serializedFilters;
			viewModel.entitySchemaName = entitySchemaName;
			viewModel.serializedFilters = serializedFilters;
			viewModel.xAxis = xAxis;
			viewModel.orderValue = this.getItemViewModelOrderValue(viewModel, xAxis);
			viewModel.seriesValue =
					this.isOrderedByChartEntityColumn() && Terrasoft.isDateDataValueType(xAxis && xAxis.dataValueType)
							? this.getDateTimeOrderValue(viewModel.values)
							: null;
		},

		/**
		 * Returns viewModel order value.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} viewModel Series data item viewModel.
		 * @param {Object} xAxis x Axis.
		 * @return {Number} Order value.
		 */
		getItemViewModelOrderValue: function(viewModel, xAxis) {
			const orderByConfig = this.getOrderBy();
			let result = viewModel.get(orderByConfig.orderBy) || viewModel.get("yAxis");
			if (this.isOrderedByGroupColumn() && Terrasoft.isDateDataValueType(xAxis && xAxis.dataValueType)) {
				result = this.getDateTimeOrderValue(viewModel.values);
			}
			return result;
		},

		/**
		 * Returns combined series data item property.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item Series data item viewModel.
		 * @param {String[]} displayFormats Display formats.
		 * @param {String} propertyName Name of combined property.
		 * @param {Function} valueModificator Value modificator.
		 * @return {String} Combined series data item property.
		 */
		getSeriesDataItemCombinedProperty: function(item, displayFormats, propertyName, valueModificator) {
			const list = [];
			propertyName = propertyName || "value";
			Terrasoft.each(displayFormats, function(part) {
				let value = item.get(part);
				if (!Ext.isEmpty(value)) {
					value = this.Ext.isObject(value) ? value[propertyName] : value;
					if (this.Ext.isFunction(valueModificator)) {
						value = valueModificator.call(this, value);
					}
					list.push(value);
				}
			}, this);
			return list.join("-");
		},

		/**
		 * Prepares series of displayed values.
		 * @protected
		 * @param {String|Boolean|Number} value Displayed value.
		 * @return {String} Prepared displayed value.
		 */
		prepareDisplayValue: function(value) {
			if (Ext.isBoolean(value)) {
				const localizableValues = this.localizableValues;
				if (localizableValues) {
					return value
							? localizableValues.BooleanFieldTrueCaption
							: localizableValues.BooleanFieldFalseCaption;
				} else {
					return value.toString();
				}
			}
			return value;
		},

		/**
		 * Checks whether at least one chart drill down.
		 * @return {boolean} Returns true if chart drills down.
		 */
		isDrilledDown: function() {
			return this.drillDownHistory.length > 1;
		},

		/**
		 * Converts the value that sets the order of sorting to a number if is a numeric type.
		 * @protected
		 * @param xAxis X axis column.
		 * @param {String} orderValue The value sets the order of sorting.
		 * @return {String|Number} The value sets the order of sorting.
		 */
		convertOrderValueToNumber: function(xAxis, orderValue) {
			const dataValueType = Terrasoft.DataValueType;
			const numberDataValueTypes = [
				dataValueType.FLOAT,
				dataValueType.FLOAT1,
				dataValueType.FLOAT2,
				dataValueType.FLOAT3,
				dataValueType.FLOAT4,
				dataValueType.INTEGER,
				dataValueType.MONEY
			];
			if (Terrasoft.contains(numberDataValueTypes, xAxis && xAxis.dataValueType)) {
				orderValue = parseInt(orderValue, 10);
			}
			return orderValue;
		}

	});
});


