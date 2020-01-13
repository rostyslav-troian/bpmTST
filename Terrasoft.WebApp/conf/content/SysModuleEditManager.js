Terrasoft.configuration.Structures["SysModuleEditManager"] = {innerHierarchyStack: ["SysModuleEditManager"]};
define("SysModuleEditManager", ["SysModuleEditManagerItem"], function() {
	/**
	 * Section pages manager.
	 */
	Ext.define("Terrasoft.manager.SysModuleEditManager", {
		extend: "Terrasoft.manager.ObjectManager",
		alternateClassName: "Terrasoft.SysModuleEditManager",

		singleton: true,

		// region Properties: Private

		/**
		 * ######## ###### ######## #########.
		 * @private
		 * {String}
		 */
		itemClassName: "Terrasoft.SysModuleEditManagerItem",

		/**
		 * ######## #####.
		 * @private
		 * {String}
		 */
		entitySchemaName: "SysModuleEdit",

		/**
		 * ###### ############ ####### ########.
		 * @private
		 * @type {Object}
		 */
		propertyColumnNames: {
			sysModuleEntity: "SysModuleEntity",
			cardSchemaUId: "CardSchemaUId",
			typeColumnValue: "TypeColumnValue",
			useModuleDetails: "UseModuleDetails",
			position: "Position",
			helpContextId: "HelpContextId",
			actionKindCaption: "ActionKindCaption",
			actionKindName: "ActionKindName",
			pageCaption: "PageCaption",
			miniPageSchemaUId: "MiniPageSchemaUId",
			miniPageModes: "MiniPageModes"
		}

		// endregion

	});

	return Terrasoft.SysModuleEditManager;
});


