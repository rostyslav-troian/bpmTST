Terrasoft.configuration.Structures["PieChartJsConfigBuilder"] = {innerHierarchyStack: ["PieChartJsConfigBuilder"]};
define("PieChartJsConfigBuilder", ["AbstractChartJsConfigBuilder"], function() {
	
	Ext.define("Terrasoft.configuration.PieChartJsConfigBuilder", {
		extend: "Terrasoft.AbstractChartJsConfigBuilder",
		alternateClassName: "Terrasoft.PieChartJsConfigBuilder",

		// region Fields: Private

		/**
		 * @private
		 */
		_pieChartPlugins: {
			datalabels: {
				display: true,
				labels: {
					outer: {
						align: "end",
						anchor: "end",
						display: "auto",
						formatter: function(value, ctx) {
							const maxLabelLength = 10;
							const labelValue = ctx.dataset.dataItems[ctx.dataIndex].name;
							return labelValue.length > maxLabelLength
								? Ext.String.format("{0}...", labelValue.substring(0, maxLabelLength))
								: labelValue;
						}
					},
					inner: {
						align: "center",
						anchor: "center",
						display: "auto",
						textAlign: "center",
						formatter: function(value, ctx) {
							return Ext.String.format("{0}\n({1}%)",
									value, Math.round(value / Ext.Array.sum(ctx.dataset.data) * 100));
						}
					}
				}
			}
		},

		/**
		 * @private
		 */
		_pieChartDataSetOptions: {
			borderWidth: 1
		},

		/**
		 * @private
		 */
		_pieChartScalesOptions: {
			xAxes: [{
				display: false,
				offset: true
			}],
			yAxes: [{
				display: false,
				offset: true
			}]
		},

		/**
		 * @private
		 */
		_pieChartLayoutOptions: {
			padding: {
				top: 25,
				bottom: 25,
				left: 75,
				right: 75,
			}
		},

		// endregion

		// region Properties: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		chartJsType: "pie",

		// endregion

		// region Methods: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		getPlugins: function() {
			const plugins = this.callParent(arguments);
			return this.applyOptions(plugins, this._pieChartPlugins);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getScalesOptions: function() {
			return Terrasoft.deepClone(this._pieChartScalesOptions);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getLayoutOptions: function() {
			const layoutOptions = this.callParent(arguments);
			return this.applyOptions(layoutOptions, this._pieChartLayoutOptions);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getTooltipsOptions: function() {
			const tooltipOptions = this.callParent(arguments);
			const pieTooltipOptions = {
				callbacks: {
					label: this.getTooltipLabel.bind(this),
				},
			};
			return this.applyOptions(tooltipOptions, pieTooltipOptions);
		},
		
		/**
		 * Returns pie chart tooltip label.
		 * @param {Object} tooltipItem Chartjs tooltip item.
		 * @param {Object} data Chart data.
		 * @returns {String} Tooltip label.
		 */
		getTooltipLabel: function (tooltipItem, data) {
			const activeDataSet = data.datasets[tooltipItem.datasetIndex];
			const dataSetData = activeDataSet.data;
			const activeData = dataSetData[tooltipItem.index];
			return Ext.String.format("{0}: {1}{2}",
					activeDataSet.label, activeData,
					this.getTooltipPercentLabel(dataSetData, activeData));
		},
		
		/**
		 * Returns percent value label.
		 * @param {Number[]} datasetData Active dataset data array.
		 * @param {Number} activeData Active item value.
		 * @returns {String} Percent value label.
		 */
		getTooltipPercentLabel: function(datasetData, activeData) {
			const percentValue = activeData / datasetData.reduce(function(total, sum) {
				return total + sum;
			}) * 100;
			return Ext.String.format(" ({0}%)", Math.round(percentValue));
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getLabel: function() {
			const label = this.callParent(arguments);
			return Terrasoft.isArray(label) ? Ext.String.format("{0}...", label[0]) : label;
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getDataSet: function() {
			const dataSet = this.callParent(arguments);
			return this.applyOptions(dataSet, this._pieChartDataSetOptions);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getDataSetData: function(highchartsSerieData) {
			return highchartsSerieData.map(function(x) {
				return Ext.isObject(x) ? x.y : x || 0;
			});
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getDataSetColor: function(highchartsSerie) {
			const highchartsColors = this.getHighchartsConfigValueOrDefault("colors", null);
			const highchartsSerieData = highchartsSerie.data;
			const highchartsSerieLength = highchartsSerieData.length;
			let colors = !Ext.isEmpty(highchartsColors)
					? Terrasoft.deepClone(highchartsColors)
					: highchartsSerieData.map(function(seria) {
						return seria && seria.color;
					});
			while (colors.length < highchartsSerieLength) {
				colors = colors.concat(colors);
			}
			return colors.slice(0, highchartsSerieLength);
		},

		// endregion

	});

	return { };
});

