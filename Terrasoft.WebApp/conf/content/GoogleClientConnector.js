Terrasoft.configuration.Structures["GoogleClientConnector"] = {innerHierarchyStack: ["GoogleClientConnector"]};
define("GoogleClientConnector", ["BaseClientConnector", "GoogleServiceRequest"], function() {
	/**
	 * @class Terrasoft.configuration.social.GoogleClientConnector
	 * Class implements working with social network Google on client.
	 */
	Ext.define("Terrasoft.configuration.social.GoogleClientConnector", {
		extend: "Terrasoft.configuration.social.BaseClientConnector",
		alternateClassName: "Terrasoft.GoogleClientConnector",

		//region Methods: Private

		/**
		 * Gets consumer information.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 * @private
		 */
		doRequest: function(callback, scope) {
			var request = this.getServiceRequest({
				className: "Terrasoft.GoogleServiceRequest",
				contractName: "GetConsumerInfo",
				serviceName: "GoogleService"
			});
			request.execute(function(response) {
				callback.call(scope, response);
			}, this);
		}

		//endregion

	});
});


