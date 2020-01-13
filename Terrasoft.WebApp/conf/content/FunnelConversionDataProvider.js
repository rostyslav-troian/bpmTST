Terrasoft.configuration.Structures["FunnelConversionDataProvider"] = {innerHierarchyStack: ["FunnelConversionDataProvider"]};
define("FunnelConversionDataProvider", ["ext-base", "FunnelBaseDataProvider"],
		function(Ext) {
	/**
	 * @class Terrasoft.configuration.FunnelConversionDataProvider
	 * Class to prepare filter for funnel by count.
	 */
	Ext.define("Terrasoft.configuration.FunnelConversionDataProvider", {
		extend: "Terrasoft.FunnelBaseDataProvider",
		alternateClassName: "Terrasoft.FunnelConversionDataProvider",

		/**
		 * @inheritdoc Terrasoft.FunnelBaseDataProvider#prepareFunnelResponseCollection
		 * @protected
		 * @overridden
		 */
		prepareFunnelResponseCollection: function(collection) {
			this.callParent(arguments);
			this.prepareConversionResponse(collection);
		},

		/**
		 * Modifies data query response.
		 * @protected
		 * @virtual
		 * @param {Terrasoft.BaseViewModelCollection} responseCollection Collection to process.
		 */
		prepareConversionResponse: function(responseCollection) {
			responseCollection.sortByFn(this.sortByStageNumberPredicate.bind(this));
		},

		/**
		 * Returns true if stage number in first item is greater than in second.
		 * @param {Terrasoft.BaseViewModel} item1 First item to compare.
		 * @param {Terrasoft.BaseViewModel} item2 Second item to compare.
		 * @return {boolean}
		 */
		sortByStageNumberPredicate: function(item1, item2) {
			var stage1 = this.getItemStage(item1);
			var stage2 = this.getItemStage(item2);
			return stage1.Number > stage2.Number;
		},

		/**
		 * Returns y axis value for series item.
		 * @param {Number} topValue Numerator of the conversion fraction.
		 * @param {Number} bottomValue Denominator of the conversion fraction.
		 * @return {Number}
		 */
		getSeriesItemYAxisValue: function(topValue, bottomValue) {
			var y = Math.round(100 * (topValue * 100 / bottomValue)) / 100;
			return Ext.isNumber(y) ? y : 0;
		},

		/**
		 * @inheritdoc Terrasoft.FunnelBaseDataProvider#getSeriesDataConfigByItem
		 * @overridden
		 */
		getSeriesDataConfigByItem: function(responseRow) {
			var lcz = Terrasoft.FunnelBaseDataProvider.Resources.Strings;
			var dataConfig = this.callParent(arguments);
			var bottomValue = responseRow.get("bottomConversionValue");
			var isDataPresent = Ext.isNumber(bottomValue);
			var topValue = responseRow.get("yAxis") || 0;
			var conversionValue;
			var y = 0;
			if (isDataPresent) {
				y = this.getSeriesItemYAxisValue(topValue, bottomValue);
				conversionValue =  Terrasoft.getFormattedNumberValue(y, {decimalPrecision: 2}) + "%";
			} else {
				conversionValue = lcz.NoData;
			}
			var conversionDisplayValue = (isDataPresent) ? lcz.Conversion + ": " + conversionValue : conversionValue;
			var name = Ext.String.format("{0}<br/>{1}", dataConfig.menuHeaderValue, conversionDisplayValue);
			var displayValue = Ext.String.format("<br/>{0}: {1}", lcz.Conversion, conversionValue);
			return Ext.apply(dataConfig, {
				name: name,
				displayValue: displayValue,
				y: y
			});
		}

	});

});


