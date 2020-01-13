Terrasoft.configuration.Structures["MobileChartDashboardItem"] = {innerHierarchyStack: ["MobileChartDashboardItem"]};
/**
 * @class Terrasoft.configuration.ChartDashboardItem
 * Dashboard item that displays chart widget.
 */
Ext.define("Terrasoft.configuration.controls.ChartDashboardItem", {
	extend: "Terrasoft.configuration.controls.BaseDashboardItem",
	alternateClassName: "Terrasoft.ChartDashboardItem",

	config: {

		/**
		 * @inheritdoc
		 */
		cssSuffix: "chart",

		/**
		 * @cfg {Object} chartConfig Chart configuration.
		 */
		chartConfig: null,

		/**
		 * @cfg {Object[]} chartData Columns values.
		 */
		chartData: null,

		/**
		 * @cfg {Object} customChartConfig Custom configuration for Terrasoft.Chart.
		 */
		customChartConfig: null,

		/**
		 * @inheritdoc
		 */
		fullscreenButton: true,

		/**
		 * @inheritdoc
		 */
		configGeneratorClassName: "Terrasoft.ChartDashboardItemConfigGenerator"

	},

	/**
	 * Instance of chart.
	 * @protected
	 */
	chart: null,

	/**
	 * @private
	 * @param {Ext.event.Event} e The event object.
	 */
	stopPropagationFn: function(e) {
		e.stopPropagation();
	},

	/**
	 * Gets configuration object for chart.
	 * @protected
	 * @virtual
	 * @returns {Object} Chart's configuration object.
	 */
	generateChartConfig: function() {
		var configGenerator = this.getConfigGenerator();
		return configGenerator.generate({
			chartConfig: this.getChartConfig(),
			chartData: this.getChartData()
		});
	},

	/**
	 * Creates chart.
	 * @protected
	 * @virtual
	 */
	createChart: function() {
		Ext.destroy(this.chart);
		if (!this.getChartData() || !this.getChartConfig()) {
			this.chart = null;
			return null;
		}
		var config = Ext.merge(this.generateChartConfig(), this.getCustomChartConfig());
		this.chart = Ext.create("Terrasoft.Chart", config);
		return this.chart;
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateChartConfig: function() {
		var chart = this.createChart();
		if (chart) {
			this.setHtml(chart.element.dom);
		}
	},

	/**
	 * @protected
	 * @overridden
	 * @cfg-updater
	 */
	updateIsActive: function(isActive) {
		this.callParent(arguments);
		var chart = this.chart;
		var scrollable = isActive && chart.getIsScrollAvailable();
		var oldScrollable = chart.getScrollable();
		if (oldScrollable !== scrollable) {
			chart.setScrollable(scrollable);
			chart.refresh();
		}
		if (scrollable) {
			this.element.on("touchstart", this.stopPropagationFn, this, null, "before");
			this.element.on("touchmove", this.stopPropagationFn, this, null, "before");
		} else {
			this.element.un("touchstart", this.stopPropagationFn, this, null, "before");
			this.element.un("touchmove", this.stopPropagationFn, this, null, "before");
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeFullscreenButton: function() {
		if (this.config.rawConfig.widgetType !== Terrasoft.DashboardItemWidgetType.Chart) {
			return;
		}
		this.callParent(arguments);
	},

	/**
	 * Returns chart.
	 * @returns {Terrasoft.Chart} Instance of chart.
	 */
	getChart: function() {
		return this.chart;
	},

	/**
	 * @inheritdoc
	 */
	destroy: function() {
		Ext.destroy(this.chart);
		this.callParent(arguments);
	}

});


