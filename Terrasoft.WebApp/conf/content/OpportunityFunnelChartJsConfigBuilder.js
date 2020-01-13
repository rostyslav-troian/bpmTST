Terrasoft.configuration.Structures["OpportunityFunnelChartJsConfigBuilder"] = {innerHierarchyStack: ["OpportunityFunnelChartJsConfigBuilder"]};
define("OpportunityFunnelChartJsConfigBuilder", ["FunnelChartJsConfigBuilder"], function() {

	Ext.define("Terrasoft.configuration.OpportunityFunnelChartJsConfigBuilder", {
		extend: "Terrasoft.FunnelChartJsConfigBuilder",
		alternateClassName: "Terrasoft.OpportunityFunnelChartJsConfigBuilder",
		
		// region Methods: Protected
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getLabels: function() {
			return this.callParent(arguments).map(function(label) {
				return label.replace("<br/>", "\n").split("\n");
			});
		},
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getLabelSuffix: function() {
			return Terrasoft.emptyString;
		},
		
		/**
		 * @inheritDoc
		 * @override
		 */
		getDataItemConfig: function(dataItem) {
			const config = this.callParent(arguments);
			Ext.apply(config, {
				countOpp: dataItem.countOpp,
				displayValue: dataItem.displayValue,
				drilldown: dataItem.drilldown,
				menuHeaderValue: dataItem.menuHeaderValue
			});
			return config;
		},
		
		// endregion
		
	});

	return { };
});


