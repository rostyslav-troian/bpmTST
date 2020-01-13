Terrasoft.configuration.Structures["ScatterChartJsConfigBuilder"] = {innerHierarchyStack: ["ScatterChartJsConfigBuilder"]};
define("ScatterChartJsConfigBuilder", ["LineChartJsConfigBuilder"], function() {
	
	Ext.define("Terrasoft.configuration.ScatterChartJsConfigBuilder", {
		extend: "Terrasoft.LineChartJsConfigBuilder",
		alternateClassName: "Terrasoft.ScatterChartJsConfigBuilder",

		// region Fields: Private

		/**
		 * @private
		 */
		_scatterDataSetOptions: {
			showLine: false,
		},

		/**
		 * @private
		 */
		_scatterLegendOptions: {
			labels: {
				usePointStyle: true
			}
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		getLegendOptions: function() {
			const legendOptions = this.callParent(arguments);
			return this.applyOptions(legendOptions, this._scatterLegendOptions);
		},
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getDataSet: function() {
			const dataSet = this.callParent(arguments);
			return this.applyOptions(dataSet, this._scatterDataSetOptions);
		}

		// endregion
		
	});
	
	return { };
});

