Terrasoft.configuration.Structures["OpportunityFunnelChart"] = {innerHierarchyStack: ["OpportunityFunnelChart"]};
define("OpportunityFunnelChart", ["ext-base", "terrasoft", "ChartModuleHelper", "OpportunityFunnelChartResources",
		"HighchartsWrapper", "HighchartsMore", "jQuery", "DashboardEnums", "Highcharts",
			"OpportunityChartProviderFactory"],
	function(Ext, Terrasoft, chartModuleHelper) {
		/* globals Highcharts */
		Ext.define("Terrasoft.controls.OpportunityFunnelChart", {
			extend: "Terrasoft.Chart",
			alternateClassName: "Terrasoft.OpportunityFunnelChart",

			/**
			 * Minimum height of the funnel unit.
			 * @type {Number}
			 */
			minHeight: 0.2,
			
			/**
			 * @inheritDoc
			 * @override
			 */
			chartProviderFactoryClassName: "Terrasoft.OpportunityChartProviderFactory",
			
			/**
			 * Sign of drill down mode.
			 * @type {Boolean}
			 */
			drillDownMode: false,

			/**
			 * Initializes the graph.
			 * @override
			 */
			initChart: function() {
				if (this.type !== chartModuleHelper.ChartSeriesKind.funnel.value || this.drillDownMode) {
					this.callParent(arguments);
					return;
				}
				var typedOptions = Ext.clone(this.getFunnelConfig(this));
				var initConfig;
				typedOptions = Ext.merge(typedOptions, this.getDefaultChartConfig());
				initConfig = Ext.merge(typedOptions, this.chartConfig || this.getInitConfig());
				if (Terrasoft.Features.getIsEnabled("UseCustomChartJsFunnel")) {
					const chartProvider = this.getChartProviderInstance(initConfig);
					this.chart = chartProvider.component;
				} else {
					this.chart = new Highcharts.Chart(initConfig);
				}
				this.setDataLabelAlignCenter();
			},
			
			/**
			 * @inheritdoc Terrasoft.Component#getBindConfig
			 * @override
			 */
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);

				var chartBindConfig = {
					drillDownMode: {
						changeMethod: "setDrillDownMode"
					}
				};
				Ext.apply(chartBindConfig, bindConfig);
				return chartBindConfig;
			},

			/**
			 * Updates the size of the chart by the size of the container.
			 * @override
			 */
			updateSize: function() {
				if (!this.rendered || !this.chart) {
					return;
				}
				var chart = this.chart;
				chart.getChartSize();
				this.chart.setSize(chart.chartWidth, chart.chartHeight, false);
				this.setDataLabelAlignCenter();
			},

			/**
			 * @inheritdoc Terrasoft.Chart#setSeries
			 * @override
			 */
			setSeries: function(series) {
				if (this.series === series) {
					return;
				}
				this.setSeriesMinHeight(series);
				this.series = series;
				this.reRender();
			},

			/**
			 * @inheritdoc Terrasoft.Chart#setType
			 * @override
			 */
			setType: function(type) {
				if (type !== chartModuleHelper.ChartSeriesKind.funnel.value || this.drillDownMode) {
					this.callParent(arguments);
					return;
				}
				if (this.type === type) {
					return;
				}
				this.type = type;
				if (!Ext.isEmpty(this.series)) {
					this.setSeriesMinHeight(this.series);
				}
				this.reRender();
			},

			/**
			 * Sets drill down mode value.
			 * @param {Boolean} drillDownMode The value of drill down mode.
			 */
			setDrillDownMode: function(drillDownMode) {
				if (this.drillDownMode === drillDownMode) {
					return;
				}
				this.drillDownMode = drillDownMode;
				this.reRender();
			},

			/**
			 * Sets the position of the funnel signatures to the center.
			 * @private
			 */
			setDataLabelAlignCenter: function() {
				var instanceId = this.instanceId;
				var getPointWidth = this.getPointWidth;
				const chartSeries = this.chart.series;
				const chartFirstSerieData = (chartSeries && chartSeries[0].data) || [];
				Terrasoft.each(chartFirstSerieData, function(point, index) {
					var border = 2.5;
					var pointWidth = getPointWidth(point);
					var pointDataLabel = Ext.get(instanceId + "-data-label-" + index);
					if (Ext.isEmpty(pointDataLabel)) {
						return;
					}
					var labelWrapper = pointDataLabel.el && pointDataLabel.el.up("span");
					var labelWrapperWidth = labelWrapper ? labelWrapper.getWidth() : 0;
					var pointHeight = pointDataLabel.getHeight();
					var dX = point.plotX - (pointWidth / 2) - border;
					var dY = point.dataLabel.width > pointWidth + border * 2 ? pointHeight / 2 - border * 2 : 0;
					point.dataLabel.attr({
						x: Terrasoft.getIsRtlMode() ? dX + pointWidth - labelWrapperWidth : dX,
						y: point.dataLabel.y - dY
					});
				});
			},

			/**
			 * Sets the minimum block height.
			 * @private
			 */
			setSeriesMinHeight: function(series) {
				if (this.type !== chartModuleHelper.ChartSeriesKind.funnel.value) {
					return;
				}
				var seriesData = series[0].data;
				var sum = 0;
				Terrasoft.each(seriesData, function(seriesData) {
					sum += seriesData.y;
				});
				for (var i = 0, len = seriesData.length; i < len; i++) {
					var seriesItem = seriesData[i];
					var itemWeight = seriesItem.y / sum;
					if (itemWeight <= this.minHeight) {
						seriesData[i].y = sum * this.minHeight;
					}
				}
			},

			/**
			 * ######### ###### ##### ##### ## ####### ##### ########.
			 * @private
			 * @return {Number} ########## ###### #####.
			 */
			getPointWidth: function(point) {
				return point.shapeArgs.d.length > 11 ?
				point.shapeArgs.d[8] - point.shapeArgs.d[10] :
				point.shapeArgs.d[6] - point.shapeArgs.d[8];
			},

			/**
			 * ########## ###### ######## ## ######### ### #### #########: "####### ######".
			 * @return {Object} ########## ###### ########.
			 */
			getFunnelConfig: function(scope) {
				var instanceId = scope.instanceId;
				var getPointWidth = scope.getPointWidth;
				var tpl = new Ext.XTemplate(
					"<div id='{instanceId}-data-label-{point.x}' " +
					"style='text-align:center;width:{pointWidth}px;pointer-events:none;' " +
					"data-label='{point.menuHeaderValue}' data-value='{point.name}' class='funnel-label'>",
					"{point.name}",
					"</div>"
				);
				return {
					chart: {
						marginRight: 0,
						marginBottom: 0
					},
					tooltip: {
						useHTML: true,
						formatter: function() {
							return "<b>" + this.point.countOpp + "</b><br/> " + this.point.displayValue;
						}
					},
					plotOptions: {
						series: {
							dataLabels: {
								distance: 0,
								enabled: true,
								format: undefined,
								formatter: function() {
									var point = this.point;
									var pointWidth = getPointWidth(point);
									return tpl.applyTemplate({
										instanceId: instanceId,
										point: point,
										pointWidth: pointWidth
									});
								},
								useHTML: true,
								color: "white",
								style: {
									width: "100%",
									height: "100%",
									fontSize: "14px"
								}
							},
							neckWidth: "35%",
							neckHeight: "0%",
							width: "70%",
							height: "95%"
						}
					}
				};
			}
		});
	}
);


