/**
 * Filter class of the "Between" type
 */
Ext.define("Terrasoft.data.filters.BetweenFilter", {
	extend: "Terrasoft.BaseFilter",
	alternateClassName: "Terrasoft.BetweenFilter",

	/**
  * Type of filter
  * @type {Terrasoft.FilterType}
  */
	filterType: Terrasoft.FilterType.BETWEEN,

	/**
  * Type of comparison operation
  * @type {Terrasoft.ComparisonType}
  */
	comparisonType: Terrasoft.ComparisonType.BETWEEN,

	/**
  * The initial expression of the filtering range
  * @type {Terrasoft.BaseExpression}
  */
	rightLessExpression: null,

	/**
  * The final expression of the filtering range
  * @type {Terrasoft.BaseExpression}
  */
	rightGreaterExpression: null,

	/**
  * Creates and initializes an object {@link Terrasoft.BetweenFilter}
  * @param {Object} config Configuration object
  * @return {Terrasoft.BetweenFilter} Returns the created object
  */
	constructor: function() {
		this.callParent(arguments);
		this.setRightLessExpression(this.rightLessExpression);
		this.setRightGreaterExpression(this.rightGreaterExpression);
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
		serializableObject.rightLessExpression = this.getSerializableProperty(this.rightLessExpression);
		serializableObject.rightGreaterExpression = this.getSerializableProperty(this.rightGreaterExpression);
	},

	/**
  * Checks if the filter is full, valid and ready for use
  * @protected
  * @override
  * @return {Boolean} Returns true if the filter is fully populated and can be applied,
  * otherwise returns false
  */
	getIsCompleted: function() {
		var result = this.callParent(arguments);
		if (result) {
			var rightLessExpression = this.rightLessExpression;
			result = result && Ext.isObject(rightLessExpression);
			if (rightLessExpression instanceof Terrasoft.ParameterExpression) {
				var lessParameter = rightLessExpression.parameter;
				result = result && !Ext.isEmpty(lessParameter.getValue());
			}
			var rightGreaterExpression = this.rightGreaterExpression;
			result = result && Ext.isObject(rightGreaterExpression);
			if (rightGreaterExpression instanceof Terrasoft.ParameterExpression) {
				var greaterParameter = rightGreaterExpression.parameter;
				result = result && !Ext.isEmpty(greaterParameter.getValue());
			}
		}
		return result;
	},

	/**
  * Sets the initial expression of the filtering range {@link #rightLessExpression}
  * @protected
  * @param {Terrasoft.BaseExpression} expression
  */
	setRightLessExpression: function(expression) {
		if (expression) {
			expression.parentFilter = this;
		}
		this.rightLessExpression = expression;
	},

	/**
  * Sets the final expression of the filtering range {@link #rightGreaterExpression}
  * @protected
  * @param {Terrasoft.BaseExpression} expression
  */
	setRightGreaterExpression: function(expression) {
		if (expression) {
			expression.parentFilter = this;
		}
		this.rightGreaterExpression = expression;
	}

});