/**
  * The class that defines the aggregate expression.
 */
Ext.define("Terrasoft.data.expressions.AggregationQueryExpression", {
	extend: "Terrasoft.BaseExpression",
	alternateClassName: "Terrasoft.AggregationQueryExpression",

	/**
  * Type of expression.
  * @type {Terrasoft.ExpressionType}
  */
	expressionType: Terrasoft.ExpressionType.SUBQUERY,

	/**
  * The type of the functional expression.
  * @type {Terrasoft.FunctionType}
  */
	functionType: Terrasoft.FunctionType.AGGREGATION,

	/**
  * Aggregation type.
  * @type {Terrasoft.AggregationType}
  */
	aggregationType: Terrasoft.AggregationType.NONE,

	/**
  * The path to the column is relative to {@link #rootSchema}.
  * @type {String}
  */
	columnPath: "",

	/**
  * Subquery filters. Can not contain filters with other subqueries.
  * @type {Terrasoft.FilterGroup}
  */
	subFilters: null,

	/**
  * Creates and initializes the {Terrasoft.SubqueryExpression} object.
  * @param {Object} config Configuration object.
  * @return {Terrasoft.AggregationQueryExpression} Returns the created object.
  */
	constructor: function() {
		this.callParent(arguments);
		if (!this.subFilters) {
			this.subFilters = Ext.create("Terrasoft.FilterGroup");
		}
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
		serializableObject.functionType = this.functionType;
		serializableObject.aggregationType = this.aggregationType;
		serializableObject.columnPath = this.columnPath;
		serializableObject.subFilters = this.getSerializableProperty(this.subFilters);
	}
});
