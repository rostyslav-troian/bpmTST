Terrasoft.configuration.Structures["FullPipelineChartProviderFactory"] = {innerHierarchyStack: ["FullPipelineChartProviderFactory"]};
define("FullPipelineChartProviderFactory", ["ChartProviderFactory", "FullPipelineChartJsConfigBuilder"], function() {
	
	Ext.define("Terrasoft.configuration.FullPipelineChartProviderFactory", {
		extend: "Terrasoft.ChartProviderFactory",
		alternateClassName: "Terrasoft.FullPipelineChartProviderFactory",
		
		// region Fields: Private
		
		/**
		 * @private
		 */
		_fullPipeLineChartConfigMapping: {
			funnel: {
				configBuilderName: "Terrasoft.FullPipelineChartJsConfigBuilder"
			}
		},
		
		// endregion
		
		// region Methods: Protected
		
		/**
		 * @inheritDoc
		 * @override
		 */
		createChartJsProvider: function(config) {
			config.chartConfigMapping = this._fullPipeLineChartConfigMapping;
			return this.callParent([config]);
		}
		
		// endregion
		
	});
	
	return {};
});


