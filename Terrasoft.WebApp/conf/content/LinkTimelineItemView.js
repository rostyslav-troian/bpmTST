Terrasoft.configuration.Structures["LinkTimelineItemView"] = {innerHierarchyStack: ["LinkTimelineItemView"]};
define("LinkTimelineItemView", ["LinkTimelineItemViewResources", "BaseTimelineItemView", "LinkPreview"],
	function() {
		/**
		 * @class Terrasoft.configuration.LinkTimelineItemView
		 * Link timeline item view class.
		 */
		Ext.define("Terrasoft.configuration.LinkTimelineItemView", {
			alternateClassName: "Terrasoft.LinkTimelineItemView",
			extend: "Terrasoft.BaseTimelineItemView",

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
						"bindTo": "Caption"
					},
					"visible": {
						"bindTo": "getLinkPreviewVisible"
					}
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemView#getCaptionViewConfig
			 * @protected
			 */
			getCaptionViewConfig: function() {
				var config = this.callParent(arguments);
				config.href = {
					"bindTo": "Caption"
				};
				delete config.click;
				return config;
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemView#getBodyViewConfig
			 * @override
			 */
			getBodyViewConfig: function() {
				var bodyConfig = this.callParent(arguments);
				delete bodyConfig.className;
				delete bodyConfig.controlConfig;
				bodyConfig.items = [
					this.getLinkPreviewConfig()
				];
				return bodyConfig;
			}

			// endregion

		});
	});


