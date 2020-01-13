Terrasoft.configuration.Structures["CampaignBaseCrudObjectSchema"] = {innerHierarchyStack: ["CampaignBaseCrudObjectSchema"]};
 /**
 * UI schema for base CRUD object campaign element.
 */
define("CampaignBaseCrudObjectSchema", ["CampaignBaseCrudObjectSchemaResources",
		"CampaignBaseElementSchema"],
	function(resources) {
	/**
	 * @class Terrasoft.manager.CampaignBaseCrudObjectSchema
	 */
	Ext.define("Terrasoft.manager.CampaignBaseCrudObjectSchema", {
		extend: "Terrasoft.CampaignBaseElementSchema",
		alternateClassName: "Terrasoft.CampaignBaseCrudObjectSchema",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#managerItemUId
		 * @override
		 */
		managerItemUId: "4582fbc6-22c0-456c-8b0f-35133afdfc8a",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#name
		 * @override
		 */
		name: "CampaignBaseCrudObject",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#caption
		 * @override
		 */
		caption: resources.localizableStrings.Caption,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
		 * @override
		 */
		group: "SystemActions",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
		 * @override
		 */
		editPageSchemaName: null,

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#color
		 * @override
		 */
		color: "#839DC3",

		/**
		 * Entity schema name.
		 * @protected
		 * @type {String}
		 */
		entityName: null,

		/**
		 * @type {Array}
		 */
		columnValues: null,

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @override
		 */
		constructor: function() {
			if (!Terrasoft.CampaignElementGroups.Items.contains("SystemActions")) {
				Terrasoft.CampaignElementGroups.Items.add("SystemActions", {
					name: "SystemActions",
					caption: resources.localizableStrings.SystemActionsGroupCaption
				});
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
		 * @override
		 */
		getSerializableProperties: function() {
			var baseSerializableProperties = this.callParent(arguments);
			return Ext.Array.push(baseSerializableProperties, ["entityName", "columnValues"]);
		}
	});
	return Terrasoft.CampaignBaseCrudObjectSchema;
});


