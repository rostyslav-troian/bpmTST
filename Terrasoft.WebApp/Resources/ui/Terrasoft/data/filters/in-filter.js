/**
 * In-Filter Class
 */
Ext.define("Terrasoft.data.filters.InFilter", {
	extend: "Terrasoft.data.filters.BaseFilter",
	alternateClassName: "Terrasoft.InFilter",

	/**
  * Type of filter
  * @type {Terrasoft.FilterType}
  */
	filterType: Terrasoft.FilterType.IN,

	/**
  * Type of comparison operation
  * @type {Terrasoft.ComparisonType}
  */
	comparisonType: Terrasoft.ComparisonType.EQUAL,

	/**
  * An array of expressions that will be compared with {@link #leftExpression}
  * @type {Terrasoft.BaseExpression[]}
  */
	rightExpressions: null,

	//region Constructors: Public

	/**
  * Creates and initializes the {@link Terrasoft.FilterGroup} object
  * @param {Object} config Configuration object
  * @return {Terrasoft.FilterGroup} Returns the created object
  */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
    * @event rightExpressionsChange
    * Is triggered after changing the right part of the filter{@link #setRightExpressions}.
    * @param {Object} filter
    */
			"rightExpressionsChange"
		);
		this.setRightExpressions(this.rightExpressions);
	},

	//endregion

	//region Methods: Private

	/**
	 * Returns equality flag of the specified filters left expression.
	 * @private
	 * @param {Terrasoft.ColumnExpression} source Source column expression.
	 * @param {Terrasoft.ColumnExpression} target Target column expression.
	 * @returns {Boolean}
	 */
	getIsFilterLeftExpressionEquals: function(source, target) {
		if (Terrasoft.isEmptyObject(source) && Terrasoft.isEmptyObject(target)) {
			return true;
		}
		var result = source.expressionType === target.expressionType;
		result = result && source.columnPath === target.columnPath;
		return result;
	},

	/**
	 * Returns filter expression primary values list.
	 * @private
	 * @param {Array} expression List of filter expressions.
	 * @returns {Array}
	 */
	getFilterExpressionParameterValueMap: function(expression) {
		if (!expression) {
			return [];
		}
		return expression.map(function(item) {
			var parameterValue = item.parameter.value;
			if (Ext.isObject(parameterValue)) {
				return parameterValue.value;
			} else {
				return parameterValue;
			}
		});
	},

	/**
	 * Returns equality flag of the specified filters right expression.
	 * @private
	 * @param {Terrasoft.ColumnExpression} source Source column expression.
	 * @param {Terrasoft.ColumnExpression} target Target column expression.
	 * @returns {boolean}
	 */
	getIsFilterRightExpressionEquals: function(source, target) {
		source = this.getFilterExpressionParameterValueMap(source);
		target = this.getFilterExpressionParameterValueMap(target);
		if (source.length === 0 && target.length === 0) {
			return true;
		}
		return Terrasoft.some(source, function(parameter) {
			return Terrasoft.contains(target, parameter);
		}, this);
	},

	//endregion

	//region Methods: Protected

	/**
  * Copies the properties for serialization to the serialized object. Implements the mixin interface
  * {@link Terrasoft.Serializable}
  * @protected
  * @override
  * @param {Object} serializableObject Serialized object
  */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		var serializedExpressions = serializableObject.rightExpressions = [];
		var rightExpressions = this.rightExpressions;
		if (rightExpressions && rightExpressions.length > 0) {
			Terrasoft.each(rightExpressions, function(expression) {
				serializedExpressions.push(this.getSerializableProperty(expression));
			}, this);
		}
	},

	/**
  * Checks if the filter is full, valid and ready for use.
  * @protected
  * @override
  * @return {Boolean} Returns true if the filter is fully populated and can be applied,
  * otherwise false
  */
	getIsCompleted: function() {
		var result = this.callParent(arguments);
		if (result) {
			var rightExpressions = this.rightExpressions;
			result = Ext.isArray(rightExpressions);
			if (result) {
				// TODO: #CRM-34682 - ########, ###### ######### ###### ###### ####### #######.



				var rightExpression = rightExpressions[0];
				result = Ext.isObject(rightExpression);
				if (rightExpression instanceof Terrasoft.ParameterExpression) {
					var parameter = rightExpression.parameter;
					// TODO: #CRM-34683 - ########, ###### ######## ## ######### ######## # ###### #######.



					result = result && !Ext.isEmpty(parameter.getValue());
				}
			}
		}
		return result;
	},

	/**
  * An array of {@link #rightExpressions} expressions that will be compared to {@link #leftExpression}
  * @throws {Terrasoft.UnsupportedTypeException}
  * If rightExpressions is not an array, an exception is thrown
  * @param {Terrasoft.BaseExpression[]} rightExpressions Expression
  */
	setRightExpressions: function(rightExpressions) {
		if (rightExpressions && !Ext.isArray(rightExpressions)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		Terrasoft.each(rightExpressions, function(expression) {
			expression.parentFilter = this;
		}, this);
		this.rightExpressions = rightExpressions;
		this.fireEvent("rightExpressionsChange", this, this);
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.data.filters.BaseFilter#getIsEquals
	 * @override
	 */
	getIsEquals: function(filter) {
		var result = !!filter;
		result = result && filter instanceof Terrasoft.InFilter;
		result = result && this.isNull === filter.isNull;
		result = result && this.isEnabled === filter.isEnabled;
		result = result && this.filterType === filter.filterType;
		result = result && this.dataValueType === filter.dataValueType;
		result = result && this.comparisonType === filter.comparisonType;
		result = result && this.referenceSchemaName === filter.referenceSchemaName;
		result = result && this.getIsFilterLeftExpressionEquals(this.leftExpression, filter.leftExpression);
		// TODO: #CRM-34699 - ########## ##### ####### ### ##### DCM, #.#. ######### ###### #########,

		// ### ## ########### # ###### ########## #### ########.



		result = result && this.getIsFilterRightExpressionEquals(this.rightExpressions, filter.rightExpressions);
		return result;
	}

	//endregion

});
