Terrasoft.configuration.Structures["CampaignBaseCommunicationSchema"] = {innerHierarchyStack: ["CampaignBaseCommunicationSchema"]};
define("CampaignBaseCommunicationSchema", ["ext-base", "terrasoft", "CampaignBaseCommunicationSchemaResources",
	"CampaignElementGroups", "CampaignBaseElementSchema"], function(Ext, Terrasoft, resources) {
	/**
	 * @class Terrasoft.manager.CampaignBaseCommunicationSchema
	 * Schema of base audience element.
	 */
	Ext.define("Terrasoft.manager.CampaignBaseCommunicationSchema", {
		extend: "Terrasoft.CampaignBaseElementSchema",
		alternateClassName: "Terrasoft.CampaignBaseCommunicationSchema",

		//region Properties: Protected

		/**
		 * UId of current manager item.
		 */
		managerItemUId: "5790fbc6-22c0-456c-8b0f-35133afdfc8f",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#name
		 */
		name: "Communication",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#caption
		 */
		caption: resources.localizableStrings.BaseCommunicationCaption,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
		 */
		group: "Communication",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
		 */
		editPageSchemaName: "CampaignBaseCommunicationPropertiesPage",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @protected
		 * @overridden
		 */
		typeName: "Terrasoft.Core.Campaign.FlowElement",

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			if (!Terrasoft.CampaignElementGroups.Items.contains("Communication")) {
				Terrasoft.CampaignElementGroups.Items.add("Communication", {
					name: "Communication",
					caption: resources.localizableStrings.CommunicationElementCaption
				});
			}
			this.callParent(arguments);
		}

		//endregion
	});
	return Terrasoft.CampaignBaseCommunicationSchema;
});


