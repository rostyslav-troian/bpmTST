Terrasoft.configuration.Structures["PortalMessageTimelineItemViewModel"] = {innerHierarchyStack: ["PortalMessageTimelineItemViewModel"]};
define("PortalMessageTimelineItemViewModel", ["BaseTimelineItemViewModel",
		"PortalMessageTimelineItemViewModelResources"
	],
	function() {
		/**
		 * @class Terrasoft.configuration.PortalMessageTimelineItemViewModel
		 * Portal message timeline item view model class.
		 */
		Ext.define("Terrasoft.configuration.PortalMessageTimelineItemViewModel", {
			alternateClassName: "Terrasoft.PortalMessageTimelineItemViewModel",
			extend: "Terrasoft.BaseTimelineItemViewModel",

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#initDefaultValues
			 * @override
			 */
			initDefaultValues: function() {
				this.callParent(arguments);
				this.set("ShowAuthorIcon", true);
				this.set("UseAuthorCaption", true);
			}

			// endregion

		});
	});


