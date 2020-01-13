Terrasoft.configuration.Structures["ProcessParameterSelectionModule"] = {innerHierarchyStack: ["ProcessParameterSelectionModule"], structureParent: "BaseProcessParametersEditModule"};
/**
 * Parent: BaseProcessParametersEditModule
 */
define("ProcessParameterSelectionModule", ["BaseProcessParametersEditModule", "css!ProcessMappingModalBoxStyles"],
	function() {

		Ext.define("Terrasoft.configuration.ProcessParameterSelectionModule", {
			alternateClassName: "Terrasoft.ProcessParameterSelectionModule",
			extend: "Terrasoft.BaseProcessParametersEditModule",

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
			 * @overridden
			 */
			initSchemaName: function() {
				this.schemaName = "ProcessParameterSelectionPage";
			}
		});

		return Terrasoft.ProcessParameterSelectionModule;
	});


