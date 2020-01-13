Terrasoft.configuration.Structures["MacrosHelperServiceRequest"] = {innerHierarchyStack: ["MacrosHelperServiceRequest"]};
define("MacrosHelperServiceRequest", ["ConfigurationServiceRequest"], function() {
	Ext.define("Terrasoft.configuration.MacrosHelperServiceRequest", {
		extend: "Terrasoft.ConfigurationServiceRequest",
		alternateClassName: "Terrasoft.MacrosHelperServiceRequest",

		/**
		 * Entity record identifier.
		 * @type {Terrasoft.GUID}
		 */
		entityId: null,

		/**
		 * Entity name.
		 * @type {String}
		 */
		entityName: null,

		/**
		 * Email template.
		 * @type {String}
		 */
		textTemplate: null,

		/**
		 * Email template identifier.
		 * @type {Guid}
		 */
		templateId: null,

		/**
		 * @inheritdoc Terrasoft.ConfigurationServiceRequest#serviceName
		 * @overridden
		 */
		serviceName: "MacrosHelperService",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#getSerializableObject
		 * @overridden
		 */
		getSerializableObject: function(serializableObject) {
			this.callParent(arguments);
			var request = serializableObject.request = serializableObject.request || {};
			if (this.entityId) {
				request.entityId = this.entityId;
			}
			if (this.entityName) {
				request.entityName = this.entityName;
			}
			if (this.textTemplate) {
				request.textTemplate = this.textTemplate;
			}
			if (this.templateId) {
				request.templateId = this.templateId;
			}
		}

	});
});


