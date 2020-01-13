Terrasoft.configuration.Structures["CampaignBaseAudienceSchema"] = {innerHierarchyStack: ["CampaignBaseAudienceSchema"]};
define("CampaignBaseAudienceSchema", ["ext-base", "terrasoft", "CampaignBaseAudienceSchemaResources",
	"CampaignElementGroups", "CampaignElementMixin", "CampaignBaseElementSchema"], function(Ext, Terrasoft, resources) {
	/**
	 * @class Terrasoft.manager.CampaignBaseAudienceSchema
	 * Schema of base audience element.
	 */
	Ext.define("Terrasoft.manager.CampaignBaseAudienceSchema", {
		extend: "Terrasoft.CampaignBaseElementSchema",
		alternateClassName: "Terrasoft.CampaignBaseAudienceSchema",

		//region Properties: Protected

		/**
		 * UId of current manager item.
		 */
		managerItemUId: "5950fbc6-22c0-456c-8b0f-35133afdfc8f",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#name
		 */
		name: "Audience",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#caption
		 */
		caption: resources.localizableStrings.BaseAudienceCaption,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
		 */
		group: "Audience",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
		 */
		editPageSchemaName: "CampaignBaseAudiencePropertiesPage",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @protected
		 * @overridden
		 */
		typeName: "Terrasoft.Core.Campaign.CampaignSchemaElement",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#nodeType
		 * @overridden
		 */
		nodeType: Terrasoft.diagram.UserHandlesConstraint.Event,

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			if (!Terrasoft.CampaignElementGroups.Items.contains("Audience")) {
				Terrasoft.CampaignElementGroups.Items.add("Audience", {
					name: "Audience",
					caption: resources.localizableStrings.AudienceElementGroupCaption
				});
			}
			this.callParent(arguments);
		}

		//endregion
	});
	return Terrasoft.CampaignBaseAudienceSchema;
});


