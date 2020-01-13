Terrasoft.configuration.Structures["ChartjsProvider"] = {innerHierarchyStack: ["ChartjsProvider"]};
define("ChartjsProvider",
	["css!ChartjsProvider", "AbstractChartProvider", "ChartjsConfigAdapter", "chartjs"], function() {
	Ext.define("Terrasoft.configuration.ChartjsProvider", {
		extend: "Terrasoft.AbstractChartProvider",
		alternateClassName: "Terrasoft.ChartjsProvider",

		statics: {

			// region Methods: Private

			_isSupportedChartType: function(chartType) {
				const chartJsConfigMapping = Terrasoft.ChartjsConfigAdapter.chartConfigMapping;
				return chartJsConfigMapping.hasOwnProperty(chartType);
			},

			_isParsableChartConfig: function(chartConfig) {
				try {
					Terrasoft.ChartjsConfigAdapter.getConfig(chartConfig);
					return true;
				}
				catch(e) {
					if (Terrasoft.isDebug) {
						throw e;
					}
					console.error("Fail to get ChartJs config.");
					console.info("Config: ");
					console.info(chartConfig);
					console.info("Error: ");
					console.info(e);
					return false;
				}
			},

			// endregion

			// region Methods: Public

			/**
			 * Gets is supported chart type config.
			 * @param {Object} config Highchart config.
			 * @return {Boolean} True if config is supported.
			 */
			isSupportedChartType: function(config) {
				return this._isSupportedChartType(config.chart.type)
						&& this._isParsableChartConfig(config);
			}

			// endregion

		},
		
		// region Fields: Private
		
		/**
		 * @private
		 */
		_defaultChartHeight: "350px",
		
		/**
		 * @private
		 */
		_defaultChartWidth: "350px",
		
		/**
		 * @private
		 */
		_minChartHeight: 25,
		
		/**
		 * @private
		 */
		_minChartWidth: 25,
		
		// endregion
		
		// region Fields: Protected
		
		/**
		 * @inheritDoc
		 * @override
		 */
		chartProviderName: "chart-js",
		
		// endregion
		
		// region Methods: Private
		
		/**
		 * @private
		 */
		_createChart: function() {
			const config = Terrasoft.ChartjsConfigAdapter.getConfig(this.config);
			const context = this._getCanvasContext();
			this.component =  new Chart(context, config);
			this._initEvents(config);
		},
		
		/**
		 * @private
		 */
		_initEvents: function(config) {
			if (!config.drilldown || !config.drilldown.canvasClickHandler) {
				return;
			}
			this.component.canvas.onclick = function(event) {
				config.drilldown.canvasClickHandler(event, this.component);
			}.bind(this);
		},
		
		/**
		 * Gets id of the canvas chart wrap.
		 * @private
		 * @return {String}
		 */
		_getCanvasId: function() {
			return Ext.String.format("canvas-{0}", this.config.chart.renderTo);
		},

		/**
		 * @private
		 */
		_getCanvasSize: function() {
			const chart = this.config.chart;
			const initialChartHeight = chart.height
				&& Ext.String.format("{0}px", chart.height);
			const initialChartWidth = chart.width
				&& Ext.String.format("{0}px", chart.width);
			const renderToEl = Ext.get(chart.renderTo);
			const parentElementHeight = renderToEl.getHeight();
			const parentElementWidth = renderToEl.getWidth();
			const calculatedChartHeight = parentElementHeight > this._minChartHeight
				? "100%"
				: this._defaultChartHeight;
			const calculatedChartWidth = parentElementWidth > this._minChartWidth
				? "100%"
				: this._defaultChartWidth;
			const canvasHeight = initialChartHeight || calculatedChartHeight;
			const canvasWidth = initialChartWidth || calculatedChartWidth;
			return {
				height: canvasHeight,
				width: canvasWidth
			}
		},

		/**
		 * @private
		 * @return {HTMLElement|null}
		 */
		_getCanvasContext: function() {
			return document.getElementById(this._getCanvasId());
		},
		
		/**
		 * Appends canvas to wrap element.
		 * @private
		 */
		_appendCanvas: function() {
			const context = this._getCanvasContext();
			if (context) {
				return;
			}
			const canvas = document.createElement("canvas");
			const canvasSize = this._getCanvasSize();
			canvas.id = this._getCanvasId();
			canvas.style = Ext.String.format("width: {0}; height: {1}",
					canvasSize.width, canvasSize.height);
			canvas.className = "chartjs";
			const chartWrapper = document.getElementById(this.config.chart.renderTo);
			chartWrapper.appendChild(canvas);
		},
		
		// endregion
		
		// region Methods: Protected
		
		/**
		 * @inheritDoc
		 * @override
		 */
		init: function() {
			this._appendCanvas();
			this._createChart();
		}
		
		// endregion
		
	});
	return {};
});


