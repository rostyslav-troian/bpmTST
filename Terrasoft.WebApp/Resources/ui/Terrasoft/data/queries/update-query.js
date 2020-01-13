Ext.ns("Terrasoft.data.queries");

/**
 * Request for data changes
 */
Ext.define("Terrasoft.data.queries.UpdateQuery", {
	extend: "Terrasoft.BaseFilterableQuery",
	alternateClassName: "Terrasoft.UpdateQuery",

	/**
	 * Type of operation with data
	 * @type {Terrasoft.QueryOperationType}
	 */
	operationType: Terrasoft.QueryOperationType.UPDATE,

	/**
	 * A collection of column values for updating entities
	 * @type {Terrasoft.ColumnValues}
	 */
	columnValues: null,

	/**
	 * A parameter indicating the forced saving of the entity on the server, even if the columns are not changed
	 * @type {Boolean}
	 */
	isForceUpdate: false,

	/**
	 * Creates query elements
	 * @protected
	 * @override
	 */
	initQueryItems: function() {
		this.callParent(arguments);
		this.columnValues = Ext.create("Terrasoft.ColumnValues");
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
		serializableObject.columnValues = this.getSerializableProperty(this.columnValues);
		serializableObject.isForceUpdate = this.getSerializableProperty(this.isForceUpdate);
	},

	/**
	 * Adds the value of the {@link Terrasoft.ColumnExpression} column. An instance of the column value is created
	 * and is added to the collection of column values.
	 * @param {String} sourceColumnAlias The alias of the column to be set to
	 * @param {String} columnName The name of the entity column
	 * @return {Terrasoft.ColumnExpression} Returns an instance of the added value-column
	 */
	setColumnValue: function(sourceColumnAlias, columnName) {
		return this.columnValues.setColumnValue(sourceColumnAlias, columnName);
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
		if (!parameterDataType && this.rootSchema) {
			var column = this.rootSchema.getColumnByName(sourceColumnAlias);
			parameterDataType = column.dataValueType;
		}
		return this.columnValues.setParameterValue(sourceColumnAlias, paramValue, parameterDataType);
	},

	/**
	 * Adds a value-function {@link Terrasoft.FunctionExpression}. An instance of the value-function is created and
	 * is added to the column values collection.
	 * @param {String} sourceColumnAlias The alias of the column to set value to
	 * @param {Object} func Function description
	 * @return {Terrasoft.FunctionExpression} Returns an instance of the added value-function
	 */
	setFunctionValue: function(sourceColumnAlias, func) {
		return this.columnValues.setFunctionValue(sourceColumnAlias, func);
	},

	/**
	 * Clears all subscriptions to events and destroys the object.
	 * @override
	 */
	onDestroy: function() {
		this.columnValues.destroy();
		delete this.columnValues;
		this.callParent(arguments);
	}

});