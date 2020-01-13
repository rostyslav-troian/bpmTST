Terrasoft.configuration.Structures["DcmDesigner"] = {innerHierarchyStack: ["DcmDesigner"], structureParent: "SchemaDesigner"};
define("DcmDesigner", ["ext-base", "terrasoft", "SchemaDesigner", "DcmSchemaDesigner"],
	function(Ext, Terrasoft) {
		/**
		 * @class Terrasoft.configuration.DcmDesigner
		 */
		Ext.define("Terrasoft.configuration.DcmDesigner", {
			extend: "Terrasoft.SchemaDesigner",
			alternateClassName: "Terrasoft.DcmDesigner",

			/**
			 * @inheritdoc Terrasoft.SchemaDesigner#parseHash
			 * @overridden
			 */
			parseHash: function(hash) {
				var params = hash.split("/");
				var designer = params[0];
				var schemaId = params[1];
				var dcmSettingsId = params[2];
				var packageUId = params[3];
				return {
					designerName: designer,
					id: (schemaId === "add") ? "" : schemaId,
					dcmSettingsId: dcmSettingsId,
					packageUId: packageUId
				};
			},

			/**
			 * @inheritdoc Terrasoft.SchemaDesigner#initDesigner
			 * @overridden
			 */
			initDesigner: function(config) {
				this.callParent(arguments);
				var params = this.parseHash(config.hash);
				this.designer = Ext.create("Terrasoft.DcmSchemaDesigner", {
					sandbox: this.sandbox,
					schemaUId: params.id,
					dcmSettingsId: params.dcmSettingsId,
					packageUId: params.packageUId
				});
			}
		});

		return Terrasoft.configuration.DcmDesigner;
	}
);


