Terrasoft.configuration.Structures["SocialMessageTimelineItemViewModel"] = {innerHierarchyStack: ["SocialMessageTimelineItemViewModel"]};
define("SocialMessageTimelineItemViewModel", ["BaseTimelineItemViewModel",
		"SocialMessageTimelineItemViewModelResources"
	],
	function() {
		/**
		 * @class Terrasoft.configuration.SocialMessageTimelineItemViewModel
		 * Social message timeline item view model class.
		 */
		Ext.define("Terrasoft.configuration.SocialMessageTimelineItemViewModel", {
			alternateClassName: "Terrasoft.SocialMessageTimelineItemViewModel",
			extend: "Terrasoft.BaseTimelineItemViewModel",

			// region Methods: Protected

			/**
			 * Initializes message url.
			 * @protected
			 */
			initMessageUrl: function() {
				var message = this.get("Message");
				message = Terrasoft.stripTags(message);
				message = message.trim();
				if (Terrasoft.isUrl(message)) {
					this.set("MessageUrl", message);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#initDefaultValues
			 * @override
			 */
			initDefaultValues: function() {
				this.callParent(arguments);
				this.set("ShowAuthorIcon", true);
				this.set("UseAuthorCaption", true);
				this.initMessageUrl();
			},

			// endregion

			// region Methods: Public

			/**
			 * Returns link preview visible value.
			 * @return {Boolean}
			 */
			getLinkPreviewVisible: function() {
				return !Ext.isEmpty(this.get("LinkPreviewData"));
			}

			// endregion

		});
	});


