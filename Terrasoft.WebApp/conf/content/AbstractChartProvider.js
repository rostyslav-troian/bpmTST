Terrasoft.configuration.Structures["AbstractChartProvider"] = {innerHierarchyStack: ["AbstractChartProvider"]};
define("AbstractChartProvider", [], function() {
	Ext.define("Terrasoft.configuration.AbstractChartProvider", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.AbstractChartProvider",

		/**
		 * Chart provider name.
		 * @protected
		 * @type {String}
		 */
		chartProviderName: "",
		
		/**
		 * Initial config.
		 * @protected
		 * @type {Object}
		 */
		config: null,

		/**
		 * Instance of the char object of native library.
		 * @protected
		 */
		component: null,

		/**
		 * @inheritDoc
		 */
		constructor: function() {
			this.callParent(arguments);
			this.init();
			this.setProviderName();
		},

		/**
		 * @abstract
		 */
		init: Terrasoft.abstractFn,

		/**
		 * @abstract
		 */
		setYAxisCaption: Terrasoft.abstractFn,

		/**
		 * @abstract
		 */
		setXAxisCaption: Terrasoft.abstractFn,

		/**
		 * @abstract
		 */
		setType: Terrasoft.abstractFn,

		/**
		 * @abstract
		 */
		updateSize: Terrasoft.abstractFn,

		/**
		 * @abstract
		 */
		setChartConfig: Terrasoft.abstractFn,
		
		/**
		 * @protected
		 */
		setProviderName: function() {
			const chartWrapper = document.getElementById(this.config.chart.renderTo);
			const chartWrapperParent = chartWrapper && chartWrapper.parentElement;
			if (chartWrapperParent) {
				chartWrapperParent.setAttribute("chart-provider", this.chartProviderName);
			}
		},
		
		render: function() {
			this.component.render();
		},

		destroy: function() {
			this.component.destroy();
		},

	});
	return {};
});


