Terrasoft.configuration.Structures["ContextHelpModule"] = {innerHierarchyStack: ["ContextHelpModule"]};
define("ContextHelpModule", ["HoverMenuButton"], function() {
		/**
		 * @class Terrasoft.configuration.ContextHelpModule
		 * ##### ContextHelpModule ############ ### ######## ########## ###### ########### #######.
		 */
		Ext.define("Terrasoft.configuration.ContextHelpModule", {
			alternateClassName: "Terrasoft.ContextHelpModule",
			extend: "Terrasoft.BaseSchemaModule",
			useHistoryState: false,
			isSchemaConfigInitialized: true,
			schemaName: "ContextHelpSchema"
		});

		return Terrasoft.ContextHelpModule;
	});


