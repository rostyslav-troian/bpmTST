Terrasoft.configuration.Structures["ContentPanelModule"] = {innerHierarchyStack: ["ContentPanelModule"]};
define("ContentPanelModule", ["ConfigurationModuleV2"], function() {
	/**
	 * @class Terrasoft.configuration.ContentPanelModule
	 * Class ContentPanelModule
	 */
	Ext.define("Terrasoft.configuration.ContentPanelModule", {
		extend: "Terrasoft.ConfigurationModule",
		alternateClassName: "Terrasoft.ContentPanelModule",
		/**
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = this.parameters.viewModelConfig.ElementInfo ? "ContentElementPanel": "ContentItemPanel";
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#useHistoryState
		 * @override
		 */
		useHistoryState: false

	});
	return Terrasoft.ContentPanelModule;
});


