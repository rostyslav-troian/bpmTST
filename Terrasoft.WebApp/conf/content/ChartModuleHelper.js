Terrasoft.configuration.Structures["ChartModuleHelper"] = {innerHierarchyStack: ["ChartModuleHelper"]};
define("ChartModuleHelper", ["ChartModuleHelperResources", "DashboardEnums"], function(resources) {

	/**
	 * @class Terrasoft.configuration.ChartModuleHelper
	 * Class of chart module helper.
	 */
	Ext.define("Terrasoft.configuration.ChartModuleHelper", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ChartModuleHelper",

		//region Properties: Public

		/**
		 * Chart series kind.
		 * @type {Object}
		 */
		ChartSeriesKind: null,

		//endregion

		//region Methods: Private

		/**
		 * Returns aggregation eval type.
		 * @param {Number} funcType Type of aggregation function.
		 * @return {Terrasoft.AggregationEvalType} Aggregation eval type.
		 */
		addEvalTypeToAggregationFunc: function(funcType) {
			return funcType === Terrasoft.AggregationType.COUNT
				? Terrasoft.AggregationEvalType.DISTINCT
				: Terrasoft.AggregationEvalType.NONE;
		},

		/**
		 * @private
		 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
		 * @param {String} columnName Column name.
		 * @param {Number} direction Order direction.
		 * @param {Number} position Order position.
		 */
		addOrderByProperties: function(esq, columnName, direction, position) {
			var column = esq.columns.find(columnName);
			if (!column) {
				column = esq.addColumn(columnName);
			}
			column.orderDirection = direction;
			column.orderPosition = position;
		},

		/**
		 * @private
		 * @param {Array} formats Date time formats.
		 * @return {Array} Ordered date time formats.
		 */
		sortDateTimeFormats: function(formats) {
			var allSortedFormats = ["Year", "Month", "Week", "Day", "Hour"];
			return allSortedFormats.filter(function(format) {
				return Terrasoft.contains(formats, format);
			}, this);
		},

		//endregion

		//region Methods: Protected

		/**
		 * Adds ordered column to query.
		 * @param {Object} config Configuration object.
		 */
		addOrderBy: function(config) {
			var orderByConfig = config.orderBy;
			if (orderByConfig) {
				switch (orderByConfig.chartOrderType) {
					case Terrasoft.DashboardEnums.ChartOrderBy.GROUP_BY_FIELD:
						if (Terrasoft.isDateDataValueType(config.xAxis.dataValueType)) {
							var formats = this.sortDateTimeFormats(config.xAxis.dateTimeFormat);
							Terrasoft.each(formats, function(format, position) {
								this.addOrderByProperties(config.entitySchemaQuery, format, orderByConfig.direction,
									position);
							}, this);
						} else {
							this.addOrderByProperties(config.entitySchemaQuery, "xAxis", orderByConfig.direction, 0);
						}
						break;
					case Terrasoft.DashboardEnums.ChartOrderBy.CHART_ENTITY_COLUMN:
						this.addOrderByProperties(config.entitySchemaQuery, "yAxis", orderByConfig.direction, 0);
						break;
					case Terrasoft.DashboardEnums.ChartOrderBy.CUSTOM_COLUMN:
						this.addOrderByProperties(config.entitySchemaQuery, orderByConfig.orderColumn,
							orderByConfig.direction, 0);
						break;
					default:
						break;
				}
			}
		},

		/**
		 * Adds grouped column to query.
		 * @protected
		 * @virtual
		 * @param {Object} config Configuration object.
		 * @param {Terrasoft.EntitySchemaQuery} config.entitySchemaQuery Data query for chart.
		 * @param {String} config.xAxis.column X-axis column.
		 * @param {String} config.xAxis.dataValueType X-axis column data type.
		 * @param {String} config.xAxis.dateTimeFormat X-axis column date format.
		 * @param {String} config.order.by Ordered field.
		 * @param {String} config.order.direction Order direction.
		 */
		addGroupColumn: function(config) {
			var groupByColumns = [];
			var entitySchemaQuery = config.entitySchemaQuery;
			var xAxisColumn = config.xAxis.column;
			var xAxisColumnDataValueType = config.xAxis.dataValueType;
			if (!Terrasoft.isDateDataValueType(xAxisColumnDataValueType)) {
				groupByColumns.push(entitySchemaQuery.addColumn(xAxisColumn, "xAxis"));
			} else {
				var datePartOrderSequence = ["Year", "Month", "Week", "Day", "Hour"];
				var xAxisColumnDateTimeFormat = config.xAxis.dateTimeFormat;
				Terrasoft.each(datePartOrderSequence, function(datePart) {
					if (Terrasoft.contains(xAxisColumnDateTimeFormat, datePart)) {
						var datePartType = this.getDatePartType(datePart);
						groupByColumns.push(
							entitySchemaQuery.addDatePartFunctionColumn(xAxisColumn, datePartType, datePart));
					}
				}, this);
			}
		},

		/**
		 * Adds aggregation column to query.
		 * @protected
		 * @virtual
		 * @param {Object} config Configuration object.
		 * @param {Terrasoft.EntitySchemaQuery} config.entitySchemaQuery Data query for chart.
		 * @param {String} config.func Aggregation function name.
		 * @param {String} config.yAxis.column Y-axis column.
		 * @param {String} config.order.by Ordered field.
		 * @param {String} config.order.direction Order direction.
		 */
		addAggregationColumn: function(config) {
			var entitySchemaQuery = config.entitySchemaQuery;
			var aggregationType = config.func;
			var aggregationColumnName = config.yAxis.column;
			var aggregationFuncEvalType = this.addEvalTypeToAggregationFunc(aggregationType);
			entitySchemaQuery.addAggregationSchemaColumn(aggregationColumnName, aggregationType, "yAxis",
				aggregationFuncEvalType);
		},

		/**
		 * Adds drill down filters to query.
		 * @protected
		 * @virtual
		 * @param {Terrasoft.EntitySchemaQuery} entitySchemaQuery Data query for chart.
		 * @param {Terrasoft.BaseFilter} filters Drill down filters.
		 */
		addDrillDownFilters: function(entitySchemaQuery, filters) {
			Terrasoft.each(filters, function(filter, columnName) {
				if (!filter.datePart) {
					if (filter.isNull) {
						var nullFilter = Terrasoft.createColumnIsNullFilter(columnName);
						entitySchemaQuery.filters.addItem(nullFilter);
					} else {
						var filterValue = filter && (filter.value || filter);
						var esqfilter = Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, columnName, filterValue);
						entitySchemaQuery.filters.addItem(esqfilter);
					}
				} else {
					Terrasoft.each(filter.datePart, function(value, name) {
						var datePartType = this.getDatePartType(name);
						var esqfilter = Terrasoft.createDatePartColumnFilter(
							Terrasoft.ComparisonType.EQUAL, columnName, datePartType, value);
						entitySchemaQuery.filters.addItem(esqfilter);
					}, this);
				}
			}, this);
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			var localizableStrings = resources.localizableStrings;
			var localizableImages = resources.localizableImages;
			this.ChartSeriesKind = {
				spline: {
					value: "spline",
					displayValue: localizableStrings.SplineCaption,
					imageConfig: localizableImages.SplineImage
				},
				line:  {
					value: "line",
					displayValue: localizableStrings.LineCaption,
					imageConfig: localizableImages.LineImage
				},
				bar:  {
					value: "bar",
					displayValue: localizableStrings.BarCaption,
					imageConfig: localizableImages.BarImage
				},
				pie:  {
					value: "pie",
					displayValue: localizableStrings.PieCaption,
					imageConfig: localizableImages.PieImage
				},
				areaspline:  {
					value: "areaspline",
					displayValue: localizableStrings.AreasplineCaption,
					imageConfig: localizableImages.AreasplineImage
				},
				funnel:  {
					value: "funnel",
					displayValue: localizableStrings.FunnelCaption,
					imageConfig: localizableImages.FunnelImage
				},
				column:  {
					value: "column",
					displayValue: localizableStrings.ColumnCaption,
					imageConfig: localizableImages.ColumnImage
				},
				scatter:  {
					value: "scatter",
					displayValue: localizableStrings.ScatterCaption,
					imageConfig: localizableImages.ScatterImage
				}
			};
		},

		/**
		 * Returns chart type.
		 * @param {String} kind Kind of chart.
		 * @return {String} Chart type.
		 */
		getChartType: function(kind) {
			switch (kind) {
				case "0":
					return "area";
				case "1":
					return "line";
				case "2":
					return "bar";
				case "3":
					return "pie";
				case "4":
					return "column";
				case "5":
					return "scatter";
				default:
					return "line";
			}
		},

		/**
		 * Returns aggregation function type.
		 * @param {String} name Function name.
		 * @return {Terrasoft.AggregationType} Aggregation function type.
		 */
		getAggregationType: function(name) {
			switch (name) {
				case "Count":
					return Terrasoft.AggregationType.COUNT;
				case "Max":
					return Terrasoft.AggregationType.MAX;
				case "Min":
					return Terrasoft.AggregationType.MIN;
				case "Avg":
					return Terrasoft.AggregationType.AVG;
				case "Sum":
					return Terrasoft.AggregationType.SUM;
			}
			return Terrasoft.AggregationType.NONE;
		},

		/**
		 * Returns date part value.
		 * @param {String} name String date part value.
		 * @return {Terrasoft.DatePartType} Date part value.
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
				case "Hour":
					return Terrasoft.DatePartType.HOUR;
			}
			return Terrasoft.DatePartType.NONE;
		},

		/**
		 * Adds filters to query.
		 * @param {Object} config Configuration object.
		 * @param {Terrasoft.EntitySchemaQuery} config.entitySchemaQuery Data query for chart.
		 * @param {String} config.xAxis.column X-axis column.
		 * @param {Terrasoft.BaseFilter} config.filters.quickFilters Quick section filter.
		 * @param {Terrasoft.BaseFilter} config.filters.chartFilters Chart filters.
		 * @param {Terrasoft.BaseFilter} config.filters.serializedFilters Serialized filters.
		 * @param {Terrasoft.BaseFilter} config.filters.drillDownFilters Drill down filter.
		 */
		addFilters: function(config) {
			var entitySchemaQuery = config.entitySchemaQuery;
			var filters = config.filters;
			var quickFilters = filters.quickFilters;
			var entitySchemaQueryFilters = entitySchemaQuery.filters;
			if (quickFilters && !quickFilters.isEmpty()) {
				entitySchemaQueryFilters.add("quickFilters", quickFilters);
			}
			var chartFilters = filters.chartFilters;
			if (chartFilters && !chartFilters.isEmpty()) {
				entitySchemaQueryFilters.add("chartFilters", chartFilters);
			}
			var serializedFilters = filters.serializedFilters;
			if (serializedFilters && !serializedFilters.isEmpty()) {
				entitySchemaQueryFilters.add("serializedFilters", serializedFilters);
			}
			var columnIsNotNullFilters = filters.columnIsNotNullFilters;
			if (columnIsNotNullFilters) {
				entitySchemaQueryFilters.add("columnIsNotNullFilter", columnIsNotNullFilters);
			}
			this.addDrillDownFilters(entitySchemaQuery, filters.drillDownFilters);
		},

		/**
		 * Returns data query of chart series.
		 * @param {Object} config Configuration object.
		 * @param {String} config.entitySchemaName Entity schema name.
		 * @param {String} config.func Aggregation function name.
		 * @param {Object} config.xAxis X-axis column options.
		 * @param {String} config.xAxis.column X-axis column.
		 * @param {Terrasoft.DataValueType} config.xAxis.dataValueType X-axis column data type.
		 * @param {String[]} config.xAxis.dateTimeFormat X-axis column dateTime format.
		 * @param {String} config.yAxis.column Y-axis column.
		 * @param {Object} config.filters Filter options.
		 * @param {Terrasoft.BaseFilter} config.filters.quickFilters Quick section filters.
		 * @param {Terrasoft.BaseFilter} config.filters.chartFilters Chart filters.
		 * @param {Terrasoft.BaseFilter} config.filters.serializedFilters Serialized filters.
		 * @param {Terrasoft.BaseFilter} config.filters.drillDownFilters Drill down filters.
		 * @return {Terrasoft.EntitySchemaQuery} Data query for chart.
		 */
		getSeriesQuery: function(config) {
			var entitySchemaName = config.entitySchemaName;
			if (!entitySchemaName) {
				return null;
			}
			var entitySchemaQuery = config.entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: entitySchemaName,
				queryKind: Terrasoft.QueryKind.LIMITED
			});
			this.addGroupColumn(config);
			this.addAggregationColumn(config);
			this.addFilters(config);
			this.addOrderBy(config);
			return entitySchemaQuery;
		}

		//endregion
	});

	return Ext.create("Terrasoft.ChartModuleHelper");
});


