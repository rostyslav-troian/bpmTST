Terrasoft.configuration.Structures["NotificationsSettingsModule"] = {innerHierarchyStack: ["NotificationsSettingsModule"]};
define("NotificationsSettingsModule", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.NotificationsSettingsModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.NotificationsSettingsModule",

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#useHistoryState
		 * @overridden
		 */
		useHistoryState: true,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#init
		 * @overridden
		 */
		init: function() {
			this.sandbox.registerMessages(this.messages);
			this.callParent(arguments);
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "NotificationsSettingsSchema";
		}
	});

	return Terrasoft.NotificationsSettingsModule;
});


