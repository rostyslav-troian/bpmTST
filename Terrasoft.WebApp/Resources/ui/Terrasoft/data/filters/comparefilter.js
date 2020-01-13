/**
 * Comparison filter class
 */
Ext.define("Terrasoft.data.filters.CompareFilter", {
	extend: "Terrasoft.BaseFilter",
	alternateClassName: "Terrasoft.CompareFilter",

	/**
	 * Type of filter.
	 * @type {Terrasoft.FilterType}
	 */
	filterType: Terrasoft.FilterType.COMPARE,

	/**
	 * Filter expression.
	 * @type {Terrasoft.BaseExpression}
	 */
	rightExpression: null,

	/**
	 * Creates and initializes the {@link Terrasoft.CompareFilter} object.
	 */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
		 	* @event rightExpressionChange
		 	* Is triggered after changing the right part of the filter {@link #setRightExpression}.
		 	* @param {Terrasoft.BaseExpression} filter
		 	*/
			"rightExpressionChange"
		);
		this.setRightExpression(this.rightExpression);
	},

	/**
	 * Copies the properties for serialization to the serialized object. Implements the mixin interface.
	 * {@link Terrasoft.Serializable}.
	 * @protected
	 * @override
	 * @param {Object} serializableObject Serialized object.
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		if (this.leftExpression && this.leftExpression.datePartType &&
				this.leftExpression.datePartType !== Terrasoft.DatePartType.NONE) {
			serializableObject.leftExpression.datePartType = this.leftExpression.datePartType;
		}
		serializableObject.rightExpression = this.getSerializableProperty(this.rightExpression);
	},

	/**
	 * Check that the filter is full, valid and ready for use.
	 * @protected
	 * @override
	 * @return {Boolean} Returns true if the filter is fully populated and can be applied,
	 * otherwise returns false.
	 */
	getIsCompleted: function() {
		var result = this.callParent(arguments);
		if (result) {
			var rightExpression = this.rightExpression;
			result = result && Ext.isObject(rightExpression);
			if (rightExpression instanceof Terrasoft.ParameterExpression) {
				var parameter = rightExpression.parameter;
				result = result && !Ext.isEmpty(parameter.getValue());
			}
		}
		return result;
	},

	/**
	 * Sets the filter expression {@link #rightExpression}.
	 * @param {Terrasoft.BaseExpression} expression Filter expression.
	 */
	setRightExpression: function(expression) {
		if (expression) {
			expression.parentFilter = this;
		}
		this.rightExpression = expression;
		this.fireEvent("rightExpressionChange", this, this);
	}

});
