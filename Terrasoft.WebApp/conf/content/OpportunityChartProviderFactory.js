Terrasoft.configuration.Structures["OpportunityChartProviderFactory"] = {innerHierarchyStack: ["OpportunityChartProviderFactory"]};
define("OpportunityChartProviderFactory", ["ChartProviderFactory", "OpportunityFunnelChartJsConfigBuilder"], function() {
	
	Ext.define("Terrasoft.configuration.OpportunityChartProviderFactory", {
		extend: "Terrasoft.ChartProviderFactory",
		alternateClassName: "Terrasoft.OpportunityChartProviderFactory",
		
		// region Fields: Private
		
		/**
		 * @private
		 */
		_opportunityChartConfigMapping: {
			funnel: {
				configBuilderName: "Terrasoft.OpportunityFunnelChartJsConfigBuilder"
			}
		},
		
		// endregion
		
		// region Methods: Protected
		
		/**
		 * @inheritDoc
		 * @override
		 */
		createChartJsProvider: function(config) {
			config.chartConfigMapping = this._opportunityChartConfigMapping;
			return this.callParent([config]);
		}
		
		// endregion
		
	});
	
	return {};
});


