Terrasoft.configuration.Structures["DcmElementParametersMappingModule"] = {innerHierarchyStack: ["DcmElementParametersMappingModule"], structureParent: "ProcessElementParametersMappingModule"};
define("DcmElementParametersMappingModule", ["ProcessElementParametersMappingModule"], function() {

	Ext.define("Terrasoft.configuration.DcmElementParametersMappingModule", {
		alternateClassName: "Terrasoft.DcmElementParametersMappingModule",
		extend: "Terrasoft.ProcessElementParametersMappingModule",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "DcmElementParametersMappingPage";
		}

	});
	return Terrasoft.DcmElementParametersMappingModule;
});


