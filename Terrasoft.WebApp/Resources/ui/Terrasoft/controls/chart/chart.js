Ext.ns("Terrasoft.controls.ChartEnums");

Terrasoft.controls.ChartEnums.ChartType = {
	AREA: "area",
	LINE: "line",
	BAR: "bar",
	PIE: "pie",
	COLUMN: "column",
	SCATTER: "scatter"
};

Terrasoft.ChartType = Terrasoft.controls.ChartEnums.ChartType;

Terrasoft.controls.ChartEnums.ChartLegendPosition = {
	RIGHT: "right",
	LEFT: "left",
	TOP: "top",
	BOTTOM: "bottom",
	NONE: "none"
};

Terrasoft.ChartLegendPosition = Terrasoft.controls.ChartEnums.ChartLegendPosition;

Ext.define("Terrasoft.controls.ChartSeries", {
	extend: "Terrasoft.Component",
	alternateClassName: "Terrasoft.ChartSeries",

	type: Terrasoft.ChartType.LINE,
	data: [],
	dashStyle: "",
	xAxis: 0,
	yAxis: 0,

	remove: function() {
		var series = this.series;
		if (!series) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.Chart.UnableToRemoveSeries
			});
		}
		series.remove();
		delete this.series;
	}
});

Ext.define("Terrasoft.controls.Chart", {
	extend: "Terrasoft.Component",
	alternateClassName: "Terrasoft.Chart",

	type: Terrasoft.ChartType.LINE,

	title: "",

	legendPosition: Terrasoft.ChartLegendPosition.BOTTOM,
	dataLabelFormat: "",
	toolTipFormat: "",
	percentCode: "[#Percent#]",
	pointNameCode: "[#PointName#]",
	coordinateXCode: "[#XValue#]",
	coordinateYCode: "[#YValue#]",
	defaultToolTipNotPieChart: "<b>[#XValue#]</b>: [#YValue#]",
	defaultToolTipPieChart: "<b>[#PointName#]</b>: [#Percent#] %",
	defaultDataLabelPieChart: "[#PointName#] ([#YValue#])",

	chartConfig: null,

	/*jshint ignore:start */
	render: function() {
		var chartConfig = this.chartConfig || this.prepareChartConfig();
		this.initChart();
		this.chart = new Highcharts.Chart(chartConfig);
		this.initSeries();
	},
	/*jshint ignore:end */
	
	initChart: function() {
		/*jshint ignore:start */
		Highcharts.setOptions({
			colors: ["#058DC7", "#50B432", "#ED561B", "#DDDF00", "#24CBE5", "#64E572", "#FF9655", "#FFF263", "#6AF9C4"],
			lang: {
				resetZoom: "100%",
				resetZoomTitle: ""
			}
		});
		/*jshint ignore:end */
	},

	prepareChartConfig: function() {
		var config = {};
		config.chart = {
			renderTo: this.renderTo.dom,
			reflow: false,
			zoomType: "xy",
			resetZoomButton: {
				theme: {
					fill: "white",
					stroke: "silver",
					r: 0,
					states: {
						hover: {
							fill: "#41739D",
							style: {
								color: "white"
							}
						}
					}
				}
			}
		};
		config.title = {
			text: this.title || ""
		};
		config.credits = {enabled: false};
		config.legend = this.convertLegend();
		var self = this;
		var isPieChart = this.type === Terrasoft.ChartType.PIE;
		config.tooltip = {
			formatter: function() {
				var defaultToolTip = isPieChart ? self.defaultToolTipPieChart :
					self.defaultToolTipNotPieChart;
				return self.getToolTipString(this, defaultToolTip, isPieChart);
			}
		};
		config.plotOptions = {
			scatter: {
				marker: {
					radius: 5,
					states: {
						hover: {
							enabled: true,
							lineColor: "rgb(100,100,100)"
						}
					}
				},
				pie: {
					allowPointSelect: true,
					cursor: "pointer",
					dataLabels: {
						enabled: true,
						formatter: function() {
							return self.getDataLabelString(this, self.defaultDataLabelPieChart);
						}
					}
				}
			}
		};
		this.initAxes(config);
		return config;
	},

	series: [],
	initSeries: function() {
		var series = this.series;
		if (Object.prototype.toString.call(series) !== "[object Array]") {
			throw new Terrasoft.UnsupportedTypeException();
		}
		for (var i = 0; i < series.length; i++) {
			var serie = series[i];
			this.addSeries(serie);
		}
		delete this.series;
	},

	addSeries: function(seriesItem) {
		if (!seriesItem instanceof Terrasoft.ChartSeries) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		seriesItem.series = this.chart.addSeries({
			data: seriesItem.data,
			type: seriesItem.type,
			dashStyle: seriesItem.dashStyle,
			xAxis: seriesItem.xAxis,
			yAxis: seriesItem.yAxis,
			index: seriesItem.index
		});
		seriesItem.chart = this;
	},

	xAxis: {},
	yAxis: {},
	initAxes: function(chartConfig) {
		var xAxis = this.xAxis;
		if (xAxis) {
			chartConfig.xAxis = xAxis;
		}
		delete this.xAxis;

		var yAxis = this.yAxis;
		if (yAxis) {
			chartConfig.yAxis = yAxis;
		}
		delete this.yAxis;
	},
	/*jshint ignore:start */
	getDataLabelString: function(chart, defaultDataLabel) {
		var dataLabelString = this.dataLabelFormat || defaultDataLabel;
		return this.getUpdatedPieChartCode(dataLabelString, Highcharts.numberFormat(chart.percentage, 1), chart.y,
			chart.point.name);
	},
	/*jshint ignore:end */

	getUpdatedPieChartCode: function(stringWithCode, percent, yValue, pointName) {
		stringWithCode = stringWithCode.replace(this.percentCode, percent);
		stringWithCode = stringWithCode.replace(this.coordinateYCode, yValue);
		stringWithCode = stringWithCode.replace(this.pointNameCode, pointName);
		return stringWithCode;
	},

	getUpdatedNotPieChartCode: function(stringWithCode, xValue, yValue) {
		stringWithCode = stringWithCode.replace(this.coordinateXCode, xValue);
		stringWithCode = stringWithCode.replace(this.coordinateYCode, yValue);
		return stringWithCode;
	},
	
	/*jshint ignore:start */
	getToolTipString: function(chart, defaultToolTip, isPieChart) {
		var toolTipString = this.toolTipFormat || defaultToolTip;
		if (isPieChart) {
			return this.getUpdatedPieChartCode(toolTipString, Highcharts.numberFormat(chart.percentage, 1), chart.y,
				chart.point.name);
		}
		return this.getUpdatedNotPieChartCode(toolTipString, chart.x, chart.y);
	},
	/*jshint ignore:end */
	convertLegend: function() {
		var pos = this.legendPosition;
		var legendConfig = {};
		switch (pos) {
			case Terrasoft.ChartLegendPosition.RIGHT:
			case Terrasoft.ChartLegendPosition.LEFT:
				legendConfig = {
					align: pos,
					verticalAlign: "middle",
					layout: "vertical"
				};
				break;
			case Terrasoft.ChartLegendPosition.TOP:
			case Terrasoft.ChartLegendPosition.BOTTOM:
				legendConfig = {
					align: "center",
					verticalAlign: pos
				};
				break;
			default:
				legendConfig = {
					enabled: false
				};
		}
		return legendConfig;
	}
});