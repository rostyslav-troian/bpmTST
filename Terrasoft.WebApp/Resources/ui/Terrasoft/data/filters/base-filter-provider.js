/**
 * Provider for accessing filter manager {@link Terrasoft.FilterManager}.
 * @abstract
 */
Ext.define("Terrasoft.data.filters.BaseFilterProvider", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.BaseFilterProvider",

	/**
	 * Operation comparison type by default.
	 * @private
	 * @type {Terrasoft.ComparisonType}
	 */
	defaultComparisonType: Terrasoft.ComparisonType.EQUAL,

	/**
	 * Operation comparison type by default for aggregation.
	 * @private
	 * @type {Terrasoft.ComparisonType}
	 */
	defaultAggregationComparisonType: Terrasoft.ComparisonType.GREATER,

	/**
	 * Operation comparison type by default for data type {@link Terrasoft.core.enums.DataValueType.IMAGELOOKUP}.
	 * @private
	 * @type {Terrasoft.ComparisonType}
	 */
	defaultImageLookupComparisonType: Terrasoft.ComparisonType.IS_NOT_NULL,

	/**
	 * Names of filter types.
	 * @private
	 * @type {String}
	 */
	filterTypeNames: ["NONE", "COMPARE", "IS_NULL", "BETWEEN", "IN", "EXISTS", "FILTER_GROUP"],

	/**
	 * Names of comparison types.
	 * @private
	 * @type {String}
	 */
	comparisonTypeNames: [
		"BETWEEN", "IS_NULL", "IS_NOT_NULL", "EQUAL", "NOT_EQUAL", "LESS", "LESS_OR_EQUAL", "GREATER",
		"GREATER_OR_EQUAL", "START_WITH", "NOT_START_WITH", "CONTAIN", "NOT_CONTAIN", "END_WITH", "NOT_END_WITH",
		"EXISTS", "NOT_EXISTS"
	],

	/**
	 * Allowed types of operations for each type of filter.
	 * @protected
	 * @type {Object}
	 */
	filterComparisonTypes: {
		COMPARE: [
			Terrasoft.ComparisonType.EQUAL,
			Terrasoft.ComparisonType.NOT_EQUAL,
			Terrasoft.ComparisonType.START_WITH,
			Terrasoft.ComparisonType.NOT_START_WITH,
			Terrasoft.ComparisonType.CONTAIN,
			Terrasoft.ComparisonType.NOT_CONTAIN,
			Terrasoft.ComparisonType.END_WITH,
			Terrasoft.ComparisonType.NOT_END_WITH,
			Terrasoft.ComparisonType.LESS,
			Terrasoft.ComparisonType.LESS_OR_EQUAL,
			Terrasoft.ComparisonType.GREATER,
			Terrasoft.ComparisonType.GREATER_OR_EQUAL
		],
		IS_NULL: [
			Terrasoft.ComparisonType.IS_NULL,
			Terrasoft.ComparisonType.IS_NOT_NULL
		],
		IN: [
			Terrasoft.ComparisonType.EQUAL,
			Terrasoft.ComparisonType.NOT_EQUAL
		]
	},

	/**
	 * Allowed data type names.
	 * @protected
	 * @type {Array}
	 */
	dataValueTypeNames: [
		"GUID", "TEXT", null, null, "INTEGER", "FLOAT", "MONEY", "DATE_TIME", "DATE", "TIME", "LOOKUP",
		"ENUM", "BOOLEAN", "BLOB", "IMAGE", "CUSTOM_OBJECT"
	],

	/**
	 * Allowed aggregation functions for each data type.
	 * @protected
	 * @type {Object}
	 */
	dataValueTypeAggregationFunction: {
		/** Integer */
		INTEGER: [
			Terrasoft.AggregationType.SUM,
			Terrasoft.AggregationType.AVG,
			Terrasoft.AggregationType.MIN,
			Terrasoft.AggregationType.MAX
		],
		/** Real number */
		FLOAT: [
			Terrasoft.AggregationType.SUM,
			Terrasoft.AggregationType.AVG,
			Terrasoft.AggregationType.MIN,
			Terrasoft.AggregationType.MAX
		],
		/** Currency */
		MONEY: [
			Terrasoft.AggregationType.SUM,
			Terrasoft.AggregationType.AVG,
			Terrasoft.AggregationType.MIN,
			Terrasoft.AggregationType.MAX
		],
		/** Date and time */
		DATE_TIME: [
			Terrasoft.AggregationType.MIN,
			Terrasoft.AggregationType.MAX
		],
		/** Date */
		DATE: [
			Terrasoft.AggregationType.MIN,
			Terrasoft.AggregationType.MAX
		],
		/** Time */
		TIME: [
			Terrasoft.AggregationType.MIN,
			Terrasoft.AggregationType.MAX
		]
	},

	/**
	 * Allowed names for the types of aggregation functions.
	 * @protected
	 * @type {Array}
	 */
	aggregationTypeNames: ["NONE", "COUNT", "SUM", "AVG", "MIN", "MAX"],

	/**
	 * Allowed types of comparison operations for each type of aggregation function.
	 * @protected
	 * @type {Object}
	 */
	aggregationFunctionComparisonTypes: {
		COUNT: [
			Terrasoft.ComparisonType.GREATER,
			Terrasoft.ComparisonType.GREATER_OR_EQUAL,
			Terrasoft.ComparisonType.EQUAL,
			Terrasoft.ComparisonType.NOT_EQUAL,
			Terrasoft.ComparisonType.LESS,
			Terrasoft.ComparisonType.LESS_OR_EQUAL
		],
		SUM: [
			Terrasoft.ComparisonType.GREATER,
			Terrasoft.ComparisonType.GREATER_OR_EQUAL,
			Terrasoft.ComparisonType.EQUAL,
			Terrasoft.ComparisonType.NOT_EQUAL,
			Terrasoft.ComparisonType.LESS,
			Terrasoft.ComparisonType.LESS_OR_EQUAL
		],
		AVG: [
			Terrasoft.ComparisonType.GREATER,
			Terrasoft.ComparisonType.GREATER_OR_EQUAL,
			Terrasoft.ComparisonType.EQUAL,
			Terrasoft.ComparisonType.NOT_EQUAL,
			Terrasoft.ComparisonType.LESS,
			Terrasoft.ComparisonType.LESS_OR_EQUAL
		],
		MIN: [
			Terrasoft.ComparisonType.GREATER,
			Terrasoft.ComparisonType.GREATER_OR_EQUAL,
			Terrasoft.ComparisonType.EQUAL,
			Terrasoft.ComparisonType.NOT_EQUAL,
			Terrasoft.ComparisonType.LESS,
			Terrasoft.ComparisonType.LESS_OR_EQUAL
		],
		MAX: [
			Terrasoft.ComparisonType.GREATER,
			Terrasoft.ComparisonType.GREATER_OR_EQUAL,
			Terrasoft.ComparisonType.EQUAL,
			Terrasoft.ComparisonType.NOT_EQUAL,
			Terrasoft.ComparisonType.LESS,
			Terrasoft.ComparisonType.LESS_OR_EQUAL
		]
	},

	/**
	 * Allowed names for the types of aggregation functions.
	 * @protected
	 * @type {Array}
	 */
	aggregationOperationNames: ["EXIST", "AGGREGATION"],

	/**
	 * Types of comparison for equality or inequality.
	 * @type {Terrasoft.ComparisonType[]}
	 */
	equalComparisonTypes: [
		Terrasoft.ComparisonType.EQUAL,
		Terrasoft.ComparisonType.NOT_EQUAL
	],

	/**
	 * Types of comparison for existence or nonexistence.
	 * @type {Terrasoft.ComparisonType[]}
	 */
	isNullComparisonTypes: [
		Terrasoft.ComparisonType.IS_NOT_NULL,
		Terrasoft.ComparisonType.IS_NULL
	],

	/**
	 * Types of comparison for boolean data types.
	 * @type {Terrasoft.ComparisonType[]}
	 */
	booleanComparisonTypes: [
		Terrasoft.ComparisonType.EQUAL
	],

	/**
	 * Types of comparison for string data types.
	 * @type {Terrasoft.ComparisonType[]}
	 */
	textComparisonTypes: [
		Terrasoft.ComparisonType.CONTAIN,
		Terrasoft.ComparisonType.NOT_CONTAIN,
		Terrasoft.ComparisonType.START_WITH,
		Terrasoft.ComparisonType.NOT_START_WITH,
		Terrasoft.ComparisonType.END_WITH,
		Terrasoft.ComparisonType.NOT_END_WITH
	],

	/**
	 * Types of comparison for numeric and date/time data types.
	 * @type {Terrasoft.ComparisonType[]}
	 */
	numberDateComparisonTypes: [
		Terrasoft.ComparisonType.LESS,
		Terrasoft.ComparisonType.LESS_OR_EQUAL,
		Terrasoft.ComparisonType.GREATER,
		Terrasoft.ComparisonType.GREATER_OR_EQUAL
	],

	/**
	 * Gets the left side of the expression and calls the callback function in the context scope
	 * @protected
	 * @param {Function} callback The function that will be called when the left side of the expression is obtained
	 * @param {Object} scope The context in which the callback function is called
	 */
	getLeftExpression: function() {
		// TODO:
	},

	/**
	 * Gets the name of the type of comparison
	 * @private
	 * @param {Terrasoft.ComparisonType} comparisonType
	 * @return {String} result Type name comparison
	 */
	getComparisonTypeName: function(comparisonType) {
		return this.comparisonTypeNames[comparisonType];
	},

	/**
	 * Gets the header of the type of comparison
	 * @private
	 * @param {Terrasoft.ComparisonType} comparisonType
	 * @return {String} result Comparison type header
	 */
	getComparisonTypeCaption: function(comparisonType) {
		var comparisonTypeName = this.getComparisonTypeName(comparisonType);
		return Terrasoft.Resources.ComparisonType[comparisonTypeName];
	},

	/**
	 * Gets the type of comparison by title
	 * @private
	 * @param {String} caption
	 * @return {Terrasoft.ComparisonType} result Type of comparison
	 */
	getComparisonTypeByCaption: function(caption) {
		const index = _.values(Terrasoft.Resources.ComparisonType).indexOf(caption);
		const type = _.keys(Terrasoft.Resources.ComparisonType)[index];
		return Terrasoft.ComparisonType[type];
	},

	/**
	 * Gets the name of the aggregation type
	 * @private
	 * @param {Terrasoft.AggregationType} aggregationType
	 * @return {String} result Name of the aggregation type
	 */
	getAggregationTypeName: function(aggregationType) {
		return this.aggregationTypeNames[aggregationType];
	},

	/**
	 * Gets the aggregation type header
	 * @private
	 * @param {Terrasoft.AggregationType} aggregationType
	 * @return {String} result Aggregation type header
	 */
	getAggregationTypeCaption: function(aggregationType) {
		var aggregationTypeName = this.getAggregationTypeName(aggregationType);
		return Terrasoft.Resources.AggregationType[aggregationTypeName];
	},

	/**
	 * Gets the aggregation type by title
	 * @private
	 * @param {String} caption
	 * @return {Terrasoft.AggregationType} result Aggregation type
	 */
	getAggregationTypeByCaption: function(caption) {
		const index = _.values(Terrasoft.Resources.AggregationType).indexOf(caption);
		const type = _.keys(Terrasoft.Resources.AggregationType)[index];
		return Terrasoft.AggregationType[type];
	},

	/**
	 * Returns an array of available operations for the current filter element
	 * @protected
	 * @param {Terrasoft.data.filters.BaseFilter} filter
	 * @return {Terrasoft.ComparisonType[]}
	 */
	getAllowedComparisonTypes: function(filter) {
		var comparisonTypes = [];
		if (filter.isAggregative) {
			var leftExpression = filter.leftExpression;
			var aggregationtype = leftExpression.aggregationType;
			comparisonTypes = this.getAggregationFilterComparisonTypes(aggregationtype);
		} else {
			var dataValueType = Terrasoft.getFilterDataValueType(filter);
			comparisonTypes = this.getSimpleFilterComparisonTypes(dataValueType);
		}
		if (filter.dataValueType === Terrasoft.DataValueType.BOOLEAN) {
			return this.booleanComparisonTypes;
		}
		return comparisonTypes;
	},

	/**
	 * Returns an array of available operations for a simple filter
	 * @protected
	 * @param {Terrasoft.DataValueType} dataValueType
	 * @return {Terrasoft.ComparisonType[]}
	 */
	getSimpleFilterComparisonTypes: function(dataValueType) {
		var comparisonTypes = [];
		if (dataValueType !== Terrasoft.DataValueType.IMAGELOOKUP) {
			comparisonTypes = comparisonTypes.concat(this.equalComparisonTypes);
			switch (dataValueType) {
				case Terrasoft.DataValueType.TEXT:
				case Terrasoft.DataValueType.SHORT_TEXT:
				case Terrasoft.DataValueType.MEDIUM_TEXT:
				case Terrasoft.DataValueType.LONG_TEXT:
				case Terrasoft.DataValueType.MAXSIZE_TEXT:
				case Terrasoft.DataValueType.GUID:
					comparisonTypes = comparisonTypes.concat(this.textComparisonTypes);
					break;
				case Terrasoft.DataValueType.INTEGER:
				case Terrasoft.DataValueType.MONEY:
				case Terrasoft.DataValueType.FLOAT:
				case Terrasoft.DataValueType.DATE_TIME:
				case Terrasoft.DataValueType.DATE:
					comparisonTypes = comparisonTypes.concat(this.numberDateComparisonTypes);
					break;
				default:
					break;
			}
		}
		comparisonTypes = comparisonTypes.concat(this.isNullComparisonTypes);
		return comparisonTypes;
	},

	/**
	 * Returns an array of available operations for the aggregate filter
	 * @protected
	 * @param {Terrasoft.AggregationType} aggregationType
	 * @return {Terrasoft.ComparisonType[]}
	 */
	getAggregationFilterComparisonTypes: function(aggregationType) {
		var aggregationTypeName = this.aggregationTypeNames[aggregationType];
		return this.aggregationFunctionComparisonTypes[aggregationTypeName];
	},

	/**
	 * Returns an array of headers for the available aggregation operations for the specified filter
	 * @param {Terrasoft.data.filters.BaseFilter} filter
	 * @return {String[]}
	 */
	getAllowedAggregationOperations: function(filter) {
		var result = [];
		var isExistsFilter = filter.filterType === Terrasoft.FilterType.EXISTS;
		var leftExpression = filter.leftExpression;
		var currentAggregationType = leftExpression.aggregationType;
		if (isExistsFilter || (currentAggregationType === Terrasoft.AggregationType.COUNT)) {
			result.push(this.getComparisonTypeCaption(Terrasoft.ComparisonType.EXISTS));
			result.push(this.getComparisonTypeCaption(Terrasoft.ComparisonType.NOT_EXISTS));
			result.push(this.getAggregationTypeCaption(Terrasoft.AggregationType.COUNT));
		} else {
			var dataValueType = filter.dataValueType;
			var dataValueTypeName = this.dataValueTypeNames[dataValueType];
			var aggregationTypes = this.dataValueTypeAggregationFunction[dataValueTypeName];
			Terrasoft.each(aggregationTypes, function(aggregationType) {
				result.push(this.getAggregationTypeCaption(aggregationType));
			}, this);
		}
		return result;
	},

	/**
	 * Returns the current aggregation header for the specified filter
	 * @param {Terrasoft.data.filters.BaseFilter} filter
	 * @return {String}
	 */
	getAggregationOperation: function(filter) {
		var result;
		var isExistsFilter = filter.filterType === Terrasoft.FilterType.EXISTS;
		if (isExistsFilter) {
			result = this.getComparisonTypeCaption(filter.comparisonType);
		} else {
			var leftExpression = filter.leftExpression;
			result = this.getAggregationTypeCaption(leftExpression.aggregationType);
		}
		return result;
	},

	/**
	 * Sets the value for the right side of the filter
	 * @param {Terrasoft.data.filters.CompareFilter} filter Filter object
	 * @param {String|Number|Date|Boolean} value
	 */
	setRightExpressionValue: function(filter, value) {
		var parameterExpression = Ext.create("Terrasoft.ParameterExpression", {
			parameterDataType: filter.dataValueType,
			parameterValue: value
		});
		filter.setRightExpression(parameterExpression);
	},

	/**
	 * Sets values as right parameter expressions
	 * @throws {Terrasoft.UnsupportedTypeException} when rightExpressions is not an Array
	 * or when filter does not implement setRightExpressions method.
	 * @param {Terrasoft.data.filters.InFilter} filter An instance of a filter
	 * @param {Array} values An array of values to be set as right expression parameters.
	 */
	setRightExpressionsValues: function(filter, values) {
		if (!filter || !Ext.isDefined(filter.setRightExpressions)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		if (values && !Ext.isArray(values)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		var expressions = [];
		Terrasoft.each(values, function(value) {
			var expression = Ext.create("Terrasoft.ParameterExpression", {
				parameterValue: value,
				parameterDataType: Terrasoft.DataValueType.LOOKUP
			});
			expressions.push(expression);
		}, this);
		filter.setRightExpressions(expressions);
	},

	/**
	 * Creates a default filter for the specified configuration
	 * @abstract
	 * @param {Object} filterConfig Filter Configuration
	 * @return {Terrasoft.BaseFilter} Returns the created instance of the filter
	 */
	createDefaultFilter: Terrasoft.abstractFn,

	/**
	 * Returns the type of filter by an aggregating operation
	 * @param {String} aggregationOperationCaption Type of aggregation operation
	 * @return {Terrasoft.FilterType} Returns the type of the filter
	 */
	getFilterTypeByAggregationOperationCaption: function(aggregationOperationCaption) {
		var result = null;
		var comparisonType = this.getComparisonTypeByCaption(aggregationOperationCaption);
		if (comparisonType) {
			result = Terrasoft.FilterType.EXISTS;
		} else {
			result = Terrasoft.FilterType.COMPARE;
		}
		return result;
	},

	/**
	 * Returns the type of the filter by the type of the comparison operation
	 * @param {Terrasoft.data.filters.BaseFilter} changingFilter The filter that changes
	 * @return {Terrasoft.FilterType} Returns the type of the filter
	 */
	getMatchingFilterType: function(changingFilter) {
		var result = null;
		if (changingFilter.isAggregative) {
			result = Terrasoft.FilterType.COMPARE;
		} else {
			result = this.getSimpleFilterMatchingFilterType(changingFilter);
		}
		return result;
	},

	/**
	 * Returns the type of the filter by the comparison operation type for a simple filter
	 * @param {Terrasoft.data.filters.BaseFilter} changingFilter The filter that changes
	 * @return {Terrasoft.FilterType} Returns the type of the filter
	 */
	getSimpleFilterMatchingFilterType: function(changingFilter) {
		var result = null;
		var filterType = changingFilter.filterType;
		var comparisonType = changingFilter.comparisonType;
		var filterTypeName = this.filterTypeNames[filterType];
		var filterComparisonTypes = this.filterComparisonTypes;
		if (filterComparisonTypes[filterTypeName].indexOf(comparisonType) > -1) {
			result = filterType;
		} else if (comparisonType === Terrasoft.ComparisonType.IS_NULL ||
			comparisonType === Terrasoft.ComparisonType.IS_NOT_NULL) {
			result = Terrasoft.FilterType.IS_NULL;
		} else {
			var dataValueType = changingFilter.dataValueType;
			if (dataValueType === Terrasoft.DataValueType.LOOKUP ||
				dataValueType === Terrasoft.DataValueType.ENUM) {
				result = Terrasoft.FilterType.IN;
			} else {
				result = Terrasoft.FilterType.COMPARE;
			}
		}
		return result;
	},

	/**
	 * Returns filter allowed manage operations.
	 * @param {Terrasoft.BaseFilter} filterItem Filter for which operations requested.
	 * @return {Object} Allowed manage operations
	 * @return {Boolean} return.canViewEnabled Flag that indicates whether that the user can view filter
	 * enable property.
	 * @return {Boolean} return.canEditEnabled Flag that indicates whether that the user can edit filter
	 * enable/disable property.
	 * @return {Boolean} return.canEditLeftExpression Flag that indicates whether that the user can change filter
	 * left expression.
	 * @return {Boolean} return.canEditRightExpression Flag that indicates whether that the user can change filter
	 * right expression.
	 * @return {Boolean} return.canEditComparisonType Flag that indicates whether that the user can change filter
	 * comparison type.
	 * @return {Boolean} return.canRemove Flag that indicates whether that the user can remove filter.
	 * @return {Boolean} return.canSelect Flag that indicates whether that the user can select filter.
	 */
	getAllowedFilterManageOperations: function() {
		return {
			canViewEnabled: true,
			canEditEnabled: true,
			canEditLeftExpression: true,
			canEditRightExpression: true,
			canEditComparisonType: true,
			canRemove: true,
			canSelect: true
		};
	},

	/**
	 * Returns filterGroup allowed manage operations.
	 * @param {Terrasoft.BaseFilter} filterGroup FilterGroup for which operations requested.
	 * @return {Object} Allowed manage operations
	 * @return {Boolean} return.canViewEnabled Flag that indicates whether that the user can view filterGroup
	 * enable property.
	 * @return {Boolean} return.canEditEnabled Flag that indicates whether that the user can edit filterGroup
	 * enable/disable property.
	 * @return {Boolean} return.canViewGroupType Flag that indicates whether that the user can view filterGroup type.
	 * @return {Boolean} return.canEditGroupType Flag that indicates whether that the user can change filterGroup type.
	 * @return {Boolean} return.canAddFilters Flag that indicates whether that the user can add filters to filterGroup.
	 * @return {Boolean} return.canRemove Flag that indicates whether that the user can remove filterGroup.
	 * @return {Boolean} return.canSelect Flag that indicates whether that the user can select filterGroup.
	 */
	getAllowedFilterGroupManageOperations: function() {
		return {
			canViewEnabled: true,
			canEditEnabled: true,
			canViewGroupType: true,
			canEditGroupType: true,
			canAddFilters: true,
			canRemove: true,
			canSelect: true
		};
	},

	/**
	 * Creates a subscription to receive the filter schema name.
	 * @param {String} schemaName Schema name.
	 */
	subscribeForFilterSchemaName: Terrasoft.emptyFn,

	/**
	 * Returns an array of available macros for the specified filter.
	 * @param {Terrasoft.BaseFilter} filter Filter for which macros are requested.
	 * @return {Terrasoft.FilterMacrosType[]}
	 */
	getAllowedMacrosTypes: function() {
		return [];
	},

	/**
	 * Creates and initializes an object {@link Terrasoft.BaseFilterProvider}
	 */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event replaceFilter
			 * Notifies the filter manager of the need to replace filters
			 * @param {Terrasoft.BaseFilter} oldFilter Filter to remove
			 * @param {Terrasoft.BaseFilter} newFilter Filter to add
			 */
			"replaceFilter"
		);
	}
});

Object.defineProperty(Terrasoft.BaseFilterProvider.prototype, "logicalComparisonTypes", {
	get: function() {
		return this.booleanComparisonTypes;
	},
	set: function(logicalComparisonTypes) {
		this.booleanComparisonTypes = logicalComparisonTypes;
		this.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoletePropertyMessage, "logicalComparisonTypes",
			"booleanComparisonTypes"));
	},
	enumerable: true
});
