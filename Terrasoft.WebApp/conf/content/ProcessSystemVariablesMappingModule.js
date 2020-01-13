Terrasoft.configuration.Structures["ProcessSystemVariablesMappingModule"] = {innerHierarchyStack: ["ProcessSystemVariablesMappingModule"], structureParent: "BaseProcessParametersEditModule"};
define("ProcessSystemVariablesMappingModule", ["BaseProcessParametersEditModule"], function() {
	/**
	 * @class Terrasoft.configuration.ProcessFunctionsMappingModule
	 */
	Ext.define("Terrasoft.configuration.ProcessSystemVariablesMappingModule", {
		alternateClassName: "Terrasoft.ProcessSystemVariablesMappingModule",
		extend: "Terrasoft.BaseProcessParametersEditModule",
		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "ProcessSystemVariablesMappingPage";
		}
	});
	return Terrasoft.ProcessSystemVariablesMappingModule;
});


