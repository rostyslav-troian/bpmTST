Terrasoft.configuration.Structures["ProcessDateTimeMappingModule"] = {innerHierarchyStack: ["ProcessDateTimeMappingModule"], structureParent: "BaseProcessParametersEditModule"};
define("ProcessDateTimeMappingModule", ["BaseProcessParametersEditModule"], function() {
	/**
	 * @class Terrasoft.configuration.ProcessFunctionsMappingModule
	 */
	Ext.define("Terrasoft.configuration.ProcessDateTimeMappingModule", {
		alternateClassName: "Terrasoft.ProcessDateTimeMappingModule",
		extend: "Terrasoft.BaseProcessParametersEditModule",
		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "ProcessDateTimeMappingPage";
		}
	});
	return Terrasoft.ProcessDateTimeMappingModule;
});


