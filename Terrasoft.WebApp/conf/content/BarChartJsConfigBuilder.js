Terrasoft.configuration.Structures["BarChartJsConfigBuilder"] = {innerHierarchyStack: ["BarChartJsConfigBuilder"]};
define("BarChartJsConfigBuilder", ["AbstractChartJsConfigBuilder"], function() {
		
	Ext.define("Terrasoft.configuration.BarChartJsConfigBuilder", {
		extend: "Terrasoft.AbstractChartJsConfigBuilder",
		alternateClassName: "Terrasoft.BarChartJsConfigBuilder",

		// region Fields: Private

		/**
		 * @private
		 */
		_isStackedBar: false,

		/**
		 * @private
		 */
		_barChartPlugins: {
			datalabels: {
				display: true,
				offset: 0
			}
		},

		// endregion

		// region Properties: Protected

		/**
		 * @inheritDoc
		 * @override
		 */
		chartJsType: "bar",

		// endregion

		// region Methods: Private

		_getIsStackedBar: function() {
			return Boolean(
				this.getHighchartsConfigValueOrDefault("plotOptions.series.stacking", false)
			);
		},

		// endregion

		// region Methods: Protected

		init: function() {
			this._isStackedBar = this._getIsStackedBar();
			this.callParent(arguments);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getPlugins: function() {
			const plugins = this.callParent(arguments);
			if (this._isStackedBar) {
				return plugins;
			}
			return this.applyOptions(plugins, this._barChartPlugins);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getAxisOptions: function() {
			const axisOptions = this.callParent(arguments);
			const isStackedBar = this._isStackedBar;
			const isNotStackedBar = !isStackedBar;
			const barAxisOptions = {
				offset: isNotStackedBar,
				display: isNotStackedBar,
				stacked: isStackedBar,
			};
			return this.applyOptions(axisOptions, barAxisOptions);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getLabels: function() {
			return this._isStackedBar ? [] : this.callParent(arguments);
		},

		/**
		 * @inheritDoc
		 * @override
		 */
		getDataSetData: function(highchartsSerieData) {
			return highchartsSerieData.map(function(x) {
				if (Ext.isObject(x)) {
					return x.y;
				} else if (Terrasoft.isArray(x)) {
					return x[1];
				} else {
					return x || 0;
				}
			});
		},

		// endregion

	});

	return { };
});

