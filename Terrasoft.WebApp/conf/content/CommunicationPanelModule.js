Terrasoft.configuration.Structures["CommunicationPanelModule"] = {innerHierarchyStack: ["CommunicationPanelModule"]};
define("CommunicationPanelModule", ["BaseSchemaModuleV2"], function() {
	/**
	 * @class Terrasoft.configuration.CommunicationPanelModule
	 * ##### ######## ################ ######.
	 */
	Ext.define("Terrasoft.configuration.CommunicationPanelModule", {
		alternateClassName: "Terrasoft.CommunicationPanelModule",
		extend: "Terrasoft.BaseSchemaModule",

		/**
		 * ############## ######## #####.
		 * @protected
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "CommunicationPanel";
		},

		/**
		 * ######## ######### ####### # ####### #########, #### ### ############# ###### ########## ## ########.
		 * @protected
		 * @overridden
		 */
		initHistoryState: Ext.emptyFn

	});
	return Terrasoft.CommunicationPanelModule;
});


