/**
 * @abstract
 */
Ext.define("Terrasoft.data.filters.BaseFilter", {
	extend: "Terrasoft.ObjectCollectionItem",
	alternateClassName: "Terrasoft.BaseFilter",

	/**
	 * Type of filter
	 * @type {Terrasoft.FilterType}
	 */
	filterType: Terrasoft.FilterType.NONE,

	/**
	 * The test expression
	 * @type {Terrasoft.BaseExpression}
	 */
	leftExpression: null,

	/**
	 * Type of comparison operation
	 * @type {Terrasoft.ComparisonType}
	 */
	comparisonType: Terrasoft.ComparisonType.EQUAL,

	/**
	 * Indicates that the filter is aggregating
	 * @type {Boolean}
	 */
	isAggregative: false,

	/**
	 * Indicates that the filter is active and will be taken into account when building the query
	 * @type {Boolean}
	 */
	isEnabled: true,

	/**
	 * Drop the time for the date / time type parameters
	 * @type {Boolean}
	 */
	trimDateTimeParameterToDate: false,

	/**
	 * Data type of the expression
	 * @type {Terrasoft.DataValueType}
	 */
	dataValueType: Terrasoft.DataValueType.TEXT,

	/**
	 * The title of the left side of the expression
	 * @type {String}
	 */
	leftExpressionCaption: "",

	/**
	 * The name of the schema of the object referenced by the left side of the filter, if the reference type column
	 * @type {String}
	 */
	referenceSchemaName: "",

	/**
	 * The filter key in the filter collection {@link Terrasoft.FilterGroup}
	 * @type {String}
	 */
	key: "",

	/**
	 * Creates and initializes the {@link Terrasoft.BaseFilter} object
	 * @param {Object} config Configuration object
	 * @return {Terrasoft.BaseFilter} Returns the created object
	 */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event leftExpressionChange
			 * Is triggered after changing the left side of the filter {@link #setLeftExpression}.
			 * @param {Terrasoft.BaseFilter} filter
			 */
			"leftExpressionChange",
			/**
			 * @event comparisonTypeChange
			 * Is triggered after changing the type of the comparison operation {@link #setComparisonType}.
			 * @param {Terrasoft.BaseFilter} filter
			 */
			"comparisonTypeChange"
		);
		this.setLeftExpression(this.leftExpression);
	},

	/**
	 * Copies the properties for serialization to the serialized object. Implements the mixin interface
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @override
	 * @param {Object} serializableObject Serialized object
	 * @param {Object} serializationInfo Serialization Options
	 */
	getSerializableObject: function(serializableObject, serializationInfo) {
		this.callParent(arguments);
		serializableObject.filterType = this.filterType;
		serializableObject.comparisonType = this.comparisonType;
		serializableObject.isEnabled = this.isEnabled;
		serializableObject.trimDateTimeParameterToDate = this.trimDateTimeParameterToDate;
		serializableObject.leftExpression = this.getSerializableProperty(this.leftExpression);
		if (serializationInfo.serializeFilterManagerInfo) {
			serializableObject.isAggregative = this.isAggregative;
			serializableObject.key = this.key;
			serializableObject.dataValueType = this.dataValueType;
			serializableObject.leftExpressionCaption = this.leftExpressionCaption;
			var referenceSchemaName = this.referenceSchemaName;
			if (!Ext.isEmpty(referenceSchemaName)) {
				serializableObject.referenceSchemaName = referenceSchemaName;
			}
		}
	},

	/**
	 * Check that the filter is full, valid and ready for use.
	 * @protected
	 * @return {Boolean} Returns true if the filter is fully populated and can be applied,
	 * otherwise returns false
	 */
	getIsCompleted: function() {
		return Ext.isObject(this.leftExpression);
	},

	/**
	 * Sets the comparison operation type {@link #leftExpression}
	 * @param {Terrasoft.ComparisonType} comparisonType Type of comparison operation
	 */
	setComparisonType: function(comparisonType) {
		if (this.comparisonType === comparisonType) {
			return;
		}
		this.comparisonType = comparisonType;
		this.fireEvent("comparisonTypeChange", this, this);
	},

	/**
	 * Sets the checked expression {@link #leftExpression}
	 * @param {Terrasoft.data.expressions.ParameterExpression} expression
	 */
	setLeftExpression: function(expression) {
		if (expression) {
			expression.parentFilter = this;
		}
		this.leftExpression = expression;
		this.fireEvent("leftExpressionChange", this, this);
	},

	/**
	 * Returns a reference to the parent filter collection
	 * @return {Terrasoft.FilterGroup} A collection of parent filters
	 */
	getParentFilters: function() {
		return this.parentCollection;
	},

	/**
	 * Returns equality flag of the specified filters.
	 * @returns {Boolean}
	 */
	getIsEquals: function() {
		throw new Terrasoft.NotImplementedException();
	},

	/**
	 * Returns whether the filter is active and will be taken into account when building the query.
	 * @return {Boolean} Is filter active.
	 */
	getIsEnabled: function() {
		return this.isEnabled;
	}

});
