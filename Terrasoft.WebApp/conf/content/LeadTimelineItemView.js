Terrasoft.configuration.Structures["LeadTimelineItemView"] = {innerHierarchyStack: ["LeadTimelineItemView"]};
define("LeadTimelineItemView", ["BaseTimelineItemView"], function() {
	/**
	 * @class Terrasoft.configuration.LeadTimelineItemView
	 * Lead timeline item view class.
	 */
	Ext.define("Terrasoft.configuration.LeadTimelineItemView", {
		extend: "Terrasoft.BaseTimelineItemView",
		alternateClassName: "Terrasoft.LeadTimelineItemView",

		// region Methods: Protected

		/**
		 * Returns lead info view config.
		 * @protected
		 * @return {Object} Lead info view config.
		 */
		getLeadInfoContainerViewConfig: function() {
			return {
				"name": "LeadInfoContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-tile-info-container"]
				},
				"items": [
					this.getTextWithLabelContainerViewConfig("Resources.Strings.LeadTypeLabel", "LeadType"),
					this.getTextWithLabelContainerViewConfig("Resources.Strings.RegisterMethodLabel", "RegisterMethod"),
					this.getTextWithLabelContainerViewConfig("Resources.Strings.StageLabel", "Stage")
				]
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getLeftHeaderViewConfig
		 * @override
		 */
		getBodyViewConfig: function() {
			var bodyConfig = this.callParent(arguments);
			bodyConfig.items = [
				this.getLeadInfoContainerViewConfig()
			];
			return bodyConfig;
		}

		// endregion

	});
});


