Terrasoft.configuration.Structures["OpportunityFunnelModuleV2"] = {innerHierarchyStack: ["OpportunityFunnelModuleV2"], structureParent: "ChartModule"};
define("OpportunityFunnelModuleV2", ["ext-base", "LabelDateEdit", "OpportunityFunnelViewConfig",
		"DashboardFunnelEnums", "ChartModule", "ChartSchemaModule"], function(Ext) {
	/**
	 * @class Terrasoft.configuration.OpportunityFunnelModule
	 * ##### ###### ####### ######.
	 */
	Ext.define("Terrasoft.configuration.OpportunityFunnelModuleV2", {
		extend: "Terrasoft.ChartSchemaModule",
		alternateClassName: "Terrasoft.OpportunityFunnelModuleV2",

		/**
		 * @inheritDoc Terrasoft.ChartSchemaModule#schemaName
		 * @overridden
		 */
		schemaName: "FunnelChartSchema"
	});

	return Terrasoft.OpportunityFunnelModuleV2;
});


