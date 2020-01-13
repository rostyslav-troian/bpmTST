/**
 * The class that defines the parameter column
 */
Ext.define('Terrasoft.data.columns.ParameterQueryColumn', {
	extend: 'Terrasoft.BaseQueryColumn',
	alternateClassName: 'Terrasoft.ParameterQueryColumn',

	/**
  * Parameter value at the time of column initialization
  * @private
  * @type {Mixed}
  */
	parameterValue: null,

	/**
  * Parameter data type at the time of column initialization
  * @private
  * @type {Terrasoft.DataValueType}
  */
	parameterDataType: Terrasoft.DataValueType.TEXT,

	/**
  * Initialize the internal representation of the column, create {@link #expression} from the configuration
  * object.
  * @protected
  * @override
  */
	initExpression: function() {
		this.callParent(arguments);
		this.expression = Ext.create('Terrasoft.ParameterExpression', {
			parameterDataType: this.parameterDataType,
			parameterValue: this.parameterValue
		});
	},

	/**
  * Set the parent collection for an item
  * @protected
  * @override
  * @param {Terrasoft.ObjectCollection} parentCollection Parent Collection
  */
	setParentCollection: function(parentCollection) {
		this.callParent(arguments);
		if (parentCollection) {
			var parentQuery = parentCollection.parentQuery;
			if (parentQuery) {
				var parameters = parentQuery.parameters;
				parameters.addItem(this.expression.parameter);
			}
		}
	}

});