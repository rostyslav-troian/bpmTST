Terrasoft.configuration.Structures["CasePageTimeZoneModule"] = {innerHierarchyStack: ["CasePageTimeZoneModule"]};
define("CasePageTimeZoneModule", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.CasePageTimeZoneModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.CasePageTimeZoneModule",

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#generateViewContainerId
		 * @overridden
		 */
		generateViewContainerId: false,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "CasePageTimeZoneModuleSchema";
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @overridden
		 */
		initHistoryState: Ext.emptyFn
	});
	return Terrasoft.CasePageTimeZoneModule;
});


