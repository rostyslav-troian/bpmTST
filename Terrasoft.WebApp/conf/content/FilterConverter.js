Terrasoft.configuration.Structures["FilterConverter"] = {innerHierarchyStack: ["FilterConverter"]};
define("FilterConverter", ["ServiceHelper"], function(ServiceHelper) {

	/**
	 * Class for filter data conversion.
	 */
	Ext.define("Terrasoft.configuration.FilterConverter", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.FilterConverter",
		singleton: true,

		/**
		 * Sets the property value for the object if new value is defined.
		 * @private
		 * @param {Object} obj Object.
		 * @param {String} propertyName The name of the property.
		 * @param {Number|String|Date|Object} value New value.
		 */
		setPropertyIfValueDefined: function(obj, propertyName, value) {
			if (Ext.isDefined(value)) {
				obj[propertyName] = value;
			}
		},

		/**
		 * Returns client comparison type by server value.
		 * @private
		 * @param {String} serverComparisonType Server comparison type value.
		 * @return {Terrasoft.core.enums.ComparisonType}
		 */
		getComparisonType: function(serverComparisonType) {
			var ComparisonType = Terrasoft.core.enums.ComparisonType;
			switch (serverComparisonType) {
				case "Between":
					return ComparisonType.BETWEEN;
				case "IsNull":
					return ComparisonType.IS_NULL;
				case "IsNotNull":
					return ComparisonType.IS_NOT_NULL;
				case "Equal":
					return ComparisonType.EQUAL;
				case "NotEqual":
					return ComparisonType.NOT_EQUAL;
				case "Less":
					return ComparisonType.LESS;
				case "LessOrEqual":
					return ComparisonType.LESS_OR_EQUAL;
				case "Greater":
					return ComparisonType.GREATER;
				case "GreaterOrEqual":
					return ComparisonType.GREATER_OR_EQUAL;
				case "StartWith":
					return ComparisonType.START_WITH;
				case "NotStartWith":
					return ComparisonType.NOT_START_WITH;
				case "Contain":
					return ComparisonType.CONTAIN;
				case "NotContain":
					return ComparisonType.NOT_CONTAIN;
				case "EndWith":
					return ComparisonType.END_WITH;
				case "NotEndWith":
					return ComparisonType.NOT_END_WITH;
				case "Exists":
					return ComparisonType.EXISTS;
				case "NotExists":
					return ComparisonType.NOT_EXISTS;
				default:
					return ComparisonType.EQUAL;
			}
		},

		/**
		 * Returns client aggregation type by server value.
		 * @private
		 * @param {String} serverAggregationType Server aggregation type value.
		 * @return {Terrasoft.core.enums.AggregationType}
		 */
		getAggregationType: function(serverAggregationType) {
			var AggregationType = Terrasoft.core.enums.AggregationType;
			switch (serverAggregationType) {
				case "None":
					return AggregationType.NONE;
				case "Count":
					return AggregationType.COUNT;
				case "Sum":
					return AggregationType.SUM;
				case "Avg":
					return AggregationType.AVG;
				case "Min":
					return AggregationType.MIN;
				case "Max":
					return AggregationType.MAX;
				default:
					throw new Terrasoft.exceptions.NotImplementedException({
						message: "Converting expression with aggregation type " + serverAggregationType + " " +
							"is not implemented"
					});
			}
		},

		/**
		 * Returns client macros type by server value.
		 * @private
		 * @param {String} serverMacrosType Server macros type value.
		 * @return {Terrasoft.core.enums.QueryMacrosType}
		 */
		getMacrosType: function(serverMacrosType) {
			var MacrosType = Terrasoft.core.enums.QueryMacrosType;
			switch (serverMacrosType) {
				case "None":
					return MacrosType.NONE;
				case "CurrentUser":
					return MacrosType.CURRENT_USER;
				case "CurrentUserContact":
					return MacrosType.CURRENT_USER_CONTACT;
				case "Yesterday":
					return MacrosType.YESTERDAY;
				case "Today":
					return MacrosType.TODAY;
				case "Tomorrow":
					return MacrosType.TOMORROW;
				case "PreviousWeek":
					return MacrosType.PREVIOUS_WEEK;
				case "CurrentWeek":
					return MacrosType.CURRENT_WEEK;
				case "NextWeek":
					return MacrosType.NEXT_WEEK;
				case "PreviousMonth":
					return MacrosType.PREVIOUS_MONTH;
				case "CurrentMonth":
					return MacrosType.CURRENT_MONTH;
				case "NextMonth":
					return MacrosType.NEXT_MONTH;
				case "PreviousQuarter":
					return MacrosType.PREVIOUS_QUARTER;
				case "CurrentQuarter":
					return MacrosType.CURRENT_QUARTER;
				case "NextQuarter":
					return MacrosType.NEXT_QUARTER;
				case "PreviousHalfYear":
					return MacrosType.PREVIOUS_HALF_YEAR;
				case "CurrentHalfYear":
					return MacrosType.PREVIOUS_HALF_YEAR;
				case "NextHalfYear":
					return MacrosType.NEXT_HALF_YEAR;
				case "PreviousYear":
					return MacrosType.PREVIOUS_YEAR;
				case "CurrentYear":
					return MacrosType.CURRENT_YEAR;
				case "PreviousHour":
					return MacrosType.PREVIOUS_HOUR;
				case "CurrentHour":
					return MacrosType.CURRENT_HOUR;
				case "NextHour":
					return MacrosType.NEXT_HOUR;
				case "NextYear":
					return MacrosType.NEXT_YEAR;
				case "NextNDays":
					return MacrosType.NEXT_N_DAYS;
				case "PreviousNDays":
					return MacrosType.PREVIOUS_N_DAYS;
				case "NextNHours":
					return MacrosType.NEXT_N_HOURS;
				case "PreviousNHours":
					return MacrosType.PREVIOUS_N_HOURS;
				case "DayOfYearToday":
					return MacrosType.DAY_OF_YEAR_TODAY;
				case "DayOfYearTodayPlusDaysOffset":
					return MacrosType.DAY_OF_YEAR_TODAY_PLUS_DAYS_OFFSET;
				case "NextNDaysOfYear":
					return MacrosType.NEXT_N_DAYS_OF_YEAR;
				case "PreviousNDaysOfYear":
					return MacrosType.PREVIOUS_N_DAYS_OF_YEAR;
				default:
					throw new Terrasoft.exceptions.NotImplementedException({
						message: "Converting expression with macros type " + serverMacrosType + " " +
							"is not implemented"
					});
			}
		},

		/**
		 * Returns client date part type by server value.
		 * @private
		 * @param {String} serverDatePartType Server date part type.
		 * @return {Terrasoft.core.enums.DatePartType}
		 */
		getDatePartType: function(serverDatePartType) {
			switch (serverDatePartType) {
				case "DayOfMonth":
					return Terrasoft.core.enums.DatePartType.DAY;
				case "DayOfWeek":
					return Terrasoft.core.enums.DatePartType.WEEK_DAY;
				case "Hour":
					return Terrasoft.core.enums.DatePartType.HOUR;
				case "HourMinute":
					return Terrasoft.core.enums.DatePartType.HOUR_MINUTE;
				case "Month":
					return Terrasoft.core.enums.DatePartType.MONTH;
				case "Year":
					return Terrasoft.core.enums.DatePartType.YEAR;
				default:
					return null;
			}
		},

		/**
		 * Returns filter data value type.
		 * @private
		 * @param {Object} serverFilterConfig Server filter config.
		 * @return {*}
		 */
		getFilterDataValueType: function(serverFilterConfig) {
			var expression = serverFilterConfig.leftExpression || serverFilterConfig.rightExpression;
			if (!expression) {
				return null;
			}
			var serverDataValueType = expression.dataValueType;
			if (!serverDataValueType) {
				return null;
			}
			return Terrasoft.core.enums.ServerDataValueType[serverDataValueType.id];
		},

		/**
		 * Indicates whether the server item is include filter.
		 * @private
		 * @param {Object} serverFilterConfig Server filter config.
		 * @return {Boolean}
		 */
		getIsInFilter: function(serverFilterConfig) {
			var dataValueType = this.getFilterDataValueType(serverFilterConfig);
			return (dataValueType === Terrasoft.core.enums.DataValueType.LOOKUP &&
				(!serverFilterConfig.rightExpression || !serverFilterConfig.rightExpression.macrosType));
		},

		/**
		 * Adds new column metaPath mapping.
		 * @private
		 * @param {String} metaPath Column metaPath.
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {String} parentItemKey Parent item key.
		 * @param {Object} obj Object, which property should be updated after metaPath resolving.
		 * @param {String} propertyName Name of the property, which should be updated after metaPath resolving.
		 */
		addColumnPath: function(metaPath, metaPathMapping, parentItemKey, obj, propertyName) {
			var entitySchemaMapping = metaPathMapping[parentItemKey];
			if (!entitySchemaMapping) {
				throw new Terrasoft.exceptions.ItemNotFoundException();
			}
			entitySchemaMapping.columnPaths.push({
				metaPath: metaPath,
				obj: obj,
				propertyName: propertyName
			});
		},

		/**
		 * Returns text parameter expression value.
		 * @private
		 * @param {Object} serverParameterValue Server value config.
		 * @param {String} serverParameterValue.parameterValue Server value.
		 * @return {String}
		 */
		getTextParameterExpressionValue: function(serverParameterValue) {
			if (!serverParameterValue) {
				return null;
			}
			return JSON.parse(Ext.htmlDecode(serverParameterValue.parameterValue));
		},

		/**
		 * Returns dateTime parameter expression value.
		 * @private
		 * @param {Object} serverParameterValue Server value config.
		 * @param {String} serverParameterValue.parameterValue Server value.
		 * @return {DateTime}
		 */
		getDateTimeParameterExpressionValue: function(serverParameterValue) {
			if (!serverParameterValue) {
				return null;
			}
			var parameterValue = serverParameterValue.parameterValue;
			var dateValidateRegexp = /^new Date\([\d,\t ]*\)$/;
			if (parameterValue && !dateValidateRegexp.test(parameterValue)) {
				throw new Terrasoft.exceptions.InvalidFormatException({
					message: "Data parameter value should be a string like 'new Date(2016, 1, 23)'"
				});
			}
			/*jshint evil: true */
			return eval(parameterValue);
			/*jshint evil: false */
		},

		/**
		 * Returns lookup parameter expression value.
		 * @private
		 * @param {Object} serverParameterValue Server value config.
		 * @param {String} serverParameterValue.parameterValue Server value.
		 * @param {String} serverParameterValue.displayValue Server display value.
		 * @return {Object}
		 */
		getLookupParameterExpressionValue: function(serverParameterValue) {
			var value = JSON.parse(Ext.htmlDecode(serverParameterValue.parameterValue));
			var displayValue = JSON.parse(Ext.htmlDecode(serverParameterValue.displayValue));
			return {
				Id: value,
				Name: displayValue,
				value: value,
				displayValue: displayValue
			};
		},

		/**
		 * Returns process mapping parameter expression value.
		 * @private
		 * @param {Object} serverParameterValue Server value config.
		 * @param {String} serverParameterValue.parameterValue Server value.
		 * @param {String} serverParameterValue.displayValue Server display value.
		 * @return {Object}
		 */
		getMappingParameterExpressionValue: function(serverParameterValue) {
			var value = JSON.parse(Ext.htmlDecode(serverParameterValue.parameterValue));
			var displayValue = JSON.parse(Ext.htmlDecode(serverParameterValue.displayValue));
			return {
				value: value,
				displayValue: displayValue,
				Id: Terrasoft.utils.guid.generateGUID()
			};
		},

		/**
		 * Returns parameter expression value.
		 * @private
		 * @param {Object} serverParameterValue Server value config.
		 * @param {Terrasoft.core.enums.DataValueType} dataValueType Data value type.
		 * @return {String|Date|Number|Object}
		 */
		getParameterExpressionValue: function(serverParameterValue, dataValueType) {
			if (!serverParameterValue) {
				return null;
			}
			var DataValueType = Terrasoft.core.enums.DataValueType;
			switch (dataValueType) {
				case DataValueType.LOOKUP:
					return this.getLookupParameterExpressionValue(serverParameterValue);
				case DataValueType.MAPPING:
					return this.getMappingParameterExpressionValue(serverParameterValue);
				case DataValueType.DATE_TIME:
				case DataValueType.DATE:
				case DataValueType.TIME:
					return this.getDateTimeParameterExpressionValue(serverParameterValue);
				default:
					return this.getTextParameterExpressionValue(serverParameterValue);
			}
		},

		/**
		 * Creates column expression.
		 * @private
		 * @param {Object} serverExpressionConfig Server expression config.
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {String} parentItemKey Parent item key.
		 * @return {Terrasoft.ColumnExpression}
		 */
		createColumnExpression: function(serverExpressionConfig, metaPathMapping, parentItemKey) {
			var expression = Ext.create("Terrasoft.ColumnExpression");
			this.addColumnPath(serverExpressionConfig.metaPath, metaPathMapping, parentItemKey, expression,
				"columnPath");
			return expression;
		},

		/**
		 * Creates parameter expression.
		 * @private
		 * @param {Object} serverExpressionConfig Server expression config.
		 * @param {Object} serverParameterValue Server value config.
		 * @return {Terrasoft.ParameterExpression}
		 */
		createParameterExpression: function(serverExpressionConfig, serverParameterValue) {
			var parameterDataType = Terrasoft.core.enums.DataValueType.TEXT;
			var serverDataValueType = serverExpressionConfig.dataValueType;
			if (serverDataValueType) {
				parameterDataType = Terrasoft.core.enums.ServerDataValueType[serverDataValueType.id];
			}
			var parameterValue = this.getParameterExpressionValue(serverParameterValue, parameterDataType);
			var expression = Ext.create("Terrasoft.ParameterExpression", {
				parameterValue: parameterValue,
				parameterDataType: parameterDataType
			});
			return expression;
		},

		/**
		 * Creates aggregation expression.
		 * @private
		 * @param {Object} serverExpressionConfig Server expression config.
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {String} parentItemKey Parent item key.
		 * @param {Object} serverFilterConfig Server filter config.
		 * @return {Terrasoft.AggregationQueryExpression}
		 */
		createAggregationExpression: function(serverExpressionConfig, metaPathMapping, parentItemKey,
				serverFilterConfig) {
			var aggregationType = this.getAggregationType(serverExpressionConfig.aggregationType);
			var subFilters = this.createFilterGroup(serverFilterConfig.subFilters, metaPathMapping);
			var expression = Ext.create("Terrasoft.AggregationQueryExpression", {
				functionType: Terrasoft.core.enums.FunctionType.AGGREGATION,
				aggregationType: aggregationType,
				subFilters: subFilters
			});
			this.addColumnPath(serverExpressionConfig.metaPath, metaPathMapping, parentItemKey, expression,
				"columnPath");
			return expression;
		},

		/**
		 * Creates macros expression.
		 * @private
		 * @param {Object} serverExpressionConfig Server expression config.
		 * @return {Terrasoft.FunctionExpression}
		 */
		createMacrosExpression: function(serverExpressionConfig) {
			var macrosType = this.getMacrosType(serverExpressionConfig.macrosType);
			var expression = Ext.create("Terrasoft.FunctionExpression", {
				functionType: Terrasoft.core.enums.FunctionType.MACROS,
				macrosType: macrosType
			});
			var serverParameterValues = serverExpressionConfig.parameterValues;
			if (serverParameterValues && serverParameterValues.length === 1) {
				expression.functionArgument = this.createParameterExpression(serverExpressionConfig,
					serverParameterValues[0]);
			}
			return expression;
		},

		/**
		 * Creates date part expression.
		 * @private
		 * @param {Object} serverExpressionConfig Server expression config.
		 * @param {Terrasoft.core.enums.DatePartType} datePartType Date part type.
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {String} parentItemKey Parent item key.
		 * @return {Terrasoft.FunctionExpression}
		 */
		createDatePartExpression: function(serverExpressionConfig, datePartType, metaPathMapping, parentItemKey) {
			var functionArgument = Ext.create("Terrasoft.ColumnExpression");
			this.addColumnPath(serverExpressionConfig.metaPath, metaPathMapping, parentItemKey, functionArgument,
				"columnPath");
			var expression = Ext.create("Terrasoft.FunctionExpression", {
				functionType: Terrasoft.core.enums.FunctionType.DATE_PART,
				functionArgument: functionArgument,
				datePartType: datePartType
			});
			return expression;
		},

		/**
		 * Creates process mapping parameter expression.
		 * @private
		 * @param {Object} serverExpressionConfig Server expression config.
		 * @return {Terrasoft.ParameterExpression}
		 */
		createMappingParameterExpression: function(serverExpressionConfig) {
			if (serverExpressionConfig.parameterValues.length !== 2) {
				throw new Terrasoft.exceptions.InvalidFormatException({
					message: "Server mapping parameterValues should have two items"
				});
			}
			var serverParameterValue = serverExpressionConfig.parameterValues[1];
			var parameterDataType = Terrasoft.core.enums.DataValueType.MAPPING;
			var parameterValue = this.getParameterExpressionValue(serverParameterValue, parameterDataType);
			var expression = Ext.create("Terrasoft.ParameterExpression", {
				parameterValue: parameterValue,
				parameterDataType: parameterDataType
			});
			return expression;
		},

		/**
		 * Creates filter expression.
		 * @private
		 * @param {Object} config Expression config.
		 * @param {Object} config.serverExpressionConfig Server expression config.
		 * @param {Object} config.metaPathMapping MetaPath mapping object.
		 * @param {String} config.parentItemKey Parent item key.
		 * @param {Object} config.serverFilterConfig Server filter config.
		 * @return {Terrasoft.data.expressions.BaseExpression}
		 */
		createExpression: function(config) {
			var serverExpressionConfig = config.serverExpressionConfig;
			var metaPathMapping = config.metaPathMapping;
			var parentItemKey = config.parentItemKey;
			var serverExpressionType = serverExpressionConfig.expressionType;
			switch (serverExpressionType) {
				case "SchemaColumn":
					return this.createColumnExpression(serverExpressionConfig, metaPathMapping, parentItemKey);
				case "Function":
				case "Parameter":
					var serverParameterValue;
					if (serverExpressionConfig.parameterValues.length === 1) {
						serverParameterValue = serverExpressionConfig.parameterValues[0];
					} else {
						return null;
					}
					return this.createParameterExpression(serverExpressionConfig, serverParameterValue);
				case "Aggregation":
					return this.createAggregationExpression(serverExpressionConfig, metaPathMapping, parentItemKey,
						config.serverFilterConfig);
				case "Macros":
					return this.createMacrosExpression(serverExpressionConfig);
				case "Exists":
				case "Custom":
					return this.createMappingParameterExpression(serverExpressionConfig);
				default:
					break;
			}
			throw new Terrasoft.exceptions.NotImplementedException({
				message: "Converting expression of type " + serverExpressionType + " is not implemented"
			});
		},

		/**
		 * Creates filter expressions (for lookup filter).
		 * @private
		 * @param {Object} serverExpressionConfig Server expression config.
		 * @return {Terrasoft.data.expressions.ParameterExpression[]}
		 */
		createExpressions: function(serverExpressionConfig) {
			var parameterValues = serverExpressionConfig.parameterValues;
			var expresions = [];
			if (serverExpressionConfig.expressionType === "Custom") {
				expresions.push(this.createMappingParameterExpression(serverExpressionConfig));
				return expresions;
			}
			for (var i = 0, length = parameterValues.length; i < length; i++) {
				var expression = this.createParameterExpression(serverExpressionConfig, parameterValues[i]);
				expresions.push(expression);
			}
			return expresions;
		},

		/**
		 * Creates compare filter.
		 * @private
		 * @param {Object} serverFilterConfig Server filter config.
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {String} parentItemKey Parent item key.
		 * @return {Terrasoft.CompareFilter}
		 */
		createCompareFilter: function(serverFilterConfig, metaPathMapping, parentItemKey) {
			var rightExpression;
			if (serverFilterConfig.rightExpression) {
				rightExpression = this.createExpression({
					serverExpressionConfig: serverFilterConfig.rightExpression,
					metaPathMapping: metaPathMapping,
					parentItemKey: parentItemKey,
					serverFilterConfig: serverFilterConfig
				});
			}
			return Ext.create("Terrasoft.CompareFilter", {
				rightExpression: rightExpression
			});
		},

		/**
		 * Creates include filter.
		 * @private
		 * @param {Object} serverFilterConfig Server filter config.
		 * @return {Terrasoft.InFilter}
		 */
		createInFilter: function(serverFilterConfig) {
			var rightExpressions;
			if (serverFilterConfig.rightExpression) {
				rightExpressions = this.createExpressions(serverFilterConfig.rightExpression);
			}
			return Ext.create("Terrasoft.InFilter", {
				rightExpressions: rightExpressions
			});
		},

		/**
		 * Creates isNull filter.
		 * @private
		 * @param {Boolean} isNull If true, creates isNull filter, otherwise - isNotNull.
		 * @return {Terrasoft.IsNullFilter}
		 */
		createIsNullFilter: function(isNull) {
			return Ext.create("Terrasoft.IsNullFilter", {
				isNull: isNull
			});
		},

		/**
		 * Creates exists filter.
		 * @private
		 * @param {Terrasoft.core.enums.ComparisonType} comparisonType Comparison type.
		 * @param {Object} serverFilterConfig Server filter config.
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {String} parentItemKey Parent item key.
		 * @return {Terrasoft.data.filters.ExistsFilter}
		 */
		createExistsFilter: function(comparisonType, serverFilterConfig, metaPathMapping, parentItemKey) {
			var leftExpression;
			if (serverFilterConfig.rightExpression) {
				leftExpression = this.createColumnExpression(serverFilterConfig.rightExpression, metaPathMapping,
					parentItemKey);
			}
			var subFilters = this.createFilterGroup(serverFilterConfig.subFilters, metaPathMapping);
			var filter = Ext.create("Terrasoft.data.filters.ExistsFilter", {
				leftExpression: leftExpression,
				leftExpressionCaption: serverFilterConfig.rightExpression.caption,
				comparisonType: comparisonType,
				subFilters: subFilters
			});
			return filter;
		},

		/**
		 * Creates date part function filter.
		 * @private
		 * @param {Terrasoft.core.enums.ComparisonType} comparisonType Comparison type.
		 * @param {Object} serverFilterConfig Server filter config.
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {String} parentItemKey Parent item key.
		 * @return {Terrasoft.data.filters.CompareFilter} If server item is datePart type filter, returns new datePart
		 * function compare filter. Otherwise returns null.
		 */
		createDatePartFunctionFilter: function(comparisonType, serverFilterConfig, metaPathMapping, parentItemKey) {
			if (!serverFilterConfig || !serverFilterConfig.rightExpression) {
				return null;
			}
			var datePartType = this.getDatePartType(serverFilterConfig.rightExpression.macrosType);
			if (!datePartType) {
				return null;
			}
			var leftExpression = this.createDatePartExpression(serverFilterConfig.leftExpression, datePartType,
				metaPathMapping, parentItemKey);
			var serverRightExpressionConfig = serverFilterConfig.rightExpression;
			var rightExpression;
			if (serverFilterConfig.rightExpression) {
				var serverParameterValue = null;
				if (serverRightExpressionConfig.parameterValues) {
					serverParameterValue = serverRightExpressionConfig.parameterValues[0];
				}
				rightExpression = this.createParameterExpression(serverFilterConfig.rightExpression,
					serverParameterValue);
			}
			var filter = Ext.create("Terrasoft.data.filters.CompareFilter", {
				leftExpression: leftExpression,
				comparisonType: comparisonType,
				rightExpression: rightExpression
			});
			return filter;
		},

		/**
		 * Creates filter by comparison type.
		 * @private
		 * @param {Terrasoft.core.enums.ComparisonType} comparisonType Comparison type.
		 * @param {Object} serverFilterConfig Server filter config.
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {String} parentItemKey Parent item key.
		 * @return {Terrasoft.data.filters.BaseFilter}
		 */
		createFilterByComparisonType: function(comparisonType, serverFilterConfig, metaPathMapping, parentItemKey) {
			var ComparisonType = Terrasoft.core.enums.ComparisonType;
			var filter = null;
			switch (comparisonType) {
				case ComparisonType.EQUAL:
				case ComparisonType.NOT_EQUAL:
				case ComparisonType.LESS:
				case ComparisonType.LESS_OR_EQUAL:
				case ComparisonType.GREATER:
				case ComparisonType.GREATER_OR_EQUAL:
				case ComparisonType.START_WITH:
				case ComparisonType.NOT_START_WITH:
				case ComparisonType.CONTAIN:
				case ComparisonType.NOT_CONTAIN:
				case ComparisonType.END_WITH:
				case ComparisonType.NOT_END_WITH:
					if (this.getIsInFilter(serverFilterConfig)) {
						filter = this.createInFilter(serverFilterConfig);
					} else {
						filter = this.createCompareFilter(serverFilterConfig, metaPathMapping, parentItemKey);
					}
					break;
				case ComparisonType.IS_NULL:
					filter = this.createIsNullFilter(true);
					break;
				case ComparisonType.IS_NOT_NULL:
					filter = this.createIsNullFilter(false);
					break;
				case ComparisonType.EXISTS:
				case ComparisonType.NOT_EXISTS:
					filter = this.createExistsFilter(comparisonType, serverFilterConfig, metaPathMapping,
						parentItemKey);
					break;
				default:
					throw new Terrasoft.exceptions.NotImplementedException({
						message: "Converting filter with comparisonType " + comparisonType + " is not implemented"
					});
			}
			return filter;
		},

		/**
		 * Creates filter.
		 * @private
		 * @param {Object} serverFilterConfig Server filter config.
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {String} parentItemKey Parent item key.
		 * @return {Terrasoft.data.filters.BaseFilter}
		 */
		createFilter: function(serverFilterConfig, metaPathMapping, parentItemKey) {
			var comparisonType = this.getComparisonType(serverFilterConfig.comparisonType);
			var filter = this.createDatePartFunctionFilter(comparisonType, serverFilterConfig, metaPathMapping,
				parentItemKey);
			if (!filter) {
				filter = this.createFilterByComparisonType(comparisonType, serverFilterConfig, metaPathMapping,
					parentItemKey);
			}
			if (!filter) {
				throw new Terrasoft.exceptions.NotImplementedException({
					message: "Current filter conversion is not implemented"
				});
			}
			filter.comparisonType = comparisonType;
			if (!filter.leftExpression && serverFilterConfig.leftExpression) {
				filter.leftExpression = this.createExpression({
					serverExpressionConfig: serverFilterConfig.leftExpression,
					metaPathMapping: metaPathMapping,
					parentItemKey: parentItemKey,
					serverFilterConfig: serverFilterConfig
				});
			}
			if (!filter.leftExpressionCaption && serverFilterConfig.leftExpression) {
				filter.leftExpressionCaption = serverFilterConfig.leftExpression.caption;
			}
			if (filter.leftExpression && filter.leftExpression.aggregationType) {
				filter.isAggregative = true;
			}
			var dataValueType = this.getFilterDataValueType(serverFilterConfig);
			this.setPropertyIfValueDefined(filter, "dataValueType", dataValueType);
			this.setPropertyIfValueDefined(filter, "isEnabled", serverFilterConfig.isEnabled);
			this.setPropertyIfValueDefined(filter, "trimDateTimeParameterToDate",
				serverFilterConfig.trimDateTimeParameterToDate);
			return filter;
		},

		/**
		 * Creates filter group.
		 * @private
		 * @param {Object} serverItemConfig Server item config.
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @return {Terrasoft.FilterGroup}
		 */
		createFilterGroup: function(serverItemConfig, metaPathMapping) {
			var key = serverItemConfig.uId || Terrasoft.utils.guid.generateGUID();
			var filterGroup = Ext.create("Terrasoft.FilterGroup", {
				key: key
			});
			var serverFilterConfigs = serverItemConfig.items;
			var rootSchemaUId, filter;
			for (var i = 0; i < serverFilterConfigs.length; i++) {
				var serverFilterConfig = serverFilterConfigs[i];
				if (!serverFilterConfig._isFilter) {
					filter = this.createFilterGroup(serverFilterConfig, metaPathMapping);
					filterGroup.add(serverFilterConfig.uId, filter);
					continue;
				}
				rootSchemaUId = serverFilterConfig._filterSchemaUId;
				if (rootSchemaUId && !metaPathMapping[key]) {
					metaPathMapping[key] = {
						rootSchemaUId: rootSchemaUId,
						obj: filterGroup,
						propertyName: "rootSchemaName",
						columnPaths: []
					};
				}
				filter = this.createFilter(serverFilterConfig, metaPathMapping, key);
				filterGroup.add(serverFilterConfig.uId, filter);
			}
			if (serverItemConfig.logicalOperation) {
				filterGroup.logicalOperation = (serverItemConfig.logicalOperation === "Or")
					? Terrasoft.core.enums.LogicalOperatorType.OR
					: Terrasoft.core.enums.LogicalOperatorType.AND;
			}
			return filterGroup;
		},

		/**
		 * Requests column paths and entity schema names by metaPath values. Puts received data into rootSchemaName and
		 * columnPath properties of metaPathMapping object.
		 * @private
		 * @param {[{Key: String, Value: String[]}]} columnMetaPathKeyValues Key-value object, where key is uid of
		 * entity schema and value is array of this schema's column meta paths.
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {Function} callback Callback function.
		 */
		requestColumnPaths: function(columnMetaPathKeyValues, metaPathMapping, callback) {
			ServiceHelper.callService({
				serviceName: "EntityUtilsService",
				methodName: "GetColumnPathsAndEntityNames",
				data: {columnMetaPaths: columnMetaPathKeyValues},
				callback: function(response, success) {
					if (!success || !response) {
						callback();
						return;
					}
					var resolvedPaths = response.columnPaths.reduce(function(previousValue, currentValue) {
						previousValue[currentValue.Key] = currentValue.Value;
						return previousValue;
					}, {});
					for (var groupKey in metaPathMapping) {
						if (!metaPathMapping.hasOwnProperty(groupKey)) {
							continue;
						}
						var groupMapping = metaPathMapping[groupKey];
						groupMapping.rootSchemaName = resolvedPaths[groupMapping.rootSchemaUId];
						var columnPaths = groupMapping.columnPaths;
						for (var i = 0, length = columnPaths.length; i < length; i++) {
							var columnMapping = columnPaths[i];
							columnMapping.columnPath = resolvedPaths[columnMapping.metaPath];
						}
					}
					callback();
				}
			});
		},

		/**
		 * Resolves column paths and entity schema names by metaPath.
		 * @private
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {Function} callback Callback function.
		 */
		resolveEntitySchemaMetaPaths: function(metaPathMapping, callback) {
			var columnMetaPathsKeyValues = [];
			for (var groupKey in metaPathMapping) {
				if (!metaPathMapping.hasOwnProperty(groupKey)) {
					continue;
				}
				var groupMapping = metaPathMapping[groupKey];
				var key = groupMapping.rootSchemaUId;
				var value = [];
				var columnPaths = groupMapping.columnPaths;
				for (var i = 0, length = columnPaths.length; i < length; i++) {
					var columnMapping = columnPaths[i];
					value.push(columnMapping.metaPath);
				}
				var existingItem = Terrasoft.utils.array.findWhere(columnMetaPathsKeyValues, {Key: key});
				if (existingItem) {
					existingItem.Value = existingItem.Value.concat(value);
				} else {
					columnMetaPathsKeyValues.push({
						Key: key,
						Value: value
					});
				}
			}
			this.requestColumnPaths(columnMetaPathsKeyValues, metaPathMapping, callback);
		},

		/**
		 * Updates filter schema name and columnPath properties.
		 * @private
		 * @param {Object} metaPathMapping MetaPath mapping object.
		 * @param {Function} callback Callback function.
		 */
		fillColumnPaths: function(metaPathMapping, callback) {
			this.resolveEntitySchemaMetaPaths(metaPathMapping, function() {
				for (var groupKey in metaPathMapping) {
					if (!metaPathMapping.hasOwnProperty(groupKey)) {
						continue;
					}
					var groupMapping = metaPathMapping[groupKey];
					groupMapping.obj[groupMapping.propertyName] = groupMapping.rootSchemaName;
					var columnPaths = groupMapping.columnPaths;
					for (var i = 0, length = columnPaths.length; i < length; i++) {
						var columnMapping = columnPaths[i];
						columnMapping.obj[columnMapping.propertyName] = columnMapping.columnPath;
					}
				}
				callback();
			});
		},

		/**
		 * Deserializes server filter edit data into client instance.
		 * @param {String} dataSourceFilterCollectionData Server dataSource filter collection data.
		 * @param {Function} callback Callback function.
		 * @param {Terrasoft.FilterGroup} callback.filterEditData Filter edit data.
		 * @param {Object} [callback.error] Error object, if conversion failed.
		 */
		deserializeFilterEditData: function(dataSourceFilterCollectionData, callback) {
			if (!dataSourceFilterCollectionData) {
				callback({filterEditData: Ext.create("Terrasoft.FilterGroup")});
				return;
			}
			var dataSourceFilterCollection;
			try {
				dataSourceFilterCollection = Ext.global.JSON5.parse(dataSourceFilterCollectionData);
			} catch (e) {
				callback({error: e});
				return;
			}
			var metaPathMapping = {};
			var filterGroup = this.createFilterGroup(dataSourceFilterCollection, metaPathMapping);
			this.fillColumnPaths(metaPathMapping, function() {
				callback({filterEditData: filterGroup});
			});
		}
	});

	return Terrasoft.FilterConverter;
});


