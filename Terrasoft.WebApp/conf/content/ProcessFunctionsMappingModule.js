Terrasoft.configuration.Structures["ProcessFunctionsMappingModule"] = {innerHierarchyStack: ["ProcessFunctionsMappingModule"], structureParent: "BaseProcessParametersEditModule"};
define("ProcessFunctionsMappingModule", ["BaseProcessParametersEditModule"], function() {
	/**
	 * @class Terrasoft.configuration.ProcessFunctionsMappingModule
	 */
	Ext.define("Terrasoft.configuration.ProcessFunctionsMappingModule", {
		alternateClassName: "Terrasoft.ProcessFunctionsMappingModule",
		extend: "Terrasoft.BaseProcessParametersEditModule",
		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "ProcessFunctionsMappingPage";
		}
	});
	return Terrasoft.ProcessFunctionsMappingModule;
});


