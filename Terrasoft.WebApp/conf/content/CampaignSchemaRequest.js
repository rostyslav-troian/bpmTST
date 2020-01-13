Terrasoft.configuration.Structures["CampaignSchemaRequest"] = {innerHierarchyStack: ["CampaignSchemaRequest"]};
define("CampaignSchemaRequest", ["CampaignSchemaResponse"], function() {
	/**
	 * @class Terrasoft.data.queries.CampaignSchemaRequest
	 * Campaign schema request class.
	 */
	Ext.define("Terrasoft.data.queries.CampaignSchemaRequest", {
		extend: "Terrasoft.BaseSchemaRequest",
		alternateClassName: "Terrasoft.CampaignSchemaRequest",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#contractName
		 * @overridden
		 */
		contractName: "CampaignSchemaRequest",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaRequest#responseClassName
		 * @overridden
		 */
		responseClassName: "Terrasoft.CampaignSchemaResponse"
	});

	return Terrasoft.data.queries.CampaignSchemaRequest;
});


