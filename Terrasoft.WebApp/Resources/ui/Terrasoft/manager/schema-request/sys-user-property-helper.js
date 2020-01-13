/**
 * Class for user property get and set requests.
 */
Ext.define("Terrasoft.core.SysUserPropertyHelper", {
	alternateClassName: "Terrasoft.SysUserPropertyHelper",

	singleton: true,

	// region Methods: Private

	/**
	 * Creates parametrized user property request object.
	 * @private
	 * @param config
	 * @returns {Terrasoft.ParametrizedRequest}
	 */
	createUserPropertyRequest: function(config) {
		if (!Ext.isEmpty(config)) {
			return Ext.create("Terrasoft.ParametrizedRequest", config);
		} else {
			throw new Terrasoft.ArgumentNullOrEmptyException({message: "config"});
		}
	},

	// endregion

	// region Methods: Protected

	/**
	 * Executes user property request.
	 * @protected
	 * @param {Terrasoft.ParametrizedRequest} request Request object.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Execution context.
	 */
	execute: function(request, callback, scope) {
		request.execute(function(response) {
			Ext.callback(callback, scope, [response]);
		}, this);
	},

	// endregion

	// region Methods: Public

	/**
	 * Get user property.
	 * @param {Object} config Configuration object for request.
	 * @param {String} config.schemaId User property schema identifier.
	 * @param {String} config.propertyName User property name.
	 * @param {String} config.managerName Manager name.
	 * @param {Function} callback Callback function
	 * @param {Object} scope Callback function context.
	 */
	getProperty: function(config, callback, scope) {
		var request = this.createUserPropertyRequest({
			config: {
				schemaId: config.schemaId,
				propertyName: config.propertyName,
				managerName: config.managerName
			},
			contractName: "GetUserPropertyRequest"
		});
		this.execute(request, callback, scope);
	},

	/**
	 * Get list of user properties.
	 * @param {Object} config Configuration object for request.
	 * @param {String} config.schemaId User property schema identifier.
	 * @param {String} config.managerName Manager name.
	 * @param {Function} callback Callback function
	 * @param {Object} scope Callback function context.
	 */
	getProperties: function(config, callback, scope) {
		var request = this.createUserPropertyRequest({
			config: {
				schemaId: config.schemaId,
				managerName: config.managerName
			},
			contractName: "GetUserPropertiesRequest"
		});
		this.execute(request, callback, scope);

	},

	/**
	 * Set user property.
	 * @param {Object} config Configuration object for request.
	 * @param {String} config.schemaId User property schema identifier.
	 * @param {String} config.propertyName User property name.
	 * @param {String} config.propertyValue User property value.
	 * @param {String} config.managerName Manager name.
	 * @param {Function} callback Callback function
	 * @param {Object} scope Callback function context.
	 */
	setProperty: function(config, callback, scope) {
		var request = this.createUserPropertyRequest({
			config: {
				schemaId: config.schemaId,
				propertyName: config.propertyName,
				propertyValue: config.propertyValue,
				managerName: config.managerName
			},
			contractName: "SetUserPropertyRequest"
		});
		this.execute(request, callback, scope);
	},

	/**
	 * Set list of user properties.
	 * @param {Object} config Configuration object for request.
	 * @param {String} config.schemaId User property schema identifier.
	 * @param {Object} config.propertyCollection User properties collection.
	 * @param {String} config.managerName Manager name.
	 * @param {Function} callback Callback function
	 * @param {Object} scope Callback function context.
	 */
	setProperties: function(config, callback, scope) {
		var request = this.createUserPropertyRequest({
			config: {
				schemaId: config.schemaId,
				propertyCollection: config.propertyCollection,
				managerName: config.managerName
			},
			contractName: "SetUserPropertiesRequest"
		});
		this.execute(request, callback, scope);
	}

	// endregion

});

