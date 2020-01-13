Terrasoft.configuration.Structures["AbstractChartJsConfigBuilder"] = {innerHierarchyStack: ["AbstractChartJsConfigBuilder"]};
define("AbstractChartJsConfigBuilder", ["ChartJsCustomTooltip"], function() {
	/**
	 * @class Terrasoft.AbstractChartJsConfigBuilder
	 */
	Ext.define("Terrasoft.configuration.AbstractChartJsConfigBuilder", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.AbstractChartJsConfigBuilder",

		// region Properties: Protected

		/**
		 * The maximum length of label.
		 * @protected
		 * @type {Number}
		 */
		maxLabelLength: 10,

		/**
		 * The ChartJs type of chart.
		 * @protected
		 * @type {String}
		 */
		chartJsType: null,

		/**
		 * The ChartJs options of chart.
		 * @protected
		 * @type {Object}
		 */
		chartJsOptions: null,

		/**
		 * The Highcharts configuration object.
		 * @protected
		 * @type {Object}
		 */
		highchartsConfig: null,

		// endregion

		// region Properties: Private

		/**
		 * The series index.
		 * @private
		 * @type {Number}
		 */
		_seriesIndex: 0,

		// endregion

		// region Constructors: Public

		/**
		 * Creates object instance.
		 * @param {Object} config Instance configuration object.
		 * @param {Object} config.highchartsConfig Highcharts configuration object.
		 */
		constructor: function(config) {
			this.callParent(arguments);
			this.chartJsOptions =  {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {},
				scales: {},
				tooltips: {},
				legend: {},
				layout: {},
				title: {}
			};
			this.init(this.chartJsOptions);
		},

		// endregion

		// region Methods: Private

		/**
		 * Gets highcharts label value.
		 * @param {Object} labelConfig Serie or serie data object.
		 * @returns {String} Highcharts label value.
		 * @private
		 */
		_getHighchartsLabelValue: function(labelConfig) {
			return labelConfig && labelConfig.name || "";
		},

		/**
		 * Gets the values of highcharts labels.
		 * @returns {String[]} Highcharts labels array.
		 */
		_getHighchartsLabels: function() {
			let categories = null;
			const xAxisDefault = [{ categories: categories }];
			const xAxis = this.getHighchartsConfigValueOrDefault("xAxis", xAxisDefault);
			if (Ext.isObject(xAxis)) {
				categories = xAxis.categories;
			}
			if (Terrasoft.isArray(xAxis)) {
				categories = xAxis[0].categories;
			}
			if (Terrasoft.isArray(categories)) {
				return categories;
			}
			const series = this.getHighchartsConfigValueOrDefault("series", []);
			const labelsData = series.length === 1 ? series[0].data : series;
			return labelsData.map(this._getHighchartsLabelValue);
		},

		/**
		 * @private
		 */
		_showDrillDown: function(activeItem, event) {
			if (activeItem.drilldown === false) {
				return;
			}
			const drillDownFunction = this.getHighchartsConfigValueOrDefault("chart.events.drilldown", Terrasoft.emptyFn);
			const args = this._getHighchartsDrillDownArgument(activeItem, event);
			drillDownFunction(args);
		},

		/**
		 * @private
		 */
		_getHighchartsDrillDownArgument: function(activeItem, event) {
			const categoryItem = Ext.create("Terrasoft.BaseViewModel", {
				rowConfig: activeItem.rowConfig,
				values: activeItem.values
			});
			Ext.apply(categoryItem, activeItem);
			return {
				point: {
					clickEvent: event,
					categoryItem: categoryItem,
					name: activeItem.name,
					menuHeaderValue: activeItem.menuHeaderValue
				}
			};
		},

		// endregion

		// region Methods: Protected

		/**
		 * Returns chart dataset data.
		 * @param {Object} highchartsSerie Highcharts serie configuration object.
		 * @returns {Object[]} Dataset data.
		 * @protected
		 */
		getDataSetData: Terrasoft.abstractFn,

		/**
		 * Initialize chart js options.
		 * @protected
		 */
		init: function(chartJsOptions) {
			this.applyOptions(chartJsOptions, this.getEvents());
			this.applyOptions(chartJsOptions.plugins, this.getPlugins());
			this.applyOptions(chartJsOptions.legend, this.getLegendOptions());
			this.applyOptions(chartJsOptions.scales, this.getScalesOptions());
			this.applyOptions(chartJsOptions.layout, this.getLayoutOptions());
			this.applyOptions(chartJsOptions.tooltips, this.getTooltipsOptions());
			this.applyOptions(chartJsOptions.title, this.getTitleOptions());
		},

		/**
		 * Merges options and extended options recursively without referencing them or their children.
		 * @param {Object} options The object into which all subsequent objects are merged.
		 * @param {Object} extendedOptions Any number of objects to merge into the destination.
		 * @returns {Object} The destination object with all passed objects merged in.
		 * @protected
		 */
		applyOptions: function(options, extendedOptions) {
			return Ext.merge(options || {}, extendedOptions || {});
		},

		/**
		 * Gets the chart events.
		 * @protected
		 */
		getEvents: Terrasoft.emptyFn,

		/**
		 * Gets the chart plugins.
		 * @protected
		 */
		getPlugins: function() {
			return {
				datalabels: {
					display: false,
					align: "end",
					anchor: "end",
					textAlign: Terrasoft.getIsRtlMode() ? "right" : "left",
					listeners: {
						click: this.dataLabelClickHandler.bind(this)
					}
				}
			};
		},

		/**
		 * Returns chart legend configuration.
		 * @returns {Object} Legend configuration.
		 * @protected
		 */
		getLegendOptions: function() {
			const isLegendEnabled = this.getHighchartsConfigValueOrDefault("legend.enabled", false);
			return {
				display: isLegendEnabled
			};
		},

		/**
		 * Returns chart scales configuration.
		 * @returns {Object} Scales configuration.
		 * @protected
		 */
		getScalesOptions: function() {
			const xAxisHighchartsConfig = this.getHighchartsConfigValueOrDefault("xAxis", []);
			const yAxisHighchartsConfig = this.getHighchartsConfigValueOrDefault("yAxis", []);
			return {
				xAxes: [this.getAxisOptions(xAxisHighchartsConfig)],
				yAxes: [this.getAxisOptions(yAxisHighchartsConfig)]
			};
		},

		/**
		 * Returns chartjs layout configuration.
		 * @returns {Object} Chartjs layout configuration.
		 * @protected
		 */
		getLayoutOptions: function() {
			return {
				padding: {
					left: this.getHighchartsConfigValueOrDefault("chart.marginLeft", 0),
					right: this.getHighchartsConfigValueOrDefault("chart.marginRight", 0),
					top: this.getHighchartsConfigValueOrDefault("chart.marginTop", 0),
					bottom: this.getHighchartsConfigValueOrDefault("chart.marginBottom", 0)
				}
			};
		},

		/**
		 * Returns chart tooltip configuration.
		 * @returns {Object} Tooltip configuration.
		 * @protected
		 */
		getTooltipsOptions: function() {
			const customTooltipFunction = this.getHighchartsConfigValueOrDefault(
				"tooltip.formatter", null);
			if (customTooltipFunction) {
				return this.getCustomTooltipOptions(customTooltipFunction);
			}
			const isTooltipEnabled = this.getHighchartsConfigValueOrDefault(
				"tooltip.enabled", true);
			return {
				enabled: isTooltipEnabled,
				callbacks: {
					title: this.getTooltipTitle.bind(this)
				}
			};
		},

		/**
		 * Returns custom chartjs tooltip configuration.
		 * @param {Function} customTooltipFunction Highcharts tooltip formatter function.
		 * @returns {Object} Custom chartjs tooltip configuration.
		 */
		getCustomTooltipOptions: function(customTooltipFunction) {
			return {
				enabled: false,
				custom: function(tooltipModel) {
					if (Terrasoft.ChartJsCustomTooltip.isEventOnTooltip(this._chart, this._eventPosition)) {
						this._active = [];
						this._lastActive = [];
						return;
					}
					if (tooltipModel.opacity === 0) {
						Terrasoft.ChartJsCustomTooltip.hideTooltip();
						return;
					}
					Terrasoft.ChartJsCustomTooltip.showTooltip(tooltipModel,
						this._chart, customTooltipFunction);
				}
			};
		},

		/**
		 * Returns chart title configuration.
		 * @returns {Object} Title configuration.
		 * @protected
		 */
		getTitleOptions: function() {
			const title = this.getHighchartsConfigValueOrDefault("title.text", "");
			return {
				display: !Terrasoft.isEmpty(title),
				text: title
			};
		},

		/**
		 * Gets the chart tooltip title.
		 * @param {Object} tooltipItem ChartJs tooltip item.
		 * @param {Object} data Chart data.
		 * @returns {String} Tooltip title.
		 * @protected
		 */
		getTooltipTitle: function(tooltipItem, data) {
			const activeDataItem = this.getTooltipActiveDataItem(tooltipItem, data);
			return activeDataItem.name;
		},

		/**
		 * Get active data item by tooltip item.
		 * @param {Object|Object[]} tooltipItem Tooltip items.
		 * @param {Object} data Chart data.
		 * @returns {Object} Data item.
		 */
		getTooltipActiveDataItem: function(tooltipItem, data) {
			const tooltipModel = Ext.isArray(tooltipItem) ? tooltipItem[0] : tooltipItem;
			const activeDataSet = data.datasets[tooltipModel.datasetIndex];
			const dataSetDataItems = activeDataSet.dataItems;
			return dataSetDataItems[tooltipModel.index];
		},

		/**
		 * Returns chart axis configuration.
		 * @returns {Object} Axis configuration.
		 * @protected
		 */
		getAxisOptions: function (axisHighchartsConfig) {
			const axis = Terrasoft.isArray(axisHighchartsConfig) ? axisHighchartsConfig[0] : axisHighchartsConfig;
			const axisTitle = axis && axis.title && axis.title.text;
			return {
				scaleLabel: {
					display: !Ext.isEmpty(axisTitle),
					labelString: axisTitle
				}
			};
		},

		/**
		 * Returns chartjs labels array.
		 * @returns {String[]} Chartjs labels array.
		 * @protected
		 */
		getLabels: function() {
			const highchartsLabels = this._getHighchartsLabels();
			return highchartsLabels
				.map(function(label) {
					return this.getLabel(label);
				}.bind(this));
		},

		/**
		 * Returns chartjs data label.
		 * @param {String} label Highcharts data label.
		 * @returns {Object} Chartjs data label.
		 * @protected
		 */
		getLabel: function(label) {
			const maxLabelLength = this.maxLabelLength;
			if (label.length <= maxLabelLength) {
				return label;
			}
			return [
				label.substring(0, maxLabelLength),
				Ext.String.format("{0}...", label.substring(maxLabelLength, maxLabelLength * 2))
			];
		},

		/**
		 * Returns chart dataset configuration.
		 * @param {Object} highchartsSerie The Highcharts serie configuration object.
		 * @returns {Object} Dataset configuration.
		 * @protected
		 */
		getDataSet: function(highchartsSerie) {
			const highchartsSerieData = highchartsSerie.data;
			const dataItems = highchartsSerieData.map(function(dataItem) {
				return this.getDataItemConfig(dataItem);
			}.bind(this));
			return {
				data: this.getDataSetData(highchartsSerieData),
				dataItems: dataItems,
				label: highchartsSerie.name,
				backgroundColor: this.getDataSetColor(highchartsSerie)
			};
		},

		/**
		 * Returns dataset color.
		 * @param {Object} highchartsSerie Highcharts serie configuration object.
		 * @returns {String[]|String|undefined} Dataset color.
		 * @protected
		 */
		getDataSetColor: function(highchartsSerie) {
			const colors = this.getHighchartsConfigValueOrDefault("colors", null);
			const colorIndex = highchartsSerie._colorIndex;
			const color = Terrasoft.isArray(colors) && Ext.isDefined(colorIndex)
				? colors[colorIndex]
				: highchartsSerie.color;
			if (color) {
				return color;
			}
			if (Terrasoft.isArray(colors)) {
				return colors[this._seriesIndex] || colors[0];
			}
		},

		/**
		 * Returns drill down serie data item configuration.
		 * @param {Object} highchartsSerieDataItem Highcharts serie data item configuration.
		 * @returns {Object} Drill down serie data item configuration.
		 * @protected
		 */
		getDataItemConfig: function (highchartsSerieDataItem) {
			const dataItem = highchartsSerieDataItem || {};
			const categoryItem = dataItem.categoryItem || {};
			return {
				name: dataItem.name,
				values: categoryItem.values,
				xAxis: categoryItem.xAxis,
				rowConfig: categoryItem.rowConfig,
				entitySchemaName: categoryItem.entitySchemaName,
				serializedFilter: categoryItem.serializedFilters && categoryItem.serializedFilters.serialize()
			};
		},

		/**
		 * Return highcharts configuration value by path or default value.
		 * @param {String} valuePath The path of the property to get splitted by ".".
		 * @param {Object} defaultValue Default value.
		 * @returns {Object} Highcharts configuration value by path or default value.
		 * @protected
		 */
		getHighchartsConfigValueOrDefault: function(valuePath, defaultValue) {
			const value = Terrasoft.findValueByPath(this.highchartsConfig, valuePath);
			return Ext.isDefined(value) && value !== null ? value : defaultValue;
		},

		/**
		 * Canvas click event handler.
		 * @param {Event} event Mouse click event.
		 * @param {Object} component Chartjs instance.
		 */
		canvasClickHandler: function(event, component) {
			const activeEl = _.first(component.getElementAtEvent(event));
			if (!activeEl) {
				return;
			}
			const activeDataset = component.data.datasets[activeEl._datasetIndex];
			const activeItem = activeDataset.dataItems[activeEl._index] || {};
			this._showDrillDown(activeItem, event);
		},

		/**
		 * Data label click event handler.
		 * @param {Object} context Data label context.
		 * @param {Object} clickEvent Data label click event.
		 * @param {Event} clickEvent.native Mouse click event.
		 */
		dataLabelClickHandler: function(context, clickEvent) {
			const activeItem = context.dataset.dataItems[context.dataIndex] || {};
			this._showDrillDown(activeItem, clickEvent && clickEvent.native);
		},

		/**
		 * Returns chart datasets configuration.
		 * @protected
		 * @returns {Object} Datasets configuration.
		 */
		getDataSets: function() {
			const highchartsSeries = this.getHighchartsConfigValueOrDefault("series", []);
			return highchartsSeries.map(this.getDataSet.bind(this));
		},

		// endregion

		// region Methods: Public

		/**
		 * Set series index.
		 * @param {Number} seriesIndex Index of the series.
		 * @return {Terrasoft.AbstractChartJsConfigBuilder}
		 */
		setSeriesIndex: function(seriesIndex) {
			this._seriesIndex = seriesIndex;
			return this;
		},

		/**
		 * Set series instance.
		 * @param {Object} series Series instance.
		 * @return {Terrasoft.AbstractChartJsConfigBuilder}
		 */
		setHighchartSeries: function(series) {
			this.highchartsConfig.series = [Ext.clone(series)];
			return this;
		},

		/**
		 * Generate chart js configuration.
		 * @returns {ChartJsConfig} Chart js configuration.
		 */
		build: function() {
			return {
				type: this.chartJsType,
				data: {
					labels: this.getLabels(),
					datasets: this.getDataSets()
				},
				options: Terrasoft.deepClone(this.chartJsOptions),
				drilldown: {
					canvasClickHandler: this.canvasClickHandler.bind(this)
				}
			};
		}

		// endregion

	});

	return {};
});


