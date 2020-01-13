Terrasoft.configuration.Structures["HorizontalBarChartJsConfigBuilder"] = {innerHierarchyStack: ["HorizontalBarChartJsConfigBuilder"]};
define("HorizontalBarChartJsConfigBuilder", ["BarChartJsConfigBuilder"], function() {
	
	Ext.define("Terrasoft.configuration.HorizontalBarChartJsConfigBuilder", {
		extend: "Terrasoft.BarChartJsConfigBuilder",
		alternateClassName: "Terrasoft.HorizontalBarChartJsConfigBuilder",

		// region Properties: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		chartJsType: "horizontalBar",

		// endregion

		// region Methods: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		getScalesOptions: function() {
			const scalesOptions = this.callParent(arguments);
			return {
				xAxes: scalesOptions.yAxes,
				yAxes: scalesOptions.xAxes,
			};
		}

		// endregion

	});

	return { };
});

