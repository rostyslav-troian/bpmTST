Terrasoft.configuration.Structures["AreaSplineChartJsConfigBuilder"] = {innerHierarchyStack: ["AreaSplineChartJsConfigBuilder"]};
define("AreaSplineChartJsConfigBuilder", ["SplineChartJsConfigBuilder"], function() {
	
	Ext.define("Terrasoft.configuration.AreaSplineChartJsConfigBuilder", {
		extend: "Terrasoft.SplineChartJsConfigBuilder",
		alternateClassName: "Terrasoft.AreaSplineChartJsConfigBuilder",

		// region Fields: Private

		/**
		 * @private
		 */
		_areaSplineChartDataSetOptions: {
			fill: true
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		getDataSet: function() {
			const dataSet = this.callParent(arguments);
			return this.applyOptions(dataSet, this._areaSplineChartDataSetOptions);
		}

		// endregion

	});

	return { };
});

