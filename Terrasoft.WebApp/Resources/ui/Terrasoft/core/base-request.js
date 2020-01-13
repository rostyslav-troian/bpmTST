/**
 * The class of the base query.
 */
Ext.define("Terrasoft.core.BaseRequest", {
	alternateClassName: "Terrasoft.BaseRequest",
	extend: "Terrasoft.BaseObject",
	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	//region Properties: Public

	/**
	 * Query timeout in milliseconds. The default is 30 seconds.
	 * @type {Number}
	 */
	requestTimeout: 99999999999,

	//endregion

	//region Properties: Protected

	/**
	 * Provider performing queries
	 * @protected
	 */
	serviceProvider: null,

	/**
	 * Web method name.
	 * @protected
	 * @type {String}
	 */
	contractName: null,

	/**
	 * Response query class name.
	 * @protected
	 * @type {String}
	 */
	responseClassName: "Terrasoft.BaseResponse",

	/**
	 * Copies the properties for serialization to the serialized object. Implements the mixin interface.
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @override
	 * @param {Object} serializableObject Serialized object.
	 */
	getSerializableObject: Terrasoft.emptyFn,

	//endregion

	//region Methods: Protected

	/**
	 * Returns the configuration of the request for passing to Terrasoft.BaseRequest#serviceProvider.
	 * @protected
	 * @return {Object} The configuration of the request for passing to Terrasoft.BaseRequest#serviceProvider.
	 */
	getRequestConfig: function() {
		return {
			responseClassName: this.responseClassName,
			serverMethod: this.contractName,
			data: this
		};
	},

	//endregion

	//region Methods: Public

	/**
	 * Performs the request validation..
	 * @return {Boolean} Indicates if the request is valid.
	 */
	validate: function() {
		if (!this.contractName) {
			throw new Terrasoft.NullOrEmptyException({
				message: "contractName"
			});
		}
		return true;
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor.
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.serviceProvider = Terrasoft.ServiceProvider;
	},

	/**
	 * Executes the request to the server, after receiving a response from the server, calls the callback function in the scope context.
	 * @param {Function} callback function that will be called when a response is received from the server.
	 * @param {Object} scope The context in which the callback function is called.
	 */
	execute: function(callback, scope) {
		this.validate();
		const config = this.getRequestConfig();
		this.serviceProvider.execute(config, callback, scope);
	},

	/**
	 * Executes the request to the server, after receiving a response from the server resolves Promise
	 * and returns processed response.
	 * @return {Promise<Object>} Processed result of query execution.
	 */
	executeAsync: function() {
		this.validate();
		const config = this.getRequestConfig();
		return this.serviceProvider.executeAsync(config);
	}

	//endregion

});
