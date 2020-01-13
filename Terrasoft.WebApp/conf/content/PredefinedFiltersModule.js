Terrasoft.configuration.Structures["PredefinedFiltersModule"] = {innerHierarchyStack: ["PredefinedFiltersModule"]};
define("PredefinedFiltersModule", ["ext-base", "terrasoft", "BaseSchemaModuleV2"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.configuration.PredefinedFiltersModule
	 */
	Ext.define("Terrasoft.configuration.PredefinedFiltersModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.PredefinedFiltersModule",

		//region Properties: Protected

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#useHistoryState
		 * @overridden
		 */
		useHistoryState: false,

		/**
		 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#isSchemaConfigInitialized
		 * @overridden
		 */
		isSchemaConfigInitialized: true,

		/**
		 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#schemaName
		 * @overridden
		 */
		schemaName: "PredefinedFiltersSchema"

		//endregion

	});
	return Terrasoft.PredefinedFiltersModule;
});


