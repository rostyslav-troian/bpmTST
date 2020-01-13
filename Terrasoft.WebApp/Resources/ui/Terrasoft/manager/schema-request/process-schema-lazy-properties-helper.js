/**
 * Lazy properties helper class.
 */
Ext.define("Terrasoft.manager.ProcessSchemaLazyPropertiesHelper", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.ProcessSchemaLazyPropertiesHelper",
	singleton: true,

	/**
	 * Contract name.
	 * @type {String}
	 */
	contractName: "GetLazyPropertiesRequest",

	/**
	 * Request timeout
	 * @type {Number}
	 */
	requestTimeout: 60000000,

	/**
	 * Data provider.
	 */
	dataProvider: Terrasoft.SchemaManagerDataProvider,

	/**
	 * Returns values of lazy load properties.
	 * @param {Object} config Configuration.
	 * @param {String} config.userTaskUId User task schema uId.
	 * @param {String} config.processSchemaUId Process schema uId.
	 * @param {Function} callback Callback.
	 * @param {Object} scope Callback scope.
	 */
	getLazyParameterValues: function(config, callback, scope) {
		var requestConfig = {
			userTaskUId: config.userTaskUId,
			schemaUId: config.processSchemaUId
		};
		this.execute(requestConfig, function(response) {
			var serializedLazyProperties = response.lazyProperties;
			var lazyProperties = {};
			Terrasoft.each(serializedLazyProperties, function(item, uId) {
				lazyProperties[uId] = Terrasoft.decode(item);
			});
			callback.call(scope, lazyProperties, response);
		}, scope);
	},

	/**
	 * Executes service query.
	 * @protected
	 * @param {Object} config Query config.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The callback function scope.
	 */
	execute: function(config, callback, scope) {
		var query = Ext.apply({}, config, {
			contractName: this.contractName,
			requestTimeout: this.requestTimeout,
			responseClassName: "Terrasoft.BaseResponse"
		});
		this.dataProvider.execute(query, callback, scope);
	}

});

