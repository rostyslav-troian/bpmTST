Terrasoft.configuration.Structures["CampaignUpdateObjectSchema"] = {innerHierarchyStack: ["CampaignUpdateObjectSchema"]};
 /**
 * UI schema for update object campaign element.
 */
define("CampaignUpdateObjectSchema", ["CampaignUpdateObjectSchemaResources", "CampaignEnums",
		"CampaignBaseCrudObjectSchema"],
	function(resources, CampaignEnums) {
	/**
	 * @class Terrasoft.manager.CampaignUpdateObjectSchema
	 */
	Ext.define("Terrasoft.manager.CampaignUpdateObjectSchema", {
		extend: "Terrasoft.CampaignBaseCrudObjectSchema",
		alternateClassName: "Terrasoft.CampaignUpdateObjectSchema",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#managerItemUId
		 * @override
		 */
		managerItemUId: "8182fbc6-22c0-456c-8b0f-35133afdfc8a",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#name
		 * @override
		 */
		name: "CampaignUpdateObject",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#caption
		 * @override
		 */
		caption: resources.localizableStrings.Caption,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#TitleImage
		 * @override
		 */
		titleImage: resources.localizableImages.TitleImage,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#LargeImage
		 * @override
		 */
		largeImage: resources.localizableImages.LargeImage,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#SmallImage
		 * @override
		 */
		smallImage: resources.localizableImages.SmallImage,

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
		 * @override
		 */
		editPageSchemaName: "CampaignUpdateObjectPage",

		/**
		 * Type of element.
		 * @type {string}
		 */
		elementType: CampaignEnums.CampaignSchemaElementTypes.UPDATE_OBJECT_ELEMENT,

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @override
		 */
		typeName: "Terrasoft.Configuration.CampaignUpdateObjectElement, Terrasoft.Configuration"
	});
	return Terrasoft.CampaignUpdateObjectSchema;
});


