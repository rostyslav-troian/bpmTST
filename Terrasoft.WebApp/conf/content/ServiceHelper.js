Terrasoft.configuration.Structures["ServiceHelper"] = {innerHierarchyStack: ["ServiceHelper"]};
define("ServiceHelper", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {

	/**
	 * Calls specified web-service method.
	 * @param {String|Object} config Service name or configuration object containing call parameters.
	 * @param {String} methodName Method name.
	 * @param {Function} callback (optional) Callback function.
	 * @param {Object} data (optional) Object containing request data.
	 * @param {Object} scope (optional) Callback function execution context.
	 * @param {String} requestId (optional) Request unique identifier.
	 * @return {Object} Request instance.
	 */
	function internalCallService(config, methodName, callback, data, scope, requestId) {
		var serviceName;
		if (config && Ext.isObject(config)) {
			serviceName = config.serviceName;
			methodName = config.methodName;
			callback = config.callback;
			data = config.data;
			scope = config.scope;
			requestId = config.requestId;
		} else {
			serviceName = config;
		}
		var dataSend = data || {};
		var workspaceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
		var requestUrl = workspaceBaseUrl + "/rest/" + serviceName + "/" + methodName;
		var requestConfig = {
			url: requestUrl,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			jsonData: Ext.encode(dataSend),
			instanceId: requestId,
			callback: function(request, success, response) {
				if (!callback) {
					return;
				}
				var responseObject = response;
				if (success) {
					responseObject = Terrasoft.decode(response.responseText);
				}
				callback.call(this, responseObject, success);
			},
			scope: scope || this
		};
		if (config && config.timeout) {
			requestConfig.timeout = config.timeout;
		}
		return Terrasoft.AjaxProvider.request(requestConfig);
	}

	return {
		callService: internalCallService
	};
});


