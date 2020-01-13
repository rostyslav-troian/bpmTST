Terrasoft.configuration.Structures["ProcessLookupModule"] = {innerHierarchyStack: ["ProcessLookupModule"]};
define("ProcessLookupModule", ["BaseProcessParametersEditModule", "css!ProcessLookupModuleStyles"], function() {
	/**
	 * @class Terrasoft.configuration.ProcessLookupModule
	 * Class ProcessLookupModule
	 */
	Ext.define("Terrasoft.configuration.ProcessLookupModule", {
		alternateClassName: "Terrasoft.ProcessLookupModule",
		extend: "Terrasoft.BaseProcessParametersEditModule",
		/**
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "ProcessLookupPage";
		},
		/**
		 * @overridden
		 */
		initParametersInfo: function() {
			this.parametersInfo = this.sandbox.publish("GetParametersInfo", null, [this.sandbox.id]) || {};
		}
	});
	return Terrasoft.ProcessLookupModule;
});


