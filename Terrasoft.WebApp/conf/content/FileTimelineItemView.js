Terrasoft.configuration.Structures["FileTimelineItemView"] = {innerHierarchyStack: ["FileTimelineItemView"]};
define("FileTimelineItemView", ["BaseTimelineItemView"], function() {
	/**
	 * @class Terrasoft.configuration.FileTimelineItemView
	 * File timeline item view class.
	 */
	Ext.define("Terrasoft.configuration.FileTimelineItemView", {
		extend: "Terrasoft.BaseTimelineItemView",
		alternateClassName: "Terrasoft.FileTimelineItemView",

		// region Methods: Protected

		/**
		 * Returns file type icon view config.
		 * @protected
		 * @return {Object}
		 */
		getFileTypeIconConfig: function() {
			return {
				"name": "FileTypeIcon",
				"itemType": Terrasoft.ViewItemType.IMAGE,
				"getSrcMethod": "FileTypeSrc",
				"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
				"onPhotoChange": Terrasoft.emptyFn,
				"classes": {
					"wrapClass": ["timeline-item-file-type-icon"]
				}
			};
		},

		/**
		 * Returns file preview image view config.
		 * @protected
		 * @return {Object}
		 */
		getFilePreviewImageConfig: function() {
			return {
				"name": "FilePreviewImage",
				"itemType": Terrasoft.ViewItemType.IMAGE,
				"getSrcMethod": "getPreviewImageSrc",
				"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
				"onPhotoChange": Terrasoft.emptyFn,
				"classes": {
					"wrapClass": ["timeline-item-file-preview-image"]
				}
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getCaptionViewConfig
		 * @protected
		 */
		getCaptionViewConfig: function() {
			var config = this.callParent(arguments);
			config.target = "_self";
			delete config.click;
			return config;
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getLeftHeaderViewConfig
		 * @protected
		 */
		getLeftHeaderViewConfig: function() {
			var leftHeaderConfig = this.callParent(arguments);
			leftHeaderConfig.items.splice(1, 0, this.getFileTypeIconConfig());
			return leftHeaderConfig;
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getBodyViewConfig
		 * @override
		 */
		getBodyViewConfig: function() {
			var bodyConfig = this.callParent(arguments);
			bodyConfig.controlConfig.visibilityHeight = 0;
			bodyConfig.visible = {
				"bindTo": "isFilePreviewImageVisible"
			};
			bodyConfig.items = [
				this.getFilePreviewImageConfig()
			];
			return bodyConfig;
		}

		// endregion

	});
});


