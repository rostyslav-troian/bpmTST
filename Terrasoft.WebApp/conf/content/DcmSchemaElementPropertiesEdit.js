Terrasoft.configuration.Structures["DcmSchemaElementPropertiesEdit"] = {innerHierarchyStack: ["DcmSchemaElementPropertiesEdit"], structureParent: "ProcessSchemaElementPropertiesEditCSS"};
define("DcmSchemaElementPropertiesEdit", ["ProcessSchemaElementPropertiesEdit",
		"DcmSchemaElementPropertiesPageBuilder"],
	function() {

		/**
		 * @class Terrasoft.ProcessDesigner.DcmSchemaElementPropertiesEdit
		 * Class properties editing card module.
		 */
		Ext.define("Terrasoft.ProcessDesigner.DcmSchemaElementPropertiesEdit", {
			alternateClassName: "Terrasoft.DcmSchemaElementPropertiesEdit",
			extend: "Terrasoft.ProcessSchemaElementPropertiesEdit",

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#generateSchemaStructure
			 * @protected
			 * @overridden
			 */
			generateSchemaStructure: function() {
				this.schemaBuilder = Ext.create("Terrasoft.DcmSchemaElementPropertiesPageBuilder");
				this.callParent(arguments);
			}
		});

		return Terrasoft.DcmSchemaElementPropertiesEdit;
	});


