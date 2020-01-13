Terrasoft.configuration.Structures["CampaignSchemaResponse"] = {innerHierarchyStack: ["CampaignSchemaResponse"]};
define("CampaignSchemaResponse", ["CampaignSchema"], function() {
	/**
	 * @class Terrasoft.data.queries.CampaignSchemaResponse
	 * Campaign schema response class.
	 */
	Ext.define("Terrasoft.data.queries.CampaignSchemaResponse", {
		extend: "Terrasoft.BaseSchemaResponse",
		alternateClassName: "Terrasoft.CampaignSchemaResponse",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaResponse#schemaClassName
		 * @overridden
		 */
		schemaClassName: "Terrasoft.CampaignSchema",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaResponse#createSchemaInstance
		 * @overridden
		 */
		createSchemaInstance: function(config) {
			return Terrasoft.SchemaDesignerUtilities.createInstanceByMetaData({
				metaData: config.metaData,
				schemaClassName: this.schemaClassName,
				resources: config.resources
			});
		}
	});

	return Terrasoft.data.queries.CampaignSchemaResponse;
});


