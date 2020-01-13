/**
 * @abstract
 * The base class of the filtered data request
 */
Ext.define("Terrasoft.data.queries.BaseFilterableQuery", {
	extend: "Terrasoft.data.queries.BaseQuery",
	alternateClassName: "Terrasoft.BaseFilterableQuery",

	/**
	 * The name of the filter by the key column.
	 * @private
	 * @type {String}
	 */
	primaryColumnFilterName: "primaryColumnFilter",

	/**
	 * An array of signs of filter activity.
	 * @private
	 * @type {Object}
	 */
	filtersEnabledState: null,

	/**
	 * Collection of filters.
	 * @type {Terrasoft.FilterGroup}
	 */
	filters: null,

	/**
	 * Filter instance by key column.
	 * @type {Terrasoft.CompareFilter}
	 */
	primaryColumnFilter: null,

	/**
	 * Initializes the service filter by the key field.
	 * @private
	 */
	initPrimaryColumnFilter: function() {
		var leftExpression = Ext.create("Terrasoft.FunctionExpression", {
			functionType: Terrasoft.FunctionType.MACROS,
			macrosType: Terrasoft.QueryMacrosType.PRIMARY_COLUMN
		});
		var rightExpression = Ext.create("Terrasoft.ParameterExpression", {
			parameterValue: "",
			parameterDataType: Terrasoft.DataValueType.GUID
		});
		var primaryColumnFilter = this.createCompareFilter(
			Terrasoft.ComparisonType.EQUAL, leftExpression, rightExpression);
		primaryColumnFilter.isEnabled = false;
		this.filters.add(this.primaryColumnFilterName, primaryColumnFilter);
		return primaryColumnFilter;
	},

	/**
	 * Turns off filtering by primary key.
	 * @protected
	 */
	disablePrimaryColumnFilter: function() {
		var primaryColumnFilter = this.primaryColumnFilter;
		if (!primaryColumnFilter) {
			return;
		}
		primaryColumnFilter.isEnabled = false;
		var filters = this.filters;
		Terrasoft.each(this.filtersEnabledState, function(filterEnabledState, key) {
			filters.get(key).isEnabled = filterEnabledState;
		});
	},

	/**
	 * Creates query elements.
	 * @protected
	 * @override
	 */
	initQueryItems: function() {
		this.callParent(arguments);
		this.filters = Ext.create("Terrasoft.FilterGroup");
	},

	/**
	 * Copies the properties for serialization to the serialized object. Implements the mixin interface.
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @override
	 * @param {Object} serializableObject Serialized object.
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		var filters = this.filters;
		serializableObject.filters = (!filters.isEmpty() ? this.getSerializableProperty(filters) : null);
	},

	/**
	 * Enables filtration by primary column.
	 * @param {String/Number} primaryColumnValue Primary column value.
	 */
	enablePrimaryColumnFilter: function(primaryColumnValue) {
		var filtersEnabledState = this.filtersEnabledState = {};
		this.filters.eachKey(function(key, filter) {
			filtersEnabledState[key] = filter.isEnabled;
			filter.isEnabled = false;
		});
		var primaryColumnFilter = this.primaryColumnFilter = this.primaryColumnFilter || this.initPrimaryColumnFilter();
		var parameter = primaryColumnFilter.rightExpression.parameter;
		parameter.setValue(primaryColumnValue);
		parameter.setDataValueType(Terrasoft.DataValueType.GUID);
		primaryColumnFilter.isEnabled = true;
	},

	/**
	 * Creates a new instance of the filter group.
	 * @return {Terrasoft.FilterGroup} Collection of filters.
	 */
	createFilterGroup: function() {
		return Terrasoft.createFilterGroup();
	},

	/**
	 * Creates an instance of the Compare-filter.
	 * @param {Terrasoft.ComparisonType} comparisonType The type of the comparison operation.
	 * @param {Terrasoft.BaseExpression} leftExpression The expression to check in the filter.
	 * @param {Terrasoft.BaseExpression} rightExpression Filter expression.
	 * @return {Terrasoft.CompareFilter} The created filter object.
	 */
	createCompareFilter: function(comparisonType, leftExpression, rightExpression) {
		return Terrasoft.createCompareFilter(comparisonType, leftExpression, rightExpression);
	},

	/**
	 * Creates an instance of the Between filter.
	 * @param {Terrasoft.BaseExpression} leftExpression The expression to check in the filter.
	 * @param {Terrasoft.BaseExpression} rightLessExpression The initial expression of the filter range.
	 * @param {Terrasoft.BaseExpression} rightGreaterExpression The final expression of the filtering range.
	 * @return {Terrasoft.CompareFilter} The created filter object.
	 */
	createBetweenFilter: function(leftExpression, rightLessExpression, rightGreaterExpression) {
		return Terrasoft.createBetweenFilter(leftExpression, rightLessExpression, rightGreaterExpression);
	},

	/**
	 * Creates an IsNull filter instance.
	 * @param {Terrasoft.BaseExpression} leftExpression The expression to be checked for "empty".
	 * @return {Terrasoft.IsNullFilter} The created filter object.
	 */
	createIsNullFilter: function(leftExpression) {
		return Terrasoft.createIsNullFilter(leftExpression);
	},

	/**
	 * Creates an IsNull filter instance.
	 * @param {Terrasoft.BaseExpression} leftExpression The expression to be checked for is not empty.
	 * @return {Terrasoft.IsNullFilter} The created filter object.
	 */
	createIsNotNullFilter: function(leftExpression) {
		return Terrasoft.createIsNotNullFilter(leftExpression);
	},

	/**
	 * Creates an instance of the In-Filter.
	 * @param {Terrasoft.BaseExpression} leftExpression The expression checked in the filter.
	 * @param {Terrasoft.BaseExpression[]} rightExpressions Array of expressions,
	 * that will be compared to leftExpression.
	 * @return {Terrasoft.FilterGroup} The created filter object.
	 */
	createInFilter: function(leftExpression, rightExpressions) {
		return Terrasoft.createInFilter(leftExpression, rightExpressions);
	},

	/**
	 * Creates an instance of the Compare Filter to compare the values of the two columns.
	 * @param {Terrasoft.ComparisonType} comparisonType The type of the comparison operation.
	 * @param {String} leftColumnPath The path to the column to be checked relative to the rootSchema root schema.
	 * @param {String} rightColumnPath The path to the filter column relative to the rootSchema root schema.
	 * @return {Terrasoft.CompareFilter} The created filter object.
	 */
	createFilter: function(comparisonType, leftColumnPath, rightColumnPath) {
		return Terrasoft.createFilter(comparisonType, leftColumnPath, rightColumnPath);
	},

	/**
	 * Creates an instance of the Compare Filter to compare the column with the specified value.
	 * @param {Terrasoft.ComparisonType} comparisonType The type of the comparison operation.
	 * @param {String} columnPath The path to the column to be checked relative to the rootSchema root schema.
	 * @param {Mixed} paramValue The value of the filter.
	 * @param {Terrasoft.DataValueType} paramDataType The type of the parameter value.
	 * @return {Terrasoft.CompareFilter} The created filter object.
	 */
	createColumnFilterWithParameter: function(comparisonType, columnPath, paramValue, paramDataType) {
		return Terrasoft.createColumnFilterWithParameter(comparisonType, columnPath, paramValue, paramDataType);
	},

	/**
	 * Creates a filter object to compare the primary column for the display with the value of the parameter.
	 * @param {Terrasoft.ComparisonType} comparisonType Comparison type.
	 * @param {Mixed} paramValue The value of the parameter.
	 * @param {Terrasoft.DataValueType} paramDataType The type of the parameter value.
	 * @return {Terrasoft.CompareFilter} The object of the created filter.
	 */
	createPrimaryDisplayColumnFilterWithParameter: function(comparisonType, paramValue, paramDataType) {
		return Terrasoft.createPrimaryDisplayColumnFilterWithParameter(comparisonType, paramValue, paramDataType);
	},

	/**
	 * Creates an instance of the Between filter to check whether the column hits the specified range.
	 * @param {String} columnPath  The path to the column to be checked relative to the rootSchema root schema.
	 * @param {Mixed} lessParamValue The initial value of the filter.
	 * @param {Mixed} greaterParamValue The final value of the filter.
	 * @param {Terrasoft.DataValueType} paramDataType The type of the parameter value.
	 * @return {Terrasoft.BetweenFilter} The created filter object.
	 */
	createColumnBetweenFilterWithParameters: function(columnPath, lessParamValue, greaterParamValue, paramDataType) {
		return Terrasoft.createColumnBetweenFilterWithParameters(columnPath, lessParamValue,
			greaterParamValue, paramDataType);
	},

	/**
	 * Creates an IsNull filter instance to verify the specified column.
	 * @param {String} columnPath The path to the column to be checked relative to the rootSchema root schema.
	 * @return {Terrasoft.IsNullFilter} The created filter object.
	 */
	createColumnIsNullFilter: function(columnPath) {
		return Terrasoft.createColumnIsNullFilter(columnPath);
	},

	/**
	 * Creates an IsNull filter instance to verify the specified column.
	 * @param {String} columnPath The path to the column to be checked relative to the rootSchema root schema.
	 * @return {Terrasoft.IsNullFilter} The created filter object.
	 */
	createColumnIsNotNullFilter: function(columnPath) {
		return Terrasoft.createColumnIsNotNullFilter(columnPath);
	},

	/**
	 * Creates an In-filter instance to verify that the value of the specified column matches the value of one of the parameters.
	 * @throws {Terrasoft.UnsupportedTypeException}
	 * If parameterValues is not an array, an exception is thrown.
	 * @param {String} columnPath The path to the column to be checked relative to the rootSchema root.
	 * @param {Array} paramValues An array of parameter values.
	 * @param {Terrasoft.DataValueType} paramDataType The type of the parameter value.
	 * @return {Terrasoft.FilterGroup} The created filter object.
	 */
	createColumnInFilterWithParameters: function(columnPath, paramValues, paramDataType) {
		return Terrasoft.createColumnInFilterWithParameters(columnPath, paramValues, paramDataType);
	},

	/**
	 * Creates an instance of the Exists filter for the type comparison [Exists according to the specified condition] and
	 * sets the expression of the column in the specified path as the value to be checked.
	 * @throws {Terrasoft.ArgumentNullOrEmptyException}
	 * An exception is thrown if columnPath is not passed.
	 * @param {String} columnPath The path to the column for which the filter is built.
	 * @return {Terrasoft.ExistsFilter} The created filter object.
	 */
	createExistsFilter: function(columnPath) {
		return Terrasoft.createExistsFilter(columnPath);
	},

	/**
	 * Creates an instance of the Exists filter for comparing the type [Does not exist for a given condition] and
	 * sets the expression of the column in the specified path as the value to be checked.
	 * @throws {Terrasoft.ArgumentNullOrEmptyException}
	 * An exception throws if columnPath is not passed.
	 * @param {String} columnPath The path to the column for which the filter is built.
	 * @return {Terrasoft.ExistsFilter} The created filter object.
	 */
	createNotExistsFilter: function(columnPath) {
		return Terrasoft.createNotExistsFilter(columnPath);
	},

	/**
	 * Clears all subscriptions to events and destroys the object.
	 * @override
	 */
	onDestroy: function() {
		this.filters.destroy();
		delete this.filters;
		this.callParent(arguments);
	}

});