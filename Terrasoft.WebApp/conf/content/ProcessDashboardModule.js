Terrasoft.configuration.Structures["ProcessDashboardModule"] = {innerHierarchyStack: ["ProcessDashboardModule"]};
define("ProcessDashboardModule", ["BaseSchemaModuleV2"], function() {
	/**
	 * @class Terrasoft.configuration.ProcessDashboardModule
	 */
	Ext.define("Terrasoft.configuration.ProcessDashboardModule", {
		alternateClassName: "Terrasoft.ProcessDashboardModule",
		extend: "Terrasoft.BaseSchemaModule",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#useHistoryState
		 * @overridden
		 */
		useHistoryState: false,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#generateViewContainerId
		 * @overridden
		 */
		generateViewContainerId: false,

		/**
		* @inheritDoc Terrasoft.BaseSchemaModule#initSchemaName
		* @overridden
		*/
		initSchemaName: function() {
			this.schemaName = "ProcessDashboardSchema";
		}
	});
	return Terrasoft.ProcessDashboardModule;
});


