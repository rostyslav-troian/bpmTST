Terrasoft.configuration.Structures["ProcessSettingsModule"] = {innerHierarchyStack: ["ProcessSettingsModule"]};
define("ProcessSettingsModule", ["BaseSchemaModuleV2", "css!ProcessSettingsModule"], function() {
	Ext.define("Terrasoft.configuration.ProcessSettingsModule", {
		alternateClassName: "Terrasoft.ProcessSettingsModule",
		extend: "Terrasoft.BaseSchemaModule",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "ProcessSettingsPage";
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @overridden
		 */
		initHistoryState: Ext.emptyFn
	});
	return Terrasoft.ProcessSettingsModule;
});


