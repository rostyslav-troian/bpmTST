Terrasoft.configuration.Structures["OAuth20AppModule"] = {innerHierarchyStack: ["OAuth20AppModule"]};
define("OAuth20AppModule", ["BaseSchemaModuleV2",  "css!WebServiceMethodModule", "css!OAuth20AppModule"], function() {
	/**
	 * @class Terrasoft.configuration.OAuth20AppModule
	 */
	Ext.define("Terrasoft.configuration.OAuth20AppModule", {
		alternateClassName: "Terrasoft.OAuth20AppModule",
		extend: "Terrasoft.BaseSchemaModule",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @overridden
		 */
		initHistoryState: Ext.emptyFn,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "OAuth20AppModalPage";
		}
	});
	return Terrasoft.OAuth20AppModule;
});


