Terrasoft.configuration.Structures["CenterNotificationModule"] = {innerHierarchyStack: ["CenterNotificationModule"], structureParent: "BaseSchemaModuleV2"};
define("CenterNotificationModule", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.CenterNotificationModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.CenterNotificationModule",

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#useHistoryState
		 * @overridden
		 */
		useHistoryState: false,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "CenterNotificationSchema";
		}
	});

	return Terrasoft.CenterNotificationModule;
});


