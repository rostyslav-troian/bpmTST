Terrasoft.configuration.Structures["LineChartJsConfigBuilder"] = {innerHierarchyStack: ["LineChartJsConfigBuilder"]};
define("LineChartJsConfigBuilder", ["AbstractChartJsConfigBuilder"], function() {
	
	Ext.define("Terrasoft.configuration.LineChartJsConfigBuilder", {
		extend: "Terrasoft.AbstractChartJsConfigBuilder",
		alternateClassName: "Terrasoft.LineChartJsConfigBuilder",

		// region Fields: Private

		/**
		 * @private
		 */
		_lineDataSetOptions: {
			fill: false,
			lineTension: 0,
			datalabels: {
				display: false
			}
		},

		// endregion

		// region Properties: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		chartJsType: "line",

		// endregion

		// region Methods: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		getDataSet: function() {
			const dataSet = this.callParent(arguments);
			const dataSetOptions = this.applyOptions(this._lineDataSetOptions, {
				borderColor: dataSet.backgroundColor
			});
			return this.applyOptions(dataSet, dataSetOptions);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getDataSetData: function(highchartsSerieData) {
			return highchartsSerieData.map(function(x) {
				if (Ext.isObject(x)) {
					return {x: x.x, y: x.y};
				} else if (Terrasoft.isArray(x)) {
					return {x: x[0], y: x[1]};
				} else {
					return x || 0;
				}
			});
		},

		// endregion

	});

	return { };
});

