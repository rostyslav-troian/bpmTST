Terrasoft.configuration.Structures["CampaignSchemaViewerModule"] = {innerHierarchyStack: ["CampaignSchemaViewerModule"]};
define("CampaignSchemaViewerModule", ["ext-base", "terrasoft", "BaseModule", "CampaignSchemaViewer"],
		function(Ext, Terrasoft) {
	Ext.define("Terrasoft.configuration.CampaignSchemaViewerModule", {
		alternateClassName: "Terrasoft.CampaignSchemaViewerModule",
		extend: "Terrasoft.BaseModule",

		Ext: null,
		Terrasoft: null,
		sandbox: null,

		/**
		 * Schema designer instance.
		 * @private
		 * @type {Terrasoft.BaseSchemaDesigner}
		 */
		designer: null,

		/**
		 * Initializes campaign schema viewer.
		 */
		init: function() {
			this.initDesigner();
			if (this.renderToId && this.designer && this.designer.schemaUId) {
				this.designer.render({
					renderTo: Ext.get(this.renderToId),
					sandbox: this.sandbox
				});
			}
		},

		/**
		 * Initializes campaign schema viewer instance.
		 */
		initDesigner: function() {
			var viewerConfig = this.sandbox.publish("GetSchemaViewerConfig", null, [this.sandbox.id]);
			this.designer = this.Ext.create("Terrasoft.CampaignSchemaViewer", {
				sandbox: this.sandbox,
				schemaUId: viewerConfig.schemaUId,
				entityId: viewerConfig.entityId,
				entitySchemaUId: viewerConfig.entitySchemaUId
			});
		},

		/**
		 * @overridden
		 * @inheritdoc Terrasoft.BaseObject#onDestroy
		 */
		onDestroy: function() {
			var designer = this.designer;
			if (designer) {
				designer.destroy();
			}
			this.callParent(arguments);
		}
	});
	return Terrasoft.CampaignSchemaViewerModule;
});


