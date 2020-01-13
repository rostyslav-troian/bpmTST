/**
 * Transport level for core service requests.
 */
Ext.define("Terrasoft.core.CoreServiceProvider", {
	extend: "Terrasoft.BaseServiceProvider",
	alternateClassName: "Terrasoft.CoreServiceProvider",
	singleton: true,

	/**
	 * @inheritdoc Terrasoft.BaseServiceProvider#serviceUrl
	 * @override
	 */
	serviceUrl: "ServiceModel",

	/**
	 * @inheritdoc Terrasoft.BaseServiceProvider#getRequestUrl
	 * @override
	 */
	getRequestUrl: function(serverMethod) {
		return Terrasoft.combinePath(Terrasoft.workspaceBaseUrl, this.serviceUrl, serverMethod);
	}
});