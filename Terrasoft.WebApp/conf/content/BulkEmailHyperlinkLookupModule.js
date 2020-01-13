Terrasoft.configuration.Structures["BulkEmailHyperlinkLookupModule"] = {innerHierarchyStack: ["BulkEmailHyperlinkLookupModule"]};
/**
 * Module to load BulkEmailHyperlinkLookupPage.
 */
define("BulkEmailHyperlinkLookupModule", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.BulkEmailHyperlinkLookupModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.BulkEmailHyperlinkLookupModule",

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
			this.schemaName = "BulkEmailHyperlinkLookupPage";
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @override
		 */
		initHistoryState: Terrasoft.emptyFn
	});
	return Terrasoft.BulkEmailHyperlinkLookupModule;
});


