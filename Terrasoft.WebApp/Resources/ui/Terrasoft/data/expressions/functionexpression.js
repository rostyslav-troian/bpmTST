/**
 * A class that describes a functional expression.
 */
Ext.define("Terrasoft.data.expressions.FunctionExpression", {
	extend: "Terrasoft.BaseExpression",
	alternateClassName: "Terrasoft.FunctionExpression",

	/**
  * Type of expression.
  * @type {Terrasoft.ExpressionType}
  */
	expressionType: Terrasoft.ExpressionType.FUNCTION,

	/**
  * The type of the functional expression.
  * @type {Terrasoft.FunctionType}
  */
	functionType: Terrasoft.FunctionType.NONE,

	/**
  * Macro type. Used when {@link #functionType} is a macro.
  * @type {Terrasoft.QueryMacrosType}
  */
	macrosType: Terrasoft.QueryMacrosType.NONE,

	/**
  * Aggregation type.
  * @type {Terrasoft.AggregationType}
  */
	aggregationType: Terrasoft.AggregationType.NONE,

	/**
  * The scope of the aggregating function.
  * @type {Terrasoft.AggregationEvalType}
  */
	aggregationEvalType: Terrasoft.AggregationEvalType.NONE,

	/**
  * Date part type. Used if {@link #functionType} is part of the date.
  * @type {Terrasoft.DatePartType}
  */
	datePartType: Terrasoft.DatePartType.NONE,

	/**
  * The expression to which the function is applied.
  * @type {Terrasoft.BaseExpression/String/Number}
  */
	functionArgument: null,

	/**
  * Copies the properties for serialization to the serialized object. Implements the mixin interface.
  * {@link Terrasoft.Serializable}
  * @protected
  * @override
  * @param {Object} serializableObject Serialized object.
  */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		if (!this.functionType) {
			throw new Terrasoft.InvalidObjectState("FunctionExpression.functionType === NONE");
		}
		serializableObject.functionType = this.functionType;
		if (this.functionArgument) {
			serializableObject.functionArgument = this.getSerializableProperty(this.functionArgument);
		}
		if (this.macrosType) {
			serializableObject.macrosType = this.macrosType;
		}
		if (this.datePartType) {
			serializableObject.datePartType = this.datePartType;
		}
		if (this.aggregationType) {
			serializableObject.aggregationType = this.aggregationType;
		}
		if (this.aggregationEvalType) {
			serializableObject.aggregationEvalType = this.aggregationEvalType;
		}
	}
});
