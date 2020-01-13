Terrasoft.configuration.Structures["ChartProviderFactory"] = {innerHierarchyStack: ["ChartProviderFactory"]};
define("ChartProviderFactory", ["HighchartProvider", "ChartjsProvider"], function() {
	Ext.define("Terrasoft.configuration.ChartProviderFactory", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ChartProviderFactory",
		
		
		// region Methods: Private
		
		/**
		 * @private
		 * @param {String} providerName
		 * @param {Object} config
		 * @return {Object} Created provider.
		 */
		_createProvider: function(providerName, config) {
			return Ext.create(providerName, {config: config});
		},
		
		// endregion
		
		// region Methods: Protected
		
		/**
		 * Create highchart provider.
		 * @param {Object} config Provider configuration.
		 * @returns {Object} Highchart provider instance.
		 */
		createHighChartProvider: function(config) {
			return this._createProvider("Terrasoft.HighchartProvider", config);
		},
		
		/**
		 * Create chartjs provider.
		 * @param {Object} config Provider configuration.
		 * @returns {Object} chartjs provider instance.
		 */
		createChartJsProvider: function(config) {
			return this._createProvider("Terrasoft.ChartjsProvider", config);
		},
		
		// endregion
		
		// region Methods: Public
		
		/**
		 * Create chart provider by chart config.
		 * @param {Object} config
		 * @return {Object} Created provider.
		 */
		createProvider: function(config) {
			const useHighCharts = Terrasoft.Features.getIsEnabled("UseHighCharts");
			if (useHighCharts) {
				return this.createHighChartProvider(config);
			}
			const isSupportChartType = Terrasoft.ChartjsProvider.isSupportedChartType(config);
			if (isSupportChartType) {
				return this.createChartJsProvider(config);
			}
			return this.createHighChartProvider(config);
		}
		
		// endregion
		
	});
	
	return {};
});


