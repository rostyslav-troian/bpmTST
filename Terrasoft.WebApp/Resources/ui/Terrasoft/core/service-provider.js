/**
 * The transport layer for querying the server.
 */
Ext.define("Terrasoft.core.ServiceProvider", {
	extend: "Terrasoft.BaseServiceProvider",
	alternateClassName: "Terrasoft.ServiceProvider",
	singleton: true,

	/**
	 * @inheritdoc Terrasoft.BaseServiceProvider#serviceUrl
	 * @override
	 */
	serviceUrl: "../DataService/json",

	/**
	 * Portal data service url
	 */
	sspServiceUrl: "../DataService/ssp/json",

	/**
	 * Check if it is need to use PortalDataService.
	 * @private
	 * @return {Boolean} true if need to use PortalDataService, otherwise - false.
	 */
	_getIsNeedToUseSspServiceUrl: function() {
		return Terrasoft.CurrentUser && Terrasoft.isCurrentUserSsp() &&
			Terrasoft.Features.getIsEnabled("UsePortalDataService");
	},

	/**
	 * @inheritdoc Terrasoft.BaseServiceProvider#getRequestUrl
	 * @override
	 */
	getRequestUrl: function(serverMethod) {
		var serviceUrl = this._getIsNeedToUseSspServiceUrl() ? this.sspServiceUrl : this.serviceUrl;
		return Terrasoft.combinePath(serviceUrl, "SyncReply", serverMethod);
	},

	/**
  * Generates an AJAX request parameter object.
  * @private
  * @param {String|Object} serverMethod The name of the service method on the server for the query or query parameters
  * (see {@link Terrasoft.BaseServiceProvider#buildRequest}.
  * @param {Object} data Query data.
  * @param {Function} callback (optional) A function that will be called when a response is received from the server.
  * @param {Object} scope (optional) The context in which the callback function will be called.
  * @return {Object} A configuration object that describes the parameters of the AJAX request.
  */
	buildRequest: function(serverMethod, data, callback, scope) {
		if (Ext.isObject(serverMethod)) {
			return this.callParent(arguments);
		} else {
			var config = {
				serverMethod: serverMethod,
				data: data
			};
			return this.callParent([config, callback, scope]);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseServiceProvider#executeRequest
	 * @override
	 */
	executeRequest: function(serverMethod, data, callback, scope) {
		if (Ext.isObject(serverMethod)) {
			return this.callParent(arguments);
		} else {
			var config = {
				serverMethod: serverMethod,
				data: data
			};
			return this.callParent([config, callback, scope]);
		}
	}
});
