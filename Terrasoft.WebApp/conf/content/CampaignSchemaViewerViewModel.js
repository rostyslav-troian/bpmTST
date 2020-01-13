Terrasoft.configuration.Structures["CampaignSchemaViewerViewModel"] = {innerHierarchyStack: ["CampaignSchemaViewerViewModel"]};
define("CampaignSchemaViewerViewModel", ["CampaignSchemaManager"],
		function() {
	Ext.define("Terrasoft.configuration.CampaignSchemaViewerViewModel", {
		extend: "Terrasoft.Designers.ProcessSchemaDesignerViewModel",
		alternateClassName: "Terrasoft.CampaignSchemaViewerViewModel",

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#schemaManager
		 * @overridden
		 */
		schemaManager: Terrasoft.CampaignSchemaManager,

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#contextHelpCode
		 * @overridden
		 */
		contextHelpCode: "CampaignSectionV2",

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#urlHashPrefix
		 * @overridden
		 */
		urlHashPrefix: "campaign",

		/**
		 * @inheritdoc Terrasoft.model.BaseViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event initializeBadges
				 * Event for initialization of analytics badges.
				 */
				"initializeBadges"
			);
		},

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#onSchemaLoaded
		 * @override
		 */
		onSchemaLoaded: function(schema) {
			this.onSandboxInitialized();
			schema.entityId = this.$EntityId || schema.entityId;
			this.loadItems(schema);
			this.fireEvent("initializeBadges", this);
			this.fireEvent("initialized", this);
		}

	});
});


