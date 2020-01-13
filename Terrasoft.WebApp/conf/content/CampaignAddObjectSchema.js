Terrasoft.configuration.Structures["CampaignAddObjectSchema"] = {innerHierarchyStack: ["CampaignAddObjectSchema"]};
 /**
 * UI schema for add object campaign element.
 */
define("CampaignAddObjectSchema", ["CampaignAddObjectSchemaResources", "CampaignEnums",
		"CampaignBaseCrudObjectSchema"],
	function(resources, CampaignEnums) {
	/**
	 * @class Terrasoft.manager.CampaignAddObjectSchema
	 */
	Ext.define("Terrasoft.manager.CampaignAddObjectSchema", {
		extend: "Terrasoft.CampaignBaseCrudObjectSchema",
		alternateClassName: "Terrasoft.CampaignAddObjectSchema",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#managerItemUId
		 * @override
		 */
		managerItemUId: "62e4fbc6-22c0-456c-8b0f-35133afdfc8a",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#name
		 * @override
		 */
		name: "CampaignAddObject",

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
		editPageSchemaName: "CampaignAddObjectPage",

		/**
		 * Type of element.
		 * @type {String}
		 */
		elementType: CampaignEnums.CampaignSchemaElementTypes.ADD_OBJECT_ELEMENT,

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @override
		 */
		typeName: "Terrasoft.Configuration.CampaignAddObjectElement, Terrasoft.Configuration"
	});
	return Terrasoft.CampaignAddObjectSchema;
});


