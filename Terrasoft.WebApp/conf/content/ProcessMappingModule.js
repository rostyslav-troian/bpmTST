Terrasoft.configuration.Structures["ProcessMappingModule"] = {innerHierarchyStack: ["ProcessMappingModule"], structureParent: "BaseProcessParametersEditModule"};
/**
 * Parent: BaseParametersMappingModule
 */
define("ProcessMappingModule", ["BaseParametersMappingModule"], function() {

	Ext.define("Terrasoft.configuration.ProcessMappingModule", {
		alternateClassName: "Terrasoft.ProcessMappingModule",
		extend: "Terrasoft.BaseParametersMappingModule",

		/**
		 * @inheritdoc Terrasoft.BaseParametersMappingModule#mappingPageName
		 * @overridden
		 */
		mappingPageName: "ProcessMappingPage",

		/**
		 * @inheritdoc Terrasoft.BaseParametersMappingModule#mappingSelectionPageName
		 * @overridden
		 */
		mappingSelectionPageName: "ProcessParameterSelectionPage"
	});

	return Terrasoft.ProcessMappingModule;
});


