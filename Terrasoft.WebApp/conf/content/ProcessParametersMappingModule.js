Terrasoft.configuration.Structures["ProcessParametersMappingModule"] = {innerHierarchyStack: ["ProcessParametersMappingModule"], structureParent: "BaseProcessParametersEditModule"};
/* jshint ignore:start */
/* jscs:disable */
define("ProcessParametersMappingModule", ["BaseProcessParametersEditModule"], function() {

	Ext.define("Terrasoft.configuration.ProcessParametersMappingModule", {
		alternateClassName: "Terrasoft.ProcessParametersMappingModule",
		extend: "Terrasoft.BaseProcessParametersEditModule",

		initParametersInfo: function() {
			this.parametersInfo = {};
		},

		initSchemaName: function() {
			this.schemaName = "ProcessParametersMappingPage";
		}
	});
	return Terrasoft.ProcessParametersMappingModule;
});
/* jscs:enable */
/* jshint ignore:end */


