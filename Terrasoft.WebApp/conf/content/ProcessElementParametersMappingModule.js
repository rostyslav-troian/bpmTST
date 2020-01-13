Terrasoft.configuration.Structures["ProcessElementParametersMappingModule"] = {innerHierarchyStack: ["ProcessElementParametersMappingModule"]};
define("ProcessElementParametersMappingModule", ["BaseProcessParametersEditModule"], function() {

	Ext.define("Terrasoft.configuration.ProcessElementParametersMappingModule", {
		alternateClassName: "Terrasoft.ProcessElementParametersMappingModule",
		extend: "Terrasoft.BaseProcessParametersEditModule",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "ProcessElementParametersMappingPage";
		},

		/**
		 * @inheritdoc Terrasoft.BaseProcessParametersEditModule#initParametersInfo
		 * @overridden
		 */
		initParametersInfo: function() {
			this.parametersInfo = {};
		}
	});
	return Terrasoft.ProcessElementParametersMappingModule;
});


