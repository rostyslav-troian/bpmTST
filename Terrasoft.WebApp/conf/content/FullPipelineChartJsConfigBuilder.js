Terrasoft.configuration.Structures["FullPipelineChartJsConfigBuilder"] = {innerHierarchyStack: ["FullPipelineChartJsConfigBuilder"]};
define("FullPipelineChartJsConfigBuilder", ["FunnelChartJsConfigBuilder"], function() {

	Ext.define("Terrasoft.configuration.FullPipelineChartJsConfigBuilder", {
		extend: "Terrasoft.FunnelChartJsConfigBuilder",
		alternateClassName: "Terrasoft.FullPipelineChartJsConfigBuilder",
		
		// Fields: Private
		
		/**
		 * @private
		 */
		_fullPipelineLayoutOptions: {
			padding: {
				bottom: 60
			}
		},
		
		// endregion
		
		// region Methods: Protected
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getLayoutOptions: function() {
			const layoutOptions = this.callParent(arguments);
			return this.applyOptions(layoutOptions, this._fullPipelineLayoutOptions);
		},
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getLabels: function() {
			const series = this.getHighchartsConfigValueOrDefault("series", []);
			const firstSerieData = series.length > 0 ? series[0].data : [];
			return firstSerieData.map(function(data) {
				const firstLabelLine = Ext.String.format("{0}: {1}", data.schemaCaption, data.stageName);
				const secondLabelLine = data.displayValue;
				return [firstLabelLine, secondLabelLine];
			});
		},
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getLabelSuffix: function() {
			return Terrasoft.emptyString;
		},
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getDataItemConfig: function(dataItem) {
			const config = this.callParent(arguments);
			return this.applyOptions(config, {
				schemaCaption: dataItem.schemaCaption,
				stageName: dataItem.stageName,
				popupValues: dataItem.popupValues
			});
		},
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getEvents: function() {
			return {};
		},
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getLegendOptions: function() {
			const legendOptions = this.callParent(arguments);
			return this.applyOptions(legendOptions, {
				display: false
			});
		}
		
		// endregion
		
	});

	return { };
});


