/**
 * The class defining the function column.
 */
Ext.define("Terrasoft.data.columns.FunctionQueryColumn", {
	extend: "Terrasoft.BaseQueryColumn",
	alternateClassName: "Terrasoft.FunctionQueryColumn",

	/**
  * The type of the functional expression passed for initialization.
  * @private
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
  * Part of the date. Used if {@link #functionType} is part of the date.
  * @type {Terrasoft.DatePartType}
  */
	datePartType: Terrasoft.DatePartType.NONE,

	/**
  * The path to the column is relative to {@link #rootSchema}.
  * @type {String}
  */
	columnPath: "",

	/**
  * Auxiliary variable for the macro.
  * @type {String/Number}
  */
	macrosValue: null,

	/**
  * The expression to which the function is applied.
  * @type {Terrasoft.BaseExpression/String/Number}
  */
	functionArgument: null,

	/**
  * Initialize the internal representation of the column, create {@link #expression} from the configuration
  * object.
  * @protected
  * @override
  */
	initExpression: function() {
		this.callParent(arguments);
		if (this.functionArgument === null) {
			if (!Ext.isEmpty(this.columnPath)) {
				this.functionArgument = Ext.create("Terrasoft.ColumnExpression", {
					columnPath: this.columnPath
				});
			} else if (this.macrosValue !== null) {
				this.functionArgument = Ext.create("Terrasoft.ParameterExpression", {
					parameterValue: this.macrosValue
				});
			}
		}
		this.expression = Ext.create("Terrasoft.FunctionExpression", {
			functionType: this.functionType,
			macrosType: this.macrosType,
			datePartType: this.datePartType,
			aggregationType: this.aggregationType,
			aggregationEvalType: this.aggregationEvalType,
			functionArgument: this.functionArgument
		});
	}
});
