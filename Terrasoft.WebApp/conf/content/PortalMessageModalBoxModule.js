Terrasoft.configuration.Structures["PortalMessageModalBoxModule"] = {innerHierarchyStack: ["PortalMessageModalBoxModule"]};
define("PortalMessageModalBoxModule", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.PortalMessageModalBoxModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.PortalMessageModalBoxModule",

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
			this.schemaName = "PortalMessageModalBoxModuleSchema";
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @overridden
		 */
		initHistoryState: Ext.emptyFn

	});
	return Terrasoft.PortalMessageModalBoxModule;
});

