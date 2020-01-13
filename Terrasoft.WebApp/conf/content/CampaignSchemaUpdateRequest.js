Terrasoft.configuration.Structures["CampaignSchemaUpdateRequest"] = {innerHierarchyStack: ["CampaignSchemaUpdateRequest"]};
define("CampaignSchemaUpdateRequest", [], function() {
	/**
	 * @class Terrasoft.data.queries.CampaignSchemaUpdateRequest
	 * Campaign schema update request class.
	 */
	Ext.define("Terrasoft.data.queries.CampaignSchemaUpdateRequest", {
		extend: "Terrasoft.BaseSchemaUpdateRequest",
		alternateClassName: "Terrasoft.CampaignSchemaUpdateRequest",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#contractName
		 * @overridden
		 */
		contractName: "ContractCampaignSchema",

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
	return Terrasoft.CampaignSchemaUpdateRequest;
});


