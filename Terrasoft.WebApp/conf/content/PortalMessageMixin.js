Terrasoft.configuration.Structures["PortalMessageMixin"] = {innerHierarchyStack: ["PortalMessageMixin"]};
define("PortalMessageMixin", [], function() {
	/**
	 * @class Terrasoft.configuration.PortalMessageMixin
	 * Utilities for Portal history messages.
	 */
	Ext.define("Terrasoft.configuration.mixins.PortalMessageMixin", {
		alternateClassName: "Terrasoft.PortalMessageMixin",

		/**
		 * @protected
		 */
		getPortalMessageServiceConfig: function() {
			const messageHistoryId = this.$Id;
			const historySchemaName = this.$HistorySchemaName;
			const config = {
				serviceName: "PortalMessageService",
				methodName: "GetPortalMessageAttributes",
				scope: this,
				data: {
					messageHistoryId: messageHistoryId,
					historySchemaName: historySchemaName
				}
			};
			return config;
		},

		/**
		 * Handle service response.
		 * @protected
		 * @param {Object} response Response from service.
		 * @param {Function} callback
		 */
		handlePortalMessageServiceResponse: function(response, callback) {
			Ext.callback(callback, this, [response]);
		},

		/**
		 * Sets up attributes, which must be provided by safe service.
		 * @public
		 * @param {Function} callback
		 */
		setPortalMessageAttributes: function(callback) {
			const config = this.getPortalMessageServiceConfig();
			this.callService(config, function(response) {
				this.handlePortalMessageServiceResponse(response, callback);
			}, this);
		}
	});
}
);


