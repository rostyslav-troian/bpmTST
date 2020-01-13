Terrasoft.configuration.Structures["MobileChartDashboardItemConfigGenerator"] = {innerHierarchyStack: ["MobileChartDashboardItemConfigGenerator"]};
/**
 * @class Terrasoft.configuration.ChartDashboardItemConfigGenerator
 * Config generator of chart dashboard item.
 */
Ext.define("Terrasoft.configuration.ChartDashboardItemConfigGenerator", {
	extend: "Terrasoft.BaseDashboardItemConfigGenerator",
	alternateClassName: "Terrasoft.ChartDashboardItemConfigGenerator",

	//region Properties: Private

	/**
	 * @private
	 */
	chartConfig: null,

	/**
	 * @private
	 */
	chartData: null,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	getGaugeChartPlotBandsConfig: function(chartConfig) {
		return [
			{
				from: chartConfig.min,
				to: chartConfig.middleFrom,
				color: chartConfig.orderDirection === 2 ?
					Terrasoft.DashboardGaugeScaleColor.max : Terrasoft.DashboardGaugeScaleColor.min
			},
			{
				from: chartConfig.middleFrom,
				to: chartConfig.middleTo,
				color: Terrasoft.DashboardGaugeScaleColor.middle
			},
			{
				from: chartConfig.middleTo,
				to: chartConfig.max,
				color: chartConfig.orderDirection === 2 ?
					Terrasoft.DashboardGaugeScaleColor.min : Terrasoft.DashboardGaugeScaleColor.max
			}
		];
	},

	/**
	 * @private
	 */
	applyGaugeChartConfig: function(config) {
		var chartConfig = this.chartConfig;
		var plotBands = this.getGaugeChartPlotBandsConfig(chartConfig);
		var dataLabelColor;
		var dataValue = config.series[0].data[0];
		for (var i = 0, ln = plotBands.length; i < ln; i++) {
			var plotBand = plotBands[i];
			if ((dataValue >= plotBand.from && dataValue <= plotBand.to) ||
				(plotBand.to === chartConfig.max && dataValue > plotBand.to) ||
				(plotBand.from === chartConfig.min && dataValue < plotBand.from)) {
				dataLabelColor = plotBand.color;
				break;
			}
		}
		Ext.merge(config, {
			plotOptions: {
				series: {
					dataLabels: {
						style: {
							color: dataLabelColor
						}
					}
				}
			},
			yAxis: {
				min: chartConfig.min,
				max: chartConfig.max,
				tickPositions: [chartConfig.min, chartConfig.middleFrom, chartConfig.middleTo, chartConfig.max],
				plotBands: plotBands
			}
		});
	},

	/**
	 * @private
	 */
	getSortableValueByItem: function(item, config) {
		var sortableValue = null;
		if (config.orderBy === Terrasoft.DashboardOrderBy.GroupByField) {
			var formatConfig = config.formatConfig;
			if (formatConfig && formatConfig.dateTime) {
				var date = this.getDateByFormat(formatConfig.dateTime, item.xAxis);
				sortableValue = date && date.getTime();
			} else {
				sortableValue = this.getSortableValue(item.xAxis, config.xAxisType);
			}
		} else {
			sortableValue = this.getSortableValue(item.yAxis[config.orderBySerieNumber], config.yAxisType);
		}
		return sortableValue;
	},

	/**
	 * @private
	 */
	sortChartData: function(chartData, config) {
		var coefficient = (config.orderDirection === Terrasoft.OrderTypes.DESC) ? -1 : 1;
		chartData.sort(function(itemA, itemB) {
			var valueA = this.getSortableValueByItem(itemA, config);
			var valueB = this.getSortableValueByItem(itemB, config);
			if (valueA === valueB) {
				return 0;
			} else if (valueB === null) {
				return -1;
			} else if (valueA === null) {
				return 1;
			} else if (valueA > valueB) {
				return coefficient;
			} else if (valueA < valueB) {
				return -coefficient;
			} else {
				return 0;
			}
		}.bind(this));
	},

	/**
	 * Returns time value according to format.
	 * @private
	 */
	getDateByFormat: function(datetimeFormat, value) {
		var formats = datetimeFormat.split(";");
		var year = 0;
		var month = 0;
		var day = 1;
		var hour = 0;
		var extraDays = 0;
		for (var i = 0, ln = formats.length; i < ln; i++) {
			var format = formats[i];
			var valueByFormat = parseInt(value[format], 10);
			if (!Ext.isNumber(valueByFormat)) {
				return null;
			}
			switch (format) {
				case "Year":
					year = valueByFormat;
					break;
				case "Month":
					month = valueByFormat - 1;
					break;
				case "Day":
					day = valueByFormat;
					break;
				case "Hour":
					hour = valueByFormat;
					break;
				case "Week":
					extraDays += 7 * valueByFormat;
					break;
				default:
					return null;
			}
		}
		return new Date(year, month, day + extraDays, hour, 0);
	},

	/**
	 * @private
	 */
	getSerieData: function(config) {
		var chartConfig = config.chartConfig;
		var serieConfig = config.serieConfig;
		var chartData = config.chartData;
		var serieData = {
			type: serieConfig.type,
			name: (serieConfig.yAxis && serieConfig.yAxis.caption) ||
			chartConfig.yAxisDefaultCaption || serieConfig.schemaCaption,
			color: Terrasoft.DashboardStyleColor[serieConfig.style],
			data: []
		};
		if (Ext.isObject(serieConfig.xAxis)) {
			this.sortChartData(chartData, {
				orderDirection: chartConfig.orderDirection,
				orderBy: chartConfig.orderBy,
				orderBySerieNumber: config.orderBySerieNumber,
				xAxisType: serieConfig.xAxis.dataValueType,
				yAxisType: serieConfig.yAxis.dataValueType,
				formatConfig: {
					dateTime: serieConfig.xAxis.dateTimeFormat
				}
			});
		}
		for (var j = 0, dataLn = chartData.length; j < dataLn; j++) {
			var dataItem = chartData[j];
			var dataValue = dataItem;
			if (Ext.isObject(dataItem)) {
				if (config.serieIndex === 0) {
					config.categories.push(this.convertValue(dataItem.xAxis, serieConfig.xAxis.dataValueType,
						{dateTime: serieConfig.xAxis.dateTimeFormat}));
				}
				dataValue = {
					name: config.categories[j],
					y: parseFloat(dataItem.yAxis[config.serieIndex], 10)
				};
			}
			serieData.data.push(dataValue);
		}
		return serieData;
	},

	/**
	 * @private
	 */
	convertDateTimeValue: function(value, formatConfig) {
		if (formatConfig.dateTime === Terrasoft.DashboardDateTimeFormatType.DayMonth) {
			return Ext.Date.format(this.getDateByFormat(formatConfig.dateTime, value),
				Terrasoft.CurrentUserInfo.shortMonthDayFormat);
		} else if (formatConfig.dateTime === Terrasoft.DashboardDateTimeFormatType.MonthYear) {
			return Ext.Date.format(this.getDateByFormat(formatConfig.dateTime, value),
				Terrasoft.CurrentUserInfo.shortYearMonthFormat);
		} else if (formatConfig.dateTime === Terrasoft.DashboardDateTimeFormatType.DayMonthYear) {
			return Terrasoft.String.getTypedValue(this.getDateByFormat(formatConfig.dateTime, value),
				Terrasoft.DataValueType.Date);
		} else {
			var formats = formatConfig.dateTime.split(";");
			var result = [];
			var valueIsNotEmpty = false;
			for (var k = 0, ln = formats.length; k < ln; k++) {
				var format = formats[k];
				if (!Ext.isEmpty(value[format])) {
					valueIsNotEmpty = true;
				}
				result.push(value[format]);
			}
			if (valueIsNotEmpty) {
				return result.join(Terrasoft.LS.MobileChartDashboardItemDatePartSeparator);
			}
		}
		return null;
	},

	//endregion

	//region Methods: Protected

	/**
	 * Gets default colors for dashboard.
	 * @protected
	 * @virtual
	 */
	getColors: function() {
		var colors = [];
		for (var colorName in Terrasoft.DashboardStyleColor) {
			if (Terrasoft.DashboardStyleColor.hasOwnProperty(colorName)) {
				colors.push(Terrasoft.DashboardStyleColor[colorName]);
			}
		}
		return colors;
	},

	/**
	 * Gets configuration object for series.
	 * @protected
	 * @virtual
	 * @param {String[]} categories Y Axis values.
	 * @returns {Object[]} Array of serie.
	 */
	getSeriesConfig: function(categories) {
		var chartConfig = this.chartConfig;
		var chartData = this.chartData;
		var seriesData = [];
		var seriesConfig = chartConfig.seriesConfig;
		var orderBySerieNumber = -1;
		if (chartConfig.orderBy &&
			Terrasoft.String.startsWith(chartConfig.orderBy, Terrasoft.DashboardOrderBy.ChartEntityColumn)) {
			orderBySerieNumber = chartConfig.orderBy.split(":")[1];
		}
		for (var i = 0, ln = seriesConfig.length; i < ln; i++) {
			var serieConfig = seriesConfig[i];
			var serieData = this.getSerieData({
				chartConfig: chartConfig,
				serieConfig: serieConfig,
				chartData: chartData,
				orderBySerieNumber: orderBySerieNumber,
				categories: categories,
				serieIndex: i
			});
			seriesData.push(serieData);
		}
		return seriesData;
	},

	/**
	 * Applies type specific config.
	 * @protected
	 * @virtual
	 * @param {Object} config Chart configuration object.
	 */
	applyChartConfigByType: function(config) {
		var seriesConfig = config.series;
		for (var i = seriesConfig.length - 1; i >= 0; i--) {
			var serieConfig = seriesConfig[i];
			var chartType = serieConfig.type;
			switch (chartType) {
				case Terrasoft.ChartType.Pipeline:
					var chartConfig = {
						plotOptions: {},
						customConfig: {
							legend: {
								labelFormat: "{name} ({y})"
							}
						}
					};
					chartConfig.plotOptions[chartType] = {
						dataLabels: {
							format: "{point.name} ({point.y})"
						}
					};
					Ext.merge(config, chartConfig);
					break;
				case Terrasoft.ChartType.Gauge:
					this.applyGaugeChartConfig(config);
					break;
				default:
					break;
			}
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	convertValue: function(value, type, formatConfig) {
		var caption = null;
		if (formatConfig && formatConfig.dateTime) {
			caption = this.convertDateTimeValue(value, formatConfig);
		} else {
			caption = this.callParent(arguments);
		}
		if (Ext.isEmpty(caption)) {
			caption = Terrasoft.LS.MobileChartDashboardItemEmptyValueText;
		}
		return caption;
	},

	//endregion

	//region Methods: Public

	/**
	 * Generates chart dashboard item config.
	 * @param {Object} config Configuration object.
	 * @param {Object} config.chartConfig Chart config.
	 * @param {Object} config.chartData Chart data.
	 * @return {Object} Chart dashboard item config.
	 */
	generate: function(config) {
		var chartConfig = this.chartConfig = config.chartConfig;
		this.chartData = config.chartData;
		var categories = [];
		var mainSerieConfig = chartConfig.seriesConfig[0];
		var seriesData = this.getSeriesConfig(categories);
		var result = {
			colors: this.getColors(),
			title: {
				text: ""
			},
			series: seriesData,
			xAxis: {
				categories: categories,
				labels: {
					autoRotation: [-10, -20, -30, -40, -50, -60, -70, -80, -90]
				},
				title: {
					text: chartConfig.xAxisDefaultCaption
				}
			},
			yAxis: {
				title: {
					text: chartConfig.yAxisDefaultCaption || (mainSerieConfig.yAxis && mainSerieConfig.yAxis.caption)
				}
			}
		};
		this.applyChartConfigByType(result);
		return result;
	}

	// endregion

});


