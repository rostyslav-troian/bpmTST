Ext.ns('Terrasoft.data.query');

/**
 * A collection of query column values
 */
Ext.define('Terrasoft.data.query.ColumnValues', {
	extend: 'Terrasoft.ObjectCollection',
	alternateClassName: 'Terrasoft.ColumnValues',

	/**
  * Adds the value of the {@link Terrasoft.ColumnExpression} column. An instance of the column value is created
  * and is added to the collection of column values.
  * @param {String} sourceColumnAlias The alias of the column to be set to
  * @param {String} columnName The name of the entity column
  * @return {Terrasoft.ColumnExpression} Returns an instance of the added value-column
  */
	setColumnValue: function(sourceColumnAlias, columnName) {
		var columnValue = Ext.create('Terrasoft.ColumnExpression', {columnPath: columnName});
		this.add(sourceColumnAlias, columnValue);
		return columnValue;
	},

	/**
  * Adds the value of the {@link Terrasoft.ParameterExpression} parameter. An instance of the value-parameter is created and
  * is added to the column values collection.
  * @param {String} sourceColumnAlias The alias of the column to set value in
  * @param {Mixed} paramValue The value of the parameter. The value must match the data type.
  * @param {Terrasoft.DataValueType} parameterDataType The type of the given parameter value.
  * @return {Terrasoft.ParameterExpression} Returns an instance of the added value-parameter
  */
	setParameterValue: function(sourceColumnAlias, paramValue, parameterDataType) {
		if (!Ext.isNumber(parameterDataType)) {
			throw new Terrasoft.exceptions.ArgumentNullOrEmptyException({
				argumentName: "parameterDataType"
			});
		}
		var parameterValue = Ext.create('Terrasoft.ParameterExpression', {
			parameterValue: paramValue,
			parameterDataType: parameterDataType
		});
		// TODO: #178879 NUI (ESQ): ########## ParameterExpression:
		// ## ###### ####### ###### ## ######## ## ######## ESQ.Parameters
		// this.parentQuery.parameters.addItem(parameterValue.parameter);
		this.add(sourceColumnAlias, parameterValue);
		return parameterValue;
	},

	/**
  * Adds a value-function {@link Terrasoft.FunctionExpression}. An instance of the value-function is created and
  * is added to the column values collection.
  * @param {String} sourceColumnAlias The alias of the column to set value to
  * @param {Object} func Function description
  * @return {Terrasoft.FunctionExpression} Returns an instance of the added value-function
  */
	setFunctionValue: function(sourceColumnAlias, func) {
		var functionValue = Ext.create('Terrasoft.FunctionExpression', func);
		this.add(sourceColumnAlias, functionValue);
		return functionValue;
	}

});