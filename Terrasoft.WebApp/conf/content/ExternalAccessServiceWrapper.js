Terrasoft.configuration.Structures["ExternalAccessServiceWrapper"] = {innerHierarchyStack: ["ExternalAccessServiceWrapper"]};
define("ExternalAccessServiceWrapper", [], function() {

	/**
	 * Client proxy for external access service.
	 */
	Ext.define("Terrasoft.configuration.ExternalAccessServiceWrapper", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ExternalAccessServiceWrapper",

		externalServiceName: "TempAccessService",

		/**
		 * Calls specified method of external access service.
		 * @private
		 * @param {Object} config An object that contains the service name, method name, data.
		 * @param {Object} config.data Data of the query.
		 * @param {String} config.methodName Method name of the call service.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		_callExternalAccessService: function(config, callback, scope) {
			Terrasoft.ConfigurationServiceProvider.callService({
				serviceName: this.externalServiceName,
				methodName: config.methodName,
				data: config.data
			}, function(responseObject, response) {
				this._processServiceResponse(responseObject, response, callback, scope);
			}.bind(this), scope);
		},

		/**
		 * Processes service response.
		 * @private
		 * @param {Object} responseObject Response of service that provides customer access list.
		 * @param {Object} response Http response provided by ajax provider.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		_processServiceResponse: function(responseObject, response, callback, scope) {
			if (Terrasoft.isEmptyObject(responseObject)) {
				this._logErrorMessage(response);
			}
			if (responseObject.DeactivateAccessesResult && responseObject.DeactivateAccessesResult.accessServerError) {
				this.warning(responseObject.DeactivateAccessesResult.accessServerError);
			}
			callback.call(scope, responseObject);
		},

		/**
		 * Logs error to console based on occurred error.
		 * @private
		 * @param {Object} response Http response provided by ajax provider.
		 */
		_logErrorMessage: function(response) {
			this.error(Ext.String.format("[{0}] {1}", response.status, response.responseText || response.statusText));
		},

		/**
		 * Deactivates specified external accesses.
		 * @param {String[]} accessIds Accesses to deactivate.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		deactivateAccesses: function(accessIds, callback, scope) {
			this._callExternalAccessService({
				methodName: "DeactivateAccesses",
				data: {
					accessIds: accessIds
				}
			}, callback, scope);
		}

	});

	return Ext.create("Terrasoft.ExternalAccessServiceWrapper");
});


