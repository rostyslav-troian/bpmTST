Terrasoft.configuration.Structures["DateTimeMappingModule"] = {innerHierarchyStack: ["DateTimeMappingModule"]};
define("DateTimeMappingModule", ["BaseProcessParametersEditModule", "css!DateTimeMappingModule"], function() {
	/**
	 * @class Terrasoft.configuration.DateTimeMappingModule
	 * Class DateTimeMappingModule
	 */
	Ext.define("Terrasoft.configuration.DateTimeMappingModule", {
		alternateClassName: "Terrasoft.DateTimeMappingModule",
		extend: "Terrasoft.BaseProcessParametersEditModule",
		/**
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "DateTimeMappingPage";
		}
	});
	return Terrasoft.DateTimeMappingModule;
});


