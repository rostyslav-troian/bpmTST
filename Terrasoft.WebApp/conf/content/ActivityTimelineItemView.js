Terrasoft.configuration.Structures["ActivityTimelineItemView"] = {innerHierarchyStack: ["ActivityTimelineItemView"]};
define("ActivityTimelineItemView", ["BaseTimelineItemView"], function() {
	/**
	 * @class Terrasoft.configuration.ActivityTimelineItemView
	 * Activity timeline item view class.
	 */
	Ext.define("Terrasoft.configuration.ActivityTimelineItemView", {
		extend: "Terrasoft.BaseTimelineItemView",
		alternateClassName: "Terrasoft.ActivityTimelineItemView",

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#bodyVisibilityHeight
		 * @override
		 */
		bodyVisibilityHeight: 64,

		// endregion

		// region Methods: Protected

		/**
		 * Returns result message config.
		 * @protected
		 * @return {Object} Result message config.
		 */
		getResultMessageViewConfig: function() {
			return {
				"name": "ResultMessage",
				"itemType": Terrasoft.ViewItemType.LABEL,
				"caption": {
					"bindTo": "ResultMessage"
				},
				"visible": {
					"bindTo": "ResultMessage",
					"bindConfig": {
						"converter": "isNotEmptyValue"
					}
				},
				"classes": {
					"labelClass": ["timeline-text-normal"]
				}
			};
		},

		/**
		 * Returns detailed result label config.
		 * @protected
		 * @return {Object} Detailed result label config.
		 */
		getDetailedResultLabelViewConfig: function() {
			return {
				"name": "DetailedResultLabel",
				"itemType": Terrasoft.ViewItemType.LABEL,
				"caption": {
					"bindTo": "Resources.Strings.DetailedResultLabel"
				},
				"visible": {
					"bindTo": "isDetailedResultLabelVisible"
				},
				"classes": {
					"labelClass": ["timeline-detailed-result-label"]
				}
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getMessageViewConfig
		 * @override
		 */
		getMessageViewConfig: function() {
			return {
				"name": "Message",
				"itemType": Terrasoft.ViewItemType.LABEL,
				"isMultiline": true,
				"caption": {
					"bindTo": "Message"
				},
				"classes": {
					"labelClass": ["timeline-text-normal"]
				}
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getBodyViewConfig
		 * @override
		 */
		getBodyViewConfig: function() {
			var bodyConfig = this.callParent(arguments);
			bodyConfig.items.unshift(this.getDetailedResultLabelViewConfig());
			bodyConfig.items.unshift(this.getResultMessageViewConfig());
			return bodyConfig;
		}

		// endregion

	});
});


