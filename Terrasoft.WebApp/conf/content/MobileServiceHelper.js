Terrasoft.configuration.Structures["MobileServiceHelper"] = {innerHierarchyStack: ["MobileServiceHelper"]};
/**
 * @class Terrasoft.configuration.service.Helper
 */
Ext.define("Terrasoft.configuration.service.Helper", {
	alternateClassName: "Terrasoft.ServiceHelper",

	statics: {

		/**
		 * @private
		 */
		getServiceUrl: function(serviceName, methodName) {
			var serviceUrl = "rest/" + serviceName + "/";
			return Terrasoft.util.encodeServiceUrl(serviceUrl) + methodName;
		},

		/**
		 * Sends request to service.
		 * @param {Object} config Configuration object.
		 * @param {String} config.serviceName Name of service.
		 * @param {String} config.methodName Method of service.
		 * @param {Object} config.data Data of request body.
		 * @param {Object} config.requestConfig Raw config of request.
		 * @param {Function} config.success The success callback.
		 * @param {Function} config.failure The failure callback.
		 * @param {Object} config.scope The execution scope of the callback functions.
		 */
		issueRequest: function(config) {
			var requestConfig = Ext.mergeIf(config.requestConfig || {}, {
				isCancelable: false,
				method: "POST",
				timeout: Terrasoft.core.enums.WebRequestTimeout.Ajax
			});
			requestConfig.url = this.getServiceUrl(config.serviceName, config.methodName);
			requestConfig.jsonData = config.data;
			requestConfig.success = function(response) {
				var decodedResponse = Ext.JSON.decode(response.responseText, true);
				Ext.callback(config.success, config.scope, [decodedResponse]);
			};
			requestConfig.failure = function(response) {
				var parser = Ext.create("Terrasoft.ServiceResponseParser", response);
				var exception = parser.getServiceFailureException();
				Ext.callback(config.failure, config.scope, [exception]);
			};
			requestConfig.scope = this;
			Terrasoft.RequestManager.issueRequest({
				requestFn: Terrasoft.Ajax.request,
				abortFn: Terrasoft.Ajax.abort,
				requestFnConfig: requestConfig,
				responseToStatusCodeFn: function(response) {
					return response.status;
				},
				scope: Terrasoft.Ajax
			});
		}

	}

});


