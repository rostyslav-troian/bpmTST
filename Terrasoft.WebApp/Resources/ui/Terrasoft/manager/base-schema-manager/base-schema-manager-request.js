/**
 * Base class for the service request of the schema manager.
 */
Ext.define("Terrasoft.manager.BaseSchemaManagerRequest", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.BaseSchemaManagerRequest",

	// region Properties: Protected

	/**
	 * Service name.
	 * @protected
	 * @type {String}
	 */
	serviceName: null,

	/**
	 * Name of the service method.
	 * @protected
	 * @type {String}
	 */
	methodName: null,

	/**
	 * Request timeout.
	 * @type {Number}
	 */
	timeout: 900000000,

	/**
	 * URL parameters.
	 * @type {Object}
	 */
	urlParameters: null,

	//endregion

	// region Methods: Private

	/**
	 * Returns error message from unsuccessful response.
	 * @private
	 * @param {Object} response Response object.
	 */
	getResponseErrorMessage: function(response) {
		return response.errorInfo ? response.errorInfo.toString() : response.statusText;
	},

	/**
	 * Returns request URL.
	 * @private
	 * @return {String} String of the request URL.
	 */
	getRequestUrl: function() {
		var queryString = Ext.isEmpty(this.urlParameters) ? "" : "?" + Ext.Object.toQueryString(this.urlParameters);
		queryString = this.methodName + queryString;
		return Terrasoft.combinePath(Terrasoft.workspaceBaseUrl, this.serviceName, queryString);
	},

	/**
	 * Calls method of the web service with the specified parameters.
	 * @private
	 * @param {Object} config The call parameters.
	 * @param {Object} config.data Data to send.
	 * @param {Boolean} config.encodeData Flag that indicates when to encode data before send.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope Execution context.
	 * @return {Object} Instance of the request.
	 */
	callService: function(config, callback, scope) {
		var dataSend = config.data || {};
		var jsonData = (config.encodeData === false) ? dataSend : Ext.encode(dataSend);
		var requestUrl = this.getRequestUrl();
		return Terrasoft.AjaxProvider.request({
			url: requestUrl,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			method: config.method || "POST",
			jsonData: jsonData,
			callback: callback,
			scope: scope || this,
			timeout: this.timeout
		});
	},

	//endregion

	// region Methods: Protected

	/**
	 * Calls the web service method with the specified parameters.
	 * @protected
	 * @param {Object} config The call parameters.
	 * @param {Object} config.data Data to send.
	 * @param {Boolean} config.encodeData Flag that indicates when to encode data before send.
	 * @param {Function} callback The callback function.
	 * @param {String} callback.data Response data.
	 * @param {Object} scope Execution context.
	 */
	executeRequest: function(config, callback, scope) {
		this.callService(config, function(request, success, response) {
			if (success) {
				var data = Terrasoft.decode(Terrasoft.decode(response.responseText));
				callback.call(scope || this, data);
				return;
			}
			var errorMessage = this.getResponseErrorMessage(response);
			callback.call(scope, null, errorMessage);
		}, this);
	},

	//endregion

	// region Methods: Public

	/**
	 * Calls the web service method.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope Execution context.
	 */
	execute: function(callback, scope) {
		this.executeRequest({}, callback, scope);
	}

	//endregion

});
