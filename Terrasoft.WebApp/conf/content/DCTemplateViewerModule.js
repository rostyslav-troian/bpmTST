Terrasoft.configuration.Structures["DCTemplateViewerModule"] = {innerHierarchyStack: ["DCTemplateViewerModule"]};
define("DCTemplateViewerModule", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.DCTemplateViewerModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.DCTemplateViewerModule",

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
			this.schemaName = "DCTemplateViewerSchema";
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @override
		 */
		initHistoryState: Terrasoft.emptyFn
	});
	return Terrasoft.DCTemplateViewerModule;
});

