Terrasoft.configuration.Structures["ForecastModule"] = {innerHierarchyStack: ["ForecastModule"]};
define("ForecastModule", ["BaseSchemaModuleV2", "ViewGeneratorV2", "ForecastTab"],
	function() {
		Ext.define("Terrasoft.configuration.ForecastModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.ForecastModule",

			/**
			 * @inheritdoc BaseSchemaModuleV2#initSchemaName
			 * @overridden
			 */
			initSchemaName: function() {
				this.schemaName = "ForecastTab";
			},

			/**
			 * @inheritdoc BaseSchemaModuleV2#initHistoryState
			 * @overridden
			 */
			initHistoryState: Terrasoft.emptyFn

		});
		return Terrasoft.ForecastModule;
	});


