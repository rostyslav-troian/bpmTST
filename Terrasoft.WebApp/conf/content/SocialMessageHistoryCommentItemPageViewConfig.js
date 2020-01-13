Terrasoft.configuration.Structures["SocialMessageHistoryCommentItemPageViewConfig"] = {innerHierarchyStack: ["SocialMessageHistoryCommentItemPageViewConfig"]};
define("SocialMessageHistoryCommentItemPageViewConfig", ["ViewUtilities", "ImageCustomGeneratorV2", "MultilineLabel",
		"css!SocialMessageHistoryCommentItemPageViewConfig"],
	function(ViewUtilities) {
	/**
	 * @class Terrasoft.configuration.SocialMessageHistoryCommentItemPageViewConfig
	 * Comment to social message in history view class.
	 */
	Ext.define("Terrasoft.configuration.SocialMessageHistoryCommentItemPageViewConfig", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.SocialMessageHistoryCommentItemPageViewConfig",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#getViewConfig
		 * @overridden
		 */
		getViewConfig: function() {
			var mainContainer = ViewUtilities.getContainerConfig("CommentMainContainer", ["mainContainer"]);
			var headerContainer = ViewUtilities.getContainerConfig("CommentHeaderContainer",
				["historyV2-message-header-container"]);
			headerContainer.items.push(this.getCommentPhotoConfig());
			var authorContainer = ViewUtilities.getContainerConfig("CommentAuthorContainer");
			authorContainer.items.push(this.getCommentAuthorNameConfig());
			headerContainer.items.push(authorContainer);
			var rightContainer = ViewUtilities.getContainerConfig("CommentHeaderRightContainer",
				["message-header-right-container"]);
			rightContainer.items.push(this.getCreatedOnConfig());
			headerContainer.items.push(rightContainer);
			mainContainer.items.push(headerContainer);
			var centerContainer = ViewUtilities.getContainerConfig("CommentCenterContainer",
				["comment-center-container"]);
			centerContainer.items.push(
				{
					"className": "Terrasoft.MultilineLabel",
					"caption": {"bindTo": "Message"}
				}
			);
			mainContainer.items.push(centerContainer);
			return mainContainer;
		},

		/**
		 * Return view config for photo.
		 * @return {Object} Built config.
		 */
		getCommentPhotoConfig: function() {
			var viewGenerator = Ext.create("Terrasoft.ImageCustomGenerator");
			var config = {
					"name": "CreatedByImage",
					"getSrcMethod": "getCreatedByImage",
					"onPhotoChange": Terrasoft.emptyFn,
					"readonly": true,
					"classes": {
						"wrapClass": ["created-by-image"]
					},
					"markerValue": "CreatedByImage",
					"onImageClick": {
						"bindTo": "openCreatedByPage"
					},
					"visible": true
			};
			return viewGenerator.generateSimpleCustomImage(config);
		},

		/**
		 * Return view config for author name.
		 * @return {Object} Built config.
		 */
		getCommentAuthorNameConfig: function() {
			return {
				"className": "Terrasoft.Hyperlink",
				"caption": {
					"bindTo": "CreatedBy",
					"bindConfig": {"converter": "displayValueConverter"}
				},
				"href": {
					"bindTo": "CreatedBy",
					"bindConfig": {"converter": "contactToUrlConverter"}
				},
				"target": Terrasoft.controls.HyperlinkEnums.target.SELF,
				"classes": {
					"hyperlinkClass": ["createdByLink"]
				}
			};
		},

		/**
		 * Return view config for creation date.
		 * @return {Object} Built config.
		 */
		getCreatedOnConfig: function() {
			return {
				"className": "Terrasoft.Label",
				"caption": {"bindTo": "getCreatedOn"},
				"classes": {"labelClass": ["creationInfoLabel"]}
			};
		}
	});
});


