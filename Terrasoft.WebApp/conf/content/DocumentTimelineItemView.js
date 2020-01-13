Terrasoft.configuration.Structures["DocumentTimelineItemView"] = {innerHierarchyStack: ["DocumentTimelineItemView"]};
define("DocumentTimelineItemView", ["BaseTimelineItemView"], function() {
	/**
	 * @class Terrasoft.configuration.DocumentTimelineItemView
	 * Document timeline item view class.
	 */
	Ext.define("Terrasoft.configuration.DocumentTimelineItemView", {
		extend: "Terrasoft.BaseTimelineItemView",
		alternateClassName: "Terrasoft.DocumentTimelineItemView",

		// region Methods: Protected

		/**
		 * Returns Document info view config.
		 * @protected
		 * @return {Object} Document info view config.
		 */
		getDocumentInfoContainerViewConfig: function() {
			return {
				"name": "DocumentInfoContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-tile-info-container"]
				},
				"items": [
					this.getTextWithLabelContainerViewConfig("Resources.Strings.TypeLabel", "Type"),
					this.getTextWithLabelContainerViewConfig("Resources.Strings.StatusLabel", "State")
				]
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getBodyViewConfig
		 * @override
		 */
		getBodyViewConfig: function() {
			var bodyConfig = this.callParent(arguments);
			bodyConfig.items = [
				this.getDocumentInfoContainerViewConfig()
			];
			return bodyConfig;
		}

		// endregion

	});
});


