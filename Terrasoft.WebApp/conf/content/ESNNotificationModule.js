Terrasoft.configuration.Structures["ESNNotificationModule"] = {innerHierarchyStack: ["ESNNotificationModule"]};
define("ESNNotificationModule", ["BaseSchemaModuleV2"], function() {
	/**
	 * @class Terrasoft.configuration.ESNNotificationModule
	 * ESNNotificationModule is used for loading ESN notifications.
	 */
	Ext.define("Terrasoft.configuration.ESNNotificationModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.ESNNotificationModule",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#useHistoryState
		 * @overridden
		 */
		useHistoryState: false,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "ESNNotificationSchema";
		}
	});
	return Terrasoft.ESNNotificationModule;
});


