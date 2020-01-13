Terrasoft.configuration.Structures["ConfigurationServiceProvider"] = {innerHierarchyStack: ["ConfigurationServiceProvider"]};
define("ConfigurationServiceProvider", [], function() {
	Ext.define("Terrasoft.configuration.ConfigurationServiceProvider", {
		extend: "Terrasoft.BaseServiceProvider",
		alternateClassName: "Terrasoft.ConfigurationServiceProvider",
		singleton: true,

		/**
		 * @inheritdoc Terrasoft.BaseServiceProvider#prepareResponse
		 * @overridden
		 */
		prepareResponse: function(requestConfig, response) {
			var responseClassName = requestConfig.responseClassName;
			var resultPropertyName = requestConfig.resultPropertyName;
			if (responseClassName && resultPropertyName) {
				var resultPropertyValue = response[resultPropertyName];
				if (resultPropertyValue) {
					return Ext.create(responseClassName, resultPropertyValue);
				}
			}
			return this.callParent(arguments);
		},

		/**
		 * The method calls the web service method with the specified parameters.
		 * @param {Object} config An object that contains the service name, method name, data.
		 * @param {Object} config.data Data of the query.
		 * @param {Boolean} config.encodeData A sign that you need to convert the data into Json.
		 * @param {String} config.serviceName Service name.
		 * @param {String} config.methodName Method name of the call service.
		 * @param {Number} config.timeout Query timeout.
		 * @param {Object} [config.instanceId] ID of the object requester.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope The context of the callback function.
		 * @return {Object} The request object.
		 */
		callService: function(config, callback, scope) {
			var dataSend = config.data || {};
			var jsonData = (config.encodeData === false) ? dataSend : Ext.encode(dataSend);
			var workspaceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
			var requestUrl = Terrasoft.combinePath(workspaceBaseUrl, "rest", config.serviceName,
				config.methodName);
			return Terrasoft.AjaxProvider.request({
				url: requestUrl,
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				jsonData: jsonData,
				callback: function() {
					var success = arguments[1];
					var response = arguments[2];
					var responseObject = success ? Terrasoft.decode(response.responseText) : {};
					callback.call(this, responseObject, response);
				},
				scope: scope || this,
				timeout: Terrasoft.BaseServiceProvider.getRequestTimeout({
					data: {requestTimeout: config.timeout}
				}),
				instanceId: config.instanceId
			});
		}
	});
});


