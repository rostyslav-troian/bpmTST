Ext.ns("Terrasoft.data.filters.FilterUtils.FilterUtils");

/**
 * @singleton
 */

/**
 * Creates a new instance of the filter group
 * @return {Terrasoft.FilterGroup} Collection of filters
 */
Terrasoft.data.filters.FilterUtils.createFilterGroup = function() {
	return Ext.create("Terrasoft.FilterGroup");
};
/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createFilterGroup}
 * @member Terrasoft
 * @method createFilterGroup
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createFilterGroup
 */
Terrasoft.createFilterGroup = Terrasoft.data.filters.FilterUtils.createFilterGroup;

/**
 * Creates a Compare-Filter instance
 * @param {Terrasoft.ComparisonType} comparisonType Type of comparison operation
 * @param {Terrasoft.BaseExpression} leftExpression Expression to check in the filter
 * @param {Terrasoft.BaseExpression} rightExpression Filter expression
 * @return {Terrasoft.CompareFilter} Returns the created filter object
 */
Terrasoft.data.filters.FilterUtils.createCompareFilter = function(comparisonType, leftExpression, rightExpression) {
	return Ext.create("Terrasoft.CompareFilter", {
		comparisonType: comparisonType,
		leftExpression: leftExpression,
		rightExpression: rightExpression
	});
};
/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createCompareFilter}
 * @member Terrasoft
 * @method createCompareFilter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createCompareFilter
 */
Terrasoft.createCompareFilter = Terrasoft.data.filters.FilterUtils.createCompareFilter;

/**
 * Creates an instance of the Between-Filter
 * @param {Terrasoft.BaseExpression} leftExpression Expression to check in the filter
 * @param {Terrasoft.BaseExpression} rightLessExpression The initial expression of the filtering range
 * @param {Terrasoft.BaseExpression} rightGreaterExpression The final expression of the filtering range
 * @return {Terrasoft.CompareFilter} Returns the created filter object
 */
Terrasoft.data.filters.FilterUtils.createBetweenFilter =
	function(leftExpression, rightLessExpression, rightGreaterExpression) {
		return Ext.create("Terrasoft.BetweenFilter", {
			leftExpression: leftExpression,
			rightLessExpression: rightLessExpression,
			rightGreaterExpression: rightGreaterExpression
		});
	};
/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createBetweenFilter}
 * @member Terrasoft
 * @method createBetweenFilter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createBetweenFilter
 */
Terrasoft.createBetweenFilter = Terrasoft.data.filters.FilterUtils.createBetweenFilter;

/**
 * Creates an IsNull filter instance
 * @param {Terrasoft.BaseExpression} leftExpression The expression to be checked for being "empty"
 * @return {Terrasoft.IsNullFilter} Returns the created filter object
 */
Terrasoft.data.filters.FilterUtils.createIsNullFilter = function(leftExpression) {
	return Ext.create("Terrasoft.IsNullFilter", {
		leftExpression: leftExpression,
		comparisonType: Terrasoft.ComparisonType.IS_NULL,
		isNull: true
	});
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createIsNullFilter}
 * @member Terrasoft
 * @method createIsNullFilter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createIsNullFilter
 */
Terrasoft.createIsNullFilter = Terrasoft.data.filters.FilterUtils.createIsNullFilter;

/**
 * Creates an IsNull filter instance
 * @param {Terrasoft.BaseExpression} leftExpression The expression to be checked for "not empty"
 * @return {Terrasoft.IsNullFilter} Returns the created filter object
 */
Terrasoft.data.filters.FilterUtils.createIsNotNullFilter = function(leftExpression) {
	return Ext.create("Terrasoft.IsNullFilter", {
		leftExpression: leftExpression,
		comparisonType: Terrasoft.ComparisonType.IS_NOT_NULL,
		isNull: false
	});
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createIsNotNullFilter}
 * @member Terrasoft
 * @method createIsNotNullFilter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createIsNotNullFilter
 */
Terrasoft.createIsNotNullFilter = Terrasoft.data.filters.FilterUtils.createIsNotNullFilter;

/**
 * Creates an instance of an "In" Filter
 * @param {Terrasoft.BaseExpression} leftExpression Expression to check in the filter
 * @param {Terrasoft.BaseExpression[]} rightExpressions An array of expressions,
 * which will be compared with leftExpression
 * @return {Terrasoft.FilterGroup} Returns the created filter object
 */
Terrasoft.data.filters.FilterUtils.createInFilter = function(leftExpression, rightExpressions) {
	return Ext.create("Terrasoft.InFilter", {
		leftExpression: leftExpression,
		rightExpressions: rightExpressions
	});
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createInFilter}
 * @member Terrasoft
 * @method createInFilter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createInFilter
 */
Terrasoft.createInFilter = Terrasoft.data.filters.FilterUtils.createInFilter;

/**
 * Creates a Compare-Filter instance for comparing the values of two columns
 * @param {Terrasoft.ComparisonType} comparisonType Type of comparison operation
 * @param {String} leftColumnPath The path to the checked column relative to the rootSchema root schema
 * @param {String} rightColumnPath The path to the filter column relative to the rootSchema root schema
 * @return {Terrasoft.CompareFilter} Returns the created filter object
 */
Terrasoft.data.filters.FilterUtils.createFilter = function(comparisonType, leftColumnPath, rightColumnPath) {
	var leftExpression = Ext.create("Terrasoft.ColumnExpression", {
		columnPath: leftColumnPath
	});
	var rightExpression = Ext.create("Terrasoft.ColumnExpression", {
		columnPath: rightColumnPath
	});
	return Terrasoft.createCompareFilter(comparisonType, leftExpression, rightExpression);
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createFilter}
 * @member Terrasoft
 * @method createFilter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createFilter
 */
Terrasoft.createFilter = Terrasoft.data.filters.FilterUtils.createFilter;

/**
 * Creates a Compare-Filter instance to compare the column with the specified value.
 * @param {Terrasoft.ComparisonType} comparisonType The type of comparison operation. Default: EQUAL
 * @param {String} columnPath The path to the column to be checked relative to the rootSchema root.
 * @param {Mixed} paramValue The value of the filter.
 * @param {Terrasoft.DataValueType} [paramDataType] The type of the parameter value.
 * @return {Terrasoft.CompareFilter} Returns the created filter object.
 * Examples:
 *
 * Terrasoft.createColumnFilterWithParameter("Column1", "Value_1")
 * Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.GREATER, "Column1", 5)
 *
 */
Terrasoft.data.filters.FilterUtils.createColumnFilterWithParameter =
	function(comparisonType, columnPath, paramValue, paramDataType) {
		if (Ext.isString(comparisonType)) {
			paramDataType = paramValue;
			paramValue = columnPath;
			columnPath = comparisonType;
			comparisonType = Terrasoft.ComparisonType.EQUAL;
		}
		var leftExpression = Ext.create("Terrasoft.ColumnExpression", {
			columnPath: columnPath
		});
		var rightExpression = Ext.create("Terrasoft.ParameterExpression", {
			parameterValue: paramValue,
			parameterDataType: paramDataType
		});
		return Terrasoft.createCompareFilter(comparisonType, leftExpression, rightExpression);
	};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createColumnFilterWithParameter}
 * @member Terrasoft
 * @method createColumnFilterWithParameter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createColumnFilterWithParameter
 */
Terrasoft.createColumnFilterWithParameter = Terrasoft.data.filters.FilterUtils.createColumnFilterWithParameter;

/**
 * Creates a filter object to compare the primary display column with the value of the parameter.
 * @param {Terrasoft.ComparisonType} comparisonType Type of comparison.
 * @param {Mixed} paramValue Parameter value.
 * @param {Terrasoft.DataValueType} paramDataType Type of parameter value.
 * @return {Terrasoft.CompareFilter} Returns the object of the created filter.
 */
Terrasoft.data.filters.FilterUtils.createPrimaryDisplayColumnFilterWithParameter =
	function(comparisonType, paramValue, paramDataType) {
		var leftExpression = Ext.create("Terrasoft.FunctionExpression", {
			functionType: Terrasoft.FunctionType.MACROS,
			macrosType: Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN
		});
		var rightExpression = Ext.create("Terrasoft.ParameterExpression", {
			parameterValue: paramValue,
			parameterDataType: paramDataType
		});
		return Terrasoft.createCompareFilter(comparisonType, leftExpression, rightExpression);
	};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createPrimaryDisplayColumnFilterWithParameter}
 * @member Terrasoft
 * @method createPrimaryDisplayColumnFilterWithParameter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createPrimaryDisplayColumnFilterWithParameter
 */
Terrasoft.createPrimaryDisplayColumnFilterWithParameter =
	Terrasoft.data.filters.FilterUtils.createPrimaryDisplayColumnFilterWithParameter;

/**
 * Creates an instance of the Between-Filter to check whether the column hits the specified range.
 * @param {String} columnPath The path to the column to be checked relative to the rootSchema root.
 * @param {Mixed} lessParamValue The initial value of the filter.
 * @param {Mixed} greaterParamValue The final value of the filter.
 * @param {Terrasoft.DataValueType} paramDataType The type of the parameter value.
 * @return {Terrasoft.BetweenFilter} Returns the created filter object.
 */
Terrasoft.data.filters.FilterUtils.createColumnBetweenFilterWithParameters =
	function(columnPath, lessParamValue, greaterParamValue, paramDataType) {
		var leftExpression = Ext.create("Terrasoft.ColumnExpression", {
			columnPath: columnPath
		});
		var rightLessExpression = Ext.create("Terrasoft.ParameterExpression", {
			parameterValue: lessParamValue,
			parameterDataType: paramDataType
		});
		var rightGreaterExpression = Ext.create("Terrasoft.ParameterExpression", {
			parameterValue: greaterParamValue,
			parameterDataType: paramDataType
		});
		return Terrasoft.createBetweenFilter(leftExpression, rightLessExpression, rightGreaterExpression);
	};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createColumnBetweenFilterWithParameters}
 * @member Terrasoft
 * @method createColumnBetweenFilterWithParameters
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createColumnBetweenFilterWithParameters
 */
Terrasoft.createColumnBetweenFilterWithParameters =
	Terrasoft.data.filters.FilterUtils.createColumnBetweenFilterWithParameters;

/**
 * Creates an IsNull filter instance to test the specified column
 * @param {String} columnPath The path to the checked column relative to the rootSchema root schema
 * @return {Terrasoft.IsNullFilter} Returns the created filter object
 */
Terrasoft.data.filters.FilterUtils.createColumnIsNullFilter = function(columnPath) {
	var leftExpression = Ext.create("Terrasoft.ColumnExpression", {
		columnPath: columnPath
	});
	return Terrasoft.createIsNullFilter(leftExpression);
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createColumnIsNullFilter}
 * @member Terrasoft
 * @method createColumnIsNullFilter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createColumnIsNullFilter
 */
Terrasoft.createColumnIsNullFilter = Terrasoft.data.filters.FilterUtils.createColumnIsNullFilter;

/**
 * Creates an IsNull filter instance to test the specified column
 * @param {String} columnPath The path to the checked column relative to the rootSchema root schema
 * @return {Terrasoft.IsNullFilter} Returns the created filter object
 */
Terrasoft.data.filters.FilterUtils.createColumnIsNotNullFilter = function(columnPath) {
	var leftExpression = Ext.create("Terrasoft.ColumnExpression", {
		columnPath: columnPath
	});
	return Terrasoft.createIsNotNullFilter(leftExpression);
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createColumnIsNotNullFilter}
 * @member Terrasoft
 * @method createColumnIsNotNullFilter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createColumnIsNotNullFilter
 */
Terrasoft.createColumnIsNotNullFilter = Terrasoft.data.filters.FilterUtils.createColumnIsNotNullFilter;

/**
 * Creates an In-filter instance to verify that the value of the specified column matches the value of one
 * of the parameters.
 * @throws {Terrasoft.UnsupportedTypeException}
 * If parameterValues is not an array, an exception is thrown.
 * @param {String} columnPath The path to the column to be checked relative to the rootSchema root.
 * @param {Array} parameterValues An array of parameter values.
 * @param {Terrasoft.DataValueType} paramDataType The type of the parameter value.
 * @return {Terrasoft.FilterGroup} Returns the created filter object.
 */
Terrasoft.data.filters.FilterUtils.createColumnInFilterWithParameters =
	function(columnPath, parameterValues, paramDataType) {
		if (!Ext.isArray(parameterValues)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		var leftExpression = Ext.create("Terrasoft.ColumnExpression", {
			columnPath: columnPath
		});
		var rightExpressions = [];
		Terrasoft.each(parameterValues, function(parameterValue) {
			var expression = Ext.create("Terrasoft.ParameterExpression", {
				parameterValue: parameterValue,
				parameterDataType: paramDataType
			});
			rightExpressions.push(expression);
		});
		return Terrasoft.createInFilter(leftExpression, rightExpressions);
	};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createColumnInFilterWithParameters}
 * @member Terrasoft
 * @method createColumnInFilterWithParameters
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createColumnInFilterWithParameters
 */
Terrasoft.createColumnInFilterWithParameters = Terrasoft.data.filters.FilterUtils.createColumnInFilterWithParameters;

/**
 * Creates an instance of the Exists filter for the type comparison [Exists according to the specified condition] and
 * sets as the test value the expression of the column located along the specified path
 * @param {String} columnPath The path to the column for which the filter is built
 * @param {Terrasoft.FilterGroup} subFilters (Optional) Subquery filters
 * @return {Terrasoft.ExistsFilter} Returns the created filter object
 * @throws {@link Terrasoft.ArgumentNullOrEmptyException}
 * An exception is thrown if no transfer is made columnPath.
 */
Terrasoft.data.filters.FilterUtils.createExistsFilter = function(columnPath, subFilters) {
	Terrasoft.checkArguments(arguments, "columnPath");
	return Ext.create("Terrasoft.ExistsFilter", {
		comparisonType: Terrasoft.ComparisonType.EXISTS,
		leftExpression: Ext.create("Terrasoft.ColumnExpression", {
			columnPath: columnPath
		}),
		subFilters: subFilters
	});
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createExistsFilter}
 * @member Terrasoft
 * @method createExistsFilter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createExistsFilter
 */
Terrasoft.createExistsFilter = Terrasoft.data.filters.FilterUtils.createExistsFilter;

/**
 * Creates an instance of the Exists filter for comparing the type [Does not exist by the specified condition] and
 * sets as the test value the expression of the column located along the specified path
 * @param {String} columnPath The path to the column for which the filter is built
 * @param {Terrasoft.FilterGroup} subFilters (Optional) Subquery filters
 * @return {Terrasoft.ExistsFilter} Returns the created filter object
 * @throws {@link Terrasoft.ArgumentNullOrEmptyException}
 * An exception is thrown if columnPath is not passed.
 */
Terrasoft.data.filters.FilterUtils.createNotExistsFilter = function(columnPath, subFilters) {
	Terrasoft.checkArguments(arguments, "columnPath");
	return Ext.create("Terrasoft.ExistsFilter", {
		comparisonType: Terrasoft.ComparisonType.NOT_EXISTS,
		leftExpression: Ext.create("Terrasoft.ColumnExpression", {
			columnPath: columnPath
		}),
		subFilters: subFilters
	});
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createNotExistsFilter}
 * @member Terrasoft
 * @method createNotExistsFilter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createNotExistsFilter
 */
Terrasoft.createNotExistsFilter = Terrasoft.data.filters.FilterUtils.createNotExistsFilter;

/**
 * Creates a Compare-Filter instance
 * @param {Terrasoft.ComparisonType} comparisonType Type of comparison operation
 * @param {String} columnPath Expression to check in the filter
 * @param {Terrasoft.DatePartType} datePartType Filter expression
 * @param {Number} datePartValue Parameter value
 * @return {Terrasoft.CompareFilter} Returns the created filter object
 */
Terrasoft.data.filters.FilterUtils.createDatePartColumnFilter =
	function(comparisonType, columnPath, datePartType, datePartValue) {
		if (Ext.isEmpty(columnPath)) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "columnPath"
			});
		}
		var leftExpression = Ext.create("Terrasoft.FunctionExpression", {
			functionType: Terrasoft.FunctionType.DATE_PART,
			datePartType: datePartType,
			functionArgument: Ext.create("Terrasoft.ColumnExpression", {
				columnPath: columnPath
			})
		});
		var rightExpression = Ext.create("Terrasoft.ParameterExpression", {
			parameterValue: datePartValue,
			parameterDataType: Terrasoft.DataValueType.INTEGER
		});
		return Terrasoft.createCompareFilter(comparisonType, leftExpression, rightExpression);
	};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#createDatePartColumnFilter}
 * @member Terrasoft
 * @method createDatePartColumnFilter
 * @inheritdoc Terrasoft.data.filters.FilterUtils#createDatePartColumnFilter
 */
Terrasoft.createDatePartColumnFilter = Terrasoft.data.filters.FilterUtils.createDatePartColumnFilter;

/**
 * Returns the string representation of the right side of the expression
 * @param {Terrasoft.BaseFilter} filter Filter element
 * @return {String} The string representation of the right side of expression
 */
Terrasoft.data.filters.FilterUtils.getRightExpressionDisplayValue = function(filter) {
	var result = "";
	if (Terrasoft.isFilterWithMacros(filter)) {
		var macrosDisplayObject = Terrasoft.GetRightExpressionMacrosDisplayValues(filter);
		var macrosCaption = macrosDisplayObject.macrosCaption;
		result = (!Ext.isEmpty(macrosCaption)) ? macrosCaption : result;
		var macrosParameterCaption = macrosDisplayObject.macrosParameterCaption;
		result = (!Ext.isEmpty(macrosParameterCaption))
			? (Ext.String.format("{0} {1}", result, macrosParameterCaption))
			: result;
	} else {
		var dataValueType, parameter;
		switch (filter.filterType) {
			case Terrasoft.FilterType.COMPARE:
				var rightExpression = filter.rightExpression;
				if (rightExpression && rightExpression.parameter) {
					parameter = rightExpression.parameter;
					var value = parameter.getValue();
					dataValueType = parameter.dataValueType || filter.dataValueType;
					if (dataValueType === Terrasoft.DataValueType.DATE_TIME) {
						dataValueType = Terrasoft.DataValueType.DATE;
					}
					result = (Ext.isEmpty(value)) ? "" : Terrasoft.getTypedStringValue(value, dataValueType);
				}
				break;
			case Terrasoft.FilterType.IN:
				var stringValues = [];
				Terrasoft.each(filter.rightExpressions, function(expression) {
					var parameter = expression.parameter;
					if (parameter) {
						dataValueType = parameter.dataValueType || filter.dataValueType;
						stringValues.push(Terrasoft.getTypedStringValue(parameter.getValue(), dataValueType));
					}
				});
				result = stringValues.join("; ");
				break;
			default:
				break;
		}
	}
	return result;
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#getRightExpressionDisplayValue}
 * @member Terrasoft
 * @method getRightExpressionDisplayValue
 * @inheritdoc Terrasoft.data.filters.FilterUtils#getRightExpressionDisplayValue
 */
Terrasoft.getRightExpressionDisplayValue = Terrasoft.data.filters.FilterUtils.getRightExpressionDisplayValue;

/**
 * Returns the value of the right side of expression
 * @param {Terrasoft.CompareFilter} filter The filter item
 */
Terrasoft.data.filters.FilterUtils.getRightExpressionValue = function(filter) {
	if (filter.filterType !== Terrasoft.FilterType.COMPARE) {
		throw new Terrasoft.UnsupportedTypeException({
			message: Terrasoft.Resources.FilterUtils.FilterTypeShouldBeCompare
		});
	}
	var result = null;
	var rightExpression = filter.rightExpression;
	if (rightExpression && rightExpression.parameter) {
		result = rightExpression.parameter.getValue();
	}
	var paramArgument = rightExpression && rightExpression.functionArgument;
	var functionParameter = paramArgument && rightExpression.functionArgument.parameter;
	if (functionParameter) {
		result = functionParameter.value;
	}
	return result;
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#getRightExpressionValue}
 * @member Terrasoft
 * @method getRightExpressionValue
 * @inheritdoc Terrasoft.data.filters.FilterUtils#getRightExpressionValue
 */
Terrasoft.getRightExpressionValue = Terrasoft.data.filters.FilterUtils.getRightExpressionValue;

/**
 * Checks for the presence of a macro in the filter
 * @param {Terrasoft.BaseFilter} filter Filter element
 * @return {Boolean} Indicates the presence of a macro in the filter
 */
Terrasoft.data.filters.FilterUtils.isFilterWithMacros = function(filter) {
	var leftExpressionFunctionType = (filter.leftExpression) ? filter.leftExpression.functionType : null;
	var rightExpressionFunctionType = (filter.rightExpression) ? filter.rightExpression.functionType : null;
	var result = (leftExpressionFunctionType === Terrasoft.FunctionType.DATE_PART) ||
		(rightExpressionFunctionType === Terrasoft.FunctionType.MACROS);
	return result;
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#isFilterWithMacros}
 * @member Terrasoft
 * @method isFilterWithMacros
 * @inheritdoc Terrasoft.data.filters.FilterUtils#isFilterWithMacros
 */
Terrasoft.isFilterWithMacros = Terrasoft.data.filters.FilterUtils.isFilterWithMacros;

/**
 * Returns the object of the displayed values of the filter macro
 * @param {Terrasoft.BaseFilter} filter Filter element
 * @return {Object} Object of the displayed values of the filter macro
 * @return {Object.macrosCaption} Macro header
 * @return {Object.macrosParameterCaption} Object of the displayed values of the filter macro
 */
Terrasoft.data.filters.FilterUtils.GetRightExpressionMacrosDisplayValues = function(filter) {

	/**
	 * Returns the header of the macro parameter part of the date
	 * @private
	 * @param {Object} filterMacrosConfig Object settings for the type of filter macro
	 * @param {Number/String/Date} currentFilterValue current value of the macro parameter
	 * @return {String} Macro parameter header part of the date
	 */
	function getDatePartMacrosParameterCaption(filterMacrosConfig, currentFilterValue) {
		var result = currentFilterValue;
		var filterMacrosConfigValue = filterMacrosConfig.value;
		var filterMacrosConfigValueDisplayRange = filterMacrosConfigValue.displayValueRange;
		if (filterMacrosConfigValue.dataValueType === Terrasoft.DataValueType.TIME) {
			result = Ext.Date.format(currentFilterValue, Terrasoft.Resources.CultureSettings.timeFormat);
		} else if (filterMacrosConfigValueDisplayRange) {
			result = filterMacrosConfigValueDisplayRange[currentFilterValue - 1];
		}
		return result;
	}

	/**
	 * Returns the header of the macro parameter
	 * @private
	 * @param {Terrasoft.BaseExpression} expression Filter expression
	 * @param {Object} filterMacrosConfig Object settings for the type of filter macro
	 * @return {String} Macro parameter header
	 */
	function getFilterMacrosParameterCaption(expression, filterMacrosConfig) {
		var result;
		var filterMacrosFunctionType = filterMacrosConfig.functionType;
		if (filterMacrosFunctionType === Terrasoft.FunctionType.DATE_PART) {
			var expressionParameter = expression.parameter;
			var expressionParameterValue = (expressionParameter) ? expressionParameter.value : null;
			result = getDatePartMacrosParameterCaption(filterMacrosConfig, expressionParameterValue);
		} else if (filterMacrosFunctionType === Terrasoft.FunctionType.MACROS) {
			var filterMacrosType = filterMacrosConfig.filterMacrosType;
			if (Terrasoft.ParameterizedFilterMacrosTypes.indexOf(filterMacrosType) > -1) {
				var functionArgumentParameter = expression.functionArgument.parameter;
				result = (functionArgumentParameter) ? functionArgumentParameter.value : null;
			}
		}
		return result;
	}

	var result = {};
	var filterMacrosConfig = Terrasoft.GetFilterMacrosConfig(filter);
	if (filterMacrosConfig) {
		result.macrosCaption = filterMacrosConfig.caption;
		if (!Ext.isEmpty(filterMacrosConfig.value)) {
			result.macrosParameterCaption = getFilterMacrosParameterCaption(filter.rightExpression,
				filterMacrosConfig);
		}
	}
	return result;
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#GetRightExpressionMacrosDisplayValues}
 * @member Terrasoft
 * @method GetRightExpressionMacrosDisplayValues
 * @inheritdoc Terrasoft.data.filters.FilterUtils#GetRightExpressionMacrosDisplayValues
 */
Terrasoft.GetRightExpressionMacrosDisplayValues =
	Terrasoft.data.filters.FilterUtils.GetRightExpressionMacrosDisplayValues;

/**
 * Returns the configuration object for the filter macro type
 * @throws {Terrasoft.UnsupportedTypeException}
 * If for the filter function type, there is no method to determine the type of the filter macro
 * @param {Terrasoft.BaseFilter} filter Filter element
 * @return {Object} settings object for the type of filter macro
 */
Terrasoft.data.filters.FilterUtils.GetFilterMacrosConfig = function(filter) {
	var result;
	var leftExpression = filter.leftExpression;
	var leftExpressionFunctionType = (leftExpression) ? leftExpression.functionType : null;
	var rightExpression = filter.rightExpression;
	var rightExpressionFunctionType = (rightExpression) ? rightExpression.functionType : null;
	var filterMacrosType;
	if (leftExpressionFunctionType === Terrasoft.FunctionType.DATE_PART) {
		filterMacrosType = Terrasoft.GetDatePartTypeFilterMacrosType(leftExpression.datePartType);
	} else if (rightExpressionFunctionType === Terrasoft.FunctionType.MACROS) {
		filterMacrosType = Terrasoft.GetQueryMacrosTypeFilterMacrosType(rightExpression.macrosType);
	}
	if (!Ext.isEmpty(filterMacrosType)) {
		result = Terrasoft.MacrosTypeConfig[filterMacrosType];
		result.filterMacrosType = filterMacrosType;
	}
	return result;
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#GetFilterMacrosConfig}
 * @member Terrasoft
 * @method GetFilterMacrosConfig
 * @inheritdoc Terrasoft.data.filters.FilterUtils#GetFilterMacrosConfig
 */
Terrasoft.GetFilterMacrosConfig = Terrasoft.data.filters.FilterUtils.GetFilterMacrosConfig;

/**
 * Returns the type of the filter macro
 * @throws {Terrasoft.UnsupportedTypeException}
 * If the method for determining the type of the filter macro is not found for the date part type
 * @param {Terrasoft.core.enums.DatePartType} datePartType the date part type
 * @return {Terrasoft.FilterMacrosType} the type of filter macro
 */
Terrasoft.data.filters.FilterUtils.GetDatePartTypeFilterMacrosType = function(datePartType) {
	var result = Terrasoft.DatePartTypeFilterMacrosType[datePartType];
	if (Ext.isEmpty(result)) {
		throw new Terrasoft.UnsupportedTypeException({
			message: Terrasoft.Resources.FilterMacros.GetDatePartTypeFilterMacrosTypeException
		});
	}
	return result;
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#GetDatePartTypeFilterMacrosType}
 * @member Terrasoft
 * @method GetDatePartTypeFilterMacrosType
 * @inheritdoc Terrasoft.data.filters.FilterUtils#GetDatePartTypeFilterMacrosType
 */
Terrasoft.GetDatePartTypeFilterMacrosType = Terrasoft.data.filters.FilterUtils.GetDatePartTypeFilterMacrosType;

/**
 * Returns the configuration object for the specified macro type
 * @throws {Terrasoft.UnsupportedTypeException}
 * If no customization object was found for the specified macro type
 * @param {Terrasoft.FilterMacrosType} filterMacrosType macro type
 * @return {Object} configuration object
 */
Terrasoft.data.filters.FilterUtils.getMacrosTypeConfig = function(filterMacrosType) {
	var result = Terrasoft.MacrosTypeConfig[filterMacrosType];
	if (Ext.isEmpty(result)) {
		throw new Terrasoft.UnsupportedTypeException({
			message: Terrasoft.Resources.FilterMacros.GetMacrosTypeConfigException
		});
	}
	return result;
};
/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#getMacrosTypeConfig}
 * @member Terrasoft
 * @method getMacrosTypeConfig
 * @inheritdoc Terrasoft.data.filters.FilterUtils#getMacrosTypeConfig
 */
Terrasoft.getMacrosTypeConfig = Terrasoft.data.filters.FilterUtils.getMacrosTypeConfig;

/**
 * Returns the type of the filter macro
 * @throws {Terrasoft.UnsupportedTypeException}
 * If the type of the filter macro is not found for the specified query macro type to the object schema
 * @param {Terrasoft.core.enums.QueryMacrosType} queryMacrosType date fragment type
 * @return {Terrasoft.FilterMacrosType} filter macro type
 */
Terrasoft.data.filters.FilterUtils.GetQueryMacrosTypeFilterMacrosType = function(queryMacrosType) {
	var result = Terrasoft.QueryMacrosTypeFilterMacrosType[queryMacrosType];
	if (Ext.isEmpty(result)) {
		throw new Terrasoft.UnsupportedTypeException({
			message: Terrasoft.Resources.FilterMacros.GetQueryMacrosTypeFilterMacrosTypeException
		});
	}
	return result;
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#GetQueryMacrosTypeFilterMacrosType}
 * @member Terrasoft
 * @method GetQueryMacrosTypeFilterMacrosType
 * @inheritdoc Terrasoft.data.filters.FilterUtils#GetQueryMacrosTypeFilterMacrosType
 */
Terrasoft.GetQueryMacrosTypeFilterMacrosType = Terrasoft.data.filters.FilterUtils.GetQueryMacrosTypeFilterMacrosType;

/**
 * Returns the data type for the filter
 * @private
 * @param {Terrasoft.BaseFilter} filter
 * @return {Terrasoft.DataValueType} Filter data type
 */
Terrasoft.data.filters.FilterUtils.getFilterDataValueType = function(filter) {
	var dataValueType;
	if (filter) {
		dataValueType = filter.dataValueType;
		if (Terrasoft.isFilterWithMacros(filter)) {
			var filterMacrosWithGuid = [
				Terrasoft.FilterMacrosType.CONTACT_CURRENT,
				Terrasoft.FilterMacrosType.USER_CURRENT
			];
			var filterMacrosConfig = Terrasoft.GetFilterMacrosConfig(filter);
			if (Terrasoft.contains(filterMacrosWithGuid, filterMacrosConfig.filterMacrosType)) {
				dataValueType = Terrasoft.DataValueType.LOOKUP;
			}
		}
	}
	return dataValueType;
};

/**
 * Abbreviation for {@link Terrasoft.data.filters.FilterUtils#getFilterDataValueType}
 * @member Terrasoft
 * @method getFilterDataValueType
 * @inheritdoc Terrasoft.data.filters.FilterUtils#getFilterDataValueType
 */
Terrasoft.getFilterDataValueType = Terrasoft.data.filters.FilterUtils.getFilterDataValueType;
