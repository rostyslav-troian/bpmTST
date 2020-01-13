/**
 * The request class to store the base schema.
 */
Ext.define("Terrasoft.data.queries.BaseSchemaUpdateRequest", {
	extend: "Terrasoft.BaseSchemaRequest",
	alternateClassName: "Terrasoft.BaseSchemaUpdateRequest",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaRequest#responseClassName
	 * @override
	 */
	responseClassName: "Terrasoft.BaseSchemaResponse",

	/**
	 * Schema Id.
	 * @protected
	 * @type {Terrasoft.BaseSchema}
	 */
	schema: null,

	//endregion

	//region Methods: Protected

	/**
	 * Returns schema update data.
	 * @protected
	 * @return {Object} Data for process schema saving.
	 */
	getData: function() {
		return Ext.apply(this.schema, {
			requestTimeout: this.requestTimeout
		});
	},

	//endregion

	//region Methods: Public

	/**
	 * Requests the server and calls the callback function in the scope context, after receiving a response from the server.
	 * @param {Function} callback The function that will be called when a response is received from the server
	 * @param {Object} scope The context in which the callback function is called
	 */
	execute: function(callback, scope) {
		this.validate();
		var config = {
			serverMethod: this.contractName,
			responseClassName: this.responseClassName,
			data: this.getData()
		};
		this.serviceProvider.execute(config, callback, scope);
	}

	//endregion

});
