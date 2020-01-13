Terrasoft.configuration.Structures["GoogleServiceRequest"] = {innerHierarchyStack: ["GoogleServiceRequest"]};
define("GoogleServiceRequest", ["SocialNetworkServiceRequest"], function() {
	Ext.define("Terrasoft.configuration.social.GoogleServiceRequest", {
		extend: "Terrasoft.SocialNetworkServiceRequest",
		alternateClassName: "Terrasoft.GoogleServiceRequest",

		/**
		 * @inheritdoc Terrasoft.ConfigurationServiceRequest#serviceName
		 * @overridden
		 */
		serviceName: "GoogleService",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#getSerializableObject
		 * @overridden
		 */
		getSerializableObject: function(serializableObject) {
			this.callParent(arguments);
			var request = serializableObject.request = serializableObject.request || {};
			if (this.consumerInfo) {
				request.consumerInfo = this.consumerInfo;
			}
		}
	});
});


