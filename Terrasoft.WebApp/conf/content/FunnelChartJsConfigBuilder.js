Terrasoft.configuration.Structures["FunnelChartJsConfigBuilder"] = {innerHierarchyStack: ["FunnelChartJsConfigBuilder"]};
define("FunnelChartJsConfigBuilder", ["PieChartJsConfigBuilder"], function() {

	Ext.define("Terrasoft.configuration.FunnelChartJsConfigBuilder", {
		extend: "Terrasoft.PieChartJsConfigBuilder",
		alternateClassName: "Terrasoft.FunnelChartJsConfigBuilder",

		// Fields: Private

		/**
		 * @private
		 */
		_funnelLayoutOptions: {
			padding: {
				left: 5,
				right: 5,
				top: 25,
				bottom: 25
			}
		},

		// endregion

		// region Properties: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		chartJsType: "tsfunnel",

		// endregion

		// region Methods: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		getLayoutOptions: function() {
			const layoutOptions = this.callParent(arguments);
			return this.applyOptions(layoutOptions, this._funnelLayoutOptions);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getLabels: function() {
			const series = this.getHighchartsConfigValueOrDefault("series", []);
			if (series.length === 0) {
				return [];
			}
			return series[0].data.map(function(data) {
				return Ext.String.format("{0}{1}", data.name, this.getLabelSuffix(data));
			}, this);
		},
		
		/**
		 * Returns label suffix.
		 * @param {Object} serieData Highchart serie data.
		 * @returns {String} Label suffix.
		 */
		getLabelSuffix: function (serieData) {
			return Ext.String.format(" ({0})", serieData.y);
		},
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getTooltipPercentLabel: function() {
			return Terrasoft.emptyString;
		},
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getPlugins: Terrasoft.emptyFn

		// endregion

	});

	return { };
});


