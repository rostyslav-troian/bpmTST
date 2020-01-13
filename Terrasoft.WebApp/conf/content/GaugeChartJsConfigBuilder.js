Terrasoft.configuration.Structures["GaugeChartJsConfigBuilder"] = {innerHierarchyStack: ["GaugeChartJsConfigBuilder"]};
define("GaugeChartJsConfigBuilder", ["AbstractChartJsConfigBuilder"], function() {
	
	Ext.define("Terrasoft.configuration.GaugeChartJsConfigBuilder", {
		extend: "Terrasoft.AbstractChartJsConfigBuilder",
		alternateClassName: "Terrasoft.GaugeChartJsConfigBuilder",

		// region Fields: Private

		/**
		 * @private
		 */
		_gaugeSegments: [],

		/**
		 * @private
		 */
		_gaugeOptions: {
			events: [],
			defaultFontSize: 30
		},

		// endregion

		// region Properties: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		chartJsType: "tsgauge",

		// endregion

		// region Methods: Private

		/**
		 * @private
		 */
		_getGaugeSegments: function() {
			const yAxisHighchartsConfigs = this.getHighchartsConfigValueOrDefault("yAxis", []);
			const yAxisHighchartsConfig = Terrasoft.isArray(yAxisHighchartsConfigs)
				? yAxisHighchartsConfigs[0]
				: yAxisHighchartsConfigs;
			return yAxisHighchartsConfig && yAxisHighchartsConfig.plotBands;
		},

		/**
		 * @private
		 */
		_getGaugeSegmentsLimits: function(gaugeSegments) {
			const segmentsLimits = [];
			Terrasoft.each(gaugeSegments, function (segment) {
				Terrasoft.appendIf(segmentsLimits, segment.from);
				Terrasoft.appendIf(segmentsLimits, segment.to);
			}, this);
			return segmentsLimits;
		},

		/**
		 * @private
		 */
		_getActiveGaugeSegment: function(gaugeSegments, gaugeIndicator) {
			if (gaugeSegments.length === 0) {
				return undefined;
			}
			const activeSegment = Terrasoft.find(gaugeSegments, function(segment) {
				return gaugeIndicator >= segment.from && gaugeIndicator < segment.to;
			});
			if (activeSegment) {
				return activeSegment;
			}
			const firstSegment = Terrasoft.first(gaugeSegments);
			const lastSegment = Terrasoft.last(gaugeSegments);
			return gaugeIndicator < firstSegment.from
				? firstSegment
				: lastSegment;
		},

		/**
		 * @private
		 */
		_applyFontSize: function (chartJsOptions) {
			const yAxis = this.getHighchartsConfigValueOrDefault("yAxis", []);
			const defaultYAxe = _.first(yAxis) || {};
			const yAxisLabelsStyle = defaultYAxe.labels && defaultYAxe.labels.style || {};
			const yAxisLabelsFontSize = Math.round(parseFloat(yAxisLabelsStyle.fontSize));
			if (yAxisLabelsFontSize) {
				this.applyOptions(chartJsOptions, {
					defaultFontSize: yAxisLabelsFontSize
				});
			}
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		init: function(chartJsOptions) {
			this._gaugeSegments = this._getGaugeSegments() || [];
			this.callParent(arguments);
			this.applyOptions(chartJsOptions, this._gaugeOptions);
			this._applyFontSize(chartJsOptions);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getScalesOptions: function() {
			return {};
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getLabels: function() {
			return [];
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getDataSet: function(highchartsSerie) {
			const dataSet = this.callParent(arguments);
			const gaugeSegments = this._gaugeSegments;
			const gaugeIndicator = highchartsSerie.data[0];
			const activeGaugeSegments = this._getActiveGaugeSegment(gaugeSegments, gaugeIndicator);
			const gaugeDataSet = {
				gaugeData: {
					value: gaugeIndicator,
					valueColor: activeGaugeSegments && activeGaugeSegments.color
				},
				gaugeLimits: this._getGaugeSegmentsLimits(gaugeSegments),
				borderWidth: highchartsSerie.dial.borderWidth
			};
			return this.applyOptions(dataSet, gaugeDataSet);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getDataSetData: Terrasoft.emptyFn,

		/**
		 * @inheritDoc
		 * @override
		 */
		getDataSetColor: function() {
			return this._gaugeSegments
				.filter(function(segment) {
					return segment.from !== segment.to;
				})
				.map(function(segment) {
					return segment.color;
				});
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getDataItemConfig: Terrasoft.emptyFn

		// endregion

	});

	return { };
});

