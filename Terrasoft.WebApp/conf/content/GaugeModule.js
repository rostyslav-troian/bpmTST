Terrasoft.configuration.Structures["GaugeModule"] = {innerHierarchyStack: ["GaugeModule"]};
define("GaugeModule", ["GaugeModuleResources", "BaseWidgetModule", "HighchartsWrapper", "BaseWidgetViewModel"],
	function() {

		/**
		 * @class Terrasoft.controls.GaugeChart
		 * Class of Gauge chart.
		 */
		Ext.define("Terrasoft.controls.GaugeChart", {
			extend: "Terrasoft.Chart",
			alternateClassName: "Terrasoft.GaugeChart",

			/**
			 * Coefficients of the ratio of the values to the height of the Gauge.
			 * @type {Object}
			 */
			chartRatio: {
				height: 0.69,
				yAxisOffset: 0.049,
				yAxisDistance: 0.0138,
				yAxisLabelsPosition: 0.03,
				yAxisLabelsFont: 0.065,
				primaryLabelFont: 0.8,
				primaryLabelHeightMax: 0.27,
				primaryLabelHeightMin: 0.1,
				seriesDataLabelsYPosition: 0.6,
				seriesDialWidth: 0.046
			},

			/**
			 * Gauge header height.
			 * @type {Number}
			 */
			headerHeight: 35,

			/**
			 * Angle of the beginning and end of the Y axis related to the vertical.
			 *
			 * @type {Number}
			 */
			angle: 125,

			/**
			 * Array of Gauge sectors bounds vales.
			 * @type {Number[]}
			 */
			sectorsBounds: null,

			/**
			 * Array of Gauge sectors using colors.
			 * @type {String[]}
			 */
			sectorsColors: null,

			/**
			 * Sectors reverse order.
			 * @type {Boolean}
			 */
			reverseSectors: false,

			/**
			 * Gauge value.
			 * @type {Number}
			 */
			value: 0,

			/**
			 * Validates Gauge building data types.
			 * @private
			 * @returns {Boolean} Are data types correct.
			 */
			validateTypes: function() {
				return Terrasoft.isArray(this.sectorsColors) && Terrasoft.isArray(this.sectorsBounds);
			},

			/**
			 * Validates gauge building data.
			 * Data is correct if sectors bounds and colors are filled in.
			 * @protected
			 * @virtual
			 * @returns {Boolean} Is data correct.
			 */
			validateData: function() {
				if (!this.validateTypes()) {
					return false;
				}
				var dataValid = !((this.sectorsBounds.length < 2) ||
					(this.sectorsColors.length + 1 !== this.sectorsBounds.length));
				if (!dataValid) {
					return false;
				}
				Terrasoft.each(this.sectorsBounds, function(bound) {
					if (Ext.isEmpty(bound)) {
						dataValid = false;
						return false;
					}
				});
				return dataValid;
			},

			_getDisplayValueLength: function(value) {
				return !Ext.isEmpty(value) ? Math.max(2, this._formatValue(value).length) : 0;
			},

			_formatValue: function(value) {
				const config = {
					type: Terrasoft.DataValueType.INTEGER
				};
				if (Ext.isNumber(value)) {
					return Terrasoft.getFormattedNumberValue(value, config);
				}
				return value ? value.toString() : value;
			},

			_getFormat: function(value) {
				return Ext.isNumber(value) ?
					Ext.String.format("{y:{0}.0f}", Terrasoft.Resources.CultureSettings.thousandSeparator) : "{y}";
			},

			/**
			 * Returns actual values of using colors according to order.
			 * @private
			 * @returns {String[]} Values of using sectors colors.
			 */
			getSectorsColors: function() {
				if (!this.validateTypes()) {
					return null;
				}
				var sectorsColors = this.sectorsColors.slice(0);
				if (this.reverseSectors) {
					sectorsColors = sectorsColors.reverse();
				}
				return sectorsColors;
			},

			/**
			 * Returns main gauge color.
			 * @protected
			 * @virtual
			 * @returns {String} Main gauge color.
			 */
			getPrimaryColor: function() {
				var sectorsColors = this.getSectorsColors();
				if (!this.validateTypes()) {
					return null;
				}
				for (var i = this.sectorsBounds.length - 1; i >= 0; i--) {
					var bound = this.sectorsBounds[i];
					if ((this.value < bound) && (i !== 0)) {
						continue;
					}
					var colorIndex = (i === this.sectorsBounds.length - 1) ? sectorsColors.length - 1 : i;
					return sectorsColors[colorIndex];
				}
				return null;
			},

			/**
			 * Returns an array of gauge sectors configurations.
			 * @protected
			 * @virtual
			 * @returns {Object[]} Array of gauge sectors configuration.
			 */
			getPlotBandsConfig: function() {
				var plotBands = [];
				var sectorsColors = this.getSectorsColors();
				for (var i = 0; i < this.sectorsBounds.length - 1; i++) {
					plotBands.push({
						"from": this.sectorsBounds[i],
						"to": this.sectorsBounds[i + 1],
						"innerRadius": "95,7%",
						"outerRadius": "100%",
						"color": sectorsColors[i]
					});
				}
				return plotBands;
			},

			/**
			 * @inheritdoc Terrasoft.Chart#getDefaultChartConfig
			 * @overridden
			 */
			getDefaultChartConfig: function() {
				return {
					"chart": {
						"renderTo": "chart-" + this.id,
						"type": "gauge"
					},
					"title": {"text": ""},
					"tooltip": {"enabled": false},
					"credits": {"enabled": false},
					"plotOptions": {
						"gauge": {"wrap": false}
					}
				};
			},

			/**
			 * Builds an array of Gauge rounded bounds.
			 * @protected
			 * @virtual
			 * @param {Number[]} bounds Array of Gauge bounds.
			 * @param {Number} tickInterval Interval of Gauge tick.
			 * @return {Number[]} Array of rounded Gauge bounds.
			 */
			getRoundedBounds: function(bounds, tickInterval) {
				if (bounds.length < 2) {
					return [];
				}
				var roundedBounds = [];
				roundedBounds.push(Math.ceil(bounds[0] / tickInterval) * tickInterval);
				Terrasoft.each(bounds.slice(1, bounds.length - 1), function(bound) {
					var roundedBound = Math.round(bound / tickInterval) * tickInterval;
					roundedBounds.push(roundedBound);
				}, this);
				roundedBounds.push(Math.floor(bounds[bounds.length - 1] / tickInterval) * tickInterval);
				return roundedBounds;
			},

			/**
			 * @inheritdoc Terrasoft.Chart#getInitConfig
			 * @overridden
			 */
			getInitConfig: function() {
				const scope = this;
				if (!this.validateData()) {
					return null;
				}
				var bounds = this.sectorsBounds;
				var primeColor = this.getPrimaryColor();
				var plotBands = this.getPlotBandsConfig();
				var minValue = this.sectorsBounds[0];
				var maxValue = this.sectorsBounds[this.sectorsBounds.length - 1];
				var height = this.wrapEl.getHeight();
				var width = this.wrapEl.getWidth();
				var displayValueLength = this._getDisplayValueLength(this.value);
				var gaugeSize = Math.min(height - this.headerHeight, width);
				var fontHeightRatio = (gaugeSize < 100)
					? this.chartRatio.primaryLabelHeightMin
					: this.chartRatio.primaryLabelHeightMax;
				var primaryFontSize = Math.min(this.chartRatio.primaryLabelFont * gaugeSize / displayValueLength,
					gaugeSize * fontHeightRatio);
				var tickIntervalDigitCount = Math.round(maxValue / 100).toString().length;
				var tickInterval = Math.pow(10, tickIntervalDigitCount - 1);
				var roundedBounds = this.getRoundedBounds(bounds, tickInterval);
				var yOffset = -primaryFontSize * this.chartRatio.seriesDataLabelsYPosition - 5;
				if (Terrasoft.getIsRtlMode() && gaugeSize >= 100) {
					yOffset = yOffset + gaugeSize / 10;
				}
				return {
					"chart": {
						"borderWidth": 0,
						"height": height
					},
					"pane": {
						"startAngle": -this.angle,
						"endAngle": this.angle,
						"background": [
							{
								"backgroundColor": "#FFF",
								"outerRadius": 0
							},
							{
								"backgroundColor": primeColor,
								"borderWidth": 0,
								"outerRadius": "75.7%",
								"innerRadius": 0
							}
						]
					},
					"yAxis": [
						{
							"min": minValue,
							"max": maxValue,
							"offset": this.chartRatio.yAxisOffset * height,
							"minorTickWidth": 0,
							"tickInterval": tickInterval,
							"tickWidth": 0,
							"lineWidth": 0,
							"labels": {
								"distance": this.chartRatio.yAxisDistance * height,
								"padding": 0,
								"y": this.chartRatio.yAxisLabelsPosition * height,
								"style": {
									"fontFamily": "Segoe UI Light",
									"fontSize": Ext.String.format("{0}px", this.chartRatio.yAxisLabelsFont * height),
									"fontWeight": "normal",
									"color": "#999"
								},
								formatter: function() {
									var displayedValue = null;
									var value = this.value;
									Terrasoft.each(roundedBounds, function(roundedBound, i) {
										if (value === roundedBound) {
											displayedValue = bounds[i];
											return false;
										}
									});
									return scope._formatValue(displayedValue);
								}
							},
							"plotBands": plotBands
						}
					],
					"series": [
						{
							"name": "Value",
							"data": [this.value],
							"pivot": {"radius": 0},
							"dataLabels": {
								"color": "#FFF",
								"borderWidth": 0,
								"y": yOffset,
								"style": {
									"fontSize": Ext.String.format("{0}px", primaryFontSize),
									"fontFamily": "Segoe UI Light",
									"textShadow": 0,
									"fontWeight": "normal"
								},
								"format": this._getFormat(this.value),
								"useHTML": Terrasoft.getIsRtlMode()
							},
							"dial": {
								"backgroundColor": "#444444",
								"baseLength": "81%",
								"baseWidth": this.chartRatio.seriesDialWidth * height,
								"radius": "94.5%",
								"topWidth": 0,
								"rearLength": "-81%",
								"borderWidth": 0
							}
						}
					]
				};
			},

			/**
			 * @inheritdoc Terrasoft.Bindable#getBindConfig.
			 * @overridden
			 */
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);
				var chartBindConfig = {
					value: {
						changeMethod: "setValue"
					},
					sectorsBounds: {
						changeMethod: "setSectorsBounds"
					},
					sectorsColors: {
						changeMethod: "setSectorsColors"
					},
					reverseSectors: {
						changeMethod: "setReverseSectors"
					}
				};
				Ext.apply(chartBindConfig, bindConfig);
				return chartBindConfig;
			},

			/**
			 * Sets Gauge value
			 * @protected
			 * @virtual
			 * @param {Number} value Value.
			 */
			setValue: function(value) {
				this.value = value;
			},

			/**
			 * Sets values of gauge sectors bounds.
			 * @protected
			 * @virtual
			 * @param {Number[]} sectorsBounds Array of sectors bounds values.
			 */
			setSectorsBounds: function(sectorsBounds) {
				this.sectorsBounds = sectorsBounds;
			},

			/**
			 * Sets values of gauge sectors using colors
			 * @protected
			 * @virtual
			 * @param {String[]} sectorsColors Array of sectors using colors.
			 */
			setSectorsColors: function(sectorsColors) {
				this.sectorsColors = sectorsColors;
			},

			/**
			 * Sets reverse order of gauge sectors.
			 * @protected
			 * @virtual
			 * @param {Boolean} reverseSectors Reverse order.
			 */
			setReverseSectors: function(reverseSectors) {
				this.reverseSectors = reverseSectors;
			}
		});

		/**
		 * @class Terrasoft.configuration.GaugeViewConfig
		 * Class generates configuration of Gauge module view.
		 */
		Ext.define("Terrasoft.configuration.GaugeViewConfig", {
			extend: "Terrasoft.BaseModel",
			alternateClassName: "Terrasoft.GaugeViewConfig",

			/**
			 * Generates configuration of Gauge module view.
			 * @protected
			 * @virtual
			 * @param {Object} config Configuration object.
			 * @param {Terrasoft.BaseEntitySchema} config.entitySchema Object schema.
			 * @param {String} config.style View style.
			 * @return {Object} Returns configuration of Gauge module view.
			 */
			generate: function(config) {
				var style = config.style || "";
				var wrapClassName = Ext.String.format("{0}", style);
				var chartId = Terrasoft.Component.generateId();
				return {
					"name": "chart-wrapper-" + chartId,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["gauge-wrapper"],
					"styles": {
						"display": "block",
						"float": "left",
						"width": "100%",
						"height": "100%",
						"background": "white"
					},
					"items": [{
						"name": "chart-wrapper-" + chartId,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {wrapClassName: [wrapClassName, "default-widget-header"]},
						"items": [{
							"name": "caption-" + chartId,
							"labelConfig": {
								"classes": ["default-widget-header-label"],
								"labelClass": ""
							},
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {"bindTo": "caption"}
						}]
					}, {
						"name": "gaugeChart-" + chartId,
						"itemType": Terrasoft.ViewItemType.MODULE,
						"className": "Terrasoft.GaugeChart",
						"value": {"bindTo": "value"},
						"sectorsBounds": {"bindTo": "getSectorsBounds"},
						"sectorsColors": ["#20c964", "#ffc107", "#ff7043"],
						"reverseSectors": {"bindTo": "getReverseSectors"}
					}]
				};
			}
		});

		/**
		 * @class Terrasoft.configuration.GaugeViewModel
		 * Class of Gauge view model.
		 */
		Ext.define("Terrasoft.configuration.GaugeViewModel", {
			extend: "Terrasoft.configuration.BaseWidgetViewModel",
			alternateClassName: "Terrasoft.GaugeViewModel",

			/**
			 * View model columns.
			 * {Object}
			 */
			columns: {

				/**
				 * Gauge value.
				 * @type {Number}
				 */
				value: {
					type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					value: 0
				},

				/**
				 * Min value of Gauge scale.
				 * @type {Number}
				 */
				min: {
					type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					value: 0
				},

				/**
				 * "from" average value of Gauge scale.
				 * Gauge scale average value.
				 * @type {Number}
				 */
				middleFrom: {
					type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					value: 0
				},

				/**
				 * "before" average value of Gauge scale.
				 * @type {Number}
				 */
				middleTo: {
					type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					value: 0
				},

				/**
				 * Max value of Gauge scale.
				 * @type {Number}
				 */
				max: {
					type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					value: 0
				},

				/**
				 * Reverse view order of the sectors.
				 * @type {Boolean}
				 */
				orderDirection: {
					type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
					dataValueType: Terrasoft.DataValueType.INTEGER
				}
			},

			/**
			 * Prepares indicator parameters
			 * @protected
			 * @virtual
			 * @param {Function} callback The function that will be called upon completion.
			 * @param {Object} scope The context in which the callback function will be called.
			 */
			prepareGauge: function(callback, scope) {
				this.prepareWidget(callback, scope);
			},

			/**
			 * Perfoms data selection
			 * @protected
			 * @virtual
			 * @return {Terrasoft.EntitySchemaQuery} select Contains selected and filtered data
			 */
			createSelect: function() {
				var selectParameters = {
					rowCount: 1,
					queryKind: Terrasoft.QueryKind.LIMITED
				};
				return this.callParent([selectParameters]);
			},

			/**
			 * Returns an array of gauge sector bounds values.
			 * @protected
			 * @virtual
			 * @returns {Number[]} Array of gauge sector bounds.
			 */
			getSectorsBounds: function() {
				return [
					this.get("min"),
					this.get("middleFrom"),
					this.get("middleTo"),
					this.get("max")
				];
			},

			/**
			 * Returns flag of sectors reverse order.
			 * @returns {boolean}
			 */
			getReverseSectors: function() {
				return this.get("orderDirection") === Terrasoft.OrderDirection.ASC;
			}
		});

		/**
		 * @class Terrasoft.configuration.GaugeModule
		 * Class of gauge module.
		 */
		Ext.define("Terrasoft.configuration.GaugeModule", {
			extend: "Terrasoft.BaseWidgetModule",
			alternateClassName: "Terrasoft.GaugeModule",

			/**
			 * Class name of the Gauge module view model.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.GaugeViewModel",

			/**
			 * Class name of the Gauge module view configuration.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.GaugeViewConfig",

			/**
			 * Initializes module configuration.
			 * @protected
			 * @virtual
			 */
			initConfig: function() {
				this.callParent(["GetGaugeConfig", this.sandbox]);
			},

			/**
			 * Subscribes to the parent module posts.
			 * @protected
			 * @virtual
			 */
			subscribeMessages: function() {
				this.callParent(arguments);
				this.subscribeMessagesInternal("GenerateGauge");
			},

			/**
			 * Returns model messages. If messages property is null, returns empty object.
			 * @virtual
			 * @protected
			 * @return {Object} Messages columns.
			 */
			getModuleMessages: function() {
				var baseMessages = this.callParent(arguments);
				return this.Ext.apply(baseMessages, {
					/**
					 * @message GetSectionFilterModuleId
					 * For subscription on UpdateFilter
					 */
					"GetSectionFilterModuleId": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				});
			},

			/**
			 * Handles Gauge generation.
			 * @protected
			 * @virtual
			 */
			onGenerateGauge: function() {
				this.onGenerateWidget();
			}
		});

		return Terrasoft.GaugeModule;

	});


