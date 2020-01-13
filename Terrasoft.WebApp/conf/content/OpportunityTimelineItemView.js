Terrasoft.configuration.Structures["OpportunityTimelineItemView"] = {innerHierarchyStack: ["OpportunityTimelineItemView"]};
define("OpportunityTimelineItemView", ["BaseTimelineItemView"],
	function() {
	/**
	 * @class Terrasoft.configuration.OpportunityTimelineItemView
	 * Opportunity timeline item view class.
	 */
	Ext.define("Terrasoft.configuration.OpportunityTimelineItemView", {
		extend: "Terrasoft.BaseTimelineItemView",
		alternateClassName: "Terrasoft.OpportunityTimelineItemView",

		// region Methods: Protected

		/**
		 * Returns opportunity info view config.
		 * @protected
		 * @return {Object} Opportunity info view config.
		 */
		getOpportunityInfoContainerViewConfig: function() {
			var budgetFieldConfig = {
				"textValueConverter": "getFormattedFloatNumberValue"
			};
			return {
				"name": "OpportunityInfoContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-tile-info-container"]
				},
				"items": [
					this.getTextWithLabelContainerViewConfig("Resources.Strings.LeadTypeLabel", "LeadType"),
					this.getTextWithLabelContainerViewConfig("Resources.Strings.BudgetLabel", "Budget", budgetFieldConfig),
					this.getTextWithLabelContainerViewConfig("Resources.Strings.StageLabel", "Stage")
				]
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getBodyViewConfig
		 * @override
		 */
		getBodyViewConfig: function() {
			var bodyConfig = this.callParent(arguments);
			bodyConfig.items = [this.getOpportunityInfoContainerViewConfig()];
			return bodyConfig;
		}

		// endregion

	});
});


