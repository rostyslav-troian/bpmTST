Terrasoft.configuration.Structures["DynamicContentAttributeLookupModule"] = {innerHierarchyStack: ["DynamicContentAttributeLookupModule"]};
/**
 * Module to load DynamicContentAttributeLookupPage.
 */
define("DynamicContentAttributeLookupModule", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.DynamicContentAttributeLookupModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.DynamicContentAttributeLookupModule",

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
			this.schemaName = "DynamicContentAttributeLookupPage";
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @override
		 */
		initHistoryState: Terrasoft.emptyFn
	});
	return Terrasoft.DynamicContentAttributeLookupModule;
});


