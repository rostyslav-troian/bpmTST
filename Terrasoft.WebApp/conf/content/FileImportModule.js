Terrasoft.configuration.Structures["FileImportModule"] = {innerHierarchyStack: ["FileImportModule"]};
define("FileImportModule", ["BaseSchemaModuleV2"], function() {
	/**
	 * @class Terrasoft.configuration.FileImportModule
	 * Class FileImportModule is designed to import files.
	 */
	Ext.define("Terrasoft.configuration.FileImportModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.FileImportModule",

		//region Methods: Protected

		/**
		 * @inheritdoc
		 * @overridden
		 */
		initSchemaName: function() {
			this.callParent(arguments);
			if (this.Ext.isEmpty(this.schemaName)) {
				this.schemaName = "FileImportStartPage";
			}
		}

		//endregion

	});
	return Terrasoft.FileImportModule;
});


