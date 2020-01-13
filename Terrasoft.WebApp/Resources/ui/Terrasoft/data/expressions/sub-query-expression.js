/**
 * The class that defines the parametric expression
 */
Ext.define('Terrasoft.data.expressions.SubQueryExpression', {
	extend: 'Terrasoft.BaseExpression',
	alternateClassName: 'Terrasoft.SubQueryExpression',

	/**
	 * Type of expression
	 * @type {Terrasoft.ExpressionType}
	 */
	expressionType: Terrasoft.ExpressionType.SUBQUERY,

	/**
	 * Aggregation type
	 * @type {Terrasoft.AggregationType}
	 */
	aggregationType: Terrasoft.AggregationType.NONE,

	/**
	 * The path to the column is relative to {@link #rootSchema}.
	 * @type {String}
	 */
	columnPath: '',

	/**
	 * Sub-query filters. Can not contain filters with other sub-queries.
	 * @type {Terrasoft.FilterGroup}
	 */
	subFilters: null,

	/**
	 * Creates and initializes an object {Terrasoft.SubQueryExpression}
	 * @param {Object} config Configuration object
	 * @return {Terrasoft.SubQueryExpression} Returns the created object
	 */
	constructor: function() {
		this.callParent(arguments);
		this.subFilters = this.subFilters || Ext.create("Terrasoft.FilterGroup");
	},

	/**
	 * Copies the properties for serialization to the serialized object. Implements the mixin interface
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @override
	 * @param {Object} serializableObject Serialized object
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.aggregationType = this.aggregationType;
		serializableObject.columnPath = this.columnPath;
		if (this.subFilters.getCount() > 0) {
			serializableObject.subFilters = this.getSerializableProperty(this.subFilters);
		} else {
			serializableObject.subFilters = null;
		}
	}

});