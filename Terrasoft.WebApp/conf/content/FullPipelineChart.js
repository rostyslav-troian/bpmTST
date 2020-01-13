Terrasoft.configuration.Structures["FullPipelineChart"] = {innerHierarchyStack: ["FullPipelineChart"]};
define("FullPipelineChart", ["DashboardEnums", "FullPipelineChartResources", "HighchartsWrapper",
			"FullPipelineChartProviderFactory"],
	function() {
		Ext.define("Terrasoft.controls.FullPipelineChart", {
			extend: "Terrasoft.Chart",
			alternateClassName: "Terrasoft.FullPipelineChart",
			
			/**
			 * @inheritDoc
			 * @override
			 */
			chartProviderFactoryClassName: "Terrasoft.FullPipelineChartProviderFactory",

			/**
			 * Minimum height of the funnel unit.
			 * @type {Number}
			 */
			minHeight: 0.2,

			/**
			 * Sign of drill down mode.
			 * @type {Boolean}
			 */
			drillDownMode: false,

			/**
			 * Funnel unit padding.
			 * @type {Number}
			 */
			padding: 4,

			/**
			 * @inheritdoc Terrasoft.Chart#setDrillDownMode
			 * @override
			 */
			setDrillDownMode: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.Component#getBindConfig
			 * @override
			 */
			getBindConfig: function() {
				const bindConfig = this.callParent(arguments);
				const chartBindConfig = {
					drillDownMode: {
						changeMethod: "setDrillDownMode"
					}
				};
				Ext.apply(chartBindConfig, bindConfig);
				return chartBindConfig;
			},

			/**
			 * @inheritdoc Terrasoft.HighchartsWrapper#initChart
			 * @override
			 */
			initChart: function() {
				if (Ext.isEmpty(this.series)) {
					return;
				}
				const typedOptions = Ext.clone(this._getFunnelConfig());
				typedOptions.chart.renderTo = this.renderTo || this.getInitConfig().chart.renderTo;
				typedOptions.series = this.series;
				if (Terrasoft.Features.getIsEnabled("UseCustomChartJsFunnel")) {
					const chartProvider = this.getChartProviderInstance(typedOptions);
					this.chart = chartProvider.component;
				} else {
					this.chart = new Highcharts.Chart(typedOptions);
				}
				this.applyChartFunctions();
				this._setDataLabelAlignCenter();
				this.deleteLegendItems();
				this._addStageExpandButtonsListener(this);
			},

			/**
			 * @inheritDoc Terrasoft.Chart#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				this.addEvents("expanded");
			},

			/**
			 * Applies new functions to chart.
			 * @protected
			 * @virtual
			 */
			applyChartFunctions: function() {
				this.chart.legend.parentRenderItem = this.chart.legend.renderItem;
				this.chart.legend.parentPositionItem = this.chart.legend.positionItem;
				this.chart.legend.renderItem = function(item) {
					if (!item.hideLegend) {
						this.parentRenderItem(item);
					}
				};
				this.chart.legend.positionItem = function(item) {
					if (!item.hideLegend) {
						this.parentPositionItem(item);
					}
				};
			},

			/**
			 * Deletes redundant legend items.
			 * @protected
			 */
			deleteLegendItems: function() {
				let legend = this.chart.legend;
				if (!legend || !legend.allItems) {
					return;
				}
				var legendItems = legend.allItems.slice();
				var schemaName = "";
				legendItems.forEach(function(item) {
					var itemSchemaName = item.schemaName;
					if (schemaName !== itemSchemaName) {
						schemaName = itemSchemaName;
						return;
					}
					item.hideLegend = true;
					legend.destroyItem(item);
				}, this);
				legend.group.placed = false;
				legend.render();
			},

			/**
			 * @inheritdoc Terrasoft.HighchartsWrapper#updateSize
			 * @override
			 */
			updateSize: function() {
				if (!this.rendered || !this.chart) {
					return;
				}
				this.chart.getChartSize();
				this.chart.setSize(this.chart.chartWidth, this.chart.chartHeight, false);
				this._setDataLabelAlignCenter();
			},

			/**
			 * @private
			 */
			_setElementHeight: function(seriesElement, heightSum) {
				const itemWeight = seriesElement.value / heightSum;
				if (itemWeight <= this.minHeight) {
					seriesElement.y = this.minHeight * heightSum;
				} else {
					seriesElement.y = seriesElement.value;
				}
			},

			/**
			 * @private
			 */
			_setElementOrder: function(seriesElement) {
				seriesElement.x = seriesElement.order;
			},

			/**
			 * @private
			 */
			_setElementColor: function(seriesElement, colorMap, gradientStep) {
				const color = colorMap[seriesElement.schemaName];
				seriesElement.color = this._incrementColor(color, gradientStep);
			},

			/**
			 * @private
			 */
			_getSeriesAggregateValues: function(seriesData) {
				let colorMap = {};
				let heightSum = 0;
				Terrasoft.each(seriesData, function(seriesDataElement) {
					heightSum += seriesDataElement.value;
					if (!colorMap[seriesDataElement.schemaName]) {
						colorMap[seriesDataElement.schemaName] =
							Terrasoft.DashboardEnums.WidgetColorSet[Object.keys(colorMap).length];
					}
				});
				return {
					heightSum: heightSum || 1,
					colorMap: colorMap
				};
			},

			/**
			 * @private
			 */
			_incrementColor: function(color, step) {
				let colorToInt = parseInt(color.substr(1), 16),
					nstep = parseInt(step);
				if (!isNaN(colorToInt) && !isNaN(nstep)) {
					colorToInt += nstep;
					let newColor = colorToInt.toString(16);
					newColor = "#" + (new Array(7 - newColor.length).join(0)) + newColor;
					if (/^#[0-9a-f]{6}$/i.test(newColor)) {
						return newColor;
					}
				}
				return color;
			},

			/**
			 * @private
			 */
			_prepareSeriesElements: function(series) {
				const seriesData = series[0].data;
				const aggregateValues = this._getSeriesAggregateValues(seriesData);
				let gradientStep = 0;
				let previousSchemaName = "";
				const colorLighteningStep = 1024;
				let multiplier = 0.00;
				const multiplierLimit = 3.00;
				Terrasoft.each(seriesData, function(element) {
					const elementSchema = element.schemaName;
					if (previousSchemaName !== elementSchema) {
						const dataCount = Terrasoft.where(seriesData, { schemaName: elementSchema }).length;
						multiplier = Math.min(
							Math.ceil(multiplierLimit * multiplierLimit / dataCount) || 1,
							multiplierLimit);
						const halfDataCount = Math.floor(dataCount / 2);
						gradientStep = halfDataCount * colorLighteningStep * multiplier;
						previousSchemaName = elementSchema;
					}
					this._setElementOrder(element);
					this._setElementHeight(element, aggregateValues.heightSum);
					this._setElementColor(element, aggregateValues.colorMap, gradientStep);
					gradientStep -= colorLighteningStep * multiplier;
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.Chart#setSeries
			 * @override
			 */
			setSeries: function(series) {
				if (Terrasoft.isEqual(this.series, series)) {
					return;
				}
				this._prepareSeriesElements(series);
				this.series = series;
				this.reRender();
			},

			/**
			 * Sets the position of the funnel signatures to the center.
			 * @private
			 */
			_setDataLabelAlignCenter: function() {
				if (Ext.isEmpty(this.series)) {
					return;
				}
				const chartSeries = this.chart.series;
				const chartFirstSerieData = (chartSeries && chartSeries[0].data) || [];
				Terrasoft.each(chartFirstSerieData, function(point, index) {
					const pointDataLabel = Ext.get(this.instanceId + "-data-label-" + index);
					if (Ext.isEmpty(pointDataLabel)) {
						return;
					}
					const pointWidth = this._getPointWidth(point);
					const labelWrapper = pointDataLabel.el && pointDataLabel.el.up("span");
					const labelWrapperWidth = labelWrapper ? labelWrapper.getWidth() : 0;
					const pointHeight = this._getPointHeight(point);
					const pointTopY = point.shapeArgs.d[5];
					const pointCenterY = pointTopY + (pointHeight / 2);
					const labelHeight = pointDataLabel.getHeight();
					const dataLabelHeight = pointCenterY - (labelHeight / 2) - this.padding;
					const dX = point.plotX - (pointWidth / 2) - this.padding;
					point.dataLabel.attr({
						x: Terrasoft.getIsRtlMode() ? dX + pointWidth - labelWrapperWidth : dX,
						y: dataLabelHeight
					});
				}, this);
			},

			/**
			 * @private
			 */
			_getPointWidth: function(point) {
				return point.shapeArgs.d.length > 11
					? point.shapeArgs.d[8] - point.shapeArgs.d[10]
					: point.shapeArgs.d[6] - point.shapeArgs.d[8];
			},

			/**
			 * @private
			 */
			_getPointHeight: function(point) {
				return point.shapeArgs.d[7] - point.shapeArgs.d[5];
			},

			/**
			 * Handles stage group expand button click
			 * @private
			 * @param {Object} context current object context 
			 */
			_addStageExpandButtonsListener: function(context) {
				var stageExpandButtons = document.getElementsByName(this.instanceId);
				Terrasoft.each(stageExpandButtons, function(item) {
					const stageId = item.dataset.stageId;
					item.onclick = function() {
						context.fireEvent("expanded", stageId);
					};
				});
			},

			/**
			 * @private
			 */
			_getFunnelConfig: function() {
				const instanceId = this.instanceId;
				const getPointWidth = this._getPointWidth;
				const stageValue = "{point.stageName}<br/>{point.displayValue}";
				const tpl = new Ext.XTemplate(
					"<tpl if='showButton'>" +
					"<button class='fullpipeline-stage-expand-button'" +
					"name='{instanceId}'" +
					"data-stage-id='{point.stageId}'>+</button>" +
					"</tpl>" +
					"<div id='{instanceId}-data-label-{point.x}' " +
					"style='text-align:center;width:{pointWidth}px;pointer-events:none;' " +
					"data-label='{point.stageName}' data-value='" + stageValue + "' class='funnel-label'>",
					stageValue,
					"</div>"
				);
				const isRtl = Terrasoft.getIsRtlMode();
				return {
					chart: {
						marginRight: 0,
						marginBottom: 0,
						type: "funnel"
					},
					credits: {
						enabled: false
					},
					tooltip: {
						useHTML: true,
						formatter: function() {
							var point = this.point;
							var popupValues = point.popupValues || [];
							return Ext.String.format("<b>{0}: {1}</b><br/>{2}",
								point.schemaCaption, point.stageName, popupValues.join("<br/>"));
						}
					},
					legend: {
						rtl: isRtl,
						useHTML: true,
						enabled: true,
						align: "right",
						verticalAlign: "bottom",
						layout: "vertical",
						labelFormatter: function() {
							return Ext.String.format("<span>{0}</span>", this.schemaCaption);
						}
					},
					plotOptions: {
						series: {
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function() {
										return false;
									}
								}
							},
							dataLabels: {
								connectorWidth: 0,
								enabled: true,
								inside: true,
								format: undefined,
								formatter: function() {
									const point = this.point;
									return tpl.applyTemplate({
										instanceId: instanceId,
										point: point,
										showButton: point.isExpandButtonVisible,
										pointWidth: getPointWidth(point)
									});
								},
								useHTML: true,
								style: {
									width: "100%",
									height: "100%",
									fontSize: "95%",
									color: "white"
								}
							},
							neckWidth: "35%",
							neckHeight: "0%",
							width: "70%",
							height: "100%"
						}
					}
				};
			}
		});
	}
);


