Terrasoft.configuration.Structures["HighchartProvider"] = {innerHierarchyStack: ["HighchartProvider"]};
define("HighchartProvider", ["HighchartsTypedConfig", "HighchartsMore", "AbstractChartProvider"],
	function(highchartsTypedConfig) {
	Ext.define("Terrasoft.configuration.HighchartProvider", {
		extend: "Terrasoft.AbstractChartProvider",
		alternateClassName: "Terrasoft.HighchartProvider",

		/**
		 * @inheritDoc
		 */
		init: function() {
			let config = this.config;
			const chartType = config.chart.type;
			const typeOptionsConfig = Ext.clone(highchartsTypedConfig[chartType]);
			this.config = config = Ext.merge(typeOptionsConfig, config);
			this.component = new Highcharts.Chart(config);
		}
	});
	return {};
});


