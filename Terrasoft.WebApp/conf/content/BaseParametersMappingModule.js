Terrasoft.configuration.Structures["BaseParametersMappingModule"] = {innerHierarchyStack: ["BaseParametersMappingModule"]};
/**
 * Parent: BaseProcessParametersEditModule
 */
define("BaseParametersMappingModule", ["BaseProcessParametersEditModule", "css!ProcessMappingModalBoxStyles"],
		function() {

	Ext.define("Terrasoft.configuration.BaseParametersMappingModule", {
		alternateClassName: "Terrasoft.BaseParametersMappingModule",
		extend: "Terrasoft.BaseProcessParametersEditModule",

		/**
		 * Name of parameter mapping page.
		 * @abstract
		 * @type {String}
		 */
		mappingPageName: Ext.emptyString,

		/**
		 * Name of parameter selection page.
		 * @abstract
		 * @type {String}
		 */
		mappingSelectionPageName: Ext.emptyString,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			if (this.parameters.viewModelConfig.MappingType === Terrasoft.MappingEnums.MappingType.ALL) {
				this.schemaName = this.mappingPageName;
			} else {
				this.schemaName = this.mappingSelectionPageName;
			}
		}
	});

	return Terrasoft.BaseParametersMappingModule;
});


