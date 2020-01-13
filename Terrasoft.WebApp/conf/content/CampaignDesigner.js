Terrasoft.configuration.Structures["CampaignDesigner"] = {innerHierarchyStack: ["CampaignDesigner"], structureParent: "SchemaDesigner"};
define("CampaignDesigner", ["ext-base", "terrasoft", "css!CampaignDesignerCSS",
		"SchemaDesigner", "CampaignSchemaDesigner"],
	function(Ext, Terrasoft) {
		/**
		 * @class Terrasoft.configuration.CampaignDesigner
		 */
		Ext.define("Terrasoft.configuration.CampaignDesigner", {
			extend: "Terrasoft.SchemaDesigner",
			alternateClassName: "Terrasoft.CampaignDesigner",

			/**
			 * @inheritdoc Terrasoft.SchemaDesigner#parseHash
			 * @override
			 */
			parseHash: function(hash) {
				var params = hash.split("/");
				var designer = params[0];
				var schemaUId = params[1];
				var entityId = params[2];
				var entitySchemaUId = params[3];
				return {
					designerName: designer,
					schemaUId: (schemaUId === "add") ? "" : schemaUId,
					entityId: entityId,
					entitySchemaUId: entitySchemaUId
				};
			},

			/**
			 * @inheritdoc Terrasoft.SchemaDesigner#initDesigner
			 * @overridden
			 */
			initDesigner: function(config) {
				this.callParent(arguments);
				var params = this.parseHash(config.hash);
				this.designer = this.Ext.create("Terrasoft.CampaignSchemaDesigner", {
					sandbox: this.sandbox,
					schemaUId: params.schemaUId,
					entityId: params.entityId,
					entitySchemaUId: params.entitySchemaUId
				});
			}
		});

		return Terrasoft.configuration.CampaignDesigner;
	}
);


