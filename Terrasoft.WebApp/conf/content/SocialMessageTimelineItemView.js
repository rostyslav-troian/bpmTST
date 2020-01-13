Terrasoft.configuration.Structures["SocialMessageTimelineItemView"] = {innerHierarchyStack: ["SocialMessageTimelineItemView"]};
define("SocialMessageTimelineItemView", ["BaseTimelineItemView", "LinkPreview"], function() {
	/**
	 * @class Terrasoft.configuration.SocialMessageTimelineItemView
	 * Social message timeline item view class.
	 */
	Ext.define("Terrasoft.configuration.SocialMessageTimelineItemView", {
		extend: "Terrasoft.BaseTimelineItemView",
		alternateClassName: "Terrasoft.SocialMessageTimelineItemView",

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#bodyVisibilityHeight
		 * @override
		 */
		bodyVisibilityHeight: 76,

		// endregion

		// region Methods: Protected

		/**
		 * Returns link preview view config.
		 * @protected
		 * @return {Object}
		 */
		getLinkPreviewConfig: function() {
			return {
				"name": "LinkPreview",
				"itemType": Terrasoft.ViewItemType.COMPONENT,
				"className": "Terrasoft.LinkPreview",
				"linkPreviewInfo": {
					"bindTo": "LinkPreviewData"
				},
				"url": {
					"bindTo": "MessageUrl"
				},
				"visible": {
					"bindTo": "getLinkPreviewVisible"
				}
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getBodyViewConfig
		 * @override
		 */
		getBodyViewConfig: function() {
			var bodyConfig = this.callParent(arguments);
			var messageItemConfig = this.findChildItemConfig(bodyConfig, "Message");
			if (messageItemConfig) {
				messageItemConfig.showLinks = true;
			}
			bodyConfig.items.push(this.getLinkPreviewConfig());
			return bodyConfig;
		}

		// endregion

	});
});


