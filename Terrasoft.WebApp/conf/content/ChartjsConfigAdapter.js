Terrasoft.configuration.Structures["ChartjsConfigAdapter"] = {innerHierarchyStack: ["ChartjsConfigAdapter"]};
define("ChartjsConfigAdapter", [
	"chartjs-funnel",
	"chartjs-gauge",
	"chartjs-label",
	"chartjs-defaults",
	"ChartCompatibilityValidator",
	"AreaSplineChartJsConfigBuilder",
	"BarChartJsConfigBuilder",
	"FunnelChartJsConfigBuilder",
	"GaugeChartJsConfigBuilder",
	"HorizontalBarChartJsConfigBuilder",
	"LineChartJsConfigBuilder",
	"PieChartJsConfigBuilder",
	"ScatterChartJsConfigBuilder",
	"SplineChartJsConfigBuilder"], function() {

	Ext.define("Terrasoft.controls.ChartjsConfigAdapter", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ChartjsConfigAdapter",

		statics: {

			// region Properties: Public

			chartConfigMapping: {
				areaspline: {
					configBuilderName: "Terrasoft.AreaSplineChartJsConfigBuilder"
				},
				bar: {
					configBuilderName: "Terrasoft.HorizontalBarChartJsConfigBuilder"
				},
				column: {
					configBuilderName: "Terrasoft.BarChartJsConfigBuilder"
				},
				funnel: {
					configBuilderName: "Terrasoft.FunnelChartJsConfigBuilder"
				},
				gauge: {
					configBuilderName: "Terrasoft.GaugeChartJsConfigBuilder"
				},
				line: {
					configBuilderName: "Terrasoft.LineChartJsConfigBuilder"
				},
				pie: {
					configBuilderName: "Terrasoft.PieChartJsConfigBuilder"
				},
				scatter: {
					configBuilderName: "Terrasoft.ScatterChartJsConfigBuilder"
				},
				spline: {
					configBuilderName: "Terrasoft.SplineChartJsConfigBuilder"
				}
			},

			// endregion

			// region Methods: Private

			/**
			 * @private
			 */
			_createChartJsConfigBuilder: function(builderClassName, config) {
				const builderConfig = {
					highchartsConfig: config
				};
				return Ext.create(builderClassName, builderConfig);
			},

			/**
			 * @private
			 * @param {Array<Object>} series
			 * @param {Object} chartConfigMapping Mapping of the builders.
			 * @return {Array<Terrasoft.AbstractChartJsConfigBuilder>} Builders of the series.
			 */
			_getConfigBuilderClassNames: function(series, chartConfigMapping) {
				return series.map(function (item) {
					return this._getConfigBuilderName(item.type, chartConfigMapping);
				}.bind(this));
			},

			/**
			 * @private
			 * @param {String} highChartType Need chart type of the highchart.
			 * @param {Object} chartConfigMapping Mapping of the builders.
			 * @return {String} Class name of the builder.
			 */
			_getConfigBuilderName: function(highChartType, chartConfigMapping) {
				return chartConfigMapping[highChartType].configBuilderName;
			},

			/**
			 * @private
			 * @param {Object} config Highcharts configuration.
			 * @param {Object} config.chart Chart config.
			 * @param {String} config.chart.type Chart type of the first series.
			 * @param {Array<Object>} config.series Series of the config.
			 * @param {Object} [config.compatibilityMapping]
			 * @return {Array<Object>} Series config list with correct chart type.
			 */
			_getSeriesWithCorrectCharType: function(config) {
				let series = Ext.clone(config.series) || [];
				series = series.map(function(item) {
					return Ext.apply(item, { type: item.type || config.chart.type });
				});
				return this._checkCompatibilityTypes(series, config.compatibilityMapping);
			},

			/**
			 * @private
			 * @typedef {Object} Series
			 * @property {String} type
			 * @param {Array<Series>} series
			 * @param {Object} [compatibilityMapping]
			 * @return {Array<Series>} Series list with compatibility types.
			 */
			_checkCompatibilityTypes: function(series, compatibilityMapping) {
				if (Ext.isEmpty(series)) {
					return series;
				}
				const seriesTypes = Ext.Array.pluck(series, "type");
				const isCompatibilityTypes = Terrasoft.ChartCompatibilityValidator
					.isCompatibilityTypes(seriesTypes, compatibilityMapping);
				if (isCompatibilityTypes) {
					return series;
				}
				const firstSeries = Terrasoft.first(series);
				return series.map(function(item) {
					return Ext.apply(item, {type: firstSeries.type});
				});
			},

			/**
			 * @private
			 * @param {Object} config Highcharts configuration.
			 * @param {String} config.chartConfigMapping Custom chart config mapping.
			 * @return {Object} Config of the mapping.
			 */
			_getConfigMapping: function(config) {
				return Ext.apply(Terrasoft.deepClone(this.chartConfigMapping), config && config.chartConfigMapping);
			},

			/**
			 * @private
			 * @param {Object} config Highcharts configuration.
			 * @param {Object} config.chart Chart config.
			 * @param {String} config.chartConfigMapping Custom chart config mapping.
			 * @param {Array<Object>} series Series of the config.
			 * @return {Array<Terrasoft.AbstractChartJsConfigBuilder>}
			 */
			_getChartjsConfigBuilders: function(config, series) {
				const configMapping = this._getConfigMapping(config);
				const builderClassNames = this._getConfigBuilderClassNames(series, configMapping);
				return builderClassNames.map(function(builderClassName) {
					return this._createChartJsConfigBuilder(builderClassName, Ext.clone(config));
				}.bind(this));
			},

			/**
			 * @private
			 * @typedef {Object} ChartJsConfig
			 * @property {String} type
			 * @property {{labels: Array<String>, datasets: Array<Object>}} data
			 * @param {Array<ChartJsConfig>} configs
			 * @return {ChartJsConfig|Object}
			 */
			_mergeChartjsConfigs: function(configs) {
				const datasets = configs.map(function(config) {
					const dataset = Terrasoft.first(config.data.datasets);
					return Ext.apply(dataset, {type: config.type});
				});
				if (Ext.isEmpty(configs)) {
					return {};
				}
 				const firstConfig = Terrasoft.first(configs);
				firstConfig.data.datasets = datasets;
				return firstConfig;
			},

			/**
			 * @param {Array<Terrasoft.AbstractChartJsConfigBuilder>} builders
			 * @param {Array<Object>} series
			 * @private
			 * @return {Array<ChartJsConfig>}
			 */
			_getChartjsConfigs: function(builders, series) {
				return builders.map(function(builder, index) {
					return builder
						.setSeriesIndex(index)
						.setHighchartSeries(series[index])
						.build();
				});
			},

			// endregion

			// region Methods: Public

			/**
			 * Gets chart config.
			 * @param {Object} config Highcharts configuration.
			 * @param {Object} config.chart Chart config.
			 * @param {String} config.chartConfigMapping Custom chart config mapping.
			 * @param {Array<Object>} config.series Series of the config.
			 * @return {Object} Config of the chart.js.
			 */
			getConfig: function(config) {
				const series = this._getSeriesWithCorrectCharType(config);
				const builders = this._getChartjsConfigBuilders(config, series);
				const chartjsConfigs = this._getChartjsConfigs(builders, series) || [];
				return this._mergeChartjsConfigs(chartjsConfigs);
			}

			// endregion
		}
	});

	return { };
});


