/**
 * Collection of parameters
 */
Ext.define("Terrasoft.data.filters.Parameters", {
	extend: "Terrasoft.ObjectCollection",
	alternateClassName: "Terrasoft.Parameters",

	/**
  * Element key template for automatic naming
  * @protected
  * @override
  * @type {String}
  */
	itemKeyTemplate: "Param",

	/**
  * Reference to the parent query object
  * @type {Terrasoft.BaseQuery}
  */
	parentQuery: null,

	/**
  * Creates an instance of a parameter
  * @param {Terrasoft.DataValueType} paramDataType Parameter Data Type
  * @param {Mixed} paramValue Parameter value
  * @return {Terrasoft.Parameter} Returns the generated parameter
  */
	createParameter: function(paramDataType, paramValue) {
		return Ext.create("Terrasoft.Parameter", {
			dataValueType: paramDataType,
			value: paramValue
		});
	},

	/**
  * Creates an instance of the parameter and adds it to the collection
  * @param {Terrasoft.DataValueType} paramDataType Parameter Data Type
  * @param {Mixed} paramValue Parameter value
  * @return {Terrasoft.Parameter} Returns the generated parameter
  */
	addParameter: function(paramDataType, paramValue) {
		var parameter = this.createParameter(paramDataType, paramValue);
		this.addItem(parameter);
		return parameter;
	}

});