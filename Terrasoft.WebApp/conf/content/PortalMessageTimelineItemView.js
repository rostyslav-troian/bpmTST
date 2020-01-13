Terrasoft.configuration.Structures["PortalMessageTimelineItemView"] = {innerHierarchyStack: ["PortalMessageTimelineItemView"]};
define("PortalMessageTimelineItemView", ["BaseTimelineItemView"],
	function() {
		/**
		 * @class Terrasoft.configuration.PortalMessageTimelineItemView
		 * Portal message timeline item view class.
		 */
		Ext.define("Terrasoft.configuration.PortalMessageTimelineItemView", {
			extend: "Terrasoft.BaseTimelineItemView",
			alternateClassName: "Terrasoft.PortalMessageTimelineItemView",

			// region Properties: Protected

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemView#bodyVisibilityHeight
			 * @override
			 */
			bodyVisibilityHeight: 76,

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemView#getMessageViewConfig
			 * @override
			 */
			getMessageViewConfig: function() {
				var config = this.callParent(arguments);
				config.showLinks = true;
				return config;
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemView#getBodyViewConfig
			 * @override
			 */
			getBodyViewConfig: function() {
				var bodyConfig = this.callParent(arguments);
				var messageItemConfig = this.findChildItemConfig(bodyConfig, "Message");
				if (messageItemConfig) {
					var labelClass = this.getItemClasses(messageItemConfig, "labelClass");
					this.insertClass(labelClass, "timeline-text-normal", true, "timeline-text-light");
				}
				return bodyConfig;
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemView#getItemTileContainerConfig
			 * @override
			 */
			getItemTileContainerConfig: function() {
				var tileConfig = this.callParent(arguments);
				if (Ext.isObject(tileConfig)) {
					var classes = this.getItemClasses(tileConfig);
					this.insertClass(classes, "timeline-portal-message-item");
				}
				return tileConfig;
			}

			// endregion

		});
	});


