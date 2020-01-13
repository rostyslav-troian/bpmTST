Terrasoft.configuration.Structures["ContentUserBlockEditModule"] = {innerHierarchyStack: ["ContentUserBlockEditModule"]};
/**
 * Module to load ContentUserBlockEditPage.
 */
define("ContentUserBlockEditModule", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.ContentUserBlockEditModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.ContentUserBlockEditModule",

		sandbox: null,
		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#generateViewContainerId
		 * @override
		 */
		generateViewContainerId: false,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @override
		 */
		initSchemaName: function() {
			this.schemaName = "ContentUserBlockEditPage";
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @override
		 */
		initHistoryState: Terrasoft.emptyFn
	});
	return Terrasoft.ContentUserBlockEditModule;
});


