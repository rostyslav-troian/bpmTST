Terrasoft.configuration.Structures["ProjectTimelineItemView"] = {innerHierarchyStack: ["ProjectTimelineItemView"]};
define("ProjectTimelineItemView", ["BaseTimelineItemView"],
	function() {
	/**
	 * @class Terrasoft.configuration.ProjectTimelineItemView
	 * Project timeline item view class.
	 */
	Ext.define("Terrasoft.configuration.ProjectTimelineItemView", {
		extend: "Terrasoft.BaseTimelineItemView",
		alternateClassName: "Terrasoft.ProjectTimelineItemView",

		// region Methods: Protected

		/**
		 * Returns project info view config.
		 * @protected
		 * @return {Object} Project info view config.
		 */
		getProjectInfoContainerViewConfig: function() {
			return {
				"name": "ProjectInfoContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-tile-info-container"]
				},
				"items": [
					this.getTextWithLabelContainerViewConfig("Resources.Strings.TypeLabel", "Type"),
					this.getTextWithLabelContainerViewConfig("Resources.Strings.EndDateLabel", "EndDate",
						{"textValueConverter": "getFormattedShortDate"}),
					this.getTextWithLabelContainerViewConfig("Resources.Strings.StatusLabel", "Status")
				]
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getBodyViewConfig
		 * @override
		 */
		getBodyViewConfig: function() {
			var bodyConfig = this.callParent(arguments);
			bodyConfig.items = [this.getProjectInfoContainerViewConfig()];
			return bodyConfig;
		}

		// endregion

	});
});


