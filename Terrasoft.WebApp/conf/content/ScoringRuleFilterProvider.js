Terrasoft.configuration.Structures["ScoringRuleFilterProvider"] = {innerHierarchyStack: ["ScoringRuleFilterProvider"]};
define("ScoringRuleFilterProvider", ["EntitySchemaFilterProviderModule"],
	function() {

		/**
		 * @class Terrasoft.data.filters.ScoringRuleFilterProvider
		 * Filter provider of the scoring rule.
		 */
		Ext.define("Terrasoft.data.filters.ScoringRuleFilterProvider", {
			extend: "Terrasoft.EntitySchemaFilterProvider",
			alternateClassName: "Terrasoft.ScoringRuleFilterProvider",
			sandbox: null,
			dataValueTypeAggregationFunction: {},

			/**
			 * @inheritdoc Terrasoft.EntitySchemaFilterProvider#getAllowedAggregationOperations
			 * @overridden
			 */
			getAllowedAggregationOperations: function(filter) {
				var leftExpression = filter.leftExpression;
				var isExistsFilter = (filter.filterType === Terrasoft.FilterType.EXISTS);
				var isAggregationTypeCount = (leftExpression.aggregationType === Terrasoft.AggregationType.COUNT);
				if (isExistsFilter || isAggregationTypeCount) {
					var result = [];
					result.push(this.getComparisonTypeCaption(Terrasoft.ComparisonType.EXISTS));
					result.push(this.getComparisonTypeCaption(Terrasoft.ComparisonType.NOT_EXISTS));
					return result;
				}
				return this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.EntitySchemaFilterProvider#getAllowedMacrosTypes
			 * @overridden
			 */
			getAllowedMacrosTypes: function() {
				return [];
			},

			/**
			 * @inheritdoc Terrasoft.EntitySchemaFilterProvider#getLeftExpressionConfig
			 * @overridden
			 */
			getLeftExpressionConfig: function() {
				var config = this.callParent(arguments);
				config.useExists = true;
				config.useCount = false;
				config.displayId = false;
				config.aggregatedDataValueTypes = [];
				return config;
			}
		});

		return Terrasoft.ScoringRuleFilterProvider;
	});


