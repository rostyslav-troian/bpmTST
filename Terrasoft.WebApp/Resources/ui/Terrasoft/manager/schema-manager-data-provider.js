/**
 * Transport level for obtaining and changing schema data on the server
 */
Ext.define("Terrasoft.core.SchemaManagerDataProvider", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.SchemaManagerDataProvider",
	singleton: true,

	/**
	 * Provider performing requests.
	 * @private
	 */
	serviceProvider: Terrasoft.ServiceProvider,

	/**
	 * Names of web methods for working with schemas.
	 * @private
	 * @type {String []}
	 */
	contractNames: [
		"GetLazyPropertiesRequest",
		"SchemaDesignerRequest",
		"EntitySchema",
		"EntitySchemaRequest",
		"RemoveEntitySchemaRequest",
		"ClientUnitSchemaRequest",
		"ClientUnitSchema",
		"RemoveClientUnitSchemaRequest",
		"ProcessSchema",
		"ProcessSchemaRequest",
		"RemoveProcessSchemaRequest",
		"ProcessSchemaUserTask"
	],

	/**
	 * Query to the server, after receiving a response from the server, calls the callback function in the scope context.
	 * @param {Terrasoft.BaseSchema | Terrasoft.BaseSchemaRequest} query Query for working with data
	 * @param {Function} callback The function that will be called when a response is received from the server
	 * @param {Object} scope The context in which the callback function is called
	 */
	execute: function(query, callback, scope) {
		if (!Ext.Array.contains(this.contractNames, query.contractName)) {
			throw new Terrasoft.ItemNotFoundException();
		}
		var config = {
			serverMethod: query.contractName,
			responseClassName: query.responseClassName,
			data: query
		};
		this.serviceProvider.execute(config, function(response) {
			callback.call(scope, response);
		}, this);
	}

});