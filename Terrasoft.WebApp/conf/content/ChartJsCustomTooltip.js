Terrasoft.configuration.Structures["ChartJsCustomTooltip"] = {innerHierarchyStack: ["ChartJsCustomTooltip"]};
define("ChartJsCustomTooltip", [], function() {
	Ext.define("Terrasoft.configuration.ChartJsCustomTooltip", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ChartJsCustomTooltip",
		
		statics: {
			
			// region Fields: Private
			
			/**
			 * @private
			 */
			_tooltipElement: null,
			
			/**
			 * @private
			 */
			_hoverOffset: 2,
			
			/**
			 * @private
			 */
			_highchartsTooltipOptions: {
				headerFormat: "<span style=\"font-size: 10px\">{point.key}</span><br/>",
				pointFormat: "<span style=\"color:{series.color}\">{series.name}</span>: <b>{point.y}</b><br/>"
			},
			
			// endregion
			
			// region Methods: Private
			
			/**
			 * @private
			 */
			_initTooltipElement: function(tooltipModel) {
				const tooltipElId = "custom-chartjs-tooltip";
				if (!this._tooltipElement) {
					this._tooltipElement = document.createElement("div");
					this._tooltipElement.id = tooltipElId;
					this._tooltipElement.addEventListener("mouseleave", this.hideTooltip.bind(this));
					Ext.apply(this._tooltipElement.style, {
						position:  "absolute",
						fontFamily: tooltipModel._bodyFontFamily,
						fontSize: Ext.String.format("{0}px", tooltipModel.bodyFontSize),
						fontStyle: tooltipModel._bodyFontStyle,
						pointerEvents: "auto",
						background: tooltipModel.backgroundColor,
						border: Ext.String.format("{0}px solid {1}",
								tooltipModel.borderWidth, tooltipModel.borderColor),
						borderRadius: Ext.String.format("{0}px", tooltipModel.cornerRadius),
						zIndex: 9999
					});
					document.body.appendChild(this._tooltipElement);
				}
				return this._tooltipElement;
			},
			
			/**
			 * @private
			 */
			_setPosition: function(tooltipModel, chartCanvas) {
				const position = chartCanvas.getBoundingClientRect();
				const leftValue = position.left + window.pageXOffset + tooltipModel.caretX;
				const topValue = position.top + window.pageYOffset + tooltipModel.caretY;
				Ext.apply(this._tooltipElement.style, {
					left: Ext.String.format("{0}px", leftValue),
					top: Ext.String.format("{0}px", topValue),
					padding: Ext.String.format("{0}px {1}px",
							tooltipModel.yPadding, tooltipModel.xPadding)
				});
			},
			
			/**
			 * @private
			 */
			_setContent: function(tooltipModel, chartInstance, customTooltipFunction) {
				const activeDataPoint = tooltipModel.dataPoints[0];
				const datasets = chartInstance.data.datasets;
				const activeDataSet = datasets[activeDataPoint.datasetIndex];
				const dataSetDataItems = activeDataSet.dataItems;
				const activeDataItem = dataSetDataItems[activeDataPoint.index];
				const dataValue = activeDataSet.data && activeDataSet.data[activeDataPoint.index];
				const total = this._getTotalProperty(datasets);
				const point = Ext.apply(activeDataItem, {
					x: activeDataPoint.index,
					y: dataValue
				});
				const serie = {
					name: activeDataSet.label,
					color: activeDataSet.backgroundColor
				};
				const highchartContext = {
					point: point,
					series: serie,
					y: dataValue,
					x: activeDataPoint.index,
					percentage: dataValue / total * 100,
					total: total
				};
				const customTooltipFunctionContext = Ext.apply({
					points: [highchartContext],
					datasets: datasets,
					tootipDataPoint: activeDataPoint
				}, highchartContext);
				this._tooltipElement.innerHTML = customTooltipFunction.apply(customTooltipFunctionContext,
						[{
							options: Terrasoft.deepClone(this._highchartsTooltipOptions)
						}]);
			},
			
			/**
			 * @private
			 */
			_getTotalProperty: function(datasets) {
				const totalByDataSets = datasets.map(function(ds) {
					const dataSetTotalData = Ext.Array.sum(ds.data.map(function(d) {
						return Ext.isObject(d) ? d.y || 0 : d;
					}));
					return dataSetTotalData;
				});
				return Ext.Array.sum(totalByDataSets);
			},
			
			/**
			 * @private
			 */
			_setStyle: function(styleObject) {
				if (this._tooltipElement) {
					Ext.apply(this._tooltipElement.style, styleObject);
				}
			},
			
			// endregion
			
			// region Methods: Public
			
			/**
			 * Hide custom chartjs tooltip.
			 */
			hideTooltip: function() {
				this._setStyle({
					opacity: 0,
					pointerEvents: "none"
				});
			},
			
			/**
			 * Show custom chartjs tooltip.
			 * @param {Object} tooltipModel Chartjs tooltip model.
			 * https://www.chartjs.org/docs/latest/configuration/tooltip.html#tooltip-model
			 * @param {Object[]} tooltipModel.dataPoints The items that we are rendering in the tooltip.
			 * @param {Chart} chartInstance Chartjs instance.
			 * @param {Function} customTooltipFunction Custom tooltip generation function.
			 */
			showTooltip: function(tooltipModel, chartInstance, customTooltipFunction) {
				if (!this._tooltipElement) {
					this._initTooltipElement(tooltipModel, chartInstance);
				}
				this._setContent(tooltipModel, chartInstance, customTooltipFunction);
				this._setPosition(tooltipModel, chartInstance.canvas);
				this._setStyle({
					opacity: 1,
					pointerEvents: "auto"
				});
			},
			
			/**
			 * Checks mouse position inside tooltip element.
			 * @param {Chart} chartInstance Chartjs instance.
			 * @param {Object} eventMousePosition Current event mouse position.
			 * @returns {Boolean}
			 */
			isEventOnTooltip: function(chartInstance, eventMousePosition) {
				const tooltipEl = this._tooltipElement;
				const isTooltipVisible = tooltipEl && tooltipEl.style.opacity === "1";
				if (!isTooltipVisible) {
					return false;
				}
				const canvasBoundBox = chartInstance.canvas.getBoundingClientRect();
				const mouseX = canvasBoundBox.left + window.pageXOffset + eventMousePosition.x;
				const mouseY = canvasBoundBox.top + window.pageYOffset + eventMousePosition.y;
				const tooltipTop = tooltipEl.offsetTop - this._hoverOffset;
				const tooltipBottom = tooltipEl.offsetTop + tooltipEl.offsetHeight + this._hoverOffset;
				const tooltipLeft = tooltipEl.offsetLeft - this._hoverOffset;
				const tooltipRight = tooltipEl.offsetLeft + tooltipEl.offsetWidth + this._hoverOffset;
				return tooltipTop <= mouseY
						&& tooltipBottom >= mouseY
						&& tooltipLeft <= mouseX
						&& tooltipRight >= mouseX;
			}
			
			// endregion
			
		}
	});
	return {};
});


