Terrasoft.configuration.Structures["HighchartsWrapper"] = {innerHierarchyStack: ["HighchartsWrapper"]};
define("HighchartsWrapper", ["ext-base", "terrasoft", "HighchartsTypedConfig", "HighchartsMore", "jQuery",
		"DashboardEnums", "ChartProviderFactory"],
	function(Ext, Terrasoft, highchartsTypedConfig) {
		Ext.define("Terrasoft.controls.Chart", {
			extend: "Terrasoft.Container",
			alternateClassName: "Terrasoft.Chart",

			/**
			 * Class name of the chart provider factory.
			 */
			chartProviderFactoryClassName: 'Terrasoft.ChartProviderFactory',

			/**
			 * Items.
			 */
			items: null,

			/**
			 * ######## ##### ##### ### #######.
			 * @type {String}
			 */
			styleColor: null,

			/**
			 * ##### #######.
			 * @type {Object[]}
			 */
			series: null,

			/**
			 * ######### #######.
			 * @type {String[]}
			 */
			categories: null,

			/**
			 * ######### ### X.
			 * @type {String}
			 */
			xAxisCaption: null,

			/**
			 * ######### ### Y.
			 * @type {String}
			 */
			yAxisCaption: null,

			/**
			 * ### ##### #######.
			 * @type {String}
			 */
			type: null,

			/**
			 * ####### ##### # ####### ######## ############.
			 * @type {object}
			 */
			currentPoint: null,

			/**
			 * ###### ######## ######## ######## #### Y.
			 * @type {Object[]}
			 */
			yAxis: null,

			/**
			 * #### ######## ########## ### ##########.
			 * @type {Object} ################### ### #################### ####.
			 */
			drilldownMenu: null,

			/**
			 * ###### ###### ############ ### ###### ###########.
			 * @type {String[]}
			 */
			colorSet: Terrasoft.DashboardEnums.WidgetColorSet,

			/**
			 * ######### #######.
			 * @type {Chart}
			 */
			chart: null,

			/**
			 * Is old UI Feature enabled. Used for switching fonts.
			 * @type {Boolean}
			 */
			oldUIFeature: Terrasoft.Features.getIsEnabled("OldUI"),

			/**
			 * ######### ###### ## #########
			 * @type {Object}
			 */
			defaultTextStyle: {
				"color": "#999999",
				"font-family": this.oldUIFeature ? "Segoe UI" : "Bpmonline Open Sans",
				"font-size": "13px",
				"line-height": "14px",
				"width": "100%",
				"fill": "#999999"
			},

			/**
			 * ################ ###### ######## #######.
			 * @type {Object}
			 */
			chartConfig: null,

			/**
			 * Default config of the chart.
			 * @protected
			 */
			defaultConfig: null,

			/**
			 * @inheritDoc Terrasoft.Component#tpl
			 * @type {String[]}
			 */
			tpl: [
				/*jshint quotmark:false */
				//jscs: disable
				'<div class="highcharts-wrapper" id="chart-{id}"></div>'
				/*jshint quotmark:double */
				//jscs: enable
			],

			/**
			 * Interval to check container size changing for scroll updates.
			 * @protected
			 * @type {Number}
			 */
			checkSizeInterval: 1000,

			/**
			 * Check size task.
			 * @private
			 * @type {Ext.util.TaskRunner.Task}
			 */
			_checkSizeTask: null,

			constructor: function() {
				this.addEvents(
					"drillDownChart"
				);

				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.Component#getTplData
			 * @overridden
			 */
			getTplData: function() {
				var tplData = this.callParent(arguments);
				this.selectors = this.getSelectors();
				return tplData;
			},

			/**
			 * @protected
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				this.initMenu();
			},

			/**
			 * ################ ####.
			 * @protected
			 */
			initMenu: function() {
				var drilldownMenu = this.drilldownMenu;
				if (!drilldownMenu) {
					return;
				}
				var isMenuInitialized = drilldownMenu instanceof Terrasoft.Menu;
				if (!isMenuInitialized) {
					var config = Ext.apply({
						markerValue: this.markerValue,
						adjustPosition: function() {
							var box = this.buttonBox;
							if (!box) {
								return;
							}
							var wrapEl = this.getWrapEl();
							var wrapElBox = wrapEl.getBox();
							var body = Ext.getBody();
							var bodyViewSize = body.getViewSize();
							var scrollBarSize = Ext.getScrollbarSize();
							var wrapElRightBorderPosition = box.x + wrapElBox.width + scrollBarSize.width;
							var offsetX = (wrapElRightBorderPosition < bodyViewSize.width) ? 0 :
							bodyViewSize.width - wrapElRightBorderPosition;
							var wrapElBottomBorderPosition = box.y + wrapElBox.height;
							var offsetY = (wrapElBottomBorderPosition < bodyViewSize.height) ? 0 : -wrapElBox.height;
							wrapEl.moveTo(box.x + offsetX, box.y + offsetY);
						}
					}, drilldownMenu);
					this.drilldownMenu = Ext.create("Terrasoft.Menu", config);
				}
			},

			/**
			 * @inheritDoc Terrasoft.Component#getSelectors
			 * @overridden
			 */
			getSelectors: function() {
				return {
					wrapEl: "#chart-" + this.id,
					el: "#chart-" + this.id
				};
			},

			/**
			 * ####### ######### #######. ########## ### # ######### #########.
			 * @overridden
			 */
			onAfterRender: function() {
				this.callParent(arguments);
				this.initChart();
				this._initCheckSizeTask();
			},

			/**
			 * ####### ######### #######. ########## ### # ######### #########.
			 * @overridden
			 */
			onAfterReRender: function() {
				this.callParent(arguments);
				this.initChart();
				this._initCheckSizeTask();
			},

			/**
			 * Initialize checkSize task.
			 * @private
			 */
			_initCheckSizeTask: function() {
				this.scrollBarWidth = Ext.getScrollBarWidth(true);
				this.cachedSize = this._getSize();
				var checkSizeTask = this._getCheckSizeTask();
				Ext.TaskManager.start(checkSizeTask);
			},

			/**
			 * Returns container size. Doesn't check that container rendered.
			 * @private
			 * @return {Object} Container size.
			 * @return {Number} return.width Container width.
			 * @return {Number} return.height Container height.
			 */
			_getSize: function() {
				var result = {
					width: 0,
					height: 0
				};
				if (this.rendered) {
					var wrapEl = this.getWrapEl();
					result = wrapEl.getSize();

				}
				return result;
			},

			/**
			 * Returns and create check size task.
			 * @private
			 * @return {Ext.util.TaskRunner.Task}
			 */
			_getCheckSizeTask: function() {
				if (!this._checkSizeTask) {
					this._checkSizeTask = Ext.TaskManager.newTask({
						run: this._checkSize,
						scope: this,
						interval: this.checkSizeInterval
					});
				}
				return this._checkSizeTask;
			},

			/**
			 * Check container size change and reRenders if size is changed.
			 * @private
			 */
			_checkSize: function() {
				if (!this.isVisible()) {
					return;
				}
				const size = this._getSize();
				const widthChanged = Math.abs(this.cachedSize.width - size.width) >= this.scrollBarWidth / 2;
				const heightChanged = this.cachedSize.height !== size.height;
				const sizeChanged = widthChanged || heightChanged;
				if (sizeChanged) {
					this.reRender();
				}
			},

			/**
			 * ########## ###### ######## ## ######### ### ########### ####.
			 * @protected
			 * @virtual
			 * @returns {Object}
			 */
			getDefaultAxisConfig: function() {
				return Ext.clone({
					labels: {
						rotation: 0,
						style: this.defaultTextStyle
					},
					title: {
						style: this.defaultTextStyle
					}
				});
			},

			/**
			 * ########## ################ ###### ####### ######## ## ######### ### #######.
			 * @protected
			 * @virtual
			 * @returns {Object}
			 */
			getDefaultChartConfig: function() {
				return {
					chart: {
						renderTo: "chart-" + this.id
					},
					xAxis: (this.getDefaultAxisConfig()),
					yAxis: (this.getDefaultAxisConfig())
				};
			},

			/**
			 * Sets appropriate DataLabels options for series according theirs type.
			 * @private
			 * @returns {Array}
			 */
			setSeriesDataLabels: function(series, scope) {
				if (!series) {
					return;
				}
				series.forEach(function(item) {
					var itemType = item.type || scope.type;
					if (itemType) {
						var plotOptions = highchartsTypedConfig[itemType].plotOptions[itemType];
						if (plotOptions) {
							item.dataLabels = plotOptions.dataLabels;
						}
					}
				});
				return series;
			},

			/**
			 * ########## ###### ######## ############# #######.
			 * @protected
			 * @virtual
			 * @returns {Object}
			 */
			getInitConfig: function() {
				var colorSet = Terrasoft.deepClone(this.colorSet);
				var yAxisItemTpl = Ext.merge(this.getDefaultAxisConfig(), {
					gridLineWidth: 0,
					title: {
						text: this.yAxisCaption || ""
					},
					labels: {
						rotation: 0
					},
					opposite: false
				});
				var autoGeneratedOptions = Ext.merge(this.getDefaultChartConfig(), {
					chart: {
						type: this.type,
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
					},
					colors: colorSet,
					title: {
						text: "",
						floating: true
					},
					xAxis: {
						title: {text: this.xAxisCaption},
						categories: this.categories
					},
					yAxis: (this.yAxis && this.yAxis.length > 0) ? this.yAxis : [yAxisItemTpl],
					credits: {enabled: false},
					series: this.setSeriesDataLabels(this.series, this)
				});
				this.initDrillDown(autoGeneratedOptions);
				return autoGeneratedOptions;
			},

			/**
			 * Initialize chart.
			 * @protected
			 * @virtual
			 */
			initChart: function() {
				const chartConfig = this.chartConfig || this.getInitConfig();
				const initConfig = Ext.merge(this.defaultConfig || {}, this.getDefaultChartConfig(), chartConfig);
				this.chart = this.getChartProviderInstance(initConfig);
			},
			
			/**
			 * Creates chart provider.
			 * @param {Object} chartConfig Chart configuration.
			 * @protected
			 */
			getChartProviderInstance: function(chartConfig) {
				const chartProviderFactory = Ext.create(this.chartProviderFactoryClassName);
				const providerConfig = Ext.clone(chartConfig);
				const provider = chartProviderFactory.createProvider(providerConfig);
				return provider;
			},

			/**
			 * ############## drilldown #######.
			 * @protected
			 * @virtual
			 */
			initDrillDown: function(config) {
				var events = config.chart.events = {};
				config.chart.drilldown = {series: [], yAxis: []};
				var me = this;
				events.drilldown = function(e) {
					me.onChartDrillDown(e, this);
				};
			},

			/**
			 * ########## ############## # #######.
			 * @protected
			 * @virtual
			 * @param {Object} e ###### #######.
			 */
			onChartDrillDown: function(e) {
				if (e.seriesOptions) {
					return;
				}
				var showMenu = this.drilldownMenu && this.drilldownMenu.items &&
					this.drilldownMenu.items.getCount() > 0;
				if (showMenu) {
					this.showMenu(e);
				}
				this.currentPoint = e.point;
				this.fireEvent("changeCurrentPoint", this.currentPoint, this);
				this.fireEvent("drillDownChart", this, e.point);
			},

			/**
			 * ######## ####.
			 * @protected
			 * @virtual
			 */
			showMenu: function(e) {
				var menu = this.drilldownMenu;
				var event = e.point.clickEvent;
				var box =
				{width: 0, height: 0, x: event.pageX, y: event.pageY, right: 0, bottom: 0};
				menu.show(box, null, null);
			},

			/**
			 * ####### ####.
			 * @protected
			 * @virtual
			 */
			removeMenu: function() {
				var menu = this.drilldownMenu;
				if (menu) {
					menu.destroy();
					this.drilldownMenu = null;
				}
			},

			/**
			 * @inheritDoc Terrasoft.Component#initDomEvents
			 * @overridden
			 */
			initDomEvents: function() {
				this.callParent(arguments);
			},

			/**
			 * ######### ######## menu # ######.
			 * @overridden
			 */
			bind: function() {
				this.callParent(arguments);
				if (this.drilldownMenu) {
					this.drilldownMenu.bind(this.model);
				}
			},

			/**
			 * ########## ############ ######## # ######. ######### ######### ####### {@link Terrasoft.Bindable}.
			 * @overridden
			 */
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);

				var chartBindConfig = {
					type: {
						changeMethod: "setType"
					},
					xAxisCaption: {
						changeMethod: "setXAxisCaption"
					},
					yAxisCaption: {
						changeMethod: "setYAxisCaption"
					},
					yAxis: {
						changeMethod: "setYAxis"
					},
					series: {
						changeMethod: "setSeries"
					},
					categories: {
						changeMethod: "setCategories"
					},
					currentPoint: {
						changeEvent: "changeCurrentPoint",
						changeMethod: "setCurrentPoint"
					},
					styleColor: {
						changeMethod: "setStyleColor"
					}
				};
				Ext.apply(chartBindConfig, bindConfig);
				return chartBindConfig;
			},

			/**
			 * Changes chart color.
			 * @protected
			 * @virtual
			 * @param {String} styleColor Style color name of chart.
			 */
			setStyleColor: function(styleColor) {
				if (this.styleColor === styleColor) {
					return;
				}
				this.styleColor = styleColor;
				if (this.allowRerender() && this.chart && this.chart.series) {
					this.chart.series[0].update({
						color: styleColor
					});
				}
			},

			/**
			 * Changes current point.
			 * @protected
			 * @virtual
			 * @param {Object} currentPoint New current point.
			 */
			setCurrentPoint: function(currentPoint) {
				if (this.currentPoint === currentPoint) {
					return;
				}
				this.currentPoint = currentPoint;
			},

			/**
			 * Changes categories.
			 * @protected
			 * @virtual
			 * @param {Array} categories New categories.
			 */
			setCategories: function(categories) {
				var canCompare = this.categories && Terrasoft.isArray(categories);
				if (canCompare && Ext.Array.equals(this.categories, categories)) {
					return;
				}
				this.categories = categories;
				if (this.allowRerender() && this.chart) {
					this.reRender();
				}
			},

			/**
			 * Sets series.
			 * @protected
			 * @virtual
			 * @param {Array} series New series.
			 */
			setSeries: function(series) {
				if (this.series === series) {
					return;
				}
				this.series = series;
				this.reRender();
			},

			/**
			 * Sets yAxis array of settings object.
			 * @protected
			 * @virtual
			 * @param {Array} yAxis array of settings object.
			 */
			setYAxis: function(yAxis) {
				if (this.yAxis === yAxis) {
					return;
				}
				this.yAxis = yAxis;
			},

			/**
			 * Sets yAxis caption.
			 * @protected
			 * @virtual
			 * @param {String} yAxisCaption New yAxis caption.
			 */
			setYAxisCaption: function(yAxisCaption) {
				if (this.yAxisCaption === yAxisCaption) {
					return;
				}
				this.yAxisCaption = yAxisCaption;
				if (this.allowRerender() && this.chart.yAxis) {
					this.chart.yAxis[0].update({title: {text: yAxisCaption}});
				}
			},

			/**
			 * Sets xAxis caption.
			 * @protected
			 * @virtual
			 * @param {String} xAxisCaption New xAxis caption.
			 */
			setXAxisCaption: function(xAxisCaption) {
				if (this.xAxisCaption === xAxisCaption) {
					return;
				}
				this.xAxisCaption = xAxisCaption;
				if (this.allowRerender() && this.chart.xAxis) {
					this.chart.xAxis[0].update({title: {text: xAxisCaption}});
				}
			},

			/**
			 * Sets chart type.
			 * @protected
			 * @virtual
			 * @param {String} type New chart type.
			 */
			setType: function(type) {
				if (this.type === type) {
					return;
				}
				const isInitializedType = this.type !== null;
				if (isInitializedType) {
					this._setSeriesType(type);
				}
				this.type = type;
				if (this.allowRerender() && this.chart) {
					this.reRender();
				}
			},
			
			/**
			 * @private
			 */
			_setSeriesType: function(type) {
				const useHighCharts = Terrasoft.Features.getIsEnabled("UseHighCharts");
				if (useHighCharts) {
					return;
				}
				Terrasoft.each(this.series, function(serie) {
					serie.type = type;
				}, this);
			},
			
			/**
			 * @inheritdoc Terrasoft.Component#reRender
			 * @overridden
			 */
			reRender: function() {
				if (this.allowRerender()) {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				if (this._checkSizeTask) {
					Ext.TaskManager.stop(this._checkSizeTask);
				}
				this.removeMenu();
				if (this.chart) {
					this.chart.destroy();
				}
				this.callParent(arguments);
			},

			/**
			 * Updates chart size according to container size.
			 * @protected
			 * @virtual
			 */
			updateSize: function() {
				if (!this.rendered || !this.chart) {
					return;
				}
				var chart = this.chart;
				chart.getChartSize();
				this.chart.setSize(chart.chartWidth, chart.chartHeight, true);
			},

			/**
			 * Sets configuration object for chart.
			 * @protected
			 * @virtual
			 * @param {Object} config Configuration object.
			 */
			setChartConfig: function(config) {
				this.chartConfig = config;
				this.reRender();
			}

		});
		return {};
	}
);


