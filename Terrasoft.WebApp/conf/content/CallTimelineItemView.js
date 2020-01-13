Terrasoft.configuration.Structures["CallTimelineItemView"] = {innerHierarchyStack: ["CallTimelineItemView"]};
define("CallTimelineItemView", ["BaseTimelineItemView"], function() {
	/**
	 * @class Terrasoft.configuration.CallTimelineItemView
	 * Call timeline item view class.
	 */
	Ext.define("Terrasoft.configuration.CallTimelineItemView", {
		extend: "Terrasoft.BaseTimelineItemView",
		alternateClassName: "Terrasoft.CallTimelineItemView",

		// region Methods: Protected

		/**
		 * Returns call info view config.
		 * @protected
		 * @return {Object} Call info view config.
		 */
		getCallInfoContainerViewConfig: function() {
			return {
				"name": "CallInfoContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-tile-info-container"]
				},
				"items": [
					this.getTextWithLabelContainerViewConfig("Resources.Strings.DurationLabel", "Duration", {
						"textValueConverter": "getFullDurationText"
					}),
					this.getTextWithLabelContainerViewConfig("Resources.Strings.EndDateLabel", "EndDate", {
						"textValueConverter": "getFormattedDate"
					}),
					this.getTextWithLabelContainerViewConfig("Resources.Strings.ResultLabel", "ResultMessage")
				]
			};
		},

		/**
		 * Returns contact caption view config.
		 * @protected
		 * @return {Object} Contact caption view config.
		 */
		getContactCaptionViewConfig: function() {
			return {
				"name": "ContactCaption",
				"itemType": Terrasoft.ViewItemType.HYPERLINK,
				"caption": {
					"bindTo": "Contact"
				},
				"markerValue": {
					"bindTo": "ContactCaption"
				},
				"click": {
					"bindTo": "onContactCaptionClick"
				},
				"href": {
					"bindTo": "getContactUrl"
				},
				"linkMouseOver": {
					"bindTo": "contactLinkMouseOver"
				},
				"classes": {
					"hyperlinkClass": ["timeline-item-caption", "timeline-item-author-caption"]
				}
			};
		},

		/**
		 * Returns contacts container config.
		 * @protected
		 * @return {Object} Contacts config.
		 */
		getContactsCaptionContainerViewConfig: function() {
			return {
				"name": "ContactsCaptionContainer",
				"classes": {
					"wrapClassName": ["timeline-call-contacts-captions-container"]
				},
				"domAttributes": {
					"bindTo": "getDomAttributeWithCallDirection"
				},
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"items": [
					this.getAuthorCaptionViewConfig(),
					this.getToLabelViewConfig(),
					this.getContactCaptionViewConfig()
				]
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getLeftHeaderViewConfig
		 * @override
		 */
		getLeftHeaderViewConfig: function() {
			var config = this.callParent(arguments);
			config.items = [
				this.getAuthorIconViewConfig(),
				this.getContactsCaptionContainerViewConfig(),
				this.getGoToPageButtonViewConfig()
			];
			return config;
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getBodyViewConfig
		 * @override
		 */
		getBodyViewConfig: function() {
			var bodyConfig = this.callParent(arguments);
			bodyConfig.items = [
				this.getCallInfoContainerViewConfig(),
				this.getTextWithLabelContainerViewConfig("Resources.Strings.CommentLabel", "Comment", {
					"cssWrapClass": "timeline-call-comment-container"
				})
			];
			return bodyConfig;
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getAuthorInitialsViewConfig
		 * @override
		 */
		getAuthorInitialsViewConfig: function() {
			var authorInitialsViewConfig = this.callParent();
			if (authorInitialsViewConfig.caption) {
				authorInitialsViewConfig.caption.bindTo = "CallerName";
			}
			if (authorInitialsViewConfig.visible) {
				authorInitialsViewConfig.visible.bindTo = "Caller";
			}
			return authorInitialsViewConfig;
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getAuthorPhotoViewConfig
		 * @override
		 */
		getAuthorPhotoViewConfig: function() {
			var authorPhotoViewConfig = this.callParent();
			authorPhotoViewConfig.getSrcMethod = "getCallerPhotoUrl";
			if (authorPhotoViewConfig.visible) {
				authorPhotoViewConfig.visible.bindTo = "Caller";
			}
			return authorPhotoViewConfig;
		}

		// endregion

	});
});


