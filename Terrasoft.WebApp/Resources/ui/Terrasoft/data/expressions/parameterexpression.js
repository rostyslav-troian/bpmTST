/**
 * The class that defines the parametric expression
 */
Ext.define("Terrasoft.data.expressions.ParameterExpression", {
	extend: "Terrasoft.data.expressions.BaseExpression",
	alternateClassName: "Terrasoft.ParameterExpression",

	/**
	 * Type of expression
	 * @type {Terrasoft.ExpressionType}
	 */
	expressionType: Terrasoft.ExpressionType.PARAMETER,

	/**
	 * Parameter data type at the time of column initialization
	 * @private
	 * @type {Terrasoft.DataValueType}
	 */
	parameterDataType: Terrasoft.DataValueType.TEXT,

	/**
	 * Parameter value at the time of column initialization
	 * @private
	 * @type {Mixed}
	 */
	parameterValue: null,

	/**
	 * Parameter object reference
	 * @type {Terrasoft.Parameter}
	 */
	parameter: null,

	/**
	 * Reference to the parent filter object
	 * @type {Terrasoft.BaseFilter}
	 */
	parentFilter: null,

	/**
	 * Creates and initializes a {Terrasoft.ParameterExpression} object
	 * @param {Object} config Configuration object
	 * @return {Terrasoft.ParameterExpression} Returns the created object
	 */
	constructor: function() {
		this.callParent(arguments);
		if (this.parameterDataType === undefined) {
			this.parameterDataType = Terrasoft.DataValueType.TEXT;
		}
		this.initParameter(this.parameterValue, this.parameterDataType);
	},

	/**
	 * Handles the parameter change
	 * @private
	 * @param {Terrasoft.Parameter} parameter
	 */
	onParameterChange: function() {
		var parentFilter = this.parentFilter;
		if (parentFilter) {
			var parentFilters = parentFilter.getParentFilters();
			parentFilters.filterChanged(parentFilter);
		}
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
		serializableObject.parameter = this.getSerializableProperty(this.parameter);
	},

	/**
	 * Create and initialize the parameter {@link #parameter}
	 * @protected
	 * @param {Mixed} parameterValue Parameter value
	 * @param {Terrasoft.DataValueType} parameterDataType Parameter data type
	 */
	initParameter: function(parameterValue, parameterDataType) {
		if (this.parameter === null) {
			var parameter = this.parameter = Ext.create("Terrasoft.Parameter", {
				dataValueType: parameterDataType,
				value: parameterValue
			});
			parameter.on("change", this.onParameterChange, this);
		}
	},

	/**
	 * Clears all subscriptions to events and destroys the object.
	 * @override
	 */
	onDestroy: function() {
		var parameter = this.parameter;
		if (parameter) {
			parameter.un("change", this.onParameterChange, this);
			parameter.destroy();
			delete this.parameter;
		}
		this.callParent(arguments);
	}

});
