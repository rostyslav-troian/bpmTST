Terrasoft.configuration.Structures["CampaignValidateRequest"] = {innerHierarchyStack: ["CampaignValidateRequest"]};
define("CampaignValidateRequest", ["CampaignValidationResponse"], function() {
	/**
	 * @class Terrasoft.data.queries.CampaignValidateRequest
	 * Campaign schema validate request class.
	 */
	Ext.define("Terrasoft.data.queries.CampaignValidateRequest", {
		extend: "Terrasoft.BaseSchemaUpdateRequest",
		alternateClassName: "Terrasoft.CampaignValidateRequest",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#contractName
		 * @overridden
		 */
		contractName: "CampaignValidateRequest",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaRequest#responseClassName
		 * @overridden
		 */
		responseClassName: "Terrasoft.CampaignValidationResponse",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaUpdateRequest#getData
		 * @overridden
		 */
		getData: function() {
			var schema = this.schema;
			var resources = {};
			schema.getLocalizableValues(resources);
			return {
				metaData: schema.serialize(),
				resources: resources,
				uId: schema.uId,
				requestTimeout: this.requestTimeout,
				changedItems: schema.changedItems
			};
		}
	});
	return Terrasoft.CampaignValidateRequest;
});


