Terrasoft.configuration.Structures["DateTimeMacroConstructorModule"] = {innerHierarchyStack: ["DateTimeMacroConstructorModule"]};
/**
 * Module to load DateTimeMacroConstructorPage.
 */
define("DateTimeMacroConstructorModule", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.DateTimeMacroConstructorModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.DateTimeMacroConstructorModule",

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
			this.schemaName = "DateTimeMacroConstructorPage";
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @override
		 */
		initHistoryState: Terrasoft.emptyFn
	});
	return Terrasoft.DateTimeMacroConstructorModule;
});


